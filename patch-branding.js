const fs = require("fs");
const path = require("path");

const BASE = "C:\\Users\\ACER\\Downloads\\carolina-landing\\src";

const colorReplacements = [
  [/#0A0F1E/g, "#0A2342"],
  [/#4A7CF7/g, "#2E5F8A"],
  [/#0F1628/g, "#0D1B2A"],
  [/rgba\(74,124,247/g, "rgba(46,95,138"],
  [/rgba\(10,15,30/g, "rgba(10,35,66"],
  [/rgba\(15,22,40/g, "rgba(13,27,42"],
  [/rgba\(74,144,217/g, "rgba(46,95,138"],
];

function applyColors(c) {
  for (const [pat, rep] of colorReplacements) c = c.replace(pat, rep);
  return c;
}

function patchPage() {
  const f = path.join(BASE, "app", "page.tsx");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = applyColors(c);
  c = c.replace(/borderRadius: 10,/g, "borderRadius: 14,");
  c = c.replace(/borderRadius: 12,/g, "borderRadius: 16,");
  c = c.replace(/borderRadius: 16,/g, "borderRadius: 20,");
  c = c.replace(
    /padding: "0\.85rem 2rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)letterSpacing: "0\.06em",\s*\n(\s*)}/,
    'padding: "0.85rem 2.2rem",\n$1borderRadius: 100,\n$2textDecoration: "none",\n$3letterSpacing: "0.06em",\n$4}'
  );
  c = c.replace(
    /border: "1px solid rgba\(46,95,138,0\.5\)",\s*\n(\s*)padding: "0\.85rem 2rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)letterSpacing: "0\.06em",\s*\n(\s*)}/,
    'border: "1px solid rgba(46,95,138,0.5)",\n$1padding: "0.85rem 2.2rem",\n$2borderRadius: 100,\n$3textDecoration: "none",\n$4letterSpacing: "0.06em",\n$5}'
  );
  c = c.replace(
    /padding: "0\.5rem 1\.4rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)letterSpacing: "0\.06em",\s*\n(\s*)textTransform: "uppercase" as const,\s*\n(\s*)}/,
    'padding: "0.5rem 1.4rem",\n$1borderRadius: 100,\n$2textDecoration: "none",\n$3letterSpacing: "0.06em",\n$4textTransform: "uppercase" as const,\n$5}'
  );
  c = c.replace(
    /padding: "0\.9rem 2\.2rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)letterSpacing: "0\.04em",\s*\n(\s*)}/,
    'padding: "0.9rem 2.4rem",\n$1borderRadius: 100,\n$2textDecoration: "none",\n$3letterSpacing: "0.04em",\n$4}'
  );
  c = c.replace(
    /border: "1px solid rgba\(46,95,138,0\.5\)",\s*\n(\s*)padding: "0\.9rem 2\.2rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)letterSpacing: "0\.04em",\s*\n(\s*)}/,
    'border: "1px solid rgba(46,95,138,0.5)",\n$1padding: "0.9rem 2.4rem",\n$2borderRadius: 100,\n$3textDecoration: "none",\n$4letterSpacing: "0.04em",\n$5}'
  );
  c = c.replace(
    /padding: "0\.5rem 1\.4rem",\s*\n(\s*)borderRadius: 6,\s*\n(\s*)textDecoration: "none",\s*\n(\s*)marginTop: "0\.5rem",\s*\n(\s*)}/,
    'padding: "0.5rem 1.4rem",\n$1borderRadius: 100,\n$2textDecoration: "none",\n$3marginTop: "0.5rem",\n$4}'
  );
  c = c.replace(
    /padding: "0\.85rem 2rem",\s*\n(\s*)borderRadius: 6,/g,
    'padding: "0.85rem 2.2rem",\n$1borderRadius: 100,'
  );
  c = c.replace(
    /fontFamily: "var\(--font-cormorant\)",\s*\n\s*fontWeight: 600,\s*\n\s*fontSize: "1\.65rem",\s*\n\s*color: WHITE,\s*\n\s*letterSpacing: "0\.04em",\s*\n\s*textDecoration: "none",\s*\n\s*}/,
    'fontFamily: "var(--font-cormorant)",\n            fontWeight: 600,\n            fontSize: "1.65rem",\n            color: WHITE,\n            letterSpacing: "0.15em",\n            textDecoration: "none",\n            textTransform: "uppercase" as const,\n          }'
  );
  c = c.replace(
    /fontFamily: "var\(--font-cormorant\)",\s*\n\s*fontWeight: 600,\s*\n\s*fontSize: "1\.4rem",\s*\n\s*color: WHITE,\s*\n\s*letterSpacing: "0\.06em",\s*\n\s*}/,
    'fontFamily: "var(--font-cormorant)",\n            fontWeight: 600,\n            fontSize: "1.4rem",\n            color: WHITE,\n            letterSpacing: "0.15em",\n            textTransform: "uppercase" as const,\n          }'
  );
  c = c.replace(
    /letterSpacing: "0\.2em",\s*\n\s*textTransform: "uppercase" as const,\s*\n\s*color: BLUE,\s*\n\s*marginBottom: "1\.5rem",\s*\n\s*}/,
    'letterSpacing: "0.25em",\n            textTransform: "uppercase" as const,\n            color: BLUE,\n            marginBottom: "1.5rem",\n            opacity: 0.85,\n          }'
  );
  c = c.replace(
    /borderBottom: scrolled \? "1px solid rgba\(46,95,138,0\.15\)" : "none",/g,
    'borderBottom: scrolled ? "1px solid rgba(46,95,138,0.1)" : "none",'
  );
  c = c.replace(
    /borderTop: "1px solid rgba\(46,95,138,0\.25\)"/g,
    'borderTop: "1px solid rgba(46,95,138,0.15)"'
  );
  c = c.replace(
    /borderTop: "1px solid rgba\(46,95,138,0\.15\)",/g,
    'borderTop: "1px solid rgba(46,95,138,0.08)",'
  );
  c = c.replace(
    /fontSize: "3\.2rem",\s*\n\s*color: "rgba\(255,255,255,0\.95\)",\s*\n\s*lineHeight: 1,/g,
    'fontSize: "3.2rem",\n                      color: "#2E5F8A",\n                      lineHeight: 1,\n                      textShadow: "0 0 30px rgba(46,95,138,0.3), 0 0 60px rgba(46,95,138,0.1)",'
  );
  c = c.replace(
    /border: "1px solid rgba\(255,255,255,0\.1\)",\s*\n(\s*)borderRadius: 20,/g,
    'border: "1px solid rgba(46,95,138,0.12)",\n$1borderRadius: 20,'
  );
  c = c.replace(
    /background: "radial-gradient\(ellipse at center, rgba\(46,95,138,0\.08\) 0%, transparent 70%\)"\)/g,
    'background: "radial-gradient(ellipse at center, rgba(46,95,138,0.12) 0%, transparent 70%)")'
  );
  c = c.replace(
    /borderLeft: "2px solid " \+ BLUE,/g,
    'borderLeft: "3px solid " + BLUE,'
  );
  c = c.replace(
    /border: "1px solid rgba\(255,255,255,0\.12\)",\s*\n(\s*)borderRadius: 100,/g,
    'border: "1px solid rgba(46,95,138,0.2)",\n$1borderRadius: 100,'
  );
  c = c.replace(
    /background: "linear-gradient\(145deg, #0d1225 0%, #0a0f1e 100%\)"\)/g,
    'background: "linear-gradient(145deg, #0D1B2A 0%, #0A2342 100%)")'
  );
  c = c.replace(/#0d1225/g, "#0D1B2A");
  c = c.replace(
    /boxShadow: "0 0 60px rgba\(46,95,138,0\.08\), 0 25px 50px rgba\(0,0,0,0\.4\)"/g,
    'boxShadow: "0 0 80px rgba(46,95,138,0.1), 0 25px 50px rgba(0,0,0,0.5)"'
  );
  c = c.replace(
    /boxShadow: "0 8px 30px rgba\(46,95,138,0\.15\)"/g,
    'boxShadow: "0 12px 40px rgba(46,95,138,0.2)"'
  );
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: app/page.tsx");
}

function patchParticles() {
  const f = path.join(BASE, "components", "gold-particle-chart.tsx");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = c.replace(
    /const BLUE\s*=\s*\{\s*r:\s*74,\s*g:\s*144,\s*b:\s*217\s*\}/,
    "const BLUE  = { r: 46,  g: 95,  b: 138 }"
  );
  c = applyColors(c);
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: gold-particle-chart.tsx");
}

function patchCasoExito() {
  const f = path.join(BASE, "components", "caso-exito.tsx");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = applyColors(c);
  c = c.replace(/borderRadius: 12,/g, "borderRadius: 16,");
  c = c.replace(
    /padding: "0\.85rem 2rem",\s*\n(\s*)borderRadius: 6,/g,
    'padding: "0.85rem 2.2rem",\n$1borderRadius: 100,'
  );
  c = c.replace(
    /boxShadow: "0 6px 24px rgba\(46,95,138,0\.35\)"/g,
    'boxShadow: "0 8px 32px rgba(46,95,138,0.25)"'
  );
  c = c.replace(
    /borderColor: "rgba\(46,95,138,0\.4\)"/g,
    'borderColor: "rgba(46,95,138,0.35)"'
  );
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: caso-exito.tsx");
}

function patchHerramientas() {
  const f = path.join(BASE, "components", "herramientas-gratis.tsx");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = applyColors(c);
  c = c.replace(/rgba\(46,95,138,0\.3\)/g, "rgba(46,95,138,0.25)");
  c = c.replace(/#EEF2FF/g, "#E8EFF8");
  c = c.replace(/rgba\(46,95,138,0\.05\)/g, "rgba(46,95,138,0.04)");
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: herramientas-gratis.tsx");
}

function patchLayout() {
  const f = path.join(BASE, "app", "layout.tsx");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = applyColors(c);
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: layout.tsx");
}

function patchGlobals() {
  const f = path.join(BASE, "app", "globals.css");
  if (!fs.existsSync(f)) { console.log("SKIP:", f); return; }
  let c = fs.readFileSync(f, "utf8");
  c = applyColors(c);
  fs.writeFileSync(f, c, "utf8");
  console.log("OK: globals.css");
}

console.log("\n=== CJB BRANDING PATCH ===");
console.log("NAVY:  #0A0F1E -> #0A2342");
console.log("BLUE:  #4A7CF7 -> #2E5F8A");
console.log("NAVY2: #0F1628 -> #0D1B2A\n");
patchPage();
patchParticles();
patchCasoExito();
patchHerramientas();
patchLayout();
patchGlobals();
console.log("\nDone! Ahora: git add . && git push\n");
