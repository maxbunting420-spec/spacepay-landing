"use client";

import React, { useRef } from "react";
import {
  useTransform,
  motion,
  useScroll,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import lockAnimationData from "../../public/lottie/lock.json";
import { SpacePayAPIPlayground } from "@/components/SpacePayAPI";

/* ================================================================
   VISUALS — oversized, edge-bleeding, fills the column
   ================================================================ */

/* 1: SDK — API Playground, 3D tilted like the dashboard card */
function Visual1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ perspective: "1200px" }}>
      <div
        className="absolute transition-all duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: 620,
          top: -20,
          right: -60,
          bottom: -80,
          transform: visible
            ? "rotateY(-12deg) rotateX(2deg) translateZ(0px)"
            : "rotateY(-30deg) rotateX(6deg) translateZ(-80px) translateX(100px)",
          opacity: visible ? 1 : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full rounded-2xl overflow-hidden bg-white"
          style={{
            boxShadow: visible
              ? "-40px 40px 100px rgba(0,0,0,0.12), -10px 10px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)"
              : "none",
          }}
        >
          <SpacePayAPIPlayground />
        </div>
      </div>
    </div>
  );
}

/* 2: Settlement — infinite stacking list, cycles through items, never removes */
function Visual2() {
  const pool = [
    { name: "$1,200.00 settled", desc: "USDC → Bank of America ••4821" },
    { name: "$340.50 settled", desc: "ETH → Chase ••7733" },
    { name: "$89.00 settled", desc: "USDC → Wells Fargo ••1192" },
    { name: "$2,100.00 settled", desc: "DAI → Bank of America ••4821" },
    { name: "$430.00 settled", desc: "USDT → Citibank ••6650" },
    { name: "$67.25 settled", desc: "USDC → Chase ••7733" },
    { name: "$3,800.00 settled", desc: "ETH → Wells Fargo ••1192" },
    { name: "$950.00 settled", desc: "USDC → Capital One ••3318" },
    { name: "$175.00 settled", desc: "SOL → Chase ••7733" },
    { name: "$5,600.00 settled", desc: "ETH → Bank of America ••4821" },
    { name: "$220.75 settled", desc: "USDT → Wells Fargo ••1192" },
    { name: "$1,480.00 settled", desc: "USDC → Citibank ••6650" },
  ];

  const [items, setItems] = React.useState<{ name: string; desc: string; id: number }[]>([]);
  const counter = React.useRef(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const entry = pool[counter.current % pool.length];
      setItems((prev) => [{ ...entry, id: counter.current }, ...prev]);
      counter.current += 1;
    }, 1200);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 px-4 lg:px-6 pt-4 flex flex-col gap-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            layout
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0fdf4]">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M13.3 4L6 11.3 2.7 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#0a0a0a]">{item.name}</p>
              <p className="text-[12px] text-[#a3a3a3] truncate">{item.desc}</p>
            </div>
            <span className="text-[11px] text-[#d4d4d4] shrink-0 whitespace-nowrap">just now</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 3: Zero gas — holyheld gasless style, cascading accent word reveal */
function Visual3() {
  return null; // Rendering handled by Visual3GaslessCard in FeatureCard
}

function Visual3GaslessCard({ body }: { title: string; body: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const accentWord = "Gas";

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px] lg:h-[600px] px-6 md:px-16 lg:px-10 relative"
      style={{ paddingBottom: 180 }}
    >
      {/* Intersection target at 90% */}
      <div
        ref={targetRef}
        className="absolute left-0 pointer-events-none"
        style={{ top: "90%", height: 1, width: "100%" }}
      />

      {/* Description above title (order: -1 like holyheld) */}
      <p className="text-[16px] leading-[1.7] text-white/40 mx-auto max-w-[780px] mb-4">
        {body}
      </p>

      {/* Big title with cascading accent word on "gas" — holyheld gasless style */}
      <h2
        className="font-bold leading-[1] tracking-[-0.04em] text-white whitespace-nowrap"
        style={{ fontSize: "clamp(36px, 6vw, 64px)" }}
      >
        <span className="relative inline-block">Zero</span>{" "}
        <span className="relative inline-block">
          {accentWord},
          {/* Cascading ghost echoes below — just "Gas" without comma */}
          <span className="absolute left-0 top-full" style={{ color: "rgba(255,255,255,0.2)" }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <i
                key={i}
                className="block not-italic"
                style={{
                  opacity: animated ? 1 : 0,
                  transitionProperty: "opacity",
                  transitionDuration: animated ? "0.3s" : "0s",
                  transitionDelay: animated ? `${i * 60}ms` : "0s",
                }}
              >
                {accentWord}
              </i>
            ))}
          </span>
        </span>
        {" "}<span className="relative inline-block">Ever</span>
      </h2>
    </div>
  );
}

/* 4: Crypto→Fiat — large rolling dollar counter, full-bleed dark card */
function Visual4() {
  return null; // Rendering handled by Visual4CryptoCard
}

const V4_TARGET = 888888.88;
const V4_DURATION = 2500; // ms to count up
const V4_CSS_ID = "v4-counter-css";

function Visual4CryptoCard({ title, body }: { title: string; body: string }) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const targetRef = React.useRef<HTMLDivElement>(null);

  // Intersection observer to trigger count
  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  // Animate count up with easeOutExpo, then keep ticking slowly
  React.useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / V4_DURATION, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      // After initial count-up, keep adding ~$12/sec
      const extra = progress >= 1 ? (elapsed - V4_DURATION) / 1000 * 12.47 : 0;
      setCount(eased * V4_TARGET + extra);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  // Inject CSS for the subtle glow pulse
  const injected = React.useRef(false);
  React.useEffect(() => {
    if (injected.current || typeof document === "undefined") return;
    if (document.getElementById(V4_CSS_ID)) { injected.current = true; return; }
    const s = document.createElement("style");
    s.id = V4_CSS_ID;
    s.textContent = `
      @keyframes v4glow {
        0%, 100% { text-shadow: 0 0 40px rgba(34,197,94,0.15); }
        50% { text-shadow: 0 0 80px rgba(34,197,94,0.3); }
      }
    `;
    document.head.appendChild(s);
    injected.current = true;
  }, []);

  // Format number with commas and 2 decimal places
  const formatted = "$" + count.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      ref={targetRef}
      className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px] lg:h-[600px] px-8 md:px-16 lg:px-10 relative"
    >
      {/* Large counter */}
      <div
        className="mb-4 flex-shrink-0 tabular-nums"
        style={{
          fontSize: "clamp(56px, 10vw, 100px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#22c55e",
          animation: started ? "v4glow 3s ease-in-out infinite" : "none",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatted}
      </div>

      <h2
        className="font-semibold leading-[1.05] tracking-[-0.035em] text-white max-w-[520px]"
        style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
      >
        {title}
      </h2>

      <p className="mt-4 text-[16px] leading-[1.7] text-white/40 mx-auto max-w-[420px]">
        {body}
      </p>
    </div>
  );
}

