import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CodePlaygroundProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  preview: React.ReactNode;
  height?: string;
}

export default function CodePlayground({ 
  title, 
  description, 
  code, 
  language = 'tsx',
  preview, 
  height = 'auto' 
}: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700/50">
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
        
        {/* Tab Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'preview'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'code'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Code
            </button>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ height: isExpanded ? 'auto' : height }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-0 min-h-[400px]">
          {/* Mobile Tab View */}
          <div className="lg:hidden">
            {activeTab === 'preview' ? (
              <div className="p-6 bg-gray-900/50 min-h-[400px] flex items-center justify-center">
                <div className="w-full max-w-md">
                  {preview}
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="p-6 bg-black/50 text-green-400 text-sm overflow-x-auto leading-relaxed font-mono">
                  <code>{code}</code>
                </pre>
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-gray-700/50 text-xs text-gray-400 rounded">
                    {language}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Split View */}
          <div className="hidden lg:block relative">
            <pre className="p-6 bg-black/50 text-green-400 text-sm overflow-x-auto leading-relaxed font-mono h-full">
              <code>{code}</code>
            </pre>
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-gray-700/50 text-xs text-gray-400 rounded">
                {language}
              </span>
            </div>
          </div>

          <div className="hidden lg:block p-6 bg-gray-900/50 border-l border-gray-700/50 flex items-center justify-center">
            <div className="w-full max-w-md">
              {preview}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-700/20 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Interactive example • Click to explore</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}