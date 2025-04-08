/**
 * Script to generate a kuffiyeh pattern SVG for use as a background
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const patternsDir = path.join(projectRoot, 'public', 'images', 'patterns');

// Create directory if it doesn't exist
if (!fs.existsSync(patternsDir)) {
  console.log('Creating patterns directory...');
  fs.mkdirSync(patternsDir, { recursive: true });
}

// Create a simple kuffiyeh pattern SVG
const kuffiyehSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    </pattern>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#smallGrid)"/>
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000000" stroke-width="1" opacity="0.2"/>
      <!-- Diagonal lines -->
      <line x1="0" y1="0" x2="100" y2="100" stroke="#CE1126" stroke-width="1" opacity="0.3"/>
      <line x1="50" y1="0" x2="100" y2="50" stroke="#CE1126" stroke-width="1" opacity="0.3"/>
      <line x1="0" y1="50" x2="50" y2="100" stroke="#CE1126" stroke-width="1" opacity="0.3"/>
      <!-- Crossed diagonal lines in opposite direction -->
      <line x1="0" y1="100" x2="100" y2="0" stroke="#000000" stroke-width="1" opacity="0.3"/>
      <line x1="0" y1="50" x2="50" y2="0" stroke="#000000" stroke-width="1" opacity="0.3"/>
      <line x1="50" y1="100" x2="100" y2="50" stroke="#000000" stroke-width="1" opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="100" height="100" fill="url(#grid)" />
</svg>`;

const kuffiyehPatternPath = path.join(patternsDir, 'kuffiyeh-pattern.svg');
fs.writeFileSync(kuffiyehPatternPath, kuffiyehSvg);
console.log(`Created kuffiyeh pattern SVG at ${kuffiyehPatternPath}`);

// Create a PNG version for browsers with SVG support issues
const kuffiyehPngPath = path.join(patternsDir, 'kuffiyeh-pattern.png');
if (!fs.existsSync(kuffiyehPngPath)) {
  console.log(`Note: For better compatibility, you should convert the SVG to PNG at ${kuffiyehPngPath}`);
}

console.log('Kuffiyeh pattern created.');
