"use client";

import { useState } from "react";

const T = {
  surface: "#111627",
  surfaceHi: "#161d30",
  border: "rgba(255,255,255,0.06)",
  borderHi: "rgba(74,144,217,0.3)",
  text: "#F5F0EB",
  muted: "#6b7a8d",
  subtle: "#3a4560",
  accent: "#4A90D9",
  accentDim: "#3a7bc0",
  accentLight: "#7DD3FC",
  danger: "#FF6B35",
  warning: "#f5a623",
  success: "#10B981",
};

interface CalcResult {
  roasSimple: number;
  roasReal: number;
  breakEven: number;
  grossMarginPct: number;
  netProfit: number;
  cpl: number | null;
  hiddenCosts: number;
  status: "loss" | "risk" | "ok";
  waUrl: string;
}

const fmtC = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");
const fmtX = (n: number) => n.toFixed(2) + "x";
const fmtPct = (n: number) => n.toFixed(1) + "%";

export default function CalculadoraROAS() {
  const [vals, setVals] = useState({
    revenue: "", cogs: "", adspend: "", agency: "",
    tools: "", creatives: "", time: "", leads: "",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setVals((p) => ({ ...p, [k]: e.target.value }));

  const n = (k: string) => parseFloat(vals[k]) || 0;

  function calculate() {
    const revenue = n("revenue");
    const cogs = n("cogs");
    const adspend = n("adspend");
    const agency = n("agency");
    const tools = n("tools");
    const creatives = n("creatives");
    const time = n("time");
    const leads = n("leads");

    if (!revenue || !adspend) return;

    const totalCost = adspend + agency + tools + creatives + time;
    const grossMargin = revenue - cogs;
    const grossMarginPct = revenue > 0 ? (grossMargin / revenue) * 100 : 0;
    const roasSimple = revenue / adspend;
    const roasReal = totalCost > 0 ? revenue / totalCost : 0;
    const breakEven = grossMarginPct > 0 ? 100 / grossMarginPct : 0;
    const netProfit = grossMargin - totalCost;
    const cpl = leads > 0 && totalCost > 0 ? totalCost / leads : null;
    const hiddenCosts = totalCost - adspend;

    let status: "loss" | "risk" | "ok";
    if (roasReal < breakEven) status = "loss";
    else if (roasReal < breakEven * 1.3) status = "risk";
    else status = "ok";

    const waMessages = {
      loss: "Hola Carolina, acabo de calcular mi ROAS real y estoy en " + fmtX(roasReal) + " cuando necesito minimo " + fmtX(breakEven) + " para no perder. Mi ganancia neta esta en " + fmtC(netProfit) + ". Quiero revisar que esta pasando en mi cuenta.",
      risk: "Hola Carolina, mi ROAS real es " + fmtX(roasReal) + " y mi punto de equilibrio es " + fmtX(breakEven) + ". Estoy cubriendo costos por poco y quiero optimizar antes de que empeore.",
      ok: "Hola Carolina, mis numeros estan sanos - ROAS real " + fmtX(roasReal) + " vs breakeven " + fmtX(breakEven) + ", ganancia neta " + fmtC(netProfit) + ". Quiero ver hasta donde puedo escalar esto.",
    };

    setResult({
      roasSimple, roasReal, breakEven, grossMarginPct,
      netProfit, cpl, hiddenCosts, status,
      waUrl: "https://wa.me/522292924043?text=" + encodeURIComponent(waMessages[status]),
    });
  }

  const diagConfig: Record<string, { borderColor: string; titleColor: string; title: string; body: string }> = {
    loss: {
      borderColor: T.danger,
      titleColor: T.danger,
      title: "Estas perdiendo dinero aunque no lo parezca.",
      body: result
        ? "Tu ROAS real es " + fmtX(result.roasReal) + " - necesitas al menos " + fmtX(result.breakEven) + " para no operar en negativo. El problema casi nunca es el presupuesto: son los costos que nadie esta sumando y las fugas que nadie esta tapando."
        : "",
    },
    risk: {
      borderColor: T.warning,
      titleColor: T.warning,
      title: "Estas en zona de riesgo.",
      body: result
        ? "Cubres costos, pero por poco. Un cambio de algoritmo, una temporada baja o un ajuste en tus costos puede mandarte a perdida. Con margen del " + fmtPct(result.grossMarginPct) + " y ROAS real de " + fmtX(result.roasReal) + ", hay trabajo que hacer antes de que se vuelva urgente."
        : "",
    },
    ok: {
      borderColor: T.success,
      titleColor: T.success,
      title: "Tus numeros son sanos. Ahora la pregunta es cuanto puedes escalar.",
      body: result
        ? "ROAS real de " + fmtX(result.roasReal) + " vs punto de equilibrio de " + fmtX(result.breakEven) + ". Generas " + fmtC(result.netProfit) + " de ganancia neta. El sistema funciona - la pregunta es si esta configurado para crecer o para mantenerse."
        : "",
    },
  };

  const diag = result ? diagConfig[result.status] : null;

  return (
    <section id="calculadora" className="relative py-24 md:py-32">
      <div className="gradient-orb gradient-orb-2 absolute" style={{ top: "20%", right: "-10%" }} />
      <div className="gradient-orb gradient-orb-3 absolute" style={{ bottom: "10%", left: "-10%" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-divider mb-16" />

        <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: T.accent, marginBottom: 16, fontFamily: "var(--font-inter)" }}>
          Recurso gratuito - Sistema Filtro
        </p>

        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, color: T.text, margin: "0 0 0.75rem", fontFamily: "var(--font-playfair)" }}>
          Calculadora de ROAS real.
          <br />
          <span style={{ background: "linear-gradient(135deg, #7DD3FC, #4A90D9, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            El numero que casi nadie calcula bien.
          </span>
        </h2>

        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, margin: "0 0 2.5rem", fontFamily: "var(--font-inter)" }}>
          La mayoria reporta el ROAS que Meta muestra. Ese numero ignora honorarios, herramientas, produccion y tu tiempo. Llena esto con tus numeros reales y ve que esta pasando de verdad.
        </p>

        <SectionLabel label="Ingresos" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Field id="revenue" label="Ingresos generados por ads ($)" hint="Lo que vendiste gracias a tus campañas en Meta" val={vals.revenue} onChange={set("revenue")} focused={focusedField === "revenue"} onFocus={() => setFocusedField("revenue")} onBlur={() => setFocusedField(null)} />
          <Field id="cogs" label="Costo del producto o servicio ($)" hint="Lo que te costo producir o entregar lo vendido" val={vals.cogs} onChange={set("cogs")} focused={focusedField === "cogs"} onFocus={() => setFocusedField("cogs")} onBlur={() => setFocusedField(null)} />
        </div>

        <SectionLabel label="Inversion en ads" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Field id="adspend" label="Gasto en Meta Ads ($)" hint="Lo que le pagaste directamente a Meta" val={vals.adspend} onChange={set("adspend")} focused={focusedField === "adspend"} onFocus={() => setFocusedField("adspend")} onBlur={() => setFocusedField(null)} />
          <Field id="agency" label="Honorarios / freelancer ($)" hint="Lo que pagas a quien gestiona tus campañas" val={vals.agency} onChange={set("agency")} focused={focusedField === "agency"} onFocus={() => setFocusedField("agency")} onBlur={() => setFocusedField(null)} />
        </div>

        <SectionLabel label="Costos ocultos - los que casi nadie suma" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <Field id="tools" label="Herramientas y suscripciones ($)" hint="Canva, scheduling tools, CRM, etc." val={vals.tools} onChange={set("tools")} focused={focusedField === "tools"} onFocus={() => setFocusedField("tools")} onBlur={() => setFocusedField(null)} />
          <Field id="creatives" label="Produccion de creativos ($)" hint="Diseno, video, fotografia, edicion" val={vals.creatives} onChange={set("creatives")} focused={focusedField === "creatives"} onFocus={() => setFocusedField("creatives")} onBlur={() => setFocusedField(null)} />
          <Field id="time" label="Valor de tu tiempo ($)" hint="Horas dedicadas a ads x tu tarifa. Si no lo cobras, igual tiene costo." val={vals.time} onChange={set("time")} focused={focusedField === "time"} onFocus={() => setFocusedField("time")} onBlur={() => setFocusedField(null)} />
          <Field id="leads" label="Leads generados" hint="Mensajes, registros o contactos obtenidos (opcional)" val={vals.leads} onChange={set("leads")} focused={focusedField === "leads"} onFocus={() => setFocusedField("leads")} onBlur={() => setFocusedField(null)} />
        </div>

        <button
          style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #4A90D9, #10B981)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "16px 24px", cursor: "pointer", marginTop: "2rem", fontFamily: "var(--font-inter)", transition: "opacity 0.2s" }}
          onClick={calculate}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Ver mis numeros reales
        </button>

        {result && (
          <div style={{ marginTop: "2.5rem" }}>
            <SectionLabel label="Tus numeros reales" />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, border: "1px solid " + T.border, borderRadius: 8, overflow: "hidden", margin: "1.5rem 0" }}>
              <MetricCard label="ROAS que reportas" value={fmtX(result.roasSimple)} color={T.muted} />
              <MetricCard label="ROAS real (todos los costos)" value={fmtX(result.roasReal)} color={result.status === "loss" ? T.danger : result.status === "risk" ? T.warning : T.accent} highlight />
              <MetricCard label="Punto de equilibrio minimo" value={fmtX(result.breakEven)} color={T.muted} />
              <MetricCard label="Margen bruto" value={fmtPct(result.grossMarginPct)} color={T.muted} />
              <MetricCard label="Ganancia neta real" value={fmtC(result.netProfit)} color={result.netProfit >= 0 ? T.success : T.danger} highlight />
              {result.cpl !== null && <MetricCard label="Costo por lead real" value={fmtC(result.cpl)} color={T.muted} />}
              {result.hiddenCosts > 0 && <MetricCard label="Costos ocultos totales" value={fmtC(result.hiddenCosts)} color={T.warning} />}
            </div>

            {diag && (
              <div style={{ border: "1px solid " + diag.borderColor, borderRadius: 8, padding: "1.5rem", margin: "1.5rem 0 0", background: T.surface }}>
                <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", fontFamily: "var(--font-playfair)", lineHeight: 1.2, color: diag.titleColor }}>
                  {diag.title}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 1.25rem", fontFamily: "var(--font-inter)", color: T.muted }}>
                  {diag.body}
                </p>
                <a href={result.waUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "12px 20px", cursor: "pointer", textDecoration: "none", fontFamily: "var(--font-inter)", boxShadow: "0 0 20px rgba(37, 211, 102, 0.3)" }}>
                  <WhatsAppIcon />
                  Hablar con Carolina sobre esto
                </a>
              </div>
            )}

            <p style={{ fontSize: 11, color: T.subtle, lineHeight: 1.9, borderTop: "1px solid " + T.border, paddingTop: "1.25rem", marginTop: "1.5rem", fontFamily: "var(--font-inter)" }}>
              <strong style={{ color: T.subtle }}>Formulas:</strong>{" "}
              ROAS simple = ingresos / gasto en ads |{" "}
              ROAS real = ingresos / (ads + honorarios + herramientas + creativos + tiempo) |{" "}
              Punto de equilibrio = 1 / margen bruto |{" "}
              Ganancia neta = margen bruto - costo total |{" "}
              Costo por lead = costo total / leads
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, margin: "2rem 0 1rem", display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-inter)" }}>
      <span>{label}</span>
      <span style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}

