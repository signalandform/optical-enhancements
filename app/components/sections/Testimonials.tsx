const GOOGLE_BUSINESS_URL = 'https://share.google/rb2n8ac9Kvd6zjNsV';

const reviews = [
  {
    quote:
      'I had an excellent experience with optical tint. The staff was very friendly, welcoming, and professional from start to finish. They took the time to answer all my questions and made sure I was comfortable with my tint selection.',
    author: 'Ricky K.',
  },
  {
    quote:
      "Amazing work, took my Supra to get tinted all around, and the work was flawless. Plus there's a nice clean waiting room with snacks and TV — what more can you ask for. The owner takes pride in his work and his shop and treats your car like his own.",
    author: 'Ezequiel A.',
  },
  {
    quote:
      "My husband and I always use Optical Tint for all our vehicle's tint. The quality of the material is top notch and customer service is always excellent. They always take care of our window tinting needs. Definitely worth the drive from Plano! Thank you Junior!",
    author: 'Lorena H.',
  },
  {
    quote:
      "We're extremely happy with the car wrap and tint they did on our vehicles. The team is super friendly, their work is top-notch, and their prices are fantastic. If you're looking for great quality at a great price, definitely reach out to these guys!",
    author: 'Harry R.',
  },
  {
    quote:
      'Excellent tint replacement job for a reasonable price and a good warranty. Great customer service as well. Highly recommend.',
    author: 'Zavier J.',
  },
  {
    quote:
      "Got my Malibu tinted quick! Got nano ceramic and it's the best — thank you for giving me advice on which tint to use. You guys are the best.",
    author: 'Alex R.',
  },
];

export function Testimonials() {
  return (
    <section className="panel p-8" id="reviews">
      <div className="flex flex-col gap-8">
        <div className="sticky top-20 z-10 -mx-2 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/55 px-4 py-4 backdrop-blur md:flex-row md:items-end md:justify-between md:px-5">
          <div className="space-y-3">
            <p className="section-label">Recent reviews</p>
            <h2 className="font-display text-3xl text-white">What customers say when the bay door closes.</h2>
          </div>
          <div className="mock-frame card-sheen px-5 py-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.78)]">Rating</p>
            <p className="mt-2 text-2xl font-semibold text-white">4.9</p>
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-gold-light hover:decoration-gold"
            >
              Google Business profile
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.author} className="mock-frame card-sheen p-6">
              <p className="text-sm leading-relaxed text-white/90">“{review.quote}”</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">
                {review.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
