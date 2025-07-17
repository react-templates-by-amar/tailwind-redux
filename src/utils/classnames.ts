import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining class names with Tailwind CSS
 * Handles class conflicts and merges them properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
