-- Optical Auto Enhancements: contact_submissions + bookings
-- Shares the existing cms_admins table (user_id FK pattern) for admin access.

-- contact_submissions
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  status      text not null default 'new'
                check (status in ('new', 'read', 'replied', 'archived')),
  admin_notes text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- bookings
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text,
  service_type    text not null,
  preferred_date  date not null,
  preferred_time  text,
  details         text,
  status          text not null default 'pending'
                    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Enable RLS
alter table public.contact_submissions enable row level security;
alter table public.bookings enable row level security;

-- ============================================================
-- RLS Policies: contact_submissions
-- Uses existing cms_admins table (user_id = auth.uid())
-- ============================================================

create policy "anon_insert_contacts"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

create policy "admin_select_contacts"
  on public.contact_submissions
  for select
  to authenticated
  using (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  );

create policy "admin_update_contacts"
  on public.contact_submissions
  for update
  to authenticated
  using (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  )
  with check (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  );

-- ============================================================
-- RLS Policies: bookings
-- ============================================================

create policy "anon_insert_bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

create policy "admin_select_bookings"
  on public.bookings
  for select
  to authenticated
  using (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  );

create policy "admin_update_bookings"
  on public.bookings
  for update
  to authenticated
  using (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  )
  with check (
    exists (select 1 from cms_admins where cms_admins.user_id = auth.uid())
  );
