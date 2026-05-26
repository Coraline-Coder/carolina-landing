var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');

console.log('=== @media queries en herramientas-gratis.tsx ===');
lines.forEach(function(l, i) {
  if (l.includes('@media')) {
    console.log('\n--- @media en linea ' + (i+1) + ' ---');
    for (var j = i; j < Math.min(i + 30, lines.length); j++) {
      console.log((j+1) + ': ' + lines[j]);
      if (j > i && lines[j].includes('}')) break;
    }
  }
});
