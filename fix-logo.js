const fs = require("fs");
let c = fs.readFileSync("src/app/page.tsx", "utf8");
c = c.replace(/{\/\* Logo CJB \*\/}[\s\S]*?CJB\s*<\/a>/, `{/* Logo CB */}
        <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <img src="/logo-cb.jpeg" alt="CB Logo" style={{height:40,width:"auto"}}/>
        </a>`);
c = c.replace("CJB by Carolina Betancourt", "Carolina Betancourt");
fs.writeFileSync("src/app/page.tsx", c, "utf8");
console.log("DONE");
