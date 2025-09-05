# Claude Code Development Guidelines for Fusion Interactive

## Project Overview
Fusion Interactive is an AI-powered web development agency in Toronto specializing in custom React applications, interactive experiences, and performance optimization. This document provides guidelines for Claude Code when working on this project.

## Architecture & Technology Stack

### Current Implementation
- **Framework:** React 18 with TypeScript
- **Routing:** React Router DOM (client-side routing)
- **SEO Management:** react-helmet-async for dynamic meta tags
- **Styling:** Tailwind CSS with custom animations
- **Build Tool:** Vite
- **Domain:** https://fusioninteractive.agency

### Key Components Structure
```
src/
├── components/
│   ├── SEOHead.tsx          # Reusable SEO component
│   ├── Navigation.tsx       # Main navigation with React Router Links
│   └── [other components]
├── pages/
│   ├── HomePage.tsx         # / route
│   ├── AboutPage.tsx        # /about route
│   ├── ContactPage.tsx      # /contact route
│   ├── WhyUsPage.tsx        # /why-us route
│   └── Blog.tsx             # /blog route
├── blog-posts/
│   └── [individual blog post components]
public/
├── sitemap.xml              # XML sitemap for search engines
├── robots.txt               # Crawler directives
└── LLM.txt                  # AI system optimization file
```

## Development Standards

### Code Quality & Conventions
- **TypeScript:** Use strict typing for all components and functions
- **Component Structure:** Functional components with hooks
- **Naming:** PascalCase for components, camelCase for functions/variables
- **Props:** Always define TypeScript interfaces for component props
- **Imports:** Organize imports: React first, then external libraries, then local imports

### SEO Requirements (CRITICAL)
All new pages MUST include comprehensive SEO optimization following these standards:

#### 1. SEO Head Implementation
Every page component must include the SEOHead component with:
```tsx
import SEOHead from '../components/SEOHead';

// In component return:
<SEOHead
  title="Unique Page Title | Fusion Interactive"
  description="Compelling 150-160 character meta description"
  keywords="primary keyword, secondary keyword, toronto, web development"
  canonicalUrl="https://fusioninteractive.agency/page-url"
  structuredData={pageSpecificSchema}
/>
```

#### 2. Required Structured Data
Each page type requires specific schema markup:

**Organization/LocalBusiness Pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebDesignCompany",
  "name": "Fusion Interactive",
  "url": "https://fusioninteractive.agency",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "serviceArea": ["Toronto", "GTA", "Ontario", "Canada"]
}
```

**Blog Posts:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Organization",
    "name": "Fusion Interactive"
  },
  "datePublished": "2024-XX-XX",
  "dateModified": "2024-XX-XX"
}
```

#### 3. URL Structure Standards
- All routes must be lowercase with hyphens for spaces
- Blog posts: `/blog/post-title-slug`
- Service pages: `/service-name`
- Main pages: `/about`, `/contact`, `/why-us`

### Content Guidelines

#### Meta Tag Optimization
- **Title Tags:** 50-60 characters, include primary keyword and "Fusion Interactive"
- **Meta Descriptions:** 150-160 characters, compelling call-to-action
- **Keywords:** 5-8 relevant keywords, include "Toronto" for local SEO
- **Open Graph:** Always include og:title, og:description, og:image, og:url
- **Twitter Cards:** Include twitter:card, twitter:title, twitter:description

#### Internal Linking Strategy
- Link to relevant service pages from content
- Use descriptive anchor text with keywords
- Maximum 5-8 internal links per page
- Link to blog posts from service pages and vice versa

## React Router Implementation

### Route Configuration (App.tsx)
```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/why-us" element={<WhyUsPage />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:slug" element={<BlogPost />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/case-studies" element={<CaseStudiesPage />} />
</Routes>
```

### Navigation Updates
- Use `Link` components from react-router-dom, not onClick handlers
- Update active states based on current route
- Mobile menu should close on route changes

## File Management Requirements

### When Creating New Pages
1. Create component in appropriate directory (`/pages/` or `/blog-posts/`)
2. Add route to `App.tsx`
3. Update Navigation.tsx if it's a main navigation item
4. Update `sitemap.xml` with new URL
5. Update `robots.txt` if necessary
6. Update `LLM.txt` priority pages if relevant

### When Creating New Blog Posts
1. Create component in `/src/blog-posts/`
2. Add route in `App.tsx` with slug pattern
3. Update `sitemap.xml` with new blog post URL
4. Include proper Article schema markup
5. Ensure all images have proper alt text and SEO-friendly filenames

## SEO File Management

### robots.txt Updates
Located at `/public/robots.txt`
- Allow all new public pages
- Include React Router paths
- Update sitemap location
- Maintain AI crawler specific directives

### LLM.txt Updates
Located at `/public/LLM.txt`
- Add new pages to Priority-pages section
- Update service descriptions for new offerings
- Maintain technical architecture information
- Include relevant keywords and descriptions

### sitemap.xml Updates
Located at `/public/sitemap.xml`
- Add new URLs with proper priority levels
- Include lastmod dates
- Add image sitemaps for blog posts with hero images
- Maintain proper XML structure

## Performance Requirements

### Core Web Vitals Standards
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

### Implementation Requirements
- Optimize images (WebP format preferred)
- Lazy load non-critical content
- Minimize bundle size with code splitting
- Use proper caching strategies

## Testing & Validation

### Before Deployment Checklist
- [ ] All pages load correctly with unique URLs
- [ ] Meta tags are unique and optimized for each page
- [ ] Structured data validates using Google's Rich Results Test
- [ ] Internal links work correctly
- [ ] Mobile responsiveness confirmed
- [ ] Page speed scores above 90 (Lighthouse)
- [ ] SEO files (robots.txt, sitemap.xml, LLM.txt) updated

### SEO Validation Tools
- Google Search Console
- Google Rich Results Test
- Lighthouse SEO audit
- Schema.org validator
- Open Graph debugger

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
The project uses Netlify for hosting with automatic deployments from the main branch.

## Error Prevention

### Common Mistakes to Avoid
1. **Missing SEOHead component** on new pages
2. **Incorrect canonical URLs** (must match actual page URL)
3. **Duplicate meta descriptions** across pages  
4. **Broken internal links** after route changes
5. **Forgetting to update crawler files** when adding new routes
6. **Missing structured data** for new content types
7. **Non-unique page titles** across the site

### File Update Requirements
When adding new routes, ALWAYS update these files:
- `App.tsx` (route definition)
- `Navigation.tsx` (if main nav item)
- `public/sitemap.xml` (new URL entry)
- `public/LLM.txt` (if priority page)
- `public/robots.txt` (if access rules needed)

## Contact & Support
For questions about implementation or SEO strategy, refer to:
- `SEO_Strategy_2024.md` for comprehensive SEO guidelines
- `clauderules.md` for automated SEO optimization rules
- Project documentation in the repository

## Version History
- **v2.0** (September 2024): React Router implementation with full SEO optimization
- **v1.0** (March 2024): Initial SPA implementation

This document serves as the definitive guide for maintaining SEO excellence and code quality in the Fusion Interactive project.