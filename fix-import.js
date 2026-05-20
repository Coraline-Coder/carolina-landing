const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Buscar la linea rota del dynamic import
if(p.includes('() => import("@/components/gold-particle-chart")')&&!p.includes('const GoldParticleChart')){
  console.log('Dynamic import roto encontrado - reparando...');
  p=p.replace(
    '  () => import("@/components/gold-particle-chart")\n);',
    'const GoldParticleChart = dynamic(() => import("@/components/gold-particle-chart"));'
  );
  console.log('Reparado!');
}else if(p.includes('const GoldParticleChart')){
  console.log('Dynamic import ya esta bien');
}else{
  console.log('Buscando variacion...');
  // Buscar la linea suelta
  var lines=p.split('\n');
  for(var i=0;i<lines.length;i++){
    if(lines[i].includes('gold-particle-chart')&&!lines[i].includes('const Gold')){
      console.log('Encontrado en L'+(i+1)+': '+lines[i].trim());
      // Reemplazar la linea y la siguiente
      if(i>0&&lines[i-1].includes('</div>')){
        lines[i-1]='const GoldParticleChart = dynamic(() => import("@/components/gold-particle-chart"));';
        lines.splice(i,2);
        console.log('Reparado!');
      }else{
        lines[i]='const GoldParticleChart = dynamic(() => import("@/components/gold-particle-chart"));';
        if(i+1<lines.length&&lines[i+1].trim()==');')lines.splice(i+1,1);
        console.log('Reparado (variacion)!');
      }
      break;
    }
  }
  p=lines.join('\n');
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('Listo!');
