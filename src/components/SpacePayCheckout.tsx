"use client";

import React from "react";

/** SpacePay icon mark — the geometric S from the official logo */
function SpacePayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M20.525 21.599H13.6849V14.401H20.525V21.599ZM6.84004 0C5.02634 0.00134551 3.28729 0.760133 2.00481 2.10972C0.722335 3.45931 0.0012786 5.28936 0 7.19797L0 10.7995C0 12.7085 0.720645 14.5393 2.0034 15.8892C3.28616 17.2391 5.02595 17.9975 6.84004 17.9975V8.27995C6.84131 7.9934 6.95005 7.71897 7.14259 7.51635C7.33514 7.31373 7.59592 7.1993 7.86822 7.19797H26.3417C26.6135 7.19931 26.8738 7.3139 27.0656 7.51666C27.2573 7.71943 27.365 7.99387 27.365 8.27995V10.8198H34.2099V0H6.84004ZM6.84004 25.2005H0V36H6.84004V25.2005ZM27.365 17.9975V27.72C27.365 28.0057 27.2572 28.2796 27.0653 28.4815C26.8734 28.6835 26.6131 28.7969 26.3417 28.7969H13.6849V36H27.365C28.2639 36 29.154 35.8137 29.9844 35.4517C30.8149 35.0897 31.5695 34.5591 32.2051 33.8903C32.8407 33.2214 33.3449 32.4273 33.6888 31.5534C34.0328 30.6795 34.2099 29.7429 34.2099 28.7969V25.2005C34.2099 24.2546 34.0328 23.3179 33.6888 22.444C33.3449 21.5701 32.8407 20.776 32.2051 20.1072C31.5695 19.4383 30.8149 18.9077 29.9844 18.5458C29.154 18.1838 28.2639 17.9975 27.365 17.9975Z" fill="white" />
    </svg>
  );
}

/**
 * Pixel-faithful replica of the SpacePay "Payment Complete" screen
 * matched exactly to the Figma design.
 */
export function PaymentCompleteWidget({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[480px] max-w-full overflow-hidden ${className}`}
      style={{
        borderRadius: "24px",
        background: "#0a1628",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), 0 32px 100px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Aurora gradient — bright mint/cyan wash covering top 50% ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(80, 220, 195, 0.55) 0%, rgba(60, 210, 185, 0.45) 10%, rgba(45, 195, 175, 0.35) 20%, rgba(30, 170, 155, 0.2) 35%, rgba(15, 100, 90, 0.08) 50%, transparent 60%)",
        }}
      />
      {/* Bright hotspot — upper left */}
      <div
        className="absolute top-0 left-0 w-[70%] h-[50%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 30% 15%, rgba(100, 240, 215, 0.5) 0%, rgba(70, 225, 200, 0.25) 40%, transparent 70%)",
        }}
      />
      {/* Bright hotspot — upper right */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[45%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 75% 10%, rgba(70, 230, 210, 0.4) 0%, rgba(50, 210, 190, 0.15) 45%, transparent 70%)",
        }}
      />
      {/* Center bright peak */}
      <div
        className="absolute top-0 left-[20%] w-[60%] h-[35%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(120, 255, 230, 0.3) 0%, transparent 60%)",
          filter: "blur(15px)",
        }}
      />

      {/* ── Top bar: logo + close ─────────────────── */}
      <div className="flex items-center justify-between px-8 pt-6 relative z-10">
        <div className="flex items-center gap-2">
          <SpacePayIcon size={20} />
          <span className="text-[15px] font-semibold text-white">
            SpacePay
          </span>
        </div>
        <button className="text-white/40 hover:text-white/60 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Payment Complete header ────────────────── */}
      <div className="relative z-10 px-8 pt-8 pb-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-medium text-white tracking-[-0.02em] leading-[1.15]">
              Payment Complete
            </h2>
            <p className="text-[14px] text-white/45 mt-2.5 leading-[1.55] font-normal">
              Your transaction was successful,
              <br />
              the order details are below
            </p>
          </div>
          <div className="mt-0.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-white/[0.15]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Order details ─────────────────────────── */}
      <div className="relative z-10 mx-8">
        <div
          className="flex items-start justify-between py-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="text-[18px] font-semibold text-white">Amazon</p>
            <p className="text-[13px] text-white/25 mt-1">Order ID: xbusnxso</p>
          </div>
          <div className="text-right">
            <p className="text-[18px] font-semibold text-white">89.50 USDT</p>
            <p className="text-[13px] text-white/25 mt-1">$89.50</p>
          </div>
        </div>
      </div>

      {/* ── Token / Chain / TX ID row ─────────────── */}
      <div className="relative z-10 mx-8">
        <div
          className="grid py-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            gridTemplateColumns: "80px 110px 1fr",
            gap: "0",
          }}
        >
          {/* Token */}
          <div>
            <p className="text-[12px] text-white/30 mb-2.5">Token</p>
            <div className="flex items-center gap-2">
              <div className="h-[22px] w-[22px] rounded-full bg-[#627eea] flex items-center justify-center">
                <svg width="9" height="14" viewBox="0 0 256 417" fill="none">
                  <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#fff" />
                  <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#fff" opacity=".6" />
                </svg>
              </div>
              <span className="text-[14px] font-medium text-white">ETH</span>
            </div>
          </div>

          {/* Chain */}
          <div>
            <p className="text-[12px] text-white/30 mb-2.5">Chain</p>
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 256 417" fill="none">
                <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#999" opacity=".7" />
                <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#999" opacity=".4" />
              </svg>
              <span className="text-[14px] font-medium text-white">Ethereum</span>
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <p className="text-[12px] text-white/30 mb-2.5">Transaction ID</p>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium text-white whitespace-nowrap">0x8579...ad38ab6</span>
              <button className="text-white/20 hover:text-white/50 transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
              <button className="text-white/20 hover:text-white/50 transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1-click upsell banner ─────────────────── */}
      <div className="relative z-10 mx-8">
        <div
          className="flex items-center justify-between gap-5 py-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-medium text-white leading-[1.45]">
              3,501 users enabled 1-click checkout today
            </p>
            <p className="text-[12px] text-[#2dd4a8] mt-1.5">
              0.8 seconds to pay&nbsp;&nbsp;&middot;&nbsp;&nbsp;No wallet popups&nbsp;&nbsp;&middot;&nbsp;&nbsp;$0 fees
            </p>
          </div>
          <button
            className="shrink-0 rounded-[8px] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "#1a8a6e",
              border: "1px solid rgba(45, 212, 168, 0.3)",
            }}
          >
            Enable 1 click
          </button>
        </div>
      </div>

      {/* ── Spacer ─────────────────────────────────── */}
      <div className="h-12" />

      {/* ── Back to merchant button ───────────────── */}
      <div className="relative z-10 px-8 pb-7">
        <button
          className="w-full h-[50px] text-[15px] font-medium text-white/45 transition-all hover:text-white/65 active:scale-[0.98]"
          style={{
            borderRadius: "14px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          Back to merchant
        </button>
      </div>
    </div>
  );
}
