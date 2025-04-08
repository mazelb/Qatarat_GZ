/**
 * Script to clear all root page conflicts and ensure proper structure
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Paths to clear/fix
const directories = [
  {
    path: path.join(projectRoot, 'src', 'pages'),
    shouldExist: false, // We want to use App Router exclusively
    backup: true
  },
  {
    path: path.join(projectRoot, 'src', 'app', 'page.tsx'),
    shouldExist: false,
    backup: true
  },
  {
    path: path.join(projectRoot, 'src', 'app', 'page.jsx'),
    shouldExist: false,
    backup: true
  },
  {
    path: path.join(projectRoot, 'src', 'app', 'page.js'),
    shouldExist: false,
    backup: true
  },
  {
    path: path.join(projectRoot, 'src', 'app', '[lang]'),
    shouldExist: true,
    backup: false
  }
];

console.log('Clearing app root conflicts and ensuring proper structure...');

directories.forEach(dir => {
  if (fs.existsSync(dir.path)) {
    if (!dir.shouldExist) {
      if (dir.backup) {
        // It's a file or directory we want to back up and remove
        const backupPath = `${dir.path}.bak`;
        fs.renameSync(dir.path, backupPath);
        console.log(`Renamed ${dir.path} to ${backupPath}`);
      } else {
        // It's something we just want to remove
        if (fs.statSync(dir.path).isDirectory()) {
          fs.rmdirSync(dir.path, { recursive: true });
        } else {
          fs.unlinkSync(dir.path);
        }
        console.log(`Removed ${dir.path}`);
      }
    }
  } else if (dir.shouldExist) {
    // Create directory if it should exist but doesn't
    fs.mkdirSync(dir.path, { recursive: true });
    console.log(`Created directory ${dir.path}`);
  }
});

// Ensure the Next.js cache is cleared
const nextCachePath = path.join(projectRoot, '.next');
if (fs.existsSync(nextCachePath)) {
  fs.rmdirSync(nextCachePath, { recursive: true });
  console.log('Cleared Next.js cache.');
}

console.log('Structure cleanup completed!');
