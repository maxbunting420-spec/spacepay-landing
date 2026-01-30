"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-20 pt-4">
        <nav className="flex h-[56px] items-center justify-between rounded-2xl bg-white/70 backdrop-blur-2xl border border-black/[0.04] px-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 28 28" fill="none">
                <path d="M8 14.5C8 11 10.5 8 14 8s6 3 6 6.5-2.5 5.5-6 5.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="14" cy="14.5" r="2" fill="#fff" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
              SpacePay
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#features" className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-black/[0.03] transition-all">
              Features
            </a>
            <a href="#" className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-black/[0.03] transition-all">
              Pricing
            </a>
            <a href="#" className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-black/[0.03] transition-all">
              Docs
            </a>
            <div className="w-px h-5 bg-black/[0.06] mx-2" />
            <a
              href="#get-started"
              className="inline-flex h-[34px] items-center rounded-[10px] bg-[#0a0a0a] px-4 text-[13px] font-medium text-white transition-all hover:bg-[#1a1a1a] active:scale-[0.97]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              className="block h-[1.5px] w-[18px] bg-[#0a0a0a] origin-center"
              animate={open ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-[18px] bg-[#0a0a0a] origin-center"
              animate={open ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-6 mt-2 rounded-2xl bg-white/90 backdrop-blur-2xl border border-black/[0.04] shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <a href="#features" className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#737373]">
                Features
              </a>
              <a href="#" className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#737373]">
                Pricing
              </a>
              <a href="#" className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#737373]">
                Docs
              </a>
              <div className="pt-2">
                <a
                  href="#get-started"
                  className="flex h-[44px] w-full items-center justify-center rounded-xl bg-[#0a0a0a] text-[14px] font-medium text-white"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
