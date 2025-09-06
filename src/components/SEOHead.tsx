import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  structuredData?: any;
  noIndex?: boolean;
}

export default function SEOHead({
  title = "Web Design Toronto | Custom App Development & UI/UX Design | Fusion Interactive",
  description = "Premier web design Toronto agency specializing in custom app development, mobile-first UX design, and AI-powered web solutions. Toronto's trusted web design agency for interactive experiences and high-performance websites.",
  keywords = "web design toronto, app developers toronto, web designer, web design agency toronto, toronto web development, mobile app development toronto, UI UX design toronto, custom web design toronto mobile-first",
  canonicalUrl = "https://fusioninteractive.agency",
  ogType = "website",
  ogImage = "https://fusioninteractive.agency/logos/Fusion-Interactive-Logo.png",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title.includes("Fusion Interactive") ? title : `${title} | Fusion Interactive`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Fusion Interactive" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="author" content="Fusion Interactive" />
      <meta name="language" content="EN" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}