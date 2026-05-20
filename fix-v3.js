const fs=require('fs'),{execSync}=require('child_process');
console.log('=== FIX RESTANTES ===\n');

// 1. RESTAURAR LOGO DESDE GIT
console.log('[A] Restaurando logo...');
try{
  const log=execSync('git log --all --diff-filter=D --summary -- "public/logo-cb.jpeg"',{encoding:'utf8'}).trim();
  const m=log.match(/commit\s+([a-f0-9]+)/);
  if(m){execSync('git checkout '+m[1]+' -- public/logo-cb.jpeg',{stdio:'pipe'});
    if(fs.existsSync('public/logo-cb.jpeg'))console.log('  Logo restaurado ('+fs.statSync('public/logo-cb.jpeg').size+' bytes)');
  }
}catch(e){
  console.log('  No se restauro de git. Buscando en disco...');
  try{const r=execSync('dir /s /b C:\\Users\\ACER\\Downloads\\logo-cb.jpeg 2>nul',{encoding:'utf8'}).trim();
    if(r){const src=r.split('\n')[0].trim();fs.copyFileSync(src,'public/logo-cb.jpeg');
      if(fs.existsSync('public/logo-cb.jpeg'))console.log('  Logo copiado desde: '+src);}
  }catch(e2){console.log('  No encontrado. Necesitas agregar logo-cb.jpeg manualmente a public/');}
}

// 2. LEER PAGE.TSX
let page=fs.readFileSync('src/app/page.tsx','utf8');
const lines=page.split('\n');

console.log('\n[B] Buscando hero y botones...');
let heroStart=-1,heroEnd=-1;
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('sectionRef')||lines[i].match(/<section[^>]*id.*hero/i))heroStart=i;
  if(heroStart>-1&&heroEnd===-1&&i>heroStart&&lines[i].match(/<\/section>/))heroEnd=i;
}
if(heroStart===-1){
  for(let i=0;i<lines.length;i++){if(lines[i].includes('<section')){heroStart=i;break;}}
  for(let i=heroStart+1;i<lines.length;i++){if(lines[i].includes('</section>')){heroEnd=i;break;}}
}
console.log('  Hero section: lineas',heroStart+1,'a',heroEnd+1);

if(heroStart>-1){
  const hero=lines.slice(Math.max(0,heroStart-10),heroEnd+1);
  hero.forEach((l,i)=>{
    if(l.includes('padding')||l.includes('borderRadius')||l.includes('border-radius'))
      console.log('  L'+(heroStart-10+i+1)+': '+l.trim());
  });
}

// 3. FIX PADDING
let changed=0;
const heroArea=page.substring(page.indexOf('<section'),page.indexOf('</section>')+10);
['padding: "','paddingTop: "','paddingBottom: "'].forEach(pat=>{
  if(heroArea.includes(pat)){
    const idx=page.indexOf(pat,page.indexOf('<section'));
    if(idx>-1&&idx<page.indexOf('</section>')){
      const after=page.substring(idx,idx+50);
      const vm=after.match(/(\d+)\s*px/);
      if(vm&&parseInt(vm[1])<140){
        page=page.substring(0,idx)+after.replace(vm[1],'140')+page.substring(idx+after.indexOf(vm[1])+vm[1].length);
        changed++;
      }
    }
  }
});
if(changed===0&&heroStart>-1){
  const secLine=lines[heroStart];
  if(secLine.includes('style={{')){
    page=page.replace(secLine,secLine.replace('style={{','style={{ paddingTop: "140px", paddingBottom: "140px", '));
    changed=2;
  }else if(secLine.includes('<section')){
    page=page.replace(secLine,secLine.replace('<section','<section style={{ paddingTop: "140px", paddingBottom: "140px" }}'));
    changed=2;
  }
}
console.log('\n  Padding cambios:',changed);

// 4. FIX BORDER-RADIUS
let brc=0;
const heroStart2=page.indexOf('<section');
const heroEnd2=page.indexOf('</section>');
if(heroStart2>-1&&heroEnd2>-1){
  const heroText=page.substring(heroStart2,heroEnd2);
  const allBR=heroText.match(/borderRadius:\s*["'\x60{\s]*(\d+)\s*px/gi);
  if(allBR){allBR.forEach(m=>{
    const vm=m.match(/(\d+)/);
    if(vm&&parseInt(vm[1])>4){
      page=page.split(m).join('borderRadius: "4px"');
      brc++;
    }
  });}
  ['9999','100','50','40','30','25','20','12'].forEach(v=>{
    const p1='borderRadius: "'+v+'px"';
    while(page.includes(p1)){page=page.split(p1).join('borderRadius: "4px"');brc++;}
  });
}
console.log('  Border-radius cambios:',brc);

fs.writeFileSync('src/app/page.tsx',page,'utf8');

// VERIFICACION
console.log('\n=== VERIFICACION ===');
const c=fs.readFileSync('src/app/page.tsx','utf8');
let issues=[];
if(c.includes('5223111396364'))issues.push('Numero viejo de WhatsApp');
if(c.includes('SIGUIENTE PASO'))issues.push('CTA dice SIGUIENTE PASO');
if(!fs.existsSync('public/logo-cb.jpeg'))issues.push('logo-cb.jpeg falta');
if(!issues.length)console.log('  TODO OK!');
else issues.forEach(i=>console.log('  PROBLEMA: '+i));

console.log('\nEjecuta: git add . ; git commit -m "7 correcciones finales" ; git push origin main');
