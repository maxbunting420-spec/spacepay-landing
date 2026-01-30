export function Hero() {
  return (
    <section className="relative pt-[160px] pb-[120px] md:pt-[200px] md:pb-[160px] px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-24">
          {/* Left — copy */}
          <div className="max-w-[520px] text-center lg:text-left">
            <h1
              className="font-bold tracking-[-0.035em] leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            >
              One checkout
              <br />
              for all crypto
            </h1>
            <p className="mt-8 text-[18px] leading-[1.7] text-[#999] max-w-[400px] mx-auto lg:mx-0">
              Accept crypto payments from any wallet. Receive fiat same-day. No gas fees for your customers.
            </p>
            <div className="mt-12 hidden lg:block">
              <a
                href="#get-started"
                className="inline-flex h-[52px] items-center rounded-[26px] bg-foreground px-10 text-[15px] font-semibold text-white transition-all active:scale-[0.97]"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Right — checkout widget mockup */}
          <div className="w-full max-w-[380px] lg:max-w-[400px]">
            <div className="rounded-[28px] bg-white border border-[#e8e8e8] p-8 shadow-[0_2px_40px_rgba(0,0,0,0.04)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 7.25C4 5.5 5.25 4 7 4s3 1.5 3 3.25-1.25 2.75-3 2.75" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="7" cy="7.25" r="1" fill="#fff" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-foreground">SpacePay Checkout</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center mb-8">
                <p className="text-[11px] font-medium text-[#999] uppercase tracking-[0.08em] mb-2">Total</p>
                <p className="text-[36px] font-bold tracking-[-0.03em] text-foreground">$42.00</p>
              </div>

              {/* Payment options */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-3 rounded-2xl border border-[#e8e8e8] bg-[#fafafa] px-4 py-3.5">
                  <div className="h-8 w-8 rounded-full bg-[#627eea] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">ETH</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-foreground">Ethereum</p>
                    <p className="text-[11px] text-[#999]">0.013 ETH</p>
                  </div>
                  <div className="h-5 w-5 rounded-full border-[1.5px] border-foreground flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#e8e8e8] px-4 py-3.5">
                  <div className="h-8 w-8 rounded-full bg-[#2775ca] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">$</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-foreground">USDC</p>
                    <p className="text-[11px] text-[#999]">42.00 USDC</p>
                  </div>
                  <div className="h-5 w-5 rounded-full border-[1.5px] border-[#ccc]" />
                </div>
              </div>

              {/* CTA */}
              <button className="w-full h-[48px] rounded-[24px] bg-foreground text-[14px] font-semibold text-white transition-all active:scale-[0.98]">
                Pay with Wallet
              </button>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden w-full max-w-[380px]">
            <a
              href="#get-started"
              className="flex h-[52px] w-full items-center justify-center rounded-[26px] bg-foreground text-[15px] font-semibold text-white transition-all active:scale-[0.97]"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
