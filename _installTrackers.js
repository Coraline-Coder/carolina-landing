const fs = require('fs');
let ok = 0;

// ============================================
// PRIORIDAD 1 — CALENDLY TRACKERS en page.tsx
// ============================================
const pagePath = 'src/app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

// 1a. Update import to include trackCalendlyClick
if (!page.includes('trackCalendlyClick')) {
  page = page.replace(
    "import { trackWhatsAppClick } from '@/lib/gtag'",
    "import { trackWhatsAppClick, trackCalendlyClick } from '@/lib/gtag'"
  );
  console.log('\u2713 page.tsx: trackCalendlyClick added to import');
}

// 1b. Add onClick to each Calendly link
// Find all occurrences of calendly.com/carolina-mkt
let cIdx = 0;
let cCount = 0;
while ((cIdx = page.indexOf('calendly.com/carolina-mkt', cIdx)) !== -1) {
  cCount++;

  // Find the <a tag before this href
  const aIdx = page.lastIndexOf('<a', cIdx);
  if (aIdx === -1) { cIdx += 25; continue; }

  // Find the > that closes the <a opening tag
  const aEnd = page.indexOf('>', aIdx);
  if (aEnd === -1 || aEnd > cIdx + 200) { cIdx += 25; continue; }

  const aTag = page.slice(aIdx, aEnd + 1);
  if (aTag.includes('trackCalendlyClick')) {
    console.log('  Calendly #' + cCount + ': already has tracker');
    cIdx += 25;
    continue;
  }

  // Add onClick before the closing >
  const oc = " onClick={() => trackCalendlyClick()}";
  page = page.slice(0, aEnd) + oc + page.slice(aEnd);
  console.log('\u2713 Calendly #' + cCount + ': tracker added');
  ok++;
  cIdx = page.indexOf('calendly.com/carolina-mkt', cIdx) + 25;
}

fs.writeFileSync(pagePath, page, 'utf8');
console.log('P1 done: ' + ok + ' Calendly trackers added');

// ============================================
// PRIORIDAD 2 — LEAD MAGNET START TRACKERS
// ============================================

// --- 2a. Calculadora: "Calcular mi desperdicio" ---
let calcOk = 0;
const calcPath = 'public/calculadora-desperdicio.html';
if (fs.existsSync(calcPath)) {
  let h = fs.readFileSync(calcPath, 'utf8');

  const btnText = 'Calcular mi desperdicio';
  const bIdx = h.indexOf(btnText);
  if (bIdx > -1) {
    // Find the <button before this text
    const btnIdx = h.lastIndexOf('<button', bIdx);
    const btnEnd = h.indexOf('>', btnIdx);
    if (btnIdx > -1 && btnEnd > -1) {
      const btnTag = h.slice(btnIdx, btnEnd + 1);
      if (btnTag.includes('onclick')) {
        // Add gtag to existing onclick
        const existingOc = h.match(/onclick="([^"]*)"/);
        if (existingOc) {
          const newOc = "onclick=\"gtag('event', 'calculadora_inicio', {'event_category': 'lead_magnet', 'event_label': 'calculadora_desperdicio'}); " + existingOc[1] + "\"";
          h = h.replace(existingOc[0], newOc);
          console.log('\u2713 Calculadora: tracker added to existing onclick');
          calcOk++;
        }
      } else {
        const oc = " onclick=\"gtag('event', 'calculadora_inicio', {'event_category': 'lead_magnet', 'event_label': 'calculadora_desperdicio'}); \"";
        h = h.slice(0, btnEnd) + oc + h.slice(btnEnd);
        console.log('\u2713 Calculadora: tracker onclick added');
        calcOk++;
      }
    }
  }
  fs.writeFileSync(calcPath, h, 'utf8');
}

