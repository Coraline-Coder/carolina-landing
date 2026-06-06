// ============================================
// /lib/gtag.ts
// Google Analytics 4 — Carolina Betancourt
// ID: G-19E6F6BWZ4
// ============================================

export const GA_MEASUREMENT_ID = 'G-19E6F6BWZ4'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// — — — EVENTOS BASE — — —

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

// — — — EVENTOS CAROL — — —

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


declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export function trackMetaLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}