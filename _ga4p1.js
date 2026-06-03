const fs = require('fs');
let ok = 0;

// ============================================
// 1. CREAR /lib/gtag.ts
// ============================================
const libDir = 'src/lib';
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

const gtag = `// ============================================
// /lib/gtag.ts
// Google Analytics 4 \u2014 Carolina Betancourt
// ID: G-19E6F6BWZ4
// ============================================

export const GA_MEASUREMENT_ID = 'G-19E6F6BWZ4'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// \u2014 \u2014 \u2014 EVENTOS BASE \u2014 \u2014 \u2014

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// \u2014 \u2014 \u2014 EVENTOS CAROL \u2014 \u2014 \u2014

// Lead Magnets
export const trackCalculadoraStart = () =>
  event({ action: 'calculadora_inicio', category: 'lead_magnet', label: 'calculadora_desperdicio' })

export const trackCalculadoraComplete = (desperdicio: number) =>
  event({ action: 'calculadora_completada', category: 'lead_magnet', label: 'calculadora_desperdicio', value: desperdicio })

export const trackScorecardStart = () =>
  event({ action: 'scorecard_inicio', category: 'lead_magnet', label: 'scorecard_madurez' })

export const trackScorecardComplete = (score: number) =>
  event({ action: 'scorecard_completado', category: 'lead_magnet', label: 'scorecard_madurez', value: score })

export const trackBenchmarkStart = () =>
  event({ action: 'benchmark_inicio', category: 'lead_magnet', label: 'benchmark_performance' })

export const trackBenchmarkComplete = (score: number) =>
  event({ action: 'benchmark_completado', category: 'lead_magnet', label: 'benchmark_performance', value: score })

// Conversiones
export const trackWhatsAppClick = (origen: string) =>
  event({ action: 'whatsapp_click', category: 'conversion', label: origen })

export const trackDiagnosticoClick = () =>
  event({ action: 'diagnostico_click', category: 'conversion', label: 'diagnostico_497' })

export const trackCalendlyClick = () =>
  event({ action: 'calendly_click', category: 'conversion', label: 'agendar_sesion' })
`;

fs.writeFileSync('src/lib/gtag.ts', gtag, 'utf8');
console.log('\u2713 Created src/lib/gtag.ts');
ok++;

// ============================================
// 2. MODIFICAR layout.tsx — GA4 scripts
// ============================================
const layoutPath = 'src/app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

// Add GA4 scripts after Meta Pixel noscript block
const ga4Block = `
        {/* ===== GOOGLE ANALYTICS 4 ===== */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-19E6F6BWZ4"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: \`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-19E6F6BWZ4', {
                send_page_view: true
              });
            \`,
          }}
        />`;

// Insert after the noscript Meta Pixel block
const noscriptEnd = layout.indexOf('</noscript>');
if (noscriptEnd > -1 && !layout.includes('G-19E6F6BWZ4')) {
  const insertPos = layout.indexOf('\n', noscriptEnd) + 1;
  layout = layout.slice(0, insertPos) + ga4Block + layout.slice(insertPos);
  fs.writeFileSync(layoutPath, layout, 'utf8');
  console.log('\u2713 GA4 scripts added to layout.tsx');
  ok++;
} else if (layout.includes('G-19E6F6BWZ4')) {
  console.log('\u2713 GA4 already in layout.tsx');
  ok++;
} else {
  console.log('\u26a0 Could not find insertion point in layout.tsx');
}

console.log('\n========================================');
console.log('Part 1 done:', ok, '/ 2');
console.log('========================================');
