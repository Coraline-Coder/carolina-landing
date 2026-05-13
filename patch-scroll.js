const fs = require("fs");
const f = "src/components/herramientas-gratis.tsx";
let p = fs.readFileSync(f, "utf8");

// 1. Add panelRef after openTool state
p = p.replace(
  "const[openTool,setOpenTool]=useState<string|null>(null);",
  "const[openTool,setOpenTool]=useState<string|null>(null);const panelRef=useRef<HTMLDivElement>(null);useEffect(()=>{if(openTool&&panelRef.current){setTimeout(()=>panelRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),200)}},[openTool]);"
);

// 2. Add ref={panelRef} to the panel container div
p = p.replace(
  "{openTool&&(",
  "{openTool&&("
);

// 3. Find the panel wrapper div and add ref - the one that wraps the tool iframe
p = p.replace(
  '<div style={{background:"#F5F6FA",borderRadius:16,padding:"1.5rem",marginTop:"1.5rem"}}>',
  '<div ref={panelRef} style={{background:"#F5F6FA",borderRadius:16,padding:"1.5rem",marginTop:"1.5rem"}}>'
);

fs.writeFileSync(f, p, "utf8");
console.log("DONE - scrollIntoView added");
