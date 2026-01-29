const features = [
  {
    title: "Integrations take months. Ours takes days.",
    description:
      "Drop in our SDK, hit the sandbox, go live. That\u2019s it.",
  },
  {
    title: "Your wallet, your money.",
    description:
      "Connect your existing wallet or create one with us. Your keys are split across multiple secure locations. No single point of failure.",
  },
  {
    title: "They pay crypto. You get fiat. Same day.",
    description:
      "No conversions to manage, no withdrawals to request, no volatility to worry about.",
  },
  {
    title: "Gas fees kill conversions. We killed gas fees.",
    description:
      "Your customers use their external wallet and approve transactions without paying any gas.",
  },
  {
    title: "Every wallet. Only the tokens that matter.",
    description:
      "Customers pay from any wallet with the crypto they already hold. You integrate once.",
  },
  {
    title: "Crypto security is hard. Your money shouldn\u2019t be.",
    description:
      "Once a payment settles, it\u2019s yours. No chargebacks, no disputes, no money walking back out the door.",
  },
  {
    title: "Crypto is a compliance headache. Fiat isn\u2019t.",
    description:
      "We\u2019re settlement infrastructure. Crypto never touches your books. You receive fiat, same as any other payment method.",
  },
  {
    title: "Support means tickets. Not here.",
    description: "You talk to engineers who actually built the thing.",
  },
  {
    title: "One way to pay is limiting. We give you all of them.",
    description:
      "One click if you\u2019re logged in. Connect a wallet, scan a QR, or send direct if you\u2019re not. Your choice, same speed.",
  },
  {
    title: "Checkouts are complicated. Ours is two taps.",
    description:
      "The entire checkout lives inside the payment button. No redirects, no forms, no pages between your customer and their purchase.",
  },
  {
    title: "Questions shouldn\u2019t drag on.",
    description:
      "Book a call, speak with the team, and get clear answers without sales layers.",
  },
];

export function FeatureCards() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-card-border bg-card-bg p-6 transition-colors hover:border-accent/30"
          >
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-accent">
              Card {i + 1}
            </span>
            <h3 className="text-lg font-semibold leading-snug">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
