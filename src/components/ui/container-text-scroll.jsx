import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ContainerTextScroll = ({
  titleComponent,
  children,
  preserveExistingMotion = false,
  animateTitle = true,
  fullScreen = false,
}) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleDimensions = () => {
    if (preserveExistingMotion) return [1, 1]
    return isMobile ? [0.8, 1] : [0.9, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], preserveExistingMotion ? [0, 0] : [-20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translateY = useTransform(scrollYProgress, [0, 1], preserveExistingMotion ? [0, 0] : [100, 0])
  const titleTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    animateTitle ? (isMobile ? [36, -28] : [56, -36]) : [0, 0],
  )
  const titleScale = useTransform(scrollYProgress, [0, 1], animateTitle ? [0.92, 1.05] : [1, 1])
  const containerClassName = fullScreen
    ? 'relative flex h-screen min-h-[100dvh] w-full items-center justify-center overflow-hidden p-0'
    : 'relative flex h-[70svh] min-h-[28rem] items-center justify-center p-2 md:h-[80svh] md:min-h-[36rem] md:p-6'
  const innerClassName = fullScreen
    ? 'relative flex h-full w-full flex-col items-center justify-center'
    : 'relative flex w-full max-w-6xl flex-col items-center justify-center'

  return (
    <div ref={containerRef} className={containerClassName}>
      <motion.div style={{ translateY }} className={innerClassName}>
        <Card rotate={rotate} scale={scale} fullScreen={fullScreen}>
          {children}

          <motion.div
            style={{ translateY: titleTranslateY, scale: titleScale }}
            className="hero-copy absolute inset-0 z-20 flex items-end justify-center px-4 pb-10 text-center sm:items-center sm:pb-0"
          >
            <div className="text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.75)]">{titleComponent}</div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

const Card = ({ rotate, scale, children, fullScreen = false }) => {
  const cardClassName = fullScreen
    ? 'relative h-full w-full overflow-hidden rounded-none border-0 bg-[#222222] shadow-none'
    : 'relative h-[30rem] w-full overflow-hidden rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] shadow-2xl md:h-[40rem]'

  const innerClassName = fullScreen ? 'h-full w-full' : 'h-full w-full rounded-2xl bg-zinc-900'

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className={cardClassName}
    >
      <div className={innerClassName}>{children}</div>
    </motion.div>
  )
}

export { Card, ContainerTextScroll }