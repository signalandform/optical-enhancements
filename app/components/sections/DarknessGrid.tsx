'use client';

import { useMemo, useState } from 'react';

type TintTile = {
  vlt: number;
  label: string;
};

const tintTiles: TintTile[] = [
  { vlt: 5, label: 'LIMO' },
  { vlt: 15, label: 'DARK' },
  { vlt: 30, label: 'LEGAL TX' },
  { vlt: 50, label: 'MEDIUM' },
  { vlt: 70, label: 'CLEAR' },
];

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

const previewCarImage =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80';

function PreviewCard({
  selected,
  overlayOpacity,
  className,
}: {
  selected: TintTile;
  overlayOpacity: number;
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        'overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.45))]'
      }
    >
      <div className="relative h-56 sm:h-64">
        <div className="absolute inset-0 bg-[radial-gradient(600px_240px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.6))]" />

        {/* Sports car preview image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${previewCarImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

        {/* Tint overlay that responds to the selected VLT */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

        <div className="absolute left-5 top-8 text-[72px] font-extrabold leading-none text-white/20 sm:text-[84px]">
          {String(selected.vlt).padStart(2, '0')}%
        </div>
        <div className="absolute left-6 top-[152px] text-xs font-semibold uppercase tracking-[0.35em] text-gold sm:top-[168px]">
          {selected.label}
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/90"
        >
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-gold to-gold-dark" />
          Exterior preview
        </button>
      </div>
    </div>
  );
}

export function DarknessGrid() {
  const [selected, setSelected] = useState<TintTile>(tintTiles[2]);

  const overlayOpacity = useMemo(() => {
    // Map VLT (5–70) to overlay darkness (0.75–0.15). Lower VLT -> darker.
    const vlt = selected.vlt;
    const minV = 5;
    const maxV = 70;
    const t = (vlt - minV) / (maxV - minV); // 0 at 5, 1 at 70
    const opacity = 0.75 - t * 0.6;
    return clamp(0.15, opacity, 0.85);
  }, [selected.vlt]);

  return (
    <section className="panel p-8" id="visualizer">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[420px_1fr] lg:items-start">
        {/* Controls (mobile-first card) */}
        <div className="w-full max-w-[420px] justify-self-center lg:justify-self-start">
          <div className="mock-frame card-sheen p-6">
            <header className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Optical</p>
            </header>

            <div className="mt-6 space-y-3">
              <h2 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
                DARKNESS
                <span className="block metallic-text text-4xl sm:text-5xl">VISUALIZER</span>
              </h2>
              <p className="text-sm text-muted">
                Selecting the right percentage is about balancing privacy, style, and visibility—from the nearly clear 70%
                to the private 5%.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {tintTiles.map((tile) => {
                const active = tile.vlt === selected.vlt;
                return (
                  <button
                    key={tile.vlt}
                    type="button"
                    onClick={() => setSelected(tile)}
                    className={`flex h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border text-center transition-all sm:h-[92px] ${
                      active
                        ? 'border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.08)] shadow-[0_10px_30px_rgba(212,175,55,0.10)]'
                        : 'border-white/10 bg-black/35 hover:border-[rgba(212,175,55,0.25)]'
                    }`}
                  >
                    <span className={`text-lg font-extrabold ${active ? 'text-[rgba(255,246,222,0.95)]' : 'text-white/90'}`}>
                      {String(tile.vlt).padStart(2, '0')}%
                    </span>
                    <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${active ? 'text-gold' : 'text-white/35'}`}>
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl border border-[rgba(212,175,55,0.16)] bg-black/25 p-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-r from-gold to-gold-dark text-xs font-extrabold text-night">
                i
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-white/80">PRO TIP:</span> 30% film typically reads between 25%–28% on a
                tint meter due to roughly 3% variability in readouts—keeping you compliant with the 25% Texas legal limit for
                front side windows. Back and rear windows have no limit.
              </p>
            </div>

            {/* Mobile preview inside the card */}
            <div className="mt-7 lg:hidden">
              <PreviewCard selected={selected} overlayOpacity={overlayOpacity} />
            </div>
          </div>
        </div>

        {/* Desktop preview panel */}
        <div className="hidden lg:block">
          <PreviewCard
            selected={selected}
            overlayOpacity={overlayOpacity}
            className="mock-frame card-sheen p-6"
          />
          <div className="mt-4 text-sm text-muted">
            Preview darkness updates with selection (lower VLT → darker overlay).
          </div>
        </div>
      </div>
    </section>
  );
}
