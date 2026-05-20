const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Logo mas grande: 44 → 60px
p=p.split('height: 44, width: "auto"').join('height: 60, width: "auto"');
// Tambien el height={} del img
p=p.split('height={44}').join('height={60}');

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('Logo: 44px -> 60px');

// Limpiar
try{fs.unlinkSync('fix-logo.js');}catch(e){}
