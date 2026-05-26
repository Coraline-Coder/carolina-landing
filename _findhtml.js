var fs = require('fs');
console.log('En raiz: ' + fs.existsSync('calculadora-desperdicio.html'));
console.log('En public: ' + fs.existsSync('public/calculadora-desperdicio.html'));

// Buscar donde se referencia
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');
lines.forEach(function(l, i) {
  if (l.includes('calculadora-desperdicio')) {
    console.log('Referencia en herramientas-gratis.tsx:' + (i+1) + ' -> ' + l.trim().substring(0, 130));
  }
});
