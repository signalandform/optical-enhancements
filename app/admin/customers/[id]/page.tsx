'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getCustomer,
  getCustomerBookings,
  getCustomerContacts,
  updateCustomer,
  deleteCustomer,
  type Customer,
  type Booking,
  type ContactSubmission,
} from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getCustomer(id).then((c) => {
      setCustomer(c);
      setName(c.name);
      setEmail(c.email ?? '');
      setPhone(c.phone ?? '');
      setNotes(c.notes ?? '');
    });
    getCustomerBookings(id).then(setBookings).catch(() => setBookings([]));
    getCustomerContacts(id).then(setContacts).catch(() => setContacts([]));
  }, [id]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateCustomer(id, {
      name,
      email: email || null,
      phone: phone || null,
      notes: notes || null,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete() {
    if (!confirm('Delete this customer? Their bookings and contact submissions will remain but become unlinked.')) {
      return;
    }
    setDeleting(true);
    await deleteCustomer(id);
    router.push('/admin/customers');
  }

  if (!customer) {
    return <p className="py-8 text-center text-sm text-muted">Loading…</p>;
  }

  const totalJobs = bookings.length;
  const totalContacts = contacts.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin/customers" className="text-sm text-muted hover:text-white">
          ← Customers
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-red-400 underline hover:text-red-300 disabled:opacity-50"
        >
          {deleting ? 'Deleting…' : 'Delete customer'}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-night p-6">
            <h2 className="mb-4 font-display text-xl text-white">Customer Details</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <label className="block space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Name *</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Notes</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="Preferences, vehicle info, install history, anything you want to remember…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                />
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                {saved && <span className="text-xs text-green-400">Saved</span>}
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-night p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Jobs</p>
              <p className="mt-2 font-display text-3xl text-white">{totalJobs}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-night p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Messages</p>
              <p className="mt-2 font-display text-3xl text-white">{totalContacts}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-night p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Customer Since</p>
            <p className="mt-2 text-sm text-white">
              {new Date(customer.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-night p-6">
            <h2 className="mb-4 font-display text-xl text-white">Job History</h2>
            {bookings.length === 0 ? (
              <p className="text-sm text-muted">No bookings yet.</p>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-gold/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">{b.service_type}</p>
                          <p className="mt-1 text-xs text-muted">
                            {new Date(b.preferred_date).toLocaleDateString()}
                            {b.preferred_time ? ` · ${b.preferred_time}` : ''}
                          </p>
                        </div>
                        <StatusBadge status={b.status} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-night p-6">
            <h2 className="mb-4 font-display text-xl text-white">Messages</h2>
            {contacts.length === 0 ? (
              <p className="text-sm text-muted">No contact submissions from this customer.</p>
            ) : (
              <ul className="space-y-3">
                {contacts.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/admin/contacts/${c.id}`}
                      className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-gold/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-white">{c.message}</p>
                          <p className="mt-1 text-xs text-muted">
                            {new Date(c.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
