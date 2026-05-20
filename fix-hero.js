const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// Verificar imagen
var imgExt=fs.existsSync('public/meta-ads.png')?'png':'jpeg';
console.log('Imagen: meta-ads.'+imgExt);

// L344-346: Reemplazar GoldParticleChart por mockup
// L344: <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
// L345: <GoldParticleChart />
// L346: </div>

var newBlock=[
  '      {/* Mockup Meta Ads - lado derecho desktop */}',
  '      <div',
  '        style={{',
  '          display: isMob ? "none" : "block",',
  '          position: "absolute",',
  '          right: 0,',
  '          top: "50%",',
  '          transform: "translateY(-50%) rotate(-6deg)",',
  '          width: "45%",',
  '          opacity: 0.18,',
  '          borderRadius: 16,',
  '          overflow: "hidden",',
  '          pointerEvents: "none",',
  '          zIndex: 0,',
  '        }}',
  '      >',
  '        <img',
  '          src="/meta-ads.'+imgExt+'"',
  '          alt="Meta Ads Manager"',
  '          style={{ width: "100%", height: "auto", display: "block" }}',
  '        />',
  '        {/* Gradiente izquierda */}',
  '        <div style={{',
  '          position: "absolute",',
  '          inset: 0,',
  '          background: "linear-gradient(to right, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 40%)",',
  '          pointerEvents: "none",',
  '        }} />',
  '        {/* Gradiente abajo */}',
  '        <div style={{',
  '          position: "absolute",',
  '          bottom: 0,',
  '          left: 0,',
  '          right: 0,',
  '          height: "40%",',
  '          background: "linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 100%)",',
  '          pointerEvents: "none",',
  '        }} />',
  '      </div>',
];

// Buscar y reemplazar el bloque GoldParticleChart
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('GoldParticleChart')){
    // Retroceder al <div que lo contiene
    var start=i;
    for(var j=i;j>=i-3;j--){
      if(lines[j]&&lines[j].includes('<div')){start=j;break;}
    }
    // Avanzar al </div> que cierra
    var end=i;
    for(var j=i;j<=i+3;j++){
      if(lines[j]&&lines[j].includes('</div>')){end=j;break;}
    }
    console.log('Reemplazando L'+(start+1)+' a L'+(end+1));
    lines.splice(start,end-start+1,...newBlock);
    console.log('GoldParticleChart eliminado, mockup agregado!');
    break;
  }
}

fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
console.log('Listo!');
