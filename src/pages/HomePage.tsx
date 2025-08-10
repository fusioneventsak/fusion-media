import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useInView, useReducedMotion, MotionValue, useMotionValue, useMotionTemplate } from "framer-motion";
import FullWidthLaptopShowcase from "../components/Laptop";
import AnimatedHeroTitle from "../components/AnimatedHeroTitle";

/**
 * HomePage (Refined)
 * — Visual upgrades
 * — Smoother motion + reduced-motion support
 * — Stronger typography hierarchy
 * — Consistent, reusable UI primitives (buttons, badges, cards, headings)
 * — Subtle aurora + grain + grid for depth
 * — Better a11y + semantic tags
 */

/* ==========================================
   Primitive UI
========================================== */

const MotionButton: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "gradient";
  onClick?: () => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}> = ({ children, variant = "primary", onClick, className = "", as = "button" }) => {
  const Comp: any = motion[as as any] || motion.button;

  const base =
    "inline-flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/70 ring-offset-black";

  const styles = {
    primary:
      "bg-white text-gray-900 shadow-lg hover:shadow-xl hover:brightness-95",
    ghost:
      "border border-white/30 text-white hover:bg-white/10 hover:shadow-lg",
    gradient:
      "text-white shadow-lg bg-[linear-gradient(120deg,#7c3aed,40%,#ec4899)] hover:opacity-95"
  } as const;

  return (
    <Comp
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Comp>
  );
};

const Badge: React.FC<{ label: string; tone?: "green" | "blue" | "purple" }>
  = ({ label, tone = "green" }) => (
  <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
    <span className={`relative mr-2 inline-block h-2 w-2 rounded-full ${
      tone === "green" ? "bg-green-400" : tone === "blue" ? "bg-blue-400" : "bg-purple-400"
    } animate-pulse`} />
    <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
      {label}
    </span>
  </div>
);

const SectionHeading: React.FC<{ kicker?: string; title: React.ReactNode; center?: boolean }>
  = ({ kicker, title, center = true }) => (
  <div className={`mb-10 ${center ? "text-center" : ""}`}>
    {kicker && (
      <div className="mb-4">
        <Badge label={kicker} tone="purple" />
      </div>
    )}
    <h2 className="text-4xl md:text-6xl leading-[1.05] font-light text-white">
      {title}
    </h2>
  </div>
);

const FeatureRow: React.FC<{ icon: React.ReactNode; text: string }>
  = ({ icon, text }) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 shadow-md">
      {icon}
    </div>
    <p className="text-white/90 leading-relaxed">{text}</p>
  </motion.div>
);

const StatCard: React.FC<{ number: string; label: string; blurb: string }>
  = ({ number, label, blurb }) => (
  <motion.li
    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ duration: 0.25 }}
  >
    <div className="mb-1 text-3xl md:text-4xl font-light text-white">{number}</div>
    <div className="mb-1 text-sm font-semibold text-white/90">{label}</div>
    <div className="text-xs text-white/60">{blurb}</div>
  </motion.li>
);

/* ==========================================
   Background Layers
========================================== */

const GridBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    {/* radial vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(125,211,252,0.2),transparent_60%)]" />
    {/* fine grid */}
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-[.18]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
      </svg>
    </div>
  </div>
);

const Grain = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;utf8,\
    <svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'>\
    <filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter>\
    <rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.5\\' /></svg>')" }} />
);

const Aurora: React.FC<{ intensity?: number }>
  = ({ intensity = 1 }) => (
  <motion.div
    aria-hidden
    className="absolute inset-0 -z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 * intensity }}
    transition={{ duration: 1.2 }}
    style={{
      background:
        "radial-gradient(60% 40% at 20% 10%, rgba(99,102,241,0.28), transparent 60%)," +
        "radial-gradient(45% 35% at 80% 20%, rgba(236,72,153,0.22), transparent 60%)," +
        "radial-gradient(40% 35% at 50% 80%, rgba(56,189,248,0.25), transparent 65%)",
      filter: "blur(40px)"
    }}
  />
);

/* ==========================================
   Utilities
========================================== */

function useParallax(scroll: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(scroll, input, output);
}

