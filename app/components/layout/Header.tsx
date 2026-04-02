import Link from 'next/link';
import Image from 'next/image';

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#additional', label: 'Additional' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#intake', label: 'Get Quote' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-3">
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
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#intake"
          className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-night"
        >
          Book now
        </a>
      </div>
    </header>
  );
}
