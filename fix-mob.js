const fs=require('fs');
let p=fs.readFileSync('src/app/page.tsx','utf8');

// Reemplazar isMob en el mockup por CSS media query
p=p.replace(
  'display: isMob ? "none" : "block",',
  'display: "block",'
);

// Agregar style tag para ocultar en mobile
if(!p.includes('hero-mockup-mobile-hide')){
  p=p.replace(
    '{/* Mockup Meta Ads',
    '<style>{`@media(max-width:767px){.hero-mockup{display:none!important}}`}</style>\n      {/* Mockup Meta Ads'
  );
  // Agregar className al div del mockup
  p=p.replace(
    'display: "block",\n          position: "absolute",\n          right: 0,\n          top: "50%",',
    'display: "block",\n          position: "absolute",\n          right: 0,\n          top: "50%",\n          className: "hero-mockup",'
  );
}

fs.writeFileSync('src/app/page.tsx',p,'utf8');
console.log('isMob reemplazado por CSS media query en mockup');
