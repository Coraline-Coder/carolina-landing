var fs = require('fs');
var N = '522292924043';
var fixed = 0;

function fix(fp, from, to) {
  var c = fs.readFileSync(fp, 'utf8');
  if (c.indexOf(from) === -1) return false;
  c = c.split(from).join(to);
  fs.writeFileSync(fp, c);
  fixed++;
  return true;
}

// ============ page.tsx ============

// Boton 2 - "WhatsApp directo" CTA final
fix('src/app/page.tsx',
  'href="https://wa.me/' + N + '"\n              target="_blank"\n              rel="noopener noreferrer"\n              style={{\n                fontFamily: "var(--font-jost)",\n                fontWeight: 400,\n                fontSize: "0.9rem"',
  'href="https://wa.me/' + N + '?text=Hola%20Carolina%2C%20me%20interesa%20agendar%20una%20llamada%20estrat%C3%A9gica%20para%20hablar%20sobre%20mis%20campa%C3%B1as%20de%20Meta%20Ads."\n              target="_blank"\n              rel="noopener noreferrer"\n              style={{\n                fontFamily: "var(--font-jost)",\n                fontWeight: 400,\n                fontSize: "0.9rem"');

// Boton 3 - WhatsApp footer
fix('src/app/page.tsx',
  'href="https://wa.me/' + N + '"\n            target="_blank"\n            rel="noopener noreferrer"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 400,\n              fontSize: "0.8rem"',
  'href="https://wa.me/' + N + '?text=Hola%20Carolina%2C%20vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20saber%20c%C3%B3mo%20puedes%20ayudarme%20con%20mis%20Meta%20Ads."\n            target="_blank"\n            rel="noopener noreferrer"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 400,\n              fontSize: "0.8rem"');

// Boton 7 - Hero "Agendar llamada estrategica" -> Calendly
fix('src/app/page.tsx',
  'href="#calculadora"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 500,\n              fontSize: "0.9rem",\n              color: WHITE,\n              background: BLUE,\n              padding: "0.85rem 2rem"',
  'href="https://calendly.com/carolina-mkt"\n            target="_blank"\n            rel="noopener noreferrer"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 500,\n              fontSize: "0.9rem",\n              color: WHITE,\n              background: BLUE,\n              padding: "0.85rem 2rem"');

// Boton 8a - Nav desktop "Agendar llamada" -> Calendly
fix('src/app/page.tsx',
  'href="#calculadora"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 500,\n              fontSize: "0.85rem",\n              color: WHITE,\n              background: BLUE,\n              padding: "0.5rem 1.4rem"',
  'href="https://calendly.com/carolina-mkt"\n            target="_blank"\n            rel="noopener noreferrer"\n            style={{\n              fontFamily: "var(--font-jost)",\n              fontWeight: 500,\n              fontSize: "0.85rem",\n              color: WHITE,\n              background: BLUE,\n              padding: "0.5rem 1.4rem"');

// Boton 8b - Nav mobile "Agendar llamada" -> Calendly
fix('src/app/page.tsx',
  'href="#calculadora"\n              onClick',
  'href="https://calendly.com/carolina-mkt"\n              target="_blank"\n              rel="noopener noreferrer"\n              onClick');

console.log('page.tsx fixes: ' + fixed);

// ============ servicios-section.tsx ============
var sf = 0;
// Both WA links get the same message (Boton 1)
var svc = fs.readFileSync('src/components/servicios-section.tsx', 'utf8');
svc = svc.split('href="https://wa.me/' + N + '"').join('href="https://wa.me/' + N + '?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados."');
fs.writeFileSync('src/components/servicios-section.tsx', svc);
sf++;
console.log('servicios-section.tsx fixed');

// ============ herramientas-gratis.tsx ============
// Botones 4, 5, 6 - inside HTML strings
var hg = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');

// Boton 4 - Calculadora: replace dynamic msg construction
hg = hg.split(
  "document.getElementById('btnWA').href='https://wa.me/" + N + "?text='+msg;"
).join(
  "document.getElementById('btnWA').href='https://wa.me/" + N + "?text='+encodeURIComponent('Hola Carolina, acabe de usar tu calculadora y descubri cuanto estoy desperdiciando en Meta Ads. Quiero saber como recuperarlo. ('+fmt(desperdicio)+' MXN/mes, ROAS '+roas.toFixed(1)+'x)');"
);

// Boton 5 - Scorecard: replace dynamic msg construction
hg = hg.split(
  "document.getElementById('btnWA').href='https://wa.me/" + N + "?text='+msg;"
).join(
  "document.getElementById('btnWA').href='https://wa.me/" + N + "?text='+encodeURIComponent('Hola Carolina, hice el scorecard de madurez de Meta Ads y quiero entender como mejorar mis resultados. Score: '+scoreNorm+'/100');"
);

// Boton 6 - Benchmark: uses btnWhatsapp ID
hg = hg.split(
  "document.getElementById('btnWhatsapp').href='https://wa.me/" + N + "?text='+encodeURIComponent(msg)"
).join(
  "document.getElementById('btnWhatsapp').href='https://wa.me/" + N + "?text='+encodeURIComponent('Hola Carolina, hice el benchmark de performance y quiero analizar mis metricas contigo. Score: '+totalScore+'/100')"
);

fs.writeFileSync('src/components/herramientas-gratis.tsx', hg);
console.log('herramientas-gratis.tsx fixed');

console.log('\nALL DONE - Total fixes: ' + (fixed + sf + 1));
