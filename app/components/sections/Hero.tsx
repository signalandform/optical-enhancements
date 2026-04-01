import Image from 'next/image';

function StoreInfoCard() {
  return (
    <div className="mock-frame card-sheen p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">DeSoto, TX</p>
          <p className="mt-1 text-xs uppercase tracking-[0.35em] text-muted">(Studio)</p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="#intake"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-night"
          >
            Book now
          </a>
          <a
            href="#intake"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Get quote
          </a>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Phone</p>
          <a className="mt-1 block text-white" href="tel:14695316909">
            (469) 531‑6909
          </a>
        </div>
        <div className="grid-divider pt-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Address</p>
          <p className="mt-1 text-white/90">1516 Osprey Dr #207, DeSoto, TX</p>
        </div>
        <div className="grid-divider pt-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Hours</p>
          <p className="mt-1 text-white/90">Mon–Sat: 8am–6pm</p>
          <p className="text-muted">Closed Sundays</p>
        </div>

        <div className="grid-divider pt-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Store amenities</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.22em] text-white/80">
            <li>Free WiFi</li>
            <li>Pet friendly</li>
            <li>Overnight drop-off</li>
            <li>Mobile concierge</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="panel p-8 md:p-10" id="store">
      <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:text-left">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/logo.png"
                alt="Optical Auto Enhancements"
                fill
                sizes="(max-width: 1024px) 420px, 420px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <p className="section-label">The studio</p>
          <h2 className="metallic-text font-display text-3xl leading-tight">Metallic protection, clean installs.</h2>
          <p className="max-w-md text-sm text-muted">
            This section mirrors the location-style “at a glance” block—now with a larger logo on the left for quick
            identification.
          </p>
        </div>
        <StoreInfoCard />
      </div>
    </section>
  );
}
