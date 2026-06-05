const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  VERIFICACION COMPLETA DE GA4 + IFRAMES');
console.log('========================================\n');

// 1. Verificar si gtag.ts existe
const gtagPath = 'src/lib/gtag.ts';
if (fs.existsSync(gtagPath)) {
  console.log('✅ src/lib/gtag.ts EXISTE');
  const content = fs.readFileSync(gtagPath, 'utf8');
  const hasGA4Id = content.includes('G-19E6F6BWZ4');
  const hasTrackCalendly = content.includes('trackCalendlyClick');
  const hasTrackCalcComplete = content.includes('CalculadoraComplete') || content.includes('calculadora_completada');
  const hasTrackBenchComplete = content.includes('BenchmarkComplete') || content.includes('benchmark_completado');
  const hasTrackScoreComplete = content.includes('ScorecardComplete') || content.includes('scorecard_completado');
  console.log('   GA4 ID (G-19E6F6BWZ4): ' + hasGA4Id);
  console.log('   trackCalendlyClick: ' + hasTrackCalendly);
  console.log('   trackCalculadoraComplete: ' + hasTrackCalcComplete);
  console.log('   trackBenchmarkComplete: ' + hasTrackBenchComplete);
  console.log('   trackScorecardComplete: ' + hasTrackScoreComplete);
} else {
  console.log('❌ src/lib/gtag.ts NO EXISTE');
}

// 2. Verificar page.tsx - Calendly y gtag
console.log('\n--- page.tsx ---');
const pagePath = 'src/app/page.tsx';
if (fs.existsSync(pagePath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  console.log('   Import gtag: ' + (page.includes("from '@/lib/gtag'") || page.includes('from "@/lib/gtag"')));
  console.log('   trackCalendlyClick: ' + page.includes('trackCalendlyClick'));
  console.log('   trackWhatsAppClick: ' + page.includes('trackWhatsAppClick'));
  
  // Contar cuantos Calendly links HAY vs cuantos tienen onClick
  const calendlyHrefs = (page.match(/calendly\.com/g) || []).length;
  const calendlyOnClicks = (page.match(/trackCalendlyClick/g) || []).length;
  console.log('   Links a Calendly: ' + calendlyHrefs);
  console.log('   onClick trackCalendlyClick: ' + calendlyOnClicks);
  if (calendlyHrefs > calendlyOnClicks) {
    console.log('   ⚠️  FALTAN onClick en ' + (calendlyHrefs - calendlyOnClicks) + ' links de Calendly!');
  }
} else {
  console.log('❌ No encontrado');
}

// 3. Verificar layout.tsx - GA4 scripts
console.log('\n--- layout.tsx ---');
const layoutPath = 'src/app/layout.tsx';
if (fs.existsSync(layoutPath)) {
  const layout = fs.readFileSync(layoutPath, 'utf8');
  console.log('   GA4 script (gtag/js): ' + layout.includes('googletagmanager.com/gtag/js'));
  console.log('   GA4 ID en config: ' + layout.includes('G-19E6F6BWZ4'));
} else {
  console.log('❌ No encontrado');
}

// 4. Verificar herramientas-gratis.tsx - srcDoc vs src
console.log('\n--- herramientas-gratis.tsx ---');
const hgPath = 'src/components/herramientas-gratis.tsx';
if (fs.existsSync(hgPath)) {
  const hg = fs.readFileSync(hgPath, 'utf8');
  const usesSrcDoc = hg.includes('srcDoc');
  const usesSrc = /src=["'{`]/.test(hg) && !hg.includes('srcDoc');
  console.log('   Usa srcDoc (inline): ' + usesSrcDoc);
  console.log('   Usa src (archivo): ' + usesSrc);
  
  if (usesSrcDoc) {
    console.log('   ⚠️  Los iframes cargan HTML INLINE, NO los archivos public/');
    console.log('   → Los trackers en public/*.html NO se estan ejecutando!');
  }
  
  // Buscar si el inline HTML tiene gtag
  const inlineHasGtag = hg.includes("gtag('event'") || hg.includes('gtag("event"');
  console.log('   Inline HTML tiene gtag(): ' + inlineHasGtag);
} else {
  console.log('❌ No encontrado');
}

// 5. Verificar archivos HTML en public/
console.log('\n--- Archivos HTML en public/ ---');
const htmlFiles = [
  'public/calculadora-desperdicio.html',
  'public/scorecard-meta-ads.html', 
  'public/benchmark-performance.html'
];

htmlFiles.forEach(f => {
  console.log('\n  ' + f);
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    
    // GA4 script en head
    const hasGA4Script = html.includes('googletagmanager.com/gtag/js');
    const hasGA4Config = html.includes('G-19E6F6BWZ4');
    console.log('    GA4 script en <head>: ' + hasGA4Script);
    console.log('    GA4 config ID: ' + hasGA4Config);
    
    // gtag() calls
    const hasGtagEvent = html.includes("gtag('event'") || html.includes('gtag("event"');
    console.log('    gtag("event") calls: ' + hasGtagEvent);
    
    // Verificar que NO hay imports de TypeScript
    const hasBadImport = html.includes("from '@/lib/gtag'") || html.includes('from "@/lib/gtag"') || html.includes('require(');
    console.log('    Tiene import TS (ROTO): ' + hasBadImport);
    
    // Verificar var res / var rc esten correctos
    const brokenRes = /var res=\s*gtag/.test(html);
    const brokenRc = /var rc=\s*gtag/.test(html);
    if (brokenRes) console.log('    ❌ BUG: var res=gtag (calculadora rota)');
    if (brokenRc) console.log('    ❌ BUG: var rc=gtag (benchmark roto)');
    
    // Verificar que getElementById esta correcto
    const hasGoodRes = html.includes("var res=document.getElementById('results')") || html.includes('var res = document.getElementById("results")');
    const hasGoodRc = html.includes("var rc=document.getElementById('resultsCard')") || html.includes('var rc = document.getElementById("resultsCard")');
    if (hasGoodRes) console.log('    ✅ var res=document.getElementById correcto');
    if (hasGoodRc) console.log('    ✅ var rc=document.getElementById correcto');
    
  } else {
    console.log('    ❌ NO EXISTE');
  }
});

// 6. Verificar servicios-section.tsx
console.log('\n--- servicios-section.tsx ---');
const ssPath = 'src/components/servicios-section.tsx';
if (fs.existsSync(ssPath)) {
  const ss = fs.readFileSync(ssPath, 'utf8');
  console.log('   trackWhatsAppClick: ' + ss.includes('trackWhatsAppClick'));
  console.log('   Import gtag: ' + (ss.includes("from '@/lib/gtag'") || ss.includes('from "@/lib/gtag"')));
} else {
  console.log('   No encontrado');
}

console.log('\n========================================');
console.log('  FIN VERIFICACION');
console.log('========================================');
