const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');

// 1. Ver los 3 HTML files son diferentes
const f1=fs.readFileSync('public/calculadora-desperdicio.html','utf8');
const f2=fs.readFileSync('public/scorecard-meta-ads.html','utf8');
const f3=fs.readFileSync('public/benchmark-performance.html','utf8');
console.log('=== ARCHIVOS HTML SON DIFERENTES? ===');
console.log('calc==sc:',f1===f2);
console.log('calc==bench:',f1===f3);
console.log('sc==bench:',f2===f3);
console.log('calc h1:',f1.match(/<h1>[^<]*/)?.[0]);
console.log('sc h1:',f2.match(/<h1>[^<]*/)?.[0]);
console.log('bench h1:',f3.match(/<h1>[^<]*/)?.[0]);

// 2. Ver exactamente como estan las refs en tools array
console.log('');
console.log('=== TOOL DEFS EN TSX ===');
const lines=c.split('\n');
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('id:')&&lines[i].includes('calculadora'))console.log('L'+(i+1)+':',lines[i].trim());
  if(lines[i].includes('id:')&&lines[i].includes('scorecard'))console.log('L'+(i+1)+':',lines[i].trim());
  if(lines[i].includes('id:')&&lines[i].includes('benchmark'))console.log('L'+(i+1)+':',lines[i].trim());
  if(lines[i].includes('html:')||lines[i].includes('src:'))console.log('L'+(i+1)+':',lines[i].trim());
  if(lines[i].includes('srcDoc')||lines[i].includes('src={'))console.log('L'+(i+1)+':',lines[i].trim());
  if(lines[i].includes('ToolIframe'))console.log('L'+(i+1)+':',lines[i].trim());
}

// 3. Buscar los template literals
console.log('');
console.log('=== TEMPLATE LITERAL POSITIONS ===');
const vars=['calculadoraHTML','scorecardHTML','benchmarkHTML'];
vars.forEach(v=>{
  const idx=c.indexOf('const '+v);
  console.log(v+' starts at char:',idx);
  if(idx>=0){
    const lineNum=c.substring(0,idx).split('\n').length;
    console.log('  Line:',lineNum);
    console.log('  Text:',c.substring(idx,idx+60));
  }
});
