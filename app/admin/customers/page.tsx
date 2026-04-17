'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCustomers, createCustomer, type Customer } from '@/lib/queries';

export default function CustomersListPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(true);
      getCustomers(search)
        .then(setCustomers)
        .catch(() => setCustomers([]))
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(handle);
  }, [search]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const customer = await createCustomer({
        name: newName,
        email: newEmail,
        phone: newPhone,
        notes: newNotes,
      });
      router.push(`/admin/customers/${customer.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create customer.';
      setFormError(msg);
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Customers</h1>
          <p className="mt-1 text-sm text-muted">
            Lightweight CRM — new customers are auto-added from contact and booking forms.
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-night"
        >
          {showAdd ? 'Close' : '+ Add customer'}
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="mb-4 font-display text-lg text-white">New Customer</h2>
          <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Name *</span>
              <input
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Email</span>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Phone</span>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Notes</span>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              />
            </label>
            {formError && (
              <p className="text-sm text-red-400 md:col-span-2">{formError}</p>
            )}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
              >
                {saving ? 'Creating…' : 'Create customer'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or phone…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted">Loading…</p>
      ) : customers.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          {search ? 'No customers match your search.' : 'No customers yet.'}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-night/50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Name</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Email</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Phone</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/customers/${c.id}`} className="text-white group-hover:text-gold">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.email ?? '—'}</td>
                  <td className="px-4 py-3 text-muted">{c.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(c.updated_at).toLocaleDateString()}
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
