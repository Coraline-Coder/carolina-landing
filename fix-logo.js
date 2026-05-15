const fs = require("fs");
const p = "src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");
c = c.replace(/{\/\* Logo CJB \*\/}[\s\S]*?CJB\s*<\/a>/, `{/* Logo CB */}
        <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <img src="/logo-cb.jpeg" alt="CB Logo" style={{height:40,width:"auto"}}/>
        </a>`);
c = c.replace("CJB by Carolina Betancourt", "Carolina Betancourt");
fs.writeFileSync(p, c, "utf8");
console.log("DONE - page.tsx fixed");
