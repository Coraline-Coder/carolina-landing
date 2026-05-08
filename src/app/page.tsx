"use client";

import { useEffect, useState, useRef, useCallback, Component, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import CalculadoraROAS from "@/components/calculadora-roas";

const GoldParticleChart = dynamic(() => import("@/components/gold-particle-chart"), {
  ssr: false,
  loading: () => null,
});

/* ═══════════════════ ERROR BOUNDARY ═══════════════════ */
interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

/* ═══════════════════ SCROLL REVEAL ═══════════════════ */
function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════ WORD REVEAL ═══════════════════ */
function WordRevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 12, filter: "blur(8px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════ TILT CARD ═══════════════════ */
function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, []);
  return (
    <div className={`tilt-card ${className}`} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)")}>
      <div className="tilt-card-inner" style={{ transform, transition: "transform 0.15s ease-out" }}>{children}<div className="tilt-glare" /></div>
    </div>
  );
}

/* ═══════════════════ LOGO MONOGRAM ═══════════════════ */
function LogoMonogram({ size = 40, id }: { size?: number; id?: string }) {
  const uid = id || `logo-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className="transition-all duration-300 hover:drop-shadow-[0_0_14px_rgba(74,144,217,0.5)]">
      <defs>
        <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7DD3FC" /><stop offset="100%" stopColor="#4A90D9" /></linearGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M 136 48 A 64 64 0 1 0 136 152" stroke="#1E3A5F" strokeWidth="15" strokeLinecap="round" fill="none" opacity="0.3" transform="translate(1.5, 1.5)" />
      <path d="M 136 48 A 64 64 0 1 0 136 152" stroke={`url(#${uid}-grad)`} strokeWidth="13" strokeLinecap="round" fill="none" filter={`url(#${uid}-glow)`} />
      <path d="M 42 158 L 78 118 L 114 136 L 144 68" stroke={`url(#${uid}-grad)`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={`url(#${uid}-glow)`} />
      <polygon points="162,42 136,58 148,80" fill={`url(#${uid}-grad)`} filter={`url(#${uid}-glow)`} />
      <circle cx="42" cy="158" r="5" fill="#4A90D9" /><circle cx="42" cy="158" r="2" fill="#7DD3FC" opacity="0.5" />
      <circle cx="78" cy="118" r="5" fill="#4A90D9" /><circle cx="78" cy="118" r="2" fill="#7DD3FC" opacity="0.5" />
      <circle cx="114" cy="136" r="5" fill="#4A90D9" /><circle cx="114" cy="136" r="2" fill="#7DD3FC" opacity="0.5" />
    </svg>
  );
}

/* ═══════════════════ SCROLL PROGRESS ═══════════════════ */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => { const d = document.documentElement.scrollHeight - window.innerHeight; setProgress(d > 0 ? window.scrollY / d : 0); };
    window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />;
}

/* ═══════════════════ CURSOR GLOW ═══════════════════ */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => { const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h); }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

/* ═══════════════════ NAVBAR ═══════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const navLinks = [
    { href: "#estrategia", label: "Estrategia" },
    { href: "#proceso", label: "Proceso" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#contact", label: "Contacto" },
  ];
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-2.5">
            <LogoMonogram size={36} id="logo-nav" />
            <span className="text-[#e8edf3] text-xl tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Carolina Betancourt</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#e8edf3]/60 hover:text-[#e8edf3] transition-colors duration-300 relative group">
                {l.label}<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4A90D9] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-[#4A90D9] hover:bg-[#3a7bc0] text-white transition-all duration-300">Hablemos</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        <AnimatePresence>{mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden">
            <div className="py-6 flex flex-col gap-5 border-t border-white/[0.06]">
              {navLinks.map((l) => <a key={l.href} href={l.href} className="text-3xl text-[#e8edf3] hover:text-[#4A90D9] transition-colors" style={{ fontFamily: "var(--font-playfair)" }} onClick={() => setMobileOpen(false)}>{l.label}</a>)}
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#4A90D9] text-white mt-2" onClick={() => setMobileOpen(false)}>Hablemos</a>
            </div>
          </motion.div>
        )}</AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════ MARQUEE ═══════════════════ */
