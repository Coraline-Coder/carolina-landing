const fs = require('fs');
const path = require('path');
const f1 = path.join(__dirname, 'src', 'app', 'page.tsx');
let p1 = fs.readFileSync(f1, 'utf8');
p1 = p1.replace('Conocer el Sistema Filtro', 'Conocer el Método P.U.L.S.O.');
const waButton = `
/* ─── WHATSAPP FLOATING BUTTON ─── */
function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/522311396364"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
        zIndex: 9999,
        transition: "transform 0.2s",
        animation: "waPulse 3s ease-in-out infinite",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <style>{\`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 4px 28px rgba(37,211,102,0.65); }
        }
        @media (max-width: 640px) {
          [aria-label="WhatsApp"] { bottom: 20px !important; right: 20px !important; width: 54px !important; height: 54px !important; }
        }
      \`}</style>
    </a>
  );
}
`;
p1 = p1.replace(
  '/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   PAGE\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */',
  waButton + '\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   PAGE\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */'
);
p1 = p1.replace(
  /<Footer \/>\s*<\/main>/,
  '<Footer />\n      <WhatsAppFAB />\n    </main>'
);
fs.writeFileSync(f1, p1, 'utf8');
console.log('OK — page.tsx patched');
const f2 = path.join(__dirname, 'src', 'components', 'caso-exito.tsx');
let p2 = fs.readFileSync(f2, 'utf8');
p2 = p2.replace('Retail de muebles · Mérida, Yucatán · 15 meses de gestión', 'Retail de muebles · 15 meses de gestión');
p2 = p2.replace('Ver cómo funciona el Sistema Filtro', 'Ver cómo funciona el Método P.U.L.S.O.');
p2 = p2.replace(
  `const metrics = [
    { value: "-52%", label: "Reducción de CPA", detail: "de $10.55 a $5.05 MXN" },
    { value: "8,000+", label: "Conversaciones generadas", detail: "a WhatsApp" },
    { value: "+91%", label: "Mejora en CTR", detail: "de 1.10% a 2.10%" },
    { value: "1.2M", label: "Reproducciones de video", detail: "" },
    { value: "$5.05", label: "CPA mínimo alcanzado", detail: "" },
    { value: "15 meses", label: "Gestión continua", detail: "documentada" },
  ];`,
  `const metrics = [
    { value: "-52%", target: -52, suffix: "%", prefix: "", label: "Reducción de CPA", detail: "de $10.55 a $5.05 MXN" },
    { value: "8,000+", target: 8000, suffix: "+", prefix: "", label: "Conversaciones generadas", detail: "a WhatsApp" },
    { value: "+91%", target: 91, suffix: "%", prefix: "+", label: "Mejora en CTR", detail: "de 1.10% a 2.10%" },
    { value: "1.2M", target: 1.2, suffix: "M", prefix: "", label: "Reproducciones de video", detail: "" },
    { value: "$5.05", target: 5.05, suffix: "", prefix: "$", label: "CPA mínimo alcanzado", detail: "" },
    { value: "15 meses", target: 15, suffix: " meses", prefix: "", label: "Gestión continua", detail: "documentada" },
  ];`
);
const counterCode = `
/* ─── ANIMATED COUNTER HOOK ─── */
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const absTarget = Math.abs(target);
    const isFloat = absTarget % 1 !== 0;
    const startTime = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * absTarget;
      setCount(isFloat ? parseFloat(current.toFixed(2)) : Math.round(current));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  const display = target < 0 ? -count : count;
  return { count: display, ref };
}

function MetricValue({ m }: { m: { value: string; target: number; suffix: string; prefix: string; label: string; detail: string } }) {
  const { count, ref } = useCountUp(m.target);
  const fmt = () => {
    if (m.suffix === "M") return m.prefix + count.toFixed(1) + m.suffix;
    if (m.suffix === "%") return m.prefix + count + m.suffix;
    if (m.suffix === " meses") return m.prefix + count + m.suffix;
    if (m.suffix === "+") return m.prefix + count.toLocaleString("es-MX") + m.suffix;
    if (m.prefix === "$") return m.prefix + (count % 1 === 0 ? count.toFixed(0) : count.toFixed(2));
    return m.prefix + count + m.suffix;
  };
  return (
    <div ref={ref}>
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
        {fmt()}
      </p>
    </div>
  );
}

`;
p2 = p2.replace('export default function CasoDeExitoSection()', counterCode + 'export default function CasoDeExitoSection()');
p2 = p2.replace(
  `<p
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
                </p>`,
  `<MetricValue m={m} />`
);
fs.writeFileSync(f2, p2, 'utf8');
console.log('OK — caso-exito.tsx patched');
