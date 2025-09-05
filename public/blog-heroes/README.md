# Blog Hero Images

Upload your blog hero images to the respective folders. Each image will be used as both:
1. Full-screen hero section in the individual blog post
2. Featured image in the blog preview card

## Image Specifications

### Required Files for Each Blog:
- **hero.jpg** (or .png/.webp) - Main hero image
- **thumbnail.jpg** (optional) - Smaller version for previews (will use hero.jpg if not provided)

### Recommended Dimensions:
- **Hero Image**: 1920x1080px (16:9 aspect ratio)
- **Thumbnail**: 800x450px (16:9 aspect ratio) 
- **File Size**: Under 500KB for optimal loading
- **Format**: JPG, PNG, or WebP

## Folders:

### `/technical-seo/`
**Blog Post**: "The Complete Guide to Technical SEO in 2024"
**Theme**: Technical dashboards, analytics, performance metrics, Core Web Vitals
**Suggested Content**: SEO dashboard screenshots, performance graphs, technical metrics

### `/llm-optimization/`  
**Blog Post**: "Building LLM-Powered Web Apps: Performance & Cost Optimization"
**Theme**: AI architecture, cost optimization, LLM integration diagrams
**Suggested Content**: AI workflow diagrams, cost reduction charts, API architecture

### `/micro-interactions/`
**Blog Post**: "Creating Micro-Interactions That Convert"  
**Theme**: Interactive UI elements, user engagement, conversion optimization
**Suggested Content**: UI mockups, interaction states, conversion metrics

## File Naming:
- `hero.jpg` - Main hero image (required)
- `thumbnail.jpg` - Preview thumbnail (optional)

## Example Structure:
```
blog-heroes/
├── technical-seo/
│   ├── hero.jpg
│   └── thumbnail.jpg
├── llm-optimization/
│   ├── hero.jpg  
│   └── thumbnail.jpg
└── micro-interactions/
    ├── hero.jpg
    └── thumbnail.jpg
```

The images will automatically be loaded by the blog components once uploaded to these folders.