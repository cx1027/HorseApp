-- Extensions
create extension if not exists "uuid-ossp";

-- Custom types
create type user_status as enum ('active','invited','disabled');
create type horse_status as enum ('active','retired','injured','deceased');
create type report_status as enum ('draft','published','archived');
create type record_type as enum ('vet_checkup','vaccination','dental','injury','illness','checkup','other');
create type notification_type as enum ('reminder','update','report','system');

-- Auth-aligned users table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  phone text,
  avatar_url text,
  status user_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_status on public.users(status);

-- Roles
create table if not exists public.roles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

-- User roles
create table if not exists public.user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  granted_by uuid references public.users(id),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, role_id, granted_by)
);

create index if not exists idx_user_roles_user on public.user_roles(user_id);
create index if not exists idx_user_roles_role on public.user_roles(role_id);

-- Horses
create table if not exists public.horses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  age integer,
  sex text,
  breed text,
  color text,
  microchip text,
  status horse_status not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_horses_status on public.horses(status);

-- Horse photos
create table if not exists public.horse_photos (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  url text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_horse_photos_horse on public.horse_photos(horse_id);

-- Health records
create table if not exists public.horse_health_records (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  type record_type not null,
  date date not null,
  vet text,
  findings text,
  attachments jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_horse_health_records_horse_date on public.horse_health_records(horse_id, date desc);

-- Weight logs
create table if not exists public.horse_weight_logs (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  date date not null,
  weight_kg numeric not null,
  measured_by text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_horse_weight_logs_horse_date on public.horse_weight_logs(horse_id, date desc);

-- Feeding logs
create table if not exists public.feeding_logs (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  date date not null,
  feed_type text not null,
  amount numeric not null,
  unit text not null,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_feeding_logs_horse_date on public.feeding_logs(horse_id, date desc);

-- Race records
create table if not exists public.race_records (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  race_date date not null,
  race_name text not null,
  venue text,
  result text,
  prize numeric,
  currency text not null default 'USD',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_race_records_horse_date on public.race_records(horse_id, race_date desc);

-- Commercial activity records
create table if not exists public.commercial_activity_records (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  activity_date date not null,
  type text not null,
  counterparty text,
  amount numeric,
  currency text not null default 'USD',
  status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_commercial_activity_records_horse_date on public.commercial_activity_records(horse_id, activity_date desc);

-- Insurance policies
create table if not exists public.insurance_policies (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  provider text not null,
  policy_number text not null,
  coverage_type text,
  start_date date not null,
  end_date date not null,
  premium numeric,
  document_url text,
  status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_insurance_policies_horse_end on public.insurance_policies(horse_id, end_date);

-- Ownerships
create table if not exists public.ownerships (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  share_percent numeric not null,
  class text,
  start_date date not null,
  end_date date,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ownerships_user_horse on public.ownerships(user_id, horse_id);

-- Investor reports
create table if not exists public.investor_reports (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  report_type text not null,
  period_start date not null,
  period_end date not null,
  status report_status not null default 'draft',
  published_at timestamptz,
  summary text,
  forecast_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_investor_reports_period on public.investor_reports(period_start, period_end);

-- Report horses join
create table if not exists public.report_horses (
  report_id uuid not null references public.investor_reports(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  primary key (report_id, horse_id)
);

-- Documents
create table if not exists public.uploaded_documents (
  id uuid primary key default uuid_generate_v4(),
  horse_id uuid references public.horses(id) on delete set null,
  policy_id uuid references public.insurance_policies(id) on delete set null,
  report_id uuid references public.investor_reports(id) on delete set null,
  uploaded_by uuid not null references public.users(id),
  file_url text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint,
  category text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_uploaded_documents_horse on public.uploaded_documents(horse_id);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  horse_id uuid references public.horses(id) on delete set null,
  type notification_type not null default 'update',
  title text not null,
  body text,
  scheduled_at timestamptz,
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user_read on public.notifications(user_id, read_at);

-- Audit logs
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type, entity_id);

-- Seed roles
insert into public.roles (id, name, slug, description)
values
  ('00000000-0000-0000-0000-000000000001', 'Admin', 'admin', 'Full administrative access'),
  ('00000000-0000-0000-0000-000000000002', 'Staff', 'staff', 'Horse records and operations management'),
  ('00000000-0000-0000-0000-000000000003', 'Owner', 'owner', 'Horse ownership access and read-only operations'),
  ('00000000-0000-0000-0000-000000000004', 'Investor', 'investor', 'Read access to assigned horses and reports')
on conflict (slug) do nothing;
