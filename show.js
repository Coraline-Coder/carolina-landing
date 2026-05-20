const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
console.log('GoldParticleChart presente:',p.includes('GoldParticleChart'));
console.log('meta-ads presente:',p.includes('meta-ads'));
console.log('Mockup presente:',p.includes('Mockup Meta'));
console.log('\nHero area (L360-420):');
for(var i=359;i<Math.min(420,lines.length);i++)console.log('L'+(i+1)+': '+lines[i]);
