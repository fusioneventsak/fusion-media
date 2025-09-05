import React from 'react';

// Schema markup data for different page types
export const schemaData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "WebDesignCompany",
    "name": "Fusion Media",
    "alternateName": "Fusion Interactive",
    "description": "AI-powered web development agency in Toronto specializing in custom applications, interactive experiences, and performance optimization",
    "url": "https://fusionmedia.com",
    "logo": "https://fusionmedia.com/logo.png",
    "image": "https://fusionmedia.com/fusion-media-toronto.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M5V 3M6",
      "addressCountry": "CA",
      "streetAddress": "Downtown Toronto"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6532",
      "longitude": "-79.3832"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-416-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "French"]
    },
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Fusion Media Team"
      }
    ],
    "numberOfEmployees": "5-10",
    "priceRange": "$100-149 per hour",
    "serviceArea": [
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "State", 
        "name": "Ontario"
      },
      {
        "@type": "Country",
        "name": "Canada"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Web Development",
            "description": "Scalable web applications built with React and modern technologies"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration Services",
            "description": "LLM integration and machine learning implementation for web applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Interactive Event Technology",
            "description": "Custom event platforms with real-time features and audience engagement"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/fusion-media",
      "https://github.com/fusion-media",
      "https://twitter.com/fusionmedia"
    ]
  },

  services: {
    webDevelopment: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Web Development Toronto",
      "description": "Professional custom web development services in Toronto using React, performance optimization, and modern best practices",
      "provider": {
        "@type": "Organization",
        "name": "Fusion Media"
      },
      "areaServed": "Toronto, Ontario",
      "serviceType": "Web Development",
      "category": "Technology Services",
      "offers": {
        "@type": "Offer",
        "priceRange": "$25000-$150000",
        "priceCurrency": "CAD",
        "description": "Custom web applications starting from $25,000"
      }
    },
    aiServices: {
      "@context": "https://schema.org", 
      "@type": "Service",
      "name": "AI Development Services",
      "description": "AI integration services including LLM implementation, machine learning consulting, and AI-powered web applications",
      "provider": {
        "@type": "Organization",
        "name": "Fusion Media"
      },
      "serviceType": "AI Development",
      "category": "Artificial Intelligence Services",
      "offers": {
        "@type": "Offer",
        "priceRange": "$30000-$200000",
        "priceCurrency": "CAD"
      }
    }
  },

  blogArticle: (title: string, description: string, datePublished: string, keywords: string[]) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://fusionmedia.com/blog-images/${title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "author": {
      "@type": "Organization",
      "name": "Fusion Media",
      "url": "https://fusionmedia.com"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Fusion Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fusionmedia.com/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fusionmedia.com/blog/${title.toLowerCase().replace(/\s+/g, '-')}`
    },
    "keywords": keywords.join(", "),
    "articleSection": "Web Development",
    "wordCount": "2500",
    "inLanguage": "en-CA",
    "copyrightYear": "2024",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Fusion Media"
    }
  })
};

// FAQ data for AEO optimization
export const faqData = {
  webDevelopment: [
    {
      question: "How much does custom web development cost in Toronto?",
      answer: "Custom web development in Toronto typically ranges from $25,000 to $150,000 depending on complexity. Factors include the number of features, integrations needed, design complexity, and ongoing maintenance requirements. At Fusion Media, we provide transparent pricing and detailed project scopes to ensure you understand the investment required for your specific needs."
    },
    {
      question: "What's the difference between React and Vue.js for web applications?",
      answer: "React offers a larger ecosystem and more job opportunities, making it ideal for complex applications and teams. Vue.js has a gentler learning curve and is perfect for rapid development. At Fusion Media, we primarily use React for its scalability, performance optimization capabilities, and extensive community support, especially for AI-powered applications."
    },
    {
      question: "How long does it take to build a custom web application?", 
      answer: "Custom web application development typically takes 3-6 months depending on complexity. Simple applications with basic features can be completed in 6-8 weeks, while complex applications with AI integration, real-time features, or extensive customization may take 6-12 months. We provide detailed timelines during our discovery phase."
    },
    {
      question: "What makes a website load fast?",
      answer: "Fast websites require optimized images (WebP format), efficient code splitting, CDN usage, minimal HTTP requests, and proper caching strategies. At Fusion Media, we implement Core Web Vitals optimization, achieving Lighthouse scores of 90+ through techniques like lazy loading, tree shaking, and performance monitoring."
    }
  ],
  aiServices: [
    {
      question: "How can AI improve my website's user experience?",
      answer: "AI enhances user experience through personalized content recommendations, chatbots for instant support, predictive search functionality, and automated content optimization. We implement AI features like smart forms that adapt to user behavior, dynamic pricing based on user profiles, and intelligent content delivery that increases engagement by up to 40%."
    },
    {
      question: "What's the cost of integrating LLMs into web applications?",
      answer: "LLM integration costs vary based on usage volume and complexity. API costs typically range from $100-2000/month for small to medium applications. Development costs range from $30,000-100,000. We implement cost optimization strategies like smart caching, request batching, and fallback systems to minimize ongoing operational expenses."
    },
    {
      question: "How do you ensure AI application security?",
      answer: "AI application security requires input sanitization, rate limiting, API key protection, and secure model hosting. We implement encryption for data in transit and at rest, user authentication for AI features, and monitoring systems to detect unusual usage patterns. All AI integrations follow OWASP security guidelines."
    },
    {
      question: "What AI technologies work best for e-commerce?",
      answer: "E-commerce benefits from recommendation engines, dynamic pricing algorithms, chatbots for customer service, and fraud detection systems. We integrate technologies like collaborative filtering for product recommendations, natural language processing for search improvements, and computer vision for visual product search."
    }
  ],
  local: [
    {
      question: "Why choose a Toronto-based web development agency?",
      answer: "Toronto agencies offer timezone alignment for real-time collaboration, understanding of Canadian business regulations, local market insights, and easier face-to-face meetings. We understand Canadian payment systems (Interac, Canadian banking), local user behavior, and have established relationships with Toronto's thriving tech ecosystem including partnerships with local design studios and marketing agencies."
    },
    {
      question: "Do you work with startups in the Toronto area?",
      answer: "Yes, we specialize in working with Toronto startups, particularly in the fintech, healthtech, and event technology sectors. We offer flexible payment structures, MVP development approaches, and have connections to Toronto's startup accelerators like DMZ, MaRS, and Techstars. Our team understands the unique challenges of scaling businesses in the Canadian market."
    },
    {
      question: "What local payment gateways do you integrate?",
      answer: "We integrate all major Canadian payment systems including Interac e-Transfer, Moneris, PayBright (now PayPal Pay in 4), and Nuvei. We also work with Stripe and PayPal for international transactions. Our team ensures compliance with Canadian financial regulations and implements proper sales tax calculations for different provinces."
    }
  ]
};

// Schema component for JSON-LD injection
interface SchemaProps {
  type: 'organization' | 'service' | 'article' | 'faq';
  data?: any;
  service?: 'webDevelopment' | 'aiServices';
  articleData?: {
    title: string;
    description: string;
    datePublished: string;
    keywords: string[];
  };
}

export const SchemaMarkup: React.FC<SchemaProps> = ({ type, data, service, articleData }) => {
  let schemaObject;

  switch (type) {
    case 'organization':
      schemaObject = schemaData.organization;
      break;
    case 'service':
      if (service && schemaData.services[service]) {
        schemaObject = schemaData.services[service];
      }
      break;
    case 'article':
      if (articleData) {
        schemaObject = schemaData.blogArticle(
          articleData.title,
          articleData.description, 
          articleData.datePublished,
          articleData.keywords
        );
      }
      break;
    case 'faq':
      schemaObject = data;
      break;
    default:
      return null;
  }

  if (!schemaObject) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObject, null, 2)
      }}
    />
  );
};

// FAQ Component with Schema markup
interface FAQSectionProps {
  category: 'webDevelopment' | 'aiServices' | 'local';
  title?: string;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  category, 
  title = "Frequently Asked Questions",
  className = ""
}) => {
  const faqs = faqData[category];
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  // Create FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className={`faq-section ${className}`}>
      <SchemaMarkup type="faq" data={faqSchema} />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">{title}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left hover:bg-gray-700/30 transition-colors duration-200 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <span className={`text-blue-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openIndex !== index}
              >
                <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Breadcrumb with Schema markup
interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return <SchemaMarkup type="faq" data={breadcrumbSchema} />;
};

export default {
  SchemaMarkup,
  FAQSection,
  BreadcrumbSchema,
  schemaData,
  faqData
};