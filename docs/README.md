# Project Documentation

Welcome to the project documentation! This directory contains comprehensive documentation for different aspects of the application.

## Documentation Structure

- [Hooks](/docs/hooks/README.md) - Custom React hooks and their usage
- [Store](/docs/store/README.md) - State management documentation
- [Components](/docs/components/README.md) - Component library and usage
- [HTTP Interceptors](/docs/http-interceptors.md) - HTTP client setup with Axios interceptors
- [API Services](/docs/api-services.md) - API services pattern for making API calls
- [Environment Configuration](/docs/environment-config.md) - Type-safe environment variables
- [Error Boundary](/docs/error-boundary.md) - Global error handling

## Component Organization

The project follows a structured approach to component organization:

### UI Components (`/src/components/ui/`)
Reusable, presentational components that don't contain business logic:
- **Button** - Versatile button component with variants
- **LoadingSpinner** - Animated loading indicator
- (Add more UI components as they're created)

### Feature Components (`/src/components/`)
Feature-specific components that may contain business logic and compose multiple UI components:
- **ThemeToggle** - Component for switching between light/dark themes
- (Add more feature components as they're created)

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Building for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/         # Feature-specific components
│   └── ui/            # Reusable UI components (Button, LoadingSpinner, etc.)
├── hooks/             # Custom React hooks
├── store/             # State management
├── types/             # Shared TypeScript types and interfaces
└── utils/             # Utility functions
```

### When to Create a New UI Component
1. The component is purely presentational
2. It will be reused in multiple places
3. It doesn't contain business logic
4. It accepts props to customize its appearance/behavior

### When to Create a Feature Component
1. The component is specific to a feature/page
2. It combines multiple UI components
3. It contains business logic
4. It manages state or side effects

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
