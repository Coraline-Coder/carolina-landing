var fs = require('fs');
var c = fs.readFileSync('calculadora-desperdicio.html', 'utf8');
var lines = c.split('\n');
console.log('Total lineas: ' + lines.length);
console.log('\n--- Buscando 52231 o 52229 ---');
lines.forEach(function(l, i) {
  if (l.includes('52231') || l.includes('52229') || l.includes('wa.me')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 130));
  }
});
console.log('\n--- Buscando CJB ---');
lines.forEach(function(l, i) {
  if (l.includes('CJB')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 130));
  }
});
