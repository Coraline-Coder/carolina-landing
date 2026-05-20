const fs=require('fs');
console.log('=== TRANSFORMACION VISUAL - PARTE 1 ===\n');

var css=[];
css.push('/* === EFECTOS VISUALES CAROLINA BETANCOURT === */');
css.push('@keyframes floatGlow { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 20px) scale(1.05); } }');
css.push('@keyframes floatGlow2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -25px) scale(1.08); } }');
css.push('@keyframes floatGlow3 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-20px, 15px) scale(1.03); } 66% { transform: translate(15px, -10px) scale(1.06); } }');
css.push('.glow { position: absolute; pointer-events: none; z-index: 0; border-radius: 50%; }');
css.push('.hero-grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 80px 80px; }');
css.push('.hero-light-line { position: absolute; top: 45%; left: 0; right: 0; height: 1px; z-index: 1; pointer-events: none; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(59,130,246,0.30), rgba(59,130,246,0.15), transparent); }');
css.push('.glass-card { background: rgba(17,24,39,0.7) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(59,130,246,0.15) !important; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }');
css.push('.glass-card:hover { border-color: rgba(59,130,246,0.45) !important; transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.06); }');
css.push('.tool-card { position: relative; overflow: hidden; }');
css.push('.tool-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; z-index: 2; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent); opacity: 0; transition: opacity 0.35s ease; }');
css.push('.tool-card::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle at 50% -20%, rgba(59,130,246,0.10) 0%, transparent 60%); opacity: 0; transition: opacity 0.35s ease; }');
css.push('.tool-card:hover::before { opacity: 1; } .tool-card:hover::after { opacity: 1; }');
css.push('.pulso-watermark { position: absolute; right: -80px; top: 50%; transform: translateY(-50%); font-family: "Cormorant Garamond", serif; font-size: 320px; font-weight: 300; color: rgba(59,130,246,0.025); letter-spacing: -15px; pointer-events: none; line-height: 1; white-space: nowrap; z-index: 0; }');
css.push('.pulso-step { transition: border-color 0.3s ease, background 0.3s ease; border: 1px solid rgba(59,130,246,0.10); position: relative; overflow: hidden; }');
css.push('.pulso-step:hover { border-color: rgba(59,130,246,0.20) !important; background: rgba(30,58,138,0.08) !important; }');
css.push('.process-line { background: linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(59,130,246,0.5), rgba(59,130,246,0.2), transparent) !important; }');
css.push('.process-circle { box-shadow: 0 0 20px rgba(59,130,246,0.15); background: rgba(0,0,0,0.8) !important; }');
css.push('.metric-cell { position: relative; overflow: hidden; }');
css.push('.metric-cell::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s ease; }');
css.push('.metric-cell:hover::before { opacity: 1; }');
css.push('.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }');
css.push('.reveal.on { opacity: 1; transform: none; }');
css.push('.reveal.d1 { transition-delay: 0.1s; } .reveal.d2 { transition-delay: 0.2s; } .reveal.d3 { transition-delay: 0.3s; }');

fs.writeFileSync('src/app/effects.css',css.join('\n'),'utf8');
console.log('[OK] effects.css creado');

var p=fs.readFileSync('src/app/page.tsx','utf8');

if(!p.includes('effects.css')){
  p="import './effects.css';\n"+p;
  console.log('[OK] Import effects.css agregado');
}

var obsCode='\n  // Scroll reveal observer\n  useEffect(() => {\n    const obs = new IntersectionObserver(entries => {\n      entries.forEach(e => {\n        if(e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); }\n      });\n    }, { threshold: 0.08 });\n    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));\n    return () => obs.disconnect();\n  }, []);\n';

if(!p.includes('Scroll reveal observer')){
  var last=p.lastIndexOf('}, [');
  var cb=p.indexOf(']);',last);
  var ip=p.indexOf('\n',cb)+1;
  p=p.substring(0,ip)+obsCode+p.substring(ip);
  console.log('[OK] Scroll reveal observer agregado');
}

var fixes=[['No se si mis ads','No se si mis ads'],['Siguiente paso','Agenda tu llamada'],['SIGUIENTE PASO','AGENDA TU LLAMADA']];
for(var i=0;i<fixes.length;i++){
  if(p.includes(fixes[i][0])){p=p.split(fixes[i][0]).join(fixes[i][1]);console.log('[OK] Texto: "'+fixes[i][0]+'" -> "'+fixes[i][1]+'"');}
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('\n[OK] page.tsx actualizado (parte 1)');
