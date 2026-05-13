const fs = require("fs");
const f = "src/app/page.tsx";
let p = fs.readFileSync(f, "utf8");

// 1. Quitar import de CalculadoraROAS
p = p.replace('import CalculadoraROAS from "@/components/CalculadoraROAS";\n', "");

// 2. Quitar link "Recursos" del navbar
p = p.replace('    { label: "Recursos", href: "#recursos" },\n', "");

// 3. Quitar toda la función RecursosSection (desde el comentario hasta la llave de cierre)
p = p.replace(/\/\* ─── RECURSOS — white bg, NAVY text ─── \*\/\nfunction RecursosSection\(\) \{[\s\S]*?\n\}\n/, "");

// 4. Quitar <RecursosSection /> del render
p = p.replace("      <RecursosSection />\n", "");

fs.writeFileSync(f, p, "utf8");
console.log("DONE — RecursosSection eliminada");
