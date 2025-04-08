# Complete Setup Guide for Qatarat Gaza

## Initial Setup

Run this command to set up everything in one go:

```bash
npm run setup
```

This will:
1. Fix any file conflicts
2. Create necessary directories
3. Generate required CSS files
4. Create placeholder images and patterns

## Manual Setup Steps

If you prefer to run steps individually:

1. **Fix conflicting files**:
   ```bash
   npm run fix-root-conflict
   npm run clear-roots
   npm run cleanup
   ```

2. **Create missing CSS and files**:
   ```bash
   npm run create-missing-files
   ```

3. **Create patterns and design elements**:
   ```bash
   npm run create-patterns
   ```

4. **Create placeholder images**:
   ```bash
   npm run ensure-images
   ```

## Troubleshooting Common Errors

### Module not found: Can't resolve '@/styles/globals.css'
Run `npm run create-missing-files` to create the missing stylesheet.

### Conflicting app and page file
Run `npm run fix-root-conflict` followed by `npm run clear-roots`.

### Images not displaying
Run `npm run ensure-images` to create placeholder images.

### General build/runtime errors
Try clearing the Next.js cache and node_modules:
```bash
rm -rf .next
rm -rf node_modules
npm install
```

## Running the Application

After setup is complete, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser - you should be redirected to the appropriate language route.
