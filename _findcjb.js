var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');
var found = [];
lines.forEach(function(l, i) {
  var idx = l.indexOf('CJB');
  if (idx !== -1) {
    found.push({line: i+1, context: l.substring(Math.max(0,idx-40), Math.min(l.length,idx+40))});
  }
});
console.log('CJB restantes: ' + found.length);
found.forEach(function(f) {
  console.log('Linea ' + f.line + ': ...' + f.context + '...');
});
