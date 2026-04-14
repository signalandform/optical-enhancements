'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

const SERVICE_TYPES = [
  'Window Tint',
  'Paint Protection Film',
  'Vehicle Wrap',
  'Windshield / Glass Replacement',
  'Chrome Delete / Graphics',
  'Detailing',
];

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('bookings').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      service_type: serviceType,
      preferred_date: preferredDate,
      preferred_time: preferredTime || null,
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

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Preferred Date *</span>
                <input
                  required
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Preferred Time</span>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                >
                  <option value="">No preference</option>
                  <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                  <option value="Afternoon (12pm–3pm)">Afternoon (12pm–3pm)</option>
                  <option value="Late Afternoon (3pm–6pm)">Late Afternoon (3pm–6pm)</option>
                </select>
              </label>
            </div>

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
              disabled={status === 'sending'}
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
