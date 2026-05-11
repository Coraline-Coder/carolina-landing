"use client";

import { useState } from "react";

// ─── tokens que coinciden con tu landing ───────────────────────────────────
const T = {
  bg:        "#0a0a0a",
  surface:   "#111111",
  border:    "#1f1f1f",
  borderHi:  "#2e2e2e",
  text:      "#f0ece4",
  muted:     "#6b6b6b",
  subtle:    "#3a3a3a",
  accent:    "#c8f135",   // verde lima — igual al CTA de tu landing
  accentDim: "#8aab1e",
  danger:    "#ff4d4d",
  warning:   "#f5a623",
  success:   "#c8f135",
};

// ─── estilos reutilizables ─────────────────────────────────────────────────
const S = {
  wrap: {
    background: T.bg,
    color: T.text,
    fontFamily: "'DM Mono', 'Courier New', monospace",
    padding: "4rem 1.5rem",
    maxWidth: 760,
    margin: "0 auto",
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: T.muted,
    marginBottom: 12,
  },
  heading: {
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    color: T.text,
    margin: "0 0 0.75rem",
    fontFamily: "'DM Sans', sans-serif",
  },
  sub: {
    fontSize: 15,
    color: T.muted,
    lineHeight: 1.6,
    margin: "0 0 2.5rem",
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.muted,
    margin: "2rem 0 1rem",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  labelLine: {
    flex: 1,
    height: 1,
    background: T.border,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: T.muted,
    letterSpacing: "0.02em",
  },
  input: {
    background: T.surface,
    border: 1px solid ,
    borderRadius: 4,
    color: T.text,
    fontSize: 15,
    padding: "10px 14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  hint: {
    fontSize: 11,
    color: T.subtle,
    lineHeight: 1.5,
  },
  btn: {
    display: "block",
    width: "100%",
    background: T.accent,
    color: "#0a0a0a",
    border: "none",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "14px 24px",
    cursor: "pointer",
    marginTop: "2rem",
    fontFamily: "inherit",
    transition: "background 0.15s, transform 0.1s",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 1,
    border: 1px solid ,
    borderRadius: 4,
    overflow: "hidden",
    margin: "1.5rem 0",
  },
  metricCard: {
    background: T.surface,
    padding: "16px 18px",
  },
  metricLabel: {
    fontSize: 11,
    color: T.muted,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    margin: "0 0 6px",
  },
  metricValue: {
    fontSize: 26,
    fontWeight: 700,
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1,
  },
  diagBox: {
    border: 1px solid,
    borderRadius: 4,
    padding: "1.5rem",
    margin: "1.5rem 0 0",
  },
  diagTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 10px",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.2,
  },
  diagBody: {
    fontSize: 14,
    lineHeight: 1.7,
    margin: "0 0 1.25rem",
  },
  waBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: T.accent,
    color: "#0a0a0a",
    border: "none",
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "12px 20px",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
  },
  formulaNote: {
    fontSize: 11,
    color: T.subtle,
    lineHeight: 1.9,
    borderTop: 1px solid ,
    paddingTop: "1.25rem",
    marginTop: "1.5rem",
  },
};

// ─── helpers ───────────────────────────────────────────────────────────────
const fmtC = (n) =>
  "$" + Math.round(n).toLocaleString("es-MX");

const fmtX = (n) =>
  n.toFixed(2) + "x";

const fmtPct = (n) =>
  n.toFixed(1) + "%";

