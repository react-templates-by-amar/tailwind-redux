# Error Boundary

This documentation explains how to use the global Error Boundary component to handle JavaScript errors in your application.

## Table of Contents

1. [Overview](#overview)
2. [Global Error Handling](#global-error-handling)
3. [Custom Error Boundaries](#custom-error-boundaries)
4. [Best Practices](#best-practices)

## Overview

Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application. They work like a JavaScript `catch {}` block, but for components.

Key features of Error Boundaries:
- Catch errors during rendering, in lifecycle methods, and in constructors
- Log errors for debugging
- Display fallback UI when errors occur
- Prevent the entire application from crashing

## Global Error Handling

This template includes a global Error Boundary that wraps the entire application in `src/main.tsx`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
```

This ensures that any uncaught errors in your application will be handled gracefully, showing a user-friendly error message instead of a blank screen.

## Custom Error Boundaries

While the global Error Boundary catches errors for the entire application, you can also create more specific Error Boundaries for different parts of your application.

### Using the ErrorBoundary Component

```tsx
import ErrorBoundary from '@/components/ErrorBoundary';

function MyComponent() {
  return (
    <ErrorBoundary>
      <SomeComponentThatMightError />
    </ErrorBoundary>
  );
}
```

### Custom Fallback UI

You can provide a custom fallback UI through the `fallback` prop:

```tsx
import ErrorBoundary from '@/components/ErrorBoundary';

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center">
          <h2>Something went wrong in this component.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      }
    >
      <SomeComponentThatMightError />
    </ErrorBoundary>
  );
}
```

## Best Practices

1. **Strategic Placement**: Place Error Boundaries strategically around critical UI components to prevent the entire application from crashing.

2. **Granular Error Handling**: Use multiple Error Boundaries for different parts of your application to provide more specific error messages.

3. **Error Logging**: Implement error logging in the `componentDidCatch` method to track errors in production.

4. **Recovery Options**: Provide users with clear recovery options (like refreshing the page or retrying an action).

5. **Error Context**: Consider using React Context to provide more information about the error to your fallback UI.

6. **Testing Error Boundaries**: Test your Error Boundaries by intentionally throwing errors in your components.

## Implementation Details

The Error Boundary component is implemented in `src/components/ErrorBoundary.tsx` using a class component (as required by React for Error Boundaries). It includes:

- Error state management
- Error logging in `componentDidCatch`
- A default fallback UI with error details
- Support for custom fallback UI through props

Note that Error Boundaries only catch errors in the React component tree. They do not catch errors in:

- Event handlers
- Asynchronous code (e.g., `setTimeout` or `requestAnimationFrame` callbacks)
- Server-side rendering
- Errors thrown in the Error Boundary itself

For these cases, you should use traditional try-catch statements or other error handling mechanisms.
