const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');

// === CAMBIO 1: Reemplazar Google Fonts link (Jost -> DM Sans) ===
c=c.replace(/family=Jost:wght@200;300;400;500/g,'family=DM+Sans:wght@300;400;500');

// === CAMBIO 2: Reemplazar font-family:'Jost' -> 'DM Sans' en CSS ===
c=c.replace(/font-family:'Jost',sans-serif/g,"font-family:'DM Sans',sans-serif");

// === CAMBIO 3: Reemplazar CJB en badges ===
c=c.replace(/CJB · Scorecard Gratuito/g,'Scorecard Gratuito');
c=c.replace(/CJB · Herramienta Gratuita/g,'Herramienta Gratuita');

// === CAMBIO 4: Reemplazar footer CJB -> Carolina Betancourt ===
c=c.replace(/CJB by Carolina Betancourt/g,'Carolina Betancourt');

// === CAMBIO 5: Reemplazar numero WA viejo ===
c=c.replace(/522311396364/g,'522292924043');

fs.writeFileSync(p,c,'utf8');
console.log('=== herramientas-gratis.tsx CORREGIDO ===');

// === VERIFICACION scorecardHTML ===
const s=c.indexOf('const scorecardHTML');
const e=c.indexOf('const benchmarkHTML');
const sc=c.substring(s,e);
console.log('');
console.log('=== VERIFICACION scorecardHTML ===');
console.log('Font link DM+Sans:',sc.includes('family=DM+Sans:wght@300;400;500'));
console.log('Sin Jost en link:',!sc.includes('family=Jost'));
console.log("font-family:'DM Sans':",sc.includes("font-family:'DM Sans',sans-serif"));
console.log("Sin font-family:'Jost':",!sc.includes("font-family:'Jost'"));
console.log('background:#000000:',sc.includes('background:#000000'));
console.log('Cormorant Garamond h1:',sc.includes("font-family:'Cormorant Garamond',serif"));
console.log('522292924043 WA:',sc.includes('522292924043'));
console.log('522311396364 viejo:',sc.includes('522311396364'));
console.log('CJB badge:',sc.includes('CJB'));
console.log('Carolina Betancourt footer:',sc.includes('Carolina Betancourt</div>'));
console.log('Scorecard Gratuito badge:',sc.includes('Scorecard Gratuito'));

// === VERIFICACION calculadoraHTML ===
const cStart=c.indexOf('const calculadoraHTML');
const cEnd=c.indexOf('const scorecardHTML');
const calc=c.substring(cStart,cEnd);
console.log('');
console.log('=== VERIFICACION calculadoraHTML ===');
console.log('Font link DM+Sans:',calc.includes('family=DM+Sans:wght@300;400;500'));
console.log("font-family:'DM Sans':",calc.includes("font-family:'DM Sans',sans-serif"));
console.log('522292924043 WA:',calc.includes('522292924043'));
console.log('522311396364 viejo:',!calc.includes('522311396364'));
console.log('CJB badge:',!calc.includes('CJB'));
console.log('Carolina Betancourt footer:',calc.includes('Carolina Betancourt</div>'));

// === VERIFICACION benchmarkHTML ===
const bStart=c.indexOf('const benchmarkHTML');
const bEnd=c.indexOf('const ',bStart+10);
const bench=c.substring(bStart,bEnd>0?bEnd:c.length);
console.log('');
console.log('=== VERIFICACION benchmarkHTML ===');
console.log('Font link DM+Sans:',bench.includes('family=DM+Sans:wght@300;400;500'));
console.log("font-family:'DM Sans':",bench.includes("font-family:'DM Sans',sans-serif"));
console.log('522292924043 WA:',bench.includes('522292924043'));
console.log('522311396364 viejo:',!bench.includes('522311396364'));
console.log('CJB badge:',!bench.includes('CJB'));
console.log('Carolina Betancourt footer:',bench.includes('Carolina Betancourt</div>'));

// === FIX public/scorecard-meta-ads.html ===
const pubFiles=[
  'public/scorecard-meta-ads.html',
  'public/calculadora-meta-ads.html',
  'public/benchmark-meta-ads.html'
];
pubFiles.forEach(pubPath=>{
  if(!fs.existsSync(pubPath)){console.log(pubPath+': NO EXISTE');return}
  let pub=fs.readFileSync(pubPath,'utf8');
  let changed=false;
  if(pub.includes('family=Jost')||pub.includes("font-family: 'Jost'")||pub.includes("font-family:'Jost'")){
    pub=pub.replace(/family=Jost:wght@200;300;400;500/g,'family=DM+Sans:wght@300;400;500');
    pub=pub.replace(/font-family: 'Jost',sans-serif/g,"font-family: 'DM Sans',sans-serif");
    pub=pub.replace(/font-family:'Jost',sans-serif/g,"font-family:'DM Sans',sans-serif");
    changed=true;
  }
  if(pub.includes('CJB by Carolina Betancourt')){
    pub=pub.replace(/CJB by Carolina Betancourt/g,'Carolina Betancourt');
    changed=true;
  }
  if(pub.includes('CJB ·')){
    pub=pub.replace(/CJB · /g,'');
    changed=true;
  }
  if(pub.includes('522311396364')){
    pub=pub.replace(/522311396364/g,'522292924043');
    changed=true;
  }
  if(changed){
    fs.writeFileSync(pubPath,pub,'utf8');
    console.log(pubPath+': CORREGIDO');
  }else{
    console.log(pubPath+': SIN CAMBIOS NECESARIOS');
  }
  // Verificar
  console.log('  DM Sans font:',pub.includes('DM Sans'));
  console.log('  Jost font:',pub.includes('Jost'));
  console.log('  Carolina Betancourt footer:',pub.includes('Carolina Betancourt</div>')||pub.includes('Carolina Betancourt</div>')||pub.includes('Carolina Betancourt'));
  console.log('  CJB ref:',pub.includes('CJB'));
  console.log('  522292924043:',pub.includes('522292924043'));
  console.log('  522311396364:',pub.includes('522311396364'));
});
