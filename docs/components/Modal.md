# Modal Component

A flexible modal dialog component that renders using a React portal.

## Import

```tsx
import { Modal } from '@/components/ui';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `isOpen` | `boolean` | - | Controls whether the modal is displayed |
| `onClose` | `() => void` | - | Function called when the modal should close |
| `title` | `string` | `undefined` | Optional title to display in the modal header |
| `children` | `React.ReactNode` | - | The content of the modal |
| `className` | `string` | `undefined` | Additional CSS classes to apply to the modal container |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls the width of the modal |

## Sizes

- **sm**: Small modal (max-width: 384px)
- **md**: Medium modal (max-width: 448px)
- **lg**: Large modal (max-width: 512px)
- **xl**: Extra large modal (max-width: 672px)

## Examples

### Basic Usage

```tsx
import { useState } from 'react';
import { Modal } from '@/components/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <p>This is the modal content.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
}
```

### Using with useToggle Hook

```tsx
import { useToggle } from '@/hooks';
import { Modal } from '@/components/ui';

function MyComponent() {
  const [isOpen, toggle] = useToggle(false);
  
  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      
      <Modal isOpen={isOpen} onClose={toggle} title="Example Modal">
        <p>This is the modal content.</p>
        <button onClick={toggle}>Close</button>
      </Modal>
    </>
  );
}
```

### Different Sizes

```tsx
<Modal isOpen={isOpen} onClose={onClose} size="sm" title="Small Modal">
  <p>This is a small modal.</p>
</Modal>

<Modal isOpen={isOpen} onClose={onClose} size="lg" title="Large Modal">
  <p>This is a large modal with more content.</p>
</Modal>
```

### Custom Styling

```tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-50"
>
  <p>This modal has custom background and text colors.</p>
</Modal>
```

## Theme Support

The Modal component has built-in support for light and dark themes. It uses Tailwind's dark mode classes to adjust its appearance based on the current theme.

## Implementation Details

- Uses React's `createPortal` to render the modal outside the normal DOM hierarchy
- Includes a backdrop with click handler to close when clicking outside
- Prevents event propagation when clicking inside the modal
- Provides an accessible close button with an icon
