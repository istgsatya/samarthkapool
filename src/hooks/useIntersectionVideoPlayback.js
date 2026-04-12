import { useEffect } from 'react'

const noop = () => {}

const useIntersectionVideoPlayback = ({
  selector = 'video[data-intersection-video="true"]',
  root = null,
  rootMargin = '-35% 0px -35% 0px',
  threshold = 0.5,
  pauseWhenHidden = true,
  respectReducedMotion = false,
} = {}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return noop

    const videos = Array.from(document.querySelectorAll(selector))
    if (!videos.length || typeof IntersectionObserver === 'undefined') return noop

    const isMobileViewport = window.matchMedia?.('(max-width: 768px)').matches
    const effectiveThreshold = isMobileViewport ? Math.min(threshold, 0.3) : threshold
    const effectiveRootMargin = isMobileViewport ? '-20% 0px -20% 0px' : rootMargin

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const shouldConserve = respectReducedMotion && reduceMotion
    const blockedVideos = new Set()

    const handleLoopFallback = (event) => {
      const video = event.currentTarget
      if (!video?.loop) return
      video.currentTime = 0
      playSafe(video)
    }

    const playSafe = (video) => {
      if (video.dataset.bufferReady !== 'true') return

      if (video.readyState < 2) {
        video.load()
      }

      const playPromise = video.play()
      if (playPromise?.then) {
        playPromise
          .then(() => {
            blockedVideos.delete(video)
          })
          .catch(() => {
            blockedVideos.add(video)
          })
      } else {
        blockedVideos.delete(video)
      }
    }

    const pauseAll = () => {
      videos.forEach((video) => video.pause())
    }

    const computeInView = (video) => {
      const rect = video.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
      const ratio = rect.height > 0 ? visibleHeight / rect.height : 0
      return ratio >= effectiveThreshold
    }

    const syncVideoState = () => {
      videos.forEach((video) => {
        const isInView = computeInView(video)
        video.dataset.inview = isInView ? 'true' : 'false'

        if (pauseWhenHidden && document.visibilityState !== 'visible') {
          video.pause()
          return
        }

        if (isInView) {
          playSafe(video)
        } else {
          video.pause()
        }
      })
    }

    const handleGestureRetry = () => {
      videos.forEach((video) => {
        if (video.dataset.inview === 'true' && blockedVideos.has(video)) {
          playSafe(video)
        }
      })
    }

    if (shouldConserve) {
      pauseAll()
      return noop
    }

    const handleReadyState = (event) => {
      const video = event.currentTarget
      if (video?.dataset?.inview === 'true' && document.visibilityState === 'visible') {
        playSafe(video)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          const isInView = entry.isIntersecting && entry.intersectionRatio >= effectiveThreshold

          video.dataset.inview = isInView ? 'true' : 'false'

          if (pauseWhenHidden && document.visibilityState !== 'visible') {
            video.pause()
            return
          }

          if (isInView) {
            playSafe(video)
          } else {
            video.pause()
          }
        })
      },
      {
        root,
        rootMargin: effectiveRootMargin,
        threshold: [0, effectiveThreshold, 1],
      },
    )

    videos.forEach((video) => {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.volume = 0
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('x5-playsinline', 'true')
      video.dataset.inview = 'false'
      video.addEventListener('loadedmetadata', handleReadyState)
      video.addEventListener('loadeddata', handleReadyState)
      video.addEventListener('canplay', handleReadyState)
      video.addEventListener('ended', handleLoopFallback)
      observer.observe(video)
    })

    const handleVisibilityChange = () => {
      if (!pauseWhenHidden) return

      if (document.visibilityState !== 'visible') {
        pauseAll()
        return
      }

      videos.forEach((video) => {
        if (video.dataset.inview === 'true') {
          playSafe(video)
        }
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', syncVideoState)
    window.addEventListener('orientationchange', syncVideoState)
    window.addEventListener('pointerup', handleGestureRetry, { passive: true })
    window.addEventListener('touchend', handleGestureRetry, { passive: true })

    requestAnimationFrame(syncVideoState)

    return () => {
      observer.disconnect()
      videos.forEach((video) => {
        video.removeEventListener('loadedmetadata', handleReadyState)
        video.removeEventListener('loadeddata', handleReadyState)
        video.removeEventListener('canplay', handleReadyState)
        video.removeEventListener('ended', handleLoopFallback)
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', syncVideoState)
      window.removeEventListener('orientationchange', syncVideoState)
      window.removeEventListener('pointerup', handleGestureRetry)
      window.removeEventListener('touchend', handleGestureRetry)
    }
  }, [selector, root, rootMargin, threshold, pauseWhenHidden, respectReducedMotion])
}

export default useIntersectionVideoPlayback
