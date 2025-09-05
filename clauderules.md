# Claude SEO Automation Rules for Fusion Interactive

## 🎯 MANDATORY SEO AUTOMATION RULES

This document contains explicit rules that Claude MUST follow when creating or modifying any page on the Fusion Interactive website. These rules ensure automatic SEO optimization without manual oversight.

---

## 🚨 CRITICAL RULE: NEVER CREATE A PAGE WITHOUT SEO

**ABSOLUTE REQUIREMENT:** Every new page, component, or route MUST include full SEO optimization. No exceptions.

### Auto-Checklist for Every New Page:
- [ ] SEOHead component implemented
- [ ] Unique title tag (50-60 characters)
- [ ] Unique meta description (150-160 characters) 
- [ ] Relevant keywords included
- [ ] Canonical URL specified
- [ ] Structured data schema added
- [ ] Open Graph tags included
- [ ] Twitter Card tags included

---

## 📋 AUTOMATIC SEO COMPONENT GENERATION

### Rule 1: SEOHead Component Template
When creating ANY new page, automatically include this exact structure:

```tsx
import SEOHead from '../components/SEOHead';

// REQUIRED: Add structured data constant
const [pageName]StructuredData = {
  "@context": "https://schema.org",
  "@type": "[SchemaType]", // See schema types below
  // Add relevant schema properties
};

export default function [PageName]() {
  return (
    <>
      <SEOHead
        title="[Unique Page Title] | Fusion Interactive"
        description="[Compelling 150-160 character description with primary keyword]"
        keywords="[5-8 relevant keywords including Toronto]"
        canonicalUrl="https://fusioninteractive.agency[exact-route-path]"
        structuredData={[pageName]StructuredData}
      />
      {/* Page content */}
    </>
  );
}
```

### Rule 2: Schema Type Selection
Automatically select the correct schema type based on page purpose:

| Page Type | Schema Type | Required Properties |
|-----------|-------------|-------------------|
| **Homepage** | WebDesignCompany | name, url, address, serviceArea |
| **About/Company** | LocalBusiness | name, address, telephone, priceRange |
| **Service Pages** | Service | name, provider, serviceType, description |
| **Blog Posts** | Article | headline, author, datePublished, dateModified |
| **Case Studies** | CreativeWork | name, creator, dateCreated, description |
| **Contact** | ContactPage | name, url, description |

### Rule 3: Keyword Generation Formula
For every page, automatically generate keywords using this formula:
```
[Primary Service/Topic] + [Secondary Service] + "Toronto" + "web development" + [2-3 specific technical terms]
```

**Examples:**
- Homepage: `"Toronto web development agency, AI development services, custom web applications, React development, interactive experiences"`
- About: `"Toronto web developers, AI integration specialists, custom software development, React experts, performance optimization"`
- Blog: `"[blog topic], [main keyword], Toronto web development, [technical terms], React tutorial"`

---

## 🔗 AUTOMATIC ROUTE & FILE MANAGEMENT

### Rule 4: Multi-File Update Automation
When creating a new page, AUTOMATICALLY update these files in this exact order:

#### Step 1: Create the Page Component
```tsx
// Location: /src/pages/[PageName].tsx or /src/blog-posts/[slug].tsx
// Include full SEO implementation as per Rule 1
```

#### Step 2: Add Route to App.tsx
```tsx
// Add to Routes component:
<Route path="/[route-path]" element={<[PageName] />} />
```

#### Step 3: Update Navigation (if main nav item)
```tsx
// Add to navItems array in Navigation.tsx:
{ id: '[route-id]', label: '[Display Name]', path: '/[route-path]' }
```

#### Step 4: Update sitemap.xml
```xml
<!-- Add new URL entry with proper priority -->
<url>
  <loc>https://fusioninteractive.agency/[route-path]</loc>
  <lastmod>[current-date]</lastmod>
  <changefreq>[appropriate-frequency]</changefreq>
  <priority>[0.5-1.0]</priority>
</url>
```

#### Step 5: Update LLM.txt (if priority page)
```txt
# Add to Priority-pages section:
  - /[route-path]
```

#### Step 6: Update robots.txt (if needed)
```txt
# Add Allow directive if public:
Allow: /[route-path]
```