/* ==========================================
   Page
========================================== */

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progressSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Parallax maps
  const heroOpacity = useParallax(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useParallax(scrollYProgress, [0, 0.25], [1, 0.96]);
  const heroY = useParallax(scrollYProgress, [0, 0.25], [-30, -120]);

  const eventOpacity = useParallax(scrollYProgress, [0.14, 0.44], [1, 0]);
  const eventScale = useParallax(scrollYProgress, [0.14, 0.44], [1, 0.97]);
  const eventY = useParallax(scrollYProgress, [0.14, 0.44], [0, -80]);

  // Magnetic CTA background using motion template (GPU friendly)
  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);
  const magnetic = useMotionTemplate`radial-gradient(600px 600px at ${bgX}% ${bgY}%, rgba(59,130,246,0.20), rgba(147,51,234,0.12) 45%, rgba(6,182,212,0.08) 65%, transparent 75%)`;

  const handleCTAMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    bgX.set(x);
    bgY.set(y);
  };

  const servicesInView = useInView(servicesRef, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white">
      <Aurora intensity={1} />
      <GridBackdrop />
      <Grain />

      {/* Scroll progress */}
      <div aria-hidden className="fixed bottom-6 left-6 z-50">
        <div className="h-28 w-2 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur">
          <motion.div className="h-full w-full origin-bottom bg-gradient-to-t from-cyan-400 via-blue-500 to-purple-600" style={{ scaleY: progressSpring }} />
        </div>
      </div>

      {/* ============================ */}
      {/* Hero */}
      {/* ============================ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY, willChange: "transform, opacity" }}
        className="relative flex min-h-[92vh] items-center justify-center px-6 pt-28 pb-16"
        aria-label="Hero"
      >
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <Badge label="AI‑Assisted Digital Agency" />
          </div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <AnimatedHeroTitle />
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-balance text-lg md:text-xl text-white/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            What once took months to produce we now deliver in weeks. High‑end websites, rich animation, multi‑page flows, and complex logic. Speed from AI. Taste from 25+ years in events, entertainment, and technology.
          </motion.p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MotionButton variant="primary">See Our Work</MotionButton>
            <MotionButton variant="ghost">Start a Project</MotionButton>
          </div>

          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
            <StatCard number="10x" label="Faster Delivery" blurb="AI‑powered development" />
            <StatCard number="25+" label="Years Experience" blurb="Events & entertainment" />
            <StatCard number="500+" label="Projects Delivered" blurb="Across industries" />
            <StatCard number="98%" label="Client Satisfaction" blurb="Proven track record" />
          </ul>
        </div>

        {/* decorative spotlight */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.section>

      {/* ============================ */}
      {/* Event Tech */}
      {/* ============================ */}
      <motion.section
        style={{ opacity: eventOpacity, scale: eventScale, y: eventY }}
        className="relative overflow-hidden px-6 py-24"
        aria-label="Event Technology"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div>
            <SectionHeading
              kicker="Event Technology"
              title={<>
                Interactive Engagement<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold text-transparent">Experiences</span>
              </>}
            />

            <p className="mb-8 max-w-2xl text-lg text-white/80">
              Turn any event into an interactive memory. Our platforms blend real‑time photo processing, live sharing, and analytics to drive participation and capture meaningful insights.
            </p>

            <div className="mb-8 space-y-5">
              <FeatureRow
                icon={<svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                text="Real‑time photo processing with AI effects and custom animation"
              />
              <FeatureRow
                icon={<svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                text="Social integration with viral sharing and hashtag campaigns"
              />
              <FeatureRow
                icon={<svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                text="Trade shows, festivals, retail activations, and corporate events"
              />
              <FeatureRow
                icon={<svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                text="Analytics dashboards with engagement metrics and lead capture"
              />
              <FeatureRow
                icon={<svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
                text="White‑label branding and enterprise integrations"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <MotionButton variant="gradient" onClick={() => window.open("https://selfieholosphere.com/collage/1lr9qn", "_blank")}>
                View Live Demo
              </MotionButton>
              <MotionButton variant="ghost">Get Quote</MotionButton>
            </div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 blur-3xl" style={{ background:
              "radial-gradient(60% 60% at 40% 20%, rgba(147,51,234,.35), transparent 60%)," +
              "radial-gradient(40% 40% at 80% 20%, rgba(14,165,233,.25), transparent 60%)" }} />

            <motion.img
              src="https://www.fusion-events.ca/wp-content/uploads/2025/06/Untitled-512-x-512-px-3.png"
              alt="Selfie Holosphere — interactive photo platform"
              className="mx-auto w-full max-w-5xl rounded-2xl shadow-2xl ring-1 ring-white/10"
              loading="lazy"
              style={{ filter: "drop-shadow(0 25px 60px rgba(147,51,234,.28))" }}
              animate={prefersReducedMotion ? {} : { y: [0, -6, 0, 6, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating badges */}
            <motion.div
              className="absolute left-2 top-2 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Live Processing</div>
                  <div className="text-[10px] text-emerald-300">Real‑time AI effects</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-3 top-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Analytics</div>
                  <div className="text-[10px] text-orange-300">Live insights</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============================ */}
      {/* Laptops (unchanged props, polished transitions) */}
      {/* ============================ */}
      <section className="space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <FullWidthLaptopShowcase
            url="https://splendid-cannoli-324007.netlify.app/"
            title="Custom Business Applications"
            description="Tailored internal tools and CRM systems designed around your workflow. Streamline operations and unlock insight with secure, scalable apps."
            features={[
              "Custom CRM & data management",
              "Workflow automation & reporting",
              "Team collaboration & project tools",
              "Advanced visualization & analytics",
              "Secure cloud architecture"
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-blue-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -1 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <FullWidthLaptopShowcase
            url="http://urequestsongs.com"
            title="Audience Engagement Platforms"
            description="Real‑time interaction that connects performers and audience. Requests, polls, and shared moments that travel beyond the room."
            features={[
              "Live song requests",
              "Real‑time voting & polls",
              "Social sharing",
              "Artist & venue branding",
              "Engagement analytics"
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-cyan-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <FullWidthLaptopShowcase
            url="https://capable-alfajores-d0dff2.netlify.app/"
            title="Interactive Widgets & Components"
            description="Gamified experiences and embedded tools that educate, entertain, and convert across web and live environments."
            features={[
              "Custom game shows & trivia",
              "Interactive website widgets",
              "Education & training modules",
              "Leaderboards & scoring",
              "Responsive multi‑device"
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-indigo-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 70, rotate: 0.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <FullWidthLaptopShowcase
            url="https://www.fusion-events.ca"
            title="Professional Website Development"
            description="Beautiful, fast websites that move your business. Built modern, optimized for SEO and conversion."
            features={[
              "Responsive design",
              "SEO & performance",
              "CMS & easy updates",
              "E‑commerce & payments",
              "Analytics & tracking"
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-green-600"
          />
        </motion.div>
      </section>

      {/* ============================ */}
      {/* Process */}
      {/* ============================ */}
      <section ref={servicesRef} className="relative overflow-hidden px-6 py-28">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={servicesInView ? { clipPath: "circle(140% at 50% 50%)" } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading
            kicker="Our Approach"
            title={<>
              How we <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">work faster</span>
            </>}
          />

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: "🤖", title: "AI‑Powered Development", desc: "Rapid prototyping, code generation, and design iteration cut build time by 10x." },
              { icon: "🎯", title: "25+ Years of Expertise", desc: "Deep domain knowledge in events, entertainment, and technology." },
              { icon: "⚡", title: "Proven Methodologies", desc: "Battle‑tested processes ensure speed without sacrificing quality." }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
                initial={{ opacity: 0, y: 30, rotate: 2 }}
                animate={servicesInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className="mb-5 text-5xl">{item.icon}</div>
                <h3 className="mb-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="text-white/85">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
              <span className="text-white/90">Ready to experience the difference?</span>
              <MotionButton variant="primary">Get Started</MotionButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* CTA (Magnetic) */}
      {/* ============================ */}
      <section
        ref={ctaRef}
        onMouseMove={handleCTAMove}
        className="relative overflow-hidden px-6 py-28"
        aria-label="Call to action"
      >
        <motion.div className="absolute inset-0 -z-10" style={{ background: magnetic }} />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-4xl md:text-6xl font-light leading-[1.05]">
            Ready to transform
            {" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">your vision</span>
            {" "}into reality?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/85">
            Let’s talk about how our AI‑assisted approach can deliver exceptional results for your next project.
          </p>

          <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MotionButton variant="primary">Start Your Project</MotionButton>
            <MotionButton variant="ghost">Schedule Consultation</MotionButton>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Events & Entertainment", desc: "25+ years. Proven outcomes." , tone: "text-blue-400" },
              { title: "AI‑Powered Development", desc: "10x faster delivery.", tone: "text-purple-400" },
              { title: "Custom Solutions", desc: "Tailored to your business.", tone: "text-cyan-400" }
            ].map((c) => (
              <motion.div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <div className={`mb-1 text-2xl font-light ${c.tone}`}>{c.title}</div>
                <p className="text-sm text-white/85">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 pb-16 text-center text-white/60">
        <small>© {new Date().getFullYear()} Fusion Events — Built with care and a little AI.</small>
      </footer>
    </main>
  );
}
