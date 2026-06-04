const fs = require('fs');
const fp = 'src/app/page.tsx';
let h = fs.readFileSync(fp, 'utf8');
const lines = h.split('\n');
console.log('Lines 285-325:');
for (let i = 284; i < Math.min(325, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}
