const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// 1. Quitar import effects.css
p=p.split("import './effects.css';\n").join('');
p=p.split("import './effects.css';").join('');

// 2. Quitar las clases CSS de los elementos
p=p.split(' className="glass-card"').join('');
p=p.split(' className="reveal"').join('');
p=p.split(' className="reveal d1"').join('');
p=p.split(' className="reveal d2"').join('');
p=p.split(' className="reveal d3"').join('');
p=p.split(' className="tool-card"').join('');
p=p.split(' className="metric-cell"').join('');
p=p.split(' className="pulso-step"').join('');
p=p.split(' className="process-line"').join('');
p=p.split(' className="process-circle"').join('');

// 3. Quitar glows y elementos decorativos agregados
p=p.replace(/<div className="glow" style=\{\{[^}]*\}\}[^/]*\/>/g,'');
p=p.replace(/<div className="hero-grid" \/>/g,'');
p=p.replace(/<div className="hero-light-line" \/>/g,'');
p=p.replace(/<div className="pulso-watermark">PULSO<\/div>/g,'');

// 4. Quitar comentarios de glows
p=p.replace(/\{\/\* Hero Glow[^}]*\*\/\}/g,'');
p=p.replace(/\{\/\* Hero dot grid[^}]*\*\/\}/g,'');
p=p.replace(/\{\/\* Hero light line[^}]*\*\/\}/g,'');

// 5. Quitar scroll reveal observer useEffect
var obsStart=p.indexOf('// Scroll reveal observer');
if(obsStart>-1){
  var obsEnd=p.indexOf('}, []);',obsStart);
  if(obsEnd>-1){
    obsEnd=p.indexOf('\n',obsEnd+7);
    p=p.substring(0,obsStart)+p.substring(obsEnd);
  }
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');

// 6. Borrar effects.css
try{fs.unlinkSync('src/app/effects.css');console.log('effects.css eliminado');}catch(e){}

console.log('Todo lo de effects.css eliminado de page.tsx');
