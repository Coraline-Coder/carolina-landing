var fs = require('fs');
var fixes = 0;

// 1) calculadora-desperdicio.html
var f1 = 'calculadora-desperdicio.html';
var c1 = fs.readFileSync(f1, 'utf8');
var lines1 = c1.split('\n');
lines1.forEach(function(l, i) {
  if (l.includes('<input type="number"') && !l.includes('autocomplete="off"')) {
    lines1[i] = l.replace(' min="0"', ' min="0" autocomplete="off" inputmode="numeric"');
    fixes++;
    console.log('FIX: ' + f1 + ':' + (i+1) + ' -> ' + lines1[i].trim().substring(0, 130));
  }
});
fs.writeFileSync(f1, lines1.join('\n'));
console.log(f1 + ': ' + fixes + ' fixes\n');

// 2) herramientas-gratis.tsx — buscar inputs
var f2 = 'src/components/herramientas-gratis.tsx';
var c2 = fs.readFileSync(f2, 'utf8');
var lines2 = c2.split('\n');
var fixes2 = 0;
lines2.forEach(function(l, i) {
  if ((l.includes('type="number"') || l.includes("type='number'")) && !l.includes('autocomplete="off"')) {
    var orig = l.trim();
    lines2[i] = l.replace(' min="0"', ' min="0" autocomplete="off" inputmode="numeric"').replace(" min='0'", " min='0' autocomplete='off' inputmode='numeric'");
    fixes2++;
    console.log('FIX: ' + f2 + ':' + (i+1) + ' -> ' + lines2[i].trim().substring(0, 130));
  }
});
fs.writeFileSync(f2, lines2.join('\n'));
console.log(f2 + ': ' + fixes2 + ' fixes\n');

// 3) Otros archivos con inputs
var others = ['src/components/calculadora-roas.tsx', 'src/components/CalculadoraROAS.tsx', 'src/components/checklist-auditoria.tsx'];
others.forEach(function(f3) {
  if (!fs.existsSync(f3)) return;
  var c3 = fs.readFileSync(f3, 'utf8');
  var lines3 = c3.split('\n');
  var fixes3 = 0;
  lines3.forEach(function(l, i) {
    if (l.includes('type="number"') && !l.includes('autocomplete="off"')) {
      lines3[i] = l.replace(' min="0"', ' min="0" autocomplete="off" inputmode="numeric"');
      fixes3++;
      console.log('FIX: ' + f3 + ':' + (i+1) + ' -> ' + lines3[i].trim().substring(0, 130));
    }
  });
  if (fixes3 > 0) {
    fs.writeFileSync(f3, lines3.join('\n'));
  }
  console.log(f3 + ': ' + fixes3 + ' fixes');
});

console.log('\n=== LISTO ===');
