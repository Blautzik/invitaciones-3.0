"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/lib/context';

const LoadingScreen = () => {
  const { state, enterSite } = useAppContext();
  const { isLoading, isEntered, error } = state;

  // If user has already entered the site, don't show loading screen
  if (isEntered) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isEntered ? 0 : 1,
        pointerEvents: isEntered ? 'none' : 'auto'
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <div className="container max-w-screen-md mx-auto px-6 py-12 text-center">
        {isLoading ? (
          <LoadingAnimation />
        ) : error ? (
          <ErrorState error={error} onRetry={() => window.location.reload()} />
        ) : (
          <EntryButton onEnter={enterSite} />
        )}
      </div>
    </motion.div>
  );
};

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="text-5xl md:text-7xl font-serif text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Ottografie
      </motion.div>

      <motion.div
        className="w-full max-w-xs h-px bg-white/20 relative overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-white"
          initial={{ width: "0%" }}
          animate={{
            width: ["0%", "100%", "0%"],
            left: ["0%", "0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Loading content...
      </motion.div>
    </div>
  );
};

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-2xl md:text-3xl font-serif text-white mb-6">
        Something went wrong
      </div>

      <div className="text-md text-white/60 mb-8">
        {error}
      </div>

      <motion.button
        className="px-8 py-3 border border-white text-white text-sm uppercase tracking-widest"
        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

const EntryButton = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="text-5xl md:text-7xl font-serif text-white mb-8">
        Ottografie
      </div>

      <div className="text-lg md:text-xl text-white/70 mb-16 max-w-md">
        Photography portfolio showcasing Chantal Janzen for FifthHouse
      </div>

      <motion.button
        className="px-12 py-4 border border-white text-white text-sm uppercase tracking-widest relative overflow-hidden group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEnter}
      >
        <motion.span
          className="absolute inset-0 bg-white w-0 z-0"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          Enter Site
        </span>
      </motion.button>
    </motion.div>
  );
};

export default LoadingScreen;
