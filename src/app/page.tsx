"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import GoldMonogram from "@/components/gold-monogram";
import GoldParticleChart from "@/components/gold-particle-chart";
import PlatformLogos from "@/components/platform-logos";

/* ============================================================ */
/* HELPER COMPONENTS                                             */
/* ============================================================ */

/* --- ScrollReveal --- */
function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --- AnimatedCounter --- */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * value;
      setDisplay(Math.round(start * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Number.isInteger(value) ? Math.round(display) : display.toFixed(1)}
      {suffix}
    </span>
  );
}

/* --- ScrollProgressBar --- */
function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setWidth((scrollTop / docHeight) * 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/* --- CursorGlow --- */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

/* --- TiltCard --- */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (!card || !inner || !glare) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 60%)`;
    glare.style.opacity = "1";
  }, []);

  const handleLeave = useCallback(() => {
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (inner) inner.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    if (glare) glare.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={innerRef} className="tilt-card-inner" style={{ transformStyle: "preserve-3d" }}>
        {children}
        <div ref={glareRef} className="tilt-glare" />
      </div>
    </div>
  );
}

/* --- FloatingNotifications --- */
const notifData = [
  { text: "ROAS 4.2x alcanzado", sub: "Campaña Meta Ads", color: "#34D399" },
  { text: "+312 leads generados", sub: "Funnel B2B LinkedIn", color: "#4A90D9" },
  { text: "CPA reducido 47%", sub: "Optimización Google Ads", color: "#8B5CF6" },
  { text: "+$2.4M revenue", sub: "Black Friday Campaign", color: "#FF6B35" },
  { text: "CTR 3.8% superado", sub: "Creativos TikTok Ads", color: "#34D399" },
  { text: "+185% conversiones", sub: "Landing Page Redesign", color: "#4A90D9" },
  { text: "ROAS 5.1x en retail", sub: "Performance Max", color: "#8B5CF6" },
  { text: "CAC -52% este mes", sub: "Estrategia multi-canal", color: "#FF6B35" },
];

function FloatingNotifications() {
  const [notifs, setNotifs] = useState<Array<{ id: number; data: (typeof notifData)[0]; exiting: boolean }>>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let idx = 0;
    const addNotif = () => {
      const data = notifData[idx % notifData.length];
      idx++;
      const id = ++idRef.current;
      setNotifs((prev) => {
        const next = [...prev, { id, data, exiting: false }];
        if (next.length > 3) {
          next[0] = { ...next[0], exiting: true };
          setTimeout(() => {
            setNotifs((p) => p.filter((n) => n.id !== next[0].id));
          }, 300);
        }
        return next.slice(-4);
      });
    };
    addNotif();
    const interval = setInterval(addNotif, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-24 right-6 md:right-10 z-20 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifs.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="floating-notif"
          >
            <span className="notif-dot" style={{ backgroundColor: n.data.color, boxShadow: `0 0 8px ${n.data.color}60` }} />
            <div>
              <div className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>{n.data.text}</div>
              <div className="text-[10px] text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>{n.data.sub}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* --- MiniDashboard --- */
function MiniDashboard() {
  const barData = [0.4, 0.55, 0.35, 0.7, 0.5, 0.85, 0.65];
  const [barHeights, setBarHeights] = useState(barData.map(() => 0));

  useEffect(() => {
    const timeout = setTimeout(() => setBarHeights(barData), 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mini-dashboard w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Campaign Overview</span>
        <span className="text-[10px] text-green-400 font-medium" style={{ fontFamily: "var(--font-inter)" }}>● Live</span>
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-20 mb-4">
        {barHeights.map((h, i) => (
          <div key={i} className="flex-1 flex items-end">
            <div
              className="mini-dash-bar w-full rounded-t"
              style={{
                height: `${h * 100}%`,
                background: `linear-gradient(to top, rgba(74,144,217,0.6), rgba(139,92,246,0.4))`,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] text-gray-500 mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>ROAS</div>
          <div className="text-sm font-bold metric-green" style={{ fontFamily: "var(--font-inter)" }}>4.2x</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>CPA</div>
          <div className="text-sm font-bold metric-blue" style={{ fontFamily: "var(--font-inter)" }}>$12.40</div>
        </div>
      </div>

      {/* Sparkline */}
      <svg viewBox="0 0 200 40" className="w-full h-8" fill="none">
        <defs>
          <linearGradient id="spark-grad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A90D9" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path d="M0,32 L33,24 L66,28 L100,16 L133,20 L166,10 L200,6" stroke="url(#spark-grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M0,32 L33,24 L66,28 L100,16 L133,20 L166,10 L200,6 L200,40 L0,40Z" fill="url(#spark-grad)" opacity="0.1" />
      </svg>
    </div>
  );
}

/* --- WordRevealText --- */
function WordRevealText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${delay + i * 0.06}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

/* ============================================================ */
/* NAVBAR                                                        */
/* ============================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Servicios", href: "#services" },
    { label: "Sobre Mí", href: "#about" },
    { label: "Casos", href: "#cases" },
    { label: "Recursos", href: "#resources" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <GoldMonogram size={40} />
          <span
            className="text-lg font-semibold tracking-wide text-white group-hover:text-[#7DD3FC] transition-colors"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            CJB
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="blue-outline-btn">
            Contacto
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0E18]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="blue-outline-btn w-fit"
              >
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ============================================================ */
/* HERO SECTION — Cleaner, Carolina name prominent               */
/* ============================================================ */
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background chart canvas — more transparent to not hide Carolina */}
      <GoldParticleChart />

      {/* Gradient mesh orbs — positioned lower to not clutter top */}
      <div className="gradient-orb gradient-orb-1" style={{ top: "40%", left: "-5%" }} />
      <div className="gradient-orb gradient-orb-2" style={{ top: "65%", right: "-5%" }} />
      <div className="gradient-orb gradient-orb-3" style={{ bottom: "5%", left: "30%" }} />

      {/* Ghost watermark — PROMINENT, positioned center-left */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-[20vw] md:text-[16vw] font-bold tracking-[0.08em] uppercase select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            background: "linear-gradient(180deg, rgba(74,144,217,0.1) 0%, rgba(139,92,246,0.06) 50%, rgba(16,185,129,0.03) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CJB
        </span>
      </div>

      {/* Floating notifications — lower right */}
      <FloatingNotifications />

      {/* === TOP: Clean hero content — NO MiniDashboard here === */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#4A90D9]/15 bg-[#4A90D9]/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span
            className="text-[10px] font-medium text-[#4A90D9]/80 uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Performance Marketing &amp; Paid Media Strategy
          </span>
        </motion.div>

        {/* Name — large and prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-3"
        >
          <span
            className="text-lg md:text-xl font-medium tracking-[0.15em] uppercase text-[#7DD3FC]/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            CJB by Carolina Betancourt
          </span>
        </motion.div>

        {/* H1 with WordReveal */}
        <h1
          className="text-4xl sm:text-5xl md:text-[3.6rem] lg:text-[4.2rem] font-bold leading-[1.06] mb-6 cream-text max-w-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <WordRevealText
            text="Diseño estrategias que convierten inversión en"
            delay={0.7}
          />
          <span
            className="blue-underline word-reveal"
            style={{
              animationDelay: "1.5s",
              background: "linear-gradient(135deg, #7DD3FC 0%, #4A90D9 40%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {" "}crecimiento real
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7 }}
          className="text-base md:text-lg text-gray-300/70 max-w-xl mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Especialista en Performance Marketing y Paid Media Strategy.
          Transformo presupuestos publicitarios en resultados escalables,
          optimizando cada punto de contacto para maximizar el retorno.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0 }}
        >
          <a href="#contact" className="perf-cta-btn">
            <span>TRABAJEMOS JUNTAS</span>
            <svg className="cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* === BOTTOM: Distributed elements === */}
      <div className="relative z-10 mt-auto pb-8 pt-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Platform strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4 }}
            className="flex items-center justify-between mb-5"
          >
            <span className="hidden sm:block text-[9px] text-[#4A90D9]/25 uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-inter)" }}>
              Plataformas
            </span>
            <div className="flex items-center gap-6 md:gap-10 ml-auto">
              {["Meta", "Google", "TikTok", "YouTube", "LinkedIn"].map((name) => (
                <span key={name} className="text-[10px] md:text-[11px] font-medium text-[#4A7CF7] hover:text-[#4A7CF7]/80 transition-colors duration-300 uppercase tracking-[0.15em] cursor-default" style={{ fontFamily: "var(--font-inter)" }}>
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Marquee ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            className="flex items-center justify-center gap-8 py-3 overflow-hidden"
          >
            {["Meta Ads", "Performance Marketing", "Paid Media Strategy", "ROAS Optimization", "Campaign Scaling", "Data Analytics"].map((txt, idx) => (
              <span key={idx} className="text-[10px] md:text-[11px] font-medium text-[#4A7CF7] uppercase tracking-[0.15em] whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                {txt}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0E18] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}

/* ============================================================ */
/* METHODOLOGY SECTION                                           */
/* ============================================================ */
const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="14" cy="14" r="12" />
        <path d="M14 8v12M10 10l4-2 4 2M10 18l4 2 4-2" />
      </svg>
    ),
    title: "Estrategia Inteligente",
    desc: "Planificación basada en datos y modelos predictivos para maximizar cada dólar invertido.",
    color: "#4A90D9",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 24L10 14L16 17L24 4" />
        <circle cx="10" cy="14" r="2" />
        <circle cx="24" cy="4" r="2" />
      </svg>
    ),
    title: "Datos y Análisis",
    desc: "Atribución multi-touch y dashboards en tiempo real que revelan el valor real de cada punto de contacto.",
    color: "#10B981",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="4" width="20" height="20" rx="3" />
        <path d="M4 10h20M10 4v20" />
        <circle cx="17" cy="17" r="3" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    title: "Paid Media",
    desc: "Gestión experta en Meta, Google, TikTok y LinkedIn con optimización continua 24/7.",
    color: "#8B5CF6",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 24h20M8 24V16M14 24V10M20 24V14" />
        <path d="M8 16l6-6 6 4" strokeDasharray="3 2" />
      </svg>
    ),
    title: "Crecimiento Sostenible",
    desc: "Sistemas de scaling que mantienen eficiencia mientras incrementan volumen de forma predecible.",
    color: "#FF6B35",
  },
];

function MethodologySection() {
  return (
    <section id="methodology" className="relative z-10 py-24 md:py-32 bg-[#F5F6FA]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A7CF7] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Capacidades
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0A0F1E] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Los 4 pilares del{" "}
              <span className="bg-gradient-to-r from-[#4A7CF7] to-[#10B981] bg-clip-text text-transparent">
                crecimiento
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="h-full text-center bg-white rounded-xl border border-[#E8E8E8] p-6 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}
                >
                  {p.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-[#0A0F1E] mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* SERVICES SECTION                                              */
/* ============================================================ */
const services = [
  {
    num: "01",
    title: "Auditoría de Cuenta",
    desc: "Análisis completo de tu Meta Business Suite, píxeles, eventos y configuración para eliminar fugas de datos.",
  },
  {
    num: "02",
    title: "Estrategia de Inversión",
    desc: "Distribución presupuestaria inteligente basada en datos históricos y modelos predictivos por canal.",
  },
  {
    num: "03",
    title: "Creativos que Convierten",
    desc: "Diseño y testing de creativos optimizados para cada etapa del funnel de conversión.",
  },
  {
    num: "04",
    title: "Optimización Continua",
    desc: "A/B testing riguroso, ajuste de bidding y escalamiento manteniendo rentabilidad día a día.",
  },
  {
    num: "05",
    title: "Reportes y Transparencia",
    desc: "Dashboards en tiempo real con atribución multi-touch para que veas el valor real de cada acción.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32 bg-[#4A7CF7]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-white/70 uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sistema Filtro
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mi proceso de{" "}
              <span className="text-white/90">
                5 fases
              </span>
            </h2>
            <p
              className="text-white/70 max-w-xl mx-auto text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cada campaña pasa por un sistema probado que filtra lo que no funciona y escala lo que sí.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 0.1}>
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <span
                  className="text-4xl font-bold text-white/20 block mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {svc.num}
                </span>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm text-white/85 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {svc.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* TESTIMONIAL SECTION                                           */
/* ============================================================ */
function TestimonialSection() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="testimonial-card">
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="18" height="18" viewBox="0 0 18 18" fill="#FF6B35" opacity={0.8}>
                  <path d="M9 1l2.24 4.54 5.01.73-3.63 3.53.86 4.99L9 12.27l-4.48 2.52.86-4.99L1.75 6.27l5.01-.73z" />
                </svg>
              ))}
            </div>

            <blockquote
              className="text-xl md:text-2xl font-medium cream-text leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &ldquo;Carolina no solo gestionó nuestras campañas — transformó nuestra
              estrategia completa de adquisición. Pasamos de un ROAS de 1.8x a 4.5x
              en 4 meses, y el crecimiento ha sido sostenido.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90D9] to-[#8B5CF6] flex items-center justify-center text-sm font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                AR
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                  Andrés Rodríguez
                </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                  CMO, TechScale Latam
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================ */
/* ABOUT SECTION — with MiniDashboard and more visual impact     */
/* ============================================================ */
const aboutStats = [
  { value: 12, suffix: "M+", label: "Ad Spend Gestionado", color: "#4A90D9" },
  { value: 200, suffix: "+", label: "Campañas Ejecutadas", color: "#10B981" },
  { value: 4.2, suffix: "x", label: "ROAS Promedio", color: "#8B5CF6" },
  { value: 47, suffix: "%", label: "Reducción CPA", color: "#FF6B35" },
];

function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32">
      {/* Background orbs for visual depth */}
      <div className="gradient-orb gradient-orb-3" style={{ top: "30%", right: "5%", opacity: 0.15 }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sobre Mí
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Datos,{" "}
              <span className="bg-gradient-to-r from-[#4A90D9] to-[#10B981] bg-clip-text text-transparent">
                estrategia
              </span>
              {" "}y resultados
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text column */}
          <ScrollReveal>
            <div className="space-y-5">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Soy <span className="text-white font-semibold">Carolina Betancourt</span>,
                especialista en Performance Marketing y Paid Media con más de 8 años de
                experiencia transformando presupuestos publicitarios en motores de
                crecimiento.
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Mi enfoque combina análisis avanzado de datos con estrategia creativa.
                Cada campaña que diseño está respaldada por modelos predictivos,
                atribución multi-touch y optimización continua. No creo en campañas
                &ldquo;set and forget&rdquo; — creo en la iteración constante basada en
                datos reales.
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                He gestionado más de $12M en ad spend a través de Meta, Google, TikTok y
                LinkedIn, ayudando a más de 200 marcas a escalar sus resultados de forma
                predecible y sostenible.
              </p>
            </div>
          </ScrollReveal>

          {/* Right column: Stats + MiniDashboard */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <TiltCard>
                    <div className="executive-card text-center py-8">
                      <div
                        className="text-3xl md:text-4xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-inter)", color: stat.color }}
                      >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div
                        className="text-xs text-gray-500 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Mini Dashboard — moved from hero to here for better distribution */}
            <ScrollReveal delay={0.3}>
              <TiltCard>
                <div className="executive-card">
                  <MiniDashboard />
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* CASES SECTION                                                 */
/* ============================================================ */
const cases = [
  {
    title: "E-commerce Fashion",
    industry: "Retail & Moda",
    results: [
      { label: "ROAS", value: "5.1x", color: "metric-green" },
      { label: "Revenue", value: "+$2.4M", color: "metric-blue" },
      { label: "CPA", value: "-52%", color: "metric-violet" },
    ],
    description: "Estrategia multi-canal que escaló revenue de $800K a $3.2M en 8 meses con Meta Ads y Google Performance Max.",
  },
  {
    title: "SaaS B2B",
    industry: "Tecnología",
    results: [
      { label: "Leads", value: "+312", color: "metric-green" },
      { label: "CAC", value: "-38%", color: "metric-blue" },
      { label: "MRR", value: "+185%", color: "metric-violet" },
    ],
    description: "Funnel de adquisición en LinkedIn y Google Ads que generó pipeline calificado de $4.2M en 6 meses.",
  },
  {
    title: "Fintech Latam",
    industry: "Servicios Financieros",
    results: [
      { label: "Users", value: "+45K", color: "metric-green" },
      { label: "CPL", value: "-41%", color: "metric-blue" },
      { label: "ROAS", value: "3.8x", color: "metric-violet" },
    ],
    description: "Campaña de user acquisition en 5 países que redujo costo por registro mientras escalaba volumen 10x.",
  },
];

function CasesSection() {
  return (
    <section id="cases" className="relative z-10 py-24 md:py-32">
      {/* Background visual */}
      <div className="gradient-orb gradient-orb-1" style={{ top: "50%", left: "-8%", opacity: 0.12 }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Casos de Éxito
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Resultados que{" "}
              <span className="bg-gradient-to-r from-[#10B981] to-[#4A90D9] bg-clip-text text-transparent">
                hablan
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <TiltCard>
                <div className="executive-card h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                      {c.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {c.title}
                  </h3>

                  <div className="flex gap-4 mb-5">
                    {c.results.map((r) => (
                      <div key={r.label}>
                        <div className={`text-lg font-bold ${r.color}`} style={{ fontFamily: "var(--font-inter)" }}>
                          {r.value}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {c.description}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* RESOURCES SECTION                                             */
/* ============================================================ */
const resources = [
  {
    tag: "Checklist",
    title: "27 puntos para auditar tu Meta Business",
    desc: "Revisa tu configuración, píxeles, eventos y permisos con este checklist diseñado para encontrar fugas de datos y oportunidades de mejora.",
    btnText: "Descargar",
    btnHref: "#contact",
    color: "#4A7CF7",
  },
  {
    tag: "Calculadora",
    title: "Calculadora de ROAS Real: \u00bfTus campa\u00f1as realmente son rentables?",
    desc: "Descubre si tus campañas de Meta Ads realmente est\u00e1n generando retorno con esta herramienta que va m\u00e1s all\u00e1 del ROAS superficial.",
    btnText: "Usar calculadora",
    btnHref: "#contact",
    color: "#10B981",
  },
  {
    tag: "Gu\u00eda",
    title: "C\u00f3mo estructuro una campa\u00f1a ganadora en Meta desde cero",
    desc: "El paso a paso que uso para crear campañas que convierten, desde la estrategia hasta la optimización diaria.",
    btnText: "Descargar",
    btnHref: "#contact",
    color: "#8B5CF6",
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="relative z-10 py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A7CF7] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Recursos Gratuitos
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0A0F1E] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Herramientas para{" "}
              <span className="bg-gradient-to-r from-[#4A7CF7] to-[#8B5CF6] bg-clip-text text-transparent">
                crecer
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <div className="h-full bg-white rounded-xl border border-[#E8E8E8] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: `${r.color}15`,
                    color: r.color,
                  }}
                >
                  {r.tag}
                </span>
                <h3
                  className="text-lg font-semibold text-[#0A0F1E] mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {r.desc}
                </p>
                <a
                  href={r.btnHref}
                  className="text-sm font-semibold text-[#4A7CF7] hover:text-[#3A6CE5] transition-colors flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {r.btnText}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 2v10M3 8l4 4 4-4" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* SOCIAL PROOF SECTION                                          */
/* ============================================================ */
function SocialProofSection() {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-16" />

        <ScrollReveal>
          <div className="text-center mb-12">
            <span
              className="text-xs font-medium text-gray-500 uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Plataformas con las que trabajo
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <PlatformLogos />
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================ */
/* CONTACT SECTION                                               */
/* ============================================================ */
function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32">
      {/* Extra visual impact */}
      <div className="gradient-orb gradient-orb-1" style={{ top: "20%", left: "10%", opacity: 0.15 }} />
      <div className="gradient-orb gradient-orb-3" style={{ bottom: "20%", right: "10%", opacity: 0.1 }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="gradient-border-card">
            <div className="inner text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,144,217,0.08)_0%,transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                <GoldMonogram size={56} />

                <h2
                  className="text-3xl md:text-5xl font-bold text-white mt-8 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ¿Listo para{" "}
                  <span className="bg-gradient-to-r from-[#4A90D9] to-[#10B981] bg-clip-text text-transparent">
                    escalar
                  </span>
                  ?
                </h2>

                <p
                  className="text-gray-400 max-w-lg mx-auto text-lg mb-10 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Cada día sin optimizar es dinero sobre la mesa. Conversemos sobre
                  cómo escalar tus resultados con datos, no con suposiciones.
                </p>

                <a href="mailto:hola@carolinabetancourt.com" className="perf-cta-btn">
                  Agendar consulta estratégica
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13L13 5M13 5H6M13 5V12" />
                  </svg>
                </a>

                <div
                  className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    Respuesta en 24h
                  </span>
                  <span>Sin compromiso</span>
                  <span>Auditoría gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================ */
/* FOOTER                                                        */
/* ============================================================ */
function Footer() {
  return (
    <footer className="relative z-10 bg-[#0A0F1E] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <GoldMonogram size={28} />
            <div>
              <span
                className="text-sm font-semibold text-white block"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                CJB by Carolina Betancourt
              </span>
              <span
                className="text-[10px] text-white/50 uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Performance Marketing &amp; Paid Media Strategy
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-6 text-xs text-white/50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              T\u00e9rminos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
          <span
            className="text-[10px] text-white/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            \u00a9 2026 CJB by Carolina Betancourt
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/* MAIN PAGE                                                     */
/* ============================================================ */
export default function Home() {
  return (
    <div className="relative bg-[#0B0E18] min-h-screen leather-texture">
      <ScrollProgressBar />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <MethodologySection />
        <ServicesSection />
        <TestimonialSection />
        <AboutSection />
        <CasesSection />
        <ResourcesSection />
        <SocialProofSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
