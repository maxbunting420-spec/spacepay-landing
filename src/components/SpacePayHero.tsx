"use client"

import { motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1] as const;

export function SpacePayHero() {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <style>{`
        @keyframes sp-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sp-spin-slow {
          animation: sp-spin-slow 60s linear infinite;
        }
        @keyframes sp-spin-slow-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .sp-spin-slow-rev {
          animation: sp-spin-slow-rev 60s linear infinite;
        }
      `}</style>

      <div
        className="relative w-full h-screen overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Background Decorative Layer — identical to original */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px) rotateX(15deg)",
            transformOrigin: "center bottom",
            opacity: 1,
          }}
        >
          {/* Image 3 (Back) - spins clockwise */}
          <div className="absolute inset-0 sp-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "2000px",
                height: "2000px",
                transform: "translate(-50%, -50%) rotate(279.05deg)",
                zIndex: 0,
              }}
            >
              <img
                src="/hero-plane-back.png"
                alt=""
                className="w-full h-full object-contain"
                style={{ opacity: 0.5 }}
              />
            </div>
          </div>

          {/* Image 2 (Middle) - spins counter-clockwise */}
          <div className="absolute inset-0 sp-spin-slow-rev">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "1000px",
                height: "1000px",
                transform: "translate(-50%, -50%) rotate(304.42deg)",
                zIndex: 1,
              }}
            >
              <img
                src="/hero-plane-mid.png"
                alt=""
                className="w-full h-full object-contain"
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>

          {/* Image 1 (Front) - spins clockwise */}
          <div className="absolute inset-0 sp-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "800px",
                height: "800px",
                transform: "translate(-50%, -50%) rotate(48.33deg)",
                zIndex: 2,
              }}
            >
              <img
                src="/hero-plane-front.png"
                alt=""
                className="w-full h-full object-contain"
                style={{ opacity: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Gradient Overlay — white fade from bottom */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #ffffff 10%, rgba(255,255,255,0.8) 40%, transparent 100%)",
          }}
        />

        {/* Content — bottom center */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-center tracking-tight text-[#0a0a0a]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.8, ease }}
          >
            One checkout
            <br />
            for all crypto.
          </motion.h1>

          <motion.p
            className="text-lg font-medium text-[#94a3b8] text-center max-w-[440px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease }}
          >
            Accept crypto payments from any wallet. Receive fiat same-day. Zero gas fees for your customers.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
