var fs = require('fs');
var f = 'src/components/CalculadoraROAS.tsx';
var c = fs.readFileSync(f, 'utf8');
var lines = c.split('\n');

// Ver linea 500 completa
console.log('Linea 500: ' + lines[499]);

// Mostrar contexto
console.log('\nContexto:');
for (var i = 496; i < 505; i++) {
  if (lines[i]) console.log((i+1) + ': ' + lines[i].trim().substring(0, 140));
}
