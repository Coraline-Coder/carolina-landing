const fs=require('fs');
console.log('=== FIX GIT: REMOVER node_modules ===\n');

// 1. Asegurar .gitignore
let gi='';
if(fs.existsSync('.gitignore')){gi=fs.readFileSync('.gitignore','utf8');}
if(!gi.includes('node_modules')){gi+='\nnode_modules/\n';fs.writeFileSync('.gitignore',gi,'utf8');console.log('.gitignore actualizado');}
else{console.log('.gitignore ya tiene node_modules');}

// 2. Remover node_modules del index de Git (NO borra los archivos)
const{execSync}=require('child_process');
console.log('\nRemoviendo node_modules del tracking de Git...');
try{execSync('git rm -r --cached node_modules',{stdio:'inherit',timeout:120000});}catch(e){console.log('(algunos archivos ya no estaban rastreados)');}

// 3. Remover .next del tracking si existe
if(fs.existsSync('.next')){try{execSync('git rm -r --cached .next',{stdio:'inherit',timeout:60000});}catch(e){}}

// 4. Remover scripts temporales
['fix-build.js','fix-all.js','restore-push.js','restore.js'].forEach(f=>{
  if(fs.existsSync(f)){try{fs.unlinkSync(f);console.log('Eliminado:',f);}catch(e){}}
});

console.log('\nAhora ejecuta ESTE comando:');
console.log('git add . ; git commit -m "visual redesign completo" ; git push origin main');
