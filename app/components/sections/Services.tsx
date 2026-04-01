const services = [
  {
    title: 'Auto window tinting',
    copy: 'Ceramic IR, carbon, and standard films cut to pattern with clean edges.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Paint protection film',
    copy: 'Self-healing PPF in gloss or satin, from impact zones to full body.',
    image:
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Alarms & remote start',
    copy: 'Security and convenience installs with clean wiring and OEM-style integration.',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Car audio & video',
    copy: 'Sound upgrades, amplifiers, speakers, and camera systems tuned for clarity.',
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Ceramic coating',
    copy: 'Hydrophobic protection for paint, wheels, and glass—built for Texas weather.',
    image:
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Auto detailing',
    copy: 'Interior resets, paint correction, and delivery-ready finishing for enthusiasts.',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80',
  },
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

        <div className="hide-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden rounded-3xl">
            {services.map((service) => (
              <article
                key={service.title}
                className="min-w-[18rem] overflow-hidden rounded-3xl border border-black/15 bg-black/90 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="relative h-28 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="p-6">
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
                </div>
              </article>
            ))}
          </div>
      </div>
    </section>
  );
}
