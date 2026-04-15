-- Allow authenticated users to also submit public forms.
-- The anon policies only cover unauthenticated visitors; if an admin
-- or any logged-in user visits the public site, they need INSERT too.

create policy "authenticated_insert_bookings"
  on public.bookings
  for insert
  to authenticated
  with check (true);

create policy "authenticated_insert_contacts"
  on public.contact_submissions
  for insert
  to authenticated
  with check (true);
