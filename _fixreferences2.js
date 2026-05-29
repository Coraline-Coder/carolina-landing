const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');

// === PASO 1: Extraer HTML correctamente (sin espacios en =) ===
function extractTemplate(content,varName){
  const prefix='const '+varName+'=`';
  const si=content.indexOf(prefix);
  if(si<0){console.log('ERROR: No encontrado '+varName);return null}
  const cs=si+prefix.length;
  const ei=content.indexOf('`;',cs);
  if(ei<0){console.log('ERROR: No encontrado fin de '+varName);return null}
  return content.substring(cs,ei);
}

const calcHTML=extractTemplate(c,'calculadoraHTML');
const scHTML=extractTemplate(c,'scorecardHTML');
const benchHTML=extractTemplate(c,'benchmarkHTML');

if(!calcHTML||!scHTML||!benchHTML){console.log('EXTRACCION FALLIDA');process.exit(1)}

console.log('calculadoraHTML: '+calcHTML.length+' chars, h1: '+calcHTML.match(/<h1>[^<]*/)?.[0]);
console.log('scorecardHTML: '+scHTML.length+' chars, h1: '+scHTML.match(/<h1>[^<]*/)?.[0]);
console.log('benchmarkHTML: '+benchHTML.length+' chars, h1: '+benchHTML.match(/<h1>[^<]*/)?.[0]);

// === PASO 2: Guardar en public/ ===
fs.writeFileSync('public/calculadora-desperdicio.html',calcHTML,'utf8');
fs.writeFileSync('public/scorecard-meta-ads.html',scHTML,'utf8');
fs.writeFileSync('public/benchmark-performance.html',benchHTML,'utf8');
console.log('');
console.log('Archivos HTML creados correctamente');

// === PASO 3: Fix tool definitions ===
c=c.replace('html:calculadoraHTML','src:"/calculadora-desperdicio.html"');
c=c.replace('html:scorecardHTML','src:"/scorecard-meta-ads.html"');
c=c.replace('html:benchmarkHTML','src:"/benchmark-performance.html"');

// === PASO 4: Fix ToolIframe signature (html -> src) ===
c=c.replace('{html,onHeight}:{html:string;onHeight:(h:number)=>void}','{src,onHeight}:{src:string;onHeight:(h:number)=>void}');

// === PASO 5: Fix ToolIframe usage (.html -> .src) ===
c=c.replace('html={tools.find((t)=>t.id===openTool)!.html}','src={tools.find((t)=>t.id===openTool)!.src}');

fs.writeFileSync(p,c,'utf8');
console.log('');
console.log('=== TSX ACTUALIZADO ===');

// === VERIFICACION ===
let v=fs.readFileSync(p,'utf8');
console.log('');
console.log('=== VERIFICACION TSX ===');
console.log('src calculadora:',v.includes('src:"/calculadora-desperdicio.html"'));
console.log('src scorecard:',v.includes('src:"/scorecard-meta-ads.html"'));
console.log('src benchmark:',v.includes('src:"/benchmark-performance.html"'));
console.log('ToolIframe prop src:',v.includes('{src,onHeight}:{src:string'));
console.log('iframe src={src}:',v.includes('src={src}'));
console.log('ToolIframe usage .src:',v.includes('!.src}'));
console.log('No html prop en ToolIframe:',!v.includes('{html,onHeight}'));

console.log('');
console.log('=== VERIFICACION PUBLIC/ ===');
const f1=fs.readFileSync('public/calculadora-desperdicio.html','utf8');
const f2=fs.readFileSync('public/scorecard-meta-ads.html','utf8');
const f3=fs.readFileSync('public/benchmark-performance.html','utf8');
console.log('3 archivos diferentes:',f1!==f2&&f2!==f3&&f1!==f3);
console.log('calc h1:',f1.match(/<h1>[^<]*/)?.[0]);
console.log('sc h1:',f2.match(/<h1>[^<]*/)?.[0]);
console.log('bench h1:',f3.match(/<h1>[^<]*/)?.[0]);
console.log('calc DM Sans:',f1.includes('DM Sans'));
console.log('sc DM Sans:',f2.includes('DM Sans'));
console.log('bench DM Sans:',f3.includes('DM Sans'));
console.log('sc background:#000000:',f2.includes('background:#000000'));
