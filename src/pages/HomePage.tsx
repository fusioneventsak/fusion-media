import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate
} from "framer-motion";
import FullWidthLaptopShowcase from "../components/Laptop";
import AnimatedHeroTitle from "../components/AnimatedHeroTitle";

/**
 * HomePage — Cinematic Scrollytelling
 * Keeps your original copy and content intact, reframed as scenes:
 * 1) Hero
 * 2) Event Tech scrollytelling split
 * 3) Portfolio horizontal rail
 * 4) Process timeline blueprint
 * 5) Magnetic CTA finale
 *
 * Notes
 * - All text, URLs, and feature bullets mirror your original.
 * - Uses only Framer Motion; no external timeline libs.
 * - GPU-friendly transforms. Reduced-motion supported.
 */

/* =================== UI Primitives =================== */
const Button = ({
  children,
  variant = "primary",
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "gradient";
  onClick?: () => void;
  className?: string;
}) => {
  const base =
    "inline-flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/70 ring-offset-black";
  const map: Record<string, string> = {
    primary: "bg-white text-gray-900 shadow-lg hover:shadow-xl hover:brightness-95",
    ghost: "border border-white/30 text-white hover:bg-white/10 hover:shadow-lg",
    gradient:
      "text-white shadow-lg bg-[linear-gradient(120deg,#7c3aed,40%,#ec4899)] hover:opacity-95"
  };
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${base} ${map[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Badge = ({ label }: { label: string }) => (
  <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
    <span className="text-xs font-medium text-white/90 tracking-wide uppercase">{label}</span>
  </div>
);

const Stat = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <motion.li
    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ duration: 0.25 }}
  >
    <div className="mb-1 text-3xl md:text-4xl font-light text-white">{number}</div>
    <div className="mb-1 text-sm font-semibold text-white/90">{label}</div>
    <div className="text-xs text-white/60">{description}</div>
  </motion.li>
);

/* =================== Background Layers =================== */
const GridBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(125,211,252,0.18),transparent_60%)]" />
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-[.15]">
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
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light opacity-20"
    style={{
      backgroundImage:
        "url('data:image/svg+xml;utf8,\
      <svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'>\
      <filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter>\
      <rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.5\\' /></svg>')"
    }}
  />
);

