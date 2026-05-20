const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
console.log('Buscando hero section...');
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('Hero')||lines[i].includes('hero')||lines[i].includes('paddingTop')){
    console.log('L'+(i+1)+': '+lines[i].trim());
  }
}
console.log('\nLineas 360-420 (despues del navbar):');
for(let i=359;i<Math.min(420,lines.length);i++)console.log('L'+(i+1)+': '+lines[i]);
