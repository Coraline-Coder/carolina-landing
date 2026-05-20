const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Reemplazar texto por logo
p=p.split('<span style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "1.05rem", color: "#FFFFFF", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Carolina Betancourt</span>').join('<img src="/logo-cb.png" alt="Carolina Betancourt" style={{ height: 44, width: "auto", objectFit: "contain" }} />');

fs.writeFileSync('src/app/page.tsx',p,'utf8');

if(p.includes('logo-cb.png')&&p.includes('height: 44'))console.log('Logo restaurado en navbar: 44px');
else console.log('AVISO: no se encontro el texto para reemplazar');
