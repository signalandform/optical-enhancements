const services = [
  { title: 'Auto window tinting', copy: 'Ceramic IR, carbon, and standard films cut to pattern with clean edges.' },
  { title: 'Paint protection film', copy: 'Self-healing PPF in gloss or satin, from impact zones to full body.' },
  { title: 'Alarms & remote start', copy: 'Security and convenience installs with clean wiring and OEM-style integration.' },
  { title: 'Car audio & video', copy: 'Sound upgrades, amplifiers, speakers, and camera systems tuned for clarity.' },
  { title: 'Ceramic coating', copy: 'Hydrophobic protection for paint, wheels, and glass—built for Texas weather.' },
  { title: 'Auto detailing', copy: 'Interior resets, paint correction, and delivery-ready finishing for enthusiasts.' },
];

export function Services() {
  return (
    <section id="services" className="text-black">
      <div className="flex flex-col gap-7">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em]">Auto styling headquarters</p>
          <h2 className="mt-3 font-display text-3xl">More vehicle styling services than anyone in town.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80">
            Structural match to Tint World: bold band headline + service carousel cards with quick actions.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <article
              key={service.title}
              className="min-w-[18rem] rounded-3xl border border-black/15 bg-black/90 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <h3 className="font-display text-xl">{service.title}</h3>
              <p className="mt-3 text-sm text-white/75">{service.copy}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#intake"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em]"
                >
                  Book now
                </a>
                <a
                  href="#intake"
                  className="rounded-full bg-gradient-to-r from-[#FFF6DE] to-[#D4AF37] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-black"
                >
                  Get quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
