-- Enable Row Level Security on all tables
alter table public.users enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.horses enable row level security;
alter table public.horse_photos enable row level security;
alter table public.horse_health_records enable row level security;
alter table public.horse_weight_logs enable row level security;
alter table public.feeding_logs enable row level security;
alter table public.race_records enable row level security;
alter table public.commercial_activity_records enable row level security;
alter table public.insurance_policies enable row level security;
alter table public.ownerships enable row level security;
alter table public.investor_reports enable row level security;
alter table public.report_horses enable row level security;
alter table public.uploaded_documents enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

-- Helper function: Check if current user has admin role
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.slug = 'admin'
      and (ur.expires_at is null or ur.expires_at > now())
  );
$$ language sql security definer stable;

-- Helper function: Check if current user has staff role
create or replace function public.is_staff()
returns boolean as $$
  select exists (
    select 1 from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.slug = 'staff'
      and (ur.expires_at is null or ur.expires_at > now())
  );
$$ language sql security definer stable;

-- Helper function: Check if current user owns a specific horse
create or replace function public.owns_horse(horse_uuid uuid)
returns boolean as $$
  select exists (
    select 1 from public.ownerships o
    where o.horse_id = horse_uuid
      and o.user_id = auth.uid()
      and o.is_active = true
  );
$$ language sql security definer stable;

-- Helper function: Check if current user can access a horse (owner, investor, admin, or staff)
create or replace function public.can_access_horse(horse_uuid uuid)
returns boolean as $$
begin
  -- Admin and staff can access all horses
  if public.is_admin() or public.is_staff() then
    return true;
  end if;

  -- Owners can access their horses
  if public.owns_horse(horse_uuid) then
    return true;
  end if;

  -- Investors can access horses they are assigned to
  if exists (
    select 1 from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.slug = 'investor'
      and (ur.expires_at is null or ur.expires_at > now())
    limit 1
  ) then
    return exists (
      select 1 from public.report_horses rh
      join public.investor_reports ir on ir.id = rh.report_id
      where rh.horse_id = horse_uuid
        and ir.status = 'published'
    );
  end if;

  return false;
end;
$$ language plpgsql security definer stable;

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Users can read their own profile
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all users
create policy "Admins can view all users"
  on public.users for select
  using (public.is_admin());

-- Admins can update any user
create policy "Admins can update any user"
  on public.users for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================
-- ROLES TABLE POLICIES (Read-only for all authenticated)
-- ============================================

create policy "Authenticated users can view roles"
  on public.roles for select
  using (auth.role() = 'authenticated');

-- ============================================
-- USER_ROLES TABLE POLICIES
-- ============================================

-- Users can view their own roles
create policy "Users can view own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- Admins can manage all roles
create policy "Admins can manage user roles"
  on public.user_roles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================
-- HORSES TABLE POLICIES
-- ============================================

-- Anyone authenticated can view horses they have access to
create policy "Users can view accessible horses"
  on public.horses for select
  using (
    public.is_admin() or
    public.is_staff() or
    public.owns_horse(id) or
    exists (
      select 1 from public.report_horses rh
      join public.investor_reports ir on ir.id = rh.report_id
      where rh.horse_id = id and ir.status = 'published'
    )
  );

-- Staff and admins can insert horses
create policy "Staff can create horses"
  on public.horses for insert
  with check (public.is_admin() or public.is_staff());

-- Staff and admins can update horses
create policy "Staff can update horses"
  on public.horses for update
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- Only admins can delete horses
create policy "Admins can delete horses"
  on public.horses for delete
  using (public.is_admin());

-- ============================================
-- HORSE_PHOTOS TABLE POLICIES
-- ============================================

create policy "Users can view horse photos they can access"
  on public.horse_photos for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage horse photos"
  on public.horse_photos for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- HORSE_HEALTH_RECORDS TABLE POLICIES
-- ============================================

create policy "Users can view health records for accessible horses"
  on public.horse_health_records for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage health records"
  on public.horse_health_records for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- HORSE_WEIGHT_LOGS TABLE POLICIES
-- ============================================

create policy "Users can view weight logs for accessible horses"
  on public.horse_weight_logs for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage weight logs"
  on public.horse_weight_logs for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- FEEDING_LOGS TABLE POLICIES
