import { useState } from 'react'

export default function ImageGallery({
  eyebrow = 'Dining Menu',
  title = 'Explore our full menu',
  subtitle = 'Browse the three menu pages below with current dishes and pricing.',
  items = [],
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="w-full py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-1 sm:px-2">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-turquoise">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-ocean sm:text-5xl">{title}</h2>
          <p className="mt-2 text-sm text-ocean/65 sm:text-base">{subtitle}</p>
        </div>

        <div className="mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:hidden">
          {items.map((item, idx) => (
            <article
              key={item.title || idx}
              className="relative h-[460px] min-w-[86vw] snap-center overflow-hidden rounded-xl border border-white/10 bg-white/95"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-contain object-center"
                loading="lazy"
                decoding="async"
                sizes="86vw"
              />
            </article>
          ))}
        </div>

        <div className="mt-12 hidden h-[620px] w-full items-center gap-2 lg:gap-3 md:flex">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx

            return (
              <button
                key={item.title || idx}
                type="button"
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/95 transition-all duration-500 ${
                  isActive ? 'w-full' : 'w-40 lg:w-44'
                }`}
                aria-label={item.title || `Menu image ${idx + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1280px) 34vw, 26vw"
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
