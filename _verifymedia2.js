var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');
lines.forEach(function(l, i) {
  if (l.includes('@media') || l.includes('score-display') || l.includes('score-number .num')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 120));
  }
});
