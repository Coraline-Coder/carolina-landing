const fs = require('fs');
let ok = 0;

// ============================================
// PARTE 1 — CALENDLY en page.tsx
// ============================================
const pagePath = 'src/app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

// Update import
if (!page.includes('trackCalendlyClick')) {
  page = page.replace(
    "import { trackWhatsAppClick } from '@/lib/gtag'",
    "import { trackWhatsAppClick, trackCalendlyClick } from '@/lib/gtag'"
  );
  console.log('\u2713 page.tsx: trackCalendlyClick import added');
}

// Add onClick to all Calendly links
let cIdx = 0;
let cCount = 0;
while ((cIdx = page.indexOf('calendly.com/carolina-mkt', cIdx)) !== -1) {
  cCount++;
  const aIdx = page.lastIndexOf('<a', cIdx);
  if (aIdx === -1) { cIdx += 25; continue; }
  const aEnd = page.indexOf('>', aIdx);
  if (aEnd === -1 || aEnd > cIdx + 200) { cIdx += 25; continue; }

  const aTag = page.slice(aIdx, aEnd + 1);
  if (aTag.includes('trackCalendlyClick')) {
    console.log('  Calendly #' + cCount + ': already tracked');
    cIdx += 25;
    continue;
  }

  const oc = " onClick={() => trackCalendlyClick()}";
  page = page.slice(0, aEnd) + oc + page.slice(aEnd);
  console.log('\u2713 Calendly #' + cCount + ': tracker added');
  ok++;
  cIdx = page.indexOf('calendly.com/carolina-mkt', cIdx) + 25;
}
fs.writeFileSync(pagePath, page, 'utf8');
console.log('P1 Calendly: done\n');

// ============================================
// PARTE 2 — CALCULADORA
// ============================================
const calcPath = 'public/calculadora-desperdicio.html';
let calc = fs.readFileSync(calcPath, 'utf8');

// calculadora_inicio already exists on button ✅

// Add calculadora_completada INSIDE calcular() function after desperdicio is calculated
// Find where desperdicio is assigned and add gtag after
if (!calc.includes('calculadora_completada')) {
  // Look for the line where desperdicio gets its final value
  // Pattern: desperdicio = ... or const desperdicio = ...
  // Find "desperdicio" assignment inside calcular()
  const calcFnStart = calc.indexOf('function calcular()');
  if (calcFnStart > -1) {
    // Find the desperdicio calculation - look for the last assignment
    const fnEnd = calc.indexOf('function restart()', calcFnStart);
    const fnBody = calc.slice(calcFnStart, fnEnd > -1 ? fnEnd : calcFnStart + 2000);

    // Find where results display starts (where we know desperdicio is calculated)
    // Look for the line that shows results: document.getElementById('results')
    const showResultsIdx = fnBody.indexOf("document.getElementById('results')");
    if (showResultsIdx > -1) {
      // Insert gtag just before showing results
      const insertPoint = calcFnStart + showResultsIdx;
      const gtagLine = "  gtag('event', 'calculadora_completada', {'event_category': 'lead_magnet', 'event_label': 'calculadora_desperdicio', 'value': Math.round(desperdicio)});\n";
      calc = calc.slice(0, insertPoint) + gtagLine + calc.slice(insertPoint);
      console.log('\u2713 Calculadora: calculadora_completada added inside calcular()');
      ok++;
    } else {
      console.log('\u26a0 Calculadora: could not find results display point');
    }
  }
} else {
  console.log('\u2713 Calculadora: calculadora_completada already exists');
}
fs.writeFileSync(calcPath, calc, 'utf8');

// ============================================
// PARTE 3 — SCORECARD
// ============================================
const scorePath = 'public/scorecard-meta-ads.html';
let score = fs.readFileSync(scorePath, 'utf8');

// 3a. Add scorecard_inicio to first nextQ() button
if (!score.includes('scorecard_inicio')) {
  // Find first onclick="nextQ()"
  const firstNextQ = score.indexOf('onclick="nextQ()"');
  if (firstNextQ > -1) {
    score = score.replace('onclick="nextQ()"', "onclick=\"gtag('event', 'scorecard_inicio', {'event_category': 'lead_magnet', 'event_label': 'scorecard_madurez'}); nextQ()\"");
    console.log('\u2713 Scorecard: scorecard_inicio added to first nextQ button');
    ok++;
  }
} else {
  console.log('\u2713 Scorecard: scorecard_inicio already exists');
}

