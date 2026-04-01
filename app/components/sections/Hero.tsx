function StoreInfoCard() {
  return (
    <div className="mock-frame card-sheen p-6">
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

function StoreMapCard() {
  return (
    <div className="mock-frame card-sheen p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Store Map</p>
        <div className="flex gap-2">
          <span className="rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[rgba(255,246,222,0.9)]">
            Store Map
          </span>
          <span className="rounded-full border border-white/10 bg-black/25 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            Store Tour
          </span>
        </div>
      </div>
      <div className="mt-5 h-56 rounded-3xl border border-white/10 bg-[radial-gradient(600px_240px_at_20%_20%,rgba(212,175,55,0.12),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.35))]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="panel overflow-hidden p-8 md:p-10" id="store">
      <div className="grid gap-8 lg:grid-cols-2">
        <StoreMapCard />
        <StoreInfoCard />
      </div>
    </section>
  );
}
