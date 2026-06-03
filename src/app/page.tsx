import { trackWhatsAppClick } from '@/lib/gtag'
"use client"

import CasoDeExitoSection from "@/components/caso-exito";
import HerramientasGratisSection from "@/components/herramientas-gratis";

import { useState, useEffect, useRef, ComponentType, useCallback } from "react";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ServiciosSection from "@/components/servicios-section";


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

/* ─── colours ─── */
const BLACK         = "#000000";
const DEEP_NAVY     = "#0B2A5A";
const CORE_BLUE     = "#1E3A8A";
const BLUE_ELECTRIC = "#3B82F6";
const SILVER_METAL  = "#C0C5CE";
const GRAY_MEDIUM   = "#9CA3AF";
const ZINC_900      = "#111827";
const ZINC_800      = "#1F2937";
const WHITE         = "#FFFFFF";
const OFF_WHITE     = "#F9FAFB";

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
      style={{ background: BLACK, overflow: "hidden", borderTop: "1px solid rgba(59,130,246,0.15)" }}
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
              color: BLUE_ELECTRIC,
              fontFamily: "'DM Sans', sans-serif",
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  
  const links = [
    { label: "Herramientas", href: "#herramientas" },
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
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.1)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 48px",
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
          <img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 50, width: "auto", objectFit: "contain" }} />
        </a>

        {/* Desktop links — WHITE on dark hero */}
        <div style={{ display: isMobile ? "none" : "flex", gap: "2rem", alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "10px",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE_ELECTRIC)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              color: WHITE,
              background: "rgba(59,130,246,0.85)",
              padding: "9px 18px",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "1.5px",
              textTransform: "uppercase" as const,
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.85)")}
          >
            Agendar llamada
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: isMobile ? "block" : "none", background: "none", border: "none", cursor: "pointer" }}
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
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(0,0,0,0.96)", padding: "1rem 2rem" }}
            >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
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
              href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "inline-block",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: WHITE,
                background: BLUE_ELECTRIC,
                padding: "0.5rem 1.4rem",
                borderRadius: 100,
                textDecoration: "none",
                marginTop: "0.5rem",
            marginBottom: "32px",
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
/* --- HERO --- */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const [isMob, setIsMob] = useState(false);
  useEffect(() => { setIsMob(window.innerWidth < 768); const fn = () => setIsMob(window.innerWidth < 768); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);

  const ease = [0.4, 0, 0.2, 1];

  return (
    <section
      style={{
        position: "relative",
        background: "#0A0F1E",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "88px",
        paddingBottom: "80px",
      }}
    >

      <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>

      </div>

      <style>{`@media(max-width:767px){.hero-mockup{display:none!important}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      {/* Business Manager Mockup - full hero background, diagonal */}
      <div
        style={{
          display: "block",
          position: "absolute",
          left: "50%",
          top: "50%",          transform: "translate(-50%, -50%) rotate(-6deg)",
          width: "140%",
          opacity: 0.35,
          borderRadius: 16,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <img
          src="/meta-ads.jpeg"
          alt="Meta Ads Manager"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Gradient both sides */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }} />
        {/* Gradiente abajo */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 100%)",
          pointerEvents: "none",
        }} />
        {/* Gradient top */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:"40%",background:"linear-gradient(to bottom, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 100%)",pointerEvents:"none"}} />
      </div>


      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 640,
          margin: isMob ? "0 auto" : "0",
          padding: isMob ? "6rem 1.5rem 2rem" : "6rem 2rem 2rem",
          textAlign: isMob ? "center" : "left",
          opacity: heroOpacity,
        }}
      >

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease: ease }}
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase" as const,
            color: "#4A7CF7",
            marginBottom: 12,
          }}
        >
          — Carolina Betancourt
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: ease }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: isMob ? 34 : 52,
            lineHeight: 1.05,
            color: "#FFFFFF",
            marginBottom: 28,
          }}
        >
          La mayoría de agencias optimiza anuncios.<br/>
          Yo optimizo lo que te cuesta <span style={{ color: "#4A7CF7" }}>cada venta</span>.<span style={{display:"inline-block",color:"#3B82F6",fontWeight:300,marginLeft:2,animation:"blink 1.1s step-end infinite"}}>|</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: ease }}
          style={{
            fontFamily: "var(--font-jost)",
            fontWeight: 300,
            fontSize: 14,
            marginTop: "24px",
            color: "rgba(156,163,175,0.90)",
            maxWidth: 420,
            lineHeight: 1.85,
            marginBottom: 36,
            marginLeft: isMob ? "auto" : undefined,
            marginRight: isMob ? "auto" : undefined,
          }}
        >
          Trabajo con negocios que ya invierten en Meta Ads y saben que algo no esta funcionando — aunque todavía no logran identificar exactamente qué está frenando el rendimiento.
          <br/><br/>
          Ahí es donde entro yo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: ease }}
          style={{
            display: "flex",
            flexDirection: isMob ? "column" : "row",
            gap: 14,
            marginBottom: 20,
            justifyContent: isMob ? "center" : "flex-start",
          }}
        >
          <a
            href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados."
            style={{
              display: "inline-block",
              background: "#4A7CF7",
              color: "#FFFFFF",
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "0.85rem",
              padding: "14px 28px",
              borderRadius: 3,
              textDecoration: "none",
              letterSpacing: "1.5px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "center",
            }}
            onMouseEnter={function(e){e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(37,99,235,0.25)";e.currentTarget.style.letterSpacing="2px";}}
            onMouseLeave={function(e){e.currentTarget.style.background="#3B82F6";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.letterSpacing="1.5px";}}
           onClick={() => trackWhatsAppClick('hero')}>
            Quiero saber qué está fallando
          </a>
          <a
            href="#sistema-filtro"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "0.85rem",
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "all 0.25s",
              textAlign: "center",
            }}
            onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.6)";}}
            onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";}}
          >
            Ver el Método P.U.L.S.O.
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: ease }}
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase" as const,
            marginTop: "32px",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          Sin contratos forzosos · Optimización basada en datos reales · CPA documentado: -52% en 5 ciclos
        </motion.p>

      </motion.div>
    </section>
  );
}

/* ─── PROBLEMA — white bg, DEEP_NAVY text ─── */
function ProblemaSection() {
  return (
    <section style={{ background: BLACK, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: BLUE_ELECTRIC,
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
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
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
                  borderLeft: "3px solid " + BLUE_ELECTRIC,
                  background: ZINC_900,
                  borderRadius: "0 8px 8px 0",
                  border: "1px solid " + CORE_BLUE,
                  borderLeftWidth: "3px",
                  borderLeftColor: BLUE_ELECTRIC,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;
                  e.currentTarget.style.borderLeftColor = BLUE_ELECTRIC;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CORE_BLUE;
                  e.currentTarget.style.borderLeftColor = BLUE_ELECTRIC;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = CORE_BLUE;
                  e.currentTarget.style.boxShadow = "none";
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
                    fontFamily: "'DM Sans', sans-serif",
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

/* ─── MÉTODO P.U.L.S.O. — BLUE_ELECTRIC bg, WHITE text ─── */
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
    <section id="sistema-filtro" style={{ background: DEEP_NAVY, padding: "6rem 2rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "50%", background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
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
              fontFamily: "'DM Sans', sans-serif",
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
                  background: ZINC_900,
                  border: "1px solid " + CORE_BLUE,
                  borderRadius: 20,
                  padding: "1.75rem 2rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CORE_BLUE;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
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
                      color: "#3B82F6",
                      lineHeight: 1,
                      textShadow: "0 0 30px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)",
                    }}
                  >
                    {f.letra}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: SILVER_METAL,
                      marginTop: "0.35rem",
                    }}
                  >
                    {f.palabra}
                  </span>
                </div>
                <div style={{ flex: 1, paddingTop: "0.35rem" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
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
                      fontFamily: "'DM Sans', sans-serif",
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
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 100,
              display: "inline-block",
              margin: "2rem auto 0",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
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

/* ─── CAPACIDADES — light gray bg, DEEP_NAVY text ─── */
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
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
      title: "Creatividades que Convierten",
      text: "Dirección de briefs creativos basados en datos, no en suposiciones. Cada concepto probado con A/B testing antes de escalar inversión.",
    },
  ];
  return (
    <section id="capacidades" style={{ background: BLACK, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: BLUE_ELECTRIC,
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
                  background: ZINC_900,
                  border: "1px solid " + CORE_BLUE,
                  borderRadius: 20,
                  padding: "2rem",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";
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
                    fontFamily: "'DM Sans', sans-serif",
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
    <section id="proceso" style={{ background: DEEP_NAVY, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: BLUE_ELECTRIC,
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
                  background: ZINC_900,
                  borderRadius: 14,
                  border: "1px solid " + CORE_BLUE,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CORE_BLUE;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: BLUE_ELECTRIC,
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
                      fontFamily: "'DM Sans', sans-serif",
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


/* ─── CONTACTO — light gray bg, DEEP_NAVY text ─── */
function ContactSection() {
  return (
    <section id="contacto" style={{ background: BLACK, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: BLUE_ELECTRIC,
              marginBottom: "0.75rem",
            }}
          >
            Agenda tu llamada
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
              fontFamily: "'DM Sans', sans-serif",
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
              href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: WHITE,
                background: BLUE_ELECTRIC,
                padding: "0.9rem 2.4rem",
                borderRadius: 100,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = CORE_BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_ELECTRIC)}
            >
              Agendar llamada estratégica
            </a>
            <a
              href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20me%20interesa%20agendar%20una%20llamada%20estrat%C3%A9gica%20para%20hablar%20sobre%20mis%20campa%C3%B1as%20de%20Meta%20Ads."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: WHITE,
                border: "1px solid " + BLUE_ELECTRIC,
                padding: "0.9rem 2.2rem",
                borderRadius: 100,
                transition: "all 0.25s",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(59,130,246,0.10)";
              }}
              onClick={() => trackWhatsAppClick('metodo_pulso')}

              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              WhatsApp directo
            </a>
          </div>
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
        background: DEEP_NAVY,
        padding: "3rem 2rem 2rem",
        borderTop: "1px solid rgba(59,130,246,0.08)",
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
          <img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 52, width: "auto", objectFit: "contain", borderRadius: "8px" }} />
        <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1rem", color: WHITE, letterSpacing: "0.15em", textTransform: "uppercase" as const, marginTop: "0.25rem" }}>Carolina Betancourt
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          Performance Marketing &amp; Paid Media Strategy
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.55rem",
            color: SILVER_METAL,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            marginTop: "-0.25rem",
          }}
        >

        </p>
        <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
          <a
            href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20saber%20c%C3%B3mo%20puedes%20ayudarme%20con%20mis%20Meta%20Ads."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) = onClick={() => trackWhatsAppClick('footer')}> (e.currentTarget.style.color = BLUE_ELECTRIC)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            WhatsApp
          </a>
          <a
            href="mailto:carolinajuarezbetancourt@gmail.com"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE_ELECTRIC)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            Email
          </a>
          <a
            href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE_ELECTRIC)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            Calendly
          </a>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.35)",
            marginTop: "1.5rem",
          }}
        >
          © 2026 Carolina Betancourt
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
    <>
      <style>{String.raw`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
      <main style={{ overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <Marquee />
      <ProblemaSection />
      <CasoDeExitoSection />
      <div id="herramientas"></div>
      <HerramientasGratisSection />
      <SistemaFiltroSection />
      <CapacidadesSection />
      <ServiciosSection />
<ProcesoSection />
      <ContactSection />
      <Footer />
      
    </main>
    </>
  );
}







