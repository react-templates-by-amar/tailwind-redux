# useEventListener

A hook that simplifies adding event listeners to DOM elements, window, or document.

## Usage

```typescript
import { useRef } from 'react';
import { useEventListener } from '@/hooks';

function EventComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Listen to window events
  useEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
  });
  
  // Listen to element events
  useEventListener('click', (e) => {
    console.log('Button clicked!', e);
  }, buttonRef);

  return (
    <div>
      <button ref={buttonRef}>
        Click me or press any key
      </button>
      <p>Check console for events</p>
    </div>
  );
}
```

## API

### Parameters

- `eventName` (string): The name of the event to listen to (e.g., 'click', 'keydown')
- `handler` (function): The callback function to be called when the event is triggered
- `element` (RefObject | Window | Document, optional): The target element (default: `window`)
- `options` (object, optional): Options for the event listener (e.g., `{ passive: true }`)

### Returns

- None

## Example: Detect Clicks Outside an Element

```typescript
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEventListener('mousedown', (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Menu
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <p>Menu Item 1</p>
          <p>Menu Item 2</p>
          <p>Menu Item 3</p>
        </div>
      )}
    </div>
  );
}
```

## Performance Considerations

- Automatically cleans up event listeners when the component unmounts
- Uses a ref to always call the latest handler
- Supports both window/document events and element-specific events
- Works with TypeScript for better type safety
