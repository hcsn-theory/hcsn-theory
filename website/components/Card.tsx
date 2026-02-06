import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Card component for content sections
 */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-md-outline bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
