import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'stable' | 'empirical' | 'in-progress' | 'archived' | 'outline';
  className?: string;
}

/**
 * Status badge component
 */
export function Badge({ children, variant = 'stable', className = '' }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

  const variantClasses = {
    stable: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    empirical: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'in-progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    outline: 'border border-neutral-200 text-neutral-800 dark:border-neutral-700 dark:text-neutral-300',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
