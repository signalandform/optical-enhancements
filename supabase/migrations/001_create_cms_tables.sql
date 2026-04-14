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

-- cms_admins allow-list (stores admin emails for RLS policies)
create table if not exists public.cms_admins (
  email text primary key
);

alter table public.cms_admins enable row level security;

-- ============================================================
-- RLS Policies: contact_submissions
-- ============================================================

-- Anon can insert (public form submissions)
create policy "anon_insert_contacts"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Authenticated admins can read
create policy "admin_select_contacts"
  on public.contact_submissions
  for select
  to authenticated
  using (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  );

-- Authenticated admins can update (status + notes only)
create policy "admin_update_contacts"
  on public.contact_submissions
  for update
  to authenticated
  using (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  )
  with check (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  );

-- ============================================================
-- RLS Policies: bookings
-- ============================================================

-- Anon can insert (public booking form)
create policy "anon_insert_bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Authenticated admins can read
create policy "admin_select_bookings"
  on public.bookings
  for select
  to authenticated
  using (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  );

-- Authenticated admins can update
create policy "admin_update_bookings"
  on public.bookings
  for update
  to authenticated
  using (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  )
  with check (
    (select exists (
      select 1 from public.cms_admins
      where cms_admins.email = auth.jwt() ->> 'email'
    ))
  );

-- ============================================================
-- Seed: add your admin email(s)
-- ============================================================
-- insert into public.cms_admins (email) values ('your-admin@email.com');
