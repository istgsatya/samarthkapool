import { MessageCircle, PhoneCall } from 'lucide-react'
import { useEffect, useRef } from 'react'

function VerticalMarquee({ children, pauseOnHover = false, reverse = false, className = '', speed = 26 }) {
  const durationStyle = { '--duration': `${speed}s` }

  return (
    <div
      className={`group flex flex-col overflow-hidden ${className}`}
      style={durationStyle}
    >
      <div
        className={`flex shrink-0 flex-col animate-marquee-vertical ${reverse ? '[animation-direction:reverse]' : ''} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 flex-col animate-marquee-vertical ${reverse ? '[animation-direction:reverse]' : ''} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function CTAWithTextMarquee({
  eyebrow,
  title,
  subtitle,
  primaryContact,
  supportContact,
  supportHref,
  address,
  assistanceEyebrow,
  assistanceTitle,
  assistanceBody,
  badges = [],
  marqueeItems = [],
  callHref,
  whatsappHref,
  reducedMotion = false,
}) {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const container = marqueeRef.current
    if (!container) return undefined

    let frameId

    const updateOpacity = () => {
      const items = container.querySelectorAll('.marquee-item-vertical')
      const containerRect = container.getBoundingClientRect()
      const centerY = containerRect.top + containerRect.height / 2

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterY = itemRect.top + itemRect.height / 2
        const distance = Math.abs(centerY - itemCenterY)
        const maxDistance = containerRect.height / 2
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const opacity = 1 - normalizedDistance * 0.72
        item.style.opacity = opacity.toString()
      })

      frameId = requestAnimationFrame(updateOpacity)
    }

    frameId = requestAnimationFrame(updateOpacity)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="ambient-frame mx-auto max-w-6xl rounded-3xl p-6 shadow-[0_12px_30px_rgba(10,37,64,0.14)] sm:p-7">
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-ocean/10">
        <div className="h-full rounded-full bg-gradient-to-r from-turquoise to-sunset" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-turquoise">{eyebrow}</p>
          <h2 className="font-display text-4xl leading-tight text-ocean sm:text-5xl">{title}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-ocean/75 sm:text-base">{subtitle}</p>

          <div className="space-y-3 text-sm text-ocean/90">
            <a href={callHref} className="ambient-chip flex items-center justify-between rounded-xl px-4 py-3.5">
              <span className="flex items-center gap-3">
                <span aria-hidden>📞</span>
                {primaryContact}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean/60">Primary</span>
            </a>
            <a href={supportHref} className="ambient-chip flex items-center justify-between rounded-xl px-4 py-3.5">
              <span className="flex items-center gap-3">
                <span aria-hidden>📞</span>
                {supportContact}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ocean/60">Support</span>
            </a>
            <p className="ambient-chip rounded-xl px-4 py-3.5">📍 {address}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={callHref}
              className="ripple-btn ambient-action inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
            >
              <PhoneCall size={16} /> Call Now
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="ripple-btn ambient-frame inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ocean"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="relative min-h-[22rem] rounded-2xl border border-white/10 bg-ocean/10 p-4 sm:min-h-[26rem] sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-turquoise">{assistanceEyebrow}</p>
          <h3 className="mt-2 font-display text-3xl text-ocean">{assistanceTitle}</h3>
          <p className="mt-2 max-w-sm text-sm text-ocean/70">{assistanceBody}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-ocean/8 px-2.5 py-1.5 text-center text-ocean/75">
                {badge}
              </span>
            ))}
          </div>

          <div ref={marqueeRef} className="relative mt-5 h-44 overflow-hidden sm:h-52">
            <VerticalMarquee pauseOnHover={!reducedMotion} speed={24} className="h-full">
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="marquee-item-vertical py-2 font-display text-3xl leading-tight text-ocean/90 sm:text-4xl"
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0f1a2d] via-[#0f1a2daa] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f1a2d] via-[#0f1a2daa] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
