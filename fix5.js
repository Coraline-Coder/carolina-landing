const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// 1. ACENTOS
p=p.split('La mayoria de').join('La mayoría de');
p=p.split('que esta fallando').join('qué está fallando');
p=p.split('que esta frenando').join('qué está frenando');
p=p.split('todavia no logran').join('todavía no logran');
p=p.split('Ahi es donde').join('Ahí es donde');
p=p.split('Metodo P.U.L.S.O').join('Método P.U.L.S.O');
p=p.split('Optimizacion basada').join('Optimización basada');
console.log('[1] Acentos corregidos');

// 2+3. HEADLINE: 52px desktop, line-height 1.0, padding reducido
p=p.split('fontSize: isMob ? 38 : 62').join('fontSize: isMob ? 34 : 52');
p=p.split('lineHeight: 1.05,').join('lineHeight: 1.0,');
// Reducir padding del hero
p=p.split('paddingTop: "140px",').join('paddingTop: "100px",');
p=p.split('paddingBottom: "140px",').join('paddingBottom: "80px",');
// Reducir padding interno del motion.div
p=p.split('padding: isMob ? "8rem 1.5rem 4rem" : "8rem 2rem 4rem"').join('padding: isMob ? "6rem 1.5rem 2rem" : "6rem 2rem 2rem"');
// Reducir gaps
p=p.split('marginBottom: 16,').join('marginBottom: 12,');
p=p.split('marginBottom: 24,').join('marginBottom: 18,');
p=p.split('marginBottom: 36,').join('marginBottom: 28,');
console.log('[2+3] Hero compacto: headline 52px, padding reducido');

// 4. LOGO NAVBAR: reemplazar imagen por texto "Carolina Betancourt"
p=p.split('<img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 70, width: "auto", objectFit: "contain", borderRadius: "8px" }} />').join('<span style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "1.05rem", color: "#FFFFFF", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Carolina Betancourt</span>');
console.log('[4] Navbar: texto "Carolina Betancourt" en Jost');

// 5. ELIMINAR WhatsApp FAB
// Buscar la funcion WhatsAppFAB y eliminarla
var lines=p.split('\n');
var waStart=-1,waEnd=-1,braceCount=0;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('function WhatsAppFAB')||lines[i].includes('function WhatsAppFab')){
    waStart=i;
  }
  if(waStart>-1&&waEnd===-1){
    for(var c=0;c<lines[i].length;c++){
      if(lines[i][c]==='{')braceCount++;
      if(lines[i][c]==='}')braceCount--;
    }
    if(braceCount===0&&i>waStart+2){waEnd=i;break;}
  }
}
if(waStart>-1&&waEnd>-1){
  console.log('[5] WhatsAppFAB eliminada: L'+(waStart+1)+' a L'+(waEnd+1));
  lines.splice(waStart,waEnd-waStart+1);
}
// Tambien eliminar <WhatsAppFAB /> del render
p=lines.join('\n');
p=p.split('<WhatsAppFAB />').join('');
p=p.split('<WhatsAppFab />').join('');
console.log('[5] WhatsApp FAB eliminado');

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('\n5 ajustes aplicados!');
