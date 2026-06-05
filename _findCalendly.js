const fs = require('fs');
const path = 'src/app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// Encontrar todos los bloques que tienen href="https://calendly.com/carolina-mkt"
// y verificar cuales NO tienen trackCalendlyClick

const lines = code.split('\n');
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Si esta linea tiene un link de Calendly
  if (line.includes('calendly.com/carolina-mkt') && !line.includes('trackCalendlyClick')) {
    
    // Buscar hacia atras la etiqueta <a para ver si ya tiene onClick
    let searchIdx = i;
    let foundOpeningTag = false;
    let hasOnClick = false;
    
    while (searchIdx >= 0 && searchIdx >= i - 10) {
      if (lines[searchIdx].includes('<a')) {
        foundOpeningTag = true;
        // Buscar onClick en la etiqueta de apertura (puede ser multilinea)
        let tagBlock = lines.slice(searchIdx, i + 1).join('\n');
        if (tagBlock.includes('onClick') || tagBlock.includes('trackCalendlyClick')) {
          hasOnClick = true;
        }
        break;
      }
      searchIdx--;
    }
    
    if (foundOpeningTag && !hasOnClick) {
      // Mostrar contexto del link que falta
      const start = Math.max(searchIdx - 1, 0);
      const end = Math.min(i + 5, lines.length);
      console.log('\n⚠️ Calendly link SIN onClick (linea ' + (searchIdx + 1) + '):');
      for (let j = start; j < end; j++) {
        console.log('  ' + (j + 1) + ': ' + lines[j]);
      }
      fixCount++;
    }
  }
}

console.log('\nTotal Calendly links sin onClick: ' + fixCount);
console.log('\nMuestra las lineas arriba para ver donde agregar el onClick manualmente.');
