"use client";

import { trackWhatsAppClick , trackMetaLead} from '@/lib/gtag'

import { useState, useEffect } from "react";

export default function ServiciosSection() {
  const [isMob, setIsMob] = useState(false);
  useEffect(() => {
    setIsMob(window.innerWidth < 768);
    const fn = () => setIsMob(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const coreServices = [
    { t: "Gestión completa de Meta Ads", s: "Retainer mensual" },
    { t: "Auditoría Meta Business Suite", s: "Entregable en 48h" },
    { t: "Setup de cuenta desde cero", s: "Servicio único" },
    { t: "Estrategia de Paid Media", s: "Consultoría" },
  ];

  const compServices = [
    { i: "🎨", t: "Branding & Identidad", x: "Naming, logo, paleta, tipografía y manual de marca. Una marca que no se ve profesional no se compra." },
    { i: "💻", t: "Diseño Web", x: "Landing pages y sitios web orientados a conversión. No solo bonitos — diseñados para vender." },
    { i: "📷", t: "Fotografía", x: "De producto y marca personal. El contenido visual es el 70% del resultado de un anuncio." },
    { i: "📊", t: "Estrategia Digital", x: "Auditoría de marca, análisis de competencia y plan de marketing basado en datos reales." },
    { i: "🧾", t: "Contabilidad", x: "Para negocios en crecimiento que necesitan orden fiscal. En alianza con especialista certificada." },
  ];

  const packages = [
    { n: "ARRANQUE", d: "Para negocios que empiezan y quieren hacerlo bien desde el día uno.", items: ["Identidad visual completa", "Landing page de conversión", "Setup de Meta Ads", "Primera campaña activada", "Sesión de estrategia"], f: false, b: null },
    { n: "ESCALA", d: "Para negocios que ya invierten en Meta Ads pero no están viendo los resultados que deberían.", items: ["Auditoría completa Meta Business", "Rediseño de estructura de campañas", "Gestión mensual Meta Ads", "Reporte con proyección de escalamiento"], f: true, b: "MÁS SOLICITADO" },
    { n: "PRESENCIA TOTAL", d: "Marca, web y publicidad funcionando como un sistema coherente y medible.", items: ["Identidad visual completa", "Sitio web completo", "Fotografía de producto o marca", "Estrategia de Paid Media", "Gestión mensual Meta Ads incluida"], f: false, b: null },
  ];

  return (<>
    <section id="servicios" style={{ background: "#F5F6FA", padding: isMob ? "60px 24px" : "100px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-jost)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase" as const, color: "#4A7CF7", marginBottom: 16 }}>LO QUE HAGO</p>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: isMob ? 32 : 42, lineHeight: 1.1, color: "#0A0F1E", marginBottom: 18 }}>Un servicio principal.<br/>Todo lo que necesitas alrededor.</h2>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 16, color: "rgba(10,15,30,0.7)", maxWidth: 520, margin: "0 auto", lineHeight: 1.85 }}>Mi especialidad es Meta Ads — ahí es donde están mis mejores resultados. El resto de servicios existe para que la estrategia funcione de forma completa.</p>
      </div>
    </section>

    <section style={{ background: "#4A7CF7", padding: isMob ? "60px 24px" : "100px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-jost)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>CORE SERVICE</p>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: isMob ? 32 : 42, lineHeight: 1.1, color: "#FFFFFF", marginBottom: 18 }}>Paid Media &amp; Meta Ads</h2>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 520, lineHeight: 1.85, marginBottom: 40 }}>Diseño y gestiono sistemas de inversión publicitaria en Meta que escalan marcas con rentabilidad documentada. No se trata de prender anuncios — se trata de construir un sistema que aprende y mejora cada ciclo.</p>
        <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {coreServices.map((sv, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: 15, color: "#FFFFFF", marginBottom: 4 }}>{sv.t}</div>
              <div style={{ fontFamily: "var(--font-jost)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{sv.s}</div>
            </div>
          ))}
        </div>
        <a href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados." target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#FFFFFF", color: "#4A7CF7", fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" as const, padding: "14px 28px", borderRadius: 3, textDecoration: "none", transition: "all 0.3s" }}
        onClick={() => { trackWhatsAppClick(); trackMetaLead(); }}
          onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.15)";}}
          onMouseLeave={function(e){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
          Quiero saber qué está fallando en mi cuenta
        </a>
      </div>
    </section>

    <section style={{ background: "#F5F6FA", padding: isMob ? "60px 24px" : "100px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: isMob ? 24 : 30, color: "#0A0F1E", marginBottom: 12 }}>Servicios complementarios</h3>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 16, color: "rgba(10,15,30,0.5)", marginBottom: 40 }}>Para que la estrategia tenga todo lo que necesita para funcionar.</p>
        <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {compServices.slice(0, 3).map((sv, idx) => (
            <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E6F0", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(74,124,247,0.1)";}}
              onMouseLeave={function(e){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{sv.i}</div>
              <div style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: 16, color: "#0A0F1E", marginBottom: 8 }}>{sv.t}</div>
              <div style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 14, color: "rgba(10,15,30,0.6)", lineHeight: 1.7 }}>{sv.x}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "repeat(2, 1fr)", gap: 20, maxWidth: isMob ? "100%" : "66.666%", margin: "20px auto 0", justifyContent: "center" }}>
          {compServices.slice(3).map((sv, idx) => (
            <div key={idx+3} style={{ background: "#FFFFFF", border: "1px solid #E2E6F0", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(74,124,247,0.1)";}}
              onMouseLeave={function(e){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{sv.i}</div>
              <div style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: 16, color: "#0A0F1E", marginBottom: 8 }}>{sv.t}</div>
              <div style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 14, color: "rgba(10,15,30,0.6)", lineHeight: 1.7 }}>{sv.x}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ background: "#0A0F1E", padding: isMob ? "60px 24px" : "100px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-jost)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase" as const, color: "#4A7CF7", marginBottom: 16 }}>PAQUETES</p>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: isMob ? 32 : 42, lineHeight: 1.1, color: "#FFFFFF", marginBottom: 18 }}>Todo junto,<br/>con coherencia estratégica.</h2>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 60px", lineHeight: 1.85 }}>Para cuando necesitas más de un servicio funcionando como sistema.</p>
        <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1fr 1fr", gap: 24, textAlign: "left" }}>
          {packages.map((pkg, idx) => (
            <div key={idx} style={{ background: pkg.f ? "rgba(74,124,247,0.08)" : "rgba(255,255,255,0.05)", border: pkg.f ? "1px solid #4A7CF7" : "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "32px 28px" }}>
              {pkg.b && <div style={{ fontFamily: "var(--font-jost)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "#4A7CF7", marginBottom: 12, background: "rgba(74,124,247,0.15)", display: "inline-block", padding: "4px 12px", borderRadius: 100 }}>{pkg.b}</div>}
              <h4 style={{ fontFamily: "var(--font-jost)", fontWeight: 600, fontSize: 20, color: "#FFFFFF", marginBottom: 12, letterSpacing: 2 }}>{pkg.n}</h4>
              <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24 }}>{pkg.d}</p>
              {pkg.items.map((it) => (<div key={it} style={{ fontFamily: "var(--font-jost)", fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}><span style={{ color: "#4A7CF7", marginRight: 8 }}>→</span>{it}</div>))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>¿No sabes cuál necesitas? Hablemos.</p>
          <a href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados." target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#3B82F6", color: "#FFFFFF", fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, padding: "14px 28px", borderRadius: 3, textDecoration: "none", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
          onClick={() => { trackWhatsAppClick(); trackMetaLead(); }}
            onMouseEnter={function(e){e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(37,99,235,0.25)";}}
            onMouseLeave={function(e){e.currentTarget.style.background="#3B82F6";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            Agendar diagnóstico gratuito
          </a>
        </div>
      </div>
    </section>
  </>);
}
