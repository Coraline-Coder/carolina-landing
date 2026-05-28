var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');
var orig = c;

// Reemplazar todas las ocurrencias de "CJB" en los HTML templates
// Badge: "CJB · Herramienta Gratuita" -> "Carolina Betancourt"
c = c.replace(/CJB · Herramienta Gratuita/g, 'Carolina Betancourt');
// Badge: "CJB · Scorecard Gratuito" -> "Carolina Betancourt"
c = c.replace(/CJB · Scorecard Gratuito/g, 'Carolina Betancourt');
// Badge: "Benchmark de Performance · CJB" -> "Carolina Betancourt"
c = c.replace(/Benchmark de Performance · CJB/g, 'Carolina Betancourt');
// Footer: "CJB by Carolina Betancourt" -> "Carolina Betancourt"
c = c.replace(/CJB by Carolina Betancourt/g, 'Carolina Betancourt');

if (c !== orig) {
  fs.writeFileSync(f, c, 'utf8');
  var changes = orig.split('CJB').length - c.split('CJB').length;
  console.log('OK - ' + changes + ' ocurrencias de CJB reemplazadas por Carolina Betancourt');
} else {
  console.log('SKIP - No se encontraron ocurrencias de CJB');
}

// Verificar que no quedan CJB
var remaining = c.match(/CJB/g);
console.log('CJB restantes: ' + (remaining ? remaining.length : 0));