// 3b. Add scorecard_completado inside mostrarResultados()
if (!score.includes('scorecard_completado')) {
  const fnStart = score.indexOf('function mostrarResultados()');
  if (fnStart > -1) {
    // Find where score/points is calculated - look for the line after score calculation
    // Insert gtag right at the start of the function body
    const fnBodyStart = score.indexOf('{', fnStart) + 1;
    // Find the score variable - look for common patterns
    const fnEnd = score.indexOf('function restart()', fnStart);
    const fnBody = score.slice(fnBodyStart, fnEnd > -1 ? fnEnd : fnBodyStart + 3000);

    // Look for total points/score calculation
    // Try to find where score is finalized
    let insertAt = -1;

    // Pattern: document.getElementById('results') or showing results
    const resultsShow = fnBody.indexOf("document.getElementById('results')");
    if (resultsShow > -1) {
      insertAt = fnBodyStart + resultsShow;
    } else {
      // Just insert at start of function
      insertAt = fnBodyStart;
    }

    // Find the score variable name
    // Common: score, puntos, totalScore, total
    const scoreVar = fnBody.match(/(?:const|let|var)\s+(score|puntos|totalScore|total|pts)\s*=/);
    const scoreName = scoreVar ? scoreVar[1] : '0';

    const gtagLine = "  gtag('event', 'scorecard_completado', {'event_category': 'lead_magnet', 'event_label': 'scorecard_madurez', 'value': Math.round(" + scoreName + ")});\n";
    score = score.slice(0, insertAt) + gtagLine + score.slice(insertAt);
    console.log('\u2713 Scorecard: scorecard_completado added (score var: ' + scoreName + ')');
    ok++;
  }
} else {
  console.log('\u2713 Scorecard: scorecard_completado already exists');
}
fs.writeFileSync(scorePath, score, 'utf8');

// ============================================
// PARTE 4 — BENCHMARK
// ============================================
const benchPath = 'public/benchmark-performance.html';
let bench = fs.readFileSync(benchPath, 'utf8');

// 4a. benchmark_inicio already on Continuar button ✅

// 4b. Add benchmark_calculando to "Ver mi benchmark" button
// Currently: onclick="calcular()" or onclick="gtag(...) calcular()"
const verBtn = bench.indexOf('Ver mi benchmark');
if (verBtn > -1) {
  const btnIdx = bench.lastIndexOf('<button', verBtn);
  const btnEnd = bench.indexOf('>', btnIdx);
  if (btnIdx > -1 && btnEnd > -1) {
    const btnTag = bench.slice(btnIdx, btnEnd + 1);
    if (!btnTag.includes('benchmark_calculando')) {
      // Check current onclick
      const ocMatch = btnTag.match(/onclick="([^"]*)"/);
      if (ocMatch) {
        const newOc = "onclick=\"gtag('event', 'benchmark_calculando', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance'}); " + ocMatch[1] + "\"";
        bench = bench.replace(ocMatch[0], newOc);
        console.log('\u2713 Benchmark: benchmark_calculando added to Ver mi benchmark button');
        ok++;
      }
    } else {
      console.log('\u2713 Benchmark: benchmark_calculando already exists');
    }
  }
}

// 4c. Add benchmark_completado with totalScore INSIDE calcular() function
// Need to move it from onclick to inside the function where totalScore is known
if (!bench.includes("gtag('event', 'benchmark_completado'")) {
  // Not present at all - add inside calcular()
  const calcFnStart = bench.indexOf('function calcular()');
  if (calcFnStart > -1) {
    const resultsIdx = bench.indexOf("document.getElementById('resultsCard')", calcFnStart);
    if (resultsIdx > -1) {
      const gtagLine = "  gtag('event', 'benchmark_completado', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance', 'value': Math.round(totalScore)});\n";
      bench = bench.slice(0, resultsIdx) + gtagLine + bench.slice(resultsIdx);
      console.log('\u2713 Benchmark: benchmark_completado added inside calcular() with totalScore');
      ok++;
    }
  }
} else {
  // Already exists somewhere - check if it has totalScore value
  if (bench.includes("benchmark_completado") && !bench.includes("Math.round(totalScore)")) {
    // It's on the onclick but needs to be inside the function with the value
    // Add it inside calcular() function
    const calcFnStart = bench.indexOf('function calcular()');
    if (calcFnStart > -1) {
      const resultsIdx = bench.indexOf("document.getElementById('resultsCard')", calcFnStart);
      if (resultsIdx > -1) {
        const gtagLine = "  gtag('event', 'benchmark_completado', {'event_category': 'lead_magnet', 'event_label': 'benchmark_performance', 'value': Math.round(totalScore)});\n";
        bench = bench.slice(0, resultsIdx) + gtagLine + bench.slice(resultsIdx);
        console.log('\u2713 Benchmark: benchmark_completado with totalScore added inside calcular()');
        ok++;
      }
    }
  } else {
    console.log('\u2713 Benchmark: benchmark_completado with totalScore already exists');
  }
}
fs.writeFileSync(benchPath, bench, 'utf8');

console.log('\n========================================');
console.log('ALL TRACKERS INSTALLED:', ok);
console.log('========================================');

// FINAL VERIFICATION
console.log('\n=== VERIFICATION ===');
const checks = [
  { fp: 'src/app/page.tsx', patterns: ['trackCalendlyClick'] },
  { fp: 'public/calculadora-desperdicio.html', patterns: ['calculadora_inicio', 'calculadora_completada', 'Math.round(desperdicio)'] },
  { fp: 'public/scorecard-meta-ads.html', patterns: ['scorecard_inicio', 'scorecard_completado'] },
  { fp: 'public/benchmark-performance.html', patterns: ['benchmark_inicio', 'benchmark_calculando', 'benchmark_completado', 'Math.round(totalScore)'] },
];
for (const c of checks) {
  const v = fs.readFileSync(c.fp, 'utf8');
  for (const p of c.patterns) {
    console.log(c.fp.split('/')[1] + ': ' + p + ' = ' + v.includes(p));
  }
}
