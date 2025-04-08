/**
 * Script to fix root page conflicts between Pages Router and App Router
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Paths to potentially conflicting files
const pagesIndexPath = path.join(projectRoot, 'src', 'pages', 'index.tsx');
const pagesIndexJsPath = path.join(projectRoot, 'src', 'pages', 'index.jsx');
const pagesIndexJsxPath = path.join(projectRoot, 'src', 'pages', 'index.js');
const appPagePath = path.join(projectRoot, 'src', 'app', 'page.tsx');
const appPageJsPath = path.join(projectRoot, 'src', 'app', 'page.jsx');
const appPageJsxPath = path.join(projectRoot, 'src', 'app', 'page.js');

// Check and handle conflicting files
const pagesToCheck = [
  pagesIndexPath, 
  pagesIndexJsPath, 
  pagesIndexJsxPath,
  appPagePath,
  appPageJsPath,
  appPageJsxPath
];

console.log('Checking for conflicting root page files...');

let foundConflicts = false;

// Check if pages/index.* exists
const pagesIndexExists = pagesToCheck.slice(0, 3).some(file => fs.existsSync(file));

// Check if app/page.* exists
const appPageExists = pagesToCheck.slice(3).some(file => fs.existsSync(file));

// If both exist, we have a conflict
if (pagesIndexExists && appPageExists) {
  foundConflicts = true;
  console.log('Found conflicting root page files!');
  
  // Backup and remove pages/index.* files (prioritizing App Router)
  pagesToCheck.slice(0, 3).forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = `${file}.bak`;
      fs.renameSync(file, backupPath);
      console.log(`Renamed ${file} to ${backupPath}`);
    }
  });
}

// Check for any direct page.js file in the app directory root that might conflict
// with the internationalized structure
if (appPageExists) {
  pagesToCheck.slice(3).forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = `${file}.bak`;
      fs.renameSync(file, backupPath);
      console.log(`Renamed ${file} to ${backupPath} (moving to internationalized structure)`);
    }
  });
}

if (!foundConflicts) {
  console.log('No root page conflicts found.');
}

console.log('Done checking root page conflicts.');
