'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookings, type Booking } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

const STATUSES: Array<Booking['status'] | 'all'> = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function BookingsListPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Booking['status'] | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBookings(filter === 'all' ? undefined : filter)
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">Bookings</h1>
        <p className="mt-1 text-sm text-muted">Service booking requests from customers.</p>
      </div>

      <div className="flex gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'border-gold/50 bg-gold/20 text-gold'
                : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-night/50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Customer</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Service</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Date</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((b) => (
                <tr key={b.id} className="group transition-colors hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/bookings/${b.id}`} className="text-white group-hover:text-gold">
                      {b.customer_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{b.service_type}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(b.preferred_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
