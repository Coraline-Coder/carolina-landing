const fs = require('fs');
let ok = 0;

// ============================================
// 3. MODIFICAR page.tsx — WhatsApp trackers
// ============================================
const pagePath = 'src/app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

// Add import
if (!page.includes('trackWhatsAppClick')) {
  page = page.replace(
    "import Script from 'next/script'",
    "import Script from 'next/script'\nimport { trackWhatsAppClick } from '@/lib/gtag'"
  );
  if (!page.includes("from 'next/script'")) {
    page = "import { trackWhatsAppClick } from '@/lib/gtag'\n" + page;
  }
  console.log('\u2713 page.tsx: import added');
}

// Find and add onClick to each wa.me link
// Pattern: <a href="https://wa.me/522292924043...
// Need to add onClick={() => trackWhatsAppClick('section')}

// We need to identify which section each link belongs to
// Let's find each occurrence and its context
const sections = [
  { search: 'Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento', label: 'hero' },
  { search: 'agendar%20una%20llamada%20estrat%C3%A9gica', label: 'metodo_pulso' },
  { search: 'vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa', label: 'footer' },
];

for (const sec of sections) {
  const idx = page.indexOf(sec.search);
  if (idx === -1) { console.log('  SKIP section ' + sec.label + ': not found'); continue; }

  // Find the <a before this
  const aBefore = page.lastIndexOf('<a', idx);
  if (aBefore === -1) continue;

  // Check if onClick already exists on this <a
  const aEnd = page.indexOf('>', aBefore);
  const aTag = page.slice(aBefore, aEnd);
  if (aTag.includes('onClick')) { console.log('  ' + sec.label + ': already has onClick'); continue; }

  // Add onClick before the closing >
  const onClick = " onClick={() => trackWhatsAppClick('" + sec.label + "')}";
  page = page.slice(0, aEnd) + onClick + page.slice(aEnd);
  console.log('\u2713 page.tsx: ' + sec.label + ' WhatsApp tracked');
}

fs.writeFileSync(pagePath, page, 'utf8');
ok++;

// ============================================
// 4. MODIFICAR servicios-section.tsx
// ============================================
const servPath = 'src/components/servicios-section.tsx';
if (fs.existsSync(servPath)) {
  let serv = fs.readFileSync(servPath, 'utf8');

  if (!serv.includes('trackWhatsAppClick')) {
    serv = "import { trackWhatsAppClick } from '@/lib/gtag'\n" + serv;
    console.log('\u2713 servicios-section.tsx: import added');
  }

  // Add onClick to each wa.me link - find all occurrences
  let sIdx = 0;
  let sCount = 0;
  while ((sIdx = serv.indexOf('wa.me/522292924043', sIdx)) !== -1) {
    const aBefore = serv.lastIndexOf('href=', sIdx);
    const lineStart = serv.lastIndexOf('\n', aBefore) + 1;
    const lineEnd = serv.indexOf('\n', sIdx);

    // Check if onClick already on this line
    const lineText = serv.slice(lineStart, lineEnd);
    if (lineText.includes('onClick')) { sIdx += 19; continue; }

    // Find the > that opens the <a tag area
    // Look for <a before this href
    const aIdx = serv.lastIndexOf('<a', sIdx);
    const aEndIdx = serv.indexOf('>', aIdx);
    if (aEndIdx > sIdx) { sIdx += 19; continue; } // > is after href, skip

    const label = sCount === 0 ? 'servicios' : 'servicios_cta';
    const oc = " onClick={() => trackWhatsAppClick('" + label + "')}";
    serv = serv.slice(0, aEndIdx) + oc + serv.slice(aEndIdx);
    console.log('\u2713 servicios-section.tsx: WhatsApp link #' + (sCount + 1) + ' tracked (' + label + ')');
    sCount++;
    sIdx = serv.indexOf('wa.me/522292924043', sIdx) + 19;
  }

  fs.writeFileSync(servPath, serv, 'utf8');
  ok++;
}

// ============================================
// 5. GA4 + trackers en public/*.html (iframes)
// ============================================
const htmlFiles = [
  { fp: 'public/calculadora-desperdicio.html', label: 'calculadora' },
  { fp: 'public/scorecard-meta-ads.html', label: 'scorecard' },
  { fp: 'public/benchmark-performance.html', label: 'benchmark' },
];

const ga4Head = `
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-19E6F6BWZ4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-19E6F6BWZ4');
    </script>
`;

for (const f of htmlFiles) {
  if (!fs.existsSync(f.fp)) { console.log('SKIP:', f.fp); continue; }
  let h = fs.readFileSync(f.fp, 'utf8');

  // Add GA4 in head
  if (!h.includes('G-19E6F6BWZ4')) {
    h = h.replace('</head>', ga4Head + '  </head>');
    console.log('\u2713 ' + f.fp + ': GA4 snippet added');
  } else {
    console.log('\u2713 ' + f.fp + ': GA4 already exists');
  }

  // Add onclick to WhatsApp buttons
  // Find the btnWA or btnWhatsapp and add onclick
  const btnIds = ['btnWA', 'btnWhatsapp'];
  for (const bid of btnIds) {
    const bIdx = h.indexOf('id="' + bid + '"');
    if (bIdx === -1) continue;

    // Find the <a before
    const aIdx = h.lastIndexOf('<a', bIdx);
    const aEnd = h.indexOf('>', bIdx);
    if (aIdx === -1 || aEnd === -1) continue;

    const aTag = h.slice(aIdx, aEnd + 1);
    if (aTag.includes('onclick')) {
      console.log('  ' + bid + ': already has onclick');
      continue;
    }

    const oc = " onclick=\"gtag('event','whatsapp_click',{event_category:'conversion',event_label:'" + f.label + "'})\"";
    h = h.slice(0, aEnd) + oc + h.slice(aEnd);
    console.log('\u2713 ' + f.fp + ': ' + bid + ' onclick added');
  }

  fs.writeFileSync(f.fp, h, 'utf8');
  ok++;
}

console.log('\n========================================');
console.log('Part 2 done:', ok);
console.log('========================================');
