// patch-checklist.js
const fs = require('fs');
const { execSync } = require('child_process');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
  const GoldParticleChart = dynamicNoSSR(\n  () => import("@/components/gold-particle-chart")\n);,
  const GoldParticleChart = dynamicNoSSR(\n  () => import("@/components/gold-particle-chart")\n);\n\nconst ChecklistAuditoria = dynamicNoSSR(\n  () => import("@/components/checklist-auditoria")\n);
);
page = page.replace(
  xport default function Page() {\n  return (,
  xport default function Page() {\n  const [showChecklist, setShowChecklist] = useState(false);\n\n  const handleChecklistClick = () => {\n    setShowChecklist(true);\n    setTimeout(() => {\n      document.getElementById("checklist-section")?.scrollIntoView({ behavior: "smooth", block: "start" });\n    }, 150);\n  };\n\n  return (
);
page = page.replace(
        <RecursosSection />\n      <ContactSection />,
        <RecursosSection onChecklistClick={handleChecklistClick} />\n      {showChecklist && <ChecklistAuditoria />}\n      <ContactSection />
);
page = page.replace(
  unction RecursosSection() {,
  unction RecursosSection({ onChecklistClick }: { onChecklistClick: () => void }) {
);
const oldBtn =                 <a\n                  href="#contacto"\n                  style={{\n                    display: "inline-block",\n                    fontFamily: "var(--font-jost)",\n                    fontWeight: 500,\n                    fontSize: "0.85rem",\n                    color: WHITE,\n                    background: BLUE,\n                    padding: "0.65rem 1.5rem",\n                    borderRadius: 6,\n                    textDecoration: "none",\n                    marginTop: "1.2rem",\n                    textAlign: "center",\n                    letterSpacing: "0.04em",\n                  }}\n                >\n                  {r.btn}\n                </a>;
const newBtn = {i === 0 ? (\n                  <button\n                    onClick={onChecklistClick}\n                    style={{\n                      display: "inline-block",\n                      fontFamily: "var(--font-jost)",\n                      fontWeight: 500,\n                      fontSize: "0.85rem",\n                      color: WHITE,\n                      background: BLUE,\n                      padding: "0.65rem 1.5rem",\n                      borderRadius: 6,\n                      border: "none",\n                      marginTop: "1.2rem",\n                      textAlign: "center",\n                      letterSpacing: "0.04em",\n                      cursor: "pointer",\n                      width: "100%",\n                    }}\n                  >\n                    {r.btn}\n                  </button>\n                ) : (\n                  <a\n                    href="#contacto"\n                    style={{\n                      display: "inline-block",\n                      fontFamily: "var(--font-jost)",\n                      fontWeight: 500,\n                      fontSize: "0.85rem",\n                      color: WHITE,\n                      background: BLUE,\n                      padding: "0.65rem 1.5rem",\n                      borderRadius: 6,\n                      textDecoration: "none",\n                      marginTop: "1.2rem",\n                      textAlign: "center",\n                      letterSpacing: "0.04em",\n                    }}\n                  >\n                    {r.btn}\n                  </a>\n                )};
page = page.replace(oldBtn, newBtn);
fs.writeFileSync('src/app/page.tsx', page);
console.log('Patched!');
try {
  execSync('git add src/app/page.tsx', { stdio: 'inherit' });
  execSync('git commit -m "Integrate ChecklistAuditoria on button click"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('Deployed!');
} catch(e) { console.error('Git error:', e.message); }
