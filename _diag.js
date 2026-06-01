const fs = require('fs');
const fp = 'src/components/herramientas-gratis.tsx';
let h = fs.readFileSync(fp, 'utf8');

function showContext(label, searchText) {
  const idx = h.indexOf(searchText);
  if (idx === -1) { console.log(label, ': NO ENCONTRADO'); return; }
  const start = Math.max(0, idx - 100);
  const end = Math.min(h.length, idx + searchText.length + 400);
  console.log('\n=== ' + label + ' (pos ' + idx + ') ===');
  console.log(h.slice(start, end));
  console.log('=== FIN ===');
}

showContext('CALC BOTON', 'Quiero saber dónde se está fugando ese dinero');
showContext('SCORE BOTON', 'Quiero mi plan de mejora gratuito');
showContext('BENCH BOTON', 'Quiero ver mis oportunidades de mejora');
