"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const CalculadoraROAS = dynamic(() => import("@/components/calculadora-roas"), {
  ssr: false,
});

/* ───────── DATA ───────── */

const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Sistema Filtro", href: "#sistema-filtro" },
  { label: "Capacidades", href: "#capacidades" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

const PROBLEMAS = [
  {
    icon: "📊",
    title: "Gasto sin estrategia",
    desc: "Inviertes en Meta Ads sin un plan claro y los resultados no llegan. El presupuesto se consume sin generar retornos medibles ni un funnel que convierta de verdad.",
  },
  {
    icon: "🎯",
    title: "Público equivocado",
    desc: "Tus anuncios llegan a personas que nunca van a comprar. La segmentación es genérica, los clics no se convierten en clientes y el costo por adquisición se dispara.",
  },
  {
    icon: "📉",
    title: "ROAS negativo",
    desc: "Por cada peso que inviertes, no recuperas ni la mitad. Sin optimización continua ni tracking preciso, la métrica se hunde semana tras semana.",
  },
  {
    icon: "🔄",
    title: "Agencias que no entregan",
    desc: "Prometen resultados pero solo entregan reportes confusos. Sin transparencia, sin metodología clara y sin rendición de cuentas, es dinero tirado a la basura.",
  },
];

const FILTRO_STEPS = [
  {
    step: "01",
    title: "Auditoría profunda",
    desc: "Analizamos cada peso invertido, cada funnel, cada píxel. Nada se escapa, todo se mide.",
  },
  {
    step: "02",
    title: "Estrategia a medida",
    desc: "Diseñamos un plan basado en datos reales de tu negocio, no en plantillas genéricas recicladas.",
  },
  {
    step: "03",
    title: "Ejecución quirúrgica",
    desc: "Lanzamos campañas con segmentación precisa, creatividades que convierten y testing continuo.",
  },
  {
    step: "04",
    title: "Optimización obsesiva",
    desc: "Campañas vivas que se ajustan diario. Si algo no funciona, se cambia. Sin ego, con datos.",
  },
];

const CAPACIDADES = [
  {
    icon: "🎯",
    title: "Meta Ads Strategy",
    desc: "Estrategia integral para Facebook e Instagram: segmentación avanzada, presupuesto inteligente y creatividades que convierten en cada etapa del funnel.",
  },
  {
    icon: "📊",
    title: "Data & Analytics",
    desc: "Tracking preciso, píxeles configurados, dashboards en tiempo real. Cada decisión respaldada por datos reales, no por corazonadas.",
  },
  {
    icon: "🔄",
    title: "CRO & Funnel Design",
    desc: "Optimización de conversión en cada etapa. Landing pages, lead magnets y flujos que transforman visitantes en clientes de verdad.",
  },
  {
    icon: "🧪",
    title: "A/B Testing Continuo",
    desc: "Testeo permanente de creatividades, públicos y mensajes. Lo que funciona se escala, lo que no se elimina sin piedad.",
  },
  {
    icon: "📈",
    title: "Scaling Profitable",
    desc: "Escalar campañas manteniendo rentabilidad. Del presupuesto inicial al scaling agresivo sin sacrificar ROAS.",
  },
  {
    icon: "📱",
    title: "Creative Strategy",
    desc: "Creatividades que detienen el scroll. Copy persuasivo, diseño impactante y mensajes que conectan con tu audiencia ideal.",
  },
];

const RECURSOS = [
  {
    title: "Guía: 5 errores que matan tu ROAS",
    desc: "Descubre los errores más comunes que están consumiendo tu presupuesto en Meta Ads sin generar resultados reales.",
    tag: "Guía Gratuita",
  },
  {
    title: "Checklist: Auditoría de campañas",
    desc: "Revisa paso a paso si tus campañas están configuradas para generar rentabilidad o solo gastar presupuesto sin rumbo.",
    tag: "Checklist",
  },
  {
    title: "Plantilla: Calculadora de ROAS",
    desc: "Calcula exactamente cuánto necesitas invertir y cuánto debes recuperar para que tus campañas sean rentables.",
    tag: "Plantilla",
  },
];

const PROCESO_STEPS = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Analizamos tu situación actual, campañas previas y objetivos reales de negocio. Sin humo, sin promesas vacías.",
  },
  {
    num: "02",
    title: "Estrategia",
    desc: "Diseñamos un plan personalizado con KPIs claros, presupuestos definidos y timeline realista basado en datos.",
  },
  {
    num: "03",
    title: "Lanzamiento",
    desc: "Configuramos todo: píxeles, públicos, creatividades y campañas. Nada se deja al azar, todo se mide.",
  },
  {
    num: "04",
    title: "Optimización",
    desc: "Monitoreo diario, ajustes continuos y reporting transparente. Resultados que se ven desde la semana 1.",
  },
];

