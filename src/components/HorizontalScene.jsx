import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HorizontalScene = ({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  renderCard,
  onCardClick,
  reducedMotion = false,
  sectionClassName = '',
  trackClassName = '',
  cardClassName = '',
  splitTitle = false,
}) => {
  const scrollerRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        let strongest = null
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (!strongest || entry.intersectionRatio > strongest.intersectionRatio) {
            strongest = entry
          }
        })

        if (strongest?.target?.dataset?.index) {
          setActiveIndex(Number(strongest.target.dataset.index))
        }
      },
      {
        root: scroller,
        threshold: [0.45, 0.65, 0.85],
      },
    )

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [items.length])

  return (
  <section id={id} className={`ambient-band relative snap-start px-4 py-16 sm:px-5 sm:py-20 ${sectionClassName}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto mb-6 max-w-6xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-turquoise">{eyebrow}</p>
        <h2
          className="mt-3 max-w-2xl font-display text-3xl leading-tight text-ocean sm:text-4xl"
          data-split={splitTitle || undefined}
        >
          {title}
        </h2>
        <p className="mt-3 max-w-lg text-sm text-ocean/70">{subtitle}</p>
      </motion.div>

      <div
        ref={scrollerRef}
        className={`horizontal-snap mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-3 sm:gap-4 ${trackClassName}`}
      >
        {items.map((item, index) => (
          <motion.article
            key={item.image + item.title}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
            data-index={index}
            onClick={() => onCardClick?.(index)}
            onKeyDown={(event) => {
              if (!onCardClick) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onCardClick(index)
              }
            }}
            tabIndex={onCardClick ? 0 : -1}
            role={onCardClick ? 'button' : undefined}
            aria-label={onCardClick ? `Open ${item.title || `item ${index + 1}`}` : undefined}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
            whileTap={{ scale: 0.985 }}
            whileHover={reducedMotion ? undefined : { y: -3 }}
            className={`gpu-layer group ambient-frame relative min-w-[86vw] snap-center overflow-hidden rounded-[24px] transition duration-300 sm:min-w-[58vw] sm:rounded-[26px] ${
              onCardClick ? 'cursor-pointer' : ''
            } ${
              activeIndex === index
                ? 'scale-100 opacity-100 shadow-[0_14px_30px_rgba(10,37,64,0.14)]'
                : 'scale-[0.975] opacity-80 shadow-[0_8px_18px_rgba(10,37,64,0.08)]'
            } ${cardClassName}`}
          >
            {renderCard(item, index, activeIndex === index)}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default memo(HorizontalScene)
