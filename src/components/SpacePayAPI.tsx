"use client";

import React from "react";

/**
 * SpacePay API visual — real endpoint data from spacepay docs.
 * Clean dev-console aesthetic, full-bleed within the card.
 * Uses actual POST /v1/external/secretkey-auth/payments endpoint.
 */

export function SpacePayAPIPlayground() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Top bar — endpoint */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-[#f0f0f0] bg-[#fafafa]/80">
        <span className="rounded-md bg-[#dbeafe] px-2 py-0.5 text-[10px] font-bold text-[#2563eb] tracking-wide">
          POST
        </span>
        <span className="text-[11px] font-mono text-[#a3a3a3] truncate">
          api.spacepay.co.uk<span className="text-[#0a0a0a]">/v1/external/secretkey-auth/payments</span>
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left — request */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[#f0f0f0]">
          {/* Headers */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-[9px] font-semibold text-[#a3a3a3] uppercase tracking-[0.1em] mb-2.5">Headers</p>
            <div className="space-y-[5px]">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-[#a3a3a3] shrink-0">X-SpacePay-Secret-Key</span>
                <span className="text-[10px] font-mono text-[#0a0a0a] truncate">sk_test_51Hb3...xK9</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-[#a3a3a3] shrink-0">Content-Type</span>
                <span className="text-[10px] font-mono text-[#0a0a0a]">application/json</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-[#a3a3a3] shrink-0">Idempotency-Key</span>
                <span className="text-[10px] font-mono text-[#0a0a0a] truncate">ord_8x2kQ9...f4</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pt-3 pb-3 flex-1">
            <p className="text-[9px] font-semibold text-[#a3a3a3] uppercase tracking-[0.1em] mb-2.5">Body</p>
            <div className="font-mono text-[10px] leading-[1.9] text-[#525252]">
              <span className="text-[#737373]">{"{"}</span>
              <div className="pl-3">
                <div><span className="text-[#0369a1]">&quot;orderId&quot;</span>: <span className="text-[#16a34a]">&quot;order_9f3a1b&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;amount&quot;</span>: <span className="text-[#c026d3]">8950</span>,</div>
                <div><span className="text-[#0369a1]">&quot;currency&quot;</span>: <span className="text-[#16a34a]">&quot;USD&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;redirectUrl&quot;</span>: <span className="text-[#16a34a]">&quot;https://store.co/success&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;customMetadata&quot;</span>: <span className="text-[#16a34a]">&quot;{'{'}...{'}'}&quot;</span></div>
              </div>
              <span className="text-[#737373]">{"}"}</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="px-5 py-2.5 border-t border-[#f0f0f0] flex items-center gap-2">
            <div className="h-[6px] w-[6px] rounded-full bg-[#22c55e]" />
            <span className="text-[10px] text-[#a3a3a3] font-mono">201 Created · 142ms</span>
          </div>
        </div>

        {/* Right — response */}
        <div className="w-[48%] shrink-0 flex flex-col min-w-0 bg-[#fafafa]/60">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#f0f0f0]">
            <span className="text-[9px] font-semibold text-[#a3a3a3] uppercase tracking-[0.1em]">Response</span>
            <span className="text-[10px] font-mono text-[#22c55e] font-medium">201</span>
          </div>

          <div className="flex-1 px-5 py-3 overflow-hidden">
            <div className="font-mono text-[10px] leading-[1.85] text-[#525252]">
              <span className="text-[#737373]">{"{"}</span>
              <div className="pl-3">
                <div><span className="text-[#0369a1]">&quot;paymentId&quot;</span>: <span className="text-[#16a34a]">&quot;pay_a1b2c3d4&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;status&quot;</span>: <span className="text-[#16a34a]">&quot;pending&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;amountInCents&quot;</span>: <span className="text-[#c026d3]">8950</span>,</div>
                <div><span className="text-[#0369a1]">&quot;depositAddress&quot;</span>: {"{"}</div>
                <div className="pl-3">
                  <div><span className="text-[#0369a1]">&quot;address&quot;</span>: <span className="text-[#16a34a]">&quot;0x8f3C...9e2B&quot;</span>,</div>
                  <div><span className="text-[#0369a1]">&quot;type&quot;</span>: <span className="text-[#16a34a]">&quot;EVM&quot;</span></div>
                </div>
                <div>{"}"},</div>
                <div><span className="text-[#0369a1]">&quot;paymentUrl&quot;</span>: <span className="text-[#16a34a]">&quot;https://pay.sp...&quot;</span>,</div>
                <div><span className="text-[#0369a1]">&quot;secret&quot;</span>: <span className="text-[#16a34a]">&quot;whsec_v2_...&quot;</span></div>
              </div>
              <span className="text-[#737373]">{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
