const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// 1. Cambiar referencia de logo-cb.jpeg → logo-cb.png
p=p.split('/logo-cb.jpeg').join('/logo-cb.png');
console.log('[1] Referencia cambiada a logo-cb.png');

// 2. Eliminar mixBlendMode: screen (rompe logos con fondo blanco)
p=p.split('mixBlendMode: "screen", ').join('');
p=p.split(', mixBlendMode: "screen"').join('');
p=p.split('mixBlendMode: "screen"').join('');
console.log('[2] mixBlendMode: screen eliminado (causa: logo tiene fondo blanco)');

// 3. Asegurar height 44px
p=p.replace(/height: \d+, width: "auto"/,'height: 44, width: "auto"');
console.log('[3] Logo height: 44px');

// 4. Agregar borderRadius para que el fondo blanco no se vea feo
// Reemplazar objectFit: "contain" con borderRadius
p=p.split('objectFit: "contain"').join('objectFit: "contain", borderRadius: "8px"');
console.log('[4] BorderRadius 8px agregado al logo');

fs.writeFileSync('src/app/page.tsx',p,'utf8');

// Verificar
const v=fs.readFileSync('src/app/page.tsx','utf8');
console.log('\nVerificacion:');
console.log('  logo-cb.png referenciado:',v.includes('/logo-cb.png'));
console.log('  mixBlendMode presente:',v.includes('mixBlendMode'));
console.log('  logo-cb.jpeg presente:',v.includes('logo-cb.jpeg'));

// Limpiar
['fix-est.js','find.js','fix-nav2.js','fix-logo-final.js','cleanup.js'].forEach(f=>{try{fs.unlinkSync(f);}catch(e){}});

console.log('\nAHORA: copia logo-cb.png a la carpeta public/ de tu proyecto');
console.log('Luego: git add . ; git commit -m "fix: logo correcto" ; git push origin main');
