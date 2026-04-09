export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">Optical Auto Enhancements</p>
          <p className="text-sm text-muted">
            Black + metallic gold vehicle protection—ceramic tint, PPF, glass, and detailing.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">Contact</p>
          <a className="block text-muted hover:text-white" href="tel:14695316909">
            (469) 531‑6909
          </a>
          <p className="text-muted">1516 Osprey Dr #207, DeSoto, TX</p>
          <p className="text-muted">Mon–Sat 8am–6pm · Closed Sundays</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">Quick links</p>
          <a className="block text-muted hover:text-white" href="#services">
            Services
          </a>
          <a className="block text-muted hover:text-white" href="#reviews">
            Reviews
          </a>
          <a className="block text-muted hover:text-white" href="/book-now">
            Get a quote
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Optical Auto Enhancements. All rights reserved.
      </div>
    </footer>
  );
}
