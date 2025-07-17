# Button Component

A customizable button component with various styles and sizes.

## Import

```tsx
import { Button } from '@/components/ui';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | The visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the button |
| `className` | `string` | `undefined` | Additional CSS classes to apply |
| `children` | `React.ReactNode` | - | The content of the button |

*Plus all standard HTML button attributes*

## Variants

- **primary**: Filled button with primary color background
- **secondary**: Filled button with gray background
- **outline**: Transparent button with border

## Sizes

- **sm**: Small button (height: 32px)
- **md**: Medium button (height: 40px)
- **lg**: Large button (height: 48px)

## Examples

### Basic Usage

```tsx
<Button>Default Button</Button>
```

### Variants

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
```

### Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

### With Icon

```tsx
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

## Styling

The Button component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Passing additional classes via the `className` prop
2. Modifying the component source code in `src/components/ui/Button.tsx`
