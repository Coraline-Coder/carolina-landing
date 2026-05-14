const fs=require('fs');

let p=fs.readFileSync('./src/app/page.tsx','utf8');

p=p.replace('const LGRAY = "#F5F6FA";','const LGRAY = "#F5F6FA";\nconst NAVY2 = "#0F1628";');

p=p.replace('<section style={{ background: WHITE, padding: "6rem 2rem" }}>','<section style={{ background: NAVY2, padding: "6rem 2rem" }}>');

p=p.replace('color: NAVY,\n              lineHeight: 1.15,\n              marginBottom: "2.5rem",','color: WHITE,\n              lineHeight: 1.15,\n              marginBottom: "2.5rem",');

p=p.replace('borderLeft: "3px solid " + BLUE,\n                  background: LGRAY,','borderLeft: "2px solid " + BLUE,\n                  background: NAVY2,');

p=p.replace('fontSize: "1.35rem",\n                    color: NAVY,','fontSize: "1.35rem",\n                    color: WHITE,');

p=p.replace('fontSize: "0.95rem",\n                    color: "#4A4A4A",','fontSize: "0.95rem",\n                    color: "rgba(255,255,255,0.7)",');

p=p.replace('<section id="sistema-filtro" style={{ background: BLUE, padding: "6rem 2rem" }}>\n      <div style={{ maxWidth: 1000, margin: "0 auto" }}>','<section id="sistema-filtro" style={{ background: NAVY, padding: "6rem 2rem", position: "relative" }}>\n      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "50%", background: "radial-gradient(ellipse at center, rgba(74,124,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />\n      <div style={{ maxWidth: 1000, margin: "0 auto" }}>');

p=p.replace('<section id="capacidades" style={{ background: LGRAY, padding: "6rem 2rem" }}>','<section id="capacidades" style={{ background: NAVY2, padding: "6rem 2rem" }}>');

p=p.replace('color: NAVY,\n              lineHeight: 1.15,\n              marginBottom: "3rem",','color: WHITE,\n              lineHeight: 1.15,\n              marginBottom: "3rem",');

p=p.replace('background: WHITE,\n                  border: "1px solid #E8E8E8",','background: NAVY2,\n                  border: "1px solid rgba(74,124,247,0.2)",');

p=p.replace('fontSize: "1.25rem",\n                    color: NAVY,','fontSize: "1.25rem",\n                    color: WHITE,');

p=p.replace('fontSize: "0.9rem",\n                    color: "#4A4A4A",','fontSize: "0.9rem",\n                    color: "rgba(255,255,255,0.7)",');

p=p.replace('e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";','e.currentTarget.style.boxShadow = "0 8px 30px rgba(74,124,247,0.15)";');

p=p.replace('<section id="contacto" style={{ background: LGRAY, padding: "6rem 2rem" }}>','<section id="contacto" style={{ background: NAVY2, padding: "6rem 2rem" }}>');

p=p.replace('color: NAVY,\n              lineHeight: 1.15,\n              marginBottom: "1.5rem",','color: WHITE,\n              lineHeight: 1.15,\n              marginBottom: "1.5rem",');

p=p.replace('fontSize: "1.05rem",\n              color: "#4A4A4A",','fontSize: "1.05rem",\n              color: "rgba(255,255,255,0.7)",');

p=p.replace('color: NAVY,\n                border: "1px solid #E8E8E8",','color: WHITE,\n                border: "1px solid rgba(255,255,255,0.3)",');

p=p.replace('fontSize: "0.85rem",\n              color: "#7A7A7A",','fontSize: "0.75rem",\n              color: "rgba(255,255,255,0.35)",');

fs.writeFileSync('./src/app/page.tsx',p);
console.log('page.tsx OK');

let h=fs.readFileSync('./src/components/herramientas-gratis.tsx','utf8');

h=h.replace('const NAVY="#0A0F1E";const BLUE="#4A7CF7";const WHITE="#FFFFFF";','const NAVY="#0A0F1E";const BLUE="#4A7CF7";const WHITE="#FFFFFF";const NAVY2="#0F1628";');

h=h.replace('<section style={{background:WHITE,padding:"6rem 2rem"}}>','<section style={{background:NAVY2,padding:"6rem 2rem"}}>');

h=h.replace('color:NAVY,lineHeight:1.15,marginBottom:"0.5rem"}}>Empieza aqui. Gratis.</h2>','color:WHITE,lineHeight:1.15,marginBottom:"0.5rem"}}>Empieza aqui. Gratis.</h2>');

h=h.replace('color:"#4A4A4A",lineHeight:1.7,maxWidth:600,marginBottom:"3rem"}}>Tres herramientas','color:"rgba(255,255,255,0.7)",lineHeight:1.7,maxWidth:600,marginBottom:"3rem"}}>Tres herramientas');

h=h.replace('color:isOpen?NAVY:WHITE,marginBottom:"0.5rem",lineHeight:1.2}}>{t.title}</h3>','color:isOpen?WHITE:WHITE,marginBottom:"0.5rem",lineHeight:1.2}}>{t.title}</h3>');

h=h.replace('color:isOpen?"#4A4A4A":"rgba(255,255,255,0.6)"','color:isOpen?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.6)"');

h=h.replace('border:"1px solid #E2E6F0",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"}}>','border:"1px solid rgba(74,124,247,0.2)",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"}}>');

h=h.replace('initial={{opacity:0,y:32}} animate={vis?{opacity:1,y:0}:{}} transition={{duration:0.7,ease:"easeOut"}}','initial={{opacity:0,y:20}} animate={vis?{opacity:1,y:0}:{}} transition={{duration:0.5,ease:"easeOut"}}');

fs.writeFileSync('./src/components/herramientas-gratis.tsx',h);
console.log('herramientas-gratis.tsx OK');

let c=fs.readFileSync('./src/components/caso-exito.tsx','utf8');

c=c.replace('initial={{ opacity: 0, y: 32 }}','initial={{ opacity: 0, y: 20 }}');
c=c.replace('transition={{ duration: 0.7, ease: "easeOut" }}','transition={{ duration: 0.5, ease: "easeOut" }}');

fs.writeFileSync('./src/components/caso-exito.tsx',c);
console.log('caso-exito.tsx OK');

console.log('TODOS LOS PARCHES APLICADOS');
