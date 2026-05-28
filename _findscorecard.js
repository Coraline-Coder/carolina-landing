var fs = require('fs');
// Check standalone file
var standalone = 'public/scorecard-meta-ads.html';
var root = 'scorecard-meta-ads.html';
console.log('public/ exists: ' + fs.existsSync(standalone));
console.log('root exists: ' + fs.existsSync(root));

// Check embedded in herramientas-gratis.tsx
var h = fs.readFileSync('src/components/herramientas-gratis.tsx', 'utf8');
var scIdx = h.indexOf('scorecardHTML');
console.log('\nscorecardHTML in herramientas-gratis.tsx: ' + (scIdx !== -1 ? 'YES at pos ' + scIdx : 'NO'));

// Find all occurrences of scorecard
var scoreIdx = -1;
while ((scoreIdx = h.indexOf('scorecard', scoreIdx + 1)) !== -1) {
  console.log('  scorecard at pos ' + scoreIdx + ': ' + h.substring(scoreIdx, scoreIdx + 50));
}

// Find <style> in scorecardHTML template
if (scIdx !== -1) {
  var afterSC = h.substring(scIdx);
  var styleStart = afterSC.indexOf('<style>');
  var styleEnd = afterSC.indexOf('</style>');
  console.log('\n  <style> at offset: ' + styleStart);
  console.log('  </style> at offset: ' + styleEnd);
  console.log('  CSS length: ' + (styleEnd - styleStart - 7) + ' chars');
  console.log('  First 100 chars of CSS: ' + afterSC.substring(styleStart + 7, styleStart + 107));
}

// Also search for any standalone scorecard files
var path = require('path');
function walk(dir) {
  var results = [];
  try {
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = path.join(dir, file);
      try {
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          if (!file.includes('node_modules') && !file.includes('.next')) results = results.concat(walk(file));
        } else if (file.includes('scorecard')) {
          results.push(file);
        }
      } catch(e) {}
    });
  } catch(e) {}
  return results;
}
console.log('\nScorecard files found: ' + JSON.stringify(walk('.')));
