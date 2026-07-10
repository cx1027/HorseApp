-- Create user profiles for all auth.users that don't have one
insert into public.users (id, email, display_name, status)
select 
  au.id,
  au.email,
  coalesce(au.raw_user_meta_data->>'display_name', split_part(au.email, '@', 1)),
  'active'
from auth.users au
on conflict (id) do nothing;

-- Seed the 4 roles (idempotent)
insert into public.roles (id, name, slug, description)
values
  ('00000000-0000-0000-0000-000000000001', 'Admin', 'admin', 'Full administrative access'),
  ('00000000-0000-0000-0000-000000000002', 'Staff', 'staff', 'Horse records and operations management'),
  ('00000000-0000-0000-0000-000000000003', 'Owner', 'owner', 'Horse ownership access and read-only operations'),
  ('00000000-0000-0000-0000-000000000004', 'Investor', 'investor', 'Read access to assigned horses and reports')
on conflict (slug) do nothing;

-- ============================================
-- Assign roles to nuannuan7@gmail.com
-- ============================================
-- Replace 'owner' with the desired role: admin, staff, owner, investor
-- You can assign multiple roles if needed

insert into public.user_roles (user_id, role_id, granted_by)
select 
  u.id,
  r.id,
  null  -- granted_by null means system-assigned
from public.users u
cross join public.roles r
where u.email = 'nuannuan7@gmail.com'
  and r.slug = 'owner'  -- <-- Change this to assign a different role
on conflict do nothing;

-- If you want to assign multiple roles to this user, run additional inserts:
-- insert into public.user_roles (user_id, role_id) 
-- select id, 'role-uuid' from public.users where email = 'nuannuan7@gmail.com';

-- Verify the assignment
select 
  u.email,
  r.name as role
from public.users u
join public.user_roles ur on u.id = ur.user_id
join public.roles r on ur.role_id = r.id
where u.email = 'nuannuan7@gmail.com';
