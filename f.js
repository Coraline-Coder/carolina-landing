const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
var cleaned=0;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('GoldParticleChart')){
    console.log('L'+(i+1)+': '+lines[i].trim());
    lines[i]='';
    cleaned++;
  }
}
if(cleaned){
  fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
  console.log(cleaned+' referencias a GoldParticleChart eliminadas');
}else{
  console.log('No se encontro GoldParticleChart');
}
