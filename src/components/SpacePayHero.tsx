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
        @keyframes glow-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes hero-color-flow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .hero-gradient-text {
          background: linear-gradient(
            97deg,
            #0a0a0a 0%,
            #0a0a0a 40%,
            #a8d4f5 50%,
            #0a0a0a 60%,
            #0a0a0a 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          animation: hero-color-flow 6s linear infinite;
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
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6 px-6">
          <motion.h1
            className="font-bold text-center tracking-[-0.04em]"
            style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.8, ease }}
          >
            <span className="hero-gradient-text block pb-1">Effortless Crypto</span>
            <span className="hero-gradient-text block pt-1">Commerce.</span>
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
