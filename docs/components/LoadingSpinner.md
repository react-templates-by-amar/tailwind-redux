# LoadingSpinner Component

A customizable loading spinner component for indicating loading states.

## Import

```tsx
import { LoadingSpinner } from '@/components/ui';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the spinner |
| `className` | `string` | `undefined` | Additional CSS classes to apply |

*Plus all standard HTML div attributes*

## Sizes

- **sm**: Small spinner (16px × 16px with 2px border)
- **md**: Medium spinner (32px × 32px with 2px border)
- **lg**: Large spinner (48px × 48px with 4px border)

## Examples

### Basic Usage

```tsx
<LoadingSpinner />
```

### Different Sizes

```tsx
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

### Custom Color

```tsx
<LoadingSpinner className="text-blue-500" />
```

### With Text

```tsx
<div className="flex flex-col items-center gap-2">
  <LoadingSpinner />
  <p>Loading data...</p>
</div>
```

### In a Button

```tsx
<button className="flex items-center gap-2" disabled>
  <LoadingSpinner size="sm" />
  Processing...
</button>
```

## Accessibility

The LoadingSpinner component includes a screen reader-only text "Loading..." to ensure accessibility for users with assistive technologies.

## Implementation Details

- Uses CSS animations for the spinning effect
- Built with Tailwind CSS classes
- Uses the `cn` utility for merging class names
- Properly set up with ARIA attributes for accessibility
