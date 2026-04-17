'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getContact, updateContact, type ContactSubmission } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

const STATUSES: ContactSubmission['status'][] = ['new', 'read', 'replied', 'archived'];

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContact(id).then((c) => {
      setContact(c);
      setStatus(c.status);
      setAdminNotes(c.admin_notes ?? '');
    });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await updateContact(id, { status, admin_notes: adminNotes });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!contact) {
    return <p className="py-8 text-center text-sm text-muted">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/contacts" className="text-sm text-muted hover:text-white">
          ← Contacts
        </Link>
        <StatusBadge status={contact.status} />
        {contact.customer_id && (
          <Link
            href={`/admin/customers/${contact.customer_id}`}
            className="text-xs text-gold hover:underline"
          >
            View customer →
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-night p-6">
          <h2 className="mb-4 font-display text-xl text-white">Submission Details</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Name</dt>
              <dd className="mt-1 text-white">{contact.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.email}`} className="text-gold hover:underline">
                  {contact.email}
                </a>
              </dd>
            </div>
            {contact.phone && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${contact.phone}`} className="text-gold hover:underline">
                    {contact.phone}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Message</dt>
              <dd className="mt-1 whitespace-pre-wrap text-white">{contact.message}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Submitted</dt>
              <dd className="mt-1 text-muted">
                {new Date(contact.created_at).toLocaleString()}
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
                placeholder="Internal notes about this submission…"
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
