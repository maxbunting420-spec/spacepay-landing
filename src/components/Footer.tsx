export function Footer() {
  return (
    <footer className="mt-32 bg-[#0a0a0a] text-white px-6 md:px-10 lg:px-20" style={{ borderRadius: "42px 42px 0 0" }}>
      <div className="mx-auto max-w-[1360px] pt-20 pb-10 md:pt-32 md:pb-14 lg:pt-40 lg:pb-16">
        {/* Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 28 28" fill="none">
                  <path d="M8 14.5C8 11 10.5 8 14 8s6 3 6 6.5-2.5 5.5-6 5.5" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="14" cy="14.5" r="2" fill="#0a0a0a" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.02em]">SpacePay</span>
            </div>
            <p className="max-w-[260px] text-[14px] leading-[1.7] text-white/30">
              Crypto payments for businesses. Accept any token, receive fiat. No complexity.
            </p>
          </div>

          {/* Learn more */}
          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Product
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Documentation", "Changelog"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-[14px] text-white/40 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Company
            </h3>
            <ul className="space-y-3">
              {["Security", "Legal", "Privacy"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-[14px] text-white/40 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:support@spacepay.com" className="text-[14px] text-white/40 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://x.com/spacepay" target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/40 hover:text-white transition-colors">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-white/40 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-white/40 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-[12px] text-white/20">
            &copy; {new Date().getFullYear()} SpacePay
          </p>
          <p className="text-[12px] text-white/20">
            Settlement infrastructure for crypto payments.
          </p>
        </div>
      </div>
    </footer>
  );
}
