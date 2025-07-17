# Redux Store Documentation

This project uses Redux Toolkit for state management, providing a structured and efficient approach to managing application state.

## Store Structure

The Redux store is organized as follows:

```
src/store/
├── store.ts         # Main Redux store configuration
├── hooks.ts         # Typed hooks for Redux
└── slices/          # Feature-specific slices
    └── counterSlice.ts  # Example counter slice
```

## Redux Toolkit Implementation

### Store Configuration (`store.ts`)

The main store configuration combines all reducers and configures the Redux store:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add more reducers here as your application grows
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Typed Hooks (`hooks.ts`)

Custom typed hooks for better TypeScript integration:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Feature Slices

Each feature has its own slice in the `slices` directory. For example, the counter slice:

```typescript
import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

## Using Redux in Components

Use the typed hooks to access state and dispatch actions:

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, reset } from '@/store/slices/counterSlice';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
```

## Best Practices

1. **Create Slices for Features**: Each major feature should have its own slice
2. **Use TypeScript Interfaces**: Define clear interfaces for your state
3. **Use Typed Hooks**: Always use `useAppDispatch` and `useAppSelector` instead of the standard hooks
4. **Immutable Updates**: Redux Toolkit uses Immer under the hood, allowing you to write "mutating" logic that actually produces immutable updates
5. **Organize by Feature**: Keep related code together in the slices directory

## Adding New Slices

To add a new feature slice:

1. Create a new file in `src/store/slices/` (e.g., `userSlice.ts`)
2. Define your slice with its state, reducers, and actions
3. Export the actions and reducer
4. Import and add the reducer to the `store.ts` file

## Async Operations with Redux Toolkit

For asynchronous operations, use the `createAsyncThunk` function:

```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Regular reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
```
