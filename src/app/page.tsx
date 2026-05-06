"use client";

import { useEffect, useState, useRef, useCallback, Component, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const GoldParticleChart = dynamic(() => import("@/components/gold-particle-chart"), {
  ssr: false,
  loading: () => null,
});

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WordRevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <div className={`tilt-card ${className}`} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="tilt-card-inner" style={{ transform, transition: "transform 0.15s ease-out" }}>
        {children}
        <div className="tilt-glare" />
      </div>
    </div>
  );
}

function LogoMonogram({ size = 40, id }: { size?: number; id?: string }) {
  const uniqueId = id || `logo-${size}`;
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      className="transition-all duration-300 hover:drop-shadow-[0_0_14px_rgba(74,144,217,0.5)]"
    >
      <defs>
        <linearGradient id={`${uniqueId}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#4A90D9" />
        </linearGradient>
        <filter id={`${uniqueId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <path
        d="M 136 48 A 64 64 0 1 0 136 152"
        stroke="#1E3A5F"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        transform="translate(1.5, 1.5)"
      />
      
      <path
        d="M 136 48 A 64 64 0 1 0 136 152"
        stroke={`url(#${uniqueId}-grad)`}
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
        filter={`url(#${uniqueId}-glow)`}
      />
      
      <path
        d="M 42 158 L 78 118 L 114 136 L 144 68"
        stroke={`url(#${uniqueId}-grad)`}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter={`url(#${uniqueId}-glow)`}
      />
      
      <polygon 
        points="162,42 136,58 148,80" 
        fill={`url(#${uniqueId}-grad)`}
        filter={`url(#${uniqueId}-glow)`}
      />
      
      <circle cx="42" cy="158" r="5" fill="#4A90D9" />
      <circle cx="42" cy="158" r="2" fill="#7DD3FC" opacity="0.5" />
      
      <circle cx="78" cy="118" r="5" fill="#4A90D9" />
      <circle cx="78" cy="118" r="2" fill="#7DD3FC" opacity="0.5" />
      
      <circle cx="114" cy="136" r="5" fill="#4A90D9" />
      <circle cx="114" cy="136" r="2" fill="#7DD3FC" opacity="0.5" />
    </svg>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />;
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="cursor-glow" style={{ left: position.x, top: position.y }} />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#estrategia", label: "Estrategia" },
    { href: "#proceso", label: "Proceso" },
    { href: "#recursos", label: "Recursos" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-3">
            <LogoMonogram size={40} id="logo-navbar" />
            <span className="text-[#e8edf3] text-lg hidden sm:block" style={{ fontFamily: "var(--font-playfair)" }}>
              Carolina Betancourt
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-sm">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="blue-outline-btn">
              Hablemos
            </a>
          </div>

          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-[#e8edf3] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-4 border-t border-white/[0.06]">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#e8edf3]/70 hover:text-[#e8edf3] transition-colors py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#contact" className="blue-outline-btn text-center" onClick={() => setMobileOpen(false)}>
                  Hablemos
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function Marquee() {
  const text = "ESTRATEGIA  ◆  META ADS  ◆  CONTENIDO  ◆  CONVERSION  ◆  LANDINGS  ◆  OPTIMIZACION  ◆  ";
  
  return (
    <div className="relative py-6 overflow-hidden border-y border-white/[0.06] bg-[#0B0E18]/50">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-sm tracking-[0.3em] text-[#4A90D9]/40 uppercase mx-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <ErrorBoundary>
          <GoldParticleChart />
        </ErrorBoundary>
      </div>

      <div className="absolute inset-0 z-[0] bg-gradient-to-br from-[#0B0E18] via-[#111627] to-[#0B0E18]" />

      <div className="gradient-orb gradient-orb-1 absolute" style={{ top: "40%", left: "-5%" }} />
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "65%", right: "-5%" }} />
      <div className="gradient-orb gradient-orb-3 absolute" style={{ bottom: "5%", left: "30%" }} />

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs tracking-[0.25em] text-[#e8edf3]/60 uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Performance Marketing & Meta Ads Strategy
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#7DD3FC]/60 tracking-[0.15em] uppercase text-sm mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Carolina Betancourt
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-4xl sm:text-5xl md:text-[3.6rem] lg:text-[4.2rem] leading-[1.1] mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}
        >
          <WordRevealText text="El problema no es tu presupuesto." />{" "}
          <span className="blue-underline" style={{ background: "linear-gradient(135deg, #7DD3FC, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Es tu sistema.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="text-lg text-[#9ca3af]/70 max-w-2xl mb-10"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Estrategia, contenido y landing en un solo sistema. Sin piezas sueltas. Sin &quot;a ver que pasa&quot;.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#contact" className="perf-cta-btn inline-flex">
            Quiero que mi presupuesto rinda
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#estrategia" className="inline-flex items-center gap-2 text-[#7DD3FC] hover:text-[#4A90D9] transition-colors py-3 px-1">
            Conoce el Sistema Filtro
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 8H12M12 8L8 4M12 8L8 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <div className="mt-auto pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="info-strip flex flex-wrap items-center gap-4 md:gap-6 text-sm text-[#e8edf3]/60"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Respuesta en 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A90D9]" />
              Meta Ads Specialist
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              Sistema Filtro
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0E18] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}

function ProblemaSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-divider mb-16" />

        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            La Realidad
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-16" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            El costo de{" "}
            <span style={{ background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              improvisar
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-16">
            <p className="text-lg md:text-xl text-[#e8edf3]/80 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Pagar por impresiones que nunca se convierten no es marketing—es donacion. Cada peso en un publico mal definido, un creativo que no conecta, o una landing que no cierra, es un peso que tu competencia ya esta usando mejor. Y mientras tu sigues probando y ajustando a cuenta gotas, alguien mas ya instalo lo que funciona y esta escalando.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mb-16 pl-6 border-l-4 border-[#FF6B35]/60">
            <p className="text-lg md:text-xl text-[#F5F0EB] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              La mayoria de cuentas que reviso estan perdiendo dinero en los mismos tres puntos: segmentacion inflada, creativos genericos y landings que no convierten.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="py-12 text-center">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed"
              style={{ 
                fontFamily: "var(--font-playfair)", 
                background: "linear-gradient(135deg, #C9A84C, #F5F0EB)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
              }}
            >
              &ldquo;Ads sin sistema es como abrir la llave sin tuberia: el presupuesto corre, pero no llega a ningun lado.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function EstrategiaSection() {
  const pillars = [
    { 
      title: "Leo tu cuenta antes de tocar un solo peso", 
      desc: "Mapeo fugas, oportunidades y el dinero que nadie esta tocando. No necesito semanas—necesito acceso y una conversacion honesta.", 
      label: "Diagnostico",
      color: "#4A90D9" 
    },
    { 
      title: "Construyo el sistema, no el anuncio", 
      desc: "Publicos, mensajes, creativos, secuencia—y la landing que cierra. Un anuncio sin landing que convierta es trafico caro a la nada.", 
      label: "Arquitectura",
      color: "#10B981" 
    },
    { 
      title: "No delego la ejecucion. Lo que se disena, se opera.", 
      desc: "Estrategia, creativos, lanzamiento, optimizacion—todo lo manejo yo. Si hace falta contenido, lo grabo. Si la landing necesita ajustes, los hago. Cero intermediarios.", 
      label: "Ejecucion",
      color: "#8B5CF6" 
    },
  ];

  return (
    <section id="estrategia" className="relative py-24 md:py-32">
      <div className="gradient-orb gradient-orb-1 absolute" style={{ top: "20%", right: "-10%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-divider mb-16" />

        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            El Enfoque
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            No plantillas.{" "}
            <span style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sistema Filtro.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[#6b7a8d] max-w-3xl mb-16" style={{ fontFamily: "var(--font-inter)" }}>
            Todo pasa por una pregunta: ¿esto acerca la conversion o es ruido? Lo que no pasa, no se lanza.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <TiltCard className="h-full">
                <div className="executive-card h-full flex flex-col" style={{ "--card-accent": pillar.color } as React.CSSProperties}>
                  <span 
                    className="text-xs uppercase tracking-wider mb-4 px-3 py-1 rounded-full self-start"
                    style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                  >
                    {pillar.label}
                  </span>
                  <h3 className="text-xl font-medium text-[#e8edf3] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {pillar.desc}
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

function CapacidadesSection() {
  const capabilities = [
    {
      num: "01",
      title: "Meta Ads",
      desc: "No 'poner anuncios'. Disenar el ecosistema completo de adquisicion—desde la subasta hasta la conversion.",
      color: "#4A90D9",
    },
    {
      num: "02",
      title: "Contenido",
      desc: "Concepto, grabacion y edicion. Creativos que nacen de la estrategia, no del gusto personal ni de lo que esta de moda.",
      color: "#10B981",
    },
    {
      num: "03",
      title: "Landings de conversion",
      desc: "El trafico sin destino es ruido. Diseno y construyo las paginas donde tu presupuesto deja de ser gasto y se convierte en inversion.",
      color: "#8B5CF6",
    },
    {
      num: "04",
      title: "Optimizacion",
      desc: "Si no mejora, se corta. Si mejora, se escala.",
      color: "#FF6B35",
    },
  ];

  return (
    <section id="capacidades" className="relative py-24 md:py-32">
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "30%", left: "-10%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-divider mb-16" />

        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Capacidades
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-12" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            Lo que pongo en{" "}
            <span style={{ background: "linear-gradient(135deg, #4A90D9, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              la mesa
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <TiltCard>
                <div className="executive-card h-full" style={{ "--card-accent": cap.color } as React.CSSProperties}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-6xl font-bold text-white/10" style={{ fontFamily: "var(--font-playfair)" }}>
                      {cap.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-[#e8edf3] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {cap.title}
                  </h3>
                  <p className="text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {cap.desc}
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

function ProcesoSection() {
  const steps = [
    { num: "01", title: "Descubrimiento", desc: "Escucho antes de proponer. Si no soy la opcion correcta, te lo digo—y te digo por que.", color: "#4A90D9" },
    { num: "02", title: "Diagnostico", desc: "Cuentas, creativos, funnel, landing. Identifico fugas y prioridades con orden, no con intuicion.", color: "#10B981" },
    { num: "03", title: "Lanzamiento", desc: "Todo pasa por el Filtro: ¿conversion o ruido? Lo que pasa, encendemos.", color: "#8B5CF6" },
    { num: "04", title: "Optimizacion", desc: "Lo que se mide se mejora. Lo que mejora se escala. Sin conformismos.", color: "#FF6B35" },
  ];

  return (
    <section id="proceso" className="relative py-24 md:py-32">
      <div className="gradient-orb gradient-orb-3 absolute" style={{ top: "40%", right: "-15%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-divider mb-16" />

        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Proceso
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-12" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
            De la conversacion al{" "}
            <span style={{ background: "linear-gradient(135deg, #10B981, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              resultado
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-white/10 to-transparent z-0" />
                )}
                <TiltCard className="h-full relative z-10">
                  <div className="executive-card h-full" style={{ "--card-accent": step.color } as React.CSSProperties}>
                    <span 
                      className="text-4xl font-bold mb-4 block"
                      style={{ color: step.color, fontFamily: "var(--font-playfair)" }}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-lg font-medium text-[#e8edf3] mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#6b7a8d] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                      {step.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section id="recursos" className="relative py-24 md:py-32 overflow-hidden">
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "20%", right: "-15%" }} />
      <div className="gradient-orb gradient-orb-1 absolute" style={{ bottom: "10%", left: "-10%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-divider mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal>
              <p className="text-xs tracking-[0.25em] text-[#4A90D9] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                Lead Magnet
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                Descubre donde se{" "}
                <span style={{ background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  escapa
                </span>
                {" "}tu presupuesto
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#e8edf3]/70 max-w-xl mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                10 fugas que estoy viendo en cuentas de Meta este mes. Si tu ad spend no rinde, hay un 90% de probabilidad de que al menos 3 estan pasando en la tuya.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-4 mb-10">
                {[
                  "Publicos superpuestos que compiten entre si",
                  "Creativos sin mensaje estrategico",
                  "Landings que no convierten el trafico",
                  "Presupuesto mal distribuido entre campanas",
                  "Sin tracking real de conversiones",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FF6B3520", border: "1px solid #FF6B3540" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="text-sm text-[#e8edf3]/80" style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <a
                href="#contact"
                className="perf-cta-btn inline-flex"
              >
                Descargar el checklist gratis
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#4A90D9]/20 via-[#FF6B35]/10 to-[#4A90D9]/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #111627, #0B0E18)", border: "1px solid rgba(74,144,217,0.15)" }}>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#FF6B3520", color: "#FF6B35", border: "1px solid #FF6B3530" }}>Gratis</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#4A90D920", color: "#4A90D9", border: "1px solid #4A90D930" }}>PDF</span>
                  </div>

                  <div className="mb-8">
                    <span className="text-7xl md:text-8xl font-bold block mb-2" style={{ fontFamily: "var(--font-playfair)", background: "linear-gradient(135deg, #FF6B35, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      10
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium text-[#e8edf3] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                      Fugas de Presupuesto
                    </h3>
                    <p className="text-sm text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>
                      que tu cuenta tiene ahora mismo
                    </p>
                  </div>

                  <div className="space-y-3">
                    {["Fuga #1: Publicos duplicados", "Fuga #2: Sin pixel verificado", "Fuga #3: Presupuesto mal asignado", "Fuga #4: Creativos genericos", "...y 6 mas"].map((line, i) => (
                      <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] flex-shrink-0" />
                        <span className="text-sm text-[#e8edf3]/60" style={{ fontFamily: "var(--font-inter)" }}>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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

function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="gradient-border-card">
            <div className="gradient-border-card-inner p-8 md:p-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-[#4A90D9]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative text-center">
                <div className="flex justify-center mb-8">
                  <LogoMonogram size={56} id="logo-contact" />
                </div>

                <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#F5F0EB" }}>
                  Si tu marca esta lista para dejar de{" "}
                  <span style={{ background: "linear-gradient(135deg, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    gastar
                  </span>
                  , hablemos.
                </h2>

                <p className="text-[#e8edf3]/80 max-w-lg mx-auto mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                  15 minutos. Sin compromiso. Sin claridad, ningun presupuesto es suficiente.
                </p>

                <p className="text-sm text-[#6b7a8d] italic max-w-md mx-auto mb-10" style={{ fontFamily: "var(--font-inter)" }}>
                  No trabajo con marcas que quieran &quot;probar a ver que pasa&quot;. Si buscas magia, no soy la opcion. Si buscas sistema, hablemos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href="https://calendly.com/carolina-mkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="perf-cta-btn inline-flex"
                  >
                    Agendar llamada
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/5223111396364?text=Hola%20Carolina%2C%20vi%20tu%20landing%20y%20quiero%20saber%20mas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(37, 211, 102, 0.3)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Escribeme por WhatsApp
                  </a>
                </div>

                <a
                  href="mailto:carolinajuarezbetancourt@gmail.com"
                  className="inline-flex items-center gap-2 text-[#7DD3FC] hover:text-[#4A90D9] transition-colors text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-10 7L2 7"/>
                  </svg>
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

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <LogoMonogram size={28} id="logo-footer" />
              <span className="text-[#e8edf3]" style={{ fontFamily: "var(--font-playfair)" }}>
                Carolina Betancourt
              </span>
            </div>
            <span className="text-xs text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>
              Performance Marketing & Meta Ads Strategy
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#estrategia" className="text-sm text-[#6b7a8d] hover:text-[#e8edf3] transition-colors">
              Estrategia
            </a>
            <a href="#proceso" className="text-sm text-[#6b7a8d] hover:text-[#e8edf3] transition-colors">
              Proceso
            </a>
            <a href="#recursos" className="text-sm text-[#6b7a8d] hover:text-[#e8edf3] transition-colors">
              Recursos
            </a>
            <a href="#contact" className="text-sm text-[#6b7a8d] hover:text-[#e8edf3] transition-colors">
              Contacto
            </a>
          </div>

          <div className="text-sm text-[#6b7a8d]" style={{ fontFamily: "var(--font-inter)" }}>
            © 2026 Carolina Betancourt
          </div>
        </div>
      </div>
    </footer>
  );
}

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
          <ErrorBoundary><ProblemaSection /></ErrorBoundary>
          <ErrorBoundary><EstrategiaSection /></ErrorBoundary>
          <ErrorBoundary><CapacidadesSection /></ErrorBoundary>
          <ErrorBoundary><ProcesoSection /></ErrorBoundary>
          <ErrorBoundary><ResourcesSection /></ErrorBoundary>
          <ErrorBoundary><ContactSection /></ErrorBoundary>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
