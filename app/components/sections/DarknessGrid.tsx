const tintTiles = [
  { pct: '05%', label: 'LIMO' },
  { pct: '10%', label: 'DARK' },
  { pct: '15%', label: 'DARK' },
  { pct: '20%', label: 'BALANCE' },
  { pct: '25%', label: 'LEGAL TX' },
  { pct: '35%', label: 'LIGHT' },
];

export function DarknessGrid() {
  return (
    <section className="panel p-8" id="visualizer">
      <div className="mx-auto w-full max-w-[420px]">
        <div className="mock-frame card-sheen p-6">
          <header className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Optical</p>
            <a
              href="#intake"
              className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-night"
            >
              Get a quote
            </a>
          </header>

          <div className="mt-6 space-y-3">
            <h2 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
              DARKNESS
              <span className="block metallic-text text-4xl sm:text-5xl">VISUALIZER</span>
            </h2>
            <p className="text-sm text-muted">
              Selecting the right percentage is about balancing privacy, style, and visibility—from the nearly clear 70% to
              the private 5%.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {tintTiles.map((tile) => (
              <button
                key={tile.pct}
                className={`flex h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border text-center transition-all sm:h-[92px] ${
                  tile.pct === '25%'
                    ? 'border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.08)] shadow-[0_10px_30px_rgba(212,175,55,0.10)]'
                    : 'border-white/10 bg-black/35 hover:border-[rgba(212,175,55,0.25)]'
                }`}
              >
                <span className={`text-lg font-extrabold ${tile.pct === '25%' ? 'text-[rgba(255,246,222,0.95)]' : 'text-white/90'}`}>
                  {tile.pct}
                </span>
                <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${tile.pct === '25%' ? 'text-gold' : 'text-white/35'}`}>
                  {tile.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl border border-[rgba(212,175,55,0.16)] bg-black/25 p-4">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-r from-gold to-gold-dark text-xs font-extrabold text-night">
              i
            </div>
            <p className="text-sm text-muted">
              <span className="font-semibold text-white/80">PRO TIP:</span> 25% is the legal limit for front side windows in
              Texas. Back and rear windows have no limit.
            </p>
          </div>

          <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.45))]">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-[radial-gradient(600px_240px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.6))]" />
              <div className="absolute left-5 top-8 text-[72px] font-extrabold leading-none text-white/20 sm:text-[84px]">25%</div>
              <div className="absolute left-6 top-[136px] text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                LEGAL TX
              </div>
              <button className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/90">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-gold to-gold-dark" />
                Exterior preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
