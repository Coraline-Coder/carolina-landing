"use client"
import CasoDeExitoSection from "@/components/caso-exito";
import HerramientasGratisSection from "@/components/herramientas-gratis";

import { useState, useEffect, useRef, ComponentType, useCallback } from "react";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";


/* ─── dynamic import (no SSR) ─── */
function dynamicNoSSR(loader: () => Promise<{ default: ComponentType }>) {
  let Comp: ComponentType | null = null;
  return function Dyn(props: Record<string, unknown>) {
    const [C, setC] = useState<ComponentType | null>(null);
    useEffect(() => {
      loader().then((m) => { Comp = m.default; setC(() => m.default); });
    }, []);
    return C ? <C {...props} /> : null;
  };
}

const GoldParticleChart = dynamicNoSSR(
  () => import("@/components/gold-particle-chart")
);

/* ─── colours ─── */
const NAVY = "#0A2342";
const BLUE = "#2E5F8A";
const WHITE = "#FFFFFF";
const LGRAY = "#F5F6FA";
const NAVY2 = "#0D1B2A";
const LW = "data:image/png;base64,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";

/* ─── tiny helpers ─── */
function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WordRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          style={{ display: "inline-block" }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}


/* --- WHATSAPP FAB --- */
function WhatsAppFAB() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <a
      href="https://wa.me/522311396364"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
        textDecoration: "none",
        animation: "wa-pulse 3s ease-in-out infinite",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <style>{String.raw`
        @keyframes wa-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(37,211,102,0.4); }
          50% { transform: scale(1.08); box-shadow: 0 6px 24px rgba(37,211,102,0.55); }
        }
        @media (max-width: 640px) {
          a[aria-label="WhatsApp"] { bottom: 20px !important; right: 16px !important; }
        }
      `}</style>
    </a>
  );
}