function Marquee() {
  const text = "ESTRATEGIA  ◆  META ADS  ◆  CONTENIDO  ◆  CONVERSION  ◆  LANDINGS  ◆  OPTIMIZACION  ◆  ";
  return (
    <div className="relative py-5 overflow-hidden border-y border-white/[0.04] bg-[#070a14]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (<span key={i} className="text-xs tracking-[0.3em] text-[#4A90D9]/30 uppercase mx-4" style={{ fontFamily: "var(--font-inter)" }}>{text}</span>))}
      </div>
    </div>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-[1]"><ErrorBoundary><GoldParticleChart /></ErrorBoundary></div>
      <div className="absolute inset-0 z-[0] bg-gradient-to-br from-[#0B0E18] via-[#111627] to-[#0B0E18]" />
      <div className="gradient-orb gradient-orb-1 absolute" style={{ top: "40%", left: "-5%" }} />
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "65%", right: "-5%" }} />
      <div className="gradient-orb gradient-orb-3 absolute" style={{ bottom: "5%", left: "30%" }} />

      <div className="relative z-10 flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 lg:px-8 pt-36 md:pt-44">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs tracking-[0.25em] text-[#e8edf3]/50 uppercase" style={{ fontFamily: "var(--font-inter)" }}>Performance Marketing &amp; Meta Ads Strategy</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-[#7DD3FC]/50 tracking-[0.2em] uppercase text-sm mb-6" style={{ fontFamily: "var(--font-inter)" }}>Carolina Betancourt</motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 max-w-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
          <WordRevealText text="El problema no es tu presupuesto." />
          <br />
          <span style={{ background: "linear-gradient(135deg, #7DD3FC, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Es tu sistema.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.7 }} className="text-lg md:text-xl text-[#9ca3af]/60 max-w-2xl mb-12" style={{ fontFamily: "var(--font-inter)" }}>
          Estrategia, contenido y landing en un solo sistema. Sin piezas sueltas. Sin &quot;a ver que pasa&quot;.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.0 }} className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="perf-cta-btn inline-flex text-base">
            Quiero que mi presupuesto rinda
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#estrategia" className="inline-flex items-center gap-2 text-[#7DD3FC] hover:text-[#4A90D9] transition-colors py-3 px-1 text-base">
            Conoce el Sistema Filtro
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8H12M12 8L8 4M12 8L8 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </motion.div>

        <div className="mt-auto pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.4 }} className="flex flex-wrap items-center gap-6 md:gap-10 text-sm text-[#e8edf3]/40">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />Respuesta en 24h</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#4A90D9]" />Meta Ads Specialist</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />Sistema Filtro</span>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0E18] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════ STATS BAR ═══════════════════ */
function StatsBar() {
  const stats = [
    { value: "Meta Ads", label: "Especialista certificado" },
    { value: "Sistema Filtro", label: "Metodologia propietaria" },
    { value: "24h", label: "Tiempo de respuesta" },
    { value: "0", label: "Intermediarios" },
  ];
  return (
    <section className="relative border-y border-white/[0.04] bg-[#070a14]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className={`py-8 md:py-10 px-6 text-center ${i < stats.length - 1 ? "border-r border-white/[0.04]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/[0.04]" : ""}`}>
              <p className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", background: "linear-gradient(135deg, #7DD3FC, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
              <p className="text-xs text-[#6b7a8d] uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROBLEMA ═══════════════════ */
function ProblemaSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <ScrollReveal>
              <p className="text-xs tracking-[0.25em] text-[#FF6B35] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>La Realidad</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                El costo de{" "}
                <span style={{ background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>improvisar</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#e8edf3]/60 leading-relaxed mb-10" style={{ fontFamily: "var(--font-inter)" }}>
                Pagar por impresiones que nunca se convierten no es marketing—es donacion. Cada peso en un publico mal definido, un creativo que no conecta, o una landing que no cierra, es un peso que tu competencia ya esta usando mejor.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="pl-6 border-l-4 border-[#FF6B35]/60">
                <p className="text-lg md:text-xl text-[#F5F0EB]/80 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  La mayoria de cuentas que reviso estan perdiendo dinero en los mismos tres puntos: segmentacion inflada, creativos genericos y landings que no convierten.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#FF6B35]/5 to-[#4A90D9]/5 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center min-h-[400px]" style={{ background: "linear-gradient(145deg, #111627, #0d1020)", border: "1px solid rgba(255,107,53,0.1)" }}>
                <p className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-center max-w-md" style={{ fontFamily: "var(--font-playfair)", background: "linear-gradient(135deg, #C9A84C, #F5F0EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  &ldquo;Ads sin sistema es como abrir la llave sin tuberia: el presupuesto corre, pero no llega a ningun lado.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ESTRATEGIA ═══════════════════ */
function EstrategiaSection() {
  const pillars = [
    { num: "01", title: "Leo tu cuenta antes de tocar un solo peso", desc: "Mapeo fugas, oportunidades y el dinero que nadie esta tocando. No necesito semanas—necesito acceso y una conversacion honesta.", label: "Diagnostico", color: "#4A90D9",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
    { num: "02", title: "Construyo el sistema, no el anuncio", desc: "Publicos, mensajes, creativos, secuencia—y la landing que cierra. Un anuncio sin landing que convierta es trafico caro a la nada.", label: "Arquitectura", color: "#10B981",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { num: "03", title: "No delego la ejecucion. Lo que se disena, se opera.", desc: "Estrategia, creativos, lanzamiento, optimizacion—todo lo manejo yo. Si hace falta contenido, lo grabo. Si la landing necesita ajustes, los hago. Cero intermediarios.", label: "Ejecucion", color: "#8B5CF6",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  ];

  return (
    <section id="estrategia" className="relative py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0B0E18 0%, #070a14 50%, #0B0E18 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div>
            <ScrollReveal>
              <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>El Enfoque</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05]" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                No plantillas.{" "}
                <span style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sistema Filtro.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="flex items-end">
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#6b7a8d] max-w-lg" style={{ fontFamily: "var(--font-inter)" }}>
                Todo pasa por una pregunta: ¿esto acerca la conversion o es ruido? Lo que no pasa, no se lanza.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <TiltCard className="h-full">
                <div className="executive-card h-full flex flex-col p-8" style={{ "--card-accent": p.color } as React.CSSProperties}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>
                      {p.icon}
                    </div>
                    <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: `${p.color}20` }}>{p.num}</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider mb-3 px-3 py-1 rounded-full self-start" style={{ backgroundColor: `${p.color}15`, color: p.color }}>{p.label}</span>
                  <h3 className="text-xl font-medium text-[#e8edf3] mb-4" style={{ fontFamily: "var(--font-inter)" }}>{p.title}</h3>
                  <p className="text-sm text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{p.desc}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CAPACIDADES ═══════════════════ */
function CapacidadesSection() {
  const caps = [
    { num: "01", title: "Meta Ads", desc: "No 'poner anuncios'. Disenar el ecosistema completo de adquisicion—desde la subasta hasta la conversion.", color: "#4A90D9",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2 2 4-4"/></svg> },
    { num: "02", title: "Contenido", desc: "Concepto, grabacion y edicion. Creativos que nacen de la estrategia, no del gusto personal ni de lo que esta de moda.", color: "#10B981",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v16.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V7l-4.5-5z"/><path d="M14 2v6h6"/></svg> },
    { num: "03", title: "Landings de conversion", desc: "El trafico sin destino es ruido. Diseno y construyo las paginas donde tu presupuesto deja de ser gasto y se convierte en inversion.", color: "#8B5CF6",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
    { num: "04", title: "Optimizacion", desc: "Si no mejora, se corta. Si mejora, se escala.", color: "#FF6B35",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  ];

  return (
    <section id="capacidades" className="relative py-28 md:py-36">
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "20%", left: "-15%" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>Capacidades</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-20" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            Lo que pongo en{" "}
            <span style={{ background: "linear-gradient(135deg, #4A90D9, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>la mesa</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caps.map((c, i) => (
            <ScrollReveal key={i} delay={0.08 * (i + 1)}>
              <TiltCard className="h-full">
                <div className="executive-card h-full p-8 md:p-10" style={{ "--card-accent": c.color } as React.CSSProperties}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.color}15`, color: c.color, border: `1px solid ${c.color}20` }}>
                      {c.icon}
                    </div>
                    <span className="text-6xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: `${c.color}15` }}>{c.num}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-[#e8edf3] mb-4" style={{ fontFamily: "var(--font-inter)" }}>{c.title}</h3>
                  <p className="text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{c.desc}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROCESO ═══════════════════ */
function ProcesoSection() {
  const steps = [
    { num: "I", title: "Descubrimiento", desc: "Escucho antes de proponer. Si no soy la opcion correcta, te lo digo—y te digo por que.", color: "#4A90D9" },
    { num: "II", title: "Diagnostico", desc: "Cuentas, creativos, funnel, landing. Identifico fugas y prioridades con orden, no con intuicion.", color: "#10B981" },
    { num: "III", title: "Lanzamiento", desc: "Todo pasa por el Filtro: ¿conversion o ruido? Lo que pasa, encendemos.", color: "#8B5CF6" },
    { num: "IV", title: "Optimizacion", desc: "Lo que se mide se mejora. Lo que mejora se escala. Sin conformismos.", color: "#FF6B35" },
  ];

  return (
    <section id="proceso" className="relative py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0B0E18 0%, #070a14 50%, #0B0E18 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>Proceso</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-20" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            De la conversacion al{" "}
            <span style={{ background: "linear-gradient(135deg, #10B981, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>resultado</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <div className="relative group">
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-2xl font-bold transition-all duration-300 group-hover:scale-105" style={{ fontFamily: "var(--font-playfair)", backgroundColor: `${s.color}12`, color: s.color, border: `1px solid ${s.color}25` }}>
                    {s.num}
                  </div>
                  <h3 className="text-xl font-medium text-[#e8edf3] mb-3" style={{ fontFamily: "var(--font-inter)" }}>{s.title}</h3>
                  <p className="text-sm text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ LEAD MAGNET ═══════════════════ */
function ResourcesSection() {
  return (
    <section id="recursos" className="relative py-28 md:py-36 overflow-hidden">
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "20%", right: "-15%" }} />
      <div className="gradient-orb gradient-orb-1 absolute" style={{ bottom: "10%", left: "-10%" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <ScrollReveal>
              <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>Lead Magnet</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl leading-[1.05] mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                Descubre donde se{" "}
                <span style={{ background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>escapa</span>
                {" "}tu presupuesto
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#e8edf3]/60 max-w-xl mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                10 fugas que estoy viendo en cuentas de Meta este mes. Si tu ad spend no rinde, hay un 90% de probabilidad de que al menos 3 estan pasando en la tuya.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="space-y-4 mb-10">
                {["Publicos superpuestos que compiten entre si", "Creativos sin mensaje estrategico", "Landings que no convierten el trafico", "Presupuesto mal distribuido entre campanas", "Sin tracking real de conversiones"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FF6B3520", border: "1px solid #FF6B3540" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="text-sm text-[#e8edf3]/70" style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <a href="#contact" className="perf-cta-btn inline-flex">
                Descargar el checklist gratis
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#4A90D9]/15 via-[#FF6B35]/10 to-[#4A90D9]/15 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #111627, #0B0E18)", border: "1px solid rgba(74,144,217,0.12)" }}>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#FF6B3518", color: "#FF6B35", border: "1px solid #FF6B3525" }}>Gratis</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#4A90D918", color: "#4A90D9", border: "1px solid #4A90D925" }}>PDF</span>
                  </div>
                  <div className="mb-8">
                    <span className="text-7xl md:text-8xl font-bold block mb-2" style={{ fontFamily: "var(--font-playfair)", background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>10</span>
                    <h3 className="text-xl md:text-2xl font-medium text-[#e8edf3] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Fugas de Presupuesto</h3>
                    <p className="text-sm text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>que tu cuenta tiene ahora mismo</p>
                  </div>
                  <div className="space-y-3">
                    {["Fuga #1: Publicos duplicados", "Fuga #2: Sin pixel verificado", "Fuga #3: Presupuesto mal asignado", "Fuga #4: Creativos genericos", "...y 6 mas"].map((line, i) => (
                      <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] flex-shrink-0" />
                        <span className="text-sm text-[#e8edf3]/50" style={{ fontFamily: "var(--font-inter)" }}>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-2 text-xs text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4A90D9" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/><path d="M5 7L6.5 8.5L9 5.5"/></svg>
                      Sin gate. Sin trucos. Directo a tu inbox.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TESTIMONIAL / FILOSOFIA ═══════════════════ */
function FilosofiaSection() {
  return (
    <section className="relative py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0B0E18 0%, #070a14 50%, #0B0E18 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden p-10 md:p-14" style={{ background: "linear-gradient(145deg, #111627, #0d1020)", border: "1px solid rgba(74,144,217,0.1)" }}>
                <div className="absolute top-6 left-8 text-6xl leading-none" style={{ fontFamily: "var(--font-playfair)", color: "#4A90D920" }}>&ldquo;</div>
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                  No trabajo con marcas que quieran &quot;probar a ver que pasa&quot;. Si buscas magia, no soy la opcion.{" "}
                  <span style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Si buscas sistema, hablemos.</span>
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)" }}>
                    <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>C</span>
                  </div>
                  <div>
                    <p className="text-[#e8edf3] font-medium" style={{ fontFamily: "var(--font-inter)" }}>Carolina Betancourt</p>
                    <p className="text-xs text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>Performance Marketing &amp; Meta Ads Strategy</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={0.15}>
              <p className="text-xs tracking-[0.25em] text-[#8B5CF6] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>Filosofia</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h3 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                Sistema, no suerte
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-[#6b7a8d] leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                15 minutos. Sin compromiso. Sin claridad, ningun presupuesto es suficiente. Y mientras tu sigues probando y ajustando a cuenta gotas, alguien mas ya instalo lo que funciona y esta escalando.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#4A90D9] hover:bg-[#3a7bc0] text-white transition-all duration-300">
                  Agendar llamada
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 11L11 5M11 5H7M11 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://wa.me/5223111396364?text=Hola%20Carolina%2C%20vi%20tu%20landing%20y%20quiero%20saber%20mas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300" style={{ backgroundColor: "#25D366", color: "#fff", boxShadow: "0 0 20px rgba(37, 211, 102, 0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CONTACT ═══════════════════ */
function ContactSection() {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="gradient-border-card">
            <div className="gradient-border-card-inner p-10 md:p-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#4A90D9]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="relative text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-10">
                  <LogoMonogram size={64} id="logo-contact" />
                </div>
                <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                  Si tu marca esta lista para dejar de{" "}
                  <span style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>gastar</span>
                  , hablemos.
                </h2>
                <p className="text-[#e8edf3]/60 max-w-lg mx-auto mb-10 text-lg" style={{ fontFamily: "var(--font-inter)" }}>
                  15 minutos. Sin compromiso. Sin claridad, ningun presupuesto es suficiente.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[#4A90D9] hover:bg-[#3a7bc0] text-white transition-all duration-300 hover:scale-[1.02]">
                    Agendar llamada
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 13L13 5M13 5H8M13 5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="https://wa.me/5223111396364?text=Hola%20Carolina%2C%20vi%20tu%20landing%20y%20quiero%20saber%20mas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: "#25D366", color: "#fff", boxShadow: "0 0 24px rgba(37, 211, 102, 0.25)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Escribeme por WhatsApp
                  </a>
                </div>

                <a href="mailto:carolinajuarezbetancourt@gmail.com" className="inline-flex items-center gap-2 text-[#7DD3FC] hover:text-[#4A90D9] transition-colors text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                  carolinajuarezbetancourt@gmail.com
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#070a14]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoMonogram size={28} id="logo-footer" />
              <span className="text-[#e8edf3] text-lg" style={{ fontFamily: "var(--font-playfair)" }}>Carolina Betancourt</span>
            </div>
            <p className="text-xs text-[#6b7a8d] leading-relaxed mb-4" style={{ fontFamily: "var(--font-inter)" }}>
              Performance Marketing &amp; Meta Ads Strategy. Estrategia, contenido y landing en un solo sistema.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: "#25D36615", color: "#25D366" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              </a>
              <a href="mailto:carolinajuarezbetancourt@gmail.com" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: "#4A90D915", color: "#4A90D9" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#6b7a8d] mb-4" style={{ fontFamily: "var(--font-inter)" }}>Navegacion</h4>
            <div className="flex flex-col gap-3">
              <a href="#estrategia" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Estrategia</a>
              <a href="#capacidades" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Capacidades</a>
              <a href="#proceso" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Proceso</a>
              <a href="#calculadora" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Calculadora ROAS</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#6b7a8d] mb-4" style={{ fontFamily: "var(--font-inter)" }}>Recursos</h4>
            <div className="flex flex-col gap-3">
              <a href="#recursos" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Checklist de fugas</a>
              <a href="#calculadora" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Calculadora ROAS</a>
              <a href="#contact" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Contacto</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#6b7a8d] mb-4" style={{ fontFamily: "var(--font-inter)" }}>Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Agendar llamada</a>
              <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>WhatsApp</a>
              <a href="mailto:carolinajuarezbetancourt@gmail.com" className="text-sm text-[#e8edf3]/50 hover:text-[#e8edf3] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>carolinajuarezbetancourt@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>&copy; 2026 Carolina Betancourt. Todos los derechos reservados.</p>
          <p className="text-xs text-[#3a4560]" style={{ fontFamily: "var(--font-inter)" }}>Performance Marketing &amp; Meta Ads Strategy</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */
export default function Home() {
  return (
    <div className="relative bg-[#0B0E18] min-h-screen leather-texture">
      <ErrorBoundary>
        <ScrollProgressBar />
        <CursorGlow />
        <Navbar />
        <main>
          <HeroSection />
          <Marquee />
          <StatsBar />
          <ErrorBoundary><ProblemaSection /></ErrorBoundary>
          <ErrorBoundary><EstrategiaSection /></ErrorBoundary>
          <ErrorBoundary><CapacidadesSection /></ErrorBoundary>
          <ErrorBoundary><ProcesoSection /></ErrorBoundary>
          <ErrorBoundary><ResourcesSection /></ErrorBoundary>
          <ErrorBoundary><CalculadoraROAS /></ErrorBoundary>
          <ErrorBoundary><FilosofiaSection /></ErrorBoundary>
          <ErrorBoundary><ContactSection /></ErrorBoundary>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
