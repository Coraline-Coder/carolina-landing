const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src', 'app', 'page.tsx');
let p = fs.readFileSync(f, 'utf8');

// Replace the 5 phase descriptions with exact new copy
const replacements = [
  ["Recopilar datos con inversión mínima y riesgo controlado. Audiencias amplias, múltiples formatos, sin optimizar los primeros 7 días. El objetivo es datos, no ventas.", "Antes de escalar, el sistema necesita datos reales. La mayoría de presupuestos se desperdicia aquí."],
  ["Identificar qué audiencias y formatos generan el menor CPA. La segmentación se estrecha progresivamente: de amplio a geo, de geo a retargeting.", "No todas las audiencias convierten igual. Esta fase encuentra a las que sí — con precisión quirúrgica."],
  ["Escalar lo que funciona en ventanas de oportunidad. Temporadas altas, incrementos de presupuesto calculados, sin romper el aprendizaje del algoritmo.", "Cuando el sistema identifica lo que funciona, se escala en el momento exacto. Ni antes ni después."],
  ["Monitoreo constante para mantener el CPA bajo. Si el CPA sube más del 20% por 3 días consecutivos, se investiga y corrige en menos de 48 horas.", "Un CPA bajo no se mantiene solo. Esta fase es la que la mayoría de agencias omite."],
  ["Documentar aprendizajes al cierre de cada ciclo y reiniciar con ventaja. Cada ciclo comienza mejor calibrado que el anterior.", "Cada ciclo termina con aprendizajes documentados. El siguiente ciclo comienza mejor calibrado."],
];

for (const [old, nw] of replacements) {
  if (!p.includes(old)) { console.error('NOT FOUND:', old.slice(0, 50)); process.exit(1); }
  p = p.replace(old, nw);
}

fs.writeFileSync(f, p, 'utf8');
console.log('OK — P.U.L.S.O. descriptions updated');
