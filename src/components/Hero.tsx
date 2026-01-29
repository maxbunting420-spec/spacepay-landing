export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <h1 className="relative z-10 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
        Effortless Crypto Commerce
      </h1>
      <p className="relative z-10 mt-6 max-w-2xl text-lg text-muted sm:text-xl">
        Crypto payments, minus the complexity.
        <br />
        One click for customers. Fiat settlement for merchants.
      </p>
      <div className="relative z-10 mt-10 flex gap-4">
        <button className="rounded-full bg-gradient-to-r from-accent to-accent-blue px-8 py-3 font-semibold text-background transition-opacity hover:opacity-90">
          Get Started
        </button>
      </div>

      {/* Checkout flow placeholder */}
      <div className="relative z-10 mt-16 w-full max-w-3xl rounded-2xl border border-card-border bg-card-bg p-8 backdrop-blur-sm">
        <p className="text-sm text-muted">
          Click to see the checkout flow
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/5] rounded-xl border border-card-border bg-background/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
