import { useRef } from 'react'

const HolographicCard = ({
  eyebrow,
  title,
  subtitle,
  tags = [],
  className = '',
  hintText = 'Move your finger or mouse over me!'
}) => {
  const cardRef = useRef(null)

  const updateCard = (clientX, clientY) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height)

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 16
    const rotateY = (centerX - x) / 16

    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const resetCard = () => {
    if (!cardRef.current) return

    const card = cardRef.current
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--x', '50%')
    card.style.setProperty('--y', '50%')
    card.style.setProperty('--bg-x', '50%')
    card.style.setProperty('--bg-y', '50%')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={(event) => updateCard(event.clientX, event.clientY)}
      onMouseLeave={resetCard}
      onTouchMove={(event) => {
        const touch = event.touches?.[0]
        if (!touch) return
        updateCard(touch.clientX, touch.clientY)
      }}
      onTouchEnd={resetCard}
  className={`group relative isolate w-full overflow-hidden rounded-3xl border border-white/20 bg-[#071a2e]/90 p-3.5 text-white shadow-[0_18px_40px_rgba(8,26,46,0.45)] transition-transform duration-200 sm:p-6 ${className}`}
      style={{
        '--x': '50%',
        '--y': '50%',
        '--bg-x': '50%',
        '--bg-y': '50%',
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(100%_100%_at_var(--bg-x)_var(--bg-y),rgba(90,231,219,0.2),rgba(20,43,73,0.05)_40%,rgba(10,21,38,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(9,36,62,0.92),rgba(9,28,52,0.96))]" />
      <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.22),transparent_34%)] opacity-70 transition-opacity duration-200 group-active:opacity-90" />

      <div className="relative z-10 text-left">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-turquoise sm:text-[11px] sm:tracking-[0.2em]">
            {eyebrow}
          </p>
        ) : null}

        {title ? (
          <h2 className="mt-1.5 font-display text-[1.45rem] leading-[1.25] tracking-[-0.015em] sm:mt-2 sm:text-3xl sm:leading-tight">
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p className="mt-2 max-w-3xl text-[13px] leading-[1.6] text-white/90 sm:text-base sm:leading-relaxed sm:text-white/95">
            {subtitle}
          </p>
        ) : null}

        {tags?.length ? (
          <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex min-h-9 items-center justify-center rounded-full border border-turquoise/45 bg-white/14 px-2.5 py-1.5 text-center text-[10px] font-semibold uppercase leading-[1.1] tracking-[0.08em] text-white backdrop-blur-sm sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-xs sm:tracking-[0.12em]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-3 hidden text-[11px] uppercase tracking-[0.14em] text-white/60 sm:mt-4 sm:block">{hintText}</p>
      </div>
    </div>
  )
}

export default HolographicCard
