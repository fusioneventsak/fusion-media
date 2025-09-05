import React from 'react';

// Internal linking data structure for SEO optimization
export const internalLinks = {
  // Hub page links - strategically distributed across the site
  hubPages: {
    home: {
      title: "AI-Powered Web Development Agency",
      url: "/",
      keywords: ["Toronto web development", "AI development services", "custom web applications"]
    },
    services: {
      title: "Our Development Services",
      url: "#services",
      keywords: ["web development services", "AI integration", "custom development"]
    },
    blog: {
      title: "Web Development Insights",
      url: "#blog", 
      keywords: ["technical blog", "development guides", "AI tutorials"]
    },
    about: {
      title: "About Fusion Interactive",
      url: "#about",
      keywords: ["Toronto agency", "development team", "company expertise"]
    }
  },

  // Service-specific internal links
  serviceLinks: {
    webDevelopment: {
      title: "Custom Web Development",
      url: "#services",
      anchor: "custom-web-development",
      keywords: ["React development", "performance optimization", "scalable applications"]
    },
    aiServices: {
      title: "AI Integration Services", 
      url: "#services",
      anchor: "ai-integration",
      keywords: ["LLM integration", "machine learning", "AI-powered apps"]
    },
    eventTech: {
      title: "Interactive Event Technology",
      url: "#services", 
      anchor: "event-technology",
      keywords: ["event platforms", "real-time interactions", "gamification"]
    },
    performance: {
      title: "Performance Optimization",
      url: "#services",
      anchor: "performance",
      keywords: ["page speed", "Core Web Vitals", "lighthouse optimization"]
    }
  },

  // Blog internal linking strategy
  blogLinks: {
    technicalSEO: {
      title: "The Complete Guide to Technical SEO in 2024",
      url: "#blog",
      anchor: "technical-seo-guide",
      keywords: ["technical SEO", "Core Web Vitals", "structured data"]
    },
    aiDevelopment: {
      title: "Building LLM-Powered Web Apps",
      url: "#blog", 
      anchor: "llm-development",
      keywords: ["AI development", "LLM integration", "cost optimization"]
    },
    microInteractions: {
      title: "Creating Micro-Interactions That Convert",
      url: "#blog",
      anchor: "micro-interactions", 
      keywords: ["user experience", "conversion optimization", "interactive design"]
    },
    eventPlatforms: {
      title: "Custom Event Platforms Guide",
      url: "#blog",
      anchor: "event-platforms",
      keywords: ["event technology", "real-time features", "audience engagement"]
    }
  },

  // Contextual linking suggestions based on content
  contextualLinks: {
    performanceContent: [
      {
        anchor: "performance optimization services",
        target: "serviceLinks.performance",
        context: "performance, speed, optimization, Core Web Vitals"
      },
      {
        anchor: "technical SEO implementation", 
        target: "blogLinks.technicalSEO",
        context: "SEO, technical, optimization, rankings"
      }
    ],
    aiContent: [
      {
        anchor: "AI development services",
        target: "serviceLinks.aiServices", 
        context: "AI, machine learning, LLM, artificial intelligence"
      },
      {
        anchor: "LLM integration guide",
        target: "blogLinks.aiDevelopment",
        context: "LLM, integration, development, implementation"
      }
    ],
    eventContent: [
      {
        anchor: "interactive event technology",
        target: "serviceLinks.eventTech",
        context: "event, interactive, technology, engagement"
      },
      {
        anchor: "event platform development guide",
        target: "blogLinks.eventPlatforms", 
        context: "event platform, development, features"
      }
    ]
  }
};

// Component for rendering contextual internal links
interface ContextualLinkProps {
  text: string;
  href: string;
  className?: string;
  isExternal?: boolean;
}

export const ContextualLink: React.FC<ContextualLinkProps> = ({ 
  text, 
  href, 
  className = "", 
  isExternal = false 
}) => {
  const baseClasses = "text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300 transition-colors duration-200";
  
  return (
    <a 
      href={href}
      className={`${baseClasses} ${className}`}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {text}
    </a>
  );
};

