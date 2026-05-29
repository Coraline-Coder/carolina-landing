const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');

// Extraer secciones
const cStart=c.indexOf('const calculadoraHTML');
const sStart=c.indexOf('const scorecardHTML');
const bStart=c.indexOf('const benchmarkHTML');
const calc=c.substring(cStart,sStart);
const sc=c.substring(sStart,bStart);
const bEnd=c.indexOf('const ',bStart+10);
const bench=c.substring(bStart,bEnd>0?bEnd:c.length);

console.log('=== CALCULADORA - font-family Jost restantes ===');
const jostRefs=calc.match(/font-family[^;]*Jost[^;]*/g);
if(jostRefs)jostRefs.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== CALCULADORA - WA number ===');
const waRefs=calc.match(/522\d{9}/g);
if(waRefs)waRefs.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguno');

console.log('');
console.log('=== CALCULADORA - CJB refs ===');
const cjbRefs=calc.match(/CJB[^<]*/g);
if(cjbRefs)cjbRefs.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== BENCHMARK - font-family Jost restantes ===');
const jostRefsB=bench.match(/font-family[^;]*Jost[^;]*/g);
if(jostRefsB)jostRefsB.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== BENCHMARK - WA number ===');
const waRefsB=bench.match(/522\d{9}/g);
if(waRefsB)waRefsB.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguno');

console.log('');
console.log('=== BENCHMARK - CJB refs ===');
const cjbRefsB=bench.match(/CJB[^<]*/g);
if(cjbRefsB)cjbRefsB.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== SCORECARD - badge text ===');
const badgeMatch=sc.match(/class="badge">[^<]+/g);
if(badgeMatch)badgeMatch.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== CALCULADORA - badge text ===');
const badgeMatchC=calc.match(/class="badge">[^<]+/g);
if(badgeMatchC)badgeMatchC.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');

console.log('');
console.log('=== BENCHMARK - badge text ===');
const badgeMatchB=bench.match(/class="badge">[^<]+/g);
if(badgeMatchB)badgeMatchB.forEach(r=>console.log('  FOUND:',r));
else console.log('  Ninguna');
