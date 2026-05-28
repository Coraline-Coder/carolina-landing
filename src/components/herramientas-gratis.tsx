"use client";
import React,{useState,useRef,useEffect,useCallback} from "react";
import{motion,AnimatePresence} from "framer-motion";
const DEEP_NAVY="#0B2A5A";const CORE_BLUE="#1E3A8A";const BLUE_ELECTRIC="#3B82F6";const ZINC_900="#0B1929";const SILVER_METAL="#C0C5CE";const WHITE="#FFFFFF";const BLACK="#000000";
function ScrollReveal({children,className=""}:{children:React.ReactNode;className?:string}){
const ref=useRef<HTMLDivElement>(null);const[vis,setVis]=useState(false);
useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.unobserve(el)}},{threshold:0.15});obs.observe(el);return()=>obs.disconnect()},[]);
return(<motion.div ref={ref} initial={{opacity:0,y:20}} animate={vis?{opacity:1,y:0}:{}} transition={{duration:0.5,ease:"easeOut"}} className={className}>{children}</motion.div>);
}
const calculadoraHTML=`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>¿Cuánto estás desperdiciando en Meta Ads? · CJB</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 6vw, 48px);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 16px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 15px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 440px;
    margin: 0 auto;
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .input-group { margin-bottom: 28px; }

  .input-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .input-label span {
    font-size: 13px;
    font-weight: 400;
    color: #EEF0FF;
  }

  .input-label .hint {
    font-size: 11px;
    color: #9CA3AF;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    position: absolute;
    left: 16px;
    font-size: 14px;
    color: #9CA3AF;
    pointer-events: none;
  }

  input[type="number"] {
    width: 100%;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.20);
    border-radius: 8px;
    padding: 14px 16px 14px 36px;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }

  input:focus {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  input::placeholder { color: rgba(156,163,175,0.5); }

  .helper {
    font-size: 11px;
    color: #9CA3AF;
    margin-top: 6px;
    line-height: 1.5;
  }

  .btn-primary {
    width: 100%;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 8px;
  }

  .btn-primary:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  #results { display: none; }

  .waste-number {
    text-align: center;
    padding: 32px 0;
    border-bottom: 1px solid rgba(59,130,246,0.15);
    margin-bottom: 32px;
  }

  .waste-label {
    font-size: 11px;
    letter-spacing: 4px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .waste-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 10vw, 72px);
    font-weight: 300;
    color: #3B82F6;
    line-height: 1;
    margin-bottom: 8px;
  }

  .waste-sublabel {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metrics-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }

  .metric-box {
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.15);
    border-radius: 8px;
    padding: 16px 20px;
  }

  .metric-box .m-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .metric-box .m-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #EEF0FF;
    line-height: 1;
  }

  .metric-box .m-sub {
    font-size: 11px;
    color: #9CA3AF;
    margin-top: 4px;
  }

  .metric-box.highlight {
    background: rgba(59,130,246,0.10);
    border-color: rgba(59,130,246,0.30);
  }

  .metric-box.highlight .m-value { color: #3B82F6; }

  .semaforo {
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .semaforo.red { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); }
  .semaforo.yellow { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); }
  .semaforo.green { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); }

  .semaforo-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 3px;
    flex-shrink: 0;
  }

  .red .semaforo-dot { background: #EF4444; }
  .yellow .semaforo-dot { background: #F59E0B; }
  .green .semaforo-dot { background: #22C55E; }

  .semaforo-text .s-title {
    font-size: 13px;
    font-weight: 500;
    color: #EEF0FF;
    margin-bottom: 4px;
  }

  .semaforo-text .s-desc {
    font-size: 13px;
    color: #9CA3AF;
    line-height: 1.6;
  }

  .cta-box {
    text-align: center;
    padding: 28px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-box h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #EEF0FF;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .cta-box h3 span { color: #3B82F6; }

  .cta-box p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;
    margin-bottom: 12px;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.2);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover { border-color: #3B82F6; color: #3B82F6; }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 11px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.5s ease forwards; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-display { font-size: 42px; }
    .container { padding: 40px 16px 60px; }
    .metrics-row { grid-template-columns: 1fr; }
  }
  </style>
</head>
<body>
<div class="container">

  <div class="header animate-in">
    <div class="badge">Carolina Betancourt</div>
    <h1>¿Cuánto está<br><span>desperdiciando</span><br>tu negocio en Meta Ads?</h1>
    <p>Calcula en 30 segundos cuánto dinero se está yendo sin generar ventas reales.</p>
  </div>

  <!-- FORM -->
  <div class="card animate-in" id="formCard">
    <div class="input-group">
      <div class="input-label">
        <span>¿Cuánto inviertes al mes en Meta Ads?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="inversion" placeholder="5000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuántas ventas genera ese presupuesto al mes?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ventas" placeholder="12" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Si no tienes el dato exacto, pon tu mejor estimado.</p>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuál es tu ticket promedio de venta?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuántas ventas necesitas al mes para ser rentable?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="meta" placeholder="25" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Tu objetivo de ventas mensual mínimo.</p>
    </div>

    <button class="btn-primary" onclick="calcular()">Calcular mi desperdicio →</button>
  </div>

  <!-- RESULTS -->
  <div class="card animate-in" id="results">

    <div class="waste-number">
      <div class="waste-label">Estás desperdiciando cada mes</div>
      <div class="waste-amount" id="wasteAmount">\$0</div>
      <div class="waste-sublabel" id="wasteSubLabel">en presupuesto que no se convierte en ventas</div>
    </div>

    <div class="metrics-row">
      <div class="metric-box">
        <div class="m-label">Inversión mensual</div>
        <div class="m-value" id="resInversion">—</div>
        <div class="m-sub">presupuesto total</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Ingresos generados</div>
        <div class="m-value" id="resIngresos">—</div>
        <div class="m-sub">ventas x ticket</div>
      </div>
      <div class="metric-box highlight">
        <div class="m-label">ROAS real</div>
        <div class="m-value" id="resRoas">—</div>
        <div class="m-sub">por cada peso invertido</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Costo por venta</div>
        <div class="m-value" id="resCpv">—</div>
        <div class="m-sub">lo que cuesta cada cliente</div>
      </div>
    </div>

    <div class="semaforo" id="semaforo">
      <div class="semaforo-dot"></div>
      <div class="semaforo-text">
        <div class="s-title" id="semaforoTitle">—</div>
        <div class="s-desc" id="semaforoDesc">—</div>
      </div>
    </div>

    <div class="cta-box">
      <h3>Hay <span id="ctaWaste">\$X</span> recuperables<br>en tu cuenta este mes</h3>
      <p id="ctaDesc">Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta.</p>
      <a id="btnWA" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Quiero recuperar ese dinero
      </a>
      <button class="btn-restart" onclick="restart()">Recalcular</button>
    </div>

  </div>

  <div class="footer">Carolina Betancourt · Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  function fmt(n) {
    return '\$' + Math.round(n).toLocaleString('es-MX');
  }

  function calcular() {
    const inv  = parseFloat(document.getElementById('inversion').value);
    const vts  = parseFloat(document.getElementById('ventas').value);
    const tick = parseFloat(document.getElementById('ticket').value);
    const meta = parseFloat(document.getElementById('meta').value);

    if (isNaN(inv) || isNaN(vts) || isNaN(tick) || isNaN(meta)) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ingresos = vts * tick;
    const roas = ingresos / inv;
    const cpv = vts > 0 ? inv / vts : inv;
    const ventasFaltantes = Math.max(0, meta - vts);
    const desperdicio = Math.max(0, inv - ingresos);
    const porcentajeDesperdicio = Math.min(100, (desperdicio / inv) * 100);

    // Semáforo
    let semClass, semTitle, semDesc;
    if (roas < 1) {
      semClass = 'red';
      semTitle = '🔴 Situación crítica — estás perdiendo dinero';
      semDesc = \`Por cada peso que inviertes en Meta, recuperas \${roas.toFixed(2)} pesos. Tu campaña está destruyendo capital. Esto tiene solución, pero requiere acción inmediata.\`;
    } else if (roas < 2.5) {
      semClass = 'yellow';
      semTitle = '🟡 Rendimiento bajo — hay fugas importantes';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x está por debajo del mínimo saludable (2.5x). Estás generando algo, pero la mayoría del presupuesto no está convirtiendo. Con los ajustes correctos esto puede cambiar rápido.\`;
    } else {
      semClass = 'green';
      semTitle = '🟢 Base sólida — hay margen de escalamiento';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x está bien. El siguiente paso es escalar sin perder eficiencia — ahí es donde la mayoría de negocios tropieza.\`;
    }

    // Render
    document.getElementById('formCard').style.display = 'none';
    const res = document.getElementById('results');
    res.style.display = 'block';

    document.getElementById('wasteAmount').textContent = fmt(desperdicio);
    document.getElementById('wasteSubLabel').textContent =
      porcentajeDesperdicio > 50
        ? \`El \${Math.round(porcentajeDesperdicio)}% de tu inversión no regresa como ventas\`
        : \`Hay oportunidad de optimizar el \${Math.round(100 - (roas/3.5)*100 > 0 ? 100 - (roas/3.5)*100 : 10)}% de tu inversión\`;

    document.getElementById('resInversion').textContent = fmt(inv);
    document.getElementById('resIngresos').textContent = fmt(ingresos);
    document.getElementById('resRoas').textContent = roas.toFixed(1) + 'x';
    document.getElementById('resCpv').textContent = fmt(cpv);

    const sem = document.getElementById('semaforo');
    sem.className = 'semaforo ' + semClass;
    document.getElementById('semaforoTitle').textContent = semTitle;
    document.getElementById('semaforoDesc').textContent = semDesc;

    document.getElementById('ctaWaste').textContent = fmt(desperdicio);

    if (roas < 1) {
      document.getElementById('ctaDesc').textContent = 'Tu cuenta necesita intervención urgente. Hablemos hoy — te digo exactamente qué está fallando y cómo pararlo.';
    } else if (roas < 2.5) {
      document.getElementById('ctaDesc').textContent = 'Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta. Hablemos 15 minutos.';
    } else {
      document.getElementById('ctaDesc').textContent = 'Tienes una base sólida. El siguiente paso es escalar sin romper lo que funciona — eso requiere una estrategia específica.';
    }

    const msg = encodeURIComponent(
      \`Hola Carolina, acabo de calcular que estoy desperdiciando \${fmt(desperdicio)} MXN al mes en Meta Ads con un ROAS de \${roas.toFixed(1)}x. Quiero saber cómo mejorar esto.\`
    );
    document.getElementById('btnWA').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('formCard').style.display = 'block';
  }
</script>
</body>
</html>
`;
const scorecardHTML=`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>¿Qué tan lista está tu cuenta Meta para escalar? · CJB</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 16px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 14px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 440px;
    margin: 0 auto;
  }

  .progress-wrap {
    margin-bottom: 36px;
  }

  .progress-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .progress-top span {
    font-size: 11px;
    letter-spacing: 2px;
    color: #9CA3AF;
    text-transform: uppercase;
  }

  .progress-bar {
    height: 4px;
    background: #1F2937;
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #3B82F6;
    border-radius: 100px;
    transition: width 0.4s ease;
    width: 0%;
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .question-number {
    font-size: 10px;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .question-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: #EEF0FF;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  .question-hint {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border: 1.5px solid rgba(59,130,246,0.15);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #111827;
    color: #EEF0FF;
  }

  .option:hover {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  .option.selected {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  .option-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(59,130,246,0.3);
    flex-shrink: 0;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option.selected .option-dot {
    border-color: #3B82F6;
    background: #3B82F6;
  }

  .option.selected .option-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }

  .option-text {
    font-size: 14px;
    color: #EEF0FF;
    font-weight: 400;
    line-height: 1.4;
  }

  .option-score {
    margin-left: auto;
    font-size: 11px;
    color: #9CA3AF;
    flex-shrink: 0;
  }

  .option.selected .option-score { color: #3B82F6; }

  .nav-buttons {
    display: flex;
    gap: 12px;
    margin-top: 28px;
  }

  .btn-back {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .btn-back:hover { border-color: #3B82F6; color: #3B82F6; }

  .btn-next {
    flex: 1;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-next:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .btn-next:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  #resultsCard { display: none; }

  .score-hero {
    text-align: center;
    padding: 32px 0 28px;
    border-bottom: 1px solid rgba(59,130,246,0.15);
    margin-bottom: 28px;
  }

  .score-tag {
    font-size: 10px;
    letter-spacing: 4px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .score-display {
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px;
    font-weight: 300;
    line-height: 1;
    margin-bottom: 4px;
  }

  .score-out {
    font-size: 13px;
    color: #9CA3AF;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .score-nivel {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 20px;
    border-radius: 100px;
  }

  .breakdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }

  .breakdown-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: #1F2937;
    border-radius: 12px;
    border: 1px solid rgba(59,130,246,0.15);
  }

  .b-icon { font-size: 18px; flex-shrink: 0; }

  .b-info { flex: 1; }

  .b-name {
    font-size: 12px;
    font-weight: 400;
    color: #EEF0FF;
    margin-bottom: 2px;
  }

  .b-bar-wrap {
    height: 4px;
    background: #1F2937;
    border-radius: 100px;
    overflow: hidden;
    width: 100%;
  }

  .b-bar {
    height: 100%;
    border-radius: 100px;
    transition: width 0.8s ease;
  }

  .b-score {
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
  }

  .criticos {
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 24px;
  }

  .criticos-title {
    font-size: 10px;
    letter-spacing: 3px;
    color: #EF4444;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .critico-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
  }

  .critico-item:last-child { margin-bottom: 0; }

  .critico-dot {
    width: 6px;
    height: 6px;
    background: #EF4444;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .critico-text {
    font-size: 13px;
    color: #EEF0FF;
    line-height: 1.5;
  }

  .cta-box {
    text-align: center;
    padding: 28px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-box h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #EEF0FF;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .cta-box h3 span { color: #3B82F6; }

  .cta-box p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.2);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover { border-color: #3B82F6; color: #3B82F6; }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 11px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.5s ease forwards; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-number .num { font-size: 32px; }
    .container { padding: 40px 16px 60px; }
  }
  </style>
</head>
<body>
<div class="container">

  <div class="header animate-in">
    <div class="badge">Carolina Betancourt</div>
    <h1>¿Cuánto está<br><span>desperdiciando</span><br>tu negocio en Meta Ads?</h1>
    <p>Calcula en 30 segundos cuánto dinero se está yendo sin generar ventas reales.</p>
  </div>

  <!-- FORM -->
  <div class="card animate-in" id="formCard">
    <div class="input-group">
      <div class="input-label">
        <span>¿Cuánto inviertes al mes en Meta Ads?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="inversion" placeholder="5000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuántas ventas genera ese presupuesto al mes?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ventas" placeholder="12" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Si no tienes el dato exacto, pon tu mejor estimado.</p>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuál es tu ticket promedio de venta?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>¿Cuántas ventas necesitas al mes para ser rentable?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="meta" placeholder="25" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Tu objetivo de ventas mensual mínimo.</p>
    </div>

    <button class="btn-primary" onclick="calcular()">Calcular mi desperdicio →</button>
  </div>

  <!-- RESULTS -->
  <div class="card animate-in" id="results">

    <div class="waste-number">
      <div class="waste-label">Estás desperdiciando cada mes</div>
      <div class="waste-amount" id="wasteAmount">\$0</div>
      <div class="waste-sublabel" id="wasteSubLabel">en presupuesto que no se convierte en ventas</div>
    </div>

    <div class="metrics-row">
      <div class="metric-box">
        <div class="m-label">Inversión mensual</div>
        <div class="m-value" id="resInversion">—</div>
        <div class="m-sub">presupuesto total</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Ingresos generados</div>
        <div class="m-value" id="resIngresos">—</div>
        <div class="m-sub">ventas x ticket</div>
      </div>
      <div class="metric-box highlight">
        <div class="m-label">ROAS real</div>
        <div class="m-value" id="resRoas">—</div>
        <div class="m-sub">por cada peso invertido</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Costo por venta</div>
        <div class="m-value" id="resCpv">—</div>
        <div class="m-sub">lo que cuesta cada cliente</div>
      </div>
    </div>

    <div class="semaforo" id="semaforo">
      <div class="semaforo-dot"></div>
      <div class="semaforo-text">
        <div class="s-title" id="semaforoTitle">—</div>
        <div class="s-desc" id="semaforoDesc">—</div>
      </div>
    </div>

    <div class="cta-box">
      <h3>Hay <span id="ctaWaste">\$X</span> recuperables<br>en tu cuenta este mes</h3>
      <p id="ctaDesc">Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta.</p>
      <a id="btnWA" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Quiero recuperar ese dinero
      </a>
      <button class="btn-restart" onclick="restart()">Recalcular</button>
    </div>

  </div>

  <div class="footer">Carolina Betancourt · Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  function fmt(n) {
    return '\$' + Math.round(n).toLocaleString('es-MX');
  }

  function calcular() {
    const inv  = parseFloat(document.getElementById('inversion').value);
    const vts  = parseFloat(document.getElementById('ventas').value);
    const tick = parseFloat(document.getElementById('ticket').value);
    const meta = parseFloat(document.getElementById('meta').value);

    if (isNaN(inv) || isNaN(vts) || isNaN(tick) || isNaN(meta)) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ingresos = vts * tick;
    const roas = ingresos / inv;
    const cpv = vts > 0 ? inv / vts : inv;
    const ventasFaltantes = Math.max(0, meta - vts);
    const desperdicio = Math.max(0, inv - ingresos);
    const porcentajeDesperdicio = Math.min(100, (desperdicio / inv) * 100);

    // Semáforo
    let semClass, semTitle, semDesc;
    if (roas < 1) {
      semClass = 'red';
      semTitle = '🔴 Situación crítica — estás perdiendo dinero';
      semDesc = \`Por cada peso que inviertes en Meta, recuperas \${roas.toFixed(2)} pesos. Tu campaña está destruyendo capital. Esto tiene solución, pero requiere acción inmediata.\`;
    } else if (roas < 2.5) {
      semClass = 'yellow';
      semTitle = '🟡 Rendimiento bajo — hay fugas importantes';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x está por debajo del mínimo saludable (2.5x). Estás generando algo, pero la mayoría del presupuesto no está convirtiendo. Con los ajustes correctos esto puede cambiar rápido.\`;
    } else {
      semClass = 'green';
      semTitle = '🟢 Base sólida — hay margen de escalamiento';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x está bien. El siguiente paso es escalar sin perder eficiencia — ahí es donde la mayoría de negocios tropieza.\`;
    }

    // Render
    document.getElementById('formCard').style.display = 'none';
    const res = document.getElementById('results');
    res.style.display = 'block';

    document.getElementById('wasteAmount').textContent = fmt(desperdicio);
    document.getElementById('wasteSubLabel').textContent =
      porcentajeDesperdicio > 50
        ? \`El \${Math.round(porcentajeDesperdicio)}% de tu inversión no regresa como ventas\`
        : \`Hay oportunidad de optimizar el \${Math.round(100 - (roas/3.5)*100 > 0 ? 100 - (roas/3.5)*100 : 10)}% de tu inversión\`;

    document.getElementById('resInversion').textContent = fmt(inv);
    document.getElementById('resIngresos').textContent = fmt(ingresos);
    document.getElementById('resRoas').textContent = roas.toFixed(1) + 'x';
    document.getElementById('resCpv').textContent = fmt(cpv);

    const sem = document.getElementById('semaforo');
    sem.className = 'semaforo ' + semClass;
    document.getElementById('semaforoTitle').textContent = semTitle;
    document.getElementById('semaforoDesc').textContent = semDesc;

    document.getElementById('ctaWaste').textContent = fmt(desperdicio);

    if (roas < 1) {
      document.getElementById('ctaDesc').textContent = 'Tu cuenta necesita intervención urgente. Hablemos hoy — te digo exactamente qué está fallando y cómo pararlo.';
    } else if (roas < 2.5) {
      document.getElementById('ctaDesc').textContent = 'Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta. Hablemos 15 minutos.';
    } else {
      document.getElementById('ctaDesc').textContent = 'Tienes una base sólida. El siguiente paso es escalar sin romper lo que funciona — eso requiere una estrategia específica.';
    }

    const msg = encodeURIComponent(
      \`Hola Carolina, acabo de calcular que estoy desperdiciando \${fmt(desperdicio)} MXN al mes en Meta Ads con un ROAS de \${roas.toFixed(1)}x. Quiero saber cómo mejorar esto.\`
    );
    document.getElementById('btnWA').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('formCard').style.display = 'block';
  }
</script>
</body>
</html>
`;
const benchmarkHTML=`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carolina Betancourt</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: #EEF0FF;
    --blue: #3B82F6;
    --blue-dim: rgba(59,130,246,0.10);
    --white: #FFFFFF;
    --gray: #9CA3AF;
    --light: #1F2937;
    --success: #22C55E;
    --warning: #F59E0B;
    --danger: #EF4444;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 56px;
  }

  .badge {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 52px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 15px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
  }

  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 48px;
  }

  .step-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(59,130,246,0.2);
    transition: all 0.3s ease;
  }

  .step-dot.active {
    background: #3B82F6;
    width: 24px;
    border-radius: 4px;
  }

  .step-dot.done {
    background: rgba(59,130,246,0.5);
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 32px;
    color: #EEF0FF;
  }

  .input-group {
    margin-bottom: 28px;
  }

  .input-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .input-label span {
    font-size: 13px;
    font-weight: 400;
    color: #EEF0FF;
    letter-spacing: 0.3px;
  }

  .input-label .hint {
    font-size: 11px;
    color: #9CA3AF;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    position: absolute;
    left: 16px;
    font-size: 14px;
    color: #9CA3AF;
    font-weight: 400;
    pointer-events: none;
  }

  .input-suffix {
    position: absolute;
    right: 16px;
    font-size: 14px;
    color: #9CA3AF;
    pointer-events: none;
  }

  input[type="number"],
  select {
    width: 100%;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.20);
    border-radius: 8px;
    padding: 14px 44px 14px 40px;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -moz-appearance: textfield;
  }

  select {
    padding: 14px 16px;
    cursor: pointer;
    appearance: none;
    color: #EEF0FF;
  }

  select option {
    background: #111827;
    color: #EEF0FF;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }

  input:focus, select:focus {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  input::placeholder { color: rgba(156,163,175,0.5); }

  .divider {
    height: 1px;
    background: rgba(59,130,246,0.15);
    margin: 32px 0;
  }

  .btn-primary {
    width: 100%;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 8px;
  }

  .btn-primary:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .btn-primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  .results { display: none; }

  .score-container {
    text-align: center;
    padding: 40px 0 32px;
  }

  .score-ring {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto 24px;
  }

  .score-ring svg {
    transform: rotate(-90deg);
    width: 160px;
    height: 160px;
  }

  .score-ring .track {
    fill: none;
    stroke: #1F2937;
    stroke-width: 8;
  }

  .score-ring .progress {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    stroke-dasharray: 408;
    stroke-dashoffset: 408;
  }

  .score-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .score-number .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    line-height: 1;
    display: block;
    color: #EEF0FF;
  }

  .score-number .out-of {
    font-size: 12px;
    color: #9CA3AF;
    letter-spacing: 2px;
  }

  .score-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 8px;
    color: #EEF0FF;
  }

  .score-sublabel {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 32px 0;
  }

  .metric-row {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.15);
    border-radius: 8px;
    padding: 16px 20px;
  }

  .metric-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .metric-info { flex: 1; }

  .metric-name {
    font-size: 12px;
    color: #9CA3AF;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .metric-values {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .metric-your {
    font-size: 18px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
  }

  .metric-vs {
    font-size: 11px;
    color: #9CA3AF;
  }

  .metric-benchmark {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metric-status {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 100px;
    text-transform: uppercase;
  }

  .status-good { background: rgba(34,197,94,0.15); color: #22C55E; }
  .status-ok { background: rgba(245,158,11,0.15); color: #F59E0B; }
  .status-bad { background: rgba(239,68,68,0.15); color: #EF4444; }

  .insight-box {
    background: rgba(59,130,246,0.10);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 16px;
    padding: 24px 28px;
    margin: 24px 0;
  }

  .insight-box .insight-title {
    font-size: 11px;
    letter-spacing: 3px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .insight-box p {
    font-size: 14px;
    line-height: 1.7;
    color: #EEF0FF;
  }

  .cta-section {
    text-align: center;
    padding: 32px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-section h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    margin-bottom: 12px;
    line-height: 1.3;
    color: #EEF0FF;
  }

  .cta-section h3 span { color: #3B82F6; }

  .cta-section p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-bottom: 16px;
    width: 100%;
    justify-content: center;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.25);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover {
    border-color: #3B82F6;
    color: #3B82F6;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 12px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.4s ease forwards; }
  .form-section { transition: opacity 0.3s ease; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-number .num { font-size: 32px; }
    .container { padding: 40px 16px 60px; }
  }
  </style>
</head>
<body>

<div class="container">

  <div class="header animate-in">
    <div class="badge">Carolina Betancourt</div>
    <h1>Benchmark de<br><span>Performance Meta Ads</span></h1>
    <p>Descubre si tus métricas están por encima o por debajo del promedio de tu industria — y qué está frenando tu escalamiento.</p>
  </div>

  <div class="steps" id="stepsIndicator">
    <div class="step-dot active" id="dot0"></div>
    <div class="step-dot" id="dot1"></div>
    <div class="step-dot" id="dot2"></div>
  </div>

  <!-- STEP 1: Industria y presupuesto -->
  <div class="card animate-in" id="step1">
    <div class="section-label">Paso 1 de 3</div>
    <div class="section-title">Tu negocio</div>

    <div class="input-group">
      <div class="input-label">
        <span>Industria</span>
      </div>
      <div class="input-wrapper">
        <select id="industria">
          <option value="" disabled selected>Selecciona tu industria</option>
          <option value="ecommerce">E-commerce / Tienda online</option>
          <option value="servicios">Servicios profesionales</option>
          <option value="restaurantes">Restaurantes / Food</option>
          <option value="salud">Salud y bienestar</option>
          <option value="educacion">Educación / Cursos</option>
          <option value="inmobiliario">Inmobiliario</option>
          <option value="moda">Moda y belleza</option>
          <option value="otro">Otro</option>
        </select>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>Presupuesto mensual en Meta Ads</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="presupuesto" placeholder="5,000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>Ticket promedio de venta</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <button class="btn-primary" onclick="goStep2()">Continuar →</button>
  </div>

  <!-- STEP 2: Métricas -->
  <div class="card animate-in" id="step2" style="display:none;">
    <div class="section-label">Paso 2 de 3</div>
    <div class="section-title">Tus métricas actuales</div>

    <div class="input-group">
      <div class="input-label">
        <span>ROAS actual</span>
        <span class="hint">Ingreso / Inversión</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="roas" placeholder="2.5" min="0" step="0.1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()" style="padding-left:16px;">
        <span class="input-suffix">x</span>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CTR promedio</span>
        <span class="hint">Clicks / Impresiones</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ctr" placeholder="1.8" min="0" step="0.01" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()" style="padding-left:16px;">
        <span class="input-suffix">%</span>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CPM promedio</span>
        <span class="hint">Costo por mil impresiones</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="cpm" placeholder="120" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CPL / CPA actual</span>
        <span class="hint">Costo por lead o conversión</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">\$</span>
        <input type="number" id="cpl" placeholder="350" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div style="display:flex; gap:12px; margin-top:8px;">
      <button class="btn-restart" onclick="goStep1()" style="width:auto; padding:12px 24px;">← Atrás</button>
      <button class="btn-primary" onclick="calcular()" style="margin-top:0;">Ver mi benchmark →</button>
    </div>
  </div>

  <!-- RESULTS -->
  <div class="card results animate-in" id="resultsCard">
    <div class="score-container">
      <div class="score-ring">
        <svg viewBox="0 0 160 160">
          <circle class="track" cx="80" cy="80" r="65"/>
          <circle class="progress" id="scoreCircle" cx="80" cy="80" r="65"/>
        </svg>
        <div class="score-number">
          <span class="num" id="scoreNum">0</span>
          <span class="out-of">/ 100</span>
        </div>
      </div>
      <div class="score-label" id="scoreLabel">—</div>
      <div class="score-sublabel" id="scoreSubLabel">—</div>
    </div>

    <div class="divider"></div>

    <div class="metrics-grid" id="metricsGrid"></div>

    <div class="insight-box" id="insightBox"></div>

    <div class="cta-section">
      <h3>Tu score tiene<br><span id="ctaHighlight">oportunidades concretas</span></h3>
      <p id="ctaText">Encontré los puntos críticos en tu cuenta. Hablemos 15 minutos y te explico exactamente qué cambiaría.</p>
      <a id="btnWhatsapp" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Hablar con Carolina ahora
      </a>
      <button class="btn-restart" onclick="restart()">Hacer otro benchmark</button>
    </div>
  </div>

  <div class="footer">Carolina Betancourt · Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  // Benchmarks por industria
  const benchmarks = {
    ecommerce:    { roas: 3.5, ctr: 2.0, cpm: 100, cpl: 200 },
    servicios:    { roas: 4.0, ctr: 1.5, cpm: 80,  cpl: 300 },
    restaurantes: { roas: 2.5, ctr: 1.8, cpm: 90,  cpl: 150 },
    salud:        { roas: 3.0, ctr: 1.6, cpm: 110, cpl: 280 },
    educacion:    { roas: 4.5, ctr: 2.2, cpm: 95,  cpl: 250 },
    inmobiliario: { roas: 5.0, ctr: 1.2, cpm: 150, cpl: 600 },
    moda:         { roas: 3.0, ctr: 2.5, cpm: 85,  cpl: 180 },
    otro:         { roas: 3.0, ctr: 1.8, cpm: 100, cpl: 300 },
  };

  function updateDots(active) {
    for (let i = 0; i < 3; i++) {
      const d = document.getElementById('dot' + i);
      d.className = 'step-dot';
      if (i < active) d.classList.add('done');
      if (i === active) d.classList.add('active');
    }
  }

  function goStep2() {
    const ind = document.getElementById('industria').value;
    const pres = document.getElementById('presupuesto').value;
    const tick = document.getElementById('ticket').value;
    if (!ind || !pres || !tick) {
      alert('Por favor completa todos los campos.');
      return;
    }
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    updateDots(1);
  }

  function goStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    updateDots(0);
  }

  function calcular() {
    const industria = document.getElementById('industria').value;
    const roas = parseFloat(document.getElementById('roas').value);
    const ctr  = parseFloat(document.getElementById('ctr').value);
    const cpm  = parseFloat(document.getElementById('cpm').value);
    const cpl  = parseFloat(document.getElementById('cpl').value);

    if (isNaN(roas) || isNaN(ctr) || isNaN(cpm) || isNaN(cpl)) {
      alert('Por favor completa todas las métricas.');
      return;
    }

    const bench = benchmarks[industria];
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const ticket = parseFloat(document.getElementById('ticket').value);

    // Score por métrica (0-25 cada una)
    const scoreRoas = Math.min(25, (roas / bench.roas) * 25);
    const scoreCtr  = Math.min(25, (ctr  / bench.ctr)  * 25);
    const scoreCpm  = Math.min(25, (bench.cpm / cpm)   * 25); // menor es mejor
    const scoreCpl  = Math.min(25, (bench.cpl / cpl)   * 25); // menor es mejor

    const totalScore = Math.round(scoreRoas + scoreCtr + scoreCpm + scoreCpl);

    // Score label
    let scoreLabel, scoreSub, scoreColor;
    if (totalScore >= 80) {
      scoreLabel = 'Rendimiento Alto'; scoreSub = 'Tus campañas están por encima del promedio.'; scoreColor = '#22C55E';
    } else if (totalScore >= 55) {
      scoreLabel = 'Rendimiento Medio'; scoreSub = 'Hay oportunidades claras de mejora.'; scoreColor = '#F59E0B';
    } else {
      scoreLabel = 'Rendimiento Bajo'; scoreSub = 'Tu inversión no está rindiendo lo que debería.'; scoreColor = '#EF4444';
    }

    // Render results
    document.getElementById('step2').style.display = 'none';
    const rc = document.getElementById('resultsCard');
    rc.style.display = 'block';
    updateDots(2);

    // Score ring animation
    document.getElementById('scoreNum').textContent = totalScore;
    document.getElementById('scoreLabel').textContent = scoreLabel;
    document.getElementById('scoreLabel').style.color = scoreColor;
    document.getElementById('scoreSubLabel').textContent = scoreSub;

    const circle = document.getElementById('scoreCircle');
    circle.style.stroke = scoreColor;
    setTimeout(() => {
      const offset = 408 - (totalScore / 100) * 408;
      circle.style.strokeDashoffset = offset;
    }, 100);

    // Metrics grid
    const metricData = [
      { name: 'ROAS', your: roas + 'x', bench: bench.roas + 'x', score: scoreRoas, icon: '📈', fmt: (v) => v + 'x' },
      { name: 'CTR',  your: ctr + '%',  bench: bench.ctr + '%',  score: scoreCtr,  icon: '👆', fmt: (v) => v + '%' },
      { name: 'CPM',  your: '\$' + cpm,  bench: '\$' + bench.cpm,  score: scoreCpm,  icon: '👁', fmt: (v) => '\$' + v },
      { name: 'CPL / CPA', your: '\$' + cpl, bench: '\$' + bench.cpl, score: scoreCpl, icon: '🎯', fmt: (v) => '\$' + v },
    ];

    const grid = document.getElementById('metricsGrid');
    grid.innerHTML = '';
    metricData.forEach(m => {
      const pct = (m.score / 25) * 100;
      const status = pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad';
      const statusLabel = pct >= 80 ? 'Bien' : pct >= 50 ? 'Mejorable' : 'Crítico';
      const bgColor = pct >= 80 ? 'rgba(34,197,94,0.1)' : pct >= 50 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)';
      grid.innerHTML += \`
        <div class="metric-row">
          <div class="metric-icon" style="background:\${bgColor}">\${m.icon}</div>
          <div class="metric-info">
            <div class="metric-name">\${m.name}</div>
            <div class="metric-values">
              <span class="metric-your" style="color:\${pct>=80?'#22C55E':pct>=50?'#F59E0B':'#EF4444'}">\${m.your}</span>
              <span class="metric-vs">vs</span>
              <span class="metric-benchmark">promedio \${m.bench}</span>
            </div>
          </div>
          <span class="metric-status status-\${status}">\${statusLabel}</span>
        </div>\`;
    });

    // Insight
    const weakMetrics = metricData.filter(m => (m.score / 25) * 100 < 50).map(m => m.name);
    let insightText = '';
    if (weakMetrics.length === 0) {
      insightText = 'Tus métricas están sólidas. El siguiente paso es escalar de forma inteligente sin romper el aprendizaje de tus campañas.';
    } else if (weakMetrics.includes('ROAS')) {
      insightText = \`Tu ROAS de \${roas}x está por debajo del promedio de la industria (\${bench.roas}x). Esto generalmente indica problemas en la estructura de campañas, audiencias frías sin calificar, o creativos que no conectan con el dolor real del cliente.\`;
    } else if (weakMetrics.includes('CPL / CPA')) {
      insightText = \`Tu costo por conversión de \$\${cpl} está \${Math.round(((cpl - bench.cpl) / bench.cpl) * 100)}% por encima del promedio. Cada venta te está costando más de lo que debería — hay fugas en tu funnel que se pueden identificar y cerrar.\`;
    } else {
      insightText = \`Las métricas más débiles son: \${weakMetrics.join(', ')}. Estos son puntos de fuga concretos donde tu presupuesto se está desperdiciando sin generar el retorno que debería.\`;
    }

    document.getElementById('insightBox').innerHTML = \`
      <div class="insight-title">Diagnóstico</div>
      <p>\${insightText}</p>\`;

    // CTA personalizado
    const perdida = presupuesto && ticket ? Math.round(presupuesto * (1 - totalScore / 100)) : null;

    if (totalScore < 55) {
      document.getElementById('ctaHighlight').textContent = \`~\$\${perdida ? perdida.toLocaleString() : '?'} MXN que podrías recuperar\`;
      document.getElementById('ctaText').textContent = 'Encontré los puntos críticos de tu cuenta. Hablemos 15 minutos y te explico exactamente qué cambiaría para mejorar este score.';
    } else if (totalScore < 80) {
      document.getElementById('ctaHighlight').textContent = 'margen de escalamiento real';
      document.getElementById('ctaText').textContent = 'Tus bases están bien pero hay optimizaciones concretas que pueden mover tus números. Te explico cuáles en 15 minutos.';
    } else {
      document.getElementById('ctaHighlight').textContent = 'potencial de escalamiento';
      document.getElementById('ctaText').textContent = 'Tienes métricas sólidas. El siguiente nivel es escalar sin perder eficiencia — eso requiere una estrategia específica.';
    }

    // WhatsApp message
    const msg = encodeURIComponent(\`Hola Carolina, acabo de hacer el Benchmark de Performance Meta Ads y obtuve un score de \${totalScore}/100. Me interesa saber cómo mejorar mis métricas.\`);
    document.getElementById('btnWhatsapp').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('resultsCard').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    updateDots(0);
    document.getElementById('scoreCircle').style.strokeDashoffset = 408;
  }
</script>
</body>
</html>
`;
const tools=[
{id:"calculadora",emoji:"\u{1F9CA}",label:"No se si mis ads funcionan",title:"Calculadora de desperdicio",desc:"Calcula en 30 segundos cuánto dinero se va sin generar ventas reales.",html:calculadoraHTML},
{id:"scorecard",emoji:"\u{1F321}\uFE0F",label:"Invierto pero quiero escalar",title:"Scorecard de madurez",desc:"6 preguntas para saber exactamente qué está frenando el crecimiento de tus campañas.",html:scorecardHTML},
{id:"benchmark",emoji:"\u{1F525}",label:"Ya invierto fuerte y quiero comparar",title:"Benchmark de performance",desc:"Compara tus métricas con el promedio de tu industria y detecta las fugas.",html:benchmarkHTML},
];
function ToolIframe({html,onHeight}:{html:string;onHeight:(h:number)=>void}){
const iframeRef=useRef<HTMLIFrameElement>(null);
const handleLoad=useCallback(()=>{try{const doc=iframeRef.current?.contentDocument;if(doc?.body)onHeight(doc.body.scrollHeight)}catch{onHeight(900)}},[onHeight]);
useEffect(()=>{const handler=(e:MessageEvent)=>{if(e.data?.type==="resize"&&typeof e.data.height==="number")onHeight(e.data.height)};window.addEventListener("message",handler);return()=>window.removeEventListener("message",handler)},[onHeight]);
return<iframe ref={iframeRef} srcDoc={html} onLoad={handleLoad} style={{width:"100%",border:"none",display:"block",minHeight:500,borderRadius:12}} sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"/>;
}
export default function HerramientasGratisSection(){
const[openTool,setOpenTool]=useState<string|null>(null);const panelRef=useRef<HTMLDivElement>(null);useEffect(()=>{if(openTool&&panelRef.current){setTimeout(()=>panelRef.current?.scrollIntoView({behavior:'smooth',block:'center'}),550)}},[openTool]);
const[iframeHeights,setIframeHeights]=useState<Record<string,number>>({});
const handleHeight=useCallback((toolId:string,h:number)=>{setIframeHeights((prev)=>({...prev,[toolId]:h}))},[]);
return(
<section style={{background:BLACK,padding:"6rem 2rem"}}>
<div style={{maxWidth:1100,margin:"0 auto"}}>
<ScrollReveal>
<p style={{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase" as const,color:BLUE_ELECTRIC,marginBottom:"0.75rem",borderLeft:"3px solid "+BLUE_ELECTRIC,paddingLeft:"0.75rem"}}>Herramientas gratuitas</p>
<h2 style={{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:WHITE,lineHeight:1.15,marginBottom:"0.5rem"}}>Empieza aquí. Gratis.</h2>
<p style={{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7,maxWidth:600,marginBottom:"3rem"}}>Tres herramientas para saber exactamente dónde está tu problema — antes de hablar con alguien.</p>
</ScrollReveal>
<div className="herramientas-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.5rem"}}>
{tools.map((t)=>{const isOpen=openTool===t.id;return(
<ScrollReveal key={t.id}>
<div style={{background:isOpen?"rgba(46,95,138,0.06)":DEEP_NAVY,border:isOpen?"2px solid rgba(46,95,138,0.4)":"1px solid rgba(46,95,138,0.15)",borderRadius:16,padding:"2rem 1.5rem",display:"flex",flexDirection:"column",height:"100%",transition:"all 0.3s ease",cursor:"pointer"}} onClick={()=>setOpenTool(isOpen?null:t.id)}>
<span style={{fontSize:"1.8rem",marginBottom:"0.75rem"}}>{t.emoji}</span>
<p style={{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase" as const,color:BLUE_ELECTRIC,marginBottom:"0.5rem"}}>{t.label}</p>
<h3 style={{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.25rem",color:isOpen?WHITE:WHITE,marginBottom:"0.5rem",lineHeight:1.2}}>{t.title}</h3>
<p style={{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.85rem",color:isOpen?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.6)",lineHeight:1.6,flex:1}}>{t.desc}</p>
<button style={{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.8rem",color:WHITE,background:BLUE_ELECTRIC,border:"none",borderRadius:100,padding:"0.65rem 1.2rem",marginTop:"1.2rem",cursor:"pointer",letterSpacing:"0.06em"}} onClick={(e)=>{e.stopPropagation();setOpenTool(isOpen?null:t.id)}}>{isOpen?"Cerrar":"Usar herramienta"} →</button>
</div>
</ScrollReveal>);})}
</div>
<AnimatePresence>
{openTool&&(
<motion.div ref={panelRef} initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.4,ease:"easeInOut"}} style={{overflow:"hidden",marginTop:"2rem"}}>
<div style={{background:"#F5F6FA",border:"1px solid rgba(46,95,138,0.2)",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
<h3 style={{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.3rem",color:"#0B2A5A"}}>{tools.find((t)=>t.id===openTool)?.emoji} {tools.find((t)=>t.id===openTool)?.title}</h3>
<button onClick={()=>setOpenTool(null)} style={{background:"transparent",border:"1px solid #D0D5E8",borderRadius:8,padding:"0.4rem 1rem",fontFamily:"'DM Sans', sans-serif",fontSize:"0.75rem",color:"#8A8FA8",cursor:"pointer",letterSpacing:"0.06em",textTransform:"uppercase" as const}}>Cerrar ✕</button>
</div>
<ToolIframe key={openTool} html={tools.find((t)=>t.id===openTool)!.html} onHeight={(h)=>handleHeight(openTool,h)}/>
</div>
</motion.div>)}
</AnimatePresence>
</div>
</section>);
}
