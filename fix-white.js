const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");

// 1. Remove the entire const LW line (white base64 logo)
c = c.replace(/const LW\s*=\s*"[^"]*";?\n?/g, "");

// 2. Replace ALL src={LW} with src="/logo-cb.jpeg"
c = c.replace(/src=\{LW\}/g, 'src="/logo-cb.jpeg"');

fs.writeFileSync("src/app/page.tsx", c, "utf8");

// Verify
let v = fs.readFileSync("src/app/page.tsx", "utf8");
let count = (v.match(/src=\{LW\}/g) || []).length;
let lw = v.includes("const LW");
let good = (v.match(/logo-cb\.jpeg/g) || []).length;

if (count > 0 || lw) {
  console.log("PROBLEM: Still found " + count + " src={LW} and const LW=" + lw);
} else {
  console.log("SUCCESS! Removed white logo. Found /logo-cb.jpeg " + good + " times.");
}
