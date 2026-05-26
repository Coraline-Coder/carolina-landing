var fs = require('fs');

// 1) Check herramientas-gratis.tsx large fonts
var c1 = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var lines1 = c1.split('\n');
console.log('=== herramientas-gratis.tsx ===');
console.log('Total lineas: ' + lines1.length);
console.log('\n--- Font-size 72px (linea 871) ---');
console.log('868: ' + lines1[867].trim().substring(0, 130));
console.log('869: ' + lines1[868].trim().substring(0, 130));
console.log('870: ' + lines1[869].trim().substring(0, 130));
console.log('871: ' + lines1[870].trim().substring(0, 130));
console.log('872: ' + lines1[871].trim().substring(0, 130));
console.log('873: ' + lines1[872].trim().substring(0, 130));
console.log('\n--- Font-size 48px (linea 1693) ---');
console.log('1690: ' + lines1[1689].trim().substring(0, 130));
console.log('1691: ' + lines1[1690].trim().substring(0, 130));
console.log('1692: ' + lines1[1691].trim().substring(0, 130));
console.log('1693: ' + lines1[1692].trim().substring(0, 130));
console.log('1694: ' + lines1[1693].trim().substring(0, 130));
console.log('1695: ' + lines1[1694].trim().substring(0, 130));

// Check if it has isMob/innerWidth logic
var hasMob = c1.includes('isMob') || c1.includes('innerWidth') || c1.includes('768');
console.log('\nTiene logica responsive (isMob/innerWidth/768)? ' + hasMob);
var mediaCount = (c1.match(/@media/g) || []).length;
console.log('Cantidad de @media queries: ' + mediaCount);

// 2) Check page.tsx responsive summary
var c2 = fs.readFileSync('src/app/page.tsx', 'utf8');
var hasMob2 = c2.includes('isMob') || c2.includes('innerWidth');
var mediaCount2 = (c2.match(/@media/g) || []).length;
console.log('\n=== page.tsx ===');
console.log('Tiene isMob/innerWidth? ' + hasMob2);
console.log('Cantidad de @media queries: ' + mediaCount2);

// Check for large fonts without isMob
var lines2 = c2.split('\n');
var bigFonts = [];
lines2.forEach(function(l, i) {
  var m = l.match(/fontSize:\s*(\d+)/);
  if (m && parseInt(m[1]) >= 36) {
    var hasMobile = l.includes('isMob') || l.includes('?') || (i > 0 && lines2[i-1].includes('isMob'));
    bigFonts.push((i+1) + ': ' + m[1] + 'px | responsive=' + hasMobile + ' | ' + l.trim().substring(0, 90));
  }
});
console.log('\nFont-sizes >= 36px:');
bigFonts.forEach(function(f) { console.log(f); });
