var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');

// Show exact content of key lines
[2136,2137,2138,2139,2140,2141,2142,2143,2144,2145,2160,2161,2162,2163,2164,2165,2170,2171,2172,2173,2174,2175,2176,2177,2178,2179,2180,2181,2182].forEach(function(n) {
  if (n <= lines.length) {
    console.log(n + ': ' + lines[n-1]);
  }
});
