const fs = require('fs');
const fp = 'src/app/page.tsx';
let h = fs.readFileSync(fp, 'utf8');

// Fix: the onClick got inserted inside onMouseEnter creating:
// onMouseEnter={(e) = onClick={() => trackWhatsAppClick('metodo_pulso')}>
// Should be: onMouseEnter={(e) => { ... }} onClick={() => trackWhatsAppClick('metodo_pulso')}>

// Fix metodo_pulso
h = h.replace(
  /onMouseEnter=\{\(e\) = onClick=\{\(\) => trackWhatsAppClick\('metodo_pulso'\)\}\}>/,
  "onClick={() => trackWhatsAppClick('metodo_pulso')}\n              onMouseEnter={(e) => {"
);

// Also check for the same pattern with other sections
h = h.replace(
  /onMouseEnter=\{\(e\) = onClick=\{\(\) => trackWhatsAppClick\('([^']+)'\)\}\}>/g,
  "onClick={() => trackWhatsAppClick('$1')}\n              onMouseEnter={(e) => {"
);

fs.writeFileSync(fp, h, 'utf8');

// Verify
const v = fs.readFileSync(fp, 'utf8');
if (v.includes(") = onClick=")) {
  console.log('STILL BROKEN - need manual fix');
  // Show context
  const idx = v.indexOf(') = onClick=');
  console.log(v.slice(idx - 100, idx + 200));
} else {
  console.log('FIXED - no more broken patterns');
}

// Count trackWhatsAppClick occurrences
const count = (v.match(/trackWhatsAppClick/g) || []).length;
console.log('trackWhatsAppClick count:', count);
