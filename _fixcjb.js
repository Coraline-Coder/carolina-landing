var fs = require('fs');
var f = 'calculadora-desperdicio.html';
var c = fs.readFileSync(f, 'utf8');
var fixes = 0;

// Cambio 1: Title
if (c.includes('· CJB</title>')) {
  c = c.replace('· CJB</title>', '· Carolina Betancourt</title>');
  fixes++;
  console.log('FIX 1: Title -> CJB cambiado a Carolina Betancourt');
} else { console.log('SKIP 1: Title no contiene CJB'); }

// Cambio 2: Badge
if (c.includes('CJB · Herramienta Gratuita')) {
  c = c.replace('CJB · Herramienta Gratuita', 'Carolina Betancourt · Herramienta Gratuita');
  fixes++;
  console.log('FIX 2: Badge -> CJB cambiado a Carolina Betancourt');
} else { console.log('SKIP 2: Badge no contiene CJB'); }

fs.writeFileSync(f, c);
console.log('\nTotal cambios: ' + fixes);
