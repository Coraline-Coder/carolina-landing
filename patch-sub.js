const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src', 'app', 'page.tsx');
let p = fs.readFileSync(f, 'utf8');
const old = 'No es teoría de libros. Es la metodología que extraje de 15 meses, 18 campañas y $63,000 MXN gestionados — formalizada para replicarla con cada cliente.';
const nw = '15 meses de ejecución real terminaron convirtiéndose en un sistema. Uno que ahora implemento con cada cliente.';
if (!p.includes(old)) { console.error('NOT FOUND'); process.exit(1); }
p = p.replace(old, nw);
fs.writeFileSync(f, p, 'utf8');
console.log('OK');
