'use client';

import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { getBookedSlotsForDate } from '@/lib/queries';

const SERVICE_TYPES = [
  'Window Tint',
  'Paint Protection Film',
  'Vehicle Wrap',
  'Windshield / Glass Replacement',
  'Chrome Delete / Graphics',
  'Detailing',
];

const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

function getTodayStr() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function getMaxDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split('T')[0];
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function BookNowPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!preferredDate) {
      setBookedSlots([]);
      setPreferredTime('');
      return;
    }
    setLoadingSlots(true);
    setPreferredTime('');
    getBookedSlotsForDate(preferredDate)
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [preferredDate]);

  const availableSlots = TIME_SLOTS.filter((s) => !bookedSlots.includes(s));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('bookings').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      service_type: serviceType,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      details: details || null,
      status: 'pending',
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('sent');
  }

  function handleReset() {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setServiceType(SERVICE_TYPES[0]);
    setPreferredDate('');
    setPreferredTime('');
    setDetails('');
    setStatus('idle');
    setBookedSlots([]);
  }

  if (status === 'sent') {
    return (
      <main className="site-bg">
        <section className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="panel mx-auto max-w-lg p-8 text-center md:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
              <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-3xl text-white">Booking Submitted</h1>
            <p className="mt-3 text-sm text-muted">
              We&apos;ve received your booking request. We&apos;ll confirm your appointment and reach out with next steps.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Book another service
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="panel p-8 md:p-10">
          <div className="space-y-3 text-center">
            <p className="section-label">Schedule your visit</p>
            <h1 className="font-display text-4xl text-white sm:text-5xl">Book Now</h1>
            <p className="mx-auto max-w-2xl text-sm text-muted">
              Tell us what vehicle you&apos;re bringing in and we&apos;ll reply with available times, film recommendations, and a quote.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Name *</span>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="First & Last"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Email *</span>
              <input
                required
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="you@email.com"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Phone</span>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="(555) 555-5555"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Service *</span>
              <select
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Date *</span>
              <input
                required
                type="date"
                value={preferredDate}
                min={getTodayStr()}
                max={getMaxDateStr()}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </label>

            {preferredDate && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Time Slot *</span>
                {loadingSlots ? (
                  <p className="py-2 text-center text-xs text-muted">Checking availability…</p>
                ) : availableSlots.length === 0 ? (
                  <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-xs text-red-300">
                    No slots available on this date. Please pick another day.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {TIME_SLOTS.map((slot) => {
                      const taken = bookedSlots.includes(slot);
                      const active = preferredTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={taken}
                          onClick={() => setPreferredTime(slot)}
                          className={`rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors ${
                            taken
                              ? 'cursor-not-allowed border-white/5 bg-white/5 text-white/20 line-through'
                              : active
                                ? 'border-gold/50 bg-gold/20 text-gold'
                                : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Details</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="h-28 w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="Year / make / model, preferred tint %, inspiration photos, anything else…"
              />
            </label>

            {status === 'error' && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !preferredTime}
              className="w-full rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
            >
              {status === 'sending' ? 'Submitting…' : 'Submit request'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
