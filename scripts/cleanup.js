/**
 * Cleanup script to fix project structure issues
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');

// Step 1: Check and remove /pages directory if it exists
const pagesDir = path.join(projectRoot, 'src', 'pages');
if (fs.existsSync(pagesDir)) {
  console.log('Found /pages directory. Moving it to pages.bak for safety...');
  fs.renameSync(pagesDir, `${pagesDir}.bak`);
}

// Step 2: Check and remove potentially conflicting files in /app directory
const appDir = path.join(projectRoot, 'src', 'app');
const nonLangFiles = [];

// Find all files in app root that aren't [lang]
if (fs.existsSync(appDir)) {
  fs.readdirSync(appDir).forEach(item => {
    const itemPath = path.join(appDir, item);
    if (item !== '[lang]' && fs.statSync(itemPath).isDirectory()) {
      nonLangFiles.push(itemPath);
    }
  });
}

// Move conflicting directories to backup
if (nonLangFiles.length > 0) {
  console.log('Found potentially conflicting directories in /app:');
  nonLangFiles.forEach(dir => {
    console.log(`- ${dir}`);
    fs.renameSync(dir, `${dir}.bak`);
    console.log(`  ✓ Moved to ${dir}.bak`);
  });
}

// Step 3: Ensure [lang] directory exists
const langDir = path.join(appDir, '[lang]');
if (!fs.existsSync(langDir)) {
  console.log('Creating [lang] directory...');
  fs.mkdirSync(langDir, { recursive: true });
}

// Step 4: Clear Next.js cache
console.log('Clearing Next.js cache...');
try {
  fs.rmSync(path.join(projectRoot, '.next'), { recursive: true, force: true });
  console.log('✓ Next.js cache cleared');
} catch (e) {
  console.log('No .next directory found or could not be removed');
}

// Step 5: Check image directories
const imageDirectories = [
  path.join(projectRoot, 'public', 'images'),
  path.join(projectRoot, 'public', 'images', 'campaigns'),
  path.join(projectRoot, 'public', 'images', 'about'),
  path.join(projectRoot, 'public', 'images', 'hero'),
  path.join(projectRoot, 'public', 'images', 'patterns'),
];

imageDirectories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('\nCleanup completed! You can now run:');
console.log('  npm run dev');
console.log('\nIf everything works correctly, you can delete the .bak directories.');
