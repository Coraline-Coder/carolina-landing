const fs = require('fs');

// Show calcular() function in calculadora
let h = fs.readFileSync('public/calculadora-desperdicio.html', 'utf8');
let fnStart = h.indexOf('function calcular()');
let fnEnd = h.indexOf('function restart()', fnStart);
console.log('========== CALCULADORA calcular() ==========');
console.log(h.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 2000));
console.log('========== END ==========\n');

// Show calcular() function in benchmark
h = fs.readFileSync('public/benchmark-performance.html', 'utf8');
fnStart = h.indexOf('function calcular()');
fnEnd = h.indexOf('function restart()', fnStart);
console.log('========== BENCHMARK calcular() ==========');
console.log(h.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 3000));
console.log('========== END ==========');
