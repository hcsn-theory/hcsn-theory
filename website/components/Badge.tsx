import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'stable' | 'empirical' | 'in-progress' | 'archived';
  className?: string;
}

/**
 * Status badge component
 */
export function Badge({ children, variant = 'stable', className = '' }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

  const variantClasses = {
    stable: 'bg-green-100 text-green-800',
    empirical: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
