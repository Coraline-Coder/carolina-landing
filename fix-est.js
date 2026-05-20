const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// Mostrar contexto de linea 1194
console.log('Contexto L1194:');
for(let i=1190;i<Math.min(lines.length,1200);i++)console.log('L'+(i+1)+': '+lines[i].trim());

// Eliminar la linea 1194
if(lines[1193].includes('ESTRATEGIA')){
  lines[1193]='';
  console.log('\nLinea eliminada!');
}

fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');

// Verificar
const v=fs.readFileSync('src/app/page.tsx','utf8');
if(v.includes('ESTRATEGIA'))console.log('AVISO: ESTRATEGIA aun en otro lado');
else console.log('ESTRATEGIA completamente eliminada!');

// Limpiar
['find.js','fix-nav2.js'].forEach(f=>{try{fs.unlinkSync(f);}catch(e){}});

console.log('\ngit add . ; git commit -m "fix: eliminar tagline ESTRATEGIA" ; git push origin main');
