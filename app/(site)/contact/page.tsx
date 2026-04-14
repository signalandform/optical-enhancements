'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      message,
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('sent');
  }

  function handleReset() {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
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
            <h1 className="font-display text-3xl text-white">Message Sent</h1>
            <p className="mt-3 text-sm text-muted">
              Thanks for reaching out! We&apos;ll get back to you as soon as possible.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Send another message
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
            <p className="section-label">Get in touch</p>
            <h1 className="font-display text-4xl text-white sm:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-sm text-muted">
              Have a question about our services? Send us a message and we&apos;ll get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Name *</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="First & Last"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Email *</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="you@email.com"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="(555) 555-5555"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Message *</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-32 w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
                placeholder="Tell us what you need…"
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
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
