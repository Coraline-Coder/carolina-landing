var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');

// FIX 1: Iframe style
c = c.replace(
  'width:"100%",border:"none",display:"block",minHeight:500,borderRadius:12',
  'width:"100%",border:"none",display:"block",minHeight:600,borderRadius:0,background:"transparent"'
);

// FIX 2: Modal container
c = c.replace(
  'background:"#F5F6FA",border:"1px solid rgba(46,95,138,0.2)",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"',
  'background:"#000000",border:"1px solid rgba(59,130,246,0.20)",borderRadius:12,padding:0,maxWidth:720,margin:"0 auto",overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)"'
);

// FIX 3: Header div
c = c.replace(
  'display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"',
  'display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0B2A5A",borderBottom:"1px solid rgba(59,130,246,0.20)",padding:"12px 20px"'
);

// FIX 4: Header title
c = c.replace(
  'fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.3rem",color:"#0B2A5A"',
  'fontFamily:"var(--font-dm-sans)",fontWeight:400,fontSize:"0.8rem",letterSpacing:"0.06em",color:"#EEF0FF"'
);

// FIX 5: Close button
c = c.replace(
  "border:\"1px solid #D0D5E8\",borderRadius:8,padding:\"0.4rem 1rem\",fontFamily:\"'DM Sans', sans-serif\",fontSize:\"0.75rem\",color:\"#8A8FA8\",cursor:\"pointer\",letterSpacing:\"0.06em\",textTransform:\"uppercase\" as const",
  'border:"1px solid rgba(156,163,175,0.20)",borderRadius:3,padding:"4px 10px",fontFamily:"var(--font-dm-sans)",fontSize:"0.7rem",color:"#9CA3AF",cursor:"pointer",letterSpacing:"0.12em",textTransform:"uppercase" as const,transition:"all 0.2s"'
);

// FIX 6: Clean double wrapper
var doubleWrap = '<div style={{ width: "100%", overflow: "hidden" }}>\n                <div style={{ width: "100%", overflow: "hidden" }}>';
if (c.includes(doubleWrap)) {
  c = c.replace(doubleWrap, '<div style={{ width: "100%", overflow: "hidden" }}>');
  console.log('FIX 6a: double wrapper cleaned');
}
// Remove extra closing div
var extraClose = '/>\n                </div>\n              </div>';
if (c.includes(extraClose)) {
  c = c.replace(extraClose, '/>\n              </div>');
  console.log('FIX 6b: extra closing div removed');
}

// FIX 7: body in HTML templates - add margin:0;padding:0
c = c.replace(/body \{\n    background: #000000;/g, 'body {\n    margin: 0;\n    padding: 0;\n    background: #000000;');

fs.writeFileSync(f, c, 'utf8');

// VERIFY
var v = fs.readFileSync(f, 'utf8');
console.log('iframe bg transparent: ' + v.includes('background:"transparent"'));
console.log('iframe minH600: ' + v.includes('minHeight:600'));
console.log('iframe radius0: ' + v.includes('borderRadius:0'));
console.log('modal bg #000: ' + v.includes('background:"#000000"'));
console.log('modal blue border: ' + v.includes('rgba(59,130,246,0.20)'));
console.log('header #0B2A5A: ' + v.includes('background:"#0B2A5A"'));
console.log('title #EEF0FF: ' + v.includes('color:"#EEF0FF"'));
console.log('close #9CA3AF: ' + v.includes('color:"#9CA3AF"'));
console.log('body margin:0: ' + (v.split('margin: 0;').length - 1) + ' occurrences');
console.log('body padding:0: ' + (v.split('padding: 0;').length - 1) + ' occurrences');
