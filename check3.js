const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
// Verificar que el JSX principal esta intacto
console.log('Contiene <section>:',(p.match(/<section/g)||[]).length,'secciones');
console.log('Contiene </section>:',(p.match(/<\/section>/g)||[]).length,'cierre de secciones');
console.log('Contiene return (':p.includes('return ('));
console.log('Contiene export default:',p.includes('export default'));
console.log('Lineas con contenido vacio cerca de glows eliminados:');
let lines=p.split('\n');
let emptyStreak=0;
for(let i=0;i<lines.length;i++){
  if(lines[i].trim()===''){emptyStreak++;if(emptyStreak>5)console.log('L'+(i+1)+'-'+(i+1)+': '+emptyStreak+' lineas vacias seguidas');}
  else emptyStreak=0;
}
