const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// L243: navbar logo - limpiar y poner 70px
lines[242]='          <img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 70, width: "auto", objectFit: "contain", borderRadius: "8px" }} />';

// L395: verificar que es
console.log('L395:',lines[394].trim());

// L1169: footer logo - limpiar y poner 52px
lines[1168]='          <img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 52, width: "auto", objectFit: "contain", borderRadius: "8px" }} />';

fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
console.log('Navbar logo: 70px, Footer logo: 52px');

try{fs.unlinkSync('show.js');}catch(e){}
