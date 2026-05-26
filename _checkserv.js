var fs = require('fs');
var c = fs.readFileSync('src/components/servicios-section.tsx', 'utf8');
var lines = c.split('\n');
console.log('Total lineas: ' + lines.length);
console.log('\n--- Buscando grid, responsive, mobile, width, breakpoint ---');
lines.forEach(function(l, i) {
  var t = l.toLowerCase();
  if (t.includes('grid') || t.includes('mobile') || t.includes('responsive') || t.includes('window') || t.includes('innerwidth') || t.includes('usestate') || t.includes('breakpoint') || t.includes('768') || t.includes('480') || t.includes('640')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 130));
  }
});
console.log('\n--- Primeras 30 y ultimas 30 lineas ---');
lines.slice(0, 30).forEach(function(l, i) { console.log((i+1) + ': ' + l); });
console.log('...');
lines.slice(-30).forEach(function(l, i) { console.log((lines.length - 29 + i) + ': ' + l); });
