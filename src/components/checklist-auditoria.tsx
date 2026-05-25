"use client";

import { useState, useEffect } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────
const BG       = "#0a0a0a";
const SURFACE  = "#111111";
const BORDER   = "#1f1f1f";
const BORDER2  = "#2a2a2a";
const TEXT     = "#f0ece4";
const MUTED    = "#5a5a5a";
const SUBTLE   = "#333333";
const ACCENT   = "#c8f135";
const DANGER   = "#ff4d4d";
const WARNING  = "#f5a623";

// ─── Types ────────────────────────────────────────────────────────────────
interface CheckItem {
  id: string;
  text: string;
  severity: "critical" | "high";
}

interface Category {
  id: string;
  num: string;
  label: string;
  items: CheckItem[];
}

interface Diagnosis {
  level: string;
  color: string;
  borderColor: string;
  title: string;
  body: string;
  cta: string;
  waMsg: string;
}

// ─── Los 20 puntos ────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: "tecnica",
    num: "01",
    label: "Configuración Técnica",
    items: [
      { id: "pixel", text: "Mi Píxel está instalado y verificado correctamente en Business Manager", severity: "critical" },
      { id: "eventos", text: "Los eventos del Píxel están disparando bien: Compra, Lead y Ver Contenido", severity: "critical" },
      { id: "capi", text: "Tengo Conversions API (CAPI) configurada — no solo el Píxel", severity: "critical" },
      { id: "flags", text: "Mi cuenta no tiene restricciones, advertencias ni flags de Meta", severity: "critical" },
    ],
  },
  {
    id: "estructura",
    num: "02",
    label: "Estructura de Campañas",
    items: [
      { id: "objetivo", text: "El objetivo de mis campañas es correcto para la etapa en la que está mi negocio", severity: "critical" },
      { id: "funnel", text: "Tengo campañas separadas para audiencias frías, tibias y retargeting", severity: "critical" },
      { id: "frecuencia", text: "La frecuencia de mis anuncios está bajo control — no bombardeo a las mismas personas", severity: "high" },
    ],
  },
  {
    id: "creativos",
    num: "03",
    label: "Creativos y Copy",
    items: [
      { id: "hook", text: "Mis anuncios paran el scroll en los primeros 3 segundos", severity: "critical" },
      { id: "dolor", text: "Mi copy habla del problema del cliente — no de mi producto o servicio", severity: "critical" },
      { id: "cta", text: "Mi CTA dice exactamente qué pasa cuando hacen clic — no solo 'Más información'", severity: "high" },
      { id: "coherencia", text: "El anuncio y la landing page dicen exactamente lo mismo — sin brecha de expectativa", severity: "critical" },
    ],
  },
  {
    id: "resultados",
    num: "04",
    label: "Resultados vs Realidad",
    items: [
      { id: "roas", text: "Sé cuál es mi ROAS real — incluyendo honorarios, herramientas y producción de creativos", severity: "critical" },
      { id: "cpl", text: "Sé cuál es mi Costo por Lead real — no solo el que reporta Meta", severity: "critical" },
      { id: "conversion", text: "Tengo medida la tasa de conversión de mi landing page", severity: "critical" },
      { id: "ticket", text: "Mi ticket promedio justifica matemáticamente el costo por lead que estoy pagando", severity: "critical" },
    ],
  },
  {
    id: "mercado",
    num: "05",
    label: "Mercado y Posicionamiento",
    items: [
      { id: "persona", text: "Sé exactamente a quién le hablo — con problema específico, no solo edad y género", severity: "critical" },
      { id: "diferencia", text: "Mi mensaje se diferencia del de mi competencia — no suena igual que todos los demás", severity: "high" },
    ],
  },
  {
    id: "ventas",
    num: "06",
    label: "Sistema de Ventas",
    items: [
      { id: "proceso", text: "Tengo un proceso claro de seguimiento al lead — no improviso ni espero que el cliente vuelva a escribir", severity: "critical" },
      { id: "velocidad", text: "Mi tiempo de respuesta al lead es menor a 5 minutos", severity: "critical" },
      { id: "cierre", text: "Sé cuál es mi tasa de cierre real — tengo el número exacto", severity: "high" },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items);
const TOTAL = ALL_ITEMS.length;

// ─── Diagnosis logic ──────────────────────────────────────────────────────
function getDiagnosis(checkedSet: Set<string>, total: number): Diagnosis {
  const checked = checkedSet.size;
  const failed = total - checked;
  const criticalItems = ALL_ITEMS.filter((i) => i.severity === "critical");
  const failedCritical = criticalItems.filter((i) => !checkedSet.has(i.id)).length;

  if (checked === total) {
    return {
      level: "ok",
      color: ACCENT,
      borderColor: ACCENT + "44",
      title: "Tu sistema está sano. Ahora la pregunta es cuánto puedes escalar.",
      body: "Pasaste los 20 puntos. Eso te pone en el 10% de cuentas que tienen el sistema en orden. El siguiente paso no es arreglar — es escalar. Y escalar sin el sistema correcto es quemar presupuesto más rápido.",
      cta: "Quiero escalar mis campañas →",
      waMsg: "Hola Carolina, acabo de hacer el checklist de auditoría y pasé los 20 puntos. Mi sistema está bien configurado y quiero explorar cómo escalar. ¿Podemos hablar?",
    };
  }

  if (failedCritical >= 5 || failed >= 12) {
    return {
      level: "critical",
      color: DANGER,
      borderColor: DANGER + "33",
      title: `${failed} puntos fallidos. Tu presupuesto está financiando errores, no resultados.`,
      body: `Con ${failedCritical} puntos críticos sin resolver, cada peso que inviertes en ads está trabajando en tu contra. No es un problema de presupuesto — es un problema de sistema. Y un sistema roto escala las pérdidas, no las ganancias.`,
      cta: "Quiero que revises mi cuenta →",
      waMsg: `Hola Carolina, hice el checklist y tengo ${failed} puntos fallidos, ${failedCritical} de ellos críticos. Creo que necesito una auditoría real. ¿Podemos hablar?`,
    };
  }

  if (failedCritical >= 2 || failed >= 6) {
    return {
      level: "warning",
      color: WARNING,
      borderColor: WARNING + "33",
      title: `${failed} puntos con oportunidad de mejora. Tienes fugas que están costando dinero ahora mismo.`,
      body: `No estás en crisis, pero sí estás dejando dinero sobre la mesa. Con ${failedCritical} puntos críticos sin resolver, tu cuenta está funcionando por debajo de su potencial real. Eso se corrige — pero hay que saber exactamente por dónde empezar.`,
      cta: "Quiero identificar mis fugas →",
      waMsg: `Hola Carolina, hice el checklist y tengo ${failed} puntos fallidos, ${failedCritical} críticos. Quiero entender cuáles son mis fugas principales y cómo resolverlas. ¿Podemos hablar?`,
    };
  }

  return {
    level: "low",
    color: ACCENT,
    borderColor: ACCENT + "22",
    title: `${failed} puntos a optimizar. Base sólida con espacio de mejora claro.`,
    body: "Tu cuenta tiene buena base. Los puntos que fallaste no son incendios — son ineficiencias que, resueltas, van a mejorar el rendimiento de forma medible. Vale la pena revisarlos con orden.",
    cta: "Quiero optimizar los puntos que fallé →",
    waMsg: `Hola Carolina, hice el checklist y tengo ${failed} puntos que mejorar. Quiero revisar cuáles tienen mayor impacto y por dónde arrancar. ¿Podemos hablar?`,
  };
}

// ─── Component ────────────────────────────────────────────────────────────
export default function ChecklistAuditoria() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (revealed) {
      setTimeout(() => setAnimIn(true), 50);
    } else {
      setAnimIn(false);
    }
  }, [revealed]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    if (revealed) setRevealed(false);
  };

  const checkedCount = checked.size;
  const progress = Math.round((checkedCount / TOTAL) * 100);
  const diag = getDiagnosis(checked, TOTAL);
  const waUrl = `https://wa.me/522292924043?text=${encodeURIComponent(diag.waMsg)}`;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .cl-wrap * { box-sizing: border-box; }
        .cl-item { transition: background 0.15s; }
        .cl-item:hover { background: #161616 !important; }
        .cl-checkbox { transition: all 0.15s; cursor: pointer; }
        .cl-checkbox:hover { border-color: ${ACCENT} !important; }
        .cl-btn-calc {
          background: ${ACCENT};
          color: #0a0a0a;
          border: none;
          border-radius: 3px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          width: 100%;
        }
        .cl-btn-calc:hover { background: #aad420; transform: translateY(-1px); }
        .cl-btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${ACCENT};
          color: #0a0a0a;
          border: none;
          border-radius: 3px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 13px 22px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s;
        }
        .cl-btn-wa:hover { background: #aad420; }
        .cl-diag {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .cl-diag.in {
          opacity: 1;
          transform: translateY(0);
        }
        .cl-progress-bar {
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      <section
        id="checklist-section"
        className="cl-wrap"
        style={{
          background: BG,
          color: TEXT,
          fontFamily: "'DM Mono', monospace",
          padding: "5rem 1.5rem",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, margin: "0 0 16px" }}>
          Recurso gratuito · Sistema Filtro
        </p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          color: TEXT,
          margin: "0 0 12px",
        }}>
          Los 20 puntos que reviso<br />
          <span style={{ color: ACCENT }}>antes de tocar cualquier campaña.</span>
        </h2>
        <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: "0 0 2.5rem", maxWidth: 540 }}>
          Marca los que sí tienes resueltos. Al terminar te digo exactamente en qué estado está tu cuenta — sin rodeos.
        </p>

        {/* ── Progress bar ── */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}>Progreso</span>
            <span style={{ fontSize: 13, color: checkedCount === TOTAL ? ACCENT : TEXT, fontWeight: 500 }}>
              {checkedCount} / {TOTAL}
            </span>
          </div>
          <div style={{ height: 2, background: BORDER2, borderRadius: 2, overflow: "hidden" }}>
            <div
              className="cl-progress-bar"
              style={{
                height: "100%",
                width: `${progress}%`,
                background: checkedCount === TOTAL ? ACCENT : `linear-gradient(90deg, ${ACCENT}88, ${ACCENT})`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* ── Categories ── */}
        {CATEGORIES.map((cat) => (
          <div key={cat.id} style={{ marginBottom: "2rem" }}>
            {/* Category label */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: `1px solid ${BORDER}`,
            }}>
              <span style={{ fontSize: 10, color: ACCENT, fontWeight: 500, letterSpacing: "0.1em" }}>{cat.num}</span>
              <span style={{ fontSize: 10, color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase" }}>{cat.label}</span>
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {cat.items.map((item) => {
                const isChecked = checked.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="cl-item"
                    onClick={() => toggle(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "12px 10px",
                      cursor: "pointer",
                      borderRadius: 3,
                      background: isChecked ? "#141a0a" : "transparent",
                      border: `1px solid ${isChecked ? ACCENT + "22" : "transparent"}`,
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      className="cl-checkbox"
                      style={{
                        width: 18,
                        height: 18,
                        minWidth: 18,
                        border: `1.5px solid ${isChecked ? ACCENT : BORDER2}`,
                        borderRadius: 2,
                        background: isChecked ? ACCENT : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      {isChecked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>

                    {/* Text */}
                    <span style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: isChecked ? MUTED : TEXT,
                      textDecoration: isChecked ? "line-through" : "none",
                      transition: "color 0.15s",
                    }}>
                      {item.text}
                    </span>

                    {/* Severity dot */}
                    <div style={{
                      width: 5,
                      height: 5,
                      minWidth: 5,
                      borderRadius: "50%",
                      background: item.severity === "critical" ? DANGER : WARNING,
                      marginTop: 7,
                      opacity: isChecked ? 0.2 : 0.7,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── Severity legend ── */}
        <div style={{ display: "flex", gap: 20, marginBottom: "2rem", paddingTop: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: DANGER }} />
            <span style={{ fontSize: 11, color: MUTED }}>Crítico</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: WARNING }} />
            <span style={{ fontSize: 11, color: MUTED }}>Alto</span>
          </div>
        </div>

        {/* ── CTA button ── */}
        <button
          className="cl-btn-calc"
          onClick={() => { setRevealed(true); setTimeout(() => document.getElementById("cl-diagnosis")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); }}
        >
          Ver diagnóstico de mi cuenta →
        </button>

        {/* ── Diagnosis ── */}
        {revealed && (
          <div
            id="cl-diagnosis"
            className={`cl-diag ${animIn ? "in" : ""}`}
            style={{
              marginTop: "2rem",
              border: `1px solid ${diag.borderColor}`,
              borderRadius: 4,
              padding: "1.75rem",
              background: SURFACE,
            }}
          >
            {/* Score bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "1.25rem" }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 48,
                fontWeight: 800,
                color: diag.color,
                lineHeight: 1,
              }}>
                {checkedCount}<span style={{ fontSize: 22, color: MUTED }}>/{TOTAL}</span>
              </div>
              <div>
                <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                  puntos resueltos
                </div>
                <div style={{ height: 3, width: 140, background: BORDER2, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: diag.color, borderRadius: 2 }} />
                </div>
              </div>
            </div>

            {/* Title */}
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              fontWeight: 700,
              color: diag.color,
              margin: "0 0 10px",
              lineHeight: 1.3,
            }}>
              {diag.title}
            </p>

            {/* Body */}
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: "0 0 1.5rem" }}>
              {diag.body}
            </p>

            {/* WhatsApp CTA */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="cl-btn-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {diag.cta}
            </a>

            {/* Fine print */}
            <p style={{ fontSize: 11, color: SUBTLE, marginTop: "1rem", lineHeight: 1.6 }}>
              El mensaje que llega a WhatsApp ya incluye tu resultado específico — no arrancamos desde cero.
            </p>
          </div>
        )}

        {/* ── Footer note ── */}
        <p style={{ fontSize: 11, color: SUBTLE, marginTop: "2rem", lineHeight: 1.8, borderTop: `1px solid ${BORDER}`, paddingTop: "1.25rem" }}>
          Este checklist refleja el proceso real que Carolina aplica en cada auditoría.
          Los puntos marcados en rojo son críticos — son los que más rápido drenan el presupuesto.
        </p>
      </section>
    </>
  );
}
