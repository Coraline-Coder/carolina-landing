"use client"
import CasoDeExitoSection from "@/components/caso-exito";
import HerramientasGratisSection from "@/components/herramientas-gratis";

import { useState, useEffect, useRef, ComponentType } from "react";

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
const NAVY = "#0A0F1E";
const BLUE = "#4A7CF7";
const WHITE = "#FFFFFF";
const LGRAY = "#F5F6FA";

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
      initial={{ opacity: 0, y: 32 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
      style={{ background: NAVY, overflow: "hidden", borderTop: "1px solid rgba(74,124,247,0.25)" }}
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
        background: scrolled ? "rgba(10,15,30,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(74,124,247,0.15)" : "none",
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
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 600,
            fontSize: "1.65rem",
            color: WHITE,
            letterSpacing: "0.04em",
            textDecoration: "none",
          }}
        >
          CJB
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
              borderRadius: 6,
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
            style={{ background: "rgba(10,15,30,0.96)", padding: "1rem 2rem" }}
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
                borderRadius: 6,
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 400,
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: BLUE,
            marginBottom: "1.5rem",
          }}
        >
          CJB by Carolina Betancourt
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
              padding: "0.85rem 2rem",
              borderRadius: 6,
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
              padding: "0.85rem 2rem",
              borderRadius: 6,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Conocer el Sistema Filtro
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PROBLEMA — white bg, NAVY text ─── */
function ProblemaSection() {
  return (
    <section style={{ background: WHITE, padding: "6rem 2rem" }}>
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
              color: NAVY,
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
                  background: LGRAY,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                    fontSize: "1.35rem",
                    color: NAVY,
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
                    color: "#4A4A4A",
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
    <section id="sistema-filtro" style={{ background: BLUE, padding: "6rem 2rem" }}>
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
            No es teoría de libros. Es la metodología que extraje de 15 meses, 18 campañas y $63,000 MXN gestionados — formalizada para replicarla con cada cliente.
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
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
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
                      color: "rgba(255,255,255,0.95)",
                      lineHeight: 1,
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
              border: "1px solid rgba(255,255,255,0.12)",
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
      title: "Creatividades que Convierten",
      text: "Dirección de briefs creativos basados en datos, no en suposiciones. Cada concepto probado con A/B testing antes de escalar inversión.",
    },
  ];
  return (
    <section id="capacidades" style={{ background: LGRAY, padding: "6rem 2rem" }}>
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
              color: NAVY,
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
                  background: WHITE,
                  border: "1px solid #E8E8E8",
                  borderRadius: 12,
                  padding: "2rem",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                    fontSize: "1.25rem",
                    color: NAVY,
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
                    color: "#4A4A4A",
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
                  borderRadius: 10,
                  border: "1px solid rgba(74,124,247,0.15)",
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
    <section id="contacto" style={{ background: LGRAY, padding: "6rem 2rem" }}>
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
              color: NAVY,
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
              color: "#4A4A4A",
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
                padding: "0.9rem 2.2rem",
                borderRadius: 6,
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
                color: NAVY,
                border: "1px solid #E8E8E8",
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
              fontSize: "0.85rem",
              color: "#7A7A7A",
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
        borderTop: "1px solid rgba(74,124,247,0.15)",
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
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 600,
            fontSize: "1.4rem",
            color: WHITE,
            letterSpacing: "0.06em",
          }}
        >
          CJB by Carolina Betancourt
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
      <HerramientasGratisSection />
      <SistemaFiltroSection />
      <CapacidadesSection />
      <ProcesoSection />
      <ContactSection />
      <Footer />
          
          
    </main>
  );
}







