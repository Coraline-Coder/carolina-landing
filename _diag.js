var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');

console.log('=== TOTAL LINES: ' + lines.length + ' ===');

// Search key areas
console.log('\n--- IFRAME AREA (around line 100) ---');
for (var i = 95; i < Math.min(115, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log('\n--- SECTION BG (around line 125) ---');
for (var i = 123; i < Math.min(128, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log('\n--- MODAL AREA (around line 275) ---');
for (var i = 270; i < Math.min(330, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log('\n--- BODY IN HTML TEMPLATES ---');
var bodyMatches = [];
var idx = -1;
while ((idx = c.indexOf('body{', idx + 1)) !== -1) {
  bodyMatches.push({pos: idx, ctx: c.substring(idx, idx + 80)});
}
bodyMatches.forEach(function(m) { console.log('pos ' + m.pos + ': ' + m.ctx); });
