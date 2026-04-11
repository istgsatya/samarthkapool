import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroMorphPathB =
  'M124 8C180 12 242 42 255 95C268 148 233 223 172 245C111 267 24 235 6 176C-12 117 39 31 124 8Z'

const splitText = (elements) => {
  elements.forEach((element) => {
    if (!element || element.dataset.splitReady === 'true') return
    const chars = [...(element.textContent || '')]
    element.innerHTML = chars
      .map((char) => `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')
    element.dataset.splitReady = 'true'
  })
}

const useResortGsap = ({ enabled = true } = {}) => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (!enabled || !rootRef.current) return undefined

  const debugMarkers = false

    const context = gsap.context(() => {
      splitText(gsap.utils.toArray('[data-split]'))

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.gsap-hero',
            start: 'top top',
            end: '+=130%',
            scrub: true,
            pin: true,
            markers: debugMarkers,
            anticipatePin: 1,
          },
        })

        heroTimeline
          .to('.hero-layer-back', { yPercent: -8, scale: 1.05, ease: 'none' }, 0)
          .to(
            '.hero-copy',
            {
              yPercent: -4,
              scale: 1.02,
              transformOrigin: 'center center',
              ease: 'none',
            },
            0,
          )
          .to(
            '.hero-shape-wrap',
            {
              rotation: 40,
              scale: 1.25,
              opacity: 0.35,
              ease: 'none',
            },
            0,
          )
          .to('.hero-morph-path', { attr: { d: heroMorphPathB }, ease: 'none' }, 0)

        const featuresPanels = gsap.utils.toArray('.feature-panel')
        const featuresTrigger = document.querySelector('.features-horizontal')
        const featuresTrack = document.querySelector('.features-horizontal-track')

        if (featuresPanels.length > 1 && featuresTrigger && featuresTrack) {
          gsap.to('.features-horizontal-track', {
            xPercent: -100 * (featuresPanels.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: featuresTrigger,
              start: 'top top',
              end: `+=${featuresPanels.length * 70}%`,
              scrub: true,
              pin: true,
              markers: debugMarkers,
              snap: 1 / (featuresPanels.length - 1),
              invalidateOnRefresh: true,
            },
          })
        }

        gsap.to('.gallery-3d-track', {
          rotateY: 10,
          rotateX: -4,
          z: 14,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: '#gallery',
            start: 'top 82%',
            end: 'bottom top',
            scrub: true,
            markers: debugMarkers,
          },
        })

        gsap.utils.toArray('.gallery-card').forEach((card, index) => {
          gsap.to(card, {
            rotateY: index % 2 ? -8 : 8,
            y: index % 2 ? -8 : 8,
            z: index * 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '#gallery',
              start: 'top 80%',
              end: 'bottom top',
              scrub: true,
              markers: false,
            },
          })
        })

        gsap.to('.gallery-mask', {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '#gallery',
            start: 'top 80%',
            end: 'top 42%',
            scrub: true,
            markers: debugMarkers,
          },
        })
      })

      mm.add('(max-width: 767px)', () => {
        gsap.to('.hero-layer-back', {
          yPercent: -6,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: debugMarkers,
          },
        })
      })

      gsap.utils.toArray('[data-split]').forEach((target) => {
        gsap.from(target.querySelectorAll('.split-char'), {
          yPercent: 120,
          opacity: 0,
          stagger: 0.014,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            once: true,
            markers: debugMarkers,
          },
        })
      })

      gsap.utils.toArray('.feature-panel').forEach((panel, index) => {
        gsap.from(panel, {
          xPercent: index % 2 === 0 ? -18 : 18,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 84%',
            once: true,
            markers: debugMarkers,
          },
        })
      })

      gsap.to('.booking-progress-fill', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '#booking',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          markers: debugMarkers,
        },
      })

      ScrollTrigger.refresh()
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [enabled])

  return rootRef
}

export default useResortGsap
