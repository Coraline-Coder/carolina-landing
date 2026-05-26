var fs = require('fs');
var files = [
  'src/app/page.tsx',
  'src/components/servicios-section.tsx',
  'src/components/herramientas-gratis.tsx',
  'src/components/calculadora-roas.tsx',
  'src/components/CalculadoraROAS.tsx',
  'src/components/checklist-auditoria.tsx',
  'calculadora-desperdicio.html'
];

var issues = [];

files.forEach(function(f) {
  if (!fs.existsSync(f)) { return; }
  var c = fs.readFileSync(f, 'utf8');
  var lines = c.split('\n');

  lines.forEach(function(l, i) {
    var ln = i + 1;
    var t = l.trim();

    // Fixed px widths that might overflow mobile
    if (t.match(/width:\s*[4-9]\d{2}px/) || t.match(/width:\s*\d{4,}px/)) {
      if (!t.includes('max-width') && !t.includes('maxWidth') && !l.includes('@media')) {
        issues.push(f + ':' + ln + ' FIXED WIDTH -> ' + t.substring(0, 100));
      }
    }

    // Fixed font sizes too large for mobile without media query context
    if (t.match(/fontSize:\s*[3-9]\dpx/) || t.match(/font-size:\s*[3-9]\dpx/)) {
      if (!l.includes('@media')) {
        issues.push(f + ':' + ln + ' LARGE FONT -> ' + t.substring(0, 100));
      }
    }

    // overflow hidden that might clip content on mobile
    if ((t.includes('overflow') && t.includes('hidden')) && !l.includes('@media')) {
      issues.push(f + ':' + ln + ' OVERFLOW HIDDEN -> ' + t.substring(0, 100));
    }
  });

  // Check: does file have media queries at all?
  var hasMedia = c.includes('@media');
  var hasResponsive = c.includes('clamp(') || c.includes('min(') || c.includes('max(') || c.includes('vw');
  console.log(f + ': media queries=' + hasMedia + ' | responsive funcs=' + hasResponsive);
});

console.log('\n--- POSIBLES PROBLEMAS DE RESPONSIVIDAD (' + issues.length + ') ---');
issues.forEach(function(i) { console.log(i); });
