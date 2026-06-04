const fs = require('fs');
const path = require('path');

function scanAll(fp, label) {
  if (!fs.existsSync(fp)) { console.log('SKIP:', fp); return; }
  const h = fs.readFileSync(fp, 'utf8');

  // 1. Find all wa.me links
  let idx = 0;
  while ((idx = h.indexOf('wa.me/522292924043', idx)) !== -1) {
    const start = Math.max(0, idx - 400);
    const end = Math.min(h.length, idx + 300);
    const ctx = h.slice(start, end);

    // Check for tracker nearby
    const hasTrackWA = ctx.includes('trackWhatsAppClick') || ctx.includes("gtag('event','whatsapp_click'") || ctx.includes("gtag('event', 'whatsapp_click'");
    const hasTrack = ctx.includes('onClick') && hasTrackWA;

    // Try to get button text
    const afterHref = h.slice(idx, idx + 400);
    const textMatch = afterHref.match(/>([^<]{3,60})</);
    const text = textMatch ? textMatch[1].trim() : '(link)';

    // Find section context
    let section = label;
    if (ctx.includes('hero') || ctx.includes('Hero')) section += '/hero';
    if (ctx.includes('footer') || ctx.includes('Footer')) section += '/footer';

    console.log(section + ' | WhatsApp: "' + text + '" | wa.me/522292924043 | ' + (hasTrack ? 'whatsapp_click \u2713' : 'sin tracker \u2717'));
    idx += 19;
  }

  // 2. Find all Calendly links
  idx = 0;
  while ((idx = h.indexOf('calendly', idx)) !== -1) {
    const start = Math.max(0, idx - 300);
    const end = Math.min(h.length, idx + 400);
    const ctx = h.slice(start, end);

    const hasTrack = ctx.includes('trackCalendlyClick');
    const hrefMatch = ctx.match(/href="([^"]*calendly[^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : 'calendly';
    const textMatch = ctx.match(/>([^<]{3,60})</);
    const text = textMatch ? textMatch[1].trim() : '(link)';

    console.log(label + ' | Calendly: "' + text + '" | ' + href.slice(0, 60) + ' | ' + (hasTrack ? 'calendly_click \u2713' : 'sin tracker \u2717'));
    idx += 8;
  }

  // 3. Find all mailto links
  idx = 0;
  while ((idx = h.indexOf('mailto:', idx)) !== -1) {
    const start = Math.max(0, idx - 200);
    const end = Math.min(h.length, idx + 200);
    const ctx = h.slice(start, end);
    const textMatch = ctx.match(/>([^<]{3,60})</);
    const text = textMatch ? textMatch[1].trim() : '(email)';
    console.log(label + ' | Email: "' + text + '" | mailto | sin tracker \u2717');
    idx += 7;
  }

  // 4. Find WhatsApp button in HTML files (btnWA, btnWhatsapp)
  for (const bid of ['btnWA', 'btnWhatsapp']) {
    idx = h.indexOf('id="' + bid + '"');
    if (idx === -1) continue;
    const start = Math.max(0, idx - 200);
    const end = Math.min(h.length, idx + 600);
    const ctx = h.slice(start, end);

    const hasTrack = ctx.includes("gtag('event','whatsapp_click'") || ctx.includes("gtag('event', 'whatsapp_click'");

    // Get the label from onclick
    const labelMatch = ctx.match(/event_label['"]\s*:\s*['"]([^'"]+)['"]/);
    const trackLabel = labelMatch ? labelMatch[1] : '?';

    // Get button text
    const svgEnd = ctx.indexOf('</svg>');
    const aClose = ctx.indexOf('</a>', svgEnd);
    const text = svgEnd > -1 && aClose > -1 ? ctx.slice(svgEnd + 6, aClose).trim().slice(0, 60) : '(btn)';

    console.log(label + ' | WA Button: "' + text + '" | wa.me/522292924043 (din\u00e1mico) | ' + (hasTrack ? 'whatsapp_click(' + trackLabel + ') \u2713' : 'sin tracker \u2717'));
  }

  // 5. Find btn-restart buttons
  idx = 0;
  while ((idx = h.indexOf('btn-restart', idx)) !== -1) {
    const ctx = h.slice(idx, idx + 200);
    const textMatch = ctx.match(/>([^<]{3,60})</);
    const text = textMatch ? textMatch[1].trim() : '(restart)';
    console.log(label + ' | Restart: "' + text + '" | reset form | sin tracker \u2717');
    idx += 11;
  }

  // 6. Find btn-primary buttons in HTML
  idx = 0;
  while ((idx = h.indexOf('btn-primary', idx)) !== -1) {
    const ctx = h.slice(idx, idx + 200);
    const textMatch = ctx.match(/>([^<]{3,60})</);
    const text = textMatch ? textMatch[1].trim() : '(primary)';
    console.log(label + ' | Primary: "' + text + '" | calcular | sin tracker \u2717');
    idx += 11;
  }
}

console.log('SECCION | TEXTO | DESTINO | TRACKER GA4');
console.log('='.repeat(100));

scanAll('src/app/page.tsx', 'Landing');
scanAll('src/components/servicios-section.tsx', 'Servicios');
scanAll('src/components/herramientas-gratis.tsx', 'Herramientas');
scanAll('src/components/caso-exito.tsx', 'Caso Exito');
scanAll('public/calculadora-desperdicio.html', 'Calculadora');
scanAll('public/scorecard-meta-ads.html', 'Scorecard');
scanAll('public/benchmark-performance.html', 'Benchmark');
