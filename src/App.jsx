import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import SectionHeading from './components/SectionHeading'
import HorizontalScene from './components/HorizontalScene'
import SafeVideo from './components/SafeVideo'
import useResortGsap from './hooks/useResortGsap'
import useIntersectionVideoPlayback from './hooks/useIntersectionVideoPlayback'
import {
  bookingAvailabilityBanner,
  galleryFeatureCards,
  heroBackgroundImage,
  imageShowcaseSlots,
  menuImageCards,
  navItems,
  resortHighlights,
  videoLoopSlots,
} from './data/resortData'

const sectionIds = navItems.map((item) => item.id)
const videoPlaybackOptions = {
  rootMargin: '-15% 0px -15% 0px',
  threshold: 0.2,
}

const mobileNavItems = [
  { id: 'hero', label: 'Home', icon: '⌂' },
  { id: 'menu', label: 'Menu', icon: '🍽' },
  { id: 'gallery', label: 'Gallery', icon: '◫' },
  { id: 'booking', label: 'Contact', icon: '✆' },
]

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const prefersReducedMotion = useReducedMotion()
  const rootRef = useResortGsap({ enabled: !prefersReducedMotion })

  useIntersectionVideoPlayback(videoPlaybackOptions)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.find((entry) => entry.isIntersecting)
        if (inView?.target?.id) {
          setActiveSection(inView.target.id)
        }
      },
      { threshold: 0.45 },
    )

    sectionIds.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMenuOpen(false)
    }
  }

  const sectionEnter = {
    initial: { opacity: 0, y: 18, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.24 },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <div ref={rootRef} className="relative isolate bg-beige font-body text-ocean ambient-band">
      <a
        href="#hero"
        className="sr-only z-[90] rounded bg-black/80 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_0%,rgba(67,198,187,0.22),transparent_52%),radial-gradient(circle_at_80%_100%,rgba(240,138,93,0.2),transparent_48%),radial-gradient(circle_at_50%_50%,rgba(139,215,255,0.08),transparent_58%),linear-gradient(180deg,#e8efeb_0%,#d7e4e0_100%)]" />
      <motion.div
        className="gpu-layer fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-turquoise to-sunset"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed left-0 right-0 top-0 z-[60] px-4 pt-4">
        <div className="ambient-frame relative mx-auto flex max-w-6xl items-center justify-center rounded-full px-4 py-3 backdrop-blur-md">
          <button
            onClick={() => scrollTo('hero')}
            className="w-full pr-10 text-center font-display text-lg tracking-[0.14em] text-ocean sm:text-2xl"
          >
            My Home & Resort
          </button>

          <button
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="main-nav-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="ambient-chip absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-ocean"
          >
            <span className="inline-block w-4 text-center text-base leading-none">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id="main-nav-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="ambient-frame mt-3 overflow-hidden rounded-3xl p-6 backdrop-blur-md"
            >
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-ocean/90 transition hover:bg-ocean/10"
                      onClick={() => scrollTo(item.id)}
                    >
                      {item.label}
                      <span aria-hidden>›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative snap-y snap-proximity overflow-x-clip">
        <section id="hero" className="gsap-hero ambient-band relative min-h-[100svh] snap-start pt-20 sm:pt-24">
          {/* Use the landing image from data as a static hero background */}
          <img
            src={heroBackgroundImage}
            alt="Landing hero"
            className="hero-layer-back ambient-photo gpu-layer absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 px-4 sm:bottom-10">
            <div className="mx-auto w-fit rounded-2xl bg-gradient-to-r from-ocean/82 via-ocean/74 to-turquoise/68 px-7 py-3 shadow-[0_12px_32px_rgba(10,37,64,0.35)] ring-1 ring-white/35 backdrop-blur-[3px] sm:px-9 sm:py-4">
              <h1 className="font-display text-3xl tracking-[0.12em] text-beige drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] sm:text-5xl">
                My Home &amp; Resort
              </h1>
            </div>
          </div>


        </section>

        <motion.section className="snap-start px-4 py-8 sm:px-5 sm:py-10" {...sectionEnter}>
          <div className="mx-auto max-w-6xl">
            <div className="ambient-border-glow relative isolate overflow-hidden rounded-3xl border border-turquoise/35 bg-ocean p-4 text-white shadow-[0_18px_40px_rgba(8,26,46,0.5)] sm:p-6">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(67,198,187,0.22),transparent_42%),linear-gradient(135deg,rgba(8,30,52,0.96),rgba(8,34,58,0.98))]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-turquoise">
                {bookingAvailabilityBanner.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">
                {bookingAvailabilityBanner.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/95 sm:text-base">
                {bookingAvailabilityBanner.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {bookingAvailabilityBanner.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-turquoise/45 bg-white/14 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="ambient-band snap-start px-4 py-16 sm:px-5 sm:py-20" {...sectionEnter}>
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Image Spaces"
              title="Resort photo highlights"
              subtitle="A curated set of three photos from your uploaded collection."
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {imageShowcaseSlots.map((item, index) => (
                <motion.article
                  key={`${item.title}-${index}`}
                  className="ambient-frame ambient-border-glow dynamic-sheen relative aspect-video overflow-hidden rounded-2xl"
                  whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="ambient-photo h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 94vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-black/8" />
                  <p className="absolute bottom-2 left-3 text-xs font-medium text-white/92">{item.title}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="ambient-band snap-start px-4 py-16 sm:px-5 sm:py-20" {...sectionEnter}>
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Video Loops"
              title="Short looping videos for resort moments"
              subtitle="All uploaded resort videos are now live in this section."
            />

            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 sm:gap-4">
              {videoLoopSlots.map((item, index) => (
                <motion.article
                  key={`${item.title}-${index}`}
                  /* Use a portrait aspect ratio so videos render tall like the reference image */
                  className="ambient-frame ambient-border-glow relative overflow-hidden rounded-2xl aspect-[9/16]"
                  whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {item.video ? (
                    <>
                      <SafeVideo
                        className="ambient-video h-full w-full object-cover"
                        srcWebm={item.video?.replace(/\.mp4(\?.*)?$/i, '.webm$1')}
                        srcMp4={item.video}
                        poster={heroBackgroundImage}
                      />
                      {/* subtle overlay for text/contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-black/10" />
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-ocean/25 bg-white/25 p-3 text-center">
                      <span className="text-2xl text-ocean/55" aria-hidden>
                        🎬
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean/70">Add 15s Video</p>
                      <p className="text-[11px] text-ocean/55">Update this slot in data file</p>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="ambient-band snap-start px-4 py-16 sm:px-5 sm:py-20" {...sectionEnter}>
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Resort Highlights"
              title="Better structure for planning your stay"
              subtitle="Everything important at a glance, so guests can decide quickly and confidently."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {resortHighlights.map((item) => (
                <motion.article
                  key={item.title}
                  className="ambient-frame ambient-border-glow relative rounded-2xl p-4"
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <p className="text-2xl" aria-hidden>
                    {item.icon}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ocean">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ocean/75">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

    <motion.section id="menu" className="ambient-band mx-auto max-w-6xl snap-start rounded-[2rem] px-4 py-16 sm:px-5 sm:py-24" {...sectionEnter}>
          <SectionHeading
            eyebrow="Dining Menu"
            title="Explore our full menu"
            subtitle="Browse the three menu pages below with current dishes and pricing."
            splitTitle
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {menuImageCards.map((menuPage, index) => (
              <motion.article
                key={menuPage.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="ambient-frame ambient-border-glow overflow-hidden rounded-3xl p-2.5 sm:p-3"
              >
                <img
                  src={menuPage.image}
                  alt={menuPage.title}
                  className="ambient-photo ambient-photo-luxe gpu-layer aspect-[4/5] w-full rounded-2xl bg-ocean/5 object-contain"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 30vw"
                />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <HorizontalScene
          id="gallery"
          eyebrow="Gallery"
          title="Gallery designed for comfort and privacy"
          subtitle="Swipe through signature gallery frames with clean layouts, soft lighting, and scenic views."
          items={galleryFeatureCards}
          reducedMotion={prefersReducedMotion}
          splitTitle
          cardClassName="feature-panel feature-panel-portrait"
          renderCard={(item, _index, isActive) => (
            <>
              <img
                src={item.image}
                alt={item.title}
                className={`ambient-photo ambient-photo-luxe gpu-layer h-full w-full bg-ocean/10 object-cover transition-transform duration-300 ${
                  isActive ? 'scale-[1.02]' : 'scale-100'
                } group-hover:scale-[1.03]`}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 92vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/28 to-black/52" />
              <div className="absolute left-0 right-0 top-0 p-6 sm:p-7">
                <h3 className="font-display text-3xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">{item.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">{item.blurb}</p>
              </div>
            </>
          )}
        />

        <section id="booking" className="ambient-band snap-start px-4 pb-28 pt-16 sm:px-5 sm:pb-32 sm:pt-24">
          <motion.div
            className="ambient-frame mx-auto max-w-6xl rounded-3xl p-6 shadow-[0_12px_30px_rgba(10,37,64,0.14)] sm:p-7"
            {...sectionEnter}
          >
            <div className="mb-5 h-1 overflow-hidden rounded-full bg-ocean/10">
              <div className="booking-progress-fill h-full scale-x-0 rounded-full bg-gradient-to-r from-turquoise to-sunset" />
            </div>

            <SectionHeading
              eyebrow="Book Now"
              title="Plan your stay in one quick call"
              subtitle="Aron Road, Barbat Pura Petrol Pump ke paas, Raghogarh"
              splitTitle
            />

            <div className="mb-5 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-3 text-sm text-ocean/90">
                <a
                  href="tel:+918269569266"
                  className="ambient-chip flex items-center justify-between rounded-xl px-4 py-3.5"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden>📞</span>
                    Mr samarth agrawal  8269569266
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean/60">Primary</span>
                </a>
                <a
                  href="tel:+917581083567"
                  className="ambient-chip flex items-center justify-between rounded-xl px-4 py-3.5"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden>📞</span>
                    Mr juved khan and altaf khan 7581083567
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean/60">Support</span>
                </a>
                <p className="ambient-chip rounded-xl px-4 py-3.5">📍 Aron Road, Barbat Pura Petrol Pump ke paas, Raghogarh</p>
              </div>

              <div className="ambient-chip rounded-2xl p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-turquoise">Quick Assistance</p>
                <h3 className="mt-2 font-display text-2xl text-ocean">Instant booking help</h3>
                <p className="mt-2 text-sm text-ocean/70">
                  Call or WhatsApp and get room options, pricing, and availability in a few minutes.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <span className="rounded-full bg-ocean/8 px-2.5 py-1.5 text-center text-ocean/75">Fast reply</span>
                  <span className="rounded-full bg-ocean/8 px-2.5 py-1.5 text-center text-ocean/75">Direct booking</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <motion.a
                href="tel:+918269569266"
                className="ripple-btn ambient-action inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
                whileTap={{ scale: 0.98 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              >
                <span aria-hidden>📞</span> Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/918269569266"
                target="_blank"
                rel="noreferrer"
                className="ripple-btn ambient-frame inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ocean"
                whileTap={{ scale: 0.98 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              >
                <span aria-hidden>💬</span> WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

    <nav className="ambient-frame fixed bottom-3 left-1/2 z-[60] w-[95vw] max-w-sm -translate-x-1/2 rounded-full px-2 py-2 backdrop-blur-md">
        <ul className="flex items-center justify-between gap-1">
          {mobileNavItems.map((item) => (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => scrollTo(item.id)}
                className={`w-full rounded-full px-2 py-2 text-[10px] font-medium transition ${
                  activeSection === item.id
                    ? 'bg-ocean text-beige shadow-[0_6px_16px_rgba(10,37,64,0.22)]'
                    : 'text-ocean/75'
                }`}
              >
                <span className="mb-0.5 block text-sm" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <aside className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
        {sectionIds.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              activeSection === id ? 'bg-turquoise scale-125' : 'bg-ocean/25'
            }`}
            aria-label={`Jump to ${id}`}
          />
        ))}
      </aside>

    </div>
  )
}

export default App
