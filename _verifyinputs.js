var fs = require('fs');
['calculadora-desperdicio.html', 'src/components/herramientas-gratis.tsx', 'src/components/calculadora-roas.tsx', 'src/components/CalculadoraROAS.tsx', 'src/components/checklist-auditoria.tsx'].forEach(function(f) {
  if (!fs.existsSync(f)) return;
  var c = fs.readFileSync(f, 'utf8');
  var lines = c.split('\n');
  lines.forEach(function(l, i) {
    if (l.includes('type="number"')) {
      console.log(f + ':' + (i+1) + ' -> ' + l.trim().substring(0, 140));
    }
  });
});
