'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

const serviceLinks = [
  { href: '/window-tint', label: 'Window Tint' },
  { href: '/vehicle-wraps', label: 'Vehicle Wraps' },
  { href: '/paint-protection', label: 'Paint Protection' },
  { href: '/glass-replacement', label: 'Glass Replacement' },
  { href: '/printing-services', label: 'Printing Services' },
] as const;

const navLinkClass =
  'text-xs font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:text-white';
const navLinkActiveClass = 'text-gold';

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-white/50 transition ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);
  const desktopMenuId = useId();

  const isOnServicePage = serviceLinks.some(
    (s) => pathname === s.href || pathname.startsWith(`${s.href}/`)
  );

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setMobileServicesOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-9 w-[120px] shrink-0">
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

        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Primary"
        >
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 ${navLinkClass} ${
                isOnServicePage ? navLinkActiveClass : ''
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={desktopMenuId}
              id={`${desktopMenuId}-trigger`}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <Chevron open={servicesOpen} />
            </button>
            <div
              id={desktopMenuId}
              role="region"
              aria-label="Service pages"
              className={
                servicesOpen
                  ? 'absolute left-0 top-full z-[60] min-w-[min(100vw-3rem,17rem)] pt-1'
                  : 'hidden'
              }
            >
              <ul className="overflow-hidden rounded-2xl border border-white/10 bg-black py-2 shadow-2xl">
                {serviceLinks.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition ${
                          active
                            ? 'bg-white/5 text-gold'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Link
            href="/contact"
            className={`rounded-lg px-3 py-2 ${navLinkClass} ${
              pathname === '/contact' ? navLinkActiveClass : ''
            }`}
          >
            Contact
          </Link>

          <Link
            href="/book-now"
            className="ml-1 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-night"
          >
            Book now
          </Link>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold/60 hover:text-white"
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
              {menuOpen ? (
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
        className={`md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label="Mobile"
          className={`fixed inset-x-0 top-[65px] z-[55] max-h-[min(70vh,calc(100dvh-4rem))] origin-top overflow-y-auto border-b border-white/10 bg-night/95 shadow-2xl transition-all duration-200 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:bg-white/5"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                <span className={isOnServicePage ? 'text-gold' : ''}>Services</span>
                <Chevron open={mobileServicesOpen} />
              </button>
              <ul
                className={`ml-1 border-l border-white/10 pl-3 ${
                  mobileServicesOpen ? 'mt-1' : 'hidden'
                }`}
              >
                {serviceLinks.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-[0.18em] transition ${
                          active
                            ? 'bg-white/5 text-gold'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <Link
                href="/contact"
                className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition ${
                  pathname === '/contact'
                    ? 'bg-white/5 text-gold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>Contact</span>
                <span aria-hidden="true" className="text-white/30">
                  &rsaquo;
                </span>
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href="/book-now"
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-night"
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
