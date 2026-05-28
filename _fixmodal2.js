var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var lines = fs.readFileSync(f, 'utf8').split('\n');
var fixes = 0;

// ── FIX 1: Iframe style (lines 104-110) ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('minHeight: 500') && lines[i].includes('borderRadius: 12')) {
    lines[i] = lines[i]
      .replace('minHeight: 500', 'minHeight: 600')
      .replace('borderRadius: 12', 'borderRadius: 0');
    fixes++;
    break;
  }
}
// Add background: "transparent" after border: "none" in iframe
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('border: "none"') && lines[i].includes('display: "block"')) {
    lines[i] = lines[i].replace('border: "none",', 'border: "none", background: "transparent",');
    fixes++;
    break;
  }
}

// ── FIX 2: Modal container (line ~280: background: "#F5F6FA") ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('background: "#F5F6FA"') && lines[i].includes('border: "1px solid #E2E6F0"')) {
    lines[i] = '                  background: "#000000", border: "1px solid rgba(59,130,246,0.20)", borderRadius: 12, padding: 0, maxWidth: 720, margin: "0 auto", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.06)",';
    fixes++;
    break;
  }
}

// ── FIX 3: Header div (marginBottom: "1rem" -> header dark style) ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('marginBottom: "1rem"') && lines[i].includes('justifyContent: "space-between"')) {
    lines[i] = '                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0B2A5A", borderBottom: "1px solid rgba(59,130,246,0.20)", padding: "12px 20px" }}>';
    fixes++;
    break;
  }
}

// ── FIX 4: Header title style ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('fontFamily: "var(--font-cormorant)"') && lines[i].includes('fontWeight: 500') && lines[i].includes('fontSize: "1.3rem"')) {
    lines[i] = '                      fontFamily: "var(--font-dm-sans)", fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.06em", color: "#EEF0FF",';
    fixes++;
    break;
  }
}

// ── FIX 5: Close button style ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('border: "1px solid #D0D5E8"') && lines[i].includes('borderRadius: 8') && lines[i].includes('padding: "0.4rem 1rem"')) {
    lines[i] = '                      background: "transparent", border: "1px solid rgba(156,163,175,0.20)", borderRadius: 3, padding: "4px 10px", fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "#9CA3AF", cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase" as const, transition: "all 0.2s",';
    fixes++;
    break;
  }
}

// ── FIX 6: Section background WHITE -> #000000 ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('background: WHITE') && lines[i].includes('padding: "6rem 2rem"')) {
    lines[i] = lines[i].replace('background: WHITE', 'background: "#000000"');
    fixes++;
    break;
  }
}

// ── FIX 7: Add iframe wrapper div ──
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('<ToolIframe') && lines[i].includes('key={openTool}')) {
    lines[i] = '                <div style={{ width: "100%", overflow: "hidden" }}>\n' + lines[i];
    fixes++;
    break;
  }
}
// Close wrapper after ToolIframe self-closing
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('onHeight={(h) => handleHeight(openTool, h)}') && lines[i].includes('/>')) {
    lines[i] = lines[i].replace('/>', '/>\n                </div>');
    fixes++;
    break;
  }
}

// ── FIX 8: body background in HTML templates ──
var content = lines.join('\n');
// Replace body{background:#F5F6FA...min-height:100vh} (without margin/padding)
content = content.replace(
  /body\{background:#F5F6FA;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh\}/g,
  "body{margin:0;padding:0;background:#000000;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh}"
);
// Replace body{background:#F5F6FA...overflow-x:hidden} (benchmark)
content = content.replace(
  /body\{background:#F5F6FA;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh;overflow-x:hidden\}/g,
  "body{margin:0;padding:0;background:#000000;color:#0A0F1E;font-family:'Jost',sans-serif;font-weight:300;min-height:100vh;overflow-x:hidden}"
);

fs.writeFileSync(f, content, 'utf8');
console.log('Fixes aplicados: ' + fixes);

// ── VERIFY ──
var v = fs.readFileSync(f, 'utf8');
var checks = [
  ['iframe bg transparent', v.includes('background: "transparent"')],
  ['iframe minH 600 borderRadius 0', v.includes('minHeight: 600') && v.includes('borderRadius: 0')],
  ['modal bg #000 + border blue', v.includes('background: "#000000"') && v.includes('rgba(59,130,246,0.20)')],
  ['header #0B2A5A', v.includes('background: "#0B2A5A"')],
  ['title #EEF0FF dm-sans', v.includes('color: "#EEF0FF"')],
  ['close btn #9CA3AF', v.includes('color: "#9CA3AF"')],
  ['iframe wrapper overflow hidden', v.includes('overflow: "hidden"') && v.includes('ToolIframe')],
  ['body bg #000 in templates', (v.match(/body\{margin:0;padding:0;background:#000000/g) || []).length],
  ['section bg #000000', v.includes('background: "#000000", padding: "6rem 2rem"')],
];
checks.forEach(function(ch) {
  var val = typeof ch[1] === 'boolean' ? (ch[1] ? 'OK' : 'FAIL') : ch[1] + ' found';
  console.log(val + ' - ' + ch[0]);
});
