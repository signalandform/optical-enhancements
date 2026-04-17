'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBooking, updateBooking, type Booking } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

const STATUSES: Booking['status'][] = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getBooking(id).then((b) => {
      setBooking(b);
      setStatus(b.status);
      setAdminNotes(b.admin_notes ?? '');
    });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await updateBooking(id, { status, admin_notes: adminNotes });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!booking) {
    return <p className="py-8 text-center text-sm text-muted">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/bookings" className="text-sm text-muted hover:text-white">
          ← Bookings
        </Link>
        <StatusBadge status={booking.status} />
        {booking.customer_id && (
          <Link
            href={`/admin/customers/${booking.customer_id}`}
            className="text-xs text-gold hover:underline"
          >
            View customer →
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="mb-4 font-display text-xl text-white">Booking Details</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Customer Name</dt>
              <dd className="mt-1 text-white">{booking.customer_name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${booking.customer_email}`} className="text-gold hover:underline">
                  {booking.customer_email}
                </a>
              </dd>
            </div>
            {booking.customer_phone && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${booking.customer_phone}`} className="text-gold hover:underline">
                    {booking.customer_phone}
                  </a>
                </dd>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Service</dt>
                <dd className="mt-1 text-white">{booking.service_type}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Preferred Date</dt>
                <dd className="mt-1 text-white">
                  {new Date(booking.preferred_date).toLocaleDateString()}
                </dd>
              </div>
            </div>
            {booking.preferred_time && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Preferred Time</dt>
                <dd className="mt-1 text-white">{booking.preferred_time}</dd>
              </div>
            )}
            {booking.details && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Details</dt>
                <dd className="mt-1 whitespace-pre-wrap text-white">{booking.details}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Submitted</dt>
              <dd className="mt-1 text-muted">
                {new Date(booking.created_at).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="mb-4 font-display text-xl text-white">Manage</h2>

          <div className="space-y-4">
            <label className="block space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Admin Notes</span>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                placeholder="Internal notes about this booking…"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              {saved && <span className="text-xs text-green-400">Saved</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
