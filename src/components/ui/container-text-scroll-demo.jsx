import { ContainerTextScroll } from './container-text-scroll'

export default function ContainerTextScrollDemo({ imageSrc }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ContainerTextScroll
        preserveExistingMotion
        animateTitle
        fullScreen
        titleComponent={
          <div className="mx-auto w-fit rounded-2xl border border-white/40 bg-gradient-to-r from-[#071a33]/78 via-[#0a2342]/72 to-[#10325a]/68 px-7 py-3 shadow-[0_12px_36px_rgba(6,20,40,0.45)] ring-1 ring-[#9fd4ff]/40 backdrop-blur-[5px] sm:px-9 sm:py-4">
            <h1 className="font-display text-3xl font-semibold tracking-[0.16em] text-[#f2f6ff] [text-shadow:0_2px_10px_rgba(13,28,58,0.72),0_0_24px_rgba(173,220,255,0.35)] sm:text-5xl">
              My Home &amp; Resort
            </h1>
          </div>
        }
      >
        <img
          src={imageSrc}
          alt="Landing hero"
          className="hero-layer-back ambient-photo gpu-layer h-full w-full object-cover object-center"
          draggable={false}
          loading="eager"
          fetchPriority="high"
        />
      </ContainerTextScroll>
    </div>
  )
}