const reviews = [
  {
    quote: 'Third time bringing vehicles in. Clean edges, no contamination, and the quote process is insanely clear.',
    author: 'Corey S.',
  },
  {
    quote: 'Quick, friendly, and top-notch every time. Looks factory.',
    author: 'Athena R.',
  },
  {
    quote: 'Explained the film differences and nailed the percentage I wanted. Very professional.',
    author: 'C. K.',
  },
  {
    quote: 'In and out under two hours. Great job.',
    author: 'Jon H.',
  },
  {
    quote: 'They fit me in last minute and it came out better than expected.',
    author: 'Nina F.',
  },
  {
    quote: 'Awesome customer service. I’ll be back with the next car.',
    author: 'Erica C.',
  },
];

export function Testimonials() {
  return (
    <section className="panel p-8" id="reviews">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="section-label">Recent reviews</p>
            <h2 className="font-display text-3xl text-white">What customers say when the bay door closes.</h2>
          </div>
          <div className="mock-frame card-sheen px-5 py-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.78)]">Rating</p>
            <p className="mt-2 text-2xl font-semibold text-white">5.0</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted">Google-style summary</p>
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
