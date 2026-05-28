var fs = require('fs');
var gitignore = fs.readFileSync('.gitignore', 'utf8');
console.log('.next en gitignore: ' + gitignore.includes('.next'));
console.log('\n--- Primeras 30 lineas de .gitignore ---');
gitignore.split('\n').slice(0, 30).forEach(function(l, i) { console.log((i+1) + ': ' + l); });
