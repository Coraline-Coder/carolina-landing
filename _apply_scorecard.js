var fs = require('fs');
var newCSS = fs.readFileSync('_new_scorecard_css.css', 'utf8');
var newFont = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">';
var oldFont = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">';

// ── 1. STANDALONE FILE ──
var sf = 'scorecard-meta-ads.html';
if (fs.existsSync(sf)) {
  var c = fs.readFileSync(sf, 'utf8');
  
  // Replace font
  c = c.replace(oldFont, newFont);
  
  // Replace <style> block
  var s1 = c.indexOf('<style>');
  var s2 = c.indexOf('</style>');
  if (s1 !== -1 && s2 !== -1) {
    c = c.substring(0, s1 + 7) + '\n' + newCSS + '\n' + c.substring(s2);
  }
  
  // Replace WA number
  c = c.replace(/522311396364/g, '522292924043');
  
  // Replace footer
  c = c.replace(/CJB by Carolina Betancourt/g, 'Carolina Betancourt');
  c = c.replace(/CJB/g, 'Carolina Betancourt');
  
  fs.writeFileSync(sf, c, 'utf8');
  
  // Copy to public/
  if (!fs.existsSync('public')) fs.mkdirSync('public');
  fs.writeFileSync('public/' + sf, c, 'utf8');
  console.log('OK - Standalone file updated + copied to public/');
} else {
  console.log('SKIP - Standalone file not found');
}

// ── 2. EMBEDDED IN herramientas-gratis.tsx ──
var hf = 'src/components/herramientas-gratis.tsx';
var h = fs.readFileSync(hf, 'utf8');

// Find scorecardHTML section
var scMark = 'scorecardHTML';
var scPos = h.indexOf(scMark);
if (scPos === -1) {
  console.log('FAIL - scorecardHTML not found');
} else {
  // Find the <style> within scorecardHTML section
  // First, find where scorecardHTML template content starts (after the backtick)
  var afterSc = h.substring(scPos);
  var styleStart = afterSc.indexOf('<style>');
  var styleEnd = afterSc.indexOf('</style>');
  
  if (styleStart !== -1 && styleEnd !== -1) {
    // Replace font link within scorecardHTML
    afterSc = afterSc.replace(oldFont, newFont);
    
    // Replace <style> block within scorecardHTML
    afterSc = afterSc.substring(0, styleStart + 7) + '\n' + newCSS + '\n' + afterSc.substring(styleEnd);
    
    // Replace WA number within scorecardHTML
    afterSc = afterSc.replace(/522311396364/g, '522292924043');
    
    // Replace footer within scorecardHTML
    afterSc = afterSc.replace(/CJB by Carolina Betancourt/g, 'Carolina Betancourt');
    
    // Reconstruct the file
    h = h.substring(0, scPos) + afterSc;
    fs.writeFileSync(hf, h, 'utf8');
    console.log('OK - Embedded scorecardHTML updated');
  } else {
    console.log('FAIL - <style> block not found in scorecardHTML');
  }
}

// ── VERIFY ──
var v = fs.readFileSync(hf, 'utf8');
var scV = v.substring(v.indexOf('scorecardHTML'));
console.log('\n--- VERIFY ---');
console.log('Font DM Sans: ' + scV.includes('DM+Sans:wght@300;400;500'));
console.log('Body bg #000: ' + scV.includes('background: #000000'));
console.log('Card bg #111827: ' + scV.includes('background: #111827'));
console.log('Option bg #1F2937: ' + scV.includes('background: #1F2937'));
console.log('Blue #3B82F6: ' + scV.includes('#3B82F6'));
console.log('Text #EEF0FF: ' + scV.includes('#EEF0FF'));
console.log('WA 522292924043: ' + scV.includes('522292924043'));
console.log('No old WA: ' + !scV.includes('522311396364'));
console.log('Footer Carolina: ' + scV.includes('Carolina Betancourt'));
console.log('No CJB: ' + !scV.includes('CJB'));