### Rule 5: URL Structure Automation
All URLs MUST follow this pattern:
- **Lowercase only:** `/about`, not `/About`
- **Hyphens for spaces:** `/why-us`, not `/why_us` or `/whyus`
- **No trailing slashes:** `/contact`, not `/contact/`
- **Blog posts:** `/blog/[slug]` where slug is lowercase with hyphens

---

## 🎨 CONTENT OPTIMIZATION AUTOMATION

### Rule 6: Title Tag Formula
Automatically generate title tags using this structure:
```
[Primary Keyword/Service] | [Secondary Benefit] | Fusion Interactive
```

**Character Limit:** 50-60 characters maximum
**Examples:**
- `"Toronto Web Development Agency | AI-Powered Custom Applications | Fusion Interactive"`
- `"Custom React Development | Interactive Web Experiences | Fusion Interactive"`
- `"Technical SEO Guide 2024 | Performance Optimization Tips | Fusion Interactive"`

### Rule 7: Meta Description Formula
Automatically generate meta descriptions using this structure:
```
[Primary benefit/service description] in [location if relevant]. [Secondary benefit]. [Call-to-action].
```

**Character Limit:** 150-160 characters
**Must Include:**
- Primary keyword within first 100 characters
- Location (Toronto) for local pages
- Clear call-to-action
- Benefit-focused language

**Examples:**
- `"Leading Toronto web development agency specializing in AI-powered applications, interactive experiences, and performance optimization. Get your custom solution today."`
- `"Comprehensive technical SEO guide for 2024 covering Core Web Vitals, performance optimization, and search ranking improvements. Boost your site's visibility now."`

### Rule 8: Internal Linking Automation
For every new page, automatically add 3-5 internal links:

**Homepage:** Link to all main service pages and featured blog post
**Service Pages:** Link to relevant blog posts, case studies, and contact page  
**Blog Posts:** Link to related service pages, other relevant blog posts, and contact CTA
**About/Contact:** Link to main services and homepage

**Anchor Text Rules:**
- 30% exact match keywords
- 40% partial match keywords  
- 30% natural/branded text

---

## 📊 PERFORMANCE AUTOMATION RULES

### Rule 9: Image Optimization
Every image MUST be automatically optimized:
- **Alt text:** Descriptive with keywords where natural
- **File naming:** `keyword-description.jpg` (no spaces, descriptive)
- **Format:** WebP preferred, fallback to JPG
- **Size:** Responsive with appropriate breakpoints

### Rule 10: Schema Markup Validation
After adding structured data, validate it meets these requirements:
- Valid JSON-LD format
- All required properties included  
- URLs use https://fusioninteractive.agency domain
- Dates in ISO format (YYYY-MM-DD)
- No deprecated schema properties

---

## 🔧 TECHNICAL SEO AUTOMATION

### Rule 11: Canonical URL Standards
Every page MUST have correct canonical URL:
```tsx
canonicalUrl="https://fusioninteractive.agency[exact-route-path]"
```

**Rules:**
- No trailing slashes
- Exact match to actual route
- Always use https
- Include subdirectories for blog posts

### Rule 12: Open Graph Automation
Every page automatically gets these Open Graph tags:
```tsx
// In SEOHead component, auto-generate:
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />  
<meta property="og:url" content={canonicalUrl} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Fusion Interactive" />
<meta property="og:locale" content="en_CA" />
```

### Rule 13: Twitter Card Automation  
Auto-generate Twitter Cards:
```tsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

---

## 🌍 LOCAL SEO AUTOMATION

### Rule 14: Toronto Local Optimization
For all service-related pages, automatically include:
- "Toronto" in title tag
- "Toronto" or "GTA" in meta description
- Local schema properties (address, serviceArea)
- References to "Ontario" and "Canada" where natural

### Rule 15: Local Schema Requirements
All pages with local relevance must include:
```json
{
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto", 
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "serviceArea": ["Toronto", "GTA", "Ontario", "Canada"]
}
```

---

## 🚀 BLOG POST SPECIFIC AUTOMATION

### Rule 16: Blog Post SEO Template
Every blog post MUST follow this exact structure:

```tsx
import SEOHead from '../components/SEOHead';

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article", 
  "headline": "[Blog Post Title]",
  "author": {
    "@type": "Organization",
    "name": "Fusion Interactive"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "Fusion Interactive",
    "url": "https://fusioninteractive.agency"
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "description": "[Article description]",
  "url": "https://fusioninteractive.agency/blog/[slug]"
};

