'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getContacts, type ContactSubmission } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

const STATUSES: Array<ContactSubmission['status'] | 'all'> = ['all', 'new', 'read', 'replied', 'archived'];

export default function ContactsListPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<ContactSubmission['status'] | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContacts(filter === 'all' ? undefined : filter)
      .then(setContacts)
      .catch(() => setContacts([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white">Contact Submissions</h1>
          <p className="mt-1 text-sm text-muted">Messages from the contact form.</p>
        </div>
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
      ) : contacts.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-night/50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Name</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Email</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/contacts/${c.id}`} className="text-white group-hover:text-gold">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.email}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(c.created_at).toLocaleDateString()}
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