/* ───────── ANIMATIONS ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────── COMPONENT ───────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ═══════ NAVBAR ═══════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F1E]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            CJB
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-white/80 hover:text-[#4A7CF7] transition-colors"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d={
                  mobileOpen
                    ? "M6 6l12 12M6 18L18 6"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#0A0F1E]/95 backdrop-blur-md px-6 pb-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left py-3 text-white/80 hover:text-[#4A7CF7] transition-colors"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center bg-[#0A0F1E] pt-20"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A7CF7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#4A7CF7]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Convierte clics en
            <br />
            <span className="text-[#4A7CF7]">ingresos reales</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm md:text-base text-white/60 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            Estrategia de Performance Marketing &{" "}
            <span className="text-[#4A7CF7]">Paid Media Strategy</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://calendly.com/carolina-mkt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#4A7CF7] text-white rounded-full font-medium hover:bg-[#3A6CE7] transition-all hover:shadow-lg hover:shadow-[#4A7CF7]/25"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Agendar llamada estratégica
            </a>
            <a
              href="https://wa.me/5223111396364"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:border-[#4A7CF7] hover:text-[#4A7CF7] transition-all"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Marquee strip */}
        <div className="relative z-10 bg-[#4A7CF7] py-3 overflow-hidden mt-auto">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="mx-8 text-sm font-medium text-white tracking-widest uppercase"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Meta Ads &bull; Performance Marketing &bull; ROAS Positivo &bull;
                Scaling Profitable &bull; Funnel Optimization &bull; Creative
                Strategy &bull;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROBLEMA ═══════ */}
      <section id="problema" className="bg-[#F5F6FA] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A0F1E] leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              ¿Por qué la mayoría de
              <br />
              las campañas fracasan?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-lg text-[#0A0F1E]/60"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Si alguna de estas situaciones te suena familiar, estás perdiendo
              dinero cada día.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {PROBLEMAS.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{p.icon}</span>
                <h3
                  className="mt-4 text-xl font-semibold text-[#0A0F1E]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-2 text-[#0A0F1E]/60"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SISTEMA FILTRO ═══════ */}
      <section
        id="sistema-filtro"
        className="relative bg-[#0A0F1E] py-24 md:py-32 overflow-hidden"
      >
        {/* Decorative opacity circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A7CF7]/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4A7CF7]/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#4A7CF7]/[0.08] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#4A7CF7]/[0.05] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-[#4A7CF7] text-sm tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Mi metodología
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              El Sistema Filtro
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg text-white/50 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Un proceso probado de 4 fases que filtra lo que no funciona y
              escala lo que sí. Sin conjeturas, sin desperdicio.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FILTRO_STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors group"
              >
                <span
                  className="text-[#4A7CF7]/40 text-5xl font-bold group-hover:text-[#4A7CF7]/60 transition-colors"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.step}
                </span>
                <h3
                  className="mt-4 text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-white/50 text-sm"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CAPACIDADES ═══════ */}
      <section id="capacidades" className="bg-[#F5F6FA] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A0F1E]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Capacidades que generan
              <br />
              resultados
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CAPACIDADES.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-10 shadow-sm hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(74,124,247,0.15)] transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl">{c.icon}</span>
                <h3
                  className="mt-6 text-xl font-semibold text-[#0A0F1E]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-3 text-[#0A0F1E]/60"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ QUIÉN SOY ═══════ */}
      <section id="quien-soy" className="bg-[#0A0F1E] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-[#4A7CF7] text-sm tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Quién soy
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-4 text-4xl md:text-5xl font-light text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Carolina Betancourt
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 text-white/60 leading-relaxed"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Especialista en Performance Marketing con enfoque exclusivo en
                Meta Ads. Ayudo a marcas y negocios a convertir inversión
                publicitaria en ingresos reales a través de estrategias basadas
                en datos, no en suposiciones.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-4 text-white/60 leading-relaxed"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Mi Sistema Filtro nació de años de probar, equivocarme y
                optimizar. No es teoría de curso — es metodología de trinchera,
                refinada campaña tras campaña, resultado tras resultado.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-8 grid grid-cols-3 gap-6"
              >
                <div>
                  <span
                    className="text-3xl font-bold text-[#4A7CF7]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    50+
                  </span>
                  <p
                    className="mt-1 text-white/40 text-sm"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Campañas optimizadas
                  </p>
                </div>
                <div>
                  <span
                    className="text-3xl font-bold text-[#4A7CF7]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    3x
                  </span>
                  <p
                    className="mt-1 text-white/40 text-sm"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    ROAS promedio
                  </p>
                </div>
                <div>
                  <span
                    className="text-3xl font-bold text-[#4A7CF7]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    100%
                  </span>
                  <p
                    className="mt-1 text-white/40 text-sm"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Meta Ads focus
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#4A7CF7]/20 to-[#4A7CF7]/5 border border-[#4A7CF7]/10 flex items-center justify-center">
                <span
                  className="text-8xl text-[#4A7CF7]/30"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  CJB
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCESO ═══════ */}
      <section id="proceso" className="bg-[#F5F6FA] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A0F1E]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Cómo trabajamos
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROCESO_STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="relative bg-white rounded-2xl p-8 shadow-sm"
              >
                <span
                  className="text-[#4A7CF7] text-4xl font-bold"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.num}
                </span>
                <h3
                  className="mt-4 text-xl font-semibold text-[#0A0F1E]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-[#0A0F1E]/60 text-sm"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ RECURSOS ═══════ */}
      <section id="recursos" className="bg-[#0A0F1E] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Recursos gratuitos
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {RECURSOS.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors group"
              >
                <span
                  className="inline-block px-3 py-1 text-xs font-medium text-[#4A7CF7] bg-[#4A7CF7]/10 rounded-full"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {r.tag}
                </span>
                <h3
                  className="mt-4 text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="mt-2 text-white/50 text-sm"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {r.desc}
                </p>
                <button
                  className="mt-4 text-[#4A7CF7] text-sm font-medium hover:underline"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Descargar &rarr;
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CALCULADORA ROAS ═══════ */}
      <section id="calculadora" className="bg-[#F5F6FA] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl font-light text-[#0A0F1E]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Calcula tu ROAS
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-[#0A0F1E]/60"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Descubre si tus campañas son realmente rentables.
            </motion.p>
          </motion.div>
          <CalculadoraROAS />
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section id="contacto" className="bg-[#0A0F1E] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              ¿Listo para que tus
              <br />
              campañas sí funcionen?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-6 text-lg text-white/60"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Agenda una llamada estratégica sin compromiso y descubre cómo el
              Sistema Filtro puede transformar tus resultados.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://calendly.com/carolina-mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#4A7CF7] text-white rounded-full font-medium hover:bg-[#3A6CE7] transition-all hover:shadow-lg hover:shadow-[#4A7CF7]/25"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Agendar llamada estratégica
              </a>
              <a
                href="https://wa.me/5223111396364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:border-[#4A7CF7] hover:text-[#4A7CF7] transition-all"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-[#0A0F1E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                CJB
              </span>
              <p
                className="mt-1 text-white/40 text-sm"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Performance Marketing &amp; Meta Ads Strategy
              </p>
            </div>
            <div
              className="flex items-center gap-6 text-sm text-white/40"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              <a
                href="mailto:carolinajuarezbetancourt@gmail.com"
                className="hover:text-[#4A7CF7] transition-colors"
              >
                carolinajuarezbetancourt@gmail.com
              </a>
              <a
                href="https://wa.me/5223111396364"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4A7CF7] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://calendly.com/carolina-mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4A7CF7] transition-colors"
              >
                Calendly
              </a>
            </div>
          </div>
          <div
            className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            &copy; 2025 CJB — Carolina Betancourt. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
