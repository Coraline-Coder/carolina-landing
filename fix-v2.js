const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
console.log('=== 7 CORRECCIONES COMPLETAS v2 ===\n');

// RESTAURAR LOGO
try{const log=execSync('git log --all --oneline -- "public/logo-cb.jpeg"',{encoding:'utf8'}).trim();
if(log){const h=log.split('\n')[0].split(' ')[0];execSync('git checkout '+h+' -- public/logo-cb.jpeg',{stdio:'pipe'});
if(fs.existsSync('public/logo-cb.jpeg'))console.log('[0] Logo restaurado ('+fs.statSync('public/logo-cb.jpeg').size+' bytes)');}}
catch(e){console.log('[0] No se pudo restaurar logo desde git');}

// ESCANEAR TODOS LOS ARCHIVOS FUENTE
function findSrc(dir){let r=[];try{for(const f of fs.readdirSync(dir)){if(['node_modules','.next','.git'].includes(f))continue;const p=path.join(dir,f);fs.statSync(p).isDirectory()?r=r.concat(findSrc(p)):/\.(tsx?|jsx?)$/.test(f)&&r.push(p);}}catch(e){}return r;}
const files=findSrc('src');
console.log('Escaneando',files.length,'archivos...\n');

// REEMPLAZOS DE TEXTO (1,2,6,7)
const repls=[
  ['5223111396364','522292924430'],
  ['Empieza aqui. Gratis.','Empieza aquí. Gratis.'],
  ['donde esta tu problema','dónde está tu problema'],
  ['que esta frenando','qué está frenando'],
  ['campanas','campañas'],
  ['metricas','métricas'],
  ['cuanto dinero','cuánto dinero'],
  ['SIGUIENTE PASO','AGENDA TU LLAMADA'],
  ['logo-cb.png','logo-cb.jpeg'],
];
for(const file of files){let c=fs.readFileSync(file,'utf8'),o=c,ch=[];
for(const[from,to]of repls){if(c.includes(from)){const n=c.split(from).length-1;c=c.split(from).join(to);ch.push(from+' -> '+to+' ('+n+'x)');}}
if(c!==o){fs.writeFileSync(file,c,'utf8');console.log('['+file+']');ch.forEach(x=>console.log('  + '+x));}}

// CORRECCION 3: BORDER-RADIUS HERO → 4px
let page=fs.readFileSync('src/app/page.tsx','utf8');
let br=0;
['9999px','100px','50px','40px','30px','25px'].forEach(v=>{
  [+'"','+""','+" ','+`'].forEach(q=>{});
  const patterns=['borderRadius: "'+v+'"',"borderRadius: '"+v+'"',];
  patterns.forEach(p=>{while(page.includes(p)){page=page.split(p).join('borderRadius: "4px"');br++;}});
});
page=page.replace(/borderRadius:\s*["'`]?(9999|100|50)px["'`]?/g,()=>{br++;return'borderRadius: "4px"';});
if(br)console.log('\n[3] '+br+' border-radius -> 4px');

// CORRECCION 5: HERO PADDING → 140px
let pc=0;
// Encontrar la seccion hero (busca sectionRef o el primer section grande)
const heroIdx=page.indexOf('sectionRef');
if(heroIdx>-1){
  const area=page.substring(Math.max(0,heroIdx-500),heroIdx+2000);
  // padding: "Npx Mpx"
  const pm=area.match(/padding:\s*"(\d{1,3})px\s+(\d{1,3}px?)"/);
  if(pm&&parseInt(pm[1])<140){page=page.split(pm[0]).join('padding: "140px '+pm[2]+'"');pc++;}
  // paddingTop
  const ptm=area.match(/paddingTop:\s*"?(\d{1,3})px"?/);
  if(ptm&&parseInt(ptm[1])<140){page=page.split(ptm[0]).join('paddingTop: "140px"');pc++;}
  // paddingBottom
  const pbm=area.match(/paddingBottom:\s*"?(\d{1,3})px"?/);
  if(pbm&&parseInt(pbm[1])<140){page=page.split(pbm[0]).join('paddingBottom: "140px"');pc++;}
}
if(pc)console.log('[5] Hero padding -> 140px ('+pc+' cambio(s))');
else console.log('[5] Hero padding: no se encontro padding para ajustar en hero');

// CORRECCION 6: LOGO 44px + mix-blend-mode
const lm=page.match(/<img[^>]*\/logo-cb\.jpeg[^>]*>/)||page.match(/<Image[^>]*\/logo-cb\.jpeg[^>]*\/?>/);
if(lm){let t=lm[0],nt=t;
if(!nt.includes('44')){nt=nt.replace(/height[=:]\s*[{"]?\d+px?["}]/,'height={44}');if(!nt.includes('44'))nt=nt.replace('src=','height={44} src=');}
if(!nt.includes('mixBlendMode')){if(nt.includes('style={{'))nt=nt.split('style={{').join('style={{ mixBlendMode: "screen",');else if(nt.includes('style={'))nt=nt.split('style={').join('style={{ mixBlendMode: "screen",');else nt=nt.replace(/\s*\/>/,' style={{ mixBlendMode: "screen" }} />');}
if(nt!==t){page=page.split(t).join(nt);console.log('[6] Logo: height 44px + mixBlendMode: screen');}}

fs.writeFileSync('src/app/page.tsx',page,'utf8');

// CORRECCION 4: CARDS HERRAMIENTAS
let h=fs.readFileSync('src/components/herramientas-gratis.tsx','utf8'),ho=h;
h=h.split('#111827').join('#0B1929');
h=h.split('borderRadius: "16px"').join('borderRadius: "16px", border: "1px solid rgba(59,130,246,0.35)"');
h=h.split("borderRadius: '16px'").join("borderRadius: '16px', border: '1px solid rgba(59,130,246,0.35)'");
h=h.split('transform: "translateY(-4px)"').join('transform: "translateY(-4px)", borderColor: "#3B82F6"');
h=h.split("transform: 'translateY(-4px)'").join("transform: 'translateY(-4px)', borderColor: '#3B82F6'");
if(h!==ho){fs.writeFileSync('src/components/herramientas-gratis.tsx',h,'utf8');console.log('[4] Cards: bg #0B1929 + border + hover');}

// VERIFICACION
console.log('\n=== VERIFICACION ===');
let issues=[];
for(const f of files){const c=fs.readFileSync(f,'utf8');
if(c.includes('5223111396364'))issues.push('Numero viejo en '+f);
['Empieza aqui','donde esta tu','que esta frenando','campanas','metricas','cuanto dinero'].forEach(w=>{if(c.includes(w))issues.push('"'+w+'" en '+f);});
if(c.includes('SIGUIENTE PASO'))issues.push('CTA aun dice SIGUIENTE PASO');}
if(!fs.existsSync('public/logo-cb.jpeg'))issues.push('logo-cb.jpeg no existe');
if(!issues.length)console.log('  TODO OK - todas las correcciones verificadas!');
else{console.log('  PROBLEMAS:');issues.forEach(i=>console.log('  - '+i));}
console.log('\ngit add . ; git commit -m "7 correcciones finales" ; git push origin main');
