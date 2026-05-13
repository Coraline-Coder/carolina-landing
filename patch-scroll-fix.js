const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src', 'components', 'herramientas-gratis.tsx');
let p = fs.readFileSync(f, 'utf8');

// 1) FIX: Attach panelRef to the motion.div (it was declared but NEVER attached — the root cause!)
p = p.replace(
  '<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.4,ease:"easeInOut"}} style={{overflow:"hidden",marginTop:"2rem"}}>',
  '<motion.div ref={panelRef} initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.4,ease:"easeInOut"}} style={{overflow:"hidden",marginTop:"2rem"}}>'
);

// 2) FIX: Increase scroll timeout (200ms is too short for 400ms animation) and use block:'center' for better visibility
p = p.replace(
  "setTimeout(()=>panelRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),200)",
  "setTimeout(()=>panelRef.current?.scrollIntoView({behavior:'smooth',block:'center'}),550)"
);

// 3) FIX: Make the tool cards grid responsive — stack on mobile
p = p.replace(
  'gridTemplateColumns:"repeat(3,1fr)"',
  'gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))"'
);

fs.writeFileSync(f, p, 'utf8');
console.log('OK — scroll fix applied');
