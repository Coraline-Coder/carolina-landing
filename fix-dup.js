const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

var broken='    <section style={{ paddingTop: "140px", paddingBottom: "140px",  paddingTop: "140px", paddingBottom: "140px" }}\n      style={{';
var fixed='    <section\n      style={{';

if(p.includes(broken)){
  p=p.replace(broken,fixed);
  console.log('Doble style corregido!');
}else{
  console.log('Buscando variacion...');
  var lines=p.split('\n');
  for(var i=0;i<lines.length;i++){
    if(lines[i].includes('paddingTop: "140px"')&&lines[i].includes('<section')){
      lines[i]='    <section';
      if(i+1<lines.length&&lines[i+1].includes('style={{')){
        console.log('Fix aplicado en L'+(i+1));
      }
      break;
    }
  }
  p=lines.join('\n');
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('Listo!');
