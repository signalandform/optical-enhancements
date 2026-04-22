import Link from 'next/link';

export default function GlassReplacementPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-8">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Glass Replacement</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Windshield &amp; Auto Glass
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              A cracked or chipped windshield isn&apos;t just a cosmetic issue — it&apos;s a
              structural safety component. Your windshield contributes to roof rigidity and
              proper airbag deployment, so compromised glass means compromised protection.
              We replace windshields and side glass using quality materials and proper
              adhesive curing so you can drive with confidence.
            </p>
            <Link
              href="/book-now"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Schedule replacement
            </Link>
          </div>

          <div className="panel p-8 md:p-10">
            <p className="section-label">When to replace</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              Don&apos;t Wait on Damaged Glass
            </h2>
            <p className="mt-3 text-sm text-muted">
              Temperature swings in Texas can turn a small chip into a full crack
              overnight. Replacement is recommended when:
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
              {[
                'Chips larger than a quarter coin',
                'Cracks longer than 3 inches or a credit card',
                'Multiple branching impact points',
                'Damage directly in your line of sight',
                'Edge cracks that can spread from frame flex',
                'Existing repairs that have failed or spread',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-8">
              <p className="section-label">What to Expect</p>
              <h2 className="mt-4 font-display text-xl text-white">The Process</h2>
              <ol className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-white">1. Assessment:</strong> We inspect the damage
                  and identify the exact glass needed for your vehicle — have your VIN handy
                  for the fastest match.
                </li>
                <li>
                  <strong className="text-white">2. Glass Selection:</strong> We use OEM and
                  OEM-equivalent glass for proper fit, optical clarity, and compatibility with
                  your vehicle&apos;s safety features.
                </li>
                <li>
                  <strong className="text-white">3. Installation:</strong> Old glass is removed,
                  the frame is cleaned and prepped, and the new windshield is bonded with
                  automotive-grade urethane adhesive.
                </li>
                <li>
                  <strong className="text-white">4. ADAS (when it applies):</strong> If your
                  car uses a windshield-mounted camera, some replacements need the driver-assist
                  system recalibrated to manufacturer spec. Many installs don&apos;t need it at
                  all—it depends on the vehicle and the glass. We only do a recalibration when
                  the procedure is required for your VIN, or if the car isn&apos;t reading the
                  camera / road correctly and the safety features aren&apos;t working as they
                  should. Vehicles without that hardware skip this step entirely.
                </li>
                <li>
                  <strong className="text-white">5. Curing &amp; Quality Check:</strong> We verify
                  the seal, clean up, and provide a safe drive-away time — typically 1–2 hours
                  for the adhesive to reach minimum handling strength.
                </li>
              </ol>
            </div>

            <div className="panel p-8">
              <p className="section-label">FAQs</p>
              <h2 className="mt-4 font-display text-xl text-white">Common Questions</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-white">Does insurance cover windshield replacement?</dt>
                  <dd className="mt-1 text-muted">
                    Most comprehensive auto policies cover windshield replacement, often with no
                    deductible. We can help you coordinate with your insurance provider.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">How long does replacement take?</dt>
                  <dd className="mt-1 text-muted">
                    The actual installation takes about 1–2 hours. You&apos;ll need to wait an
                    additional 1–2 hours for the adhesive to cure enough for safe driving.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">What is ADAS calibration?</dt>
                  <dd className="mt-1 text-muted">
                    Modern vehicles mount cameras and sensors to the windshield for safety
                    features like automatic braking and lane keep assist. After a new windshield
                    is installed, these systems need to be recalibrated to function properly.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">OEM vs. aftermarket glass?</dt>
                  <dd className="mt-1 text-muted">
                    OEM glass is made to the automaker&apos;s exact specifications and is
                    recommended for vehicles with heads-up displays, heated windshields, or
                    advanced driver assistance cameras. We&apos;ll help you choose the right
                    option.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Can I add tint to the new windshield?</dt>
                  <dd className="mt-1 text-muted">
                    Absolutely. We can install a ceramic tint strip or full windshield tint
                    after the adhesive has fully cured — usually the next day.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="panel p-8 text-center md:p-10">
            <h2 className="font-display text-2xl text-white">Need glass replaced?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Book an appointment or call{' '}
              <a href="tel:14695316909" className="text-gold hover:underline">(469) 531‑6909</a>{' '}
              — have your VIN ready for the fastest quote.
            </p>
            <Link
              href="/book-now"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Book now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
