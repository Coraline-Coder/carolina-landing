const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// Buscar TODAS las imagenes con logo-cb.png
console.log('Todas las referencias a logo-cb.png:');
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('logo-cb.png')){
    console.log('L'+(i+1)+': '+lines[i].trim());
    console.log('  Anterior L'+i+': '+lines[i-1].trim());
    console.log('  Anterior L'+(i-1)+': '+lines[i-2].trim());
  }
}

// Eliminar el bloque del logo del hero (3 lineas antes y despues del img)
var removed=0;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('logo-cb.png')&&i>370&&i<420){
    // Este es el logo del HERO - eliminar el motion.div que lo envuelve
    // Retroceder hasta encontrar el <motion.div que abre
    var start=i;
    for(var j=i;j>=i-10;j--){
      if(lines[j]&&lines[j].includes('<motion.div')){start=j;break;}
    }
    // Avanzar hasta encontrar el </motion.div que cierra
    var end=i;
    for(var j=i;j<=i+10;j++){
      if(lines[j]&&lines[j].includes('</motion.div>')){end=j;break;}
    }
    console.log('\nEliminando bloque L'+(start+1)+' a L'+(end+1)+':');
    for(var j=start;j<=end;j++)console.log('  REMOVE: '+lines[j].trim());
    lines.splice(start,end-start+1);
    removed++;
    break;
  }
}

if(removed){
  fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
  console.log('\nLogo del hero eliminado!');
}else{
  console.log('\nNo se encontro logo en el hero para eliminar');
}
