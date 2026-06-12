const reviews = [
  {
    name: "Rahul M.",
    stars: 5,
    text: "Tradeverse City transformed my understanding of technical analysis. The structured approach made complex concepts simple.",
  },
  {
    name: "Priya S.",
    stars: 5,
    text: "The risk management course alone changed how I approach every trade. Highly recommend to any aspiring trader.",
  },
  {
    name: "Arjun K.",
    stars: 5,
    text: "From a complete beginner to a confident swing trader in 6 months. The mentorship at Tradeverse City is unmatched.",
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "oklch(0.10 0 0)" }}
      aria-label="Student Reviews"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 30%), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.4em] text-gold font-semibold uppercase mb-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
            Student Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-2">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground text-sm">
            Rated <span className="text-gold font-bold">4.6</span> out of 5 by our students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card/60 card-glow transition-all duration-300"
            >
              <StarRating count={review.stars} />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="text-xs font-bold text-foreground mt-auto">
                — {review.name}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Overall rating badge */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-4 px-8 py-4 rounded-2xl border border-gold/20 bg-gold/5">
            <div className="text-4xl font-extrabold text-gold">4.6</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">10,000+ Students Trained</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
