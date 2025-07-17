# useToggle

A simple boolean state toggler hook.

## Usage

```typescript
import { useToggle } from '@/hooks';

function ToggleComponent() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isToggled ? 'ON' : 'OFF'}
      </button>
      <button onClick={() => toggle(true)}>Turn On</button>
      <button onClick={() => toggle(false)}>Turn Off</button>
    </div>
  );
}
```

## API

### Parameters

- `initialState` (boolean): The initial state (default: `false`)

### Returns

An array with:
1. `isToggled` (boolean): The current toggle state
2. `toggle` (function): Function to toggle or set the state
   - Can be called with a boolean to set a specific state
   - Called without arguments to toggle the current state

## Example: Toggle Visibility

```typescript
function ToggleVisibility() {
  const [isVisible, toggle] = useToggle(true);
  
  return (
    <div>
      <button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      {isVisible && <div>This content is now visible!</div>}
    </div>
  );
}
```
