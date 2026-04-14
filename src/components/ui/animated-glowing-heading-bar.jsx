import React from 'react'

const AnimatedGlowingHeadingBar = ({ text = 'My Home & Resort', onTitleClick, rightSlot, className = '' }) => {
  return (
    <div className={`relative isolate mx-auto w-full max-w-6xl ${className}`}>
      <div className="group relative h-14 w-full sm:h-16">
        <div className="pointer-events-none absolute -inset-x-2 -inset-y-2 -z-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(112,88,255,0.38)_0%,rgba(207,48,170,0.26)_35%,rgba(0,0,0,0)_72%)] blur-2xl opacity-55 transition-all duration-700 group-hover:opacity-100 group-focus-within:opacity-100" />

        <div className="pointer-events-none absolute -inset-[2px] -z-10 overflow-hidden rounded-full blur-[6px]">
          <div className="absolute inset-[-165%] bg-[conic-gradient(from_0deg,rgba(0,0,0,0),#5d43ff_7%,rgba(0,0,0,0)_28%,rgba(0,0,0,0)_50%,#ff3fb9_64%,rgba(0,0,0,0)_90%)] opacity-45 [animation:spin_5.5s_linear_infinite] [animation-play-state:paused] transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:[animation-play-state:running] group-focus-within:[animation-play-state:running]" />
        </div>

        <div className="pointer-events-none absolute -inset-[1px] -z-10 overflow-hidden rounded-full blur-[10px]">
          <div className="absolute inset-[-150%] bg-[conic-gradient(from_35deg,rgba(0,0,0,0),#2d1f9c,rgba(0,0,0,0)_12%,rgba(0,0,0,0)_52%,#8f2a7e,rgba(0,0,0,0)_66%)] opacity-35 [animation:spin_7s_linear_infinite_reverse] [animation-play-state:paused] transition-all duration-700 group-hover:opacity-95 group-focus-within:opacity-95 group-hover:[animation-play-state:running] group-focus-within:[animation-play-state:running]" />
        </div>

        <div className="pointer-events-none absolute inset-[1px] -z-10 overflow-hidden rounded-full blur-[4px]">
          <div className="absolute inset-[-130%] bg-[conic-gradient(from_80deg,rgba(0,0,0,0),#c0b6ff,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#ffc0eb,rgba(0,0,0,0)_60%)] opacity-30 [animation:spin_9s_linear_infinite] [animation-play-state:paused] transition-opacity duration-700 group-hover:opacity-90 group-focus-within:opacity-90 group-hover:[animation-play-state:running] group-focus-within:[animation-play-state:running]" />
        </div>

        <div className="ambient-frame relative flex h-full w-full items-center rounded-full border border-white/20 bg-[#0b1220]/72 px-4 shadow-[0_0_28px_rgba(109,88,255,0.33),0_0_48px_rgba(207,48,170,0.24)] backdrop-blur-md">
          <button
            type="button"
            onClick={onTitleClick}
            className="mx-auto max-w-[75%] truncate text-center font-display text-lg tracking-[0.14em] text-ocean transition-opacity hover:opacity-90 sm:text-2xl"
          >
            {text}
          </button>

          {rightSlot ? <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default AnimatedGlowingHeadingBar