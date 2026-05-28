var fs = require('fs');
var f = 'src/components/herramientas-gratis.tsx';
var c = fs.readFileSync(f, 'utf8');

// The issue: missing </div> for the modal container before </motion.div>
// Current: </div>\n</motion.div>)}
// Need: </div>\n</div>\n</motion.div>)}

// The modal container div (background:"#000000") needs its closing tag
// Find the exact pattern and add the missing </div>
var broken = '</div>\n</motion.div>)}';
var fixed = '</div>\n</div>\n</motion.div>)}';

if (c.includes(broken)) {
  // But we need to make sure we only add it once - find the right spot
  // The structure should be: iframe-wrapper-close, modal-container-close, motion-close
  
  // Find the line numbers around the error
  var lines = c.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('</motion.div>') && lines[i].includes(')}')) {
      // Check if previous line is </div> (iframe wrapper close)
      if (i > 0 && lines[i-1].trim() === '</div>') {
        // Insert a </div> for the modal container before the motion.div close
        lines[i] = '</div>\n' + lines[i];
        console.log('FIXED: Added missing </div> at line ' + (i+1));
        break;
      }
    }
  }
  c = lines.join('\n');
  fs.writeFileSync(f, c, 'utf8');
} else {
  console.log('Pattern not found - checking current state');
  var lines = c.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('</motion.div>')) {
      console.log('Line ' + (i+1) + ': ' + lines[i]);
      if (i > 0) console.log('Line ' + i + ': ' + lines[i-1]);
      if (i > 1) console.log('Line ' + (i-1) + ': ' + lines[i-2]);
    }
  }
}

// Verify JSX structure
var divOpens = (c.match(/<div/g) || []).length;
var divCloses = (c.match(/<\/div>/g) || []).length;
console.log('div opens: ' + divOpens + ', div closes: ' + divCloses);
console.log('Balance: ' + (divOpens === divCloses ? 'OK' : 'MISMATCH - diff ' + (divOpens - divCloses)));
