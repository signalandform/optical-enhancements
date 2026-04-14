'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getNewContactsCount, getPendingBookingsCount } from '@/lib/queries';

export default function AdminDashboard() {
  const [newContacts, setNewContacts] = useState<number | null>(null);
  const [pendingBookings, setPendingBookings] = useState<number | null>(null);

  useEffect(() => {
    getNewContactsCount().then(setNewContacts).catch(() => setNewContacts(0));
    getPendingBookingsCount().then(setPendingBookings).catch(() => setPendingBookings(0));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of incoming requests and bookings.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/contacts"
          className="group rounded-2xl border border-white/10 bg-night p-6 transition-colors hover:border-gold/30"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">New Contact Submissions</p>
          <p className="mt-3 font-display text-4xl text-white">
            {newContacts === null ? '…' : newContacts}
          </p>
          <p className="mt-2 text-xs text-muted group-hover:text-gold">View all contacts →</p>
        </Link>

        <Link
          href="/admin/bookings"
          className="group rounded-2xl border border-white/10 bg-night p-6 transition-colors hover:border-gold/30"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Pending Bookings</p>
          <p className="mt-3 font-display text-4xl text-white">
            {pendingBookings === null ? '…' : pendingBookings}
          </p>
          <p className="mt-2 text-xs text-muted group-hover:text-gold">View all bookings →</p>
        </Link>
      </div>
    </div>
  );
}
