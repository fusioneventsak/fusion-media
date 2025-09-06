import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StockImagePlaceholder from '../components/StockImagePlaceholder';

export default function Blog() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt((entry.target as HTMLElement).dataset.index || '0');
          setTimeout(() => {
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          }, index * 100);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 opacity-5 z-0">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: 'radial-gradient(circle, #667eea 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            animation: 'particleFloat 25s linear infinite'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-28 sm:pt-0">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/blog-hero-background.jpeg"
            alt="Digital network and data visualization background"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              console.log('Hero background image failed to load');
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            onLoad={() => console.log('Hero background image loaded successfully')}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/50" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Crafting Digital Experiences That Convert
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Master modern web development with cutting-edge tutorials on SEO optimization, AI integration, 
                interactive components, and event technology that drives real business results.
              </p>
              <a 
                href="#articles" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Explore Latest Insights
              </a>
            </div>
            
            <div className="relative h-96 lg:h-[500px]">
              {/* Logo Pyramid - Increased arc and spacing */}
              {[
                { 
                  name: 'Claude', 
                  logo: '/logos/claude.png',
                  x: { mobile: 0, desktop: 0 }, 
                  y: { mobile: -80, desktop: -100 }
                },
                { 
                  name: 'GitHub', 
                  logo: '/logos/Github.webp',
                  x: { mobile: -120, desktop: -180 }, 
                  y: { mobile: -40, desktop: -60 }
                },
                { 
                  name: 'OpenAI', 
                  logo: '/logos/openai.jpg',
                  x: { mobile: 120, desktop: 180 }, 
                  y: { mobile: -40, desktop: -60 }
                },
                { 
                  name: 'Supabase', 
                  logo: '/logos/Supabase.webp',
                  x: { mobile: -180, desktop: -280 }, 
                  y: { mobile: 0, desktop: -10 }
                },
                { 
                  name: 'Netlify', 
                  logo: '/logos/netlify-logo.webp',
                  x: { mobile: 180, desktop: 280 }, 
                  y: { mobile: 0, desktop: -10 }
                }
              ].map((tool) => (
                <div key={tool.name}>
                  {/* Mobile Version */}
                  <div
                    className="absolute block lg:hidden pointer-events-none w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl p-0 hover:bg-white/25 transition-all duration-300"
                    style={{
                      left: `calc(50% + ${tool.x.mobile}px)`,
                      top: `calc(50% + ${tool.y.mobile}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <img 
                      src={tool.logo} 
                      alt={tool.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Desktop Version */}
                  <div
                    className="absolute hidden lg:block pointer-events-none w-16 h-16 bg-white/15 backdrop-blur-sm rounded-xl p-0 hover:bg-white/25 transition-all duration-300"
                    style={{
                      left: `calc(50% + ${tool.x.desktop}px)`,
                      top: `calc(50% + ${tool.y.desktop}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <img 
                      src={tool.logo} 
                      alt={tool.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}

              {/* Bottom row - Three cards as final pyramid row on mobile */}
              {/* Mobile: Horizontal rectangles as pyramid base */}
              <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-20 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center">
                  <h4 className="font-bold text-xs mb-1">SEO</h4>
                  <p className="text-xs opacity-90">Mastery</p>
                </div>
                <div className="w-20 p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg text-center">
                  <h4 className="font-bold text-xs mb-1">LLM</h4>
                  <p className="text-xs opacity-90">Integration</p>
                </div>
                <div className="w-20 p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg text-center">
                  <h4 className="font-bold text-xs mb-1">Event</h4>
                  <p className="text-xs opacity-90">Tech</p>
                </div>
              </div>
              
              {/* Desktop: Original layout */}
              <div className="hidden lg:block">
                <div className="floating-card absolute w-40 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl" 
                     style={{ 
                       left: 'calc(50% - 320px)', 
                       bottom: '60px'
                     }}>
                  <h4 className="font-bold text-lg mb-2">SEO Mastery</h4>
                  <p className="text-sm opacity-90">Boost rankings</p>
                </div>

                <div className="floating-card absolute left-1/2 transform -translate-x-1/2 w-44 p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl"
                     style={{ bottom: '60px' }}>
                  <h4 className="font-bold text-lg mb-2">LLM Integration</h4>
                  <p className="text-sm opacity-90">AI-powered apps</p>
                </div>

                <div className="floating-card absolute w-40 p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl"
                     style={{ 
                       right: 'calc(50% - 320px)', 
                       bottom: '60px'
                     }}>
                  <h4 className="font-bold text-lg mb-2">Event Tech</h4>
                  <p className="text-sm opacity-90">Engage audiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="articles" className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 fade-in ${visibleCards.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-800`} data-index="0">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-400">Practical guides for modern web professionals</p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            
            {/* Featured Article */}
            <Link
              to="/blog/technical-seo-guide-2024"
              className={`fade-in break-inside-avoid mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer block ${visibleCards.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
              data-index="1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/blog-heroes/technical-seo/hero.jpg"
                  alt="Technical SEO optimization dashboard showing Core Web Vitals metrics and performance improvements"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden">
                  <StockImagePlaceholder 
                    type="technical-seo"
                    className="w-full h-full"
                    alt="Technical SEO optimization dashboard showing Core Web Vitals metrics and performance improvements"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold">SEO</span>
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold">Featured</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">The Complete Guide to Technical SEO in 2024</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Master Core Web Vitals, structured data, and advanced optimization techniques that actually move the needle on search rankings for Toronto businesses.
                </p>
                <div className="flex justify-between items-center mb-4 text-white/70 text-sm">
                  <span>15 min read</span>
                  <span>2.4k views</span>
                </div>
                <div className="text-white font-semibold hover:underline">
                  Read complete technical SEO guide →
                </div>
              </div>
            </Link>

            {/* LLM Article */}
            <Link
              to="/blog/llm-web-apps-optimization"
              className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer block ${visibleCards.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
              data-index="2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/blog-heroes/llm-optimization/hero.jpg"
                  alt="AI-powered web application architecture diagram showing LLM integration and cost optimization"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden">
                  <StockImagePlaceholder 
                    type="llm-optimization"
                    className="w-full h-full"
                    alt="AI-powered web application architecture diagram showing LLM integration and cost optimization"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">AI/LLM</span>
                  <span className="text-gray-500 text-sm">March 20, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Building LLM-Powered Web Apps: Performance & Cost Optimization</h3>
                <p className="text-gray-300 mb-4">
                  Learn advanced strategies for AI web applications, reduce LLM API costs by 73%, and implement intelligent caching for Toronto businesses.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>12 min read</span>
                  <span>1.8k views</span>
                </div>
                <div className="text-blue-400 font-semibold hover:underline">
                  Explore LLM integration strategies →
                </div>
              </div>
            </Link>

            {/* Interactive Components */}
            <Link
              to="/blog/interactive-web-experiences"
              className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer block ${visibleCards.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
              data-index="3"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/blog-heroes/micro-interactions/hero.jpg"
                  alt="Interactive web interface showcasing micro-interactions and user engagement elements"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden">
                  <StockImagePlaceholder 
                    type="micro-interactions"
                    className="w-full h-full"
                    alt="Interactive web interface showcasing micro-interactions and user engagement elements"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-blue-500/40" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold">React</span>
                  <span className="text-gray-500 text-sm">March 18, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Creating Micro-Interactions That Convert</h3>
                <p className="text-gray-300 mb-4">
                  Master React development services for interactive web experiences. Build conversion-focused micro-interactions that boost engagement rates by 15-30%.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>8 min read</span>
                  <span>2.2k views</span>
                </div>
                <div className="text-blue-400 font-semibold hover:underline">
                  Learn interactive design patterns →
                </div>
              </div>
            </Link>

            {/* Event Technology */}
            <article className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer ${visibleCards.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} data-index="4">
              <div className="h-56 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-5xl">
                🎪
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold">Event Tech</span>
                  <span className="text-gray-500 text-sm">March 15, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Custom Event Platforms: Engaging Attendees with Interactive Technology</h3>
                <p className="text-gray-300 mb-4">
                  Build immersive event experiences with real-time polling, networking features, and gamification.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>18 min read</span>
                  <span>2.1k views</span>
                </div>
                <a href="#" className="text-blue-400 font-semibold hover:underline">Explore Ideas →</a>
              </div>
            </article>

            {/* Performance Article */}
            <article className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer ${visibleCards.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} data-index="5">
              <div className="h-48 bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-4xl">
                ⚡
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">Performance</span>
                  <span className="text-gray-500 text-sm">March 12, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Lighthouse Score 100: A Step-by-Step Optimization Journey</h3>
                <p className="text-gray-300 mb-4">
                  Achieve perfect Lighthouse scores with proven optimization techniques and performance monitoring strategies.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>10 min read</span>
                  <span>3.2k views</span>
                </div>
                <a href="#" className="text-blue-400 font-semibold hover:underline">Optimize Now →</a>
              </div>
            </article>

            {/* CSS Article */}
            <article className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer ${visibleCards.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} data-index="6">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl">
                🎨
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">CSS</span>
                  <span className="text-gray-500 text-sm">March 10, 2024</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">CSS Container Queries: The Future is Here</h3>
                <p className="text-gray-300 mb-4">Revolutionary responsive design patterns with container queries.</p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>6 min read</span>
                  <span>980 views</span>
                </div>
                <a href="#" className="text-blue-400 font-semibold hover:underline">Learn →</a>
              </div>
            </article>

            {/* WebGL Article */}
            <article className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer ${visibleCards.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} data-index="7">
              <div className="h-52 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-5xl">
                🌐
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold">WebGL</span>
                  <span className="text-gray-500 text-sm">March 8, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">3D Product Showcases: WebGL for E-commerce</h3>
                <p className="text-gray-300 mb-4">
                  Create immersive 3D product experiences that boost conversion rates and reduce return rates.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>14 min read</span>
                  <span>1.8k views</span>
                </div>
                <a href="#" className="text-blue-400 font-semibold hover:underline">Build 3D →</a>
              </div>
            </article>

            {/* Mobile SEO Article */}
            <article className={`fade-in break-inside-avoid mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer ${visibleCards.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} data-index="8">
              <div className="h-40 bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl">
                📱
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold">Mobile SEO</span>
                  <span className="text-gray-500 text-sm">March 5, 2024</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">Mobile-First Indexing: What Developers Need to Know</h3>
                <p className="text-gray-300 mb-4">
                  Essential mobile optimization strategies for better search visibility.
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                  <span>7 min read</span>
                  <span>1.1k views</span>
                </div>
                <a href="#" className="text-blue-400 font-semibold hover:underline">Optimize →</a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 z-50"
      >
        ↑
      </a>

      <style jsx>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}