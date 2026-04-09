import Link from 'next/link';
import Image from 'next/image';

const nav = [
  { href: '/window-tint', label: 'Window Tint' },
  { href: '/vehicle-wraps', label: 'Vehicle Wraps' },
  { href: '/paint-protection', label: 'Paint Protection' },
  { href: '/glass-replacement', label: 'Glass Replacement' },
];

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur">
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

        <Link
          href="/#intake"
          className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-night"
        >
          Book now
        </Link>
      </div>
    </header>
  );
}
