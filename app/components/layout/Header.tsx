'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const nav = [
  { href: '/window-tint', label: 'Window Tint' },
  { href: '/vehicle-wraps', label: 'Vehicle Wraps' },
  { href: '/paint-protection', label: 'Paint Protection' },
  { href: '/glass-replacement', label: 'Glass Replacement' },
  { href: '/printing-services', label: 'Printing Services' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-[120px]">
            <Image
              src="/images/logo.png"
              alt="Optical Auto Enhancements"
              fill
              sizes="120px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book-now"
            className="hidden rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-night sm:inline-flex"
          >
            Book now
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold/60 hover:text-white md:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label="Mobile"
          className={`fixed inset-x-0 top-[65px] origin-top border-b border-white/10 bg-night/95 shadow-2xl transition-all duration-200 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition ${
                      active
                        ? 'bg-white/5 text-gold'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-white/30">
                      &rsaquo;
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link
                href="/book-now"
                className="flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-night"
              >
                Book now
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