const Aurora = () => (
  <motion.div
    aria-hidden
    className="absolute inset-0 -z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.85 }}
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

/* =================== Scene Helpers =================== */
function useParallax(scroll: ReturnType<typeof useScroll>["scrollYProgress"], input: number[], output: number[]) {
  return useTransform(scroll, input, output);
}

/* =================== Page =================== */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progressSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Scene parallax
  const heroOpacity = useParallax(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useParallax(scrollYProgress, [0, 0.25], [1, 0.96]);
  const heroY = useParallax(scrollYProgress, [0, 0.25], [-30, -120]);

  const eventOpacity = useParallax(scrollYProgress, [0.14, 0.44], [1, 0]);
  const eventScale = useParallax(scrollYProgress, [0.14, 0.44], [1, 0.97]);
  const eventY = useParallax(scrollYProgress, [0.14, 0.44], [0, -80]);

  const servicesInView = useInView(servicesRef, { once: true, margin: "-20% 0px -20% 0px" });

  // Magnetic CTA background
  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);
  const magnetic = useMotionTemplate`radial-gradient(600px 600px at ${bgX}% ${bgY}%, rgba(59,130,246,0.20), rgba(147,51,234,0.12) 45%, rgba(6,182,212,0.08) 65%, transparent 75%)`;

  const handleCTAMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    bgX.set(((e.clientX - rect.left) / rect.width) * 100);
    bgY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  // Original content preserved
  const stats = useMemo(
    () => [
      { number: "10x", label: "Faster Delivery", description: "AI-powered development" },
      { number: "25+", label: "Years Experience", description: "Events & entertainment" },
      { number: "500+", label: "Projects Delivered", description: "Across all industries" },
      { number: "98%", label: "Client Satisfaction", description: "Proven track record" }
    ],
    []
  );

  const eventFeatures = useMemo(
    () => [
      {
        text: "Real-time photo processing with AI-powered effects and customizable animations",
        icon: (
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      },
      {
        text: "Social media integration with viral sharing and hashtag campaigns",
        icon: (
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        )
      },
      {
        text: "Trade shows, festivals, retail activations, and corporate events",
        icon: (
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
      {
        text: "Advanced analytics dashboard with engagement metrics and lead capture",
        icon: (
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        text: "Custom branding, white-label solutions, and enterprise integrations",
        icon: (
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      }
    ],
    []
  );

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white">
      <Aurora />
      <GridBackdrop />
      <Grain />

      {/* Scroll progress indicator */}
      <div aria-hidden className="fixed bottom-6 left-6 z-50">
        <div className="h-28 w-2 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur">
          <motion.div className="h-full w-full origin-bottom bg-gradient-to-t from-cyan-400 via-blue-500 to-purple-600" style={{ scaleY: progressSpring }} />
        </div>
      </div>

      {/* ================= Scene 1: Hero ================= */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY, willChange: "transform, opacity" }}
        className="relative flex min-h-[92vh] items-center justify-center px-6 pt-28 pb-16"
        aria-label="Hero"
      >
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-6"><Badge label="AI-Assisted Digital Agency" /></div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <AnimatedHeroTitle />
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-balance text-lg md:text-xl text-white/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            What once took months to produce—high-end websites with animations, multiple pages, and complex functionality—we now deliver in weeks. AI-powered productivity meets 25+ years of expertise in events, entertainment, and technology.
          </motion.p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button>See Our Work</Button>
            <Button variant="ghost">Start a Project</Button>
          </div>

          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} number={s.number} label={s.label} description={s.description} />
            ))}
          </ul>
        </div>

        {/* soft bottom fade */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

        {/* scroll hint */}
        <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
          <div className="animate-bounce text-xs tracking-wide">Scroll to explore</div>
        </div>
      </motion.section>

      {/* ========== Scene 2: Event Tech Split Scrollytelling ========== */}
      <motion.section
        style={{ opacity: eventOpacity, scale: eventScale, y: eventY }}
        className="relative overflow-hidden px-6 py-24"
        aria-label="Event Technology"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          {/* Sticky copy left */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-6">
              <span className="inline-flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium uppercase tracking-wider text-green-400">Event Technology</span>
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              Interactive Engagement
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold text-transparent">Experiences</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Transform any event into an interactive experience that captivates audiences and creates lasting memories. Our cutting-edge engagement platforms combine real-time photo processing, social media integration, and advanced analytics to drive meaningful participation and generate valuable business insights.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="gradient" onClick={() => window.open("https://selfieholosphere.com/collage/1lr9qn", "_blank")}>View Live Demo</Button>
              <Button variant="ghost">Get Quote</Button>
            </div>
          </div>

          {/* Scroll-driven feature frames right */}
          <div className="relative">
            <motion.img
              src="https://www.fusion-events.ca/wp-content/uploads/2025/06/Untitled-512-x-512-px-3.png"
              alt="Selfie Holosphere - Interactive Photo Experience Platform"
              className="mx-auto w-full max-w-5xl rounded-2xl shadow-2xl ring-1 ring-white/10"
              loading="lazy"
              animate={prefersReducedMotion ? {} : { y: [0, -6, 0, 6, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 25px 60px rgba(147,51,234,0.28))" }}
            />

            {/* Floating badges preserved */}
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
                  <div className="text-[10px] text-emerald-300">Real-time AI effects</div>
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

            {/* Feature list scrollytelling frames */}
            <div className="mt-8 space-y-5">
              {eventFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 shadow-md">
                    {f.icon}
                  </div>
                  <p className="text-white/90 leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========== Scene 3: Portfolio Horizontal Rail ========== */}
      <section className="relative overflow-hidden px-6 py-24" aria-label="Portfolio">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-8 text-center text-3xl font-light md:text-5xl">Selected Work</h3>
          <div className="relative">
            {/* Horizontal scroll container with snap */}
            <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none]" style={{ scrollSnapType: "x mandatory" }}>
              {/* Hide scrollbar chrome */}
              <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
              <div className="snap-start shrink-0 w-[100%] md:w-[90%] lg:w-[80%]">
                <FullWidthLaptopShowcase
                  url="https://splendid-cannoli-324007.netlify.app/"
                  title="Custom Business Applications"
                  description="Tailored internal tools and CRM systems built specifically for your organization's workflow. Streamline operations, improve efficiency, and gain valuable insights with applications designed around your unique business needs and processes."
                  features={[
                    "Custom CRM and database management systems",
                    "Workflow automation and comprehensive reporting",
                    "Team collaboration tools and project management",
                    "Advanced data visualization and business analytics",
                    "Secure cloud-based architecture with enterprise-grade security"
                  ]}
                  backgroundColor="transparent"
                  textColor="text-white"
                  accentColor="text-blue-600"
                />
              </div>
              <div className="snap-start shrink-0 w-[100%] md:w-[90%] lg:w-[80%]">
                <FullWidthLaptopShowcase
                  url="http://urequestsongs.com"
                  title="Audience Engagement Platforms"
                  description="Real-time interaction tools that connect performers with their audience in meaningful ways. From song requests to live polling, these platforms create deeper engagement and memorable experiences for bands, DJs, and entertainers of all kinds."
                  features={[
                    "Live song request systems for bands, DJs, and performers",
                    "Real-time audience voting, polls, and interactive features",
                    "Social media integration and viral sharing capabilities",
                    "Custom branding for artists, venues, and event organizers",
                    "Comprehensive analytics and audience engagement insights"
                  ]}
                  backgroundColor="transparent"
                  textColor="text-white"
                  accentColor="text-cyan-400"
                />
              </div>
              <div className="snap-start shrink-0 w-[100%] md:w-[90%] lg:w-[80%]">
                <FullWidthLaptopShowcase
                  url="https://capable-alfajores-d0dff2.netlify.app/"
                  title="Interactive Widgets & Components"
                  description="Gamified experiences and interactive elements that boost engagement on websites and at live events. From custom game shows to educational tools, we create interactive components that entertain, inform, and drive meaningful user participation."
                  features={[
                    "Custom game shows, trivia platforms, and interactive competitions",
                    "Interactive website widgets and embedded components",
                    "Educational modules and training platforms",
                    "Leaderboards, scoring systems, and competition management",
                    "Multi-device compatibility and responsive design"
                  ]}
                  backgroundColor="transparent"
                  textColor="text-white"
                  accentColor="text-indigo-600"
                />
              </div>
              <div className="snap-start shrink-0 w-[100%] md:w-[90%] lg:w-[80%]">
                <FullWidthLaptopShowcase
                  url="https://www.fusion-events.ca"
                  title="Professional Website Development"
                  description="Beautiful, high-performance websites that drive real business results. Built with modern HTML, CSS, and JavaScript, optimized for speed, SEO, and conversions. Perfect for service businesses, corporate brands, and growing organizations."
                  features={[
                    "Modern, responsive design with mobile-first approach",
                    "SEO optimization and lightning-fast loading speeds",
                    "Content management systems and easy updates",
                    "E-commerce integration and payment processing",
                    "Advanced analytics, conversion tracking, and performance monitoring"
                  ]}
                  backgroundColor="transparent"
                  textColor="text-white"
                  accentColor="text-green-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Scene 4: Process Timeline Blueprint ========== */}
      <section ref={servicesRef} className="relative overflow-hidden px-6 py-28" aria-label="Process">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={servicesInView ? { clipPath: "circle(140% at 50% 50%)" } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
              How we <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">work faster</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-white/85">
              Our AI-assisted approach combines cutting-edge tools with decades of experience to deliver exceptional results in record time.
            </p>
          </div>

          {/* Blueprint timeline */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 -ml-[1px] h-full w-[2px] bg-gradient-to-b from-white/30 to-transparent" />
            {[
              {
                number: "01",
                title: "AI-Powered Development",
                description:
                  "We leverage the latest AI tools for rapid prototyping, code generation, and design iteration, reducing development time by 10x.",
                icon: "🤖"
              },
              {
                number: "02",
                title: "25+ Years of Expertise",
                description:
                  "Deep industry knowledge in events, entertainment, and technology ensures we understand your unique challenges and opportunities.",
                icon: "🎯"
              },
              {
                number: "03",
                title: "Proven Methodologies",
                description:
                  "Our battle-tested processes and frameworks mean faster delivery without compromising quality or functionality.",
                icon: "⚡"
              }
            ].map((item, i) => (
              <motion.div
                key={item.number}
                className={`relative grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:grid-cols-[1fr_auto_1fr] ${i % 2 ? "md:text-left" : "md:text-right"} mb-10`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`hidden md:block ${i % 2 ? "order-1" : "order-3"}`} />
                <div className="order-2 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className={`order-3 ${i % 2 ? "md:order-3" : "md:order-1"}`}>
                  <div className="text-sm font-mono text-gray-300 mb-2">{item.number}</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/85">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
              <span className="text-white/90">Ready to experience the difference?</span>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Scene 5: Magnetic CTA Finale ========== */}
      <section
        ref={ctaRef}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          bgX.set(((e.clientX - rect.left) / rect.width) * 100);
          bgY.set(((e.clientY - rect.top) / rect.height) * 100);
        }}
        className="relative overflow-hidden px-6 py-28"
        aria-label="Call to action"
      >
        <motion.div className="absolute inset-0 -z-10" style={{ background: magnetic }} />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-4xl md:text-6xl font-light leading-[1.05]">
            Ready to transform <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">your vision</span> into reality?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/85">
            Let's discuss how our AI-assisted approach can deliver exceptional results for your next project—faster and more efficiently than ever before.
          </p>

          <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button>Start Your Project</Button>
            <Button variant="ghost">Schedule Consultation</Button>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Events & Entertainment", description: "25+ years of industry expertise and proven results", tone: "text-blue-400" },
              { title: "AI-Powered Development", description: "10x faster project delivery with cutting-edge tools", tone: "text-purple-400" },
              { title: "Custom Solutions", description: "Tailored specifically to your unique business needs", tone: "text-cyan-400" }
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
                <p className="text-sm text-white/85">{c.description}</p>
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