/* 5: Multi-wallet — holyheld exact replica:
   TWO-COLUMN layout: text left (45%), bubbles right (55%).
   Bubbles are in the right visual column only.
   Pill toggle inside the visual area at top.
   5 size tiers: 164, 120, 100, 80, 40.
   Slow 40px horizontal float, infinite alternate.
   Box-shadow on each circle. Some clip at edges.
   White gradient fades left edge so bubbles blend into text area.
*/
function Visual5() {
  const [tab, setTab] = React.useState<"wallets" | "networks">("wallets");

  /* iconScale = logo sits inside a colored circle container (e.g. MetaMask on white).
     imgScale  = how much to scale the circular PNG so it fills the clipped container
                 (square logos like WalletConnect/Rainbow/Gnosis = 1, padded circles ~1.06-1.10). */
  type Bubble = { name: string; img: string; size: number; top: string; left: string; dur: number; bg: string; iconScale?: number; imgScale?: number };

  const walletBubbles: Bubble[] = [
    { name: "MetaMask", img: "/logos/wallets/metamask.png", size: 164, top: "2%", left: "12%", dur: 9, bg: "#ffffff", iconScale: 70 },
    { name: "Coinbase", img: "/logos/wallets/coinbase.png", size: 120, top: "0%", left: "62%", dur: 11, bg: "#2458e4", imgScale: 1.06 },
    { name: "Rabby", img: "/logos/wallets/rabby.svg", size: 80, top: "32%", left: "2%", dur: 7, bg: "#8697FF", imgScale: 1.0 },
    { name: "Phantom", img: "/logos/wallets/phantom.png", size: 100, top: "30%", left: "50%", dur: 10, bg: "#551fba", imgScale: 1.06 },
    { name: "WalletConnect", img: "/logos/wallets/walletconnect.png", size: 40, top: "24%", left: "38%", dur: 8, bg: "#333333", imgScale: 1.0 },
    { name: "Rainbow", img: "/logos/wallets/rainbow.png", size: 80, top: "54%", left: "70%", dur: 12, bg: "#001e59", imgScale: 1.0 },
    { name: "Safe", img: "/logos/wallets/safe.png", size: 120, top: "52%", left: "8%", dur: 9, bg: "#12FF80", imgScale: 1.06 },
    { name: "Brave", img: "/logos/wallets/brave.png", size: 100, top: "72%", left: "48%", dur: 8, bg: "#ffffff", iconScale: 70 },
    { name: "Zerion", img: "/logos/wallets/zerion.svg", size: 64, top: "78%", left: "4%", dur: 7, bg: "#2962EF", imgScale: 1.0 },
  ];

  const networkBubbles: Bubble[] = [
    { name: "Arbitrum", img: "/logos/networks/arbitrum.png", size: 164, top: "1%", left: "38%", dur: 10, bg: "#213147", imgScale: 1.0 },
    { name: "Base", img: "/logos/networks/base.png", size: 100, top: "4%", left: "2%", dur: 8, bg: "#0052FF", imgScale: 1.06 },
    { name: "Gnosis", img: "/logos/networks/gnosis.png", size: 100, top: "26%", left: "66%", dur: 9, bg: "#0d1623", imgScale: 1.0 },
    { name: "Polygon", img: "/logos/networks/polygon.png", size: 120, top: "34%", left: "6%", dur: 11, bg: "#8247e5", imgScale: 1.08 },
    { name: "Ethereum", img: "/logos/networks/ethereum.png", size: 80, top: "50%", left: "58%", dur: 7, bg: "#ffffff", iconScale: 65 },
    { name: "BNB Chain", img: "/logos/networks/bnb.png", size: 80, top: "58%", left: "2%", dur: 8, bg: "#f0b90b", imgScale: 1.08 },
    { name: "Optimism", img: "/logos/networks/optimism.png", size: 100, top: "60%", left: "34%", dur: 12, bg: "#ff0420", imgScale: 1.10 },
    { name: "Avalanche", img: "/logos/networks/avalanche.png", size: 80, top: "76%", left: "12%", dur: 9, bg: "#e84142", imgScale: 1.08 },
    { name: "Solana", img: "/logos/networks/solana.png", size: 120, top: "72%", left: "52%", dur: 10, bg: "#ffffff", iconScale: 65 },
  ];

  const activeBubbles = tab === "wallets" ? walletBubbles : networkBubbles;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* White gradient fading bottom edge — blend toggle into card */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 100%)",
        }}
      />

      {/* Pill toggle — bottom-center on the visual */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex h-[36px] rounded-full bg-[#f0f0f0] p-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => setTab("wallets")}
            className={cn(
              "h-full px-5 rounded-full text-[13px] font-medium transition-all duration-200",
              tab === "wallets"
                ? "bg-white text-[#0a0a0a] shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                : "text-[#737373] hover:text-[#0a0a0a]"
            )}
          >
            Wallets
          </button>
          <button
            onClick={() => setTab("networks")}
            className={cn(
              "h-full px-5 rounded-full text-[13px] font-medium transition-all duration-200",
              tab === "networks"
                ? "bg-white text-[#0a0a0a] shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                : "text-[#737373] hover:text-[#0a0a0a]"
            )}
          >
            Networks
          </button>
        </div>
      </div>

      {/* Floating logo bubbles — scattered in the visual column */}
      <motion.div
        key={tab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        {activeBubbles.map((b, i) => (
          <div
            key={b.name}
            className="absolute"
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              animation: `bubbleFloat ${b.dur}s ease-in-out infinite`,
              animationDelay: `${i * -1.2}s`,
            }}
          >
            {b.iconScale ? (
              /* Logos that sit INSIDE a colored circle (MetaMask, Brave, etc.) */
              <div
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
                  backgroundColor: b.bg,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt={b.name}
                  style={{
                    objectFit: "contain",
                    width: `${b.iconScale}%`,
                    height: `${b.iconScale}%`,
                  }}
                />
              </div>
            ) : (
              /* Circular logos — scale up so the inner circle fills the clipped container */
              <div
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt={b.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${b.imgScale ?? 1.06})`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes bubbleFloat {
          0% { transform: none; }
          50% { transform: translate3d(30px, 0, 0); }
          100% { transform: none; }
        }
      `}</style>
    </div>
  );
}

/* 6: Security — Lottie lock + text scramble, identical to holyheld */
const SCRAMBLE_CHARS = "!<>-_/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz";
const SCRAMBLE_INTERVAL = 100; // ms per tick
const MIN_TICKS = 5;
const MAX_TICKS = 20;

function useScrambleText(text: string, shouldScramble: boolean) {
  const chars = React.useMemo(() => text.split(""), [text]);
  const [display, setDisplay] = React.useState<string[]>(chars);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // On mount (desktop): randomize all chars immediately
  const initialized = useRef(false);
  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setDisplay(
      chars.map((ch) => {
        if (ch === " " || ch === "\n") return ch;
        const r = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? ch;
        return Math.random() < 0.5 ? r.toUpperCase() : r;
      })
    );
  }, [chars]);

  // When triggered: each char cycles through random chars then resolves
  React.useEffect(() => {
    if (!shouldScramble) return;

    // Clear any existing timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    chars.forEach((realChar, idx) => {
      if (realChar === " " || realChar === "\n") return;
      let remaining = MIN_TICKS + Math.floor(Math.random() * (MAX_TICKS - MIN_TICKS));

      const tick = () => {
        const t = setTimeout(() => {
          remaining--;
          if (remaining <= 0) {
            setDisplay((prev) => {
              const next = [...prev];
              next[idx] = realChar;
              return next;
            });
          } else {
            const r = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? realChar;
            setDisplay((prev) => {
              const next = [...prev];
              next[idx] = Math.random() < 0.5 ? r.toUpperCase() : r;
              return next;
            });
            tick();
          }
        }, SCRAMBLE_INTERVAL);
        timeoutRefs.current.push(t);
      };
      tick();
    });

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [shouldScramble, chars]);

  return display;
}

function Visual6SecurityCard({ title, body }: { title: string; body: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const [scrambleNow, setScrambleNow] = React.useState(false);

  const displayChars = useScrambleText(title, scrambleNow);

  // Intersection observer — triggers Lottie when card scrolls in
  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          lottieRef.current?.setDirection(-1); // play in reverse like holyheld
          lottieRef.current?.goToAndPlay(29, true); // start from last frame, play backwards
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lottie complete → trigger scramble
  const onLottieComplete = React.useCallback(() => {
    setScrambleNow(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px] lg:h-[600px] px-8 md:px-16 lg:px-10 relative">
      {/* Lottie lock — 120px, inverted to white for dark card */}
      <div className="mb-4 flex-shrink-0 invert">
        <Lottie
          lottieRef={lottieRef}
          animationData={lockAnimationData}
          loop={false}
          autoplay={false}
          onComplete={onLottieComplete}
          style={{ width: 120, height: 120 }}
        />
      </div>

      {/* Title with scramble effect */}
      <h2
        className="font-semibold leading-[1.05] tracking-[-0.035em] text-white max-w-[520px]"
        style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
      >
        {displayChars.map((ch, i) => (
          <React.Fragment key={`${ch}-${i}`}>{ch}</React.Fragment>
        ))}
      </h2>

      <p className="mt-4 text-[16px] leading-[1.7] text-white/40 mx-auto max-w-[420px]">
        {body}
      </p>

      {/* Intersection target at 90% like holyheld */}
      <div
        ref={targetRef}
        className="absolute left-0 pointer-events-none"
        style={{ top: "90%", height: 1, width: "100%" }}
      />
    </div>
  );
}

function Visual6() {
  return null; // Rendering handled by Visual6SecurityCard in FeatureCard
}

/* 7: Compliance — SpacePay Analytics dashboard, 3D perspective float.
   Faithful replica of the actual dashboard with cool 3D presentation.
   Floats in from the right with perspective tilt, oversized, bleeds edges. */
function Visual7() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Natural daily transaction data — steady business, slight weekly dips on weekends
  const barData = [45,52,58,48,55,32,28,50,62,68,58,65,35,30,55,70,75,64,72,38,33,60,78,82,70,76,40,35,65,80];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D tilted dashboard */}
      <div
        className="absolute transition-all duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: 620,
          top: -20,
          right: -60,
          bottom: -80,
          transform: visible
            ? "rotateY(-12deg) rotateX(2deg) translateZ(0px)"
            : "rotateY(-30deg) rotateX(6deg) translateZ(-80px) translateX(100px)",
          opacity: visible ? 1 : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full rounded-2xl overflow-hidden bg-white"
          style={{
            boxShadow: visible
              ? "-40px 40px 100px rgba(0,0,0,0.12), -10px 10px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)"
              : "none",
          }}
        >
          <div className="flex h-full" style={{ fontSize: 0 }}>
            {/* ── Sidebar ── */}
            <div className="w-[150px] flex-shrink-0 border-r border-[#eceef5] bg-white flex flex-col py-4 px-3">
              {/* Logo */}
              <div className="flex items-center gap-2 px-1 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36" fill="none" className="flex-shrink-0">
                  <path d="M20.525 21.599H13.6849V14.401H20.525V21.599ZM6.84004 0C5.02634 0.00134551 3.28729 0.760133 2.00481 2.10972C0.722335 3.45931 0.0012786 5.28936 0 7.19797L0 10.7995C0 12.7085 0.720645 14.5393 2.0034 15.8892C3.28616 17.2391 5.02595 17.9975 6.84004 17.9975V8.27995C6.84131 7.9934 6.95005 7.71897 7.14259 7.51635C7.33514 7.31373 7.59592 7.1993 7.86822 7.19797H26.3417C26.6135 7.19931 26.8738 7.3139 27.0656 7.51666C27.2573 7.71943 27.365 7.99387 27.365 8.27995V10.8198H34.2099V0H6.84004ZM6.84004 25.2005H0V36H6.84004V25.2005ZM27.365 17.9975V27.72C27.365 28.0057 27.2572 28.2796 27.0653 28.4815C26.8734 28.6835 26.6131 28.7969 26.3417 28.7969H13.6849V36H27.365C28.2639 36 29.154 35.8137 29.9844 35.4517C30.8149 35.0897 31.5695 34.5591 32.2051 33.8903C32.8407 33.2214 33.3449 32.4273 33.6888 31.5534C34.0328 30.6795 34.2099 29.7429 34.2099 28.7969V25.2005C34.2099 24.2546 34.0328 23.3179 33.6888 22.444C33.3449 21.5701 32.8407 20.776 32.2051 20.1072C31.5695 19.4383 30.8149 18.9077 29.9844 18.5458C29.154 18.1838 28.2639 17.9975 27.365 17.9975Z" fill="#1CA5F9"/>
                </svg>
                <span className="text-[13px] font-bold text-[#1a1a2e] tracking-[-0.02em]">SpacePay</span>
              </div>

              {/* Workspace */}
              <div className="rounded-xl border border-[#eceef5] p-2.5 mb-5 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M0 0L2.5 10L4.5 4L7 10L9.5 4L11.5 10L14 0" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#1a1a2e] truncate leading-tight">Wayne Enterprises</span>
              </div>

              {/* Navigation */}
              <p className="text-[8px] font-semibold text-[#9ea2b8] uppercase tracking-[0.1em] mb-2 px-1">Navigation</p>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                <span className="text-[11px] text-[#5a5e76]">Dashboard</span>
              </div>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
                <span className="text-[11px] text-[#5a5e76]">Transactions</span>
              </div>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2 bg-[#f0eeff]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                <span className="text-[11px] text-[#6c5ce7] font-semibold">Analytics</span>
              </div>

              <p className="text-[8px] font-semibold text-[#9ea2b8] uppercase tracking-[0.1em] mt-5 mb-2 px-1">Settings</p>
              {[
                { n: "Business Profile", d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z" },
                { n: "Payouts", d: "M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 100 4 2 2 0 000-4z" },
                { n: "Notifications", d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" },
                { n: "Developers", d: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
              ].map((item) => (
                <div key={item.n} className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.d}/></svg>
                  <span className="text-[11px] text-[#5a5e76]">{item.n}</span>
                </div>
              ))}

              <p className="text-[8px] font-semibold text-[#9ea2b8] uppercase tracking-[0.1em] mt-5 mb-2 px-1">Admin Settings</p>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                <span className="text-[11px] text-[#5a5e76]">Fee Config</span>
              </div>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
                <span className="text-[11px] text-[#5a5e76]">Offramp Config</span>
              </div>

              <p className="text-[8px] font-semibold text-[#9ea2b8] uppercase tracking-[0.1em] mt-5 mb-2 px-1">Admin</p>
              <div className="rounded-lg px-2.5 py-2 mb-0.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                <span className="text-[11px] text-[#5a5e76]">Merchants</span>
              </div>

              <div className="mt-auto pt-4 flex items-center gap-2 px-1">
                <div className="h-7 w-7 rounded-full bg-[#6c5ce7] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-white">MB</span>
                </div>
                <span className="text-[8px] text-[#5a5e76] truncate leading-tight">maxwell.bunting@spacepay.co.uk</span>
              </div>
            </div>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0 bg-[#f7f8fc] flex flex-col">
              <div className="h-[6px]" style={{ background: "linear-gradient(90deg, #c7d2fe 0%, #dbeafe 40%, #e0e7ff 100%)" }} />

              <div className="flex-1 p-4 lg:p-5 overflow-hidden">
                {/* Page header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#1a1a2e] tracking-[-0.01em]">Analytics</h3>
                    <p className="text-[10px] text-[#8b8fa8] mt-0.5">Detailed insights and performance metrics</p>
                  </div>
                  <div className="rounded-xl border border-[#dce0ee] bg-white px-3 py-1.5 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    <span className="text-[10px] text-[#5a5e76] font-medium whitespace-nowrap">Jun 1, 2005 - Jun 30, 2005</span>
                  </div>
                </div>

                {/* Overview card */}
                <div className="rounded-2xl border border-[#dce0ee] bg-white p-3.5 mb-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="mb-3">
                    <p className="text-[12px] font-bold text-[#1a1a2e]">Overview</p>
                    <p className="text-[9px] text-[#8b8fa8] mt-0.5">Performance metrics for your payment gateway</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { label: "Gross Volume", hasInfo: true, val: "$824,590", pct: "+342.8%" },
                      { label: "Net Volume", hasInfo: true, val: "$811,241", pct: "+338.5%" },
                      { label: "Transactions", hasInfo: false, val: "12,847", pct: "+215.0%" },
                      { label: "Customers", hasInfo: false, val: "3,412", pct: "+189.4%" },
                      { label: "Avg Txn Value", hasInfo: false, val: "$64.18", pct: "+41.2%" },
                    ].map((s, si) => (
                      <div
                        key={s.label}
                        className="rounded-lg border border-[#eef0f7] p-2 overflow-hidden transition-all duration-700 ease-out"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "translateY(0)" : "translateY(10px)",
                          transitionDelay: visible ? `${600 + si * 80}ms` : "0ms",
                        }}
                      >
                        <p className="text-[7px] text-[#8b8fa8] font-medium truncate mb-1">{s.label}</p>
                        <p className="text-[12px] font-bold text-[#1a1a2e] leading-none mb-1 tracking-tight whitespace-nowrap">{s.val}</p>
                        <p className="text-[6px] text-[#22c55e] font-medium truncate">{s.pct} from prev. period</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart card */}
                <div
                  className="rounded-2xl border border-[#dce0ee] bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-700 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(14px)",
                    transitionDelay: visible ? "1s" : "0ms",
                  }}
                >
                  <p className="text-[12px] font-bold text-[#1a1a2e]">Daily Transaction Totals</p>
                  <p className="text-[9px] text-[#8b8fa8] mb-3">Revenue breakdown for the selected period</p>

                  <div className="flex gap-1.5">
                    <div className="flex flex-col justify-between text-[7px] text-[#b5b9cc] font-medium" style={{ height: 90 }}>
                      <span>$3200</span>
                      <span>$2400</span>
                      <span>$1600</span>
                      <span>$800</span>
                      <span>$0</span>
                    </div>
                    <div className="flex-1 relative" style={{ height: 90 }}>
                      {[0, 25, 50, 75, 100].map((pct) => (
                        <div key={pct} className="absolute left-0 right-0 border-t border-dashed border-[#ececf0]" style={{ top: `${pct}%` }} />
                      ))}
                      <div className="absolute inset-0 flex items-end gap-[2px]">
                        {barData.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-[2px] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[1]"
                            style={{
                              height: visible ? `${Math.max(h, 1)}%` : "1%",
                              transitionDuration: "900ms",
                              transitionDelay: `${1100 + i * 30}ms`,
                              backgroundColor: h > 5 ? "#6366f1" : "#eef0f7",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1.5 pl-7">
                    {["Jun 1","Jun 5","Jun 10","Jun 15","Jun 20","Jun 25","Jun 30"].map((d) => (
                      <span key={d} className="text-[7px] text-[#b5b9cc]">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Monthly Totals */}
                <div
                  className="rounded-2xl border border-[#dce0ee] bg-white p-3.5 mt-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-700 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(14px)",
                    transitionDelay: visible ? "1.3s" : "0ms",
                  }}
                >
                  <p className="text-[12px] font-bold text-[#1a1a2e]">Monthly Totals</p>
                  <p className="text-[9px] text-[#8b8fa8] mb-3">Settlement volume by month</p>

                  <div className="flex gap-1.5">
                    <div className="flex flex-col justify-between text-[7px] text-[#b5b9cc] font-medium" style={{ height: 90 }}>
                      <span>$250k</span>
                      <span>$188k</span>
                      <span>$125k</span>
                      <span>$63k</span>
                      <span>$0</span>
                    </div>
                    <div className="flex-1 relative" style={{ height: 90 }}>
                      {[0, 25, 50, 75, 100].map((pct) => (
                        <div key={pct} className="absolute left-0 right-0 border-t border-dashed border-[#ececf0]" style={{ top: `${pct}%` }} />
                      ))}
                      <div className="absolute inset-0 flex items-end gap-[3px]">
                        {[62,58,70,65,72,80,74,85,78,92,88,100].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-[2px] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[1]"
                            style={{
                              height: visible ? `${h}%` : "1%",
                              transitionDuration: "900ms",
                              transitionDelay: `${1500 + i * 50}ms`,
                              backgroundColor: "#a78bfa",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1.5 pl-7">
                    {["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"].map((m) => (
                      <span key={m} className="text-[7px] text-[#b5b9cc]">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 8: Support — realistic iPhone mockup like holyheld, rising from bottom */
function Visual8() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const messages: { from: string; text: string; delay: number }[] = [
    { from: "user", text: "Settlement webhook returning 401 on USDC payments. ETH settles fine", delay: 0.5 },
    { from: "eng", text: "Pulling your logs now", delay: 1.6 },
    { from: "eng", text: "Your HMAC validation is using the old API key. You rotated keys Tuesday but the webhook secret wasn't synced", delay: 2.8 },
    { from: "eng", text: "Pushed the new secret. Queued settlements will retry automatically", delay: 4.0 },
    { from: "user", text: "Confirmed, settlements coming through", delay: 5.2 },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-end overflow-hidden" style={{ paddingLeft: "8%" }}>
      {/* Realistic iPhone — holyheld style */}
      <div className="relative translate-y-20" style={{ width: 320 }}>
        {/* Side buttons — left */}
        <div className="absolute -left-[3px] top-[80px] w-[3px] h-[28px] rounded-l-sm bg-[#2a2a2a]" />
        <div className="absolute -left-[3px] top-[120px] w-[3px] h-[50px] rounded-l-sm bg-[#2a2a2a]" />
        <div className="absolute -left-[3px] top-[178px] w-[3px] h-[50px] rounded-l-sm bg-[#2a2a2a]" />
        {/* Side button — right */}
        <div className="absolute -right-[3px] top-[130px] w-[3px] h-[65px] rounded-r-sm bg-[#2a2a2a]" />

        {/* Phone body */}
        <div
          className="rounded-[44px] p-[10px] relative"
          style={{
            background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 30%, #0d0d0d 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Inner bezel */}
          <div
            className="rounded-[36px] overflow-hidden relative"
            style={{
              boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.6), inset 0 0 4px rgba(0,0,0,0.3)",
            }}
          >
            {/* Screen */}
            <div className="bg-[#f2f2f7] relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  <div
                    className="w-[120px] h-[28px] bg-black rounded-b-[18px] flex items-center justify-center gap-2"
                  >
                    {/* Camera */}
                    <div className="h-[10px] w-[10px] rounded-full bg-[#1a1a2e] border border-[#2a2a3a]" style={{ boxShadow: "inset 0 1px 3px rgba(0,0,100,0.4), 0 0 2px rgba(100,100,255,0.15)" }} />
                    {/* Speaker */}
                    <div className="w-[36px] h-[4px] rounded-full bg-[#1a1a1a]" />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center px-8 pt-3 pb-1 relative z-10">
                <span className="text-[12px] font-semibold text-[#0a0a0a]">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="#0a0a0a"><rect x="0" y="4" width="2.5" height="7" rx="0.5"/><rect x="3.5" y="3" width="2.5" height="8" rx="0.5"/><rect x="7" y="1.5" width="2.5" height="9.5" rx="0.5"/><rect x="10.5" y="0" width="2.5" height="11" rx="0.5"/></svg>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="#0a0a0a"><path d="M7 2C8.8 2 10.4 2.7 11.5 3.8L13 2.3C11.5 0.8 9.4 0 7 0S2.5 0.8 1 2.3L2.5 3.8C3.6 2.7 5.2 2 7 2z"/><path d="M7 5C8 5 8.9 5.4 9.6 6L11 4.5C9.9 3.5 8.5 3 7 3S4.1 3.5 3 4.5L4.4 6C5.1 5.4 6 5 7 5z"/><circle cx="7" cy="8.5" r="1.5"/></svg>
                  <svg width="20" height="11" viewBox="0 0 20 11" fill="none"><rect x="0.5" y="0.5" width="17" height="10" rx="2" stroke="#0a0a0a" strokeWidth="1"/><rect x="18.5" y="3" width="1.5" height="5" rx="0.5" fill="#0a0a0a" opacity=".4"/><rect x="2" y="2" width="13" height="7" rx="1" fill="#0a0a0a"/></svg>
                </div>
              </div>

              {/* App content — SpacePay support chat */}
              <div className="px-4 pt-1 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 36 36" fill="none">
                        <path d="M20.525 21.599H13.6849V14.401H20.525V21.599ZM6.84004 0C5.02634 0.00134551 3.28729 0.760133 2.00481 2.10972C0.722335 3.45931 0.0012786 5.28936 0 7.19797L0 10.7995C0 12.7085 0.720645 14.5393 2.0034 15.8892C3.28616 17.2391 5.02595 17.9975 6.84004 17.9975V8.27995C6.84131 7.9934 6.95005 7.71897 7.14259 7.51635C7.33514 7.31373 7.59592 7.1993 7.86822 7.19797H26.3417C26.6135 7.19931 26.8738 7.3139 27.0656 7.51666C27.2573 7.71943 27.365 7.99387 27.365 8.27995V10.8198H34.2099V0H6.84004ZM6.84004 25.2005H0V36H6.84004V25.2005ZM27.365 17.9975V27.72C27.365 28.0057 27.2572 28.2796 27.0653 28.4815C26.8734 28.6835 26.6131 28.7969 26.3417 28.7969H13.6849V36H27.365C28.2639 36 29.154 35.8137 29.9844 35.4517C30.8149 35.0897 31.5695 34.5591 32.2051 33.8903C32.8407 33.2214 33.3449 32.4273 33.6888 31.5534C34.0328 30.6795 34.2099 29.7429 34.2099 28.7969V25.2005C34.2099 24.2546 34.0328 23.3179 33.6888 22.444C33.3449 21.5701 32.8407 20.776 32.2051 20.1072C31.5695 19.4383 30.8149 18.9077 29.9844 18.5458C29.154 18.1838 28.2639 17.9975 27.365 17.9975Z" fill="#fff"/>
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-[#0a0a0a]">SpacePay</span>
                  </div>
                  <div className="rounded-full bg-[#f0fdf4] px-2 py-0.5 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[9px] font-medium text-[#22c55e]">Live</span>
                  </div>
                </div>
                <p className="text-[18px] font-bold tracking-[-0.02em] text-[#0a0a0a]">Support</p>
              </div>

              <div className="mx-4 h-px bg-[#d1d1d6]/40" />

              {/* Messages */}
              <div className="px-4 py-3 flex flex-col gap-2.5">
                <p className="text-[9px] text-[#8e8e93] text-center font-medium">TODAY</p>

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                      delay: msg.delay,
                    }}
                    className={cn("flex gap-2", msg.from === "user" ? "flex-row-reverse" : "flex-row")}
                  >
                    {msg.from === "eng" && (
                      <div className="h-6 w-6 rounded-full bg-[#0a0a0a] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[7px] font-bold text-white">JM</span>
                      </div>
                    )}
                    <div className="flex flex-col gap-0.5" style={{ alignItems: msg.from === "user" ? "flex-end" : "flex-start" }}>
                      {msg.from === "eng" && i === 1 && (
                        <span className="text-[9px] text-[#8e8e93] font-medium px-1">James, Engineer</span>
                      )}
                      <div
                        className={cn(
                          "max-w-[210px] px-3 py-2",
                          msg.from === "user"
                            ? "bg-[#0a0a0a] text-white rounded-[18px] rounded-br-[4px]"
                            : "bg-white text-[#0a0a0a] rounded-[18px] rounded-bl-[4px] shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]"
                        )}
                      >
                        <p className="text-[12px] leading-[1.4]">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Resolved */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: 6 }}
                  className="flex justify-center pt-2"
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-[#0a0a0a] px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <div className="h-4 w-4 rounded-full bg-[#22c55e] flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <p className="text-[11px] font-semibold text-white">Resolved in 2 min</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 9: Every way to pay — NFC radar arcs from title text
   The outermost arc width = title text width (~480px).
   Arcs emerge upward from the top edge of the title. */

const PAY_S = ["$", "€", "£"];
const NFC_PX = 4;

// Target: outermost arc diameter ≈ 480px → radius ≈ 240px → 60 cells
const ARC_BANDS = 6;
const ARC_THICK = 5;
const ARC_GAP = 3;
const ARC_START = 2;
// Max radius = 2 + 6*(5+3) = 50 cells → 200px diameter = 400px
// That's about right for "Every way to pay." at clamp(28–44px)
const ARC_MAX = ARC_START + ARC_BANDS * (ARC_THICK + ARC_GAP);
const NFC_ROWS = ARC_MAX + 1;
const NFC_COLS = ARC_MAX * 2 + 2;

function buildNfcGrid(): { band: number; sym: string; op: number }[][] {
  const grid: { band: number; sym: string; op: number }[][] = [];
  const cx = NFC_COLS / 2;
  const cy = NFC_ROWS;
  for (let r = 0; r < NFC_ROWS; r++) {
    const row: { band: number; sym: string; op: number }[] = [];
    for (let c = 0; c < NFC_COLS; c++) {
      const dx = c - cx;
      const dy = cy - r;
      if (dy <= 0) { row.push({ band: -1, sym: " ", op: 0 }); continue; }
      const dist = Math.sqrt(dx * dx + dy * dy);
      const adj = dist - ARC_START;
      if (adj < 0) { row.push({ band: -1, sym: " ", op: 0 }); continue; }
      const sp = ARC_THICK + ARC_GAP;
      const bi = Math.floor(adj / sp);
      const pos = adj - bi * sp;
      if (bi >= ARC_BANDS || pos >= ARC_THICK) {
        row.push({ band: -1, sym: " ", op: 0 }); continue;
      }
      const fade = 1 - (bi / ARC_BANDS) * 0.4;
      const seed = ((r * 31 + c * 17 + r * c * 7) % 100) / 100;
      const op = Math.min(fade * (0.5 + seed * 0.4), 0.8);
      row.push({ band: bi, sym: PAY_S[(r + c) % 3], op });
    }
    grid.push(row);
  }
  return grid;
}

const NFC_G = buildNfcGrid();
const NFC_BAND_CELLS: Map<number, { r: number; c: number; sym: string; op: number }[]> = new Map();
NFC_G.forEach((row, r) => row.forEach((cell, c) => {
  if (cell.band >= 0) {
    if (!NFC_BAND_CELLS.has(cell.band)) NFC_BAND_CELLS.set(cell.band, []);
    NFC_BAND_CELLS.get(cell.band)!.push({ r, c, sym: cell.sym, op: cell.op });
  }
}));

const NFC_CSS_ID = "nfc-radar-css";

function Visual9PayCard({ title, body }: { title: string; body: string }) {
  const injected = React.useRef(false);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [titleW, setTitleW] = React.useState(0);

  React.useEffect(() => {
    if (injected.current || typeof document === "undefined") return;
    if (document.getElementById(NFC_CSS_ID)) { injected.current = true; return; }
    const el = document.createElement("style");
    el.id = NFC_CSS_ID;
    el.textContent = `
      @keyframes nfcPulse {
        0%, 100% { opacity: 0.06; }
        15% { opacity: 1; }
        40% { opacity: 1; }
        60% { opacity: 0.06; }
      }
    `;
    document.head.appendChild(el);
    injected.current = true;
  }, []);

  // Measure title width via hidden span
  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => setTitleW(el.offsetWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scale the grid to match title width
  const rawGridW = NFC_COLS * NFC_PX;
  const scale = titleW > 0 ? titleW / rawGridW : 1;
  const gridH = NFC_ROWS * NFC_PX * scale;

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px] lg:h-[600px] px-8 md:px-16 lg:px-10 relative">
      {/* Arcs — full perfect semicircle */}
      <div className="flex-shrink-0" style={{ width: titleW > 0 ? titleW : 120, height: titleW > 0 ? titleW / 2 : 60, position: "relative", overflow: "hidden" }}>
        {titleW > 0 && (
          <div
            className="absolute inset-0 select-none pointer-events-none"
            aria-hidden="true"
            style={{
              fontFamily: "'SF Mono',Menlo,Monaco,'Courier New',monospace",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
            }}
          >
            {Array.from(NFC_BAND_CELLS.entries()).map(([band, cells]) => (
              <div
                key={band}
                style={{
                  position: "absolute",
                  inset: 0,
                  animation: `nfcPulse 3s ease-in-out infinite`,
                  animationDelay: `${band * 0.35}s`,
                }}
              >
                {cells.map((cell, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: cell.c * NFC_PX * scale,
                      top: cell.r * NFC_PX * scale,
                      width: NFC_PX * scale,
                      height: NFC_PX * scale,
                      fontSize: (NFC_PX - 0.5) * scale,
                      fontWeight: 700,
                      textAlign: "center",
                      lineHeight: `${NFC_PX * scale}px`,
                      color: `rgba(0,0,0,${cell.op})`,
                    }}
                  >
                    {cell.sym}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <h2
        className="font-semibold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a] max-w-[520px]"
        style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
      >
        {title}
      </h2>

      {/* Hidden span to measure text width */}
      <span
        ref={measureRef}
        className="font-semibold tracking-[-0.035em] absolute opacity-0 pointer-events-none whitespace-nowrap"
        style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
        aria-hidden="true"
      >
        {title}
      </span>

      <p className="mt-4 text-[16px] leading-[1.7] text-[#737373] mx-auto max-w-[420px]">
        {body}
      </p>
    </div>
  );
}

function Visual9() {
  return null; // Rendering handled by Visual9PayCard in FeatureCard
}

/* 10: Checkout — iPhone mockup showing SpacePay checkout screen.
   Replicates the real SpacePay payment UI from the screenshot.
   The "Pay" button at the bottom animates: Pay → Processing → ✓ Paid */

function Visual10CheckoutCard({ title, body }: { title: string; body: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [phase, setPhase] = React.useState(0);
  const cycleRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    const clearAll = () => cycleRef.current.forEach(clearTimeout);
    const run = () => {
      clearAll();
      cycleRef.current = [
        setTimeout(() => setPhase(1), 2000),
        setTimeout(() => setPhase(2), 4200),
        setTimeout(() => { setPhase(0); run(); }, 7200),
      ];
    };
    run();
    return clearAll;
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px] lg:h-[600px] px-8 md:px-16 lg:px-20 relative overflow-hidden"
    >
      <style>{`
        .v10-btn { width: 100%; max-width: 380px; height: 64px; border-radius: 16px; background: #4f8ef7; position: relative; overflow: hidden; }
        .v10-layer { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s ease, transform 0.5s ease; will-change: opacity, transform; }
        .v10-layer[data-active="false"] { opacity: 0; transform: scale(0.97); pointer-events: none; }
        .v10-layer[data-active="true"] { opacity: 1; transform: scale(1); pointer-events: auto; }
      `}</style>

      {/* The button — pure CSS transitions, fixed size, never moves */}
      <div className="v10-btn">
        {/* Phase 0: Pay with Crypto */}
        <div className="v10-layer" data-active={String(phase === 0)}>
          <span className="text-[17px] font-semibold text-white tracking-[-0.02em]">Pay with Crypto</span>
        </div>

        {/* Phase 1: Wallet + amount + confirm */}
        <div className="v10-layer gap-4 px-5" data-active={String(phase === 1)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/wallets/metamask.png" alt="" className="h-8 w-8 rounded-lg" />
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[14px] font-semibold text-white tracking-[-0.01em]">42.00 USDC</p>
            <p className="text-[10px] text-white/50 mt-px">Polygon · $0.00 gas</p>
          </div>
          <div className="rounded-lg bg-white/20 px-3.5 py-1.5">
            <span className="text-[12px] font-semibold text-white">Confirm</span>
          </div>
        </div>

        {/* Phase 2: Done */}
        <div className="v10-layer gap-2.5" data-active={String(phase === 2)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[17px] font-semibold text-white tracking-[-0.02em]">Paid</span>
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-semibold leading-[1.05] tracking-[-0.035em] text-[#0a0a0a] max-w-[520px] mt-10"
        style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
      >
        {title}
      </h2>

      <p className="mt-4 text-[16px] leading-[1.7] text-[#737373] mx-auto max-w-[420px]">
        {body}
      </p>
    </div>
  );
}

function Visual10() {
  return null;
}

/* 11: CTA — "Effortless Crypto Commerce" with Climatise-style flowing
   gradient text using SpacePay brand blues + inline Calendly embed. */
const CALENDLY_URL = "https://calendly.com/spacepay/spacepay-meeting";
const V11_CSS_ID = "v11-cta-css";

function Visual11() {
  return null; // Rendering handled by Visual11CalendarCard
}

function Visual11CalendarCard({ title, body }: { title: string; body: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const injected = React.useRef(false);
  React.useEffect(() => {
    if (injected.current || typeof document === "undefined") return;
    if (document.getElementById(V11_CSS_ID)) { injected.current = true; return; }
    const s = document.createElement("style");
    s.id = V11_CSS_ID;
    s.textContent = `
      @keyframes v11colorFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes v11glowPulse {
        0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.08); }
      }
      .v11-gradient-text {
        background: linear-gradient(
          97deg,
          #ffffff 0%,
          #d6e8f7 18%,
          #a8d4f5 35%,
          #daedf9 55%,
          #e8f2fb 75%,
          #ffffff 100%
        );
        background-size: 300% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: v11colorFlow 6s ease-in-out infinite;
      }
      .v11-calendly-wrap {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
      }
      .v11-calendly-wrap iframe {
        border: none !important;
      }
    `;
    document.head.appendChild(s);
    injected.current = true;
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col min-h-[420px] md:min-h-[520px] lg:min-h-[640px] relative overflow-hidden"
    >
      {/* Ambient glow — brand blue, behind the headline */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 1000, height: 500,
          top: "18%", left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(168,212,245,0.06) 0%, rgba(214,232,247,0.02) 50%, transparent 70%)",
          animation: visible ? "v11glowPulse 5s ease-in-out infinite" : "none",
        }}
      />

      {/* Title + body */}
      <div
        className="flex flex-col items-center text-center px-8 md:px-16 lg:px-20 pt-12 md:pt-16 lg:pt-20 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h2
          className="font-semibold leading-[1.05] tracking-[-0.035em] text-white max-w-[520px]"
          style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
        >
          {title}
        </h2>

        <p className="mt-5 text-[16px] leading-[1.7] text-white/40 mx-auto max-w-[400px]">
          {body}
        </p>
      </div>

      {/* Calendly inline — real booking, embedded right in the card */}
      <div
        className="flex-1 flex items-start justify-center px-5 md:px-10 lg:px-14 pt-6 pb-8 md:pb-10 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
        }}
      >
        <div className="v11-calendly-wrap w-full" style={{ maxWidth: 740, height: 320 }}>
          <iframe
            src={`${CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=0a0a0a&text_color=ffffff&primary_color=a8d4f5`}
            title="Book a call with SpacePay"
            style={{ width: "100%", height: "100%", border: "none" }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

const cardVisuals = [
  Visual1,  // 0: SDK (W)
  Visual2,  // 1: Settlement (W)
  Visual3,  // 2: Gas (B)
  Visual5,  // 3: Wallets (W)
  Visual7,  // 4: Books (W)
  Visual6,  // 5: Security (B)
  Visual8,  // 6: Support (W)
  Visual10, // 7: Checkout (W)
  Visual4,  // 8: Crypto (B)
  Visual9,  // 9: Pay (W)
  Visual11, // 10: CTA (B)
];

/* ── Card data ──────────────────────────────────────────────────── */

type Variant = "default" | "contrast" | "muted";
type Layout = "left" | "right" | "center";

interface CardData {
  title: string;
  body: string;
  variant: Variant;
  layout: Layout;
}

const cards: CardData[] = [
  /* 0  W */ {
    title: "Drop in our SDK. Go live in days.",
    body: "A few lines of code. Sandbox to production. No blockchain expertise needed.",
    variant: "default",
    layout: "left",
  },
  /* 1  W */ {
    title: "Instant settlement in fiat.",
    body: "Every crypto payment converts and settles to your bank account the same day.",
    variant: "default",
    layout: "right",
  },
  /* 2  B */ {
    title: "Zero gas fees for your customers.",
    body: "They approve. We handle the rest. No wallet gymnastics.",
    variant: "contrast",
    layout: "center",
  },
  /* 3  W */ {
    title: "Every wallet. Every network.",
    body: "Customers pay from the wallet they already use, on the chain they already hold tokens.",
    variant: "default",
    layout: "left",
  },
  /* 4  W */ {
    title: "Crypto never touches your books.",
    body: "We\u2019re settlement infrastructure. You receive fiat, same as any other payment method.",
    variant: "default",
    layout: "left",
  },
  /* 5  B */ {
    title: "Crypto security is hard. Your payments shouldn\u2019t be.",
    body: "Safety and security are our key priorities. Immutable settlement. No chargebacks, no disputes, no money walking back out the door.",
    variant: "contrast",
    layout: "center",
  },
  /* 6  W */ {
    title: "Support means engineers, not tickets.",
    body: "You talk to the people who built it. Not a chatbot, not a queue.",
    variant: "default",
    layout: "right",
  },
  /* 7  W */ {
    title: "Checkout in two taps.",
    body: "The entire flow lives inside the payment button. No redirects, no forms.",
    variant: "default",
    layout: "center",
  },
  /* 8  B */ {
    title: "They pay crypto. You get dollars.",
    body: "Automatic conversion. No volatility exposure. No crypto on your books.",
    variant: "contrast",
    layout: "center",
  },
  /* 9  W */ {
    title: "Every way to pay.",
    body: "Wallet connect, QR code, or direct link. One integration covers all of them.",
    variant: "default",
    layout: "center",
  },
  /* 10 B */ {
    title: "Questions shouldn\u2019t drag on.",
    body: "Book a call, talk to the team, get clear answers.",
    variant: "contrast",
    layout: "center",
  },
];

/* ── Stacking card component ─────────────────────────────────────── */

function FeatureCard({
  i,
  card,
  progress,
  range,
  targetScale,
}: {
  i: number;
  card: CardData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const Visual = cardVisuals[i];

  const bgMap: Record<Variant, string> = {
    default: "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] border-transparent",
    contrast: "bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] border-transparent",
    muted: "bg-[#f5f5f5] shadow-[0_0_0_1px_rgba(0,0,0,0.04)] border-transparent",
  };

  const dark = card.variant === "contrast";
  const isSecurityCard = i === 5;
  const isGaslessCard = i === 2;
  const isCryptoCard = i === 8;
  const isPayCard = i === 9;
  const isCheckoutCard = i === 7;
  const isCalendarCard = i === 10;

  return (
    <div className="flex items-center justify-center sticky top-[80px] h-screen max-h-[720px] min-h-[500px]">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className={cn(
          "relative w-full overflow-hidden rounded-[42px] border-2 origin-top",
          bgMap[card.variant]
        )}
      >
        {isSecurityCard ? (
          <Visual6SecurityCard title={card.title} body={card.body} />
        ) : isCheckoutCard ? (
          <Visual10CheckoutCard title={card.title} body={card.body} />
        ) : isPayCard ? (
          <Visual9PayCard title={card.title} body={card.body} />
        ) : isCryptoCard ? (
          <Visual4CryptoCard title={card.title} body={card.body} />
        ) : isGaslessCard ? (
          <Visual3GaslessCard title={card.title} body={card.body} />
        ) : isCalendarCard ? (
          <Visual11CalendarCard title={card.title} body={card.body} />
        ) : (
          <div
            className={cn(
              "relative flex min-h-[420px] md:min-h-[520px] lg:h-[600px]",
              card.layout === "center"
                ? "flex-col"
                : card.layout === "right"
                  ? "flex-col lg:flex-row-reverse"
                  : "flex-col lg:flex-row"
            )}
          >
            {/* Text column */}
            <div
              className={cn(
                "flex flex-col justify-center z-10",
                card.layout === "center"
                  ? "px-8 pt-10 pb-0 md:px-16 md:pt-14 lg:px-20 lg:pt-16 text-center max-w-[600px] mx-auto"
                  : "p-8 sm:p-10 md:p-14 lg:p-16 lg:w-[45%]"
              )}
            >
              <h2
                className={cn(
                  "font-semibold leading-[1.05] tracking-[-0.035em]",
                  dark ? "text-white" : "text-[#0a0a0a]"
                )}
                style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
              >
                {card.title}
              </h2>
              <p
                className={cn(
                  "mt-5 text-[16px] leading-[1.7]",
                  card.layout === "center" ? "mx-auto max-w-[380px]" : "max-w-[360px]",
                  dark ? "text-white/40" : "text-[#737373]"
                )}
              >
                {card.body}
              </p>
            </div>

            {/* Visual column */}
            <div
              className={cn(
                "relative",
                card.layout === "center"
                  ? "flex-1 min-h-[220px] md:min-h-[300px]"
                  : "lg:w-[55%] min-h-[260px] md:min-h-[320px]"
              )}
            >
              <Visual />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────── */

export function FeatureCards() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="features" ref={ref} className="relative px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        {cards.map((card, i) => (
          <FeatureCard
            key={i}
            i={i}
            card={card}
            progress={scrollYProgress}
            range={[i * (1 / cards.length), 1]}
            targetScale={1 - (cards.length - i) * 0.015}
          />
        ))}
      </div>
    </section>
  );
}
