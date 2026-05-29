const fs=require('fs');
const p='src/app/layout.tsx';
let c=fs.readFileSync(p,'utf8');

// Cambio 1: Importar DM_Sans en lugar de Jost
c=c.replace('import { Cormorant_Garamond, Jost } from "next/font/google";','import { Cormorant_Garamond, DM_Sans } from "next/font/google";');

// Cambio 2: Renombrar la variable y la clase
c=c.replace('const jost = Jost({','const dmSans = DM_Sans({');
c=c.replace('variable: "--font-jost",','variable: "--font-dm-sans",');

// Cambio 3: Actualizar la clase en el html tag
c=c.replace('${jost.variable}','${dmSans.variable}');

// Cambio 4: Actualizar metadata (CJB -> Carolina Betancourt)
c=c.replace('title: "CJB | Performance Marketing & Paid Media Strategy"','title: "Carolina Betancourt | Performance Marketing & Paid Media Strategy"');

fs.writeFileSync(p,c,'utf8');
console.log('=== layout.tsx ACTUALIZADO ===');

// Verificacion
let v=fs.readFileSync(p,'utf8');
console.log('');
console.log('=== VERIFICACION ===');
console.log('DM_Sans import:',v.includes('DM_Sans'));
console.log('No Jost import:',!v.includes('Jost'));
console.log('dmSans variable:',v.includes('const dmSans = DM_Sans'));
console.log('--font-dm-sans:',v.includes('--font-dm-sans'));
console.log('No --font-jost:',!v.includes('--font-jost'));
console.log('dmSans.variable en html:',v.includes('${dmSans.variable}'));
console.log('Title Carolina:',v.includes('Carolina Betancourt |'));
console.log('No CJB title:',!v.includes('CJB |'));
