'use client';

import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? '');
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }

    setMessage({ type: 'success', text: 'Password updated successfully.' });
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">Account</h1>
        <p className="mt-1 text-sm text-muted">Manage your admin account settings.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-night p-6">
        <h2 className="mb-4 font-display text-xl text-white">Profile</h2>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Email</p>
            <p className="mt-1 text-white">{email || '…'}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-night p-6">
        <h2 className="mb-4 font-display text-xl text-white">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">New Password</span>
            <input
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Confirm New Password</span>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
              placeholder="Re-enter your new password"
              autoComplete="new-password"
            />
          </label>

          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'border-green-500/30 bg-green-500/10 text-green-300'
                  : 'border-red-500/30 bg-red-500/10 text-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night disabled:opacity-50"
          >
            {saving ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}
