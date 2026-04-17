-- Customers CRM table
create table if not exists public.customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  phone      text,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive unique email so auto-linking matches regardless of case
create unique index if not exists customers_email_lower_unique
  on public.customers (lower(email))
  where email is not null;

-- Link submissions and bookings to customers
alter table public.contact_submissions
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

alter table public.bookings
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

create index if not exists contact_submissions_customer_id_idx on public.contact_submissions (customer_id);
create index if not exists bookings_customer_id_idx on public.bookings (customer_id);

-- Enable RLS on customers
alter table public.customers enable row level security;

-- Optical admin full access (gated on cms_admins.sites containing 'optical' or 'all')
create policy "admin_select_customers"
  on public.customers for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

create policy "admin_insert_customers"
  on public.customers for insert to authenticated
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

create policy "admin_update_customers"
  on public.customers for update to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

create policy "admin_delete_customers"
  on public.customers for delete to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- Private schema for security definer trigger function
-- (keeps it out of the exposed public API per Supabase security guidelines)
create schema if not exists private;

-- Auto-link trigger: on insert to bookings or contact_submissions, find or
-- create a customer matching by email and link via customer_id.
create or replace function private.link_submission_to_customer()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_customer_id uuid;
  v_name text;
  v_email text;
  v_phone text;
begin
  if TG_TABLE_NAME = 'bookings' then
    v_name  := NEW.customer_name;
    v_email := NEW.customer_email;
    v_phone := NEW.customer_phone;
  else
    v_name  := NEW.name;
    v_email := NEW.email;
    v_phone := NEW.phone;
  end if;

  if v_email is null or v_email = '' then
    return NEW;
  end if;

  select id into v_customer_id
  from public.customers
  where lower(email) = lower(v_email)
  limit 1;

  if v_customer_id is null then
    insert into public.customers (name, email, phone)
    values (v_name, v_email, v_phone)
    returning id into v_customer_id;
  else
    -- fill in missing phone if we now have one
    update public.customers
    set phone = coalesce(phone, v_phone),
        updated_at = now()
    where id = v_customer_id
      and phone is null
      and v_phone is not null;
  end if;

  NEW.customer_id := v_customer_id;
  return NEW;
end;
$$;

-- Lock down execute so only the trigger can call the function
revoke all on function private.link_submission_to_customer() from public;

create trigger link_contact_submission_to_customer
  before insert on public.contact_submissions
  for each row
  execute function private.link_submission_to_customer();

create trigger link_booking_to_customer
  before insert on public.bookings
  for each row
  execute function private.link_submission_to_customer();

-- Backfill existing submissions and bookings into customers
with distinct_people as (
  select
    lower(trim(email)) as norm_email,
    (array_agg(name order by created_at desc))[1] as latest_name,
    (array_agg(phone order by created_at desc) filter (where phone is not null))[1] as latest_phone
  from (
    select name, email, phone, created_at from public.contact_submissions
    union all
    select customer_name, customer_email, customer_phone, created_at from public.bookings
  ) all_rows
  where email is not null and email <> ''
  group by lower(trim(email))
)
insert into public.customers (name, email, phone)
select latest_name, norm_email, latest_phone
from distinct_people
on conflict do nothing;

update public.contact_submissions cs
set customer_id = c.id
from public.customers c
where cs.customer_id is null
  and cs.email is not null
  and lower(cs.email) = lower(c.email);

update public.bookings b
set customer_id = c.id
from public.customers c
where b.customer_id is null
  and b.customer_email is not null
  and lower(b.customer_email) = lower(c.email);
