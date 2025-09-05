import React from 'react';
import { Link } from 'react-router-dom';
import StockImagePlaceholder from './StockImagePlaceholder';

interface BlogHeroProps {
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  heroImage: string;
  fallbackType: 'technical-seo' | 'llm-optimization' | 'micro-interactions';
}

export default function BlogHero({ 
  title, 
  subtitle, 
  category, 
  categoryColor, 
  readTime, 
  date, 
  heroImage, 
  fallbackType 
}: BlogHeroProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="eager"
          />
        ) : (
          <StockImagePlaceholder 
            type={fallbackType}
            className="w-full h-full"
            alt={title}
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, #667eea 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
      </div>


      {/* Breadcrumb Navigation */}
      <div className="absolute top-24 left-8 z-20">
        <Link
          to="/blog"
          className="flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
        >
          <svg 
            className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to Blog</span>
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <span 
            className={`px-4 py-2 ${categoryColor} rounded-full text-sm font-semibold backdrop-blur-sm`}
          >
            {category}
          </span>
          <span className="mx-4 text-white/60">•</span>
          <span className="text-white/80 text-sm">{date} • {readTime}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center">
          <div className="text-white/60 text-sm mb-4">Scroll to read</div>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-white/20 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 right-16 w-2 h-2 bg-blue-400/40 rounded-full animate-ping hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce hidden lg:block" 
           style={{ animationDelay: '1s' }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}