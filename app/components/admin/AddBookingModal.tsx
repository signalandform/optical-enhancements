'use client';

import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { getBookedSlotsForDate } from '@/lib/queries';
import { SERVICE_TYPES, TIME_SLOTS } from '@/lib/constants';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  /** Pre-select a date (YYYY-MM-DD) when opening */
  initialDate?: string;
};

export function AddBookingModal({ open, onClose, onCreated, initialDate }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [details, setDetails] = useState('');
  const [bookingStatus, setBookingStatus] = useState<'pending' | 'confirmed' | 'completed' | 'cancelled'>('confirmed');

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setServiceType(SERVICE_TYPES[0]);
    setPreferredDate(initialDate ?? '');
    setPreferredTime('');
    setDetails('');
    setBookingStatus('confirmed');
    setError('');
  }, [open, initialDate]);

  useEffect(() => {
    if (!preferredDate) {
      setBookedSlots([]);
      return;
    }
    getBookedSlotsForDate(preferredDate)
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]));
  }, [preferredDate]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const { error: err } = await supabase.from('bookings').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      service_type: serviceType,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      details: details || null,
      status: bookingStatus,
    });

    setSaving(false);

    if (err) {
      if (err.code === '23505') {
        setError('That slot is already booked. Please choose a different time.');
      } else {
        setError(err.message);
      }
      return;
    }

    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-night p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-white">New Booking</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Customer Name *</span>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Email *</span>
              <input
                required
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Phone</span>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Service *</span>
            <select
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
            >
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Date *</span>
              <input
                required
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Time *</span>
              <select
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="">Select a time…</option>
                {TIME_SLOTS.map((slot) => {
                  const taken = bookedSlots.includes(slot);
                  return (
                    <option key={slot} value={slot} disabled={taken}>
                      {slot}
                      {taken ? ' (taken)' : ''}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Status</span>
            <select
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value as typeof bookingStatus)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Details</span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              placeholder="Year / make / model, preferences, internal notes…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-gold focus:outline-none"
            />
          </label>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs text-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
            >
              {saving ? 'Creating…' : 'Create booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
