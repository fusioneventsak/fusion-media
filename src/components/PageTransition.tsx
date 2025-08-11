import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";

/**
 * PageTransitionPro
 * Modern, elegant, and performant page transition overlay.
 *
 * Usage:
 * <PageTransitionPro currentPage={route} onTransitionChange={setBusy}>
 *   {pageContent}
 * </PageTransitionPro>
 */

type Direction = "forward" | "backward";

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
  onTransitionChange?: (isTransitioning: boolean) => void;
  // Optional fine-tuning
  durationMs?: number;          // total overlay lifetime
  switchAtMs?: number;          // when to swap children
  pagesOrder?: string[];        // to compute direction
}

const DEFAULT_PAGES = ["home", "about", "case-studies", "contact"];

const PAGE_META: Record<
  string,
  { name: string; from: string; to: string; accent: string }
> = {
  home: { name: "Home", from: "#1e3a8a", to: "#3b82f6", accent: "#60a5fa" },
  about: { name: "About", from: "#4c1d95", to: "#8b5cf6", accent: "#a78bfa" },
  "case-studies": {
    name: "Case Studies",
    from: "#115e59",
    to: "#06b6d4",
    accent: "#67e8f9",
  },
  contact: { name: "Contact", from: "#064e3b", to: "#10b981", accent: "#6ee7b7" },
};

