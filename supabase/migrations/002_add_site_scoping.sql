-- Add per-site admin scoping.
-- sites text[] on cms_admins: '{all}' = every site, '{hilltop}' = Hilltop only,
-- '{optical}' = Optical only, or any combination like '{hilltop,optical}'.
-- Default '{all}' preserves existing admin access.

alter table public.cms_admins
  add column sites text[] not null default '{all}';

-- ======================
-- OPTICAL: contact_submissions
-- ======================
drop policy "admin_select_contacts" on public.contact_submissions;
create policy "admin_select_contacts"
  on public.contact_submissions for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "admin_update_contacts" on public.contact_submissions;
create policy "admin_update_contacts"
  on public.contact_submissions for update to authenticated
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

-- ======================
-- OPTICAL: bookings
-- ======================
drop policy "admin_select_bookings" on public.bookings;
create policy "admin_select_bookings"
  on public.bookings for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('optical' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "admin_update_bookings" on public.bookings;
create policy "admin_update_bookings"
  on public.bookings for update to authenticated
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

-- ======================
-- HILLTOP: cms_blog_posts
-- ======================
drop policy "cms_admin_read_all_posts" on public.cms_blog_posts;
create policy "cms_admin_read_all_posts"
  on public.cms_blog_posts for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "cms_admin_write_posts" on public.cms_blog_posts;
create policy "cms_admin_write_posts"
  on public.cms_blog_posts for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- HILLTOP: cms_events
-- ======================
drop policy "cms_admin_read_all_events" on public.cms_events;
create policy "cms_admin_read_all_events"
  on public.cms_events for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "cms_admin_write_events" on public.cms_events;
create policy "cms_admin_write_events"
  on public.cms_events for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- HILLTOP: cms_food_trucks
-- ======================
drop policy "cms_admin_read_all_trucks" on public.cms_food_trucks;
create policy "cms_admin_read_all_trucks"
  on public.cms_food_trucks for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "cms_admin_write_trucks" on public.cms_food_trucks;
create policy "cms_admin_write_trucks"
  on public.cms_food_trucks for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- HILLTOP: cms_page_content
-- ======================
drop policy "cms_admin_read_all_page_content" on public.cms_page_content;
create policy "cms_admin_read_all_page_content"
  on public.cms_page_content for select to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

drop policy "cms_admin_write_page_content" on public.cms_page_content;
create policy "cms_admin_write_page_content"
  on public.cms_page_content for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- HILLTOP: cms_contact_submissions
-- ======================
drop policy "cms_admin_full_contact" on public.cms_contact_submissions;
create policy "cms_admin_full_contact"
  on public.cms_contact_submissions for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- HILLTOP: cms_vendor_submissions
-- ======================
drop policy "cms_admin_full_vendor" on public.cms_vendor_submissions;
create policy "cms_admin_full_vendor"
  on public.cms_vendor_submissions for all to authenticated
  using (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  )
  with check (
    exists (
      select 1 from cms_admins
      where cms_admins.user_id = auth.uid()
        and ('hilltop' = any(cms_admins.sites) or 'all' = any(cms_admins.sites))
    )
  );

-- ======================
-- Usage: adding a new site-specific admin
-- ======================
-- INSERT INTO cms_admins (user_id, sites) VALUES ('uuid-here', '{optical}');
-- INSERT INTO cms_admins (user_id, sites) VALUES ('uuid-here', '{hilltop}');
-- INSERT INTO cms_admins (user_id, sites) VALUES ('uuid-here', '{hilltop,optical}');
