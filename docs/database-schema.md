# Database schema

## Assumptions
- Supabase Auth handles authentication.
- Phase 1 roles are coarse: admin, staff, owner, investor.
- Notifications are in-app only.
- No payments or third-party integrations in Phase 1.

## Tables
- users
- roles
- user_roles
- horses
- horse_photos
- horse_health_records
- horse_weight_logs
- feeding_logs
- race_records
- commercial_activity_records
- insurance_policies
- ownerships
- investor_reports
- report_horses
- uploaded_documents
- notifications
- audit_logs

## User entities
### users
- id UUID primary key from auth.users
- email text
- display_name text
- phone text
- avatar_url text
- status text default active
- created_at timestamptz default now()
- updated_at timestamptz default now()

### roles
- id UUID primary key
- name text
- slug text unique
- description text
- created_at timestamptz default now()

### user_roles
- id UUID primary key
- user_id UUID references users(id) on delete cascade
- role_id UUID references roles(id) on delete cascade
- granted_by UUID references users(id)
- expires_at timestamptz
- created_at timestamptz default now()
- unique(user_id, role_id, granted_by)

## Horse entities
### horses
- id UUID primary key
- name text
- age integer
- sex text
- breed text
- color text
- microchip text
- status text
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

### horse_photos
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- url text
- caption text
- sort_order integer
- created_at timestamptz default now()

## Health and feeding entities
### horse_health_records
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- type text
- date date
- vet text
- findings text
- attachments jsonb
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

### horse_weight_logs
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- date date
- weight_kg numeric
- measured_by text
- notes text
- created_at timestamptz default now()

### feeding_logs
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- date date
- feed_type text
- amount numeric
- unit text
- notes text
- created_at timestamptz default now()

## Race and commercial entities
### race_records
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- race_date date
- race_name text
- venue text
- result text
- prize numeric
- currency text default USD
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

### commercial_activity_records
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- activity_date date
- type text
- counterparty text
- amount numeric
- currency text default USD
- status text
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

## Insurance and ownership entities
### insurance_policies
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- provider text
- policy_number text
- coverage_type text
- start_date date
- end_date date
- premium numeric
- document_url text
- status text
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

### ownerships
- id UUID primary key
- horse_id UUID references horses(id) on delete cascade
- user_id UUID references users(id) on delete cascade
- share_percent numeric
- class text
- start_date date
- end_date date
- is_active boolean default true
- notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

## Reporting entities
### investor_reports
- id UUID primary key
- title text
- report_type text
- period_start date
- period_end date
- status text default draft
- published_at timestamptz
- summary text
- forecast_notes text
- created_at timestamptz default now()
- updated_at timestamptz default now()

### report_horses
- report_id UUID references investor_reports(id) on delete cascade
- horse_id UUID references horses(id) on delete cascade
- primary key(report_id, horse_id)

## Document and notification entities
### uploaded_documents
- id UUID primary key
- horse_id UUID references horses(id) on delete set null
- policy_id UUID references insurance_policies(id) on delete set null
- report_id UUID references investor_reports(id) on delete set null
- uploaded_by UUID references users(id)
- file_url text
- file_name text
- mime_type text
- size_bytes bigint
- category text
- notes text
- created_at timestamptz default now()

### notifications
- id UUID primary key
- user_id UUID references users(id) on delete cascade
- horse_id UUID references horses(id) on delete set null
- type text
- title text
- body text
- scheduled_at timestamptz
- sent_at timestamptz
- read_at timestamptz
- created_at timestamptz default now()

## Audit entity
### audit_logs
- id UUID primary key
- actor_id UUID references users(id)
- action text
- entity_type text
- entity_id UUID
- metadata jsonb
- created_at timestamptz default now()

## Indexes
- idx_horses_status on horses(status)
- idx_horse_health_records_horse_date on horse_health_records(horse_id, date desc)
- idx_horse_weight_logs_horse_date on horse_weight_logs(horse_id, date desc)
- idx_feeding_logs_horse_date on feeding_logs(horse_id, date desc)
- idx_race_records_horse_date on race_records(horse_id, race_date desc)
- idx_insurance_policies_horse_end on insurance_policies(horse_id, end_date)
- idx_ownerships_user_horse on ownerships(user_id, horse_id)
- idx_notifications_user_read on notifications(user_id, read_at)
