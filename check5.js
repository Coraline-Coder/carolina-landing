const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
console.log('Buscando return statement y hero...');
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('return (')||lines[i].includes('return('))console.log('L'+(i+1)+': '+lines[i].trim());
}
console.log('\nLineas 280-340 (hero area):');
for(let i=279;i<Math.min(340,lines.length);i++)console.log('L'+(i+1)+': '+lines[i]);
console.log('\nUltimas 20 lineas:');
for(let i=Math.max(0,lines.length-20);i<lines.length;i++)console.log('L'+(i+1)+': '+lines[i]);
