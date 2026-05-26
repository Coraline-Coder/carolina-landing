var fs = require('fs');
var path = require('path');
var files = [
  'src/components/herramientas-gratis.tsx',
  'src/components/calculadora-roas.tsx',
  'src/components/CalculadoraROAS.tsx',
  'src/components/checklist-auditoria.tsx'
];
var correcto = '522292924043';
var total = 0, ok = 0, bad = 0;

files.forEach(function(f) {
  if (!fs.existsSync(f)) { console.log('NO EXISTE: ' + f); return; }
  var c = fs.readFileSync(f, 'utf8');
  var lines = c.split('\n');
  lines.forEach(function(l, i) {
    if (l.includes('wa.me')) {
      total++;
      var match = l.match(/wa\.me\/(\d+)/);
      var num = match ? match[1] : 'SIN NUMERO';
      var status = num === correcto ? 'OK' : 'CORREGIR';
      if (num === correcto) ok++; else bad++;
      console.log(f + ':' + (i+1) + ' -> ' + num + ' [' + status + ']');
    }
  });
});

console.log('\n--- RESUMEN ---');
console.log('Total enlaces wa.me: ' + total);
console.log('Correctos (522292924043): ' + ok);
console.log('Incorrectos: ' + bad);
