var fs = require('fs');
var c = fs.readFileSync('src/app/page.tsx', 'utf8');
var lines = c.split('\n');
var fixes = 0;

// Linea 227 (index 226): Nav desktop #calculadora -> Calendly
if (lines[226] && lines[226].includes('#calculadora')) {
  lines[226] = lines[226].replace('href="#calculadora"', 'href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"');
  fixes++;
  console.log('FIX 1: Nav desktop -> Calendly');
} else { console.log('SKIP 1: Nav desktop (line 227)'); }

// Linea 475 (index 474): Hero WA link - update message
if (lines[474] && lines[474].includes('wa.me/522292924043?text=')) {
  lines[474] = lines[474].replace(
    /href="https:\/\/wa\.me\/522292924043\?text=[^"]*"/,
    'href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados."'
  );
  fixes++;
  console.log('FIX 2: Hero WA message updated');
} else { console.log('SKIP 2: Hero WA (line 475)'); }

// Linea 1137 (index 1136): "WhatsApp directo" CTA -> add message
if (lines[1136] && lines[1136].includes('wa.me/522292924043"')) {
  lines[1136] = lines[1136].replace(
    'href="https://wa.me/522292924043"',
    'href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20me%20interesa%20agendar%20una%20llamada%20estrat%C3%A9gica%20para%20hablar%20sobre%20mis%20campa%C3%B1as%20de%20Meta%20Ads."'
  );
  fixes++;
  console.log('FIX 3: WhatsApp directo CTA message added');
} else { console.log('SKIP 3: WhatsApp directo (line 1137)'); }

// Linea 1218 (index 1217): Footer WA -> add message
if (lines[1217] && lines[1217].includes('wa.me/522292924043"')) {
  lines[1217] = lines[1217].replace(
    'href="https://wa.me/522292924043"',
    'href="https://wa.me/522292924043?text=Hola%20Carolina%2C%20vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20saber%20c%C3%B3mo%20puedes%20ayudarme%20con%20mis%20Meta%20Ads."'
  );
  fixes++;
  console.log('FIX 4: Footer WA message added');
} else { console.log('SKIP 4: Footer WA (line 1218)'); }

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
console.log('\nTotal fixes applied: ' + fixes);
