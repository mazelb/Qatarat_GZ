# Quick Start Guide for Qatarat Gaza

## First-time Setup

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Run the cleanup script to fix project structure**:
   ```
   npm run cleanup
   ```

3. **Create placeholder images and logos**:
   ```
   npm run ensure-images
   ```
   
   This will create SVG logos and necessary directories. You'll still need to add these images:
   - `/public/images/campaigns/default-campaign.jpg` (1200×630px)
   - `/public/images/about/about-hero.jpg` (1920×1080px)
   - `/public/images/about/default-profile.jpg` (400×600px)
   - `/public/images/hero/hero-1.jpg` (1920×1080px)
   - `/public/images/hero/hero-2.jpg` (1920×1080px)
   - `/public/images/hero/hero-3.jpg` (1920×1080px)
   - `/public/images/placeholder.jpg` (800×600px)

4. **Start the development server**:
   ```
   npm run dev
   ```

5. **Open the site in your browser**:
   ```
   http://localhost:3000
   ```
   
   Note: The site automatically redirects to language-specific routes (/en or /ar)

## Project Structure

- **Internationalization**: The site uses App Router with the [lang] parameter
  - All pages are in `src/app/[lang]/...`
  - Language toggle is in the navigation bar

- **Components Structure**:
  - `src/components/` - Reusable components
    - `about/` - About page components
    - `campaigns/` - Campaign related components
    - `common/` - General use components (buttons, etc.)
    - `home/` - Homepage components
    - `navigation/` - Header and footer
    - `ui/` - Basic UI elements (loaders, errors)

- **Data & API**:
  - Mock data is available in `src/lib/mockData.ts`
  - GraphQL schema is in `src/graphql/schema.graphql`
  - API integration is through Apollo Client

## Palestinian Design System

The design follows the Palestinian flag colors:
- Black: #000000
- White: #FFFFFF
- Green: #007A3D
- Red: #CE1126

These colors are configured in TailwindCSS as the 'palestine' color palette.

## Troubleshooting

If you encounter errors:

1. **Conflicting files error**:
   ```
   npm run cleanup
   ```

2. **Missing image errors**:
   ```
   npm run ensure-images
   ```
   
3. **Module not found errors**:
   ```
   npm install
   ```

4. **For any other issues**:
   - Check the console for errors
   - Verify paths in your code match the project structure
   - Ensure you're using the correct language parameter in URLs
