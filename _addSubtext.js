const fs = require('fs');
let changes = 0;

function addSubtextCalc(fp) {
  if (!fs.existsSync(fp)) { console.log('SKIP:', fp); return; }
  let h = fs.readFileSync(fp, 'utf8');

  // Verificar si ya existe el subtexto
  if (h.includes('Te comparto gratuitamente una revisión inicial con las áreas')) {
    console.log('  ✓ Subtexto ya existe');
    changes++;
    return;
  }

  // Insertar después del botón WhatsApp (antes del restart button)
  const marker = '</a>\n      <button class="btn-restart"';
  if (h.includes(marker)) {
    h = h.replace(marker, '</a>\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Te comparto gratuitamente una revisión inicial con las áreas que podrían estar afectando el rendimiento de tus campañas.</p>\n      <button class="btn-restart"');
    console.log('  ✓ Subtexto insertado debajo del botón');
    changes++;
  } else {
    // Fallback: buscar cualquier cierre de btn-whatsapp seguido de btn-restart
    const re = /(<\/a>)\s*(<button class="btn-restart")/;
    if (re.test(h)) {
      h = h.replace(re, '$1\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Te comparto gratuitamente una revisión inicial con las áreas que podrían estar afectando el rendimiento de tus campañas.</p>\n      $2');
      console.log('  ✓ Subtexto insertado (fallback)');
      changes++;
    } else {
      console.log('  ⚠ No se encontró el patrón del botón');
    }
  }

  // Limpiar $497 si quedó
  h = h.replace(/<p style="font-size:12px;color:#9CA3AF;margin-top:8px;">Diagnóstico Express · \$497 MXN · 45 min · Entregable en 24h<\/p>\s*/g, '');

  fs.writeFileSync(fp, h, 'utf8');
}

function addSubtextScore(fp) {
  if (!fs.existsSync(fp)) { console.log('SKIP:', fp); return; }
  let h = fs.readFileSync(fp, 'utf8');

  if (h.includes('Recibe por WhatsApp recomendaciones específicas según tu puntuación')) {
    console.log('  ✓ Subtexto ya existe');
    changes++;
    return;
  }

  const marker = '</a>\n      <button class="btn-restart"';
  if (h.includes(marker)) {
    h = h.replace(marker, '</a>\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Recibe por WhatsApp recomendaciones específicas según tu puntuación y las áreas que están limitando el crecimiento de tus campañas.</p>\n      <button class="btn-restart"');
    console.log('  ✓ Subtexto insertado debajo del botón');
    changes++;
  } else {
    const re = /(<\/a>)\s*(<button class="btn-restart")/;
    if (re.test(h)) {
      h = h.replace(re, '$1\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Recibe por WhatsApp recomendaciones específicas según tu puntuación y las áreas que están limitando el crecimiento de tus campañas.</p>\n      $2');
      console.log('  ✓ Subtexto insertado (fallback)');
      changes++;
    } else {
      console.log('  ⚠ No se encontró el patrón del botón');
    }
  }

  h = h.replace(/<p style="font-size:12px;color:#9CA3AF;margin-top:8px;">Diagnóstico Express · \$497 MXN · 45 min · Entregable en 24h<\/p>\s*/g, '');

  fs.writeFileSync(fp, h, 'utf8');
}

function addSubtextBench(fp) {
  if (!fs.existsSync(fp)) { console.log('SKIP:', fp); return; }
  let h = fs.readFileSync(fp, 'utf8');

  if (h.includes('Te comparto una interpretación profesional de tus métricas')) {
    console.log('  ✓ Subtexto ya existe');
    changes++;
    return;
  }

  // Benchmark puede usar btn-restart o diferente estructura
  const marker1 = '</a>\n      <button class="btn-restart"';
  const marker2 = '</a>\n      <p style="font-size:12px;color:#9CA3AF;';
  
  if (h.includes(marker1)) {
    h = h.replace(marker1, '</a>\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Te comparto una interpretación profesional de tus métricas y las oportunidades de optimización detectadas en tu benchmark.</p>\n      <button class="btn-restart"');
    console.log('  ✓ Subtexto insertado debajo del botón');
    changes++;
  } else if (h.includes(marker2)) {
    h = h.replace(marker2, '</a>\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Te comparto una interpretación profesional de tus métricas y las oportunidades de optimización detectadas en tu benchmark.</p>\n      <p style="font-size:12px;color:#9CA3AF;');
    console.log('  ✓ Subtexto insertado (antes del párrafo de precio viejo)');
    changes++;
  } else {
    // Fallback regex
    const re = /(<a[^>]*class="btn-whatsapp"[^>]*>[\s\S]*?<\/a>)/;
    if (re.test(h)) {
      h = h.replace(re, '$1\n      <p style="font-size:13px;color:#9CA3AF;margin-top:10px;line-height:1.5;">Te comparto una interpretación profesional de tus métricas y las oportunidades de optimización detectadas en tu benchmark.</p>');
      console.log('  ✓ Subtexto insertado (regex fallback)');
      changes++;
    } else {
      console.log('  ⚠ No se encontró el patrón del botón');
    }
  }

  h = h.replace(/<p style="font-size:12px;color:#9CA3AF;margin-top:8px;">Diagnóstico Express · \$497 MXN · 45 min · Entregable en 24h<\/p>\s*/g, '');

  fs.writeFileSync(fp, h, 'utf8');
}

function addSubtextTSX(fp) {
  if (!fs.existsSync(fp)) { console.log('SKIP tsx:', fp); return; }
  let h = fs.readFileSync(fp, 'utf8');

  let modified = false;

  // Calculadora subtexto
  if (!h.includes('Te comparto gratuitamente una revisión inicial con las áreas')) {
    h = h.replace(/(Quiero saber dónde se está fugando ese dinero\s*<\/a>)/g,
      '$1\n      <p style={{fontSize:"13px",color:"#9CA3AF",marginTop:"10px",lineHeight:"1.5"}}>Te comparto gratuitamente una revisión inicial con las áreas que podrían estar afectando el rendimiento de tus campañas.</p>');
    if (h.includes('Te comparto gratuitamente una revisión inicial')) { console.log('  ✓ TSX: Calc subtexto insertado'); modified = true; }
  } else { console.log('  ✓ TSX: Calc subtexto ya existe'); }

  // Scorecard subtexto
  if (!h.includes('Recibe por WhatsApp recomendaciones específicas según tu puntuación')) {
    h = h.replace(/(Quiero mi plan de mejora gratuito\s*<\/a>)/g,
      '$1\n      <p style={{fontSize:"13px",color:"#9CA3AF",marginTop:"10px",lineHeight:"1.5"}}>Recibe por WhatsApp recomendaciones específicas según tu puntuación y las áreas que están limitando el crecimiento de tus campañas.</p>');
    if (h.includes('Recibe por WhatsApp recomendaciones específicas')) { console.log('  ✓ TSX: Score subtexto insertado'); modified = true; }
  } else { console.log('  ✓ TSX: Score subtexto ya existe'); }

  // Benchmark subtexto
  if (!h.includes('Te comparto una interpretación profesional de tus métricas')) {
    h = h.replace(/(Quiero ver mis oportunidades de mejora\s*<\/a>)/g,
      '$1\n      <p style={{fontSize:"13px",color:"#9CA3AF",marginTop:"10px",lineHeight:"1.5"}}>Te comparto una interpretación profesional de tus métricas y las oportunidades de optimización detectadas en tu benchmark.</p>');
    if (h.includes('Te comparto una interpretación profesional de tus métricas')) { console.log('  ✓ TSX: Bench subtexto insertado'); modified = true; }
  } else { console.log('  ✓ TSX: Bench subtexto ya existe'); }

  // Limpiar precios del TSX
  h = h.replace(/<p style="font-size:12px;color:#9CA3AF;margin-top:8px;">Diagnóstico Express · \$497 MXN · 45 min · Entregable en 24h<\/p>\s*/g, '');
  h = h.replace(/\{["']Diagnóstico Express · \$497 MXN · 45 min · Entregable en 24h["']\}\s*/g, '');

  if (modified) changes++;
  fs.writeFileSync(fp, h, 'utf8');
}

console.log('========================================');
console.log('INSERTAR SUBTEXTOS DEBAJO DEL BOTÓN');
console.log('========================================\n');

console.log('--- Calculadora ---');
addSubtextCalc('public/calculadora-desperdicio.html');

console.log('\n--- Scorecard ---');
addSubtextScore('public/scorecard-meta-ads.html');

console.log('\n--- Benchmark ---');
addSubtextBench('public/benchmark-performance.html');

console.log('\n--- TSX ---');
addSubtextTSX('src/components/herramientas-gratis.tsx');

console.log('\n========================================');
console.log('SUBTEXTOS INSERTADOS:', changes, '/ 3');
console.log('========================================');
