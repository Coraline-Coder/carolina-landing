var fs = require('fs');
var c = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines = c.split('\n');

// Find key patterns
var patterns = [
  'minHeight: 500',
  'borderRadius: 12',
  'border: "none"',
  'background: WHITE',
  'background: "#F5F6FA"',
  '<ToolIframe',
  'marginBottom: "1rem"',
  'fontFamily: "var(--font-cormorant)"',
  'border: "1px solid #D0D5E8"',
  'Cerrar',
  'body{',
  'body {',
  'function ToolIframe',
  'function Herramientas',
  '<iframe',
  'openTool',
];

patterns.forEach(function(p) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes(p)) {
      console.log('Line ' + (i+1) + ' [' + p + ']: ' + lines[i].substring(0, 120));
      break;
    }
  }
});
