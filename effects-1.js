const fs=require('fs');
console.log('=== TRANSFORMACION VISUAL - PARTE 1 ===\n');

// ═══ CREAR ARCHIVO CSS DE EFECTOS ═══
const css=`/* ═══ EFECTOS VISUALES CAROLINA BETANCOURT ═══ */

/* Efecto 1: Animacion de glows flotantes */
@keyframes floatGlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 20px) scale(1.05); }
}
@keyframes floatGlow2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -25px) scale(1.08); }
}
@keyframes floatGlow3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-20px, 15px) scale(1.03); }
  66% { transform: translate(15px, -10px) scale(1.06); }
}

/* Glow containers */
.glow { position: absolute; pointer-events: none; z-index: 0; border-radius: 50%; }

/* Efecto 2: Hero dot grid */
.hero-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
  background-size: 80px 80px;
}

/* Efecto 2: Hero light line */
.hero-light-line {
  position: absolute; top: 45%; left: 0; right: 0; height: 1px; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(59,130,246,0.30), rgba(59,130,246,0.15), transparent);
}

/* Efecto 3: Card glassmorphism */
.glass-card {
  background: rgba(17,24,39,0.7) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(59,130,246,0.15) !important;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}
.glass-card:hover {
  border-color: rgba(59,130,246,0.45) !important;
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.06);
}

/* Efecto 3: Herramientas cards con top glow */
.tool-card { position: relative; overflow: hidden; }
.tool-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; z-index: 2;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
  opacity: 0; transition: opacity 0.35s ease;
}
.tool-card::after {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(circle at 50% -20%, rgba(59,130,246,0.10) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.35s ease;
}
.tool-card:hover::before { opacity: 1; }
.tool-card:hover::after { opacity: 1; }

/* Efecto 4: PULSO watermark */
.pulso-watermark {
  position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
  font-family: 'Cormorant Garamond', serif; font-size: 320px; font-weight: 300;
  color: rgba(59,130,246,0.025); letter-spacing: -15px; pointer-events: none;
  line-height: 1; white-space: nowrap; z-index: 0;
}

/* Efecto 4: PULSO step hover */
.pulso-step {
  transition: border-color 0.3s ease, background 0.3s ease;
  border: 1px solid rgba(59,130,246,0.10);
  position: relative; overflow: hidden;
}
.pulso-step:hover {
  border-color: rgba(59,130,246,0.20) !important;
  background: rgba(30,58,138,0.08) !important;
}

/* Efecto 5: Process connector line */
.process-line {
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(59,130,246,0.5), rgba(59,130,246,0.2), transparent) !important;
}

/* Efecto 5: Process circle */
.process-circle {
  box-shadow: 0 0 20px rgba(59,130,246,0.15);
  background: rgba(0,0,0,0.8) !important;
}

/* Efecto 6: Metric glow hover */
.metric-cell { position: relative; overflow: hidden; }
.metric-cell::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.3s ease;
}
.metric-cell:hover::before { opacity: 1; }

/* Efecto 7: Scroll reveal */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.on { opacity: 1; transform: none; }
.reveal.d1 { transition-delay: 0.1s; }
.reveal.d2 { transition-delay: 0.2s; }
.reveal.d3 { transition-delay: 0.3s; }

/* Counter animation */
@keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.count-animate { animation: countUp 0.6s ease forwards; }
`;

fs.writeFileSync('src/app/effects.css',css,'utf8');
console.log('[OK] effects.css creado');

// ═══ MODIFICAR PAGE.TSX ═══
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Agregar import del CSS al inicio del archivo
if(!p.includes('effects.css')){
  p="import './effects.css';\n"+p;
  console.log('[OK] Import effects.css agregado');
}

// Agregar IntersectionObserver useEffect (despues del ultimo useEffect)
const observerCode=`
  // ═══ Scroll reveal observer ═══
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
`;

if(!p.includes('Scroll reveal observer')){
  // Buscar el ultimo useEffect para insertar despues
  const lastEffect=p.lastIndexOf('}, [');
  const closingBracket=p.indexOf(']);',lastEffect);
  const insertPos=p.indexOf('\n',closingBracket)+1;
  p=p.substring(0,insertPos)+observerCode+p.substring(insertPos);
  console.log('[OK] Scroll reveal observer agregado');
}

// ═══ CORRECCIONES DE TEXTO ═══
const textFixes=[
  ['No se si mis ads','No sé si mis ads'],
  ['Siguiente paso','Agenda tu llamada'],
  ['SIGUIENTE PASO','AGENDA TU LLAMADA'],
];
for(const[from,to]of textFixes){
  if(p.includes(from)){p=p.split(from).join(to);console.log('[OK] Texto: "'+from+'" -> "'+to+'"');}
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('\n[OK] page.tsx actualizado (parte 1)');
console.log('\nAhora ejecuta PARTE 2');
`;

fs.writeFileSync('effects-1.js',css,'utf8');
