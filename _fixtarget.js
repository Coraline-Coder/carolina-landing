var fs = require('fs');
var c = fs.readFileSync('src/app/page.tsx', 'utf8');
var lines = c.split('\n');
var fixes = 0;

[291, 1115, 1251].forEach(function(idx) {
  if (lines[idx] && lines[idx].includes('calendly.com/carolina-mkt"') && !lines[idx].includes('target=')) {
    lines[idx] = lines[idx].replace(
      'href="https://calendly.com/carolina-mkt"',
      'href="https://calendly.com/carolina-mkt" target="_blank" rel="noopener noreferrer"'
    );
    fixes++;
    console.log('FIX: Line ' + (idx+1) + ' -> added target="_blank"');
  } else {
    console.log('SKIP: Line ' + (idx+1));
  }
});

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
console.log('\nTotal fixes: ' + fixes);
