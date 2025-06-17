import React, { useState } from 'react';

// 3D Laptop Component for showcasing websites
const Laptop3D = ({ url, title, description }: { url: string; title: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative transform transition-all duration-700 preserve-3d ${
        isHovered ? 'rotate-x-5 rotate-y-12 scale-105' : 'rotate-x-2 rotate-y-5'
      }`}>
        {/* Laptop Base */}
        <div className="relative w-80 h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
          {/* Laptop Screen */}
          <div className="absolute -top-48 left-4 right-4 h-48 bg-gradient-to-br from-gray-900 to-black rounded-t-lg border-4 border-gray-700 shadow-xl transform origin-bottom rotate-x-15">
            {/* Screen Bezel */}
            <div className="absolute inset-2 bg-black rounded border border-gray-600 overflow-hidden">
              {/* Browser Chrome */}
              <div className="h-8 bg-gray-800 flex items-center px-3 border-b border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xs text-gray-300 font-medium">{title}</div>
                </div>
                <div className="text-xs text-green-400">● LIVE</div>
              </div>
              
              {/* Website Content */}
              <div className="h-40 overflow-hidden">
                <iframe
                  src={url}
                  className="w-full h-full border-none transform scale-100 origin-top-left"
                  title={title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
              </div>
            </div>
            
            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded opacity-30"></div>
          </div>
          
          {/* Keyboard */}
          <div className="absolute top-4 left-8 right-8 bottom-4 bg-gray-700 rounded">
            <div className="grid grid-cols-12 gap-1 p-3">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-600 rounded-sm"></div>
              ))}
            </div>
            {/* Trackpad */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gray-600 rounded border border-gray-500"></div>
          </div>
          
          {/* Laptop Shadow */}
          <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 rounded-full blur-lg transform scale-95"></div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

// 3D Phone Component for mobile showcases
const Phone3D = ({ url, title, description }: { url: string; title: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative transform transition-all duration-700 preserve-3d ${
        isHovered ? 'rotate-y-12 scale-110' : 'rotate-y-5'
      }`}>
        {/* Phone Body */}
        <div className="relative w-48 h-80 bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl border-4 border-gray-800">
          {/* Screen */}
          <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden border border-gray-700">
            {/* Status Bar */}
            <div className="h-6 bg-black flex items-center justify-between px-4 text-xs text-white">
              <span>9:41</span>
              <div className="flex space-x-1">
                <span>📶</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            
            {/* App Header */}
            <div className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-white font-semibold text-sm">{title}</div>
            </div>
            
            {/* Mobile Content */}
            <div className="h-56 overflow-hidden">
              <iframe
                src={url}
                className="w-96 h-full border-none transform scale-50 origin-top-left"
                title={`${title} - Mobile`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </div>
          
          {/* Camera Notch */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-full"></div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
          
          {/* Phone Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl"></div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="relative z-10 pointer-events-none">
      {/* Hero Section - Improved Text Readability */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="text-center max-w-6xl pointer-events-auto">
          {/* Enhanced backdrop for better text readability */}
          <div className="relative">
            <div className="absolute -inset-16 bg-black/60 backdrop-blur-xl rounded-3xl"></div>
            <div className="absolute -inset-12 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-transparent rounded-2xl"></div>
            <div className="absolute -inset-8 bg-black/40 backdrop-blur-sm rounded-xl"></div>
            
            <div className="relative p-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
                <span className="block font-extralight text-white drop-shadow-2xl mb-2">FUSION</span>
                <span className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
                  INTERACTIVE
                </span>
              </h1>
              
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-white drop-shadow-lg font-light leading-relaxed mb-6">
                  Transforming businesses through cutting-edge technology and immersive digital experiences
                </p>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg font-light leading-relaxed">
                  Custom web applications • AI-powered solutions • Interactive event technology • Virtual production
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <button className="group px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-white">
                  <span className="flex items-center justify-center">
                    Explore Our Work
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button className="px-10 py-4 border-2 border-white/30 rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 text-white">
                  Start Your Project
                </button>
              </div>
              
              {/* Professional Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { number: '500+', label: 'Projects Delivered', accent: 'from-cyan-400 to-blue-500' },
                  { number: '150+', label: 'Happy Clients', accent: 'from-purple-400 to-violet-500' },
                  { number: '10+', label: 'Years Experience', accent: 'from-green-400 to-emerald-500' },
                  { number: '24/7', label: 'Support Available', accent: 'from-orange-400 to-red-500' }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent mb-2 drop-shadow-lg`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-200 text-sm md:text-base font-light drop-shadow-lg">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development Showcase */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="text-center mb-16">
            <div className="relative">
              <div className="absolute -inset-8 bg-black/50 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative p-8">
                <h2 className="text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
                  Web Development Excellence
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg mb-8 max-w-4xl mx-auto font-light leading-relaxed">
                  Custom web applications built with cutting-edge technology, optimized for performance and designed for success.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Laptop3D 
                url="https://www.fusion-events.ca"
                title="Fusion Events Premium Website"
                description="Professional event services website with integrated booking system, portfolio showcase, and conversion optimization."
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-3xl font-semibold text-white mb-6 drop-shadow-lg">Enterprise Web Solutions</h3>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed drop-shadow-lg">
                  We create sophisticated web applications that drive business growth. From corporate websites to 
                  complex web applications, our solutions are built to scale and perform.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Custom CRM and business management systems',
                    'E-commerce platforms with advanced features',
                    'Progressive Web Apps (PWAs)',
                    'API development and third-party integrations',
                    'Performance optimization and SEO'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-200 drop-shadow-lg">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:scale-105 transition-all duration-300">
                  View Web Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Technology Showcase */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="text-center mb-16">
            <div className="relative">
              <div className="absolute -inset-8 bg-black/50 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative p-8">
                <h2 className="text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
                  Interactive Event Technology
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg mb-8 max-w-4xl mx-auto font-light leading-relaxed">
                  Revolutionary event experiences that engage audiences and create unforgettable moments.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <Laptop3D 
                url="https://selfieholosphere.com/collage/1lr9qn"
                title="3D Selfie Holosphere"
                description="Immersive 3D photo collage experience with real-time photo processing and customizable animations."
              />
            </div>
            
            <div className="text-center">
              <Phone3D 
                url="https://capable-alfajores-d0dff2.netlify.app/"
                title="Mobile Event App"
                description="Comprehensive event management with attendee tracking, real-time updates, and interactive features."
              />
            </div>
            
            <div className="text-center">
              <Laptop3D 
                url="http://urequestsongs.com"
                title="U Request Songs Platform"
                description="Interactive DJ platform allowing real-time song requests with crowd voting and engagement tracking."
              />
            </div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-3xl font-semibold text-white mb-6 drop-shadow-lg">Event Technology Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎪',
                  title: 'Interactive Installations',
                  description: 'Custom interactive experiences that respond to guest participation and create memorable moments.'
                },
                {
                  icon: '📱',
                  title: 'Event Mobile Apps',
                  description: 'Branded mobile applications with real-time updates, networking, and engagement features.'
                },
                {
                  icon: '🎵',
                  title: 'Live Entertainment Tech',
                  description: 'DJ platforms, live streaming solutions, and audience participation systems.'
                }
              ].map((service, idx) => (
                <div key={idx} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">{service.title}</h4>
                  <p className="text-gray-200 text-sm leading-relaxed drop-shadow-lg">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI & Custom Solutions */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="text-center mb-16">
            <div className="relative">
              <div className="absolute -inset-8 bg-black/50 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative p-8">
                <h2 className="text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
                  AI-Powered Solutions
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg mb-8 max-w-4xl mx-auto font-light leading-relaxed">
                  Intelligent systems that automate processes, provide insights, and enhance user experiences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-3xl font-semibold text-white mb-6 drop-shadow-lg">Custom AI Applications</h3>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed drop-shadow-lg">
                  We develop AI solutions that solve real business problems. From chatbots to predictive analytics, 
                  our AI implementations provide tangible value and competitive advantages.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Intelligent chatbots and virtual assistants',
                    'Predictive analytics and business intelligence',
                    'Computer vision and image processing',
                    'Natural language processing applications',
                    'Machine learning model development'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-200 drop-shadow-lg">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-medium text-white hover:scale-105 transition-all duration-300">
                  Explore AI Solutions
                </button>
              </div>
            </div>
            
            <div>
              <Laptop3D 
                url="https://splendid-cannoli-324007.netlify.app/"
                title="Custom Analytics Dashboard"
                description="AI-powered business intelligence platform with real-time data processing and predictive insights."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Applications */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="text-center mb-16">
            <div className="relative">
              <div className="absolute -inset-8 bg-black/50 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative p-8">
                <h2 className="text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
                  Mobile Excellence
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg mb-8 max-w-4xl mx-auto font-light leading-relaxed">
                  Native performance with cross-platform efficiency for iOS and Android applications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <Phone3D 
                url="https://lucky-centaur-ce715c.netlify.app/"
                title="Interactive Mobile Experience"
                description="Engaging mobile application with seamless user experience and real-time features."
              />
            </div>
            
            <div className="flex items-center">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">Mobile App Development</h3>
                <p className="text-gray-200 mb-6 leading-relaxed drop-shadow-lg">
                  We create mobile applications that users love. Our apps combine beautiful design with 
                  powerful functionality and seamless performance.
                </p>
                <ul className="space-y-3">
                  {[
                    'React Native development',
                    'Native iOS and Android',
                    'Cross-platform solutions',
                    'App Store optimization',
                    'Backend integration'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-200 text-sm drop-shadow-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Phone3D 
                url="https://magnificent-semifreddo-123456.netlify.app/"
                title="Business Mobile App"
                description="Professional mobile application with CRM integration and business management features."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-5xl w-full text-center pointer-events-auto">
          <div className="relative">
            <div className="absolute -inset-12 bg-black/60 backdrop-blur-xl rounded-3xl"></div>
            <div className="relative p-12">
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 drop-shadow-2xl">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg mb-12 font-light leading-relaxed">
                Let's discuss how we can bring your vision to life with innovative technology solutions 
                that drive engagement, increase conversions, and deliver measurable results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  Start Your Project Today
                </button>
                <button className="px-10 py-4 border-2 border-white/30 rounded-full font-medium text-lg text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-5 {
          transform: rotateX(5deg);
        }
        .rotate-x-2 {
          transform: rotateX(2deg);
        }
        .rotate-x-15 {
          transform: rotateX(-15deg);
        }
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
      `}</style>
    </div>
  );
}