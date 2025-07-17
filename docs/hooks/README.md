# Custom React Hooks

This project includes several custom React hooks that can be used throughout your application.

## Available Hooks

- [useToggle](/docs/hooks/useToggle.md) - A simple boolean state toggler
- [useArray](/docs/hooks/useArray.md) - Manage arrays with helper methods
- [useLocalStorage & useSessionStorage](/docs/hooks/useStorage.md) - Persist state in browser storage
- [useOnScreen](/docs/hooks/useOnScreen.md) - Detect when elements are in the viewport
- [useWindowSize](/docs/hooks/useWindowSize.md) - Track window dimensions
- [useEventListener](/docs/hooks/useEventListener.md) - Subscribe to DOM events

## Installation

All hooks are available from the `@/hooks` import path:

```typescript
import { 
  useToggle,
  useArray,
  useLocalStorage,
  useSessionStorage,
  useOnScreen,
  useWindowSize,
  useEventListener
} from '@/hooks';
```

## TypeScript Support

All hooks are fully typed with TypeScript. The types are automatically inferred where possible, but you can also provide explicit types when needed:

```typescript
// Example with explicit types
const [items, { push }] = useArray<{ id: number; name: string }>([]);
const [user, setUser] = useLocalStorage<User>('user', { name: 'Guest' });
```

## Contributing

When adding new hooks:
1. Create a new `.ts` file in `src/hooks/`
2. Add TypeScript types
3. Document usage in the corresponding `.md` file in `docs/hooks/`
4. Export the hook in `src/hooks/index.ts`
