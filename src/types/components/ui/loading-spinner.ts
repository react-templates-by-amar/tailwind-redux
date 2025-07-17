import type { HTMLAttributes } from 'react';
import type { ButtonSize } from './button';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ButtonSize;
}
