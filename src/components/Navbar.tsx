"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{ overflow: "visible" }}
    >
      {/* Background bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: scrolled ? "#eef4fb" : "transparent",
          borderRadius: scrolled ? "0 0 42px 42px" : "0",
          opacity: scrolled ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: 1024, padding: "0 40px" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ height: 76 }}
        >
          {/* Left — Merchant App */}
          <a
            href="https://dashboard.spacepay.co.uk"
            className="hidden md:flex items-center gap-2.5 hover:opacity-50 transition-opacity"
            style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
              <line x1="12" y1="12" x2="12" y2="16"/>
            </svg>
            Merchant App
          </a>

          {/* Center — Name only */}
          <a
            href="/"
            className="md:absolute md:left-1/2 md:-translate-x-1/2"
            style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a" }}
          >
            SpacePay
          </a>

          {/* Right — User App */}
          <a
            href="https://app.spacepay.co.uk"
            className="hidden md:flex items-center gap-2.5 hover:opacity-50 transition-opacity"
            style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            User App
          </a>

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
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-1 rounded-2xl bg-[#eef4fb] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              <a href="https://dashboard.spacepay.co.uk" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-semibold text-[#0a0a0a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
                  <line x1="12" y1="12" x2="12" y2="16"/>
                </svg>
                Merchant App
              </a>
              <a href="https://app.spacepay.co.uk" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-semibold text-[#0a0a0a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                User App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