// ─── component ────────────────────────────────────────────────────────────
export default function CalculadoraROAS() {
  const [vals, setVals] = useState({
    revenue: "", cogs: "", adspend: "", agency: "",
    tools: "", creatives: "", time: "", leads: "",
  });
  const [result, setResult] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const set = (k) => (e) => setVals((p) => ({ ...p, [k]: e.target.value }));

  const n = (k) => parseFloat(vals[k]) || 0;

  function calculate() {
    const revenue   = n("revenue");
    const cogs      = n("cogs");
    const adspend   = n("adspend");
    const agency    = n("agency");
    const tools     = n("tools");
    const creatives = n("creatives");
    const time      = n("time");
    const leads     = n("leads");

    if (!revenue || !adspend) return;

    const totalCost       = adspend + agency + tools + creatives + time;
    const grossMargin     = revenue - cogs;
    const grossMarginPct  = revenue > 0 ? (grossMargin / revenue) * 100 : 0;
    const roasSimple      = revenue / adspend;
    const roasReal        = totalCost > 0 ? revenue / totalCost : 0;
    const breakEven       = grossMarginPct > 0 ? 100 / grossMarginPct : 0;
    const netProfit       = grossMargin - totalCost;
    const cpl             = leads > 0 && totalCost > 0 ? totalCost / leads : null;
    const hiddenCosts     = totalCost - adspend;

    let status; // "loss" | "risk" | "ok"
    if (roasReal < breakEven) status = "loss";
    else if (roasReal < breakEven * 1.3) status = "risk";
    else status = "ok";

    const waMessages = {
      loss: Hola Carolina, acabo de calcular mi ROAS real y estoy en  cuando necesito mínimo  para no perder. Mi ganancia neta está en . Quiero revisar qué está pasando en mi cuenta.,
      risk: Hola Carolina, mi ROAS real es  y mi punto de equilibrio es . Estoy cubriendo costos por poco y quiero optimizar antes de que empeore.,
      ok:   Hola Carolina, mis números están sanos — ROAS real  vs breakeven , ganancia neta . Quiero ver hasta dónde puedo escalar esto.,
    };

    setResult({
      roasSimple, roasReal, breakEven, grossMarginPct,
      netProfit, cpl, hiddenCosts, status,
      waUrl: https://wa.me/5223111396364?text=,
    });
  }

  const diagConfig = {
    loss: {
      borderColor: T.danger,
      titleColor: T.danger,
      title: "Estás perdiendo dinero aunque no lo parezca.",
      body: result
        ? Tu ROAS real es  — necesitas al menos  para no operar en negativo. El problema casi nunca es el presupuesto: son los costos que nadie está sumando y las fugas que nadie está tapando.
        : "",
    },
    risk: {
      borderColor: T.warning,
      titleColor: T.warning,
      title: "Estás en zona de riesgo.",
      body: result
        ? Cubres costos, pero por poco. Un cambio de algoritmo, una temporada baja o un ajuste en tus costos puede mandarte a pérdida. Con margen del  y ROAS real de , hay trabajo que hacer antes de que se vuelva urgente.
        : "",
    },
    ok: {
      borderColor: T.success,
      titleColor: T.success,
      title: "Tus números son sanos. Ahora la pregunta es cuánto puedes escalar.",
      body: result
        ? ROAS real de  vs punto de equilibrio de . Generas  de ganancia neta. El sistema funciona — la pregunta es si está configurado para crecer o para mantenerse.
        : "",
    },
  };

  const diag = result ? diagConfig[result.status] : null;

  return (
    <>
      {/* Google Fonts — DM Sans + DM Mono */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <section style={S.wrap} id="calculadora">

        {/* header */}
        <p style={S.eyebrow}>Recurso gratuito · Sistema Filtro</p>
        <h2 style={S.heading}>
          Calculadora de ROAS real.
          <br />
          <span style={{ color: T.accent }}>El número que casi nadie calcula bien.</span>
        </h2>
        <p style={S.sub}>
          La mayoría reporta el ROAS que Meta muestra. Ese número ignora honorarios,
          herramientas, producción y tu tiempo. Llena esto con tus números reales
          y ve qué está pasando de verdad.
        </p>

        {/* ── INGRESOS ── */}
        <SectionLabel label="Ingresos" />
        <div style={S.grid2}>
          <Field
            id="revenue" label="Ingresos generados por ads ($)"
            hint="Lo que vendiste gracias a tus campañas en Meta"
            val={vals.revenue} onChange={set("revenue")}
            focused={focusedField === "revenue"}
            onFocus={() => setFocusedField("revenue")}
            onBlur={() => setFocusedField(null)}
          />
          <Field
            id="cogs" label="Costo del producto o servicio ($)"
            hint="Lo que te costó producir o entregar lo vendido"
            val={vals.cogs} onChange={set("cogs")}
            focused={focusedField === "cogs"}
            onFocus={() => setFocusedField("cogs")}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* ── INVERSIÓN EN ADS ── */}
        <SectionLabel label="Inversión en ads" />
        <div style={S.grid2}>
          <Field
            id="adspend" label="Gasto en Meta Ads ($)"
            hint="Lo que le pagaste directamente a Meta"
            val={vals.adspend} onChange={set("adspend")}
            focused={focusedField === "adspend"}
            onFocus={() => setFocusedField("adspend")}
            onBlur={() => setFocusedField(null)}
          />
          <Field
            id="agency" label="Honorarios / freelancer ($)"
            hint="Lo que pagas a quien gestiona tus campañas"
            val={vals.agency} onChange={set("agency")}
            focused={focusedField === "agency"}
            onFocus={() => setFocusedField("agency")}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* ── COSTOS OCULTOS ── */}
        <SectionLabel label="Costos ocultos — los que casi nadie suma" />
        <div style={{ ...S.grid2, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <Field
            id="tools" label="Herramientas y suscripciones ($)"
            hint="Canva, scheduling tools, CRM, etc."
            val={vals.tools} onChange={set("tools")}
            focused={focusedField === "tools"}
            onFocus={() => setFocusedField("tools")}
            onBlur={() => setFocusedField(null)}
          />
          <Field
            id="creatives" label="Producción de creativos ($)"
            hint="Diseño, video, fotografía, edición"
            val={vals.creatives} onChange={set("creatives")}
            focused={focusedField === "creatives"}
            onFocus={() => setFocusedField("creatives")}
            onBlur={() => setFocusedField(null)}
          />
          <Field
            id="time" label="Valor de tu tiempo ($)"
            hint="Horas dedicadas a ads × tu tarifa. Si no lo cobras, igual tiene costo."
            val={vals.time} onChange={set("time")}
            focused={focusedField === "time"}
            onFocus={() => setFocusedField("time")}
            onBlur={() => setFocusedField(null)}
          />
          <Field
            id="leads" label="Leads generados"
            hint="Mensajes, registros o contactos obtenidos (opcional)"
            val={vals.leads} onChange={set("leads")}
            focused={focusedField === "leads"}
            onFocus={() => setFocusedField("leads")}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* ── BOTÓN ── */}
        <button
          style={S.btn}
          onClick={calculate}
          onMouseEnter={(e) => { e.target.style.background = T.accentDim; }}
          onMouseLeave={(e) => { e.target.style.background = T.accent; }}
        >
          Ver mis números reales →
        </button>

        {/* ── RESULTADOS ── */}
        {result && (
          <div style={{ marginTop: "2.5rem" }}>
            <SectionLabel label="Tus números reales" />

            <div style={S.metricsGrid}>
              <MetricCard
                label="ROAS que reportas"
                value={fmtX(result.roasSimple)}
                color={T.muted}
              />
              <MetricCard
                label="ROAS real (todos los costos)"
                value={fmtX(result.roasReal)}
                color={
                  result.status === "loss" ? T.danger :
                  result.status === "risk" ? T.warning :
                  T.accent
                }
                highlight
              />
              <MetricCard
                label="Punto de equilibrio mínimo"
                value={fmtX(result.breakEven)}
                color={T.muted}
              />
              <MetricCard
                label="Margen bruto"
                value={fmtPct(result.grossMarginPct)}
                color={T.muted}
              />
              <MetricCard
                label="Ganancia neta real"
                value={fmtC(result.netProfit)}
                color={result.netProfit >= 0 ? T.accent : T.danger}
                highlight
              />
              {result.cpl && (
                <MetricCard
                  label="Costo por lead real"
                  value={fmtC(result.cpl)}
                  color={T.muted}
                />
              )}
              {result.hiddenCosts > 0 && (
                <MetricCard
                  label="Costos ocultos totales"
                  value={fmtC(result.hiddenCosts)}
                  color={T.warning}
                />
              )}
            </div>

            {/* diagnóstico */}
            <div style={{
              ...S.diagBox,
              borderColor: diag.borderColor,
              background: T.surface,
            }}>
              <p style={{ ...S.diagTitle, color: diag.titleColor }}>
                {diag.title}
              </p>
              <p style={{ ...S.diagBody, color: T.muted }}>
                {diag.body}
              </p>
              <a
                href={result.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={S.waBtn}
              >
                <WhatsAppIcon />
                Hablar con Carolina sobre esto
              </a>
            </div>

            {/* fórmulas */}
            <p style={S.formulaNote}>
              <strong style={{ color: T.subtle }}>Fórmulas:</strong>{" "}
              ROAS simple = ingresos ÷ gasto en ads &nbsp;·&nbsp;
              ROAS real = ingresos ÷ (ads + honorarios + herramientas + creativos + tiempo) &nbsp;·&nbsp;
              Punto de equilibrio = 1 ÷ margen bruto &nbsp;·&nbsp;
              Ganancia neta = margen bruto − costo total &nbsp;·&nbsp;
              Costo por lead = costo total ÷ leads
            </p>
          </div>
        )}
      </section>
    </>
  );
}

// ─── sub-components ────────────────────────────────────────────────────────

function SectionLabel({ label }) {
  return (
    <div style={S.sectionLabel}>
      <span>{label}</span>
      <span style={S.labelLine} />
    </div>
  );
}

function Field({ id, label, hint, val, onChange, focused, onFocus, onBlur }) {
  return (
    <div style={S.field}>
      <label htmlFor={id} style={S.label}>{label}</label>
      <input
        id={id}
        type="number"
        min="0"
        step="any"
        value={val}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="0"
        style={{
          ...S.input,
          borderColor: focused ? T.accent : T.border,
          boxShadow: focused ?   0 0 1px 22 : "none",
        }}
      />
      {hint && <span style={S.hint}>{hint}</span>}
    </div>
  );
}

function MetricCard({ label, value, color, highlight }) {
  return (
    <div style={{
      ...S.metricCard,
      borderRight: 1px solid ,
      borderBottom: 1px solid ,
      background: highlight ? "#141414" : T.surface,
    }}>
      <p style={S.metricLabel}>{label}</p>
      <p style={{ ...S.metricValue, color: color || T.text }}>{value}</p>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
