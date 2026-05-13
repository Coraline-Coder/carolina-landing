const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8').replace(/\r\n/g, '\n');
p = p.replace('import CalculadoraROAS from "@/components/CalculadoraROAS";', 'import CasoDeExitoSection from "@/components/caso-exito";\nimport CalculadoraROAS from "@/components/CalculadoraROAS";');
p = p.replace('<ProblemaSection />\n      <SistemaFiltroSection />', '<ProblemaSection />\n      <CasoDeExitoSection />\n      <SistemaFiltroSection />');
fs.writeFileSync('src/app/page.tsx', p, 'utf8');
const css = '\n/* Caso de Exito Grid - responsive */\n@media (max-width: 768px) {\n  .caso-grid {\n    grid-template-columns: repeat(2, 1fr) !important;\n    gap: 1rem !important;\n  }\n}\n';
fs.appendFileSync('src/app/globals.css', css, 'utf8');
console.log('Patch OK - page.tsx + globals.css');
