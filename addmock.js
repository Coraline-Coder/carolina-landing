const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');
let lines=p.split('\n');

// 1. Eliminar GoldParticleChart del hero
var gpStart=-1,gpEnd=-1;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('GoldParticleChart')){
    for(var j=i;j>=i-3;j--){
      if(lines[j]&&lines[j].includes('<div')){gpStart=j;break;}
    }
    for(var j=i;j<=i+3;j++){
      if(lines[j]&&lines[j].includes('</div>')){gpEnd=j;break;}
    }
    if(gpStart>-1&&gpEnd>-1){
      console.log('GoldParticleChart eliminado: L'+(gpStart+1)+' a L'+(gpEnd+1));
      lines.splice(gpStart,gpEnd-gpStart+1);
    }
    break;
  }
}

// 2. Buscar el > de cierre del section tag del hero
var sectionClose=-1;
for(var i=0;i<lines.length;i++){
  if(lines[i].includes('overflow: "hidden"')&&lines[i].includes('>')){
    sectionClose=i;
    break;
  }
}

// Verificar nombre de imagen
var imgExt=fs.existsSync('public/meta-ads.png')?'png':'jpeg';
console.log('Imagen: meta-ads.'+imgExt);

if(sectionClose>-1){
  var mockup=[
    '',
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
  for(var i=mockup.length-1;i>=0;i--){
    lines.splice(sectionClose+1,0,mockup[i]);
  }
  console.log('Mockup Meta Ads agregado al hero');
}

fs.writeFileSync('src/app/page.tsx',lines.join('\n'),'utf8');
console.log('Listo!');
