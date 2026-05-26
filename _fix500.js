var fs = require('fs');
var f = 'src/components/CalculadoraROAS.tsx';
var c = fs.readFileSync(f, 'utf8');
var lines = c.split('\n');

// Linea 501 (index 500): min="0" -> agregar autocomplete y inputmode
if (lines[500] && lines[500].trim() === 'min="0"') {
  lines[500] = '        min="0" autocomplete="off" inputmode="numeric"';
  console.log('FIX: Linea 501 -> min="0" autocomplete="off" inputmode="numeric"');
} else {
  console.log('SKIP: Linea 501 no coincide');
}

fs.writeFileSync(f, lines.join('\n'));

// Verificar
var c2 = fs.readFileSync(f, 'utf8');
var l2 = c2.split('\n');
console.log('\nVerificacion:');
for (var i = 498; i < 507; i++) {
  console.log((i+1) + ': ' + l2[i].trim());
}
