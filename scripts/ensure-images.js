/**
 * Script to ensure all required image directories and placeholder files exist
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const projectRoot = path.join(__dirname, '..');

// Define required image directories
const imageDirectories = [
  path.join(projectRoot, 'public', 'images'),
  path.join(projectRoot, 'public', 'images', 'campaigns'),
  path.join(projectRoot, 'public', 'images', 'about'),
  path.join(projectRoot, 'public', 'images', 'hero'),
  path.join(projectRoot, 'public', 'images', 'patterns'),
];

// Create directories if they don't exist
imageDirectories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to create a simple SVG logo file
function createLogoPlaceholder() {
  const logoSvg = `<svg width="150" height="50" xmlns="http://www.w3.org/2000/svg">
    <!-- Palestinian flag colors -->
    <rect width="150" height="50" fill="#ffffff" />
    <rect width="150" height="16.67" y="0" fill="#000000" />
    <rect width="150" height="16.67" y="16.67" fill="#ffffff" />
    <rect width="150" height="16.67" y="33.33" fill="#007A3D" />
    <!-- Red triangle -->
    <polygon points="0,0 0,50 75,25" fill="#CE1126" />
    <!-- Text -->
    <text x="85" y="30" font-family="Arial" font-size="14" font-weight="bold" fill="#000">Qatarat</text>
  </svg>`;

  const logoWhiteSvg = `<svg width="150" height="50" xmlns="http://www.w3.org/2000/svg">
    <!-- Palestinian flag colors on dark background -->
    <rect width="150" height="50" fill="#1a202c" />
    <rect width="150" height="16.67" y="0" fill="#000000" />
    <rect width="150" height="16.67" y="16.67" fill="#ffffff" />
    <rect width="150" height="16.67" y="33.33" fill="#007A3D" />
    <!-- Red triangle -->
    <polygon points="0,0 0,50 75,25" fill="#CE1126" />
    <!-- Text -->
    <text x="85" y="30" font-family="Arial" font-size="14" font-weight="bold" fill="#ffffff">Qatarat</text>
  </svg>`;

  const logoPath = path.join(projectRoot, 'public', 'images', 'logo.svg');
  const logoWhitePath = path.join(projectRoot, 'public', 'images', 'logo-white.svg');

  // Create regular logo
  if (!fs.existsSync(logoPath)) {
    fs.writeFileSync(logoPath, logoSvg);
    console.log(`Created placeholder logo: ${logoPath}`);
  }

  // Create white version for dark backgrounds
  if (!fs.existsSync(logoWhitePath)) {
    fs.writeFileSync(logoWhitePath, logoWhiteSvg);
    console.log(`Created placeholder white logo: ${logoWhitePath}`);
  }

  // Create PNG versions of the logos for browsers that don't support SVG well
  const logoPngPath = path.join(projectRoot, 'public', 'images', 'logo.png');
  const logoWhitePngPath = path.join(projectRoot, 'public', 'images', 'logo-white.png');

  if (!fs.existsSync(logoPngPath)) {
    console.log(`Note: You should convert the SVG logo to PNG at ${logoPngPath}`);
  }

  if (!fs.existsSync(logoWhitePngPath)) {
    console.log(`Note: You should convert the SVG white logo to PNG at ${logoWhitePngPath}`);
  }
}

// Create the logo placeholders
createLogoPlaceholder();

console.log('Image directories and placeholders have been checked and created as needed.');