export default function PageTransitionPro({
  currentPage,
  children,
  onTransitionChange,
  durationMs,
  switchAtMs,
  pagesOrder,
}: PageTransitionProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tuned timing with reduced-motion support
  const TOTAL = prefersReducedMotion ? 700 : durationMs ?? 1200;
  const SWITCH_AT = prefersReducedMotion ? 300 : switchAtMs ?? Math.floor(TOTAL * 0.45);

  const order = pagesOrder ?? DEFAULT_PAGES;
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");

  const timers = useRef<number[]>([]);
  const isPresent = useIsPresent();

  // Compute direction and palette
  const meta = useMemo(() => {
    const safe = (key: string) => PAGE_META[key] ?? PAGE_META.home;
    const from = safe(displayPage);
    const to = safe(currentPage);
    const fromIdx = order.indexOf(displayPage);
    const toIdx = order.indexOf(currentPage);
    const dir: Direction =
      toIdx === -1 || fromIdx === -1 ? "forward" : toIdx > fromIdx ? "forward" : "backward";
    return { from, to, dir };
  }, [currentPage, displayPage, order]);

  // Interruptible transition
  useEffect(() => {
    if (currentPage === displayPage) return;

    // Start
    setDirection(meta.dir);
    setIsTransitioning(true);
    onTransitionChange?.(true);

    // Prevent mid-scroll jank
    window.scrollTo({ top: 0, behavior: "auto" });

    // Swap content at peak coverage
    timers.current.push(
      window.setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo({ top: 0, behavior: "auto" });
      }, SWITCH_AT) as unknown as number
    );

    // End overlay
    timers.current.push(
      window.setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
      }, TOTAL) as unknown as number
    );

    // Cleanup if user navigates again during transition or component unmounts
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // intentionally only on page change

  // CSS variables piped down to motion elements
  const cssVars: React.CSSProperties = {
    // gradient endpoints
    ["--from" as any]: meta.from.from,
    ["--to" as any]: meta.to.to,
    ["--accent" as any]: meta.to.accent,
    // chroma accent for subtle RGB split
    ["--accentSoft" as any]: hexWithAlpha(meta.to.accent, 0.25),
    // reduce-motion friendly scale
    ["--skew" as any]: prefersReducedMotion ? "0deg" : "10deg",
  };

  return (
    <div className="relative w-full h-full" style={{ contain: "paint layout" }}>
      {/* Keep content mounted for SEO and state preservation */}
      {children}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`overlay-${displayPage}-${currentPage}`}
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 0 : 0.0001 }} // let curtains handle fade
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.18 }}
            style={cssVars}
          >
            {/* Backdrop bloom + grain */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)",
                  }}
                />
                <Grain />
              </div>
            )}

            {/* Curtain panels */}
            <Curtains
              totalMs={TOTAL}
              switchAt={SWITCH_AT}
              direction={direction}
              reduced={prefersReducedMotion}
            />

            {/* Center label chip + progress ring */}
            <CenterLabel
              title={PAGE_META[currentPage]?.name ?? "Page"}
              totalMs={TOTAL}
              reduced={prefersReducedMotion}
            />

            {/* Soft particles for depth */}
            {!prefersReducedMotion && <Particles key={currentPage} direction={direction} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- Parts --------------------------------- */

function Curtains({
  totalMs,
  switchAt,
  direction,
  reduced,
}: {
  totalMs: number;
  switchAt: number;
  direction: Direction;
  reduced: boolean;
}) {
  // We split into two skewed panels that meet at center at switchAt, then exit
  const enterPct = 0.5; // when fully covered
  const exitPct = 1.0;

  // Forward = left->right. Backward = right->left.
  const dir = direction === "forward" ? 1 : -1;

  const base = {
    position: "absolute" as const,
    inset: 0,
    willChange: "transform, opacity",
    transformStyle: "preserve-3d" as const,
  };

  const panelCommon =
    "absolute top-0 h-full w-[60vw] origin-center will-change-transform rounded-[2.5rem] md:rounded-[4rem] overflow-hidden";

  const enterDuration = reduced ? switchAt : switchAt * 0.92;
  const exitDuration = reduced ? totalMs - switchAt : (totalMs - switchAt) * 0.88;

  return (
    <div style={base}>
      {/* Leading panel */}
      <motion.div
        className={panelCommon}
        style={{
          left: dir === 1 ? "-65vw" : "auto",
          right: dir === -1 ? "-65vw" : "auto",
          background:
            "linear-gradient(120deg, var(--from) 0%, var(--to) 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          transform: `skewX(var(--skew))`,
        }}
        initial={{ x: 0 }}
        animate={{ x: dir * 110 + "vw" }}
        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: enterDuration / 1000 }}
      />

      {/* Trailing panel with subtle glass */}
      <motion.div
        className={panelCommon}
        style={{
          left: dir === 1 ? "-20vw" : "auto",
          right: dir === -1 ? "-20vw" : "auto",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
          backdropFilter: "blur(10px) saturate(110%)",
          WebkitBackdropFilter: "blur(10px) saturate(110%)",
          border: "1px solid rgba(255,255,255,0.2)",
          transform: `skewX(var(--skew))`,
        }}
        initial={{ x: 0 }}
        animate={{ x: dir * 140 + "vw" }}
        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: enterDuration / 1000 }}
      />

      {/* Exit wipe: slim accent bar that pulls out to edge */}
      {!reduced && (
        <motion.div
          className="absolute top-0 h-full w-[10vw] rounded-[3rem]"
          style={{
            left: dir === 1 ? "50vw" : "auto",
            right: dir === -1 ? "50vw" : "auto",
            background:
              "linear-gradient(180deg, transparent, var(--accentSoft), transparent)",
            filter: "contrast(120%)",
            transform: `skewX(var(--skew))`,
          }}
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1, x: dir * 60 + "vw" }}
          transition={{
            delay: switchAt / 1000,
            duration: exitDuration / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}

      {/* Subtle chromatic edge (feels premium on OLED) */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "radial-gradient(60% 120% at 50% 50%, rgba(255,0,102,0.06), rgba(0,255,204,0.06) 40%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}

function CenterLabel({
  title,
  totalMs,
  reduced,
}: {
  title: string;
  totalMs: number;
  reduced: boolean;
}) {
  const ringDuration = Math.max(0.001, totalMs - 140);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: reduced ? 0.98 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduced ? 0.98 : 1.02 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Progress ring */}
        {!reduced && (
          <svg
            width="132"
            height="132"
            viewBox="0 0 132 132"
            className="absolute -left-[16px] -top-[16px]"
          >
            <circle
              cx="66"
              cy="66"
              r="58"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="66"
              cy="66"
              r="58"
              stroke="url(#grad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: ringDuration / 1000, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--from)" />
                <stop offset="100%" stopColor="var(--to)" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Label chip */}
        <div
          className="px-5 py-2 rounded-full border text-white/95 shadow-xl"
          style={{
            borderColor: "rgba(255,255,255,0.25)",
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.75), rgba(10,10,10,0.55))",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <motion.span
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ letterSpacing: "0.12em" }}
            className="text-sm font-medium tracking-widest"
          >
            {title.toUpperCase()}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function Particles({ direction }: { direction: Direction }) {
  const dir = direction === "forward" ? 1 : -1;
  const N = 18;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: N }).map((_, i) => {
        const delay = i * 0.02;
        const y = rand(-40, 40);
        const startX = dir === 1 ? -120 : 120;
        const endX = dir === 1 ? 120 : -120;

        return (
          <motion.div
            key={i}
            className="absolute w-[6px] h-[6px] rounded-full"
            style={{
              top: `calc(50% + ${y}px)`,
              left: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.1))",
              boxShadow: "0 0 24px var(--accentSoft)",
              filter: "saturate(120%)",
            }}
            initial={{ x: startX, opacity: 0, scale: 0.6 }}
            animate={{ x: endX, opacity: [0, 1, 0.0], scale: [0.6, 1, 0.8] }}
            transition={{
              delay,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </div>
  );
}

function Grain() {
  // static grain layer for texture
  return (
    <div
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/>\
<feColorMatrix type='saturate' values='0'/>\
<feComponentTransfer><feFuncA type='table' tableValues='0 0.7'/></feComponentTransfer>\
</filter>\
<rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/>\
</svg>\")",
        backgroundSize: "auto",
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
}

/* --------------------------------- Utils --------------------------------- */

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function hexWithAlpha(hex: string, alpha: number) {
  // Accepts #rrggbb
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
