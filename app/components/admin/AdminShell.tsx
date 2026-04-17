'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/calendar', label: 'Calendar' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/account', label: 'Account' },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const pathname = usePathname();

  const checkAdmin = useCallback(async (s: Session | null) => {
    if (!s) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase
      .from('cms_admins')
      .select('user_id, sites')
      .eq('user_id', s.user.id)
      .maybeSingle();
    const sites: string[] = data?.sites ?? [];
    setIsAdmin(sites.includes('optical') || sites.includes('all'));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      await checkAdmin(s);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      await checkAdmin(s);
    });

    return () => subscription.unsubscribe();
  }, [checkAdmin]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-graphite">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  const userEmail = session?.user?.email?.toLowerCase();

  if (!session || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-graphite px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-night p-8">
          <h1 className="mb-6 text-center font-display text-2xl text-white">Admin Login</h1>

          {session && !isAdmin && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              This account is not authorised for admin access.
              <button onClick={handleLogout} className="mt-2 block w-full text-xs text-red-400 underline">
                Sign out
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
            />
            {authError && <p className="text-center text-xs text-red-400">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-graphite">
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-white/10 bg-night">
        <div className="border-b border-white/10 px-5 py-4">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Optical CMS
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? 'bg-white/10 text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="truncate text-xs text-muted">{userEmail}</p>
          <button
            onClick={handleLogout}
            className="mt-2 text-xs text-muted underline hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
