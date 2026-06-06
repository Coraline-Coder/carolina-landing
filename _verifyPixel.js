const fs = require('fs');

console.log('========================================');
console.log('  VERIFICACION: Meta Pixel Lead Event');
console.log('========================================\n');

// 1. Verificar fbq en layout.tsx
console.log('--- layout.tsx (Pixel base) ---');
const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
const hasPixelScript = layout.includes('connect.facebook.net');
const hasFbqInit = layout.includes('fbq(') || layout.includes('fbq.js');
const hasPixelId = layout.includes('Pixel') || layout.match(/fbq\('init',\s*'[^']+'\)/);
console.log('  Meta Pixel script: ' + hasPixelScript);
console.log('  fbq init: ' + hasFbqInit);
if (hasPixelId) {
  const initMatch = layout.match(/fbq\('init',\s*'([^']+)'\)/);
  if (initMatch) console.log('  Pixel ID: ' + initMatch[1]);
}
console.log('');

// 2. Buscar fbq('track', 'Lead') en TODOS los archivos TSX
console.log('--- Buscando fbq track Lead en TSX ---');
const tsxFiles = [
  'src/app/page.tsx',
  'src/components/servicios-section.tsx',
  'src/components/herramientas-gratis.tsx'
];

tsxFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const hasFbqLead = content.includes("fbq('track', 'Lead')") || content.includes('fbq("track", "Lead")');
  const hasFbqTrack = content.includes("fbq('track'") || content.includes('fbq("track"');
  const hasWhatsApp = content.includes('wa.me') || content.includes('whatsapp');
  console.log('  ' + f + ':');
  console.log('    Tiene WhatsApp links: ' + hasWhatsApp);
  console.log('    Tiene fbq track: ' + hasFbqTrack);
  console.log('    Tiene fbq Lead: ' + hasFbqLead);
  
  // Mostrar cada link de WhatsApp con su contexto
  if (hasWhatsApp) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('wa.me/')) {
        // Buscar onClick en las lineas cercanas
        const start = Math.max(0, i - 3);
        const end = Math.min(lines.length, i + 8);
        const block = lines.slice(start, end).join('\n');
        const hasClick = block.includes('onClick');
        const hasLead = block.includes('Lead');
        const hasCalendly = block.includes('trackCalendlyClick');
        console.log('    Linea ' + (i+1) + ': wa.me link -> onClick: ' + hasClick + ', fbq Lead: ' + hasLead);
      }
    }
  }
  console.log('');
});

// 3. Buscar fbq en archivos HTML de public/
console.log('--- Buscando fbq en HTML de public/ ---');
const htmlFiles = [
  'public/calculadora-desperdicio.html',
  'public/scorecard-meta-ads.html',
  'public/benchmark-performance.html'
];

htmlFiles.forEach(f => {
  if (!fs.existsSync(f)) { console.log('  ' + f + ': ❌ NO EXISTE'); return; }
  const html = fs.readFileSync(f, 'utf8');
  const hasPixel = html.includes('connect.facebook.net');
  const hasFbqLead = html.includes("fbq('track', 'Lead')") || html.includes('fbq("track", "Lead")');
  const hasFbqInit = html.includes("fbq('init'") || html.includes('fbq("init"');
  const hasWhatsApp = html.includes('wa.me/');
  console.log('  ' + f + ':');
  console.log('    Meta Pixel script: ' + hasPixel);
  console.log('    fbq init: ' + hasFbqInit);
  console.log('    fbq Lead: ' + hasFbqLead);
  console.log('    WhatsApp link: ' + hasWhatsApp);
  
  // Mostrar el contexto del boton WhatsApp
  if (hasWhatsApp) {
    const waIdx = html.indexOf('wa.me/');
    const snippet = html.substring(Math.max(0, waIdx - 300), waIdx + 200);
    console.log('    Contexto del boton WA (500 chars):');
    console.log('    ' + snippet.replace(/\n/g, '\n    '));
  }
  console.log('');
});

// 4. Verificar gtag.ts por si tiene fbq
console.log('--- gtag.ts ---');
const gtagPath = 'src/lib/gtag.ts';
if (fs.existsSync(gtagPath)) {
  const gtag = fs.readFileSync(gtagPath, 'utf8');
  console.log('  Contiene fbq: ' + gtag.includes('fbq'));
  console.log('  Contiene Lead: ' + gtag.includes('Lead'));
} else {
  console.log('  ❌ No existe');
}
