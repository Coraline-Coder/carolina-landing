const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
console.log('Total lineas:',lines.length);
console.log('\nBuscando estructura rota...');
for(let i=0;i<lines.length;i++){
  var l=lines[i].trim();
  if(l.includes('className="glow"'))console.log('L'+(i+1)+': GLOW AUN PRESENTE: '+l.substring(0,80));
  if(l.includes('hero-grid'))console.log('L'+(i+1)+': HERO-GRID AUN PRESENTE: '+l.substring(0,80));
  if(l.includes('hero-light-line'))console.log('L'+(i+1)+': HERO-LIGHT-LINE AUN PRESENTE: '+l.substring(0,80));
  if(l.includes('pulso-watermark'))console.log('L'+(i+1)+': PULSO-WATERMARK AUN PRESENTE: '+l.substring(0,80));
}
console.log('\nLineas 230-260 (navbar area):');
for(let i=229;i<Math.min(260,lines.length);i++)console.log('L'+(i+1)+': '+lines[i]);
