import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import SectionHeading from './components/SectionHeading'
import AnimatedGlowingHeadingBar from './components/ui/animated-glowing-heading-bar'
import CTAWithTextMarquee from './components/ui/cta-with-text-marquee'
import ContainerTextScrollDemo from './components/ui/container-text-scroll-demo'
import DemoOne from './components/ui/demo-images-scrolling'
import ImageGallery from './components/ui/image-gallery'
import AboutSection2 from './components/ui/about-section-2'
import HolographicCard from './components/ui/holographic-card'
import ParallaxScrollFeatureSection from './components/ui/parallax-scroll-feature-section'
import useResortGsap from './hooks/useResortGsap'
import useIntersectionVideoPlayback from './hooks/useIntersectionVideoPlayback'
import {
  bookingAvailabilityBanner,
  heroBackgroundImage,
  menuImageCards,
  navItems,
  resortHighlights,
  scrollingImageProjects,
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

  const videoFeatureSections = videoLoopSlots
    .filter((item) => item.video)
    .map((item, index) => ({
      id: index + 1,
      title: item.title,
      video: item.video,
      poster: heroBackgroundImage,
      description:
        index === 1
          ? 'Flames, flavor, and unforgettable experiences'
          : index === 2
            ? 'Relax. Play. Repeat.'
            : index === 3
              ? 'This is what your evenings are missing.'
              : index === 4
                ? 'Good vibes, cool waters, and better company'
                : 'Poolside vibes, golden light, and the kind of calm you’ll replay in your head all week.',
      reverse: index % 2 === 1,
    }))

  return (
    <div ref={rootRef} className="relative isolate bg-beige font-body text-ocean ambient-band">
      <a
        href="#hero"
        className="sr-only z-[90] rounded bg-black/80 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
  <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_0%,rgba(75,215,200,0.16),transparent_52%),radial-gradient(circle_at_80%_100%,rgba(255,154,106,0.14),transparent_48%),radial-gradient(circle_at_50%_50%,rgba(143,188,255,0.1),transparent_58%),linear-gradient(180deg,#070d19_0%,#0b1220_100%)]" />
      <motion.div
        className="gpu-layer fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-turquoise to-sunset"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed left-0 right-0 top-0 z-[60] px-4 pt-4">
        <AnimatedGlowingHeadingBar
          text="My Home & Resort"
          onTitleClick={() => scrollTo('hero')}
          rightSlot={
            <button
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="main-nav-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="ambient-chip rounded-full p-2 text-ocean"
            >
              <span className="inline-block w-4 text-center text-base leading-none">
                {menuOpen ? '✕' : '☰'}
              </span>
            </button>
          }
        />

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
        <section
          id="hero"
          className="gsap-hero ambient-band relative h-screen min-h-[100dvh] snap-start overflow-hidden pt-0"
        >
          <ContainerTextScrollDemo imageSrc={heroBackgroundImage} />
        </section>

        <motion.section className="snap-start px-4 py-8 sm:px-5 sm:py-10" {...sectionEnter}>
          <div className="mx-auto max-w-6xl">
            <HolographicCard
              className="ambient-border-glow"
              eyebrow={bookingAvailabilityBanner.eyebrow}
              title={bookingAvailabilityBanner.title}
              subtitle={bookingAvailabilityBanner.subtitle}
              tags={bookingAvailabilityBanner.tags}
            />
          </div>
        </motion.section>

        <motion.section className="ambient-band snap-start px-3 py-14 sm:px-4 sm:py-18 lg:px-5 lg:py-20" {...sectionEnter}>
          <div className="mx-auto w-full max-w-[94rem]">
            <SectionHeading
              eyebrow="Image Spaces"
              title="Resort photo highlights"
              subtitle="A cinematic, scroll-stacked tour of resort visuals optimized for mobile-first viewing."
            />
            <DemoOne projects={scrollingImageProjects} />
          </div>
        </motion.section>

        <section className="ambient-band snap-start py-0">
          <ParallaxScrollFeatureSection sections={videoFeatureSections} />
        </section>

        <AboutSection2
          eyebrow="Resort Highlights"
          title="Better structure for planning your stay"
          subtitle="Everything important at a glance, so guests can decide quickly and confidently."
          highlights={resortHighlights}
          reducedMotion={prefersReducedMotion}
        />

    <motion.section id="menu" className="ambient-band mx-auto max-w-6xl snap-start rounded-[2rem] px-4 py-16 sm:px-5 sm:py-24" {...sectionEnter}>
          <ImageGallery
            eyebrow="Dining Menu"
            title="Explore our full menu"
            subtitle="Browse the three menu pages below with current dishes and pricing."
            items={menuImageCards}
          />
        </motion.section>

        <section id="booking" className="ambient-band snap-start px-4 pb-28 pt-16 sm:px-5 sm:pb-32 sm:pt-24">
          <CTAWithTextMarquee
            eyebrow="Book Now"
            title="Plan your stay in one quick call"
            subtitle="Aron Road, Barbat Pura Petrol Pump ke paas, Raghogarh"
            primaryContact="Mr samarth agrawal 8269569266"
            supportContact="Mr juved khan and altaf khan 7581083567"
            callHref="tel:+918269569266"
            supportHref="tel:+917581083567"
            whatsappHref="https://wa.me/918269569266"
            address="Aron Road, Barbat Pura Petrol Pump ke paas, Raghogarh"
            assistanceEyebrow="Quick Assistance"
            assistanceTitle="Instant booking help"
            assistanceBody="Call or WhatsApp and get room options, pricing, and availability in a few minutes."
            badges={['Fast reply', 'Direct booking']}
            marqueeItems={bookingAvailabilityBanner.tags}
            reducedMotion={prefersReducedMotion}
          />
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
