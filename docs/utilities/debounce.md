# Debounce Utility

A utility function that delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked. This is particularly useful for rate-limiting events that fire more often than you'd like to handle.

## Import

```typescript
import { debounce, simpleDebounce } from '@/utils/debounce';
```

## `debounce<T extends (...args: any[]) => any>`

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

### Parameters

- `func` (Function): The function to debounce
- `wait` (Number, optional): The number of milliseconds to delay (default: `300`)
- `options` (Object, optional): Configuration options
  - `leading` (Boolean): Invoke the function on the leading edge of the timeout (default: `false`)
  - `maxWait` (Number): The maximum time `func` is allowed to be delayed before it's invoked

### Returns

(Function): Returns the new debounced function, which has an additional `cancel()` method to cancel delayed invocations.

### Example Usage

```typescript
import { debounce } from '@/utils/debounce';

// Basic usage
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
  // Your search logic here
}, 300);

// Usage with options
const debouncedSave = debounce(
  (data: any) => {
    console.log('Saving data:', data);
    // Your save logic here
  },
  500,
  { leading: true, maxWait: 2000 }
);

// Call the debounced function
debouncedSearch('react');

// Cancel the pending execution
debouncedSearch.cancel();
```

## `simpleDebounce<T extends (...args: any[]) => any>`

A lighter version of the debounce function that only handles the basic use case.

### Parameters

- `func` (Function): The function to debounce
- `wait` (Number, optional): The number of milliseconds to delay (default: `300`)

### Returns

(Function): Returns the new debounced function with a `cancel()` method.

### Example Usage

```typescript
import { simpleDebounce } from '@/utils/debounce';

const debouncedResize = simpleDebounce(() => {
  console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Later, to remove the event listener
window.removeEventListener('resize', debouncedResize);
```

## Key Features

1. **Leading Edge Invocation**: Option to invoke the function immediately on the leading edge of the timeout.
2. **Max Wait**: Ensures the function is called at least once every `maxWait` milliseconds.
3. **Cancellation**: Provides a `cancel()` method to cancel delayed invocations.
4. **Type Safety**: Fully typed with TypeScript for better development experience.

## Use Cases

- Search inputs that trigger API calls
- Window resize/scroll events
- Auto-save functionality
- Any expensive operation that should be limited during rapid successive calls

## Best Practices

1. **Choose appropriate wait times**: 
   - Shorter times (100-300ms) for UI interactions
   - Longer times (500-1000ms) for API calls

2. **Clean up**: Always remove event listeners when components unmount to prevent memory leaks.

3. **Error Handling**: Consider adding error handling inside your debounced functions.

## Implementation Notes

The debounce implementation is based on the Lodash debounce function but is implemented with TypeScript for better type safety and tree-shaking capabilities.
