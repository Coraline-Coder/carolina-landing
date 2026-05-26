var fs = require('fs');
var f = 'calculadora-desperdicio.html';
var c = fs.readFileSync(f, 'utf8');
var lines = c.split('\n');
var fixes = 0;

if (lines[566] && lines[566].includes('522311396364')) {
  lines[566] = lines[566].replace('522311396364', '522292924043');
  fixes++;
  console.log('FIX 1: Linea 567 -> 522311396364 cambiado a 522292924043');
} else { console.log('SKIP 1: Linea 567 no contiene 522311396364'); }

if (lines[489] && lines[489].includes('CJB by Carolina Betancourt')) {
  lines[489] = lines[489].replace('CJB by Carolina Betancourt', 'Carolina Betancourt');
  fixes++;
  console.log('FIX 2: Linea 490 -> "CJB by Carolina Betancourt" cambiado a "Carolina Betancourt"');
} else { console.log('SKIP 2: Linea 490 no contiene "CJB by Carolina Betancourt"'); }

fs.writeFileSync(f, lines.join('\n'));
console.log('\nTotal cambios: ' + fixes);
