const tintLevels = ['05%', '10%', '15%', '20%', '25%', '35%', '40%', '45%', '50%', '70%'];

function PreviewPanel() {
  return (
    <div className="mock-frame card-sheen h-56 p-5">
      <div className="flex items-center justify-between">
        <p className="section-label">Visualizer</p>
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[rgba(212,175,55,0.78)]">
          Live
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="h-28 rounded-2xl border border-white/10 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="h-28 rounded-2xl border border-white/10 bg-gradient-to-b from-[rgba(212,175,55,0.16)] to-black/80" />
        <div className="h-28 rounded-2xl border border-white/10 bg-gradient-to-b from-black/20 to-black/85" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="mock-line gold" />
        <div className="mock-line" style={{ width: '82%' }} />
      </div>
    </div>
  );
}

export function DarknessGrid() {
  return (
    <section className="panel p-8" id="visualizer">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="max-w-md space-y-4">
          <p className="section-label">Darkness system</p>
          <h2 className="font-display text-3xl text-white">Choose a VLT. Preview the feel—not the photo.</h2>
          <p className="text-sm text-muted">
            The references you shared lean on high-contrast blocks, metallic strokes, and grid logic. This section keeps
            that “deck” look while staying asset-free.
          </p>

          <div className="mt-6 grid grid-cols-5 gap-3">
            {tintLevels.map((level) => (
              <button
                key={level}
                className={`rounded-2xl border px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] transition-all ${
                  level === '25%'
                    ? 'border-[rgba(212,175,55,0.38)] bg-[rgba(212,175,55,0.08)] text-[rgba(255,246,222,0.95)] shadow-[0_12px_40px_rgba(212,175,55,0.08)]'
                    : 'border-white/10 bg-black/30 text-[rgba(191,195,198,0.85)] hover:border-[rgba(212,175,55,0.22)]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="grid-divider mt-8 pt-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Notes</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>• Texas legal limits vary by vehicle + glass location.</li>
              <li>• Ceramic IR improves heat rejection without going darker.</li>
              <li>• We can match factory tint or go full blackout.</li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <PreviewPanel />
        </div>
      </div>
    </section>
  );
}
