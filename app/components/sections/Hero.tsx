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
    <section className="panel p-4 md:p-6" id="store">
      <div className="hero-video-wrap relative overflow-hidden rounded-3xl border border-white/10 bg-black/55">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/9]">
          <div className="absolute inset-0">
            <Image
              src="/images/logo.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              aria-hidden
              priority
            />
          </div>
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/logo.png"
            aria-label="Optical Auto Enhancements hero video"
          >
            <source src="/videos/hero.mov" type="video/quicktime" />
            Your browser does not support the hero video.
          </video>
          <div className="hero-video-overlay absolute inset-0" />
          <div className="relative z-10 flex h-full items-end p-6 md:p-10">
            <div className="max-w-xl">
              <p className="section-label">The studio</p>
              <h2 className="metallic-text mt-3 font-display text-3xl leading-tight md:text-5xl">
                Premium tint, PPF, and windshield protection.
              </h2>
              <p className="mt-4 max-w-lg text-sm text-white/80 md:text-base">
                A cinematic, video-led hero gives the same modern first impression your client liked on XPEL while
                keeping your conversion CTAs front and center.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#intake"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-night"
                >
                  Book now
                </a>
                <a
                  href="#intake"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/25 px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Get quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <StoreInfoCard />
      </div>
    </section>
  );
}
