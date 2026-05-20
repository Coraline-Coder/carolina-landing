const fs=require('fs');
console.log('=== TRANSFORMACION VISUAL - PARTE 2 ===\n');

var p=fs.readFileSync('src/app/page.tsx','utf8');
var lines=p.split('\n');

function findLine(pattern,startFrom){
  for(var i=startFrom||0;i<lines.length;i++){if(lines[i].includes(pattern))return i;}return-1;
}

// ═══ EFECTO 1: AGREGAR GLOWS A CADA SECCION ═══

// Hero section - buscar <section con sectionRef
var heroSec=findLine('sectionRef');
if(heroSec>-1){
  // Insertar glows despues del <section> tag
  var heroInsert=heroSec+1;
  // Buscar el > de cierre del section tag
  while(heroInsert<lines.length&&!lines[heroInsert].includes('>'))heroInsert++;
  heroInsert++;
  var heroGlows=[
    '        {/* Hero Glow 1 - esquina superior derecha */}',
    '        <div className="glow" style={{ width: 900, height: 900, top: -200, right: -200, background: "radial-gradient(circle, rgba(30,58,138,0.25) 0%, transparent 65%)", animation: "floatGlow 10s ease-in-out infinite" }} />',
    '        {/* Hero Glow 2 - centro */}',
    '        <div className="glow" style={{ width: 400, height: 400, top: "30%", left: "40%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)", animation: "floatGlow2 12s ease-in-out infinite" }} />',
    '        {/* Hero Glow 3 - esquina inferior izquierda */}',
    '        <div className="glow" style={{ width: 600, height: 600, bottom: -100, left: -150, background: "radial-gradient(circle, rgba(30,58,138,0.20) 0%, transparent 65%)", animation: "floatGlow3 14s ease-in-out infinite" }} />',
    '        {/* Hero dot grid */}',
    '        <div className="hero-grid" />',
    '        {/* Hero light line */}',
    '        <div className="hero-light-line" />',
  ];
  for(var i=heroGlows.length-1;i>=0;i--)lines.splice(heroInsert,0,heroGlows[i]);
  console.log('[OK] Hero: 3 glows + grid + light line');
}

// Problema section (navy bg)
var probSec=findLine('Problema');
if(probSec>-1){
  var pSec=findLine('<section',probSec);
  if(pSec>-1){
    var pInsert=pSec+1;
    while(pInsert<lines.length&&!lines[pInsert].includes('>'))pInsert++;
    pInsert++;
    var probGlows=[
      '        <div className="glow" style={{ width: 700, height: 700, top: -200, right: -200, background: "radial-gradient(circle, rgba(30,58,138,0.25) 0%, transparent 65%)", animation: "floatGlow 10s ease-in-out infinite" }} />',
    ];
    for(var i=probGlows.length-1;i>=0;i--)lines.splice(pInsert,0,probGlows[i]);
    console.log('[OK] Problema: 1 glow');
  }
}

// Herramientas section (navy bg)
var herrSec=findLine('Herramientas');
if(herrSec>-1){
  var hSec=findLine('<section',herrSec);
  if(hSec>-1){
    var hInsert=hSec+1;
    while(hInsert<lines.length&&!lines[hInsert].includes('>'))hInsert++;
    hInsert++;
    var herrGlows=[
      '        <div className="glow" style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(30,58,138,0.20) 0%, transparent 65%)", animation: "floatGlow2 11s ease-in-out infinite" }} />',
    ];
    for(var i=herrGlows.length-1;i>=0;i--)lines.splice(hInsert,0,herrGlows[i]);
    console.log('[OK] Herramientas: 1 glow central');
  }
}

// PULSO section
var pulsoSec=findLine('PULSO')||findLine('pulso');
if(pulsoSec>-1){
  var plSec=findLine('<section',pulsoSec);
  if(plSec>-1){
    var plInsert=plSec+1;
    while(plInsert<lines.length&&!lines[plInsert].includes('>'))plInsert++;
    plInsert++;
    var pulsoGlows=[
      '        <div className="glow" style={{ width: "100%", height: 500, top: "50%", left: 0, transform: "translateY(-50%)", borderRadius: 0, background: "radial-gradient(ellipse at left, rgba(30,58,138,0.18) 0%, transparent 60%)" }} />',
      '        <div className="pulso-watermark">PULSO</div>',
    ];
    for(var i=pulsoGlows.length-1;i>=0;i--)lines.splice(plInsert,0,pulsoGlows[i]);
    console.log('[OK] PULSO: glow lateral + watermark');
  }
}

// CTA final section
var ctaSec=findLine('AGENDA TU LLAMADA')||findLine('Agenda tu llamada');
if(ctaSec>-1){
  var cSec=findLine('<section',ctaSec);
  if(cSec>-1){
    var cInsert=cSec+1;
    while(cInsert<lines.length&&!lines[cInsert].includes('>'))cInsert++;
    cInsert++;
    var ctaGlows=[
      '        <div className="glow" style={{ width: 1000, height: 1000, top: -300, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(30,58,138,0.25) 0%, transparent 65%)", animation: "floatGlow 9s ease-in-out infinite" }} />',
      '        <div className="glow" style={{ width: 600, height: 600, bottom: -200, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)" }} />',
    ];
    for(var i=ctaGlows.length-1;i>=0;i--)lines.splice(cInsert,0,ctaGlows[i]);
    console.log('[OK] CTA: 2 glows');
  }
}

// ═══ EFECTO 3: AGREGAR CLASE glass-card A TODAS LAS CARDS ═══
// Buscar cards por sus estilos y agregar className
for(var i=0;i<lines.length;i++){
  var l=lines[i];
  if(l.includes('borderRadius: "16px"')&&l.includes('background')&&!l.includes('glass-card')){
    lines[i]=l.replace('style={{','className="glass-card" style={{');
  }
}
console.log('[OK] glass-card clases agregadas');

// ═══ EFECTO 7: AGREGAR CLASE reveal A SECCIONES ═══
var sectionCount=0;
for(var i=0;i<lines.length;i++){
  if(lines[i].match(/<section[^>]*>/)&&!lines[i].includes('reveal')){
    var cls=sectionCount%3===0?'reveal':sectionCount%3===1?'reveal d1':'reveal d2';
    lines[i]=lines[i].replace('<section','<section className="'+cls+'"');
    sectionCount++;
  }
}
console.log('[OK] reveal clases agregadas ('+sectionCount+' secciones)');

fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
console.log('\n[OK] page.tsx actualizado (parte 2)');
console.log('\nEjecuta: git add . ; git commit -m "transformacion visual completa" ; git push origin main');
