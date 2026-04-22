export default function UnderConstructionPage() {
  return (
    <main className="site-bg relative flex min-h-screen items-center justify-center px-6">
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <p className="section-label">Coming Soon</p>
        <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
          Site Under <span className="metallic-text">Construction</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          We&apos;re putting the finishing touches on something great. In the meantime,
          give us a call for window tint, PPF, wraps, and glass work in DeSoto &amp; the
          greater Dallas area.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="tel:14695316909"
            className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night"
          >
            (469) 531‑6909
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Mon–Sat 9am–6pm
          </p>
        </div>

        <p className="mt-16 text-xs text-white/30">
          © {new Date().getFullYear()} Optical Auto Enhancements · DeSoto, TX
        </p>
      </div>
    </main>
  );
}
