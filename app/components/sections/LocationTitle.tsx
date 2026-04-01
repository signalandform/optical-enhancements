import Image from 'next/image';

export function LocationTitle() {
  return (
    <section className="grid items-center gap-6 md:grid-cols-[240px_1fr]">
      <div className="mx-auto w-full max-w-[260px] md:mx-0">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/logo.png"
            alt="Optical Auto Enhancements"
            fill
            sizes="(max-width: 768px) 260px, 240px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="text-center md:text-left">
        <p className="section-label">Optical Auto Enhancements</p>
        <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          Window Tinting and Automotive Styling Services of DeSoto, Texas
        </h1>
        <p className="mt-4 text-sm text-muted">
          Structural base: Tint World location page. Visual system: Optical black + metallic gold.
        </p>
      </div>
    </section>
  );
}
