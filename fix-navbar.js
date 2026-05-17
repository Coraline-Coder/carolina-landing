const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");

// 1. Add isMobile state after mobileOpen state
c = c.replace(
  'const [mobileOpen, setMobileOpen] = useState(false);',
  'const [mobileOpen, setMobileOpen] = useState(false);\n  const [isMobile, setIsMobile] = useState(false);\n  useEffect(() => {\n    const check = () => setIsMobile(window.innerWidth < 768);\n    check();\n    window.addEventListener("resize", check, { passive: true });\n    return () => window.removeEventListener("resize", check);\n  }, []);'
);

// 2. Replace desktop links div - remove Tailwind class, use isMobile
c = c.replace(
  'className="hidden md:flex"',
  'className=""'
);
// Add style to hide on mobile
c = c.replace(
  '<div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="">',
  '<div style={{ display: isMobile ? "none" : "flex", gap: "2rem", alignItems: "center" }}>'
);

// 3. Replace mobile hamburger button - remove Tailwind class, use isMobile
c = c.replace(
  /<button\s+onClick=\{\(\) => setMobileOpen\(!mobileOpen\)\}\s+className="md:hidden"\s+style=\{\{ background: "none", border: "none", cursor: "pointer" \}\}/,
  '<button\n          onClick={() => setMobileOpen(!mobileOpen)}\n          style={{ display: isMobile ? "block" : "none", background: "none", border: "none", cursor: "pointer" }}\n        >'
);

// 4. Replace mobile menu AnimatePresence - remove Tailwind class
c = c.replace(
  'className="md:hidden"\n          >\n            {links.map((l) => (',
  '>\n            {links.map((l) => ('
);

// 5. Add isMobile check before mobile menu AnimatePresence
c = c.replace(
  '{/* Mobile menu */}\n      <AnimatePresence>\n        {mobileOpen && (',
  '{/* Mobile menu */}\n      <AnimatePresence>\n        {isMobile && mobileOpen && ('
);

fs.writeFileSync("src/app/page.tsx", c, "utf8");

// Verify
let v = fs.readFileSync("src/app/page.tsx", "utf8");
if (v.includes("isMobile") && !v.includes('className="hidden md:flex"') && !v.includes('className="md:hidden"')) {
  console.log("SUCCESS! Navbar ahora es responsive con deteccion de movil.");
} else {
  console.log("WARNING: Verificar cambios - isMobile=" + v.includes("isMobile") + " hidden=" + v.includes('className="hidden md:flex"'));
}
