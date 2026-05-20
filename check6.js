const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('sectionRef')){
    console.log('Encontrado sectionRef en L'+(i+1));
    console.log('Contexto (L'+(i-5)+' a L'+(i+30)+'):');
    for(let j=Math.max(0,i-5);j<Math.min(lines.length,i+30);j++){
      console.log('L'+(j+1)+': '+lines[j]);
    }
    break;
  }
}
