import { motion, useScroll, useTransform } from 'framer-motion'
import ReactLenis from 'lenis/react'
import { useRef } from 'react'

const defaultProjects = [
  {
    title: 'Project 1',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center',
  },
  {
    title: 'Project 2',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center',
  },
  {
    title: 'Project 3',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop&crop=center',
  },
]

export const StickyCard_001 = ({ i, title, src, progress, range, targetScale }) => {
  const container = useRef(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-1 sm:px-3 lg:px-4">
      <motion.div
        style={{
          scale,
          top: `calc(-4vh + ${i * 16 + 110}px)`,
        }}
        className="relative -top-[18%] flex h-[300px] w-[92vw] max-w-[760px] origin-top flex-col overflow-hidden rounded-2xl sm:h-[400px] sm:w-[89vw] sm:max-w-[900px] sm:rounded-3xl md:h-[500px] md:w-[86vw] md:max-w-[1020px] lg:h-[620px] lg:w-[82vw] lg:max-w-[1140px]"
      >
        <img
          src={src || '/placeholder.svg'}
          alt={title}
          className="h-full w-full bg-ocean/5 object-cover object-center"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 96vw, (max-width: 768px) 92vw, (max-width: 1024px) 88vw, 1140px"
        />
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = ({ projects = defaultProjects }) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[66vh] pt-[2vh] sm:pb-[76vh] sm:pt-[4vh] lg:pb-[88vh] lg:pt-[5vh]"
      >
        {projects.map((project, i) => {
          const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)

          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              title={project.title}
              src={project.src}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}

export { ImagesScrollingAnimation }