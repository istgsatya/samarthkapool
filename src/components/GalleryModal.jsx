import { memo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const swipeConfidenceThreshold = 900

const GalleryModal = ({ images, activeIndex, onClose, onNavigate }) => {
  const activeImage = activeIndex !== null ? images[activeIndex] : null

  useEffect(() => {
    if (!activeImage) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, onClose, onNavigate])

  return (
    <AnimatePresence>
      {activeImage ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.button
            className="absolute right-4 top-4 rounded-full border border-white/35 bg-white/10 p-2 text-white backdrop-blur-md"
            onClick={onClose}
            whileTap={{ scale: 0.94 }}
            aria-label="Close gallery preview"
          >
            <span className="inline-block w-4 text-center leading-none">✕</span>
          </motion.button>

          <motion.button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-white backdrop-blur-md"
            whileTap={{ scale: 0.94 }}
            onClick={(event) => {
              event.stopPropagation()
              onNavigate(-1)
            }}
            aria-label="Previous image"
          >
            ‹
          </motion.button>

          <motion.button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-white backdrop-blur-md"
            whileTap={{ scale: 0.94 }}
            onClick={(event) => {
              event.stopPropagation()
              onNavigate(1)
            }}
            aria-label="Next image"
          >
            ›
          </motion.button>

          <motion.img
            key={activeImage}
            src={activeImage}
            alt="Resort gallery preview"
            className="ambient-photo gpu-layer max-h-[82vh] w-full max-w-4xl rounded-3xl object-cover"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            loading="lazy"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) onNavigate(1)
              if (swipe > swipeConfidenceThreshold) onNavigate(-1)
            }}
          />

          <p className="absolute bottom-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/90 backdrop-blur">
            {activeIndex + 1} / {images.length}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default memo(GalleryModal)
