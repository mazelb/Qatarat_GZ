/**
 * Script to identify and fix conflicting files between /pages and /app directories
 */
const fs = require('fs');
const path = require('path');

// Define paths
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const appDir = path.join(__dirname, '..', 'src', 'app');

// Check if pages directory exists
if (fs.existsSync(pagesDir)) {
  console.log('Pages directory found. Checking for conflicts...');
  
  // Get all files in pages directory (recursive)
  const getAllFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        fileList = getAllFiles(filePath, fileList);
      } else {
        // Skip _app.tsx, _document.tsx, and API routes
        if (!file.startsWith('_') && !dir.includes('api')) {
          const relativePath = path.relative(pagesDir, filePath);
          fileList.push(relativePath);
        }
      }
    });
    
    return fileList;
  };
  
  const pageFiles = getAllFiles(pagesDir);
  console.log('Found page files:', pageFiles);
  
  // Check each page file for conflicts with app directory
  let conflicts = [];
  pageFiles.forEach(file => {
    // Convert page path to app path
    const pagePathParts = file.split('.');
    pagePathParts.pop(); // Remove extension
    const pagePath = pagePathParts.join('.');
    
    // Check if corresponding app directory exists
    const appPath = path.join(appDir, pagePath);
    if (fs.existsSync(appPath)) {
      conflicts.push({ page: file, app: pagePath });
    }
  });
  
  if (conflicts.length > 0) {
    console.log('Found conflicts:');
    conflicts.forEach(conflict => {
      console.log(`- Page: ${conflict.page} conflicts with App route: ${conflict.app}`);
      
      // Backup and remove the conflicting page file
      const pageFilePath = path.join(pagesDir, conflict.page);
      const backupPath = `${pageFilePath}.bak`;
      fs.renameSync(pageFilePath, backupPath);
      console.log(`  Renamed ${pageFilePath} to ${backupPath}`);
    });
    
    console.log('\nConflicts resolved. You can delete the .bak files if everything works correctly.');
  } else {
    console.log('No conflicts found.');
  }
} else {
  console.log('No pages directory found. No conflicts to resolve.');
}
