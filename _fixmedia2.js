var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');
var lines = c.split('\n');
var fixes = 0;

// @media 1: index 381 (linea 382) = @media, index 382 (linea 383) = .card
if (lines[381] && lines[381].includes('@media') && lines[382] && lines[382].includes('.card { padding')) {
  lines[382] = lines[382].replace(
    '.card { padding: 28px 20px; }',
    '.card { padding: 28px 20px; }\n    .score-display { font-size: 42px; }'
  );
  fixes++;
  console.log('FIX 1: @media 1 -> score-display 42px');
} else { console.log('SKIP 1'); }

// @media 2: index 1068 (linea 1069) = @media, index 1069 (linea 1070) = .card
if (lines[1068] && lines[1068].includes('@media') && lines[1069] && lines[1069].includes('.card { padding')) {
  lines[1069] = lines[1069].replace(
    '.card { padding: 28px 20px; }',
    '.card { padding: 28px 20px; }\n    .score-number .num { font-size: 32px; }'
  );
  fixes++;
  console.log('FIX 2: @media 2 -> score-number .num 32px');
} else { console.log('SKIP 2'); }

// @media 3: index 1908 (linea 1909) = @media, index 1909 (linea 1910) = .card
if (lines[1908] && lines[1908].includes('@media') && lines[1909] && lines[1909].includes('.card { padding')) {
  lines[1909] = lines[1909].replace(
    '.card { padding: 28px 20px; }',
    '.card { padding: 28px 20px; }\n    .score-number .num { font-size: 32px; }'
  );
  fixes++;
  console.log('FIX 3: @media 3 -> score-number .num 32px');
} else { console.log('SKIP 3'); }

fs.writeFileSync(f, lines.join('\n'));
console.log('\nTotal fixes: ' + fixes);
