var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');
var lines = c.split('\n');
var fixes = 0;

// @media 1 (linea 382): agregar font-size para score-display
if (lines[382] && lines[382].includes('@media') && lines[383] && lines[383].includes('.card')) {
  lines[383] = lines[383].replace(
    '.card { padding: 28px 20px; }',
    '.card { padding: 28px 20px; }\n    .score-display { font-size: 42px; }'
  );
  fixes++;
  console.log('FIX 1: @media linea 382 -> agregado .score-display { font-size: 42px; }');
} else { console.log('SKIP 1: @media linea 382 no encontro .card'); }

// @media 2 (linea 1069): agregar font-size para score-number
if (lines[1069] && lines[1069].includes('@media') && lines[1070] && lines[1070].includes('.card')) {
  lines[1070] = lines[1070].replace(
    '.card { padding: 28px 20px; }',
    '.card { padding: 28px 20px; }\n    .score-number .num { font-size: 32px; }'
  );
  fixes++;
  console.log('FIX 2: @media linea 1069 -> agregado .score-number .num { font-size: 32px; }');
} else { console.log('SKIP 2: @media linea 1069 no encontro .card'); }

fs.writeFileSync(f, lines.join('\n'));
console.log('\nTotal fixes: ' + fixes);
