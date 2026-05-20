const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// Buscar y eliminar lineas relacionadas con dynamic y GoldParticleChart
var newLines=[];
for(var i=0;i<lines.length;i++){
  var l=lines[i];
  if(l.includes('const GoldParticleChart')){console.log('Eliminando L'+(i+1)+': '+l.trim());continue;}
  if(l.includes('gold-particle-chart')){console.log('Eliminando L'+(i+1)+': '+l.trim());continue;}
  if(l.includes('dynamic(')&&!l.includes('AnimatePresence')){console.log('Eliminando L'+(i+1)+': '+l.trim());continue;}
  newLines.push(l);
}

// Verificar si dynamic aun se importa
p=newLines.join('\n');
if(p.includes('dynamic')&&p.includes('from "next/dynamic"')){
  // Si solo se usaba para GoldParticleChart, eliminar el import
  var lines2=p.split('\n');
  var finalLines=[];
  var usesDynamic=false;
  for(var i=0;i<lines2.length;i++){
    if(lines2[i].includes('from "next/dynamic"')||lines2[i].includes("from 'next/dynamic'")){
      console.log('Eliminando import dynamic L'+(i+1));
      continue;
    }
    finalLines.push(lines2[i]);
  }
  p=finalLines.join('\n');
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('dynamic y GoldParticleChart eliminados completamente');
