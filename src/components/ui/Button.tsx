import { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { ButtonProps } from '@/types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const buttonClasses = clsx(
      // Base styles
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50',

      // Variants
      {
        'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600':
          variant === 'primary',
        'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600':
          variant === 'secondary',
        'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800':
          variant === 'outline',
      },

      // Sizes
      {
        'h-8 px-3 text-xs': size === 'sm',
        'h-10 px-4 py-2': size === 'md',
        'h-12 px-6 py-3 text-lg': size === 'lg',
      },

      // Additional classes
      className
    );

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// Add display name for better debugging in React DevTools
Button.displayName = 'Button';
