"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NAVY = "#0A0F1E";
const BLUE = "#4A7CF7";
const WHITE = "#FFFFFF";

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

export default function CasoDeExitoSection() {
  const metrics = [
    { value: "-52%", label: "Reducción de CPA", detail: "de $10.55 a $5.05 MXN" },
    { value: "8,000+", label: "Conversaciones generadas", detail: "a WhatsApp" },
    { value: "+91%", label: "Mejora en CTR", detail: "de 1.10% a 2.10%" },
    { value: "1.2M", label: "Reproducciones de video", detail: "" },
    { value: "$5.05", label: "CPA mínimo alcanzado", detail: "" },
    { value: "15 meses", label: "Gestión continua", detail: "documentada" },
  ];
  return (
    <section style={{ background: NAVY, padding: "6rem 2rem" }}>
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
            Resultados reales
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              color: WHITE,
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            Resultados reales. Números que no mienten.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 400,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.45)",
              marginBottom: "1.5rem",
            }}
          >
            Retail de muebles · Mérida, Yucatán · 15 meses de gestión
          </p>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.75,
              maxWidth: 700,
              marginBottom: "3rem",
            }}
          >
            Negocio físico con presupuesto limitado (~$4,200 MXN/mes), sin historial en Meta Ads y con un objetivo claro: generar conversaciones reales con compradores locales, no métricas de vanidad.
          </p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="caso-grid">
          {metrics.map((m, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(74,124,247,0.15)",
                  borderRadius: 12,
                  padding: "2rem 1.5rem",
                  textAlign: "center" as const,
                  transition: "transform 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(74,124,247,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(74,124,247,0.15)";
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 600,
                    fontSize: "clamp(2rem,4vw,2.8rem)",
                    color: BLUE,
                    lineHeight: 1.1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {m.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    color: WHITE,
                    marginBottom: "0.25rem",
                  }}
                >
                  {m.label}
                </p>
                {m.detail && (
                  <p
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {m.detail}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.75,
              maxWidth: 700,
              marginTop: "3rem",
            }}
          >
            Presupuesto pequeño no significa resultados pequeños. Significa que cada peso tiene que justificarse. Eso es exactamente lo que hago.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a
              href="#sistema-filtro"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-jost)",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: WHITE,
                background: BLUE,
                padding: "0.85rem 2rem",
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(74,124,247,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Ver cómo funciona el Sistema Filtro
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