function Field({ id, label, hint, val, onChange, focused, onFocus, onBlur }: {
  id: string; label: string; hint?: string; val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focused: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 12, color: T.muted, letterSpacing: "0.02em", fontFamily: "var(--font-inter)" }}>
        {label}
      </label>
      <input
        id={id} type="number" min="0" autocomplete="off" inputmode="numeric" step="any"
        value={val} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        placeholder="0"
        style={{
          background: T.surface,
          border: "1px solid " + (focused ? T.borderHi : T.border),
          borderRadius: 8,
          color: T.text,
          fontSize: 15,
          padding: "12px 16px",
          outline: "none",
          fontFamily: "var(--font-inter)",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 1px rgba(74,144,217,0.15)" : "none",
        }}
      />
      {hint && <span style={{ fontSize: 11, color: T.subtle, lineHeight: 1.5, fontFamily: "var(--font-inter)" }}>{hint}</span>}
    </div>
  );
}

function MetricCard({ label, value, color, highlight }: {
  label: string; value: string; color: string; highlight?: boolean;
}) {
  return (
    <div style={{ background: highlight ? T.surfaceHi : T.surface, padding: "16px 18px", borderRight: "1px solid " + T.border, borderBottom: "1px solid " + T.border }}>
      <p style={{ fontSize: 11, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 6px", fontFamily: "var(--font-inter)" }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 700, margin: 0, fontFamily: "var(--font-playfair)", lineHeight: 1, color: color || T.text }}>{value}</p>
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
