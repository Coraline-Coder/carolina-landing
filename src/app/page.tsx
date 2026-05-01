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
  { text: "Nueva campaña Meta Ads", sub: "Optimización activa", color: "#34D399" },
  { text: "A/B test completado", sub: "Analizando resultados", color: "#4A90D9" },
  { text: "Público optimizado", sub: "Mejor targeting activo", color: "#8B5CF6" },
  { text: "Presupuesto ajustado", sub: "Sistema Filtro aplicado", color: "#FF6B35" },
  { text: "Creativo ganador", sub: "Test de rendimiento", color: "#34D399" },
  { text: "Scaling habilitado", sub: "Campaña estable", color: "#4A90D9" },
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
        <span className="text-xs font-semibold text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Meta Ads Overview</span>
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
          <div className="text-sm font-bold metric-green" style={{ fontFamily: "var(--font-inter)" }}>Activo</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>Status</div>
          <div className="text-sm font-bold metric-blue" style={{ fontFamily: "var(--font-inter)" }}>Optimizando</div>
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
            Carolina Betancourt
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
          CAROLINA
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
            Performance Marketing &amp; Meta Ads Strategy
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
            Carolina Betancourt
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
          Especialista en Meta Ads Strategy.
          Transformo presupuestos publicitarios en resultados escalables en Facebook, Instagram y WhatsApp,
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
              {["Meta Ads", "Facebook Ads", "Instagram Ads", "WhatsApp Ads"].map((name) => (
                <span key={name} className="text-[10px] md:text-[11px] font-medium text-[#4A90D9]/30 hover:text-[#4A90D9]/60 transition-colors duration-300 uppercase tracking-[0.15em] cursor-default" style={{ fontFamily: "var(--font-inter)" }}>
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Info strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            className="info-strip flex items-center justify-center gap-6 py-2.5 px-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] md:text-[10px] font-medium text-[#4A90D9]/50 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)" }}>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9]/50" />
              <span className="text-[9px] md:text-[10px] font-medium text-[#4A90D9]/50 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)" }}>Especialista Meta Ads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50" />
              <span className="text-[9px] md:text-[10px] font-medium text-[#4A90D9]/50 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)" }}>Auditoría gratuita</span>
            </div>
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
    desc: "Planificación basada en datos para maximizar cada peso invertido en Meta Ads.",
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
    desc: "Análisis de métricas en tiempo real que revelan qué funciona y qué ajustar en tus campañas.",
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
    title: "Meta Ads",
    desc: "Gestión experta en Facebook, Instagram y WhatsApp Ads con optimización continua.",
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
    desc: "Sistemas de scaling que mantienen eficiencia mientras incrementas volumen de forma predecible.",
    color: "#FF6B35",
  },
];

