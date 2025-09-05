import React from 'react';

interface StockImagePlaceholderProps {
  type: 'technical-seo' | 'llm-optimization' | 'micro-interactions';
  className?: string;
  alt: string;
}

export default function StockImagePlaceholder({ type, className = '', alt }: StockImagePlaceholderProps) {
  const getPlaceholderContent = () => {
    switch (type) {
      case 'technical-seo':
        return (
          <div className={`relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 ${className}`}>
            {/* Dashboard-style overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              {/* Top metrics bar */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <div className="text-green-400 font-bold text-sm">Core Web Vitals</div>
                    <div className="text-white text-xs">LCP: 1.2s • FID: 45ms • CLS: 0.05</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <div className="text-blue-400 font-bold text-sm">Performance</div>
                    <div className="text-white text-xs">Score: 98/100</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-white/80 text-xs">SEO Optimization</div>
                  <div className="text-green-400 font-bold text-lg">+300%</div>
                  <div className="text-white/60 text-xs">Traffic Increase</div>
                </div>
              </div>
              
              {/* Bottom graph representation */}
              <div className="space-y-2">
                <div className="flex items-end gap-1 h-12">
                  {[20, 35, 45, 60, 80, 95, 85, 90].map((height, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t opacity-80"
                      style={{ height: `${height}%`, width: '12px' }}
                    />
                  ))}
                </div>
                <div className="text-white/60 text-xs">Technical SEO Metrics Over Time</div>
              </div>
            </div>
            
            {/* Geometric overlay */}
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
        );
        
      case 'llm-optimization':
        return (
          <div className={`relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 ${className}`}>
            {/* AI Architecture Diagram */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top: Cost savings metric */}
              <div className="flex justify-between items-start">
                <div className="bg-black/30 backdrop-blur rounded-lg px-4 py-2">
                  <div className="text-green-400 font-bold text-sm">Cost Reduction</div>
                  <div className="text-white text-2xl font-bold">-73%</div>
                </div>
                <div className="bg-black/30 backdrop-blur rounded-lg px-4 py-2">
                  <div className="text-blue-400 font-bold text-sm">Response Time</div>
                  <div className="text-white text-lg">&lt;200ms</div>
                </div>
              </div>
              
              {/* Middle: Architecture flow */}
              <div className="flex justify-center items-center space-x-4">
                <div className="w-12 h-12 bg-blue-400/80 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">API</span>
                </div>
                <div className="w-8 border-t-2 border-white/40 border-dashed"></div>
                <div className="w-16 h-16 bg-purple-400/80 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xs">LLM</span>
                </div>
                <div className="w-8 border-t-2 border-white/40 border-dashed"></div>
                <div className="w-12 h-12 bg-pink-400/80 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Cache</span>
                </div>
              </div>
              
              {/* Bottom: Performance metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold text-lg">90%</div>
                  <div className="text-white/60 text-xs">Cache Hit Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">2.1M</div>
                  <div className="text-white/60 text-xs">Requests/Month</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">$0.02</div>
                  <div className="text-white/60 text-xs">Cost per Request</div>
                </div>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-6 w-full h-full gap-1">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="bg-white/20 rounded" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'micro-interactions':
        return (
          <div className={`relative bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 ${className}`}>
            {/* Interactive UI Elements */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              {/* Top: Conversion metrics */}
              <div className="flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                  <div className="text-green-400 font-bold text-sm">Conversion Rate</div>
                  <div className="text-white text-xl font-bold">+15-30%</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                  <div className="text-blue-400 font-bold text-sm">Engagement</div>
                  <div className="text-white text-lg">↑ 85%</div>
                </div>
              </div>
              
              {/* Middle: Interactive elements mockup */}
              <div className="space-y-4">
                {/* Button states */}
                <div className="flex space-x-3">
                  <div className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors">
                    Idle
                  </div>
                  <div className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm font-medium scale-95">
                    Active
                  </div>
                  <div className="bg-green-500 px-4 py-2 rounded-lg text-white text-sm font-medium">
                    Success ✓
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full" style={{ width: '75%' }}>
                    <div className="w-6 h-2 bg-white/30 rounded-full ml-auto animate-pulse"></div>
                  </div>
                </div>
                
                {/* Form field */}
                <div className="relative">
                  <div className="bg-white/10 border-2 border-green-400 rounded-lg px-3 py-2 text-white text-sm">
                    user@example.com
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-400">✓</div>
                </div>
              </div>
              
              {/* Bottom: Psychology note */}
              <div className="text-center">
                <div className="text-white/80 text-xs bg-black/20 rounded-lg px-3 py-2">
                  🧠 Psychology-driven design patterns
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-cyan-300/60 rounded-full animate-ping"></div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden" title={alt}>
      {getPlaceholderContent()}
    </div>
  );
}