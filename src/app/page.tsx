"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoldParticleChart = dynamic(
  () => import("@/components/gold-particle-chart"),
  { ssr: false }
);

/* ─── HELPERS ─── */
function useInView(th = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); o.unobserve(el); } },
      { threshold: th }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return { ref, vis };
}

function ScrollReveal({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Problema", href: "#problema" },
    { label: "Sistema Filtro", href: "#estrategia" },
    { label: "Capacidades", href: "#capacidades" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0F1E]/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-light tracking-[0.15em] text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
            CJB
          </span>
          <span className="hidden sm:inline text-[11px] text-white/40 tracking-wider uppercase border-l border-white/10 pl-2 ml-1" style={{ fontFamily: "var(--font-jost)" }}>
            by Carolina Betancourt
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 tracking-wide" style={{ fontFamily: "var(--font-jost)", fontWeight: 400 }}>
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-5 py-2 text-[13px] font-medium rounded-full border border-[#4A7CF7] text-[#4A7CF7] hover:bg-[#4A7CF7] hover:text-white transition-all duration-300" style={{ fontFamily: "var(--font-jost)" }}
          >
            Agendar llamada
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/70">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0F1E]/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white transition-colors text-[15px]" style={{ fontFamily: "var(--font-jost)" }}>{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 text-[13px] font-medium rounded-full border border-[#4A7CF7] text-[#4A7CF7] text-center hover:bg-[#4A7CF7] hover:text-white transition-all" style={{ fontFamily: "var(--font-jost)" }}>Agendar llamada</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO — Navy #0A0F1E ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(74,124,247,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(74,124,247,0.05)_0%,transparent_50%)]" />
      <GoldParticleChart />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.2em] uppercase text-white/50" style={{ fontFamily: "var(--font-jost)" }}>
            Performance Marketing &amp; Paid Media Strategy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light leading-[1.12] text-white" style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Convierte clics en{" "}
          <span className="text-[#4A7CF7]">clientes</span>{" "}
          con estrategia, no con suerte
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}
        >
          Performance Marketing para marcas que quieren escalar con Meta Ads y un sistema probado: <span className="text-[#4A7CF7]/80">Sistema Filtro</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contacto"
            className="px-8 py-3.5 rounded-full bg-[#4A7CF7] text-white font-medium text-[15px] hover:bg-[#3B6AE6] hover:shadow-[0_8px_30px_rgba(74,124,247,0.35)] transition-all duration-300" style={{ fontFamily: "var(--font-jost)" }}
          >
            Quiero escalar con Meta Ads
          </a>
          <a
            href="#estrategia"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 font-medium text-[15px] hover:border-white/40 hover:text-white transition-all duration-300" style={{ fontFamily: "var(--font-jost)" }}
          >
            Ver el Sistema Filtro
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ─── PROBLEMA — White #FFFFFF ─── */
function ProblemaSection() {
  const problems = [
    { icon: "📉", title: "Gastas sin medir", desc: "Inviertes en anuncios pero no sabes qué funciona y qué no. Cada peso se convierte en un tiro al aire sin métricas claras que te digan el retorno real de tu inversión." },
    { icon: "🎯", title: "Atracción sin conversión", desc: "Tienes likes y reach, pero no ventas. Tu audiencia crece en papel pero el embudo no convierte, y los números de engagement no se traducen en revenue." },
    { icon: "🔄", title: "Estrategias genéricas", desc: "Copias lo que ven otros hacer sin adaptarlo a tu marca. Lo que funciona para uno no siempre funciona para otro, y las plantillas genéricas matan la diferenciación." },
    { icon: "⏳", title: "Tiempo perdido probando", desc: "Meses probando sin un sistema claro de testeo y optimización. Sin metodología, cada cambio es una apuesta, no una decisión basada en data." },
  ];

  return (
    <section id="problema" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#4A7CF7]/60 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>El problema real</span>
            <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light leading-tight text-[#0A0F1E]" style={{ fontFamily: "var(--font-cormorant)" }}>
              No es falta de anuncios,<br />es falta de <span className="text-[#4A7CF7]">estrategia</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <ScrollReveal key={i} d={i * 0.1}>
              <div className="group p-7 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-400 h-full">
                <span className="text-2xl">{p.icon}</span>
                <h3 className="mt-4 text-[17px] font-medium text-[#0A0F1E]" style={{ fontFamily: "var(--font-jost)" }}>{p.title}</h3>
                <p className="mt-2 text-[#0A0F1E]/50 leading-relaxed text-[14px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ESTRATEGIA / SISTEMA FILTRO — Blue #4A7CF7 ─── */
function EstrategiaSection() {
  return (
    <section id="estrategia" className="relative py-24 md:py-32 bg-[#4A7CF7] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <ScrollReveal>
            <div>
              <span className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>La solución</span>
              <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light leading-tight text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
                Sistema Filtro
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed text-[15px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>
                Un sistema propietario de 5 fases diseñado para filtrar, cualificar y convertir tu audiencia ideal en clientes rentables. No es una plantilla, es una metodología adaptada a cada marca que trabaja conmigo.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed text-[15px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>
                Cada fase está diseñada para eliminar el ruido y concentrar tu inversión en los segmentos que realmente convierten, reduciendo el costo por adquisición y maximizando el retorno de cada peso invertido en Meta Ads.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal d={0.15}>
            <div className="space-y-3">
              {[
                { n: "01", t: "Auditoría profunda", d: "Analizamos tu cuenta, tu pixel, tu embudo y tu competencia. Sin diagnóstico, no hay receta." },
                { n: "02", t: "Estrategia personalizada", d: "Diseñamos la arquitectura de campañas, audiences y creativos específicos para tu marca." },
                { n: "03", t: "Implementación técnica", d: "Pixel, CAPI, eventos personalizados, catálogos. Todo configurado con precisión quirúrgica." },
                { n: "04", t: "Optimización continua", d: "Testeo A/B, ajustes diarios, escalado inteligente. No lanzamos y olvidamos." },
                { n: "05", t: "Reportes y transparencia", d: "Dashboards en tiempo real, reuniones semanales y reportes mensuales con insights accionables." },
              ].map((f, i) => (
                <div key={i} className="group flex gap-5 p-5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300">
                  <span className="text-white/20 text-[28px] font-light leading-none" style={{ fontFamily: "var(--font-cormorant)" }}>{f.n}</span>
                  <div>
                    <h4 className="text-white font-medium text-[14px]" style={{ fontFamily: "var(--font-jost)" }}>{f.t}</h4>
                    <p className="text-white/45 text-[13px] mt-1 leading-relaxed" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CAPACIDADES — Light gray #F5F6FA ─── */
function CapacidadesSection() {
  const caps = [
    { title: "Meta Ads Management", desc: "Gestión integral de campañas en Facebook e Instagram con optimización diaria. Desde la estructura de campañas hasta el ajuste fino de audiences y bids, cada decisión se toma con data." },
    { title: "Performance Strategy", desc: "Diseño de estrategias de performance centradas en ROI real, no en vanity metrics. Cada campaña tiene un objetivo de negocio claro y un sistema de medición que valida cada peso invertido." },
    { title: "Data & Analytics", desc: "Implementación de tracking avanzado, CAPI, eventos personalizados y dashboards en tiempo real. Si no se puede medir, no se puede optimizar, y yo me aseguro de que todo se mida." },
    { title: "Creative Strategy", desc: "Dirección creativa de ads que convierten, no solo que se ven bien. Copy persuasivo, formatos ganadores y testing sistemático de creativos para encontrar las combinaciones que escalan." },
  ];

  return (
    <section id="capacidades" className="relative py-24 md:py-32 bg-[#F5F6FA]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#4A7CF7]/60 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>Lo que hago</span>
            <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light text-[#0A0F1E]" style={{ fontFamily: "var(--font-cormorant)" }}>
              Capacidades de <span className="text-[#4A7CF7]">performance</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {caps.map((c, i) => (
            <ScrollReveal key={i} d={i * 0.08}>
              <div className="group p-7 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-400 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#4A7CF7]/10 flex items-center justify-center mb-5">
                  <div className="w-2 h-2 rounded-full bg-[#4A7CF7]" />
                </div>
                <h3 className="text-[17px] font-medium text-[#0A0F1E]" style={{ fontFamily: "var(--font-jost)" }}>{c.title}</h3>
                <p className="mt-3 text-[#0A0F1E]/45 leading-relaxed text-[14px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESO — Navy #0A0F1E ─── */
function ProcesoSection() {
  const steps = [
    { n: "01", t: "Solicitud", d: "Completas el formulario y agendamos una llamada de diagnóstico de 30 minutos sin compromiso.", icon: "📋" },
    { n: "02", t: "Diagnóstico", d: "Analizamos tu situación actual, objetivos y identificamos las oportunidades de mejora inmediata en tus campañas.", icon: "🔍" },
    { n: "03", t: "Propuesta", d: "Recibes una propuesta personalizada con estrategia, tiempos, inversión recomendada y proyección de resultados.", icon: "📊" },
    { n: "04", t: "Lanzamiento", d: "Implementamos el Sistema Filtro completo y comenzamos a optimizar desde el día uno con foco en resultados.", icon: "🚀" },
  ];

  return (
    <section id="proceso" className="relative py-24 md:py-32 bg-[#0A0F1E]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,124,247,0.04)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#4A7CF7]/50 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>Cómo empezamos</span>
            <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
              De la duda al <span className="text-[#4A7CF7]">resultado</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4A7CF7]/15 to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {steps.map((s, i) => (
              <ScrollReveal key={i} d={i * 0.12}>
                <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className={`p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#4A7CF7]/15 transition-all duration-400 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                        <span className="text-lg">{s.icon}</span>
                        <span className="text-[#4A7CF7]/40 text-[12px] font-mono" style={{ fontFamily: "var(--font-jost)" }}>{s.n}</span>
                      </div>
                      <h3 className="text-[17px] font-medium text-white/90" style={{ fontFamily: "var(--font-jost)" }}>{s.t}</h3>
                      <p className="mt-2 text-white/40 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>{s.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-3.5 h-3.5 rounded-full bg-[#0A0F1E] border-2 border-[#4A7CF7]/30 items-center justify-center relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A7CF7]/60" />
                  </div>
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── RESOURCES — White #FFFFFF ─── */
function ResourcesSection() {
  const resources = [
    { t: "Guía: 5 errores que matan tus campañas", tag: "Guía gratuita" },
    { t: "Checklist de auditoría de pixel", tag: "Checklist" },
    { t: "Plantilla de estructura de campañas", tag: "Template" },
    { t: "Calculadora de ROAS en tiempo real", tag: "Herramienta" },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#4A7CF7]/60 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>Recursos gratuitos</span>
            <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light text-[#0A0F1E]" style={{ fontFamily: "var(--font-cormorant)" }}>
              Herramientas para <span className="text-[#4A7CF7]">empezar hoy</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((r, i) => (
            <ScrollReveal key={i} d={i * 0.06}>
              <div className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-400 cursor-pointer h-full">
                <span className="inline-block px-3 py-1 rounded-full bg-[#4A7CF7]/[0.07] text-[#4A7CF7] text-[10px] tracking-wider uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>{r.tag}</span>
                <h4 className="mt-4 text-[#0A0F1E] font-medium text-[14px] leading-snug" style={{ fontFamily: "var(--font-jost)" }}>{r.t}</h4>
                <div className="mt-4 flex items-center text-[#4A7CF7]/60 text-[12px] font-medium group-hover:text-[#4A7CF7] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>
                  Descargar <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / CONTACT — Blue #4A7CF7 ─── */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-[#4A7CF7]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "var(--font-jost)" }}>¿Listo para escalar?</span>
            <h2 className="mt-4 text-3xl md:text-[2.75rem] font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
              Hablemos de tu potencial
            </h2>
            <p className="mt-6 text-white/55 max-w-xl mx-auto leading-relaxed text-[15px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>
              Agenda una llamada de diagnóstico de 30 minutos. Sin compromiso, sin venderte algo que no necesitas. Solo un análisis honesto de tu situación actual y un plan claro para mejorar.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/carolina-mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-[#0A0F1E] font-medium text-[15px] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all duration-300" style={{ fontFamily: "var(--font-jost)" }}
              >
                Agendar llamada gratuita
              </a>
              <a
                href="https://wa.me/5223111396364"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-[15px] hover:bg-white/10 transition-all duration-300" style={{ fontFamily: "var(--font-jost)" }}
              >
                WhatsApp directo
              </a>
            </div>

            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6 text-white/40 text-[13px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>
              <a href="mailto:carolinajuarezbetancourt@gmail.com" className="hover:text-white/70 transition-colors">
                carolinajuarezbetancourt@gmail.com
              </a>
              <span className="hidden sm:inline text-white/20">|</span>
              <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                +52 231 113 96364
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── FOOTER — Navy #0A0F1E ─── */
function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-light tracking-[0.12em] text-white" style={{ fontFamily: "var(--font-cormorant)" }}>CJB</span>
              <span className="text-[10px] text-white/30 tracking-wider uppercase" style={{ fontFamily: "var(--font-jost)" }}>by Carolina Betancourt</span>
            </div>
            <p className="mt-2 text-white/25 text-[12px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>Performance Marketing &amp; Paid Media Strategy</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex gap-6">
              <a href="#problema" className="text-white/30 hover:text-white/60 text-[12px] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>Problema</a>
              <a href="#estrategia" className="text-white/30 hover:text-white/60 text-[12px] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>Sistema Filtro</a>
              <a href="#capacidades" className="text-white/30 hover:text-white/60 text-[12px] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>Capacidades</a>
              <a href="#contacto" className="text-white/30 hover:text-white/60 text-[12px] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>Contacto</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/15 text-[11px]" style={{ fontFamily: "var(--font-jost)" }}>&copy; 2026 CJB by Carolina Betancourt. Todos los derechos reservados.</p>
          <div className="flex gap-5 text-white/15 text-[11px]" style={{ fontFamily: "var(--font-jost)", fontWeight: 300 }}>
            <a href="mailto:carolinajuarezbetancourt@gmail.com" className="hover:text-white/40 transition-colors">Email</a>
            <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">WhatsApp</a>
            <a href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">Calendly</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemaSection />
      <EstrategiaSection />
      <CapacidadesSection />
      <ProcesoSection />
      <ResourcesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
