"use client";

import React, { useRef, useState, useEffect } from "react";

export function SpacePayAPIPlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex h-full bg-white" style={{ fontSize: 0 }}>
      {/* ── Left sidebar — docs nav ── */}
      <div className="w-[160px] flex-shrink-0 border-r border-[#e8e8e8] bg-white flex flex-col py-4 px-3 overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 px-1 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36" fill="none" className="flex-shrink-0">
            <path d="M20.525 21.599H13.6849V14.401H20.525V21.599ZM6.84004 0C5.02634 0.00134551 3.28729 0.760133 2.00481 2.10972C0.722335 3.45931 0.0012786 5.28936 0 7.19797L0 10.7995C0 12.7085 0.720645 14.5393 2.0034 15.8892C3.28616 17.2391 5.02595 17.9975 6.84004 17.9975V8.27995C6.84131 7.9934 6.95005 7.71897 7.14259 7.51635C7.33514 7.31373 7.59592 7.1993 7.86822 7.19797H26.3417C26.6135 7.19931 26.8738 7.3139 27.0656 7.51666C27.2573 7.71943 27.365 7.99387 27.365 8.27995V10.8198H34.2099V0H6.84004ZM6.84004 25.2005H0V36H6.84004V25.2005ZM27.365 17.9975V27.72C27.365 28.0057 27.2572 28.2796 27.0653 28.4815C26.8734 28.6835 26.6131 28.7969 26.3417 28.7969H13.6849V36H27.365C28.2639 36 29.154 35.8137 29.9844 35.4517C30.8149 35.0897 31.5695 34.5591 32.2051 33.8903C32.8407 33.2214 33.3449 32.4273 33.6888 31.5534C34.0328 30.6795 34.2099 29.7429 34.2099 28.7969V25.2005C34.2099 24.2546 34.0328 23.3179 33.6888 22.444C33.3449 21.5701 32.8407 20.776 32.2051 20.1072C31.5695 19.4383 30.8149 18.9077 29.9844 18.5458C29.154 18.1838 28.2639 17.9975 27.365 17.9975Z" fill="#0a0a0a"/>
          </svg>
          <span className="text-[13px] font-bold text-[#0a0a0a] tracking-[-0.02em]">SpacePay</span>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-4 h-4 rounded-full bg-[#f5f5f5] flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-2.5 py-1.5 mb-4 flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span className="text-[9px] text-[#999]">Search...</span>
          <span className="text-[8px] text-[#ccc] ml-auto font-mono">⌘K</span>
        </div>

        {/* Nav items */}
        <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <span className="text-[10px] text-[#333] font-medium">Merchant Dashboard</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          <span className="text-[10px] text-[#333] font-medium">Website</span>
        </div>

        <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1.5 px-1">Overview</p>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Introduction</span></div>
        <div className="px-3 py-1 mb-3"><span className="text-[10px] text-[#666]">Quickstart</span></div>

        <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1.5 px-1">Getting Started</p>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Merchant Onboarding</span></div>
        <div className="px-3 py-1 mb-3"><span className="text-[10px] text-[#666]">Accept Payments</span></div>

        <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1.5 px-1">Core Products</p>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Merchant Dashboard</span></div>
        <div className="px-3 py-1 mb-3"><span className="text-[10px] text-[#666]">Payment Flows</span></div>

        <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1.5 px-1">Developer Docs</p>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Overview</span></div>
        <div className="px-3 py-1 mb-0.5 border-l-2 border-[#6c5ce7]"><span className="text-[10px] text-[#6c5ce7] font-medium">SDK Integration</span></div>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">API Integration</span></div>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Webhooks</span></div>
        <div className="px-3 py-1 mb-0.5"><span className="text-[10px] text-[#666]">Testing</span></div>
        <div className="px-3 py-1 mb-0"><span className="text-[10px] text-[#666]">Blockchain Concepts</span></div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
        {/* Top tabs */}
        <div className="border-b border-[#e8e8e8] px-6 flex items-center gap-6 h-[36px] shrink-0">
          <span className="text-[11px] font-medium text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-2 pt-2.5">For Businesses</span>
          <span className="text-[11px] text-[#999] pb-2 pt-2.5">API reference</span>
        </div>

        {/* Doc content */}
        <div className="flex-1 px-8 py-6 overflow-hidden">
          <h1
            className="font-bold text-[#0a0a0a] tracking-[-0.02em] mb-2 transition-all duration-700"
            style={{
              fontSize: 22,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transitionDelay: "200ms",
            }}
          >SDK Integration</h1>
          <p
            className="text-[11px] text-[#666] leading-[1.6] mb-5 max-w-[380px] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transitionDelay: "300ms",
            }}
          >
            The SpacePay SDK provides a simple way to integrate payments with minimal code and built-in functionality.
          </p>

          {/* Installation section */}
          <h2
            className="text-[15px] font-semibold text-[#0a0a0a] mb-2.5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >Installation</h2>

          {/* Install command */}
          <div
            className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3 mb-3 flex items-center justify-between transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transitionDelay: "500ms",
            }}
          >
            <div className="font-mono text-[10px]">
              <span className="text-[#6c5ce7]">npm</span>
              <span className="text-[#333]"> install spacepay-client-sdk</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </div>

          {/* Basic Usage */}
          <h2
            className="text-[15px] font-semibold text-[#0a0a0a] mb-2.5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: "650ms",
            }}
          >Basic Usage</h2>

          {/* Code block */}
          <div
            className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] overflow-hidden transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transitionDelay: "700ms",
            }}
          >
            {/* Copy button */}
            <div className="flex justify-end px-3 pt-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </div>
            <div className="px-4 pb-4 pt-1 font-mono text-[10px] leading-[19px]">
              {[
                { tokens: [{ t: "import", c: "#8250df" }, { t: " { SpacePayClient } ", c: "#333" }, { t: "from ", c: "#8250df" }, { t: '"spacepay-client-sdk"', c: "#0a3069" }, { t: ";", c: "#333" }] },
                { tokens: [] },
                { tokens: [{ t: "// Initialize the client", c: "#6a737d" }] },
                { tokens: [{ t: "const", c: "#8250df" }, { t: " client = ", c: "#333" }, { t: "new", c: "#8250df" }, { t: " SpacePayClient", c: "#6639ba" }, { t: "({", c: "#333" }] },
                { tokens: [{ t: '  baseUrl: ', c: "#333" }, { t: '"https://api.spacepay.co.uk"', c: "#0a3069" }, { t: ",", c: "#333" }] },
                { tokens: [{ t: '  publicKey: ', c: "#333" }, { t: '"pk_test_your_public_key"', c: "#0a3069" }, { t: ",", c: "#333" }] },
                { tokens: [{ t: '  secretKey: ', c: "#333" }, { t: '"sk_test_your_secret_key"', c: "#0a3069" }, { t: ",", c: "#333" }] },
                { tokens: [{ t: "});", c: "#333" }] },
                { tokens: [] },
                { tokens: [{ t: "// Create a payment", c: "#6a737d" }] },
                { tokens: [{ t: "async", c: "#8250df" }, { t: " function", c: "#8250df" }, { t: " createPayment", c: "#6639ba" }, { t: "() {", c: "#333" }] },
                { tokens: [{ t: "  try", c: "#8250df" }, { t: " {", c: "#333" }] },
                { tokens: [{ t: "    const", c: "#8250df" }, { t: " payment = ", c: "#333" }, { t: "await", c: "#8250df" }, { t: " client.", c: "#333" }, { t: "createPayment", c: "#6639ba" }, { t: "({", c: "#333" }] },
                { tokens: [{ t: '      orderId: ', c: "#333" }, { t: '"order_123"', c: "#0a3069" }, { t: ",", c: "#333" }] },
                { tokens: [{ t: "      amount: ", c: "#333" }, { t: "100", c: "#0550ae" }, { t: ",", c: "#333" }, { t: " // 100 cents = $1.00", c: "#6a737d" }] },
                { tokens: [{ t: '      currency: ', c: "#333" }, { t: '"USD"', c: "#0a3069" }, { t: ",", c: "#333" }] },
              ].map((line, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(6px)",
                    transitionDelay: `${800 + i * 30}ms`,
                  }}
                >
                  {line.tokens.length === 0 ? "\u00A0" : line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right sidebar — on this page ── */}
      <div className="w-[130px] flex-shrink-0 border-l border-[#e8e8e8] bg-white py-6 px-4 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          <span className="text-[9px] font-medium text-[#999]">On this page</span>
        </div>
        {[
          { t: "SDK Integration", active: true },
          { t: "Installation", active: false },
          { t: "Basic Usage", active: false },
          { t: "SDK Features", active: false },
          { t: "Client Configuration", active: false },
          { t: "Payment Status Values", active: false },
          { t: "Error Handling", active: false },
          { t: "Next Steps", active: false },
        ].map((item) => (
          <div key={item.t} className="py-1">
            <span className={`text-[9px] ${item.active ? "text-[#6c5ce7] font-medium" : "text-[#999]"}`}>{item.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
