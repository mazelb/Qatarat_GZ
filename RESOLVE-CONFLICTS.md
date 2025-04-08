# Resolving the "Conflicting App and Page File" Error

If you're seeing the error "Conflicting app and page file was found", follow these steps to resolve it:

## Option 1: Use the Automated Scripts

1. Run the script to fix root conflicts specifically:
   ```
   npm run fix-root-conflict
   ```

2. If that doesn't work, try the more aggressive cleanup:
   ```
   npm run clear-roots
   ```

3. Run the general cleanup script:
   ```
   npm run cleanup
   ```

4. Clear Next.js cache and restart:
   ```
   rm -rf .next
   npm run dev
   ```

## Option 2: Manual Resolution

If the scripts don't work, manually resolve the conflicts:

1. Delete or rename these files if they exist:
   - `src/pages/index.tsx`
   - `src/pages/index.jsx`
   - `src/pages/index.js`
   - `src/app/page.tsx`
   - `src/app/page.jsx`
   - `src/app/page.js`

2. Ensure the internationalized structure exists:
   - `src/app/[lang]/page.tsx` should exist
   - `src/app/[lang]/layout.tsx` should exist

3. Start the dev server:
   ```
   npm run dev
   ```

## The Problem Explained

This error occurs because Next.js doesn't allow having both:
- A `pages/index.tsx` file (using Pages Router)
- An `app/page.tsx` file (using App Router)

Since we're using the App Router with internationalization, we should only have:
- `src/app/[lang]/page.tsx` (and other pages in this structure)
- `src/app/layout.tsx` (minimal root layout)

Both the Pages Router files and direct App Router files should be removed.
