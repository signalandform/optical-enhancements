-- Expose only date + time of active bookings to the public booking form
-- so it can grey out taken slots without leaking customer PII.
-- The underlying bookings table remains locked down by RLS; this view is
-- the intentional public API surface.

create or replace view public.booking_availability
with (security_invoker = false) as
select preferred_date, preferred_time
from public.bookings
where status in ('pending', 'confirmed')
  and preferred_time is not null;

-- Lock default access and explicitly grant read-only to public roles
revoke all on public.booking_availability from public;
grant select on public.booking_availability to anon, authenticated;

comment on view public.booking_availability is
  'Public-safe view of taken booking slots (date + time only). Used by the booking form to grey out unavailable times. Intentionally bypasses RLS on bookings via security_invoker=false.';
