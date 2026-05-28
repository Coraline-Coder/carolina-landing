var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');

// ── FIX 1: Iframe style ──
c = c.replace(
  'width:"100%",border:"none",display:"block",minHeight:500,borderRadius:12',
  'width:"100%",border:"none",display:"block",minHeight:600,borderRadius:0,background:"transparent"'
);

// ── FIX 2: Modal container ──
c = c.replace(
  'background:"#F5F6FA",border:"1px solid rgba(46,95,138,0.2)",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"',
  'background:"#000000",border:"1px solid rgba(59,130,246,0.20)",borderRadius:12,padding:0,maxWidth:720,margin:"0 auto",overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)"'
);

// ── FIX 3: Header div ──
c = c.replace(
  'display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"',
  'display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0B2A5A",borderBottom:"1px solid rgba(59,130,246,0.20)",padding:"12px 20px"'
);

// ── FIX 4: Header title ──
c = c.replace(
  'fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.3rem",color:"#0B2A5A"',
  'fontFamily:"var(--font-dm-sans)",fontWeight:400,fontSize:"0.8rem",letterSpacing:"0.06em",color:"#EEF0FF"'
);

// ── FIX 5: Close button ──
c = c.replace(
  'background:"transparent",border:"1px solid #D0D5E8",borderRadius:8,padding:"0.4rem 1rem",fontFamily:"\'DM Sans\', sans-serif",fontSize:"0.75rem",color:"#8A8FA8",cursor:"pointer",letterSpacing:"0.06em",textTransform:"uppercase" as const',
  'background:"transparent",border:"1px solid rgba(156,163,175,0.20)",borderRadius:3,padding:"4px 10px",fontFamily:"var(--font-dm-sans)",fontSize:"0.7rem",color:"#9CA3AF",cursor:"pointer",letterSpacing:"0.12em",textTransform:"uppercase" as const,transition:"all 0.2s"'
);

// ── FIX 6: Clean up double wrapper - keep only one ──
c = c.replace(
  '<div style={{ width: "100%", overflow: "hidden" }}>\n                <div style={{ width: "100%", overflow: "hidden" }}>',
  '<div style={{ width: "100%", overflow: "hidden" }}>'
);
// Fix closing: remove extra </div>
c = c.replace(
  '/>\n                </div>\n              </div>',
  '/>\n              </div>'
);

// ── FIX 7: body in HTML templates - add margin:0;padding:0 if missing ──
c = c.replace(/body \{\n    background: #000000;/g, 'body {\n    margin: 0;\n    padding: 0;\n    background: #000000;');

fs.writeFileSync(f, c, 'utf8');

// ── VERIFY ──
var v = fs.readFileSync(f, 'utf8');
var checks = [
  ['iframe: bg transparent + minH600 + radius0', v.includes('background:"transparent"') && v.includes('minHeight:600') && v.includes('borderRadius:0')],
  ['modal: bg #000 + blue border', v.includes('background:"#000000"') && v.includes('rgba(59,130,246,0.20)')],
  ['header: #0B2A5A', v.includes('background:"#0B2A5A"')],
  ['title: #EEF0FF dm-sans', v.includes('color:"#EEF0FF"')],
  ['close: #9CA3AF', v.includes('color:"#9CA3AF"')],
  ['no double wrapper', !v.includes('"hidden" }}>\n                <div style={{ width: "100%", overflow: "hidden"')]],
  ['body margin:0 padding:0', (v.match(/margin: 0;\n    padding: 0;\n    background: #000000/g) || []).length >= 2],
];
var allOk = true;
checks.forEach(function(ch) {
  var ok = ch[1];
  if (!ok) allOk = false;
  console.log(ok ? 'OK' : 'FAIL' + ' - ' + ch[0]);
});
console.log('\n' + (allOk ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'));
