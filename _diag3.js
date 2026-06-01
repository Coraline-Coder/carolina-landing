const fs = require('fs');
const fp = 'src/components/herramientas-gratis.tsx';
let h = fs.readFileSync(fp, 'utf8');

// Buscar TODOS los enlaces WhatsApp (btnWA, btnWhatsapp, etc.)
const patterns = ['btnWA', 'btnWhatsapp', 'whatsapp', '522292924043', 'wa.me'];
for (const p of patterns) {
  let idx = 0;
  while ((idx = h.indexOf(p, idx)) !== -1) {
    const start = Math.max(0, idx - 200);
    const end = Math.min(h.length, idx + 300);
    console.log('\n=== "' + p + '" en pos ' + idx + ' ===');
    console.log(h.slice(start, end));
    console.log('=== FIN ===');
    idx += p.length;
  }
}
