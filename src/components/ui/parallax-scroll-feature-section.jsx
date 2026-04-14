import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import SafeVideo from '../SafeVideo'

const fallbackDescriptions = [
  'Poolside vibes, golden light, and the kind of calm you’ll replay in your head all week.',
  'Quick reel, big mood — this is the side of the resort your camera roll will love.',
  'A tiny preview of the stay energy: relaxed, private, and ready for your next plan.',
]

const AnimatedPreservedLine = ({ text, prefersReducedMotion, translateContent }) => {
  return (
    <motion.p
      style={prefersReducedMotion ? undefined : { y: translateContent }}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-1 max-w-md font-display text-[1.82rem] font-medium italic leading-[1.2] tracking-[0.01em] text-white/95 [text-wrap:balance] sm:mt-2 sm:text-[2.2rem] md:text-[2.45rem]"
    >
      {text}
    </motion.p>
  )
}

const ParallaxVideoRow = ({ section, reverse = false }) => {
  const sectionRef = useRef(null)
  const isFirstReel = section.id === 1
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  })

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0.6, 1])
  const clipProgress = useTransform(scrollYProgress, [0, 0.75], ['inset(0 38% 0 0)', 'inset(0 0% 0 0)'])
  const translateContent = useTransform(scrollYProgress, [0, 1], [-30, 0])

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-[76svh] w-screen items-center justify-center gap-8 px-4 py-6 sm:min-h-[84svh] sm:gap-10 sm:px-6 sm:py-8 md:min-h-screen md:gap-32 md:px-10 md:py-14 ${
        reverse ? 'md:flex-row-reverse' : ''
      } flex-col md:flex-row`}
    >
      <motion.div
        style={{ y: translateContent }}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.26 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-sm text-left"
      >
        {isFirstReel ? (
          <h3 className="font-display text-[2.1rem] leading-tight text-white sm:text-5xl md:text-6xl">
            {section.title}
          </h3>
        ) : null}
        {isFirstReel ? (
          <motion.p
            style={{ y: translateContent }}
            className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base"
          >
            {section.description}
          </motion.p>
        ) : (
          <AnimatedPreservedLine
            text={section.description}
            prefersReducedMotion={prefersReducedMotion}
            translateContent={translateContent}
          />
        )}
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28, scale: 0.96 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="relative w-[min(90vw,24rem)] overflow-hidden rounded-3xl sm:w-[min(78vw,25rem)] md:w-full md:max-w-[22rem]"
      >
        <div className="ambient-border-glow ambient-frame overflow-hidden rounded-3xl p-1.5 sm:p-2">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-ocean/40">
            <SafeVideo
              className="ambient-video h-full w-full object-cover"
              srcWebm={section.video?.replace(/\.mp4(\?.*)?$/i, '.webm$1')}
              srcMp4={section.video}
              poster={section.poster}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const ParallaxScrollFeatureSection = ({ sections = [] }) => {
  const normalized = sections.map((section, index) => ({
    id: section.id ?? index + 1,
    title: section.title || `Resort Feature ${index + 1}`,
    description: section.description || fallbackDescriptions[index % fallbackDescriptions.length],
    video: section.video,
    poster: section.poster,
    reverse: section.reverse ?? index % 2 === 1,
  }))

  return (
    <div className="w-screen">
      <div className="flex min-h-[72svh] w-screen flex-col items-center justify-center px-4 text-center sm:min-h-[88svh]">
        <h2 className="max-w-3xl font-display text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
          Caught you scrolling 👀 — our best resort reels are right below.
        </h2>
        <p className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:mt-12 sm:text-sm">
          Scroll <ArrowDown size={15} />
        </p>
      </div>

      <div className="flex w-full flex-col">
        {normalized.map((section) => (
          <ParallaxVideoRow key={section.id} section={section} reverse={section.reverse} />
        ))}

        {!normalized.length ? (
          <div className="flex min-h-[50vh] w-full items-center justify-center px-4 text-center text-white/70">
            Add videos in `videoLoopSlots` to populate this reel section.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ParallaxScrollFeatureSection
