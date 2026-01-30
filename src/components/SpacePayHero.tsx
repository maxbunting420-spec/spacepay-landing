"use client";

import { motion } from "framer-motion";
import { PaymentCompleteWidget } from "./SpacePayCheckout";

const ease = [0.16, 1, 0.3, 1] as const;

export function SpacePayHero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-20 pt-[100px] pb-[80px]">
      <div className="mx-auto max-w-[1360px] w-full">
        <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between lg:gap-20">
          {/* Left — copy */}
          <div className="max-w-[600px] text-center lg:text-left lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a]/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-[#737373] tracking-[0.01em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                Live on Ethereum, Base &amp; Arbitrum
              </span>
            </motion.div>

            <motion.h1
              className="font-semibold tracking-[-0.04em] leading-[0.95] text-[#0a0a0a]"
              style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.8, ease }}
            >
              One checkout
              <br />
              for all crypto
            </motion.h1>

            <motion.p
              className="mt-7 text-[17px] md:text-[19px] leading-[1.65] text-[#737373] max-w-[440px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8, ease }}
            >
              Accept crypto payments from any wallet. Receive fiat same-day. Zero gas fees for your customers.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8, ease }}
            >
              <a
                href="#get-started"
                className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#0a0a0a] px-7 text-[15px] font-medium text-white transition-all hover:bg-[#1a1a1a] active:scale-[0.97] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.08)] w-full sm:w-auto"
              >
                Get Started
                <svg className="ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a
                href="#features"
                className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-white px-7 text-[15px] font-medium text-[#0a0a0a] transition-all hover:bg-[#f5f5f5] active:scale-[0.97] border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04)] w-full sm:w-auto"
              >
                How it works
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-14 flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease }}
            >
              <div className="flex -space-x-2">
                {[
                  "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
                  "bg-gradient-to-br from-[#f093fb] to-[#f5576c]",
                  "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]",
                  "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]",
                ].map((bg, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-[2.5px] border-[#fafafa] ${bg}`} />
                ))}
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#0a0a0a]">1,200+ merchants</p>
                <p className="text-[12px] text-[#a3a3a3]">Processing payments today</p>
              </div>
            </motion.div>
          </div>

          {/* Right — actual product checkout widget */}
          <motion.div
            className="mt-16 lg:mt-0"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
          >
            <PaymentCompleteWidget />
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#627eea]/[0.04] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#22c55e]/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
}
