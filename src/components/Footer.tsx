export function Footer() {
  return (
    <footer className="mt-[30vh] bg-[#eef4fb] pt-20 lg:pt-28 px-6 md:px-10 lg:px-20 pb-16 md:pb-20">
      <div className="mx-auto max-w-[1360px]">
        {/* Main footer grid — two link cols left, big tagline right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 lg:justify-center lg:px-[8%]">
          {/* Left side — link columns */}
          <div className="flex gap-20 lg:gap-28">
            {/* Column 1 */}
            <div>
              <h3 className="mb-6 text-[14px] font-semibold text-[#0a0a0a]">
                Learn more
              </h3>
              <ul className="space-y-4">
                {["FAQ", "Security", "Legal", "Pricing"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="text-[15px] font-medium text-[#0a0a0a] hover:opacity-40 transition-opacity">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-6 text-[14px] font-semibold text-[#0a0a0a]">
                Connect
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://x.com/spacepay" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity inline-block">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] font-medium text-[#0a0a0a] hover:opacity-40 transition-opacity">
                    Support
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@spacepay.co.uk" className="text-[15px] font-medium text-[#0a0a0a] hover:opacity-40 transition-opacity">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side — big tagline */}
          <div className="lg:ml-auto flex items-start justify-start lg:justify-end">
            <p className="text-[clamp(32px,4vw,56px)] font-bold text-[#0a0a0a] leading-[1.05] tracking-[-0.035em]">
              Your payments.<br />Your way.
            </p>
          </div>
        </div>

        {/* Legal text — big gap then small print */}
        <div className="mt-[20vh] lg:mt-[25vh] space-y-4 lg:px-[8%]">
          <p className="text-[11px] leading-[1.7] text-[#0a0a0a]/25 max-w-[680px]">
            SpacePay Ltd, registered in the United Kingdom. SpacePay provides crypto payment processing services for businesses on a non-custodial basis.
          </p>
          <p className="text-[11px] leading-[1.7] text-[#0a0a0a]/25 max-w-[680px]">
            SpacePay does not hold or control customer crypto-assets or private keys. All fiat settlement is provided by SpacePay&apos;s licensed banking and payment service partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
