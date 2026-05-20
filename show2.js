const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');
for(var i=330;i<Math.min(360,lines.length);i++)console.log('L'+(i+1)+': '+lines[i]);