function MethodologySection() {
  return (
    <section id="methodology" className="relative z-10 py-24 md:py-32">
      {/* Background orb for visual richness */}
      <div className="gradient-orb gradient-orb-2" style={{ top: "20%", right: "-15%", opacity: 0.2 }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Mi Metodología
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Los 4 pilares del{" "}
              <span className="bg-gradient-to-r from-[#4A90D9] to-[#10B981] bg-clip-text text-transparent">
                crecimiento
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="executive-card h-full text-center">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5"
                  style={{ backgroundColor: `${p.color}12`, color: p.color }}
                >
                  {p.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-white mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm text-gray-400 leading-relaxed"
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
    title: "Meta Ads Strategy",
    items: ["Arquitectura de inversión en Facebook e Instagram", "Distribución presupuestaria por tipo de campaña", "Selección de públicos basada en datos", "Modelos de bidding optimizados"],
    metric: "→",
    metricLabel: "Estrategia",
    metricClass: "metric-green",
  },
  {
    num: "02",
    title: "Optimización de Campañas",
    items: ["Optimización continua 24/7", "A/B testing de creativos y públicos", "Reducción de costo por resultado", "Bidding strategies avanzadas para Meta"],
    metric: "→",
    metricLabel: "Optimización",
    metricClass: "metric-blue",
  },
  {
    num: "03",
    title: "Sistema Filtro",
    items: ["Filtro de público: targeting que convierte", "Filtro de creativo: mensajes que resonan", "Filtro de presupuesto: inversión inteligente", "Iteración constante basada en datos"],
    metric: "→",
    metricLabel: "Metodología",
    metricClass: "metric-violet",
  },
  {
    num: "04",
    title: "Scaling Sostenible",
    items: ["Sistemas de scaling que mantienen eficiencia", "Playbooks de campañas ganadoras", "Expansion a nuevos públicos y formatos", "Crecimiento predecible y medible"],
    metric: "→",
    metricLabel: "Crecimiento",
    metricClass: "metric-orange",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32">
      {/* Background visual element */}
      <div className="gradient-orb gradient-orb-1" style={{ top: "10%", left: "-10%", opacity: 0.15 }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Servicios
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ejecución de{" "}
              <span className="bg-gradient-to-r from-[#4A90D9] to-[#8B5CF6] bg-clip-text text-transparent">
                Alto Rendimiento
              </span>
            </h2>
            <p
              className="text-gray-400 max-w-xl mx-auto text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Un ecosistema completo de servicios que convierte datos en decisiones y
              decisiones en crecimiento.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 0.1}>
              <TiltCard>
                <div className="executive-card h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-2xl font-bold text-white/10"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {svc.num}
                    </span>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${svc.metricClass}`} style={{ fontFamily: "var(--font-inter)" }}>
                        {svc.metric}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                        {svc.metricLabel}
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-semibold text-white mb-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {svc.title}
                  </h3>

                  <ul className="space-y-2">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#4A90D9] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
/* TESTIMONIAL SECTION                                           */
/* ============================================================ */
function TestimonialSection() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-8">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Lo que guía mi trabajo
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Honestidad sobre <span className="bg-gradient-to-r from-[#4A90D9] to-[#10B981] bg-clip-text text-transparent">promesas vacías</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="testimonial-card">
            <blockquote
              className="text-xl md:text-2xl font-medium cream-text leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &ldquo;No prometo resultados mágicos porque las campañas ganadoras se construyen
              con datos, iteración y estrategia. Lo que sí prometo: transparencia total,
              optimización diaria y un compromiso real con tu crecimiento.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90D9] to-[#8B5CF6] flex items-center justify-center text-sm font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                CB
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                  Carolina Betancourt
                </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                  Especialista Meta Ads
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
  { value: 100, suffix: "%", label: "Enfoque en Meta Ads", color: "#4A90D9" },
  { value: 24, suffix: "/7", label: "Optimización Activa", color: "#10B981" },
  { value: 3, suffix: " pasos", label: "Sistema Filtro", color: "#8B5CF6" },
  { value: 1, suffix: "-a-1", label: "Atención Personalizada", color: "#FF6B35" },
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
                especialista en Meta Ads con enfoque en
                Performance Marketing para Facebook, Instagram y WhatsApp.
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Mi metodología <span className="text-white font-medium">Sistema Filtro</span> selecciona
                y optimiza cada elemento de tus campañas: desde el público hasta el creativo,
                pasando por el presupuesto y la estrategia de bidding. No creo en campañas
                &ldquo;set and forget&rdquo; — creo en la iteración constante basada en
                datos reales.
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Trabajo de forma personalizada con cada cliente, porque cada negocio tiene
                un punto de optimización diferente. Mi objetivo es que cada peso invertido
                en Meta Ads genere el máximo retorno posible.
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
/* PROCESO / SISTEMA FILTRO SECTION                              */
/* ============================================================ */
const filtroSteps = [
  {
    step: "01",
    title: "Filtro de Público",
    desc: "Identifico y segmento los audiences que realmente convierten para tu negocio. No se trata de llegar a más, sino de llegar a los correctos.",
    color: "#4A90D9",
  },
  {
    step: "02",
    title: "Filtro de Creativo",
    desc: "Diseño y testeo mensajes y visuales que conectan con tu audiencia. Cada creativo se optimiza basándose en datos reales de rendimiento.",
    color: "#10B981",
  },
  {
    step: "03",
    title: "Filtro de Presupuesto",
    desc: "Distribuyo la inversión de forma inteligente, escalando lo que funciona y eliminando lo que no. Cada peso trabaja al máximo.",
    color: "#8B5CF6",
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
              Mi Proceso
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              El{" "}
              <span className="bg-gradient-to-r from-[#4A90D9] to-[#8B5CF6] bg-clip-text text-transparent">
                Sistema Filtro
              </span>
            </h2>
            <p
              className="text-gray-400 max-w-xl mx-auto text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Tres filtros que transforman cada campaña en una máquina de resultados.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtroSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.15}>
              <TiltCard>
                <div className="executive-card h-full">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-2xl font-bold"
                    style={{ backgroundColor: `${step.color}15`, color: step.color, fontFamily: "var(--font-inter)" }}
                  >
                    {step.step}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {step.desc}
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
    tag: "Guía",
    title: "Cómo optimizar tus Meta Ads desde el día 1",
    desc: "Los errores más comunes en campañas de Facebook e Instagram y cómo evitarlos para mejorar tus resultados.",
    color: "#4A90D9",
  },
  {
    tag: "Checklist",
    title: "Checklist de Auditoría para Meta Ads",
    desc: "Lista de verificación para revisar cada aspecto de tus campañas y encontrar oportunidades de mejora inmediata.",
    color: "#10B981",
  },
  {
    tag: "Template",
    title: "Estructura de campaña del Sistema Filtro",
    desc: "Plantilla con la estructura que uso para organizar campañas, conjuntos de anuncios y públicos en Meta Ads.",
    color: "#8B5CF6",
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="relative z-10 py-24 md:py-32">
      {/* Background visual */}
      <div className="gradient-orb gradient-orb-2" style={{ top: "30%", right: "-12%", opacity: 0.12 }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider mb-24" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs font-medium text-[#4A90D9] uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Recursos Gratuitos
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Herramientas para{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#FF6B35] bg-clip-text text-transparent">
                crecer
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <TiltCard>
                <div className="executive-card h-full">
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
                    className="text-lg font-semibold text-white mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-sm text-gray-400 leading-relaxed mb-5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {r.desc}
                  </p>
                  <a
                    href="#contact"
                    className="text-sm font-medium text-[#4A90D9] hover:text-[#7DD3FC] transition-colors flex items-center gap-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Descargar
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 2v10M3 8l4 4 4-4" />
                    </svg>
                  </a>
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

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="perf-cta-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                  <a href="mailto:carolinajuarezbetancourt@gmail.com" className="blue-outline-btn" style={{padding: "16px 36px", fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase"}}>
                    Email
                  </a>
                </div>

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
    <footer className="relative z-10 border-t border-white/[0.06] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <GoldMonogram size={28} />
            <span
              className="text-sm text-gray-500"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &copy; {new Date().getFullYear()} Carolina Betancourt. Todos los
              derechos reservados.
            </span>
          </div>

          <div
            className="flex items-center gap-6 text-xs text-gray-600"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
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
