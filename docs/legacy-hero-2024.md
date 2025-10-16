# Legacy Hero Snapshot (Pre-2025 Refresh)

Saved on 2025-10-16 prior to the AI-focused hero redesign.

```tsx
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-8 pt-32 pb-16 pointer-events-none"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          willChange: 'transform, opacity, filter'
        }}
      >
        {/* Hero Content Container - Two Level Layout */}
        <div className="relative z-10 w-full max-w-7xl pointer-events-auto">
          
          {/* Centered Badge and Title Section */}
          <div className="text-center mb-8">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-white">AI-Assisted Digital Agency</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <AnimatedHeroTitle />
            </motion.h1>
          </div>

          {/* Content and Image Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content - Left of Image */}
            <div className="text-left max-w-2xl order-last lg:order-first">
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white mb-6 leading-relaxed font-medium italic text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(147,51,234,0.2)',
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 25%, #d1d5db 50%, #9ca3af 75%, #6b7280 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              While your competitors are stuck in <motion.span 
                className="font-bold not-italic"
                style={{
                  background: 'linear-gradient(180deg, #ff4500 0%, #ff6347 25%, #ffa500 50%, #ff8c00 75%, #dc143c 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  backgroundSize: '100% 400%'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '0% 50%', '0% 100%', '0% 50%', '0% 0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                development hell
              </motion.span>, we're launching <span className="font-bold not-italic bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">mind-blowing websites</span> in record time.
              <br />
              Don't get left behind—join the <span className="font-bold not-italic bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">AI revolution</span> and start <span className="font-bold not-italic bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">dominating your market</span> today.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.button
                className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                onClick={handleSeeOurWork}
              >
                See Our Work
              </motion.button>
              <motion.button
                className="px-6 py-2.5 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                onClick={handleStartProject}
              >
                Start a Project
              </motion.button>
            </motion.div>
            </div>

            {/* Image Content - Right Side */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative">
                <motion.img
                  src="/Website Images/Hero.png"
                  alt="AI Photo Booth Technology - Interactive engagement platform"
                  className="w-full max-w-2xl h-auto drop-shadow-2xl"
                  style={{
                    filter: `drop-shadow(0 25px 60px rgba(59, 130, 246, 0.3))`
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl backdrop-blur-sm border border-purple-400/30 flex items-center justify-center shadow-lg"
                  animate={{
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </div>
      </motion.section>
```
