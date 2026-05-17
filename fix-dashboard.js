const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");

// 1. Remove the entire DashboardPreview function (from /* --- DASHBOARD to the closing })
c = c.replace(/\/\* --- DASHBOARD PREVIEW[\s\S]*?^}\n/m, "");

// 2. Remove the <DashboardPreview /> usage
c = c.replace(/\s*<DashboardPreview\s*\/>/g, "");

fs.writeFileSync("src/app/page.tsx", c, "utf8");

// Verify
let v = fs.readFileSync("src/app/page.tsx", "utf8");
if (v.includes("DashboardPreview")) {
  console.log("WARNING: DashboardPreview still found!");
} else {
  console.log("SUCCESS! Dashboard falso eliminado completamente.");
}
