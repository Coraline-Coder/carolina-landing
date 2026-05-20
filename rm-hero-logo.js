const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// Buscar y eliminar el bloque del logo dentro del hero (motion.div con el img logo)
var start=-1,end=-1;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('motion.div')&&i+1<lines.length&&lines[i+1].includes('initial={{ opacity: 0, scale: 0.9 }}')&&start===-1){
    start=i;
  }
  if(start>-1&&end===-1&&i>start&&lines[i].includes('</motion.div>')&&!lines[i].includes('</motion.div>')){
    // Check if this closing tag is for the logo block
    var block=lines.slice(start,i+1).join('\n');
    if(block.includes('logo-cb.png')){
      end=i;
      console.log('Logo del hero encontrado: L'+(start+1)+' a L'+(end+1));
      for(var j=start;j<=end;j++)console.log('  ELIMINAR: '+lines[j].trim());
      lines.splice(start,end-start+1);
      break;
    }
  }
}

if(start>-1&&end>-1){
  fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
  console.log('\nLogo del hero eliminado!');
}else{
  console.log('No se encontro el bloque del logo en el hero');
}

// Limpiar scripts temporales
['show.js'].forEach(f=>{try{fs.unlinkSync(f);}catch(e){}});
