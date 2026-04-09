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
    sources: [
      { src: '/videos/paint-protection.mp4', type: 'video/mp4' },
      { src: '/videos/paint-protection.mov', type: 'video/mp4' },
    ],
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
    <div className="mock-frame card-sheen h-full p-5 md:p-6">
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

function LogoCard() {
  return (
    <div className="mock-frame card-sheen flex h-full min-h-[220px] w-full items-center justify-center p-6 md:min-h-[260px] md:p-10">
      <div className="relative h-24 w-[260px] md:h-36 md:w-[400px]">
        <Image src="/images/logo.png" alt="Optical Auto Enhancements" fill sizes="400px" className="object-contain" />
      </div>
    </div>
  );
}

export function Hero() {
  const [activeId, setActiveId] = useState<ServiceVideo['id']>('window-tint');
  const [progress, setProgress] = useState(0);
  const activeVideo = SERVICE_VIDEOS.find((item) => item.id === activeId) ?? SERVICE_VIDEOS[1];
  const activeIndex = SERVICE_VIDEOS.findIndex((item) => item.id === activeVideo.id);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 px-4 md:px-8" id="store">
      <div className="mx-auto w-full max-w-[1520px]">
        <div className="hero-video-wrap relative overflow-hidden rounded-3xl border border-white/10 bg-black/55">
          <div className="relative aspect-[4/5] w-full md:aspect-[16/9]">
            <video
              key={activeVideo.id}
              className="hero-video absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={() => {
                setProgress(0);
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (!video.duration || Number.isNaN(video.duration)) {
                  return;
                }

                setProgress(video.currentTime / video.duration);
              }}
              onEnded={() => {
                const nextIndex = (activeIndex + 1) % SERVICE_VIDEOS.length;
                setProgress(0);
                setActiveId(SERVICE_VIDEOS[nextIndex].id);
              }}
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
                <div className="hide-scrollbar mt-5 flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {SERVICE_VIDEOS.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setProgress(0);
                        setActiveId(service.id);
                      }}
                      className={`relative inline-flex shrink-0 overflow-hidden whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition ${
                        service.id === activeVideo.id
                          ? 'border-gold/80 text-gold-light'
                          : 'border-white/20 bg-black/25 text-white/80 hover:text-white'
                      }`}
                    >
                      {service.id === activeVideo.id ? (
                        <span
                          className="absolute inset-y-0 left-0 bg-gold/20 transition-[width] duration-100"
                          style={{ width: `${Math.min(progress * 100, 100)}%` }}
                          aria-hidden
                        />
                      ) : null}
                      <span className="relative z-10">{service.label}</span>
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

        <div className="mt-6 grid gap-4 md:grid-cols-[3fr_2fr] md:items-stretch">
          <StoreInfoCard />
          <LogoCard />
        </div>
      </div>
    </section>
  );
}
