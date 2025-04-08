# Charity Web Platform: Feature Implementation Plan

## 0. Prompt
You are building a modern charity donation platform using Next.js for the frontend, Kotlin as the backend (via Spring Boot), and GraphQL for client-server communication. The design mimics the layout and functionality of handsforcharity.org. Your task is to implement two complete sections at a time, ensuring UI consistency, clear component boundaries, and complete GraphQL integration. Document all implementation details and update status after each section.

### 0.1 Component Architecture & State Guidelines
1. Do a thorough pass on the code base to enforce the compoement architecture, state management and UI/UX guidelines before proceeding to the next.
2. Study the Qatarat_GZ repo to understand the Stripe integration flow
3. make sure that paths and the project structure is properly setup to run locally. 
4. For items marked [✅], verify that the implementation is correct and functional
5. For uncompleted items [❌], implement the next complete section (e.g., all items in section 1.3 or 2.1)
6. Only implement two complete sections at a time, then stop
7. This approach prevents hitting token/context limits while ensuring coherent feature development
8. Document your implementation with clear code comments and update the checklist status
9. Add comprehensive JSDoc comments everywhere relevant

### 0.2 Frontend guidelines (Next.js)
1. Fix errors if there is any
2. Enforce modular components structure with atomic design principles
3. Create component library with reusable UI elements
4. Use TypeScript with strict types and prop interfaces
6. Standardize props and event handling patterns
7. Implement loading states, skeletons, and error boundaries
8. Use React Query or Apollo Client for GraphQL integration
9. Store UI state separately from remote GraphQL data
10. Apply i18n support for multilingual toggling

### 0.3 UI/UX guidelines
1. look and feel should strictly follow the color pallette of the palestinian flag and kuffiyeh style.
2. Use TailwindCSS for layout and styling
3. Add temporary images to have the same look and feel as this website: https://handsforcharity.org/ 

### 0.4 Backend guidelines (Kotlin + GraphQL)
1. Fix errors if there is any
2. Use Spring Boot with graphql-kotlin plugin
3. Define schema-first GraphQL services
4. Maintain strict type validation and DTO boundaries
5. Implement reusable resolvers and service layers
6. Apply standard GraphQL error and exception handling
7. Add logging and tracing on all mutations


## 1. Page Structure & Navigation

### 1.1. Navigation Bar
- [✅] Header with logo, "About Us", "Our Work", "Donate", "Emergency Appeals", language toggle, contact
- [✅] Sticky on scroll, mobile responsive
- [✅] Prominent "Donate Now" CTA

### 1.2. Hero Section
- [✅] Rotating banners or videos
- [✅] Tagline + CTA overlay
- [✅] Optional embedded donation widget

## 2. Donation & Emergency Appeal Features

### 2.1. Donation Widget
- [✅] Amount selector + custom input
- [✅] Frequency toggle (One-Time / Monthly / Annual)
- [✅] Dropdown of donation campaigns
- [✅] Connect with backend to store & process donations

### 2.2. Emergency Appeals Grid
- [✅] Card-style layout with title, description, image
- [✅] Status tag (Active / Closed / Urgent)
- [✅] CTA button to donate

### 2.3. Campaign Pages
- [✅] Static and dynamic pages per campaign (e.g., Palestine, Syria)
- [✅] GraphQL route query with content blocks
- [✅] Timeline of past updates or milestones

## 3. Content & Program Management

### 3.1. About Us Section
- [✅] Text blocks, image, mission/vision values
- [✅] Team member cards (image, role, description)

### 3.2. Our Work / Programs
- [❌] Grid of programs: Zakat, Orphan Sponsorship, Sadaqah, Winter Campaign, Water Wells, etc.
- [❌] Each item links to a detail page
- [❌] Fetch content dynamically via GraphQL

## 4. Blog & News Module

### 4.1. Articles Feed
- [❌] Recent blog/news cards
- [❌] Search and filter by topic/date
- [❌] GraphQL integration

### 4.2. Article Detail Page
- [❌] Render markdown or rich content
- [❌] Author + publish date + related links

## 5. Forms & Newsletter Integration

### 5.1. Contact Us Page
- [❌] Form with name, email, subject, message
- [❌] Backend route to store messages or send email

### 5.2. Newsletter Subscription
- [❌] Input form for email subscription
- [❌] Integration with external email provider or internal API

## 6. Stripe Integration for Donations

### 6.1. Setup & Dependencies
- [❌] Install Stripe SDKs:
    - [❌] @stripe/stripe-js (frontend)
    - [❌] stripe (backend Kotlin integration via REST or webhook handling)

### 6.2. Frontend Integration (Next.js)
- [❌] Add Stripe context provider with loadStripe and public key
- [❌] Implement donation checkout form with:
    - [❌] Donation amount
    - [❌] Recurring toggle (if supported in backend)
    - [❌] Selection of cause
    - [❌] Optional donor name/email
- [❌] Create API route /api/create-checkout-session to initiate Stripe Checkout
- [❌] Redirect user to Stripe Checkout using stripe.redirectToCheckout

### 6.3. Backend Integration (Kotlin)
- [❌] Create a POST /create-checkout-session GraphQL mutation to:
    - [❌] Receive donation input
    - [❌] Generate Stripe Checkout session using secret key
    - [❌] Return session ID
- [❌] Configure webhooks endpoint /webhook to:
    - [❌] Listen for checkout.session.completed
    - [❌] Store donation details in the database (amount, email, campaign)
    - [❌] Send confirmation email (optional)

### 6.4. Donation History (Optional)
- [❌] Add "My Donations" page (if users are authenticated)
- [❌] Display historical donation data with amount, date, campaign
- [❌] Allow downloading receipts (PDF or HTML)

### 6.5. UI Enhancements
- [❌] Show loading indicator during redirect
- [❌] Add "Donation Successful" confirmation page with:
    - [❌] Thank you message
    - [❌] Summary of the donation
    - [❌] CTA to share or continue donating
- [❌] Add "Donation Failed" fallback page for errors that should include a retry option

### 7.6. Security & Compliance
- [❌] Never expose secret keys in the frontend
- [❌] Store only minimal PII (email, name if provided)
- [❌] Enable Stripe Radar + webhook signature validation
- [❌] Log webhook events for debugging (with obfuscation of sensitive data)

## 8. Technical Polish & Code Quality

### 8.1. Testing Infrastructure
- [❌] Implement unit tests for core business logic (80%+ coverage)
- [❌] Add component tests for UI elements
- [❌] Create end-to-end tests for critical user flows
- [❌] Implement CI pipeline for automated testing

### 8.2. Documentation
- [❌] Create developer documentation for component usage
- [❌] Document state management patterns and data flow
- [❌] Generate API documentation using automated tools
- [❌] Create architecture diagrams showing system components in plantUML
