const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');

// === PASO 1: Extraer HTML de los 3 template literals ===
function extractTemplate(content,varName){
  const start=content.indexOf('const '+varName+' = `')+'const '+varName+' = `'.length;
  const end=content.indexOf('`;',start);
  if(start<0||end<0){console.log('ERROR: No se pudo extraer '+varName);return null}
  return content.substring(start,end);
}

const calcHTML=extractTemplate(c,'calculadoraHTML');
const scHTML=extractTemplate(c,'scorecardHTML');
const benchHTML=extractTemplate(c,'benchmarkHTML');

if(!calcHTML||!scHTML||!benchHTML){process.exit(1)}

// === PASO 2: Guardar como archivos en public/ ===
const files={
  'public/calculadora-desperdicio.html':calcHTML,
  'public/scorecard-meta-ads.html':scHTML,
  'public/benchmark-performance.html':benchHTML
};
Object.entries(files).forEach(([fp,html])=>{
  fs.writeFileSync(fp,html,'utf8');
  console.log('Creado: '+fp+' ('+html.length+' chars)');
});

// === PASO 3: Actualizar TSX - cambiar html por src en tools array ===
c=c.replace('html: calculadoraHTML,','src: "/calculadora-desperdicio.html",');
c=c.replace('html: scorecardHTML,','src: "/scorecard-meta-ads.html",');
c=c.replace('html: benchmarkHTML,','src: "/benchmark-performance.html",');

// === PASO 4: Cambiar ToolIframe de srcDoc a src ===
c=c.replace('{ html: string; onHeight: (h: number) => void }','{ src: string; onHeight: (h: number) => void }');
c=c.replace('srcDoc={html}','src={src}');

fs.writeFileSync(p,c,'utf8');
console.log('');
console.log('=== herramientas-gratis.tsx ACTUALIZADO ===');

// === VERIFICACION ===
let v=fs.readFileSync(p,'utf8');
console.log('');
console.log('=== VERIFICACION TSX ===');
console.log('src calculadora:',v.includes('src: "/calculadora-desperdicio.html"'));
console.log('src scorecard:',v.includes('src: "/scorecard-meta-ads.html"'));
console.log('src benchmark:',v.includes('src: "/benchmark-performance.html"'));
console.log('src={src} (no srcDoc):',v.includes('src={src}')&&!v.includes('srcDoc='));
console.log('Prop src en ToolIframe:',v.includes('src: string; onHeight'));

console.log('');
console.log('=== VERIFICACION PUBLIC/ ===');
['calculadora-desperdicio.html','scorecard-meta-ads.html','benchmark-performance.html'].forEach(f=>{
  const fp='public/'+f;
  if(fs.existsSync(fp)){
    const h=fs.readFileSync(fp,'utf8');
    console.log(f+': OK ('+h.length+' chars, DM Sans:'+h.includes('DM Sans')+', Carolina:'+h.includes('Carolina Betancourt')+')');
  }else{
    console.log(f+': FALTA!');
  }
});
