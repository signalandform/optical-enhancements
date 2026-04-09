'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ServiceVideo = {
  id: 'window-tint' | 'vehicle-wraps' | 'paint-protection' | 'glass-replacement';
  label: string;
  href: string;
  heading: string;
  sources: Array<{ src: string; type: string }>;
};

const SERVICE_VIDEOS: ServiceVideo[] = [
  {
    id: 'window-tint',
    label: 'Window Tint',
    href: '/window-tint',
    heading: 'Window Tint',
    sources: [
      { src: '/videos/window-tint.mp4', type: 'video/mp4' },
      { src: '/videos/window-tint.mov', type: 'video/mp4' },
    ],
  },
  {
    id: 'vehicle-wraps',
    label: 'Vehicle Wraps',
    href: '/vehicle-wraps',
    heading: 'Vehicle Wraps',
    sources: [
      { src: '/videos/vehicle-wraps.mp4', type: 'video/mp4' },
      { src: '/videos/vehicle-wraps.mov', type: 'video/mp4' },
    ],
  },
  {
    id: 'paint-protection',
    label: 'Paint Protection',
    href: '/paint-protection',
    heading: 'Paint Protection',
    sources: [{ src: '/videos/paint-protection.mp4', type: 'video/mp4' }],
  },
  {
    id: 'glass-replacement',
    label: 'Glass Replacement',
    href: '/glass-replacement',
    heading: 'Glass Replacement',
    sources: [
      { src: '/videos/glass-replacement.mp4', type: 'video/mp4' },
      { src: '/videos/glass-replacement.mov', type: 'video/mp4' },
    ],
  },
];

function StoreInfoCard() {
  return (
    <div className="mock-frame card-sheen p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">DeSoto, TX</p>
          <p className="mt-1 text-xs uppercase tracking-[0.35em] text-muted">(Studio)</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <a
            href="#intake"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-night"
          >
            Book now
          </a>
          <a
            href="#intake"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Get quote
          </a>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-xs md:text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Phone</p>
          <a className="mt-1 block text-white" href="tel:14695316909">
            (469) 531‑6909
          </a>
        </div>
        <div className="grid-divider pt-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Address</p>
          <p className="mt-1 text-white/90">1516 Osprey Dr #207, DeSoto, TX</p>
        </div>
        <div className="grid-divider pt-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Hours</p>
          <p className="mt-1 text-white/90">Mon–Sat: 8am–6pm</p>
          <p className="text-muted">Closed Sundays</p>
        </div>

        <div className="grid-divider pt-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Store amenities</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.22em] text-white/80">
            <li>Free WiFi</li>
            <li>Overnight drop-off</li>
            <li>Mobile concierge</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [activeId, setActiveId] = useState<ServiceVideo['id']>('vehicle-wraps');
  const activeVideo = SERVICE_VIDEOS.find((item) => item.id === activeId) ?? SERVICE_VIDEOS[1];

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
            key={activeVideo.id}
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/logo.png"
            aria-label="Optical Auto Enhancements hero video"
          >
            {activeVideo.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            Your browser does not support the hero video.
          </video>
          <div className="hero-video-overlay absolute inset-0" />
          <div className="relative z-10 flex h-full items-end p-6 md:p-10">
            <div className="max-w-xl">
              <p className="section-label">Service preview</p>
              <h2 className="metallic-text mt-3 font-display text-3xl leading-tight md:text-5xl">
                {activeVideo.heading}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {SERVICE_VIDEOS.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    className={`inline-flex rounded-full border px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition ${
                      service.id === activeVideo.id
                        ? 'border-gold/80 bg-gold/20 text-gold-light'
                        : 'border-white/20 bg-black/25 text-white/80 hover:text-white'
                    }`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
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
                <Link
                  href={activeVideo.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/25 px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Explore service
                </Link>
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