-- ============================================

create policy "Users can view feeding logs for accessible horses"
  on public.feeding_logs for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage feeding logs"
  on public.feeding_logs for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- RACE_RECORDS TABLE POLICIES
-- ============================================

create policy "Users can view race records for accessible horses"
  on public.race_records for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage race records"
  on public.race_records for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- COMMERCIAL_ACTIVITY_RECORDS TABLE POLICIES
-- ============================================

create policy "Users can view commercial records for accessible horses"
  on public.commercial_activity_records for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage commercial records"
  on public.commercial_activity_records for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- INSURANCE_POLICIES TABLE POLICIES
-- ============================================

create policy "Users can view insurance policies for accessible horses"
  on public.insurance_policies for select
  using (public.can_access_horse(horse_id));

create policy "Staff can manage insurance policies"
  on public.insurance_policies for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- OWNERSHIPS TABLE POLICIES
-- ============================================

-- Owners can view their own ownership records
create policy "Users can view own ownerships"
  on public.ownerships for select
  using (
    public.is_admin() or
    public.is_staff() or
    user_id = auth.uid() or
    exists (
      select 1 from public.ownerships o2
      where o2.horse_id = ownerships.horse_id
        and o2.user_id = auth.uid()
        and o2.is_active = true
    )
  );

-- Staff and admins can manage ownerships
create policy "Staff can manage ownerships"
  on public.ownerships for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- INVESTOR_REPORTS TABLE POLICIES
-- ============================================

-- Admins and staff can view all reports
create policy "Staff can view all reports"
  on public.investor_reports for select
  using (public.is_admin() or public.is_staff());

-- Published reports visible to all authenticated users
create policy "All users can view published reports"
  on public.investor_reports for select
  using (status = 'published');

create policy "Staff can manage investor reports"
  on public.investor_reports for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- REPORT_HORSES TABLE POLICIES
-- ============================================

create policy "Users can view report horses for accessible reports"
  on public.report_horses for select
  using (
    public.is_admin() or
    public.is_staff() or
    exists (
      select 1 from public.investor_reports ir
      where ir.id = report_id and ir.status = 'published'
    )
  );

create policy "Staff can manage report horses"
  on public.report_horses for all
  using (public.is_admin() or public.is_staff())
  with check (public.is_admin() or public.is_staff());

-- ============================================
-- UPLOADED_DOCUMENTS TABLE POLICIES
-- ============================================

-- Users can view documents for horses they can access
create policy "Users can view accessible documents"
  on public.uploaded_documents for select
  using (
    public.is_admin() or
    public.is_staff() or
    uploaded_by = auth.uid() or
    (horse_id is not null and public.can_access_horse(horse_id)) or
    (report_id is not null and exists (
      select 1 from public.investor_reports ir
      where ir.id = report_id and ir.status = 'published'
    ))
  );

-- Users can upload documents
create policy "Users can upload documents"
  on public.uploaded_documents for insert
  with check (auth.uid() = uploaded_by);

-- Users can delete their own documents
create policy "Users can delete own documents"
  on public.uploaded_documents for delete
  using (uploaded_by = auth.uid() or public.is_admin() or public.is_staff());

-- ============================================
-- NOTIFICATIONS TABLE POLICIES
-- ============================================

-- Users can only see their own notifications
create policy "Users can view own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

-- System can create notifications
create policy "Service role can create notifications"
  on public.notifications for insert
  with check (true);

-- Users can update their own notifications
create policy "Users can update own notifications"
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================
-- AUDIT_LOGS TABLE POLICIES (Append-only, admin read)
-- ============================================

-- Anyone authenticated can insert (for basic logging)
create policy "Authenticated users can create audit logs"
  on public.audit_logs for insert
  with check (true);

-- Only admins can read audit logs
create policy "Admins can view audit logs"
  on public.audit_logs for select
  using (public.is_admin());

-- Audit logs cannot be updated or deleted
create policy "No updates to audit logs"
  on public.audit_logs for update
  using (false);

create policy "No deletion of audit logs"
  on public.audit_logs for delete
  using (false);

-- ============================================
-- GRANT DEFAULT PERMISSIONS
-- ============================================

-- Ensure service role can still do everything
grant all on public.* to service_role;
