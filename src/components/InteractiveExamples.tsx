import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Smart Button Example
export function SmartButtonExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    setIsLoading(false);
    
    // Reset after success animation
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        className="relative overflow-hidden rounded-full px-8 py-3 font-bold text-white min-w-[160px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          backgroundColor: isSuccess ? '#10B981' : '#3B82F6',
        }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        disabled={isLoading || isSuccess}
      >
        <motion.div
          animate={{
            opacity: isLoading || isSuccess ? 0 : 1,
            y: isLoading || isSuccess ? -20 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          Get Started
        </motion.div>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </motion.button>
      
      <p className="text-sm text-gray-400 text-center">
        Click to see loading → success states
      </p>
    </div>
  );
}

// Form Validation Example
export function FormValidationExample() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsDirty(true);
    
    if (value.length > 0) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <motion.input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 ${
            isValid === null ? 'border-gray-600 focus:border-blue-400' :
            isValid ? 'border-green-400' : 'border-yellow-400'
          }`}
          animate={{
            borderColor: 
              isValid === null ? '#4B5563' :
              isValid ? '#10B981' : '#F59E0B'
          }}
        />
        
        {isValid !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {isValid ? (
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </motion.div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isDirty && isValid === false ? 1 : 0,
          height: isDirty && isValid === false ? 'auto' : 0
        }}
        className="overflow-hidden"
      >
        <p className="text-yellow-400 text-sm mt-2 px-1">
          Please enter a valid email address
        </p>
      </motion.div>
      
      <p className="text-sm text-gray-400 mt-3 text-center">
        Type to see real-time validation
      </p>
    </div>
  );
}

// Hover Card Example
export function HoverCardExample() {
  return (
    <div className="flex justify-center">
      <motion.div
        className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 cursor-pointer max-w-sm"
        whileHover={{ 
          scale: 1.05,
          rotate: 1,
          boxShadow: "0 20px 40px rgba(139, 69, 19, 0.3)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          whileHover={{ y: -2 }}
        >
          Hover Me!
        </motion.h3>
        <motion.p 
          className="text-purple-100"
          whileHover={{ y: -1 }}
          transition={{ delay: 0.1 }}
        >
          This card responds to your mouse with smooth animations that feel natural and engaging.
        </motion.p>
        <motion.div 
          className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden"
          whileHover={{ scaleX: 1.02 }}
        >
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: "60%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Progress Animation Example
export function ProgressAnimationExample() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startAnimation = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const reset = () => {
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Upload Progress</span>
          <span className="text-blue-400">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {progress > 0 && progress < 100 && (
              <motion.div
                className="absolute right-0 top-0 h-full w-8 bg-white/30"
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
          </motion.div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={startAnimation}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isRunning 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRunning ? 'Uploading...' : 'Start Upload'}
        </button>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-500 transition-all"
        >
          Reset
        </button>
      </div>
      
      <p className="text-sm text-gray-400 text-center">
        Click "Start Upload" to see progress animation
      </p>
    </div>
  );
}