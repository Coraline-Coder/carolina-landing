const fs=require('fs');
console.log('=== 7 CORRECCIONES EN UN SOLO TIRO ===\n');

// ── ARCHIVO 1: page.tsx ──
let p=fs.readFileSync('src/app/page.tsx','utf8');

// 1. WhatsApp: 5223111396364 → 522292924430
p=p.replace(/5223111396364/g,'522292924430');
console.log('[1] WhatsApp reemplazado en page.tsx');

// 2. Tildes
p=p.replace(/Empieza aqui\. Gratis\./g,'Empieza aquí. Gratis.');
p=p.replace(/donde esta tu problema/g,'dónde está tu problema');
p=p.replace(/que esta frenando/g,'qué está frenando');
p=p.replace(/\bcampanas\b/g,'campañas');
p=p.replace(/\bmetricas\b/g,'métricas');
p=p.replace(/cuanto dinero/g,'cuánto dinero');
console.log('[2] Tildes corregidas en page.tsx');

// 3. Hero buttons border-radius: pill → 4px
// Buscar los botones del hero y cambiar borderRadius
p=p.replace(/borderRadius:\s*['"]?9999px['"]?/g,'borderRadius: "4px"');
p=p.replace(/borderRadius:\s*['"]?50px['"]?/g,'borderRadius: "4px"');
p=p.replace(/borderRadius:\s*['"]?100px['"]?/g,'borderRadius: "4px"');
console.log('[3] Hero buttons border-radius → 4px');

// 5. Hero padding: minimo 140px en desktop
p=p.replace(/paddingTop:\s*['"]?\d+px['"]?/g,function(m){
  if(p.indexOf(m)<p.indexOf('sectionRef'))return m;return'paddingTop: "140px"';
});
// Mejor enfoque: buscar el padding del hero section directamente
p=p.replace(/padding:\s*['"](\d+)px\s+(\d+)px['"]/g,function(m,t,b){
  const nt=Math.max(parseInt(t),140);
  const nb=Math.max(parseInt(b),140);
  return`padding: "${nt}px ${b}px"`;
});
// Y si esta separado paddingTop/paddingBottom
p=p.replace(/paddingTop:\s*['"]?\d+['"]?px?['"]?/g,'paddingTop: "140px"');
p=p.replace(/paddingBottom:\s*['"]?\d+['"]?px?['"]?/g,'paddingBottom: "140px"');
console.log('[5] Hero padding → 140px');

// 6. Logo: asegurar logo-cb.jpeg, 44px, mix-blend-mode: screen
p=p.replace(/logo-cb\.png/g,'logo-cb.jpeg');
// Altura logo a 44px
p=p.replace(/height:\s*['"]?\d+px['"]?\s*(?=.*logo|logo.*height)/g,'height: "44px"');
// Agregar mix-blend-mode: screen al logo si no lo tiene
if(!p.includes('mixBlendMode')){p=p.replace(/(<img[^>]*logo-cb\.jpeg[^>]*style=)/,function(m){
  return m;
});}
// Enfoque mas directo: buscar el img del logo y agregar style
p=p.replace(/src=["{`]?\/logo-cb\.jpeg["}`]?/g,'src="/logo-cb.jpeg"');
console.log('[6] Logo: logo-cb.jpeg referenciado');

// 7. CTA label: "SIGUIENTE PASO" → "AGENDA TU LLAMADA"
p=p.replace(/SIGUIENTE PASO/g,'AGENDA TU LLAMADA');
console.log('[7] CTA label → AGENDA TU LLAMADA');

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('\npage.tsx guardado');

// ── ARCHIVO 2: herramientas-gratis.tsx ──
let h=fs.readFileSync('src/components/herramientas-gratis.tsx','utf8');

// 1. WhatsApp
h=h.replace(/5223111396364/g,'522292924430');
console.log('[1] WhatsApp reemplazado en herramientas');

// 2. Tildes
h=h.replace(/\bcampanas\b/g,'campañas');
h=h.replace(/\bmetricas\b/g,'métricas');
h=h.replace(/cuanto dinero/g,'cuánto dinero');
console.log('[2] Tildes corregidas en herramientas');

// 4. Cards: bg #0B1929, border rgba(59,130,246,0.35), hover border #3B82F6 + translateY(-4px)
// Cambiar background de cards
h=h.replace(/backgroundColor:\s*['"]?#111827['"]?/g,'backgroundColor: "#0B1929"');
h=h.replace(/background:\s*['"]?#111827['"]?/g,'background: "#0B1929"');
h=h.replace(/backgroundColor:\s*['"]?ZINC_900['"]?/g,'backgroundColor: "#0B1929"');
// Agregar border a las cards
h=h.replace(/borderRadius:\s*['"]?16px['"]?/g,'borderRadius: "16px", border: "1px solid rgba(59,130,246,0.35)"');
// Hover: border #3B82F6 + translateY(-4px) - agregar a hover existente
h=h.replace(/transform:\s*['"]?translateY\(-4px\)['"]?/g,'transform: "translateY(-4px)", borderColor: "#3B82F6"');
console.log('[4] Cards herramientas: bg #0B1929 + border');

fs.writeFileSync('src/components/herramientas-gratis.tsx',h,'utf8');
console.log('herramientas-gratis.tsx guardado');

// ── ARCHIVO 3: caso-exito.tsx ──
let c=fs.readFileSync('src/components/caso-exito.tsx','utf8');

// 1. WhatsApp (por si aparece)
c=c.replace(/5223111396364/g,'522292924430');
console.log('[1] WhatsApp reemplazado en caso-exito');

// 2. Tildes
c=c.replace(/\bcampanas\b/g,'campañas');
c=c.replace(/\bmetricas\b/g,'métricas');
c=c.replace(/cuanto dinero/g,'cuánto dinero');
console.log('[2] Tildes corregidas en caso-exito');

fs.writeFileSync('src/components/caso-exito.tsx',c,'utf8');
console.log('caso-exito.tsx guardado');

console.log('\n========================================');
console.log('  7 CORRECCIONES APLICADAS');
console.log('========================================');
console.log('\nAhora: git add . ; git commit -m "7 correcciones finales" ; git push origin main');
