# useWindowSize

A hook that tracks and returns the dimensions of the browser window.

## Usage

```typescript
import { useWindowSize } from '@/hooks';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
      
      {width < 768 ? (
        <div>Mobile view</div>
      ) : width < 1024 ? (
        <div>Tablet view</div>
      ) : (
        <div>Desktop view</div>
      )}
    </div>
  );
}
```

## API

### Returns

An object with:
- `width` (number): Current window width in pixels
- `height` (number): Current window height in pixels

## Example: Responsive Layout

```typescript
function ResponsiveLayout() {
  const { width } = useWindowSize();
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : isTablet ? (
        <TabletLayout />
      ) : (
        <DesktopLayout />
      )}
      
      <p>Current viewport: {width}px × {height}px</p>
    </div>
  );
}
```

## Performance Considerations

- Uses a debounced resize event listener for better performance
- Automatically cleans up the event listener when the component unmounts
- Initial size is detected on the client side
- Works with server-side rendering (SSR) - will return initial values on the server and update on the client
