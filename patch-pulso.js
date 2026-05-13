const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src', 'app', 'page.tsx');
let p = fs.readFileSync(f, 'utf8');

// 1) Update navbar label
p = p.replace(
  '{ label: "Sistema Filtro", href: "#sistema-filtro" }',
  '{ label: "Método P.U.L.S.O.", href: "#sistema-filtro" }'
);

// 2) Replace the entire SistemaFiltroSection function with the new P.U.L.S.O. section
const oldSection = /\/\* ─── SISTEMA FILTRO — BLUE bg, WHITE text ─── \*\/\nfunction SistemaFiltroSection\(\) \{[\s\S]*?\n\}/;

const newSection = `/* ─── MÉTODO P.U.L.S.O. — BLUE bg, WHITE text ─── */
function SistemaFiltroSection() {
  const fases = [
    {
      letra: "P",
      palabra: "PROBAR",
      desc: "Recopilar datos con inversión mínima y riesgo controlado. Audiencias amplias, múltiples formatos, sin optimizar los primeros 7 días. El objetivo es datos, no ventas.",
    },
    {
      letra: "U",
      palabra: "UBICAR",
      desc: "Identificar qué audiencias y formatos generan el menor CPA. La segmentación se estrecha progresivamente: de amplio a geo, de geo a retargeting.",
    },
    {
      letra: "L",
      palabra: "LANZAR",
      desc: "Escalar lo que funciona en ventanas de oportunidad. Temporadas altas, incrementos de presupuesto calculados, sin romper el aprendizaje del algoritmo.",
    },
    {
      letra: "S",
      palabra: "SOSTENER",
      desc: "Monitoreo constante para mantener el CPA bajo. Si el CPA sube más del 20% por 3 días consecutivos, se investiga y corrige en menos de 48 horas.",
    },
    {
      letra: "O",
      palabra: "OPTIMIZAR",
      desc: "Documentar aprendizajes al cierre de cada ciclo y reiniciar con ventaja. Cada ciclo comienza mejor calibrado que el anterior.",
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
}`;

p = p.replace(oldSection, newSection);

fs.writeFileSync(f, p, 'utf8');
console.log('OK — P.U.L.S.O. section replaced');
