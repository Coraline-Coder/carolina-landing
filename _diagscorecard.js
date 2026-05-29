const fs=require('fs');
const p='src/components/herramientas-gratis.tsx';
let c=fs.readFileSync(p,'utf8');
const s=c.indexOf('const scorecardHTML');
const e=c.indexOf('const benchmarkHTML');
const sc=c.substring(s,e);
console.log('=== ESTADO ACTUAL scorecardHTML ===');
console.log('Font link correcto (Cormorant+DM+Sans):',sc.includes('Cormorant+Garamond:wght@300;400;500&family=DM+Sans'));
console.log('background:#000000:',sc.includes('background:#000000'));
console.log('#3B82F6:',sc.includes('#3B82F6'));
console.log('#111827 card:',sc.includes('#111827'));
console.log('Cormorant Garamond h1:',sc.includes("font-family:'Cormorant Garamond',serif"));
console.log('font-weight:300 body:',sc.includes("font-weight:300;min-height"));
console.log('522292924043 WA:',sc.includes('522292924043'));
console.log('522311396364 viejo:',sc.includes('522311396364'));
console.log('Carolina Betancourt footer:',sc.includes('Carolina Betancourt</div>'));
console.log('CJB by:',sc.includes('CJB by'));
console.log('CJB badge:',sc.includes('CJB'));
console.log('title CJB:',sc.includes('· CJB'));
console.log('');
const pubPath='public/scorecard-meta-ads.html';
if(fs.existsSync(pubPath)){
  const pub=fs.readFileSync(pubPath,'utf8');
  console.log('=== ESTADO public/scorecard-meta-ads.html ===');
  console.log('background:#000000:',pub.includes('background: #000000')||pub.includes('background:#000000'));
  console.log('DM Sans:',pub.includes('DM Sans'));
  console.log('Cormorant Garamond:',pub.includes('Cormorant Garamond'));
  console.log('522292924043:',pub.includes('522292924043'));
  console.log('522311396364:',pub.includes('522311396364'));
  console.log('CJB badge:',pub.includes('CJB'));
  console.log('CJB by:',pub.includes('CJB by'));
  console.log('Carolina Betancourt footer:',pub.includes('Carolina Betancourt</div>'));
  console.log('title CJB:',pub.includes('· CJB'));
}else{
  console.log('public/scorecard-meta-ads.html: NO EXISTE');
}
