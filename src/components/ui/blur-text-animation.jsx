import { useEffect, useMemo, useRef, useState } from 'react'

const seededFraction = (index) => {
  const x = Math.sin((index + 1) * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function BlurTextAnimation({
  text = 'Elegant blur animation that brings your words to life with cinematic transitions.',
  words,
  className = '',
  fontSize = '',
  fontFamily = "font-['Avenir_Next',_'Avenir',_system-ui,_sans-serif]",
  textColor = 'text-current',
  animationDelay = 4000,
  as = 'p',
  repeat = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const rootRef = useRef(null)
  const animationTimeoutRef = useRef(null)
  const resetTimeoutRef = useRef(null)
  const hasTriggeredRef = useRef(false)

  const textWords = useMemo(() => {
    if (words) return words

    const splitWords = text.split(' ').filter(Boolean)
    const totalWords = splitWords.length || 1

    return splitWords.map((word, index) => {
      const progress = index / totalWords
      const exponentialDelay = Math.pow(progress, 0.8) * 0.5
      const baseDelay = index * 0.06
      const microVariation = (seededFraction(index) - 0.5) * 0.05

      return {
        text: word,
        duration: 0.9 + Math.cos(index * 0.3) * 0.12,
        delay: baseDelay + exponentialDelay + microVariation,
        blur: 10 + Math.floor(seededFraction(index + 17) * 7),
        scale: 0.95 + Math.sin(index * 0.2) * 0.03,
      }
    })
  }, [text, words])

  useEffect(() => {
    const clearTimers = () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current)
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    }

    const triggerAnimation = () => {
      setTimeout(() => {
        setIsAnimating(true)
      }, 120)

      let maxTime = 0
      textWords.forEach((word) => {
        const totalTime = word.delay + word.duration
        maxTime = Math.max(maxTime, totalTime)
      })

      animationTimeoutRef.current = setTimeout(() => {
        if (!repeat) return

        setIsAnimating(false)
        resetTimeoutRef.current = setTimeout(() => {
          triggerAnimation()
        }, animationDelay)
      }, (maxTime + 0.5) * 1000)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)
        if (!isVisible) return

        if (!repeat && hasTriggeredRef.current) return

        hasTriggeredRef.current = true
        triggerAnimation()
      },
      {
        threshold: 0.2,
      },
    )

    if (rootRef.current) observer.observe(rootRef.current)

    return () => {
      clearTimers()
      observer.disconnect()
    }
  }, [animationDelay, repeat, textWords])

  const Tag = as

  return (
    <Tag ref={rootRef} className={`${textColor} ${fontSize} ${fontFamily} ${className}`}>
      {textWords.map((word, index) => (
        <span
          key={`${word.text}-${index}`}
          className={`inline-block transition-all ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transitionDuration: `${word.duration}s`,
            transitionDelay: `${word.delay}s`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: isAnimating ? 'blur(0px) brightness(1)' : `blur(${word.blur}px) brightness(0.6)`,
            transform: isAnimating
              ? 'translateY(0) scale(1) rotateX(0deg)'
              : `translateY(14px) scale(${word.scale || 1}) rotateX(-12deg)`,
            marginRight: '0.32em',
            willChange: 'filter, transform, opacity',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            textShadow: isAnimating ? '0 2px 8px rgba(255,255,255,0.08)' : '0 0 22px rgba(255,255,255,0.24)',
          }}
        >
          {word.text}
        </span>
      ))}
    </Tag>
  )
}

export function Component() {
  return <BlurTextAnimation />
}