// --- 2b. Scorecard: first "Continuar" button ---
const scorePath = 'public/scorecard-meta-ads.html';
if (fs.existsSync(scorePath)) {
  let h = fs.readFileSync(scorePath, 'utf8');

  // Find the first "Continuar" button
  const bIdx = h.indexOf('Continuar');
  if (bIdx > -1) {
    const btnIdx = h.lastIndexOf('<button', bIdx);
    const btnEnd = h.indexOf('>', btnIdx);
    if (btnIdx > -1 && btnEnd > -1) {
      const btnTag = h.slice(btnIdx, btnEnd + 1);
      if (btnTag.includes('onclick')) {
        const existingOc = h.match(/onclick="([^"]*)"/);
        if (existingOc) {
          const newOc = "onclick=\"gtag('event', 'scorecard_inicio', {'event_category': 'lead_magnet', 'event_label': 'scorecard_madurez'}); " + existingOc[1] + "\"";
          h = h.replace(existingOc[0], newOc);
          console.log('\u2713 Scorecard: tracker added to existing onclick');
        }
      } else {
        const oc = " onclick=\"gtag('event', 'scorecard_inicio', {'event_category': 'lead_magnet', 'event_label': 'scorecard_madurez'}); \"";
        h = h.slice(0, btnEnd) + oc + h.slice(btnEnd);
        console.log('\u2713 Scorecard: tracker onclick added');
      }
    }
  }
  fs.writeFileSync(scorePath, h, 'utf8');
}

// --- 2c. Benchmark: "Continuar" (step 1) + "Ver mi benchmark" ---
const benchPath = 'public/benchmark-performance.html';
if (fs.existsSync(benchPath)) {
  let h = fs.readFileSync(benchPath, 'utf8');

  // Find "Continuar" button (step 1)
  const contIdx = h.indexOf('Continuar');
  if (contIdx > -1) {
    const btnIdx = h.lastIndexOf('<button', contIdx);
    const btnEnd = h.indexOf('>', btnIdx);
    if (btnIdx > -1 && btnEnd > -1) {
      const btnTag = h.slice(btnIdx, btnEnd + 1);
      if (btnTag.includes('onclick')) {
        const existingOc = h.match(/onclick="([^"]*)"/);
        if (existingOc) {
          const newOc = "onclick=\"gtag('event', 'benchmark_inicio', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance'}); " + existingOc[1] + "\"";
          h = h.replace(existingOc[0], newOc);
          console.log('\u2713 Benchmark Continuar: tracker added');
        }
      } else {
        const oc = " onclick=\"gtag('event', 'benchmark_inicio', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance'}); \"";
        h = h.slice(0, btnEnd) + oc + h.slice(btnEnd);
        console.log('\u2713 Benchmark Continuar: tracker onclick added');
      }
    }
  }

  // Find "Ver mi benchmark" button — add benchmark_completado with score
  const verIdx = h.indexOf('Ver mi benchmark');
  if (verIdx > -1) {
    const btnIdx = h.lastIndexOf('<button', verIdx);
    const btnEnd = h.indexOf('>', btnIdx);
    if (btnIdx > -1 && btnEnd > -1) {
      const btnTag = h.slice(btnIdx, btnEnd + 1);
      if (btnTag.includes('onclick')) {
        const existingOc = h.match(/onclick="([^"]*)"/);
        if (existingOc) {
          const newOc = "onclick=\"gtag('event', 'benchmark_completado', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance', 'value': typeof totalScore !== 'undefined' ? totalScore : 0}); " + existingOc[1] + "\"";
          h = h.replace(existingOc[0], newOc);
          console.log('\u2713 Benchmark Ver mi benchmark: tracker + score added');
        }
      } else {
        const oc = " onclick=\"gtag('event', 'benchmark_completado', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance', 'value': typeof totalScore !== 'undefined' ? totalScore : 0}); \"";
        h = h.slice(0, btnEnd) + oc + h.slice(btnEnd);
        console.log('\u2713 Benchmark Ver mi benchmark: tracker + score onclick added');
      }
    }
  }

  fs.writeFileSync(benchPath, h, 'utf8');
}

console.log('\n========================================');
console.log('ALL TRACKERS INSTALLED');
console.log('========================================');
