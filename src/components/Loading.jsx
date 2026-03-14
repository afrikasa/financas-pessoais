import React from 'react';
import { motion } from 'framer-motion';

// Skeleton base component
const Skeleton = ({ className = '', animate = true }) => {
  return (
    <div
      className={`
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        rounded
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
    />
  );
};

// Shimmer effect skeleton (more modern)
const ShimmerSkeleton = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded ${className}`}>
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear'
        }}
      />
    </div>
  );
};

// Card Skeleton (for dashboard cards)
export const CardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-800"
    >
      {/* Icon skeleton */}
      <ShimmerSkeleton className="w-12 h-12 rounded-xl mb-4" />
      
      {/* Title skeleton */}
      <ShimmerSkeleton className="h-4 w-24 mb-3" />
      
      {/* Value skeleton */}
      <ShimmerSkeleton className="h-8 w-32" />
    </motion.div>
  );
};

// Transaction List Skeleton
export const TransactionListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          {/* Icon */}
          <ShimmerSkeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          
          <div className="flex-1 space-y-2">
            {/* Description */}
            <ShimmerSkeleton className="h-4 w-40" />
            {/* Date */}
            <ShimmerSkeleton className="h-3 w-24" />
          </div>
          
          {/* Amount */}
          <ShimmerSkeleton className="h-6 w-20" />
        </motion.div>
      ))}
    </div>
  );
};

// Chart Skeleton
export const ChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-800"
    >
      {/* Title */}
      <ShimmerSkeleton className="h-6 w-48 mb-6" />
      
      {/* Chart area */}
      <div className="h-64 flex items-end justify-between gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <ShimmerSkeleton
            key={i}
            className="flex-1"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Account Card Skeleton
export const AccountCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800"
        >
          {/* Icon */}
          <ShimmerSkeleton className="w-12 h-12 rounded-xl mb-4" />
          
          {/* Account name */}
          <ShimmerSkeleton className="h-5 w-32 mb-3" />
          
          {/* Balance */}
          <ShimmerSkeleton className="h-7 w-24" />
        </motion.div>
      ))}
    </div>
  );
};

// Spinner Loading (for buttons and inline loading)
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4'
  };

  return (
    <motion.div
      className={`
        ${sizes[size]}
        border-gray-200 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400
        rounded-full
        ${className}
      `}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

// Dots Loading (alternative to spinner)
export const DotsLoading = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const dotSize = sizes[size];

  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${dotSize} rounded-full bg-blue-600 dark:bg-blue-400`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Progress Bar
export const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

// Full page loading overlay
export const LoadingOverlay = ({ message = 'A carregar...', show = true }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4"
      >
        <Spinner size="xl" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
      </motion.div>
    </motion.div>
  );
};

// Button with loading state
export const LoadingButton = ({ 
  loading = false, 
  children, 
  onClick,
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        ${loading ? 'cursor-wait' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
    </button>
  );
};

// Pulse loading indicator
export const PulseLoader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} rounded-full bg-blue-500/20 dark:bg-blue-400/20 absolute`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className={`${sizes[size]} rounded-full bg-blue-500 dark:bg-blue-400`}
        animate={{
          scale: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default {
  CardSkeleton,
  TransactionListSkeleton,
  ChartSkeleton,
  AccountCardSkeleton,
  Spinner,
  DotsLoading,
  ProgressBar,
  LoadingOverlay,
  LoadingButton,
  PulseLoader,
  ShimmerSkeleton,
  Skeleton
};
