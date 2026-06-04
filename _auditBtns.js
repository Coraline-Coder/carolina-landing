const fs = require('fs');
const path = require('path');

// ============================================
// Scan ALL buttons and links
// ============================================

function scanFile(fp, label) {
  if (!fs.existsSync(fp)) { console.log('SKIP:', fp); return; }
  const h = fs.readFileSync(fp, 'utf8');

  // Find all <a and <button elements
  const re = /<(a|button)\s[^>]*>/gi;
  let m;
  while ((m = re.exec(h)) !== null) {
    const tag = m[0];
    const fullTag = tag;

    // Get href for <a>
    const hrefMatch = fullTag.match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : '';

    // Get onclick
    const onclickMatch = fullTag.match(/onclick="([^"]*)"/);
    const onclick = onclickMatch ? onclickMatch[1] : '';

    // Get text content (rough - between > and </a> or </button>)
    const afterTag = h.slice(m.index + fullTag.length, m.index + fullTag.length + 200);
    const textMatch = afterTag.match(/^[^<]*</);
    let text = textMatch ? afterTag.slice(0, textMatch.index).trim().slice(0, 60) : afterTag.slice(0, 60).trim();

    // Skip SVG content, empty, style-only links
    if (!href && !onclick) continue;
    if (href === '#' || href.startsWith('javascript')) continue;
    if (text.includes('<svg') || text.includes('{')) text = '(see inner content)';

    // Check for GA4 tracker
    const hasGA4 = onclick.includes('gtag') || onclick.includes('trackWhatsAppClick') || onclick.includes('trackDiagnostico') || onclick.includes('trackCalendly');
    const tracker = hasGA4 ? 'GA4 \u2713' : 'sin tracker \u2717';

    // Where it goes
    let destination = '';
    if (href.includes('wa.me') || href.includes('522292924043')) destination = 'WhatsApp';
    else if (href.includes('calendly')) destination = 'Calendly';
    else if (href.includes('mailto')) destination = 'Email';
    else if (href.startsWith('http')) destination = href.slice(0, 60);
    else if (href.startsWith('#')) destination = 'Anchor: ' + href;
    else if (href.startsWith('/')) destination = 'Internal: ' + href;
    else destination = href || '(onclick only)';

    console.log(label + ' | "' + text + '" | ' + destination + ' | ' + tracker);
  }
}

console.log('SECCION | TEXTO DEL BOTON | A DONDE VA | TRACKER GA4');
console.log('='.repeat(90));

// Landing page components
scanFile('src/app/page.tsx', 'Landing (page.tsx)');

// Component files
const compDir = 'src/components';
if (fs.existsSync(compDir)) {
  const files = fs.readdirSync(compDir);
  for (const f of files) {
    if (!f.endsWith('.tsx') && !f.endsWith('.jsx')) continue;
    const fp = path.join(compDir, f);
    scanFile(fp, f.replace('.tsx','').replace('.jsx',''));
  }
}

// Public HTML files (lead magnets in iframes)
scanFile('public/calculadora-desperdicio.html', 'Calculadora HTML');
scanFile('public/scorecard-meta-ads.html', 'Scorecard HTML');
scanFile('public/benchmark-performance.html', 'Benchmark HTML');
