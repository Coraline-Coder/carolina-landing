var fs = require('fs');
var c = fs.readFileSync('src/app/page.tsx', 'utf8');
var lines = c.split('\n');
lines.forEach(function(l, i) {
  if (l.includes('calendly')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 150));
  }
});
