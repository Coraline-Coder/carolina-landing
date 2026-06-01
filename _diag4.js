const fs = require('fs');
const fp = 'src/components/herramientas-gratis.tsx';
let h = fs.readFileSync(fp, 'utf8');

const markers = ['id="btnWA"', 'id="btnWhatsapp"'];
for (const m of markers) {
  let idx = 0;
  let n = 0;
  while ((idx = h.indexOf(m, idx)) !== -1) {
    n++;
    const end = Math.min(h.length, idx + 800);
    console.log('\n========== ' + m + ' #' + n + ' ==========');
    console.log(h.slice(idx, end));
    console.log('========== FIN ==========');
    idx += m.length;
  }
}