/* --- DASHBOARD PREVIEW (Meta Ads mockup) --- */
function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const metrics = [
    { label: "ROAS", value: "3.2x", color: "#22C55E", sub: "Retorno sobre inversi\u00f3n" },
    { label: "CPA", value: "$5.05", color: BLUE, sub: "Costo por conversi\u00f3n" },
    { label: "CTR", value: "2.10%", color: BLUE, sub: "Click-through rate" },
    { label: "Conversiones", value: "8,400+", color: BLUE, sub: "WhatsApp + Leads" },
  ];
  return (
    <div ref={ref} style={{ maxWidth: 960, margin: "4rem auto 0", padding: "0 2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={vis ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(46,95,138,0.25)",
          background: "linear-gradient(145deg, #0D1B2A 0%, #0a0f1e 100%)",
          boxShadow: "0 0 80px rgba(46,95,138,0.1), 0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "60%", background: "radial-gradient(ellipse at center, rgba(46,95,138,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginLeft: 12 }}><img src={LW} alt="" style={{ height: 14, width: "auto", opacity: 0.5, display: "inline", verticalAlign: "middle", marginRight: 4 }} />Meta Ads Manager \u2014 Campaign Dashboard</span>
        </div>
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "0.95rem", color: WHITE, margin: 0 }}>Campa\u00f1a: Conversiones WhatsApp</p>
              <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", margin: "4px 0 0" }}>Retail de Muebles \u00b7 15 meses de gesti\u00f3n</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}>Ultimos 30 dias</span>
              <span style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "0.7rem", color: WHITE, padding: "4px 10px", background: BLUE, borderRadius: 4 }}>Activo</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(46,95,138,0.12)", borderRadius: 14, padding: "1rem 1.25rem" }}>
                <p style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: 0 }}>{m.label}</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.8rem", color: m.color, margin: "4px 0", lineHeight: 1.1 }}>{m.value}</p>
                <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>{m.sub}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.25rem" }}>
            <p style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", margin: "0 0 1rem" }}>Tendencia de Conversiones (ultimos 12 meses)</p>
            <svg viewBox="0 0 800 180" style={{ width: "100%", height: "auto" }}>
              <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2E5F8A" stopOpacity="0.3" /><stop offset="100%" stopColor="#2E5F8A" stopOpacity="0" /></linearGradient></defs>
              {[0,1,2,3,4].map(i => (<line key={i} x1="0" y1={i*40+10} x2="800" y2={i*40+10} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />))}
              <path d="M0,170 L0,140 C70,135 140,128 210,120 C280,112 350,100 420,85 C490,70 560,58 630,42 C700,26 770,18 800,14 L800,170 Z" fill="url(#chartGrad)" />
              <path d="M0,140 C70,135 140,128 210,120 C280,112 350,100 420,85 C490,70 560,58 630,42 C700,26 770,18 800,14" fill="none" stroke="#2E5F8A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="800" cy="14" r="5" fill="#2E5F8A" />
              <circle cx="800" cy="14" r="9" fill="#2E5F8A" opacity="0.25"><animate attributeName="r" values="9;14;9" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" /></circle>
              {["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"].map((m,i) => (<text key={i} x={i*66+30} y="178" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-jost)" fontSize="10" textAnchor="middle">{m}</text>))}
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = [
    "Meta Ads",
    "Performance Marketing",
    "ROAS Real",
    "Estrategia de Inversión",
    "Escalamiento",
    "Optimización Continua",
    "Paid Media Strategy",
    "Meta Ads",
    "Performance Marketing",
    "ROAS Real",
  ];
  return (
    <div
      style={{ background: NAVY, overflow: "hidden", borderTop: "1px solid rgba(46,95,138,0.15)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap", padding: "14px 0" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            style={{
              color: BLUE,
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              margin: "0 2.5rem",
              opacity: 0.9,
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SECCIONES
   ════════════════════════════════════════════ */

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Método P.U.L.S.O.", href: "#sistema-filtro" },
    { label: "Capacidades", href: "#capacidades" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "rgba(10,35,66,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(46,95,138,0.1)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo CJB */}
        <a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <img src={LW} alt="CJB Logo" style={{ height: 36, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.2rem", color: WHITE, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>CJB</span>
        </a>

        {/* Desktop links — WHITE on dark hero */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-jost)",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#calculadora"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "0.85rem",
              color: WHITE,
              background: BLUE,
              padding: "0.5rem 1.4rem",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            Agendar llamada
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
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
            style={{ background: "rgba(10,35,66,0.96)", padding: "1rem 2rem" }}
            className="md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "var(--font-jost)",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.85)",
                  padding: "0.65rem 0",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#calculadora"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-jost)",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: WHITE,
                background: BLUE,
                padding: "0.5rem 1.4rem",
                borderRadius: 100,
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              Agendar llamada
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── HERO — navy bg, WHITE text ─── */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  return (
    <section
      style={{
        position: "relative",
        background: NAVY,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <GoldParticleChart />
      </div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 860,
          margin: "0 auto",
          padding: "8rem 2rem 4rem",
          opacity: heroOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <img
            src={LW}
            alt="CJB Logo"
            style={{ height: 72, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(46,95,138,0.3))" }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 400,
            fontSize: "0.85rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: BLUE,
            marginBottom: "1.5rem",
            opacity: 0.85,
          }}
        >
          Carolina Betancourt
        </motion.p>

        <WordRevealText text="Convierte cada peso en Meta Ads en retorno real" />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
            lineHeight: 1.08,
            color: WHITE,
            marginTop: "0.5rem",
          }}
        >
          Performance Marketing &amp; Paid Media Strategy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 300,
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            marginTop: "1.8rem",
            maxWidth: 580,
          }}
        >
          No gestiono campañas. Diseño sistemas de inversión que escalan marcas con
          rentabilidad probada en Meta Ads. Sin excusas, sin métricas de vanidad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}
        >
          <a
            href="#calculadora"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "0.9rem",
              color: WHITE,
              background: BLUE,
              padding: "0.85rem 2.2rem",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Agendar llamada estratégica
          </a>
          <a
            href="#sistema-filtro"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "0.85rem 2.2rem",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Conocer el Método P.U.L.S.O.
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PROBLEMA — white bg, NAVY text ─── */
function ProblemaSection() {
  return (
    <section style={{ background: NAVY2, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: BLUE,
              marginBottom: "0.75rem",
            }}
          >
            El problema real
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "2.5rem",
            }}
          >
            Tu inversión en Meta Ads no está generando el retorno que deberías
          </h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "2rem" }}>
          {[
            {
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E5F8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
              title: "Gasto sin estrategia",
              text: "La mayoría de las marcas lanzan campañas sin un sistema claro de inversión, desperdiciando presupuesto en audiences y formatos que no convierten.",
            },
            {
              title: "Métricas de vanidad",
              text: "Alcanzos e impresiones no pagan facturas. Sin un marco de ROAS real, es imposible saber si tus campañas son realmente rentables.",
            },
            {
              title: "Agencias genéricas",
              text: "Muchas agencias aplican la misma plantilla a todos los clientes. Tu marca merece una estrategia diseñada específicamente para tus objetivos.",
            },
          ].map((item, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  padding: "2rem",
                  borderLeft: "3px solid " + BLUE,
                  background: NAVY2,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div style={{ marginBottom: "0.75rem" }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                    fontSize: "1.35rem",
                    color: WHITE,
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MÉTODO P.U.L.S.O. — BLUE bg, WHITE text ─── */
function SistemaFiltroSection() {
  const fases = [
    {
      letra: "P",
      palabra: "PROBAR",
      desc: "Antes de escalar, el sistema necesita datos reales. La mayoría de presupuestos se desperdicia aquí.",
    },
    {
      letra: "U",
      palabra: "UBICAR",
      desc: "No todas las audiencias convierten igual. Esta fase encuentra a las que sí — con precisión quirúrgica.",
    },
    {
      letra: "L",
      palabra: "LANZAR",
      desc: "Cuando el sistema identifica lo que funciona, se escala en el momento exacto. Ni antes ni después.",
    },
    {
      letra: "S",
      palabra: "SOSTENER",
      desc: "Un CPA bajo no se mantiene solo. Esta fase es la que la mayoría de agencias omite.",
    },
    {
      letra: "O",
      palabra: "OPTIMIZAR",
      desc: "Cada ciclo termina con aprendizajes documentados. El siguiente ciclo comienza mejor calibrado.",
    },
  ];
  return (
    <section id="sistema-filtro" style={{ background: NAVY, padding: "6rem 2rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "50%", background: "radial-gradient(ellipse at center, rgba(46,95,138,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "0.75rem",
            }}
          >
            Mi metodología
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 500,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            El Método P.U.L.S.O.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              maxWidth: 720,
              marginBottom: "3.5rem",
            }}
          >
            15 meses de ejecución real terminaron convirtiéndose en un sistema. Uno que ahora implemento con cada cliente.
          </p>
        </ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {fases.map((f, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(46,95,138,0.12)",
                  borderRadius: 20,
                  padding: "1.75rem 2rem",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "4.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 700,
                      fontSize: "3.2rem",
                      color: "#2E5F8A",
                      lineHeight: 1,
                      textShadow: "0 0 30px rgba(46,95,138,0.3), 0 0 60px rgba(46,95,138,0.1)",
                    }}
                  >
                    {f.letra}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontWeight: 500,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: "rgba(255,255,255,0.45)",
                      marginTop: "0.35rem",
                    }}
                  >
                    {f.palabra}
                  </span>
                </div>
                <div style={{ flex: 1, paddingTop: "0.35rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: WHITE,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {f.palabra}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.75,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.15rem,2.5vw,1.45rem)",
              color: WHITE,
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: 700,
              margin: "3.5rem auto 0",
              fontStyle: "italic",
            }}
          >
            Cada ciclo reduce el costo. Cada peso invertido rinde más que el anterior. Eso es lo que hace un sistema — no campañas sueltas.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              padding: "1rem 2rem",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(46,95,138,0.2)",
              borderRadius: 100,
              display: "inline-block",
              margin: "2rem auto 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-jost)",
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
              }}
            >
              Resultado documentado: CPA reducido 52% en 5 ciclos consecutivos &middot; 8,400+ conversiones &middot; $63K MXN gestionados
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── CAPACIDADES — light gray bg, NAVY text ─── */
function CapacidadesSection() {
  const caps = [
    {
      title: "Estrategia de Inversión en Meta",
      text: "Diseño la arquitectura completa de tu inversión: presupuesto por fase del embudo, distribución entre campañas, y modelo de escalamiento basado en datos reales.",
    },
    {
      title: "Optimización de ROAS",
      text: "Monitoreo diario con ajustes basados en rendimiento real. Pauso lo que no funciona, escale lo que sí. Tu ROAS mejora semana tras semana, no en reportes mensuales.",
    },
    {
      title: "Tracking y Medición Precisa",
      text: "Implementación correcta del píxel de Meta, eventos de conversión, UTM parameters y dashboards que te muestran exactamente qué genera cada peso invertido.",
    },
    {
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E5F8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
      title: "Creatividades que Convierten",
      text: "Dirección de briefs creativos basados en datos, no en suposiciones. Cada concepto probado con A/B testing antes de escalar inversión.",
    },
  ];
  return (
    <section id="capacidades" style={{ background: NAVY2, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: BLUE,
              marginBottom: "0.75rem",
            }}
          >
            En lo que me especializo
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "3rem",
            }}
          >
            Capacidades
          </h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: "1.5rem" }}>
          {caps.map((c, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  background: NAVY2,
                  border: "1px solid rgba(46,95,138,0.2)",
                  borderRadius: 20,
                  padding: "2rem",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(46,95,138,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: c.icon }} />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                    fontSize: "1.25rem",
                    color: WHITE,
                    marginBottom: "0.6rem",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  {c.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESO — navy bg, WHITE text ─── */
function ProcesoSection() {
  const pasos = [
    { step: "1", title: "Llamada de diagnóstico", text: "Entiendo tu negocio, objetivos y situación actual en Meta Ads en 30 minutos." },
    { step: "2", title: "Propuesta a medida", text: "Recibes un plan de acción concreto con estrategia de inversión, estructura de campañas y proyección de ROAS." },
    { step: "3", title: "Activación", text: "Implemento el sistema completo: campañas, tracking, creatividades y optimización diaria desde el día uno." },
  ];
  return (
    <section id="proceso" style={{ background: NAVY, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: BLUE,
              marginBottom: "0.75rem",
            }}
          >
            Cómo empezamos
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "3.5rem",
            }}
          >
            El proceso
          </h2>
        </ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {pasos.map((p, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  padding: "1.5rem",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  border: "1px solid rgba(46,95,138,0.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: BLUE,
                    minWidth: "2rem",
                  }}
                >
                  {p.step}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 500,
                      fontSize: "1.3rem",
                      color: WHITE,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── CONTACTO — light gray bg, NAVY text ─── */
function ContactSection() {
  return (
    <section id="contacto" style={{ background: NAVY2, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: BLUE,
              marginBottom: "0.75rem",
            }}
          >
            Siguiente paso
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            ¿Listo para que tu inversión en Meta Ads realmente funcione?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Agenda una llamada de 30 minutos donde analizo tu situación actual y te
            doy un plan de acción concreto. Sin compromiso, sin venta forzada.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://calendly.com/carolina-mkt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-jost)",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: WHITE,
                background: BLUE,
                padding: "0.9rem 2.4rem",
                borderRadius: 100,
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              Agendar llamada estratégica
            </a>
            <a
              href="https://wa.me/5223111396364"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-jost)",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: WHITE,
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0.9rem 2.2rem",
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              WhatsApp directo
            </a>
          </div>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
              marginTop: "1.5rem",
            }}
          >
            carolinajuarezbetancourt@gmail.com
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── FOOTER — navy bg, WHITE text ─── */
function Footer() {
  return (
    <footer
      style={{
        background: NAVY,
        padding: "3rem 2rem 2rem",
        borderTop: "1px solid rgba(46,95,138,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <img src={LW} alt="CJB Logo" style={{ height: 48, width: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1rem", color: WHITE, letterSpacing: "0.15em", textTransform: "uppercase" as const, marginTop: "0.25rem" }}>Carolina Betancourt
        </p>
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          Performance Marketing &amp; Paid Media Strategy
        </p>
        <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
          <a
            href="https://wa.me/5223111396364"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            WhatsApp
          </a>
          <a
            href="mailto:carolinajuarezbetancourt@gmail.com"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            Email
          </a>
          <a
            href="https://calendly.com/carolina-mkt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            Calendly
          </a>
        </div>
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 300,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.35)",
            marginTop: "1.5rem",
          }}
        >
          © 2026 CJB by Carolina Betancourt
        </p>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */
export default function Page() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <Marquee />
      <ProblemaSection />
      <CasoDeExitoSection />
      <DashboardPreview />
      <HerramientasGratisSection />
      <SistemaFiltroSection />
      <CapacidadesSection />
      <ProcesoSection />
      <ContactSection />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}







