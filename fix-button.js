const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");

// Fix: remove duplicate > on button
c = c.replace(
  /style=\{\{ display: isMobile \? "block" : "none", background: "none", border: "none", cursor: "pointer" \}\}\s*\n\s*\>\s*\n\s*\>/,
  'style={{ display: isMobile ? "block" : "none", background: "none", border: "none", cursor: "pointer" }}\n        >'
);

fs.writeFileSync("src/app/page.tsx", c, "utf8");

// Verify no double >
let v = fs.readFileSync("src/app/page.tsx", "utf8");
let lines = v.split("\n");
let bad = false;
for (let i = 0; i < lines.length - 1; i++) {
  if (lines[i].trim() === ">" && lines[i+1].trim() === ">") {
    console.log("STILL HAS DOUBLE > at line " + (i+1));
    bad = true;
  }
}
if (!bad) {
  console.log("SUCCESS! Duplicate > removed.");
}