// Component for service cross-linking
interface ServiceCrossLinkProps {
  services: string[];
  currentService?: string;
  className?: string;
}

export const ServiceCrossLinks: React.FC<ServiceCrossLinkProps> = ({ 
  services, 
  currentService, 
  className = "" 
}) => {
  const filteredServices = services.filter(service => service !== currentService);
  
  return (
    <div className={`mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700/50 ${className}`}>
      <h4 className="text-lg font-semibold mb-4 text-white">Related Services</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredServices.map((service, index) => {
          const linkData = internalLinks.serviceLinks[service as keyof typeof internalLinks.serviceLinks];
          if (!linkData) return null;
          
          return (
            <ContextualLink
              key={index}
              text={linkData.title}
              href={linkData.url}
              className="block p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors"
            />
          );
        })}
      </div>
    </div>
  );
};

// Component for blog post recommendations
interface BlogRecommendationProps {
  currentPost?: string;
  category?: 'technical' | 'ai' | 'design' | 'event';
  count?: number;
}

export const BlogRecommendations: React.FC<BlogRecommendationProps> = ({
  currentPost,
  category,
  count = 3
}) => {
  const getAllBlogLinks = () => Object.entries(internalLinks.blogLinks)
    .filter(([key]) => key !== currentPost)
    .slice(0, count);

  const blogPosts = getAllBlogLinks();

  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30">
      <h4 className="text-xl font-bold mb-6 text-white">Continue Reading</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogPosts.map(([key, post], index) => (
          <div key={index} className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
            <ContextualLink
              text={post.title}
              href={post.url}
              className="block font-medium mb-2 no-underline hover:text-blue-300"
            />
            <p className="text-sm text-gray-400">
              {post.keywords.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// SEO-optimized breadcrumb component
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
}

export const SEOBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.current ? (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <ContextualLink
                text={item.label}
                href={item.href || "/"}
                className="hover:text-white no-underline"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Component for footer link organization
export const FooterLinkStructure = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h4 className="font-semibold mb-4 text-white">Services</h4>
        <ul className="space-y-2">
          {Object.entries(internalLinks.serviceLinks).map(([key, link]) => (
            <li key={key}>
              <ContextualLink
                text={link.title}
                href={link.url}
                className="text-gray-400 hover:text-white no-underline"
              />
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4 text-white">Latest Insights</h4>
        <ul className="space-y-2">
          {Object.entries(internalLinks.blogLinks).slice(0, 4).map(([key, link]) => (
            <li key={key}>
              <ContextualLink
                text={link.title.split(':')[0]} // Shortened titles for footer
                href={link.url}
                className="text-gray-400 hover:text-white no-underline"
              />
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4 text-white">Company</h4>
        <ul className="space-y-2">
          <li>
            <ContextualLink text="About Us" href="#about" className="text-gray-400 hover:text-white no-underline" />
          </li>
          <li>
            <ContextualLink text="Why Choose Us" href="#why-us" className="text-gray-400 hover:text-white no-underline" />
          </li>
          <li>
            <ContextualLink text="Our Process" href="#about" className="text-gray-400 hover:text-white no-underline" />
          </li>
          <li>
            <ContextualLink text="Contact" href="#contact" className="text-gray-400 hover:text-white no-underline" />
          </li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4 text-white">Toronto Office</h4>
        <ul className="space-y-2 text-gray-400">
          <li>Downtown Toronto</li>
          <li>Ontario, Canada</li>
          <li>
            <ContextualLink 
              text="Get Directions" 
              href="https://maps.google.com" 
              isExternal={true}
              className="text-gray-400 hover:text-white no-underline"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default {
  internalLinks,
  ContextualLink,
  ServiceCrossLinks,
  BlogRecommendations,
  SEOBreadcrumb,
  FooterLinkStructure
};