const fs=require('fs');
console.log('=== LIMPIEZA ===\n');

// Eliminar scripts temporales
['fix-build.js','fix-all.js','restore-push.js','restore.js','fix-7.js','fix-v2.js','fix-v3.js','check-logo.js'].forEach(f=>{
  if(fs.existsSync(f)){fs.unlinkSync(f);console.log('Eliminado:',f);}
});

// Verificar logo
if(fs.existsSync('public/logo-cb.jpeg')){
  console.log('\nlogo-cb.jpeg OK ('+fs.statSync('public/logo-cb.jpeg').size+' bytes)');
}else{
  console.log('\nlogo-cb.jpeg NO existe!');
}

// Verificar referencia en page.tsx
const p=fs.readFileSync('src/app/page.tsx','utf8');
const logoRefs=(p.match(/logo-cb\.(jpeg|png)/g)||[]);
console.log('Referencias a logo en page.tsx:',logoRefs.join(', ')||'NINGUNA');

// Verificar mix-blend-mode
if(p.includes('mixBlendMode'))console.log('mixBlendMode: screen presente');
else console.log('AVISO: mixBlendMode no encontrado');

// Verificar WhatsApp correcto
const wCount=(p.match(/522292924430/g)||[]).length;
const wOld=(p.match(/5223111396364/g)||[]).length;
console.log('WhatsApp nuevo (522292924430):',wCount,'veces');
console.log('WhatsApp viejo (5223111396364):',wOld,'veces');

console.log('\nLimpieza lista! Ahora:');
console.log('git add . ; git commit -m "cleanup: remove temp scripts" ; git push origin main');
