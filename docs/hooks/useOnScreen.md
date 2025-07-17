# useOnScreen

A hook that detects when an element is in the viewport using the Intersection Observer API.

## Usage

```typescript
import { useRef } from 'react';
import { useOnScreen } from '@/hooks';

function ScrollComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px'); // 100px before element enters viewport

  return (
    <div style={{ height: '150vh' }}>
      <div style={{ height: '100vh' }}>Scroll down...</div>
      
      <div
        ref={ref}
        style={{
          height: '100px',
          background: isVisible ? 'lightgreen' : 'salmon',
          transition: 'background 0.5s',
        }}
      >
        {isVisible ? 'Visible!' : 'Not visible'}
      </div>
    </div>
  );
}
```

## API

### Parameters

- `ref` (RefObject): A React ref object pointing to the element to observe
- `rootMargin` (string, optional): Margin around the root (default: '0px')
- `threshold` (number | number[], optional): Percentage of the target element that must be visible (default: 0)

### Returns

- `isVisible` (boolean): Whether the element is currently in the viewport

## Example: Lazy Loading Images

```typescript
function LazyImage({ src, alt }) {
  const ref = useRef<HTMLImageElement>(null);
  const isVisible = useOnScreen(ref);
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} style={{ minHeight: '200px' }}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
          onLoad={() => setLoaded(true)}
        />
      )}
      {!loaded && <div>Loading image...</div>}
    </div>
  );
}
```

## Performance Considerations

- Uses Intersection Observer API for optimal performance
- Automatically cleans up the observer when the component unmounts
- Root margin can be used to trigger the visibility change before the element enters the viewport
- For multiple elements, create a separate instance of the hook for each element
