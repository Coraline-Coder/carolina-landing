const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Mover "use client" al inicio absoluto
p=p.replace("import './effects.css';\n\"use client\"","\"use client\"\n\nimport './effects.css';");

fs.writeFileSync('src/app/page.tsx',p,'utf8');

// Verificar
const lines=p.split('\n');
console.log('Linea 1:',lines[0]);
console.log('Linea 2:',lines[1]);
console.log('Linea 3:',lines[2]);

if(lines[0]==='"use client"')console.log('\nOK! "use client" es la primera linea');
else console.log('\nAVISO: revisar orden');
