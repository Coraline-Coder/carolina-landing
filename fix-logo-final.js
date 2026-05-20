const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Fix: logo height 36 → 44 en inline style
p=p.replace('height: 36, width: "auto", objectFit: "contain"','height: 44, width: "auto", objectFit: "contain"');
console.log('Logo height corregido a 44px');

// Limpiar span vacio que quedo de CJB
p=p.replace(/<span style=\{\{ fontFamily: "var\(--font-cormorant\)",[^}]*\}\}><\/span>/,'');
console.log('Span vacio CJB removido');

fs.writeFileSync('src/app/page.tsx',p,'utf8');

// Limpiar scripts
['fix-nav.js','cleanup.js'].forEach(f=>{try{fs.unlinkSync(f);console.log('Eliminado:',f);}catch(e){}});

console.log('\nListo! Ejecuta:');
console.log('git add . ; git commit -m "fix: navbar logo solo imagen 44px" ; git push origin main');