export default function [BlogPostName]() {
  return (
    <>
      <SEOHead
        title="[Blog Title] | Fusion Interactive Blog"
        description="[Blog-specific description with main keyword in first 100 chars]"
        keywords="[blog topic keywords], Toronto web development, [technical terms]"
        canonicalUrl="https://fusioninteractive.agency/blog/[slug]"
        structuredData={articleStructuredData}
      />
      {/* Blog content */}
    </>
  );
}
```

### Rule 17: Blog URL Slug Generation
Automatically generate blog slugs:
- Convert title to lowercase
- Replace spaces with hyphens
- Remove special characters except hyphens
- Maximum 5 words for optimal SEO
- Example: "The Complete Guide to Technical SEO in 2024" → `"technical-seo-guide-2024"`

---

## ✅ VALIDATION & TESTING AUTOMATION

### Rule 18: Pre-Deployment Validation
Before any page goes live, automatically verify:
- [ ] Page loads without errors
- [ ] Title tag is unique across site
- [ ] Meta description is unique across site
- [ ] All internal links work
- [ ] Schema markup validates
- [ ] Canonical URL is correct and accessible
- [ ] Page has unique H1 tag
- [ ] Open Graph preview displays correctly

### Rule 19: SEO File Consistency Check
After adding any new page, verify:
- [ ] sitemap.xml includes new URL
- [ ] LLM.txt updated if priority page
- [ ] robots.txt allows access if public
- [ ] Navigation updated if main nav item
- [ ] All URLs use consistent domain (https://fusioninteractive.agency)

---

## 🎯 KEYWORD TARGETING AUTOMATION

### Rule 20: Primary Keyword Placement
For every page, ensure primary keyword appears:
- In title tag (within first 50 characters)
- In meta description (within first 100 characters)  
- In H1 tag
- In first 100 words of content
- In at least one internal link anchor text

### Rule 21: Keyword Density Automation
Maintain optimal keyword density:
- Primary keyword: 1-2% of total content
- Secondary keywords: 0.5-1% each
- "Toronto" on local pages: 0.5-1%
- Avoid keyword stuffing (never exceed 3%)

---

## 📈 MONITORING & MAINTENANCE

### Rule 22: Update Tracking
When making changes to any page:
- Update `lastmod` date in sitemap.xml
- Update `dateModified` in Article schema for blog posts
- Maintain change log in comments

### Rule 23: Content Quality Standards  
Every page must maintain:
- Minimum 300 words of unique content
- Clear value proposition
- Relevant internal links (3-5 per page)
- Call-to-action appropriate to page intent
- Mobile-optimized responsive design

---

## 🔒 ERROR PREVENTION RULES

### Rule 24: Common Mistake Prevention
NEVER:
- Create a page without SEOHead component
- Use duplicate title tags across pages
- Use duplicate meta descriptions across pages
- Forget to add new routes to App.tsx
- Use incorrect canonical URLs  
- Miss updating sitemap.xml for new pages
- Create URLs with capital letters or spaces

### Rule 25: Quality Assurance Automation
After creating any page:
1. Test page loads correctly
2. Verify unique meta tags
3. Check internal links work  
4. Validate schema markup
5. Confirm mobile responsiveness
6. Test page speed (target >90 Lighthouse score)

---

## 🎉 SUCCESS METRICS

### Automatic SEO Success Indicators:
- ✅ All pages have unique, optimized title tags
- ✅ All pages have unique, compelling meta descriptions
- ✅ Every page includes relevant structured data
- ✅ Internal linking strategy implemented
- ✅ All URLs follow SEO-friendly structure
- ✅ Local SEO optimization for Toronto market
- ✅ Mobile-first responsive design
- ✅ Fast page load speeds (LCP < 2.5s)

---

## 📞 Emergency Rules

### If You're Unsure About SEO Implementation:
1. **STOP** - Do not create the page without SEO
2. **REFER** to this document for exact requirements  
3. **FOLLOW** the templates provided above exactly
4. **VALIDATE** using the checklists provided
5. **NEVER SKIP** SEO implementation "temporarily"

### Remember: SEO IS NOT OPTIONAL
Every page created without proper SEO is a missed opportunity and potential traffic loss. This document ensures zero SEO gaps in the Fusion Interactive website.

---

**Document Version:** 2.0 (September 2024)  
**Last Updated:** Current implementation with React Router architecture  
**Next Review:** Quarterly updates with SEO strategy evolution