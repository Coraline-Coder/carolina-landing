const fs = require('fs');
const path = 'src/app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// MAS PRECISO: encontrar bloques <a ... > completos con calendly href
// y verificar si el bloque tiene onClick

const lines = code.split('\n');
let results = [];

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes('calendly.com/carolina-mkt')) continue;
  
  // Buscar el inicio del tag <a hacia atras
  let tagStart = i;
  for (let j = i; j >= Math.max(0, i - 15); j--) {
    if (lines[j].includes('<a')) { tagStart = j; break; }
  }
  
  // Buscar el cierre > del tag de apertura
  let tagEnd = i;
  for (let j = i; j < Math.min(lines.length, i + 15); j++) {
    if (lines[j].match(/>/)) { tagEnd = j; break; }
  }
  
  // Obtener todo el bloque del tag <a ... >
  const tagBlock = lines.slice(tagStart, tagEnd + 1).join('\n');
  const hasOnClick = tagBlock.includes('onClick');
  
  results.push({
    line: tagStart + 1,
    hasOnClick,
    block: tagBlock
  });
}

console.log('=== Calendly links encontrados ===\n');
results.forEach((r, idx) => {
  console.log('LINK ' + (idx + 1) + ' (linea ' + r.line + '):');
  console.log('   Tiene onClick: ' + r.hasOnClick);
  if (r.hasOnClick) {
    console.log('   ✅ YA TIENE - no tocar');
  } else {
    console.log('   ❌ FALTA onClick');
  }
  console.log('');
});

const missing = results.filter(r => !r.hasOnClick);
console.log('Total sin onClick: ' + missing.length);
