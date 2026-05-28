var fs = require('fs');
var f = 'public/calculadora-desperdicio.html';
if (fs.existsSync(f)) {
  var c = fs.readFileSync(f, 'utf8');
  // Check body style
  var bodyIdx = c.indexOf('body {');
  if (bodyIdx !== -1) {
    console.log('Body style: ' + c.substring(bodyIdx, bodyIdx + 120));
  }
  // Fix if needed: add margin:0;padding:0
  if (!c.includes('margin: 0;') || c.substring(c.indexOf('body {'), c.indexOf('body {') + 200).includes('background: #000000') && !c.substring(c.indexOf('body {'), c.indexOf('body {') + 200).includes('margin: 0;')) {
    c = c.replace(/body \{\n    background: #000000;/g, 'body {\n    margin: 0;\n    padding: 0;\n    background: #000000;');
    fs.writeFileSync(f, c, 'utf8');
    console.log('FIXED: Added margin:0;padding:0 to body');
  } else {
    console.log('OK: body already has margin:0;padding:0');
  }
} else {
  console.log('File not found: ' + f);
}
