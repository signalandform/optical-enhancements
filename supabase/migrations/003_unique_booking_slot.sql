-- Enforce one active booking per date+time slot.
-- Only pending and confirmed bookings block a slot.
-- Completed/cancelled slots can be rebooked.
create unique index if not exists bookings_unique_active_slot
  on public.bookings (preferred_date, preferred_time)
  where status in ('pending', 'confirmed');
