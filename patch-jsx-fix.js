const fs = require("fs");
const path = require("path");
const BASE = "C:\\Users\\ACER\\Downloads\\carolina-landing\\src";
function fixPage() {
  const f = path.join(BASE, "app", "page.tsx");
  let c = fs.readFileSync(f, "utf8");
  c = c.replace(
    /textTransform: "uppercase" as const }}>CJB\n(\s*)<\/a>/,
    'textTransform: "uppercase" as const }}>CJB</span>\n$1</a>'
  );
  c = c.replace(
    /<p\s*\n\s*style=\{\{\s*\n\s*height: 48, width: "auto", objectFit: "contain" as const \}\} src=\{LW\} alt="CJB Logo" \/>/,
    '<img src={LW} alt="CJB Logo" style={{ height: 48, width: "auto", objectFit: "contain" }} />'
  );
  fs.writeFileSync(f, c, "utf8");
  const check = fs.readFileSync(f, "utf8");
  console.log("Navbar </span> added:", check.includes("}}>CJB</span>"));
  console.log("Footer <img> fixed:", !check.includes("src={LW} alt=\"CJB Logo\" />") || check.includes("alt=\"CJB Logo\" style={{ height: 48"));
  console.log("OK");
}
console.log("\n=== FIX JSX ===\n");
fixPage();
console.log("\nDone!\n");
