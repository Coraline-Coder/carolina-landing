const fs = require('fs');
const fp = 'src/app/page.tsx';
let h = fs.readFileSync(fp, 'utf8');
const lines = h.split('\n');
console.log('Lines 1145-1165:');
for (let i = 1144; i < Math.min(1165, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}
