var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');
var orig = c;

// ── PROBLEMA 1 & 3: Iframe transparent bg, border none, full width, no h-scrollbar ──
// Replace the iframe style block
c = c.replace(
  /style=\{\{\s*width: "100%",\s*border: "none",\s*display: "block",\s*minHeight: 500,\s*borderRadius: 12,\s*\}\}/,
  'style={{ width: "100%", border: "none", display: "block", minHeight: 600, borderRadius: 0, background: "transparent" }}'
);

// ── PROBLEMA 2: Rediseñar contenedor modal ──
// Replace the accordion container div (line 278-286)
c = c.replace(
  /background: "#F5F6FA",\s*border: "1px solid #E2E6F0",\s*borderRadius: 16,\s*padding: "1\.5rem",\s*maxWidth: 720,\s*margin: "0 auto",/,
  'background: "#000000", border: "1px solid rgba(59,130,246,0.20)", borderRadius: 12, padding: 0, maxWidth: 720, margin: "0 auto", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)",'
);

// ── PROBLEMA 2: Header del modal ──
// Replace the header div (line 288)
c = c.replace(
  /display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem"/,
  'display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0B2A5A", borderBottom: "1px solid rgba(59,130,246,0.20)", padding: "12px 20px"'
);

// Header title style
c = c.replace(
  /fontFamily: "var\(--font-cormorant\)",\s*fontWeight: 500,\s*fontSize: "1\.3rem",\s*color: NAVY,/,
  'fontFamily: "var(--font-dm-sans)", fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.06em", color: "#EEF0FF",'
);

// Close button style
c = c.replace(
  /background: "transparent",\s*border: "1px solid #D0D5E8",\s*borderRadius: 8,\s*padding: "0\.4rem 1rem",\s*fontFamily: "var\(--font-jost\)",\s*fontSize: "0\.75rem",\s*color: "#8A8FA8",\s*cursor: "pointer",\s*letterSpacing: "0\.06em",\s*textTransform: "uppercase" as const,/,
  'background: "transparent", border: "1px solid rgba(156,163,175,0.20)", borderRadius: 3, padding: "4px 10px", fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "#9CA3AF", cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase" as const, transition: "all 0.2s",'
);

// ── PROBLEMA 3: Iframe wrapper ──
// Add a wrapper div around ToolIframe with overflow:hidden
c = c.replace(
  /<ToolIframe/,
  '<div style={{ width: "100%", overflow: "hidden" }}>\n                <ToolIframe'
);
c = c.replace(
  /onHeight=\{\(h\) => handleHeight\(openTool, h\)\}\s*\/>/,
  'onHeight={(h) => handleHeight(openTool, h)} />\n              </div>'
);

// ── PROBLEMA 4: body background in 3 HTML templates ──
// Calculadora: body{background:#F5F6FA -> body{margin:0;padding:0;background:#000000
c = c.replace(
  /body\{background:#F5F6FA;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh\}/g,
  'body{margin:0;padding:0;background:#000000;color:#0A0F1E;font-family:\'Jost\',sans-serif;font-weight:300;min-height:100vh}'
);

// Benchmark: body{background:#F5F6FA;color:#0A0F1E...overflow-x:hidden}
c = c.replace(
  /body\{background:#F5F6FA;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh;overflow-x:hidden\}/g,
  'body{margin:0;padding:0;background:#000000;color:#0A0F1E;font-family:\'Jost\',sans-serif;font-weight:300;min-height:100vh;overflow-x:hidden}'
);

// ── Section background ──
c = c.replace(
  'background: WHITE, padding: "6rem 2rem"',
  'background: "#000000", padding: "6rem 2rem"'
);

if (c !== orig) {
  fs.writeFileSync(f, c, 'utf8');
  console.log('OK - Todos los cambios aplicados');
} else {
  console.log('SKIP - Sin cambios');
}

// Verify
var checks = [
  ['iframe bg transparent', c.includes('background: "transparent"') && c.includes('minHeight: 600')],
  ['modal bg #000000', c.includes('background: "#000000", border: "1px solid rgba(59,130,246,0.20)"')],
  ['header #0B2A5A', c.includes('background: "#0B2A5A"')],
  ['close btn #9CA3AF', c.includes('color: "#9CA3AF"')],
  ['iframe wrapper overflow hidden', c.includes('overflow: "hidden"') && c.includes('ToolIframe')],
  ['body margin:0 padding:0 bg:#000', (c.match(/body\{margin:0;padding:0;background:#000000/g) || []).length >= 2],
  ['section bg #000000', c.includes('background: "#000000", padding: "6rem 2rem"')],
];
checks.forEach(function(ch) {
  console.log(ch[1] ? 'OK' : 'FAIL' + ' - ' + ch[0]);
});
