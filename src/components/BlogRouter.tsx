import React from 'react';
import { useParams } from 'react-router-dom';
import TechnicalSEOGuide2024 from '../blog-posts/technical-seo-guide-2024';
import LLMWebAppsOptimization from '../blog-posts/llm-web-apps-optimization';
import InteractiveWebExperiences from '../blog-posts/interactive-web-experiences';

const blogPosts = {
  'technical-seo-guide-2024': TechnicalSEOGuide2024,
  'llm-web-apps-optimization': LLMWebAppsOptimization,
  'interactive-web-experiences': InteractiveWebExperiences,
};

export default function BlogRouter() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogPosts[slug as keyof typeof blogPosts]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <a 
            href="/blog" 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold hover:scale-105 transition-all duration-300"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }
  
  const BlogPostComponent = blogPosts[slug as keyof typeof blogPosts];
  return <BlogPostComponent />;
}