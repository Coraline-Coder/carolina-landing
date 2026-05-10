"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoldParticleChart = dynamic(
  () => import("@/components/gold-particle-chart"),
  { ssr: false }
);

/* ─── tiny helpers ─── */
function useInView(th = 0.15) {
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
      initial={{ opacity: 0, y: 32 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WordRevealText({ text, className = "" }: { text: string; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={vis ? { y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = ref.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={handle} onMouseLeave={reset} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Problema", href: "#problema" },
    { label: "Estrategia", href: "#estrategia" },
    { label: "Capacidades", href: "#capacidades" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060918]/80 backdrop-blur-xl border-b border-[#C9A96E]/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-[#C9A96E] via-[#E8D5B5] to-[#C9A96E] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair)" }}>
          CAROLINA
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-[#C9A96E] transition-colors duration-300 tracking-wide">
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] text-[#060918] hover:shadow-[0_0_24px_rgba(201,169,110,0.35)] transition-all duration-300"
          >
            Agendar llamada
          </a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/70">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060918]/95 backdrop-blur-xl border-b border-[#C9A96E]/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-[#C9A96E] transition-colors py-2">{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] text-[#060918] text-center">Agendar llamada</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO — Deep navy base ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#060918]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060918] via-[#0a0f2e]/40 to-[#060918]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06)_0%,transparent_70%)]" />
      <GoldParticleChart />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/[0.05] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            <span className="text-[#C9A96E]/80 text-xs tracking-[0.2em] uppercase">Meta Ads Specialist</span>
          </div>
        </motion.div>

        <WordRevealText
          text="Convierte clics en clientes con estrategia, no con suerte"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white block"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Performance Marketing para marcas que quieren escalar con Meta Ads y un sistema probado: <span className="text-[#C9A96E]/80">Sistema Filtro</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contacto"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] text-[#060918] font-semibold text-base hover:shadow-[0_0_36px_rgba(201,169,110,0.4)] transition-all duration-300"
          >
            Quiero escalar con Meta Ads
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
          <a
            href="#proceso"
            className="px-8 py-4 rounded-full border border-[#C9A96E]/20 text-white/70 font-medium text-base hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
          >
            Ver el Sistema Filtro
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 flex justify-center gap-12 md:gap-16"
        >
          {[
            { val: "3x", label: "ROAS promedio" },
            { val: "50+", label: "Marcas escaladas" },
            { val: "<72h", label: "Primeros resultados" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] bg-clip-text text-transparent">{s.val}</div>
              <div className="text-[11px] tracking-wider text-white/30 uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade into marquee */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0E0C16] to-transparent" />
    </section>
  );
}

/* ─── MARQUEE — Dark plum ─── */
function Marquee() {
  const items = ["Meta Ads", "Performance Marketing", "Sistema Filtro", "Estrategia", "Escalabilidad", "ROAS", "Conversión", "Data-Driven"];
  return (
    <div className="relative py-8 overflow-hidden border-y border-[#C9A96E]/[0.06] bg-[#0E0C16]">
      <div className="flex animate-[marquee_30s_linear_infinite]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center mx-8 text-sm tracking-[0.15em] text-[#C9A96E]/30 uppercase whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#C9A96E]/40 mr-4" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── PROBLEMA — Deep indigo/violet ─── */
function ProblemaSection() {
  const problems = [
    { icon: "📉", title: "Gastas sin medir", desc: "Inviertes en anuncios pero no sabes qué funciona y qué no. Cada peso se convierte en un tiro al aire sin métricas claras que te digan el retorno real de tu inversión." },
    { icon: "🎯", title: "Atracción sin conversión", desc: "Tienes likes y reach, pero no ventas. Tu audiencia crece en papel pero el embudo no convierte, y los números de engagement no se traducen en revenue." },
    { icon: "🔄", title: "Estrategias genéricas", desc: "Copias lo que ven otros hacer sin adaptarlo a tu marca. Lo que funciona para uno no siempre funciona para otro, y las plantillas genéricas matan la diferenciación." },
    { icon: "⏳", title: "Tiempo perdido probando", desc: "Meses probando sin un sistema claro de testeo y optimización. Sin metodología, cada cambio es una apuesta, no una decisión basada en data." },
  ];

  return (
    <section id="problema" className="relative py-28 md:py-36">
      {/* Deep indigo background */}
      <div className="absolute inset-0 bg-[#120A24]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C16] via-[#120A24] to-[#120A24]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,80,200,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-purple-300/40 text-xs tracking-[0.25em] uppercase">El problema real</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              No es falta de anuncios,<br />es falta de <span className="bg-gradient-to-r from-[#A78BFA] to-[#C9A96E] bg-clip-text text-transparent">estrategia</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <ScrollReveal key={i} d={i * 0.12}>
              <TiltCard>
                <div className="group p-8 rounded-2xl border border-purple-400/[0.08] bg-gradient-to-br from-purple-400/[0.04] to-transparent hover:border-purple-400/20 hover:shadow-[0_0_40px_rgba(120,80,200,0.08)] transition-all duration-500 h-full">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white/90">{p.title}</h3>
                  <p className="mt-2 text-white/40 leading-relaxed text-sm">{p.desc}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#081A16] to-transparent" />
    </section>
  );
}

/* ─── ESTRATEGIA — Deep emerald/teal ─── */
function EstrategiaSection() {
  return (
    <section id="estrategia" className="relative py-28 md:py-36">
      {/* Deep emerald background */}
      <div className="absolute inset-0 bg-[#081A16]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,110,0.03)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="text-emerald-400/40 text-xs tracking-[0.25em] uppercase">La solución</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                Sistema <span className="bg-gradient-to-r from-[#34D399] to-[#C9A96E] bg-clip-text text-transparent">Filtro</span>
              </h2>
              <p className="mt-6 text-white/45 leading-relaxed">
                Un sistema propietario de 5 fases diseñado para filtrar, cualificar y convertir tu audiencia ideal en clientes rentables. No es una plantilla, es una metodología adaptada a cada marca que trabaja conmigo.
              </p>
              <p className="mt-4 text-white/45 leading-relaxed">
                Cada fase está diseñada para eliminar el ruido y concentrar tu inversión en los segmentos que realmente convierten, reduciendo el costo por adquisición y maximizando el retorno de cada peso invertido en Meta Ads.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/30 to-transparent" />
                <span className="text-emerald-400/40 text-xs tracking-[0.2em] uppercase">5 fases</span>
                <div className="h-px flex-1 bg-gradient-to-l from-emerald-400/30 to-transparent" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal d={0.2}>
            <div className="space-y-4">
              {[
                { n: "01", t: "Auditoría profunda", d: "Analizamos tu cuenta, tu pixel, tu embudo y tu competencia. Sin diagnóstico, no hay receta." },
                { n: "02", t: "Estrategia personalizada", d: "Diseñamos la arquitectura de campañas, audiences y creativos específicos para tu marca." },
                { n: "03", t: "Implementación técnica", d: "Pixel, CAPI, eventos personalizados, catálogos. Todo configurado con precisión quirúrgica." },
                { n: "04", t: "Optimización continua", d: "Testeo A/B, ajustes diarios, escalado inteligente. No lanzamos y olvidamos." },
                { n: "05", t: "Reportes y transparencia", d: "Dashboards en tiempo real, reuniones semanales y reportes mensuales con insights accionables." },
              ].map((f, i) => (
                <div key={i} className="group flex gap-5 p-5 rounded-xl border border-emerald-400/[0.06] bg-emerald-400/[0.02] hover:border-emerald-400/15 hover:bg-emerald-400/[0.05] transition-all duration-400">
                  <span className="text-emerald-400/50 text-sm font-mono mt-0.5">{f.n}</span>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm">{f.t}</h4>
                    <p className="text-white/35 text-xs mt-1 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A100A] to-transparent" />
    </section>
  );
}

/* ─── CAPACIDADES — Deep copper/amber ─── */
function CapacidadesSection() {
  const caps = [
    { title: "Meta Ads Management", desc: "Gestión integral de campañas en Facebook e Instagram con optimización diaria. Desde la estructura de campañas hasta el ajuste fino de audiences y bids, cada decisión se toma con data.", accent: "from-amber-400/20 to-amber-600/5" },
    { title: "Performance Strategy", desc: "Diseño de estrategias de performance centradas en ROI real, no en vanity metrics. Cada campaña tiene un objetivo de negocio claro y un sistema de medición que valida cada peso invertido.", accent: "from-orange-400/15 to-transparent" },
    { title: "Data & Analytics", desc: "Implementación de tracking avanzado, CAPI, eventos personalizados y dashboards en tiempo real. Si no se puede medir, no se puede optimizar, y yo me aseguro de que todo se mida.", accent: "from-yellow-400/15 to-transparent" },
    { title: "Creative Strategy", desc: "Dirección creativa de ads que convierten, no solo que se ven bien. Copy persuasivo, formatos ganadores y testing sistemático de creativos para encontrar las combinaciones que escalan.", accent: "from-amber-300/10 to-amber-500/5" },
  ];

  return (
    <section id="capacidades" className="relative py-28 md:py-36">
      {/* Deep copper/amber background */}
      <div className="absolute inset-0 bg-[#1A100A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,169,110,0.04)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-amber-400/40 text-xs tracking-[0.25em] uppercase">Lo que hago</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Capacidades de <span className="bg-gradient-to-r from-[#F59E0B] to-[#C9A96E] bg-clip-text text-transparent">performance</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {caps.map((c, i) => (
            <ScrollReveal key={i} d={i * 0.1}>
              <TiltCard>
                <div className="group relative p-8 rounded-2xl border border-amber-400/[0.08] overflow-hidden hover:border-amber-400/20 transition-all duration-500 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center mb-5">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white/90">{c.title}</h3>
                    <p className="mt-3 text-white/40 leading-relaxed text-sm">{c.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0C1428] to-transparent" />
    </section>
  );
}

/* ─── PROCESO — Deep royal blue ─── */
function ProcesoSection() {
  const steps = [
    { n: "01", t: "Solicitud", d: "Completas el formulario y agendamos una llamada de diagnóstico de 30 minutos sin compromiso.", icon: "📋" },
    { n: "02", t: "Diagnóstico", d: "Analizamos tu situación actual, objetivos y identificamos las oportunidades de mejora inmediata en tus campañas.", icon: "🔍" },
    { n: "03", t: "Propuesta", d: "Recibes una propuesta personalizada con estrategia, tiempos, inversión recomendada y proyección de resultados.", icon: "📊" },
    { n: "04", t: "Lanzamiento", d: "Implementamos el Sistema Filtro completo y comenzamos a optimizar desde el día uno con foco en resultados.", icon: "🚀" },
  ];

  return (
    <section id="proceso" className="relative py-28 md:py-36">
      {/* Deep royal blue background */}
      <div className="absolute inset-0 bg-[#0C1428]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-blue-400/40 text-xs tracking-[0.25em] uppercase">Cómo empezamos</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              De la duda al <span className="bg-gradient-to-r from-[#3B82F6] to-[#C9A96E] bg-clip-text text-transparent">resultado</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/15 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((s, i) => (
              <ScrollReveal key={i} d={i * 0.15}>
                <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className={`p-6 rounded-2xl border border-blue-400/[0.08] bg-blue-400/[0.03] hover:border-blue-400/20 transition-all duration-500 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-blue-400/40 text-xs font-mono">{s.n}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white/90">{s.t}</h3>
                      <p className="mt-2 text-white/40 text-sm leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-[#0C1428] border-2 border-blue-400/30 items-center justify-center relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  </div>
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0C1A10] to-transparent" />
    </section>
  );
}

/* ─── RESOURCES — Deep forest green ─── */
function ResourcesSection() {
  const resources = [
    { t: "Guía: 5 errores que matan tus campañas", tag: "Guía gratuita" },
    { t: "Checklist de auditoría de pixel", tag: "Checklist" },
    { t: "Plantilla de estructura de campañas", tag: "Template" },
    { t: "Calculadora de ROAS en tiempo real", tag: "Herramienta" },
  ];

  return (
    <section className="relative py-28 md:py-36">
      {/* Deep forest green background */}
      <div className="absolute inset-0 bg-[#0C1A10]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-green-400/40 text-xs tracking-[0.25em] uppercase">Recursos gratuitos</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Herramientas para <span className="bg-gradient-to-r from-[#22C55E] to-[#C9A96E] bg-clip-text text-transparent">empezar hoy</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((r, i) => (
            <ScrollReveal key={i} d={i * 0.08}>
              <div className="group p-6 rounded-2xl border border-green-400/[0.08] bg-green-400/[0.02] hover:border-green-400/20 hover:bg-green-400/[0.05] transition-all duration-500 cursor-pointer h-full">
                <span className="inline-block px-2.5 py-1 rounded-full bg-green-400/[0.08] text-green-400/70 text-[10px] tracking-wider uppercase">{r.tag}</span>
                <h4 className="mt-4 text-white/80 font-medium text-sm leading-snug">{r.t}</h4>
                <div className="mt-4 flex items-center text-green-400/50 text-xs group-hover:text-green-400/80 transition-colors">
                  Descargar <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A0C18] to-transparent" />
    </section>
  );
}

/* ─── CONTACT — Deep wine/burgundy ─── */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-28 md:py-36">
      {/* Deep wine/burgundy background */}
      <div className="absolute inset-0 bg-[#1A0C18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,110,0.05)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-pink-400/40 text-xs tracking-[0.25em] uppercase">¿Listo para escalar?</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Hablemos de tu <span className="bg-gradient-to-r from-[#F472B6] to-[#C9A96E] bg-clip-text text-transparent">potencial</span>
            </h2>
            <p className="mt-6 text-white/40 max-w-xl mx-auto leading-relaxed">
              Agenda una llamada de diagnóstico de 30 minutos. Sin compromiso, sin venderte algo que no necesitas. Solo un análisis honesto de tu situación actual y un plan claro para mejorar.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/carolina-mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] text-[#060918] font-semibold text-base hover:shadow-[0_0_36px_rgba(201,169,110,0.4)] transition-all duration-300"
              >
                Agendar llamada gratuita
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href="https://wa.me/5223111396364"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-pink-400/20 text-white/70 font-medium text-base hover:border-pink-400/50 hover:text-[#F472B6] transition-all duration-300"
              >
                WhatsApp directo
              </a>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-8 text-white/30 text-sm">
              <a href="mailto:carolinajuarezbetancourt@gmail.com" className="hover:text-[#C9A96E]/70 transition-colors">
                carolinajuarezbetancourt@gmail.com
              </a>
              <span className="hidden sm:inline text-pink-400/20">|</span>
              <a href="https://wa.me/5223111396364" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A96E]/70 transition-colors">
                +52 231 113 96364
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Fade to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060918] to-transparent" />
    </section>
  );
}

/* ─── FOOTER — Back to deep navy ─── */
function Footer() {
  return (
    <footer className="relative border-t border-[#C9A96E]/[0.06] py-10">
      <div className="absolute inset-0 bg-[#060918]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold bg-gradient-to-r from-[#C9A96E] to-[#E8D5B5] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair)" }}>
            CAROLINA
          </span>
          <span className="text-white/20 text-xs">|</span>
          <span className="text-white/25 text-xs">Performance Marketing & Meta Ads</span>
        </div>
        <p className="text-white/20 text-xs">&copy; 2026 Carolina Betancourt. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main className="bg-[#060918] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Marquee />
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
