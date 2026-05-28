var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');
[2146,2147,2148,2149,2150,2151,2152,2153,2154,2155,2156,2157,2158,2159,2166,2167,2168,2169].forEach(function(n) {
  if (n <= lines.length) {
    console.log(n + ': ' + lines[n-1]);
  }
});
// Also find body{ in HTML templates
var idx = -1;
while ((idx = c.indexOf('body{', idx + 1)) !== -1) {
  console.log('\nbody{ at pos ' + idx + ': ' + c.substring(idx, idx + 100));
}
idx = -1;
while ((idx = c.indexOf('body {', idx + 1)) !== -1) {
  console.log('\nbody { at pos ' + idx + ': ' + c.substring(idx, idx + 100));
}
