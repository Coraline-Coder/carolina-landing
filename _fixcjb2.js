var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');
var orig = c;

// Fix title tags: " · CJB</title>" -> " · Carolina Betancourt</title>"
c = c.replace(/ · CJB<\/title>/g, ' · Carolina Betancourt</title>');

if (c !== orig) {
  fs.writeFileSync(f, c, 'utf8');
  console.log('OK - CJB en title tags corregido');
} else {
  console.log('SKIP - sin cambios');
}

// Verificar
var remaining = c.match(/CJB/g);
console.log('CJB restantes: ' + (remaining ? remaining.length : 0));
