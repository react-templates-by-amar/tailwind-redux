# Environment Configuration

This documentation explains how to use environment variables in your application with type safety.

## Table of Contents

1. [Overview](#overview)
2. [Environment Files](#environment-files)
3. [Config Service](#config-service)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

## Overview

Environment configuration allows you to:

- Store sensitive information outside of your codebase
- Configure different values for development, staging, and production
- Enable or disable features without changing code
- Maintain type safety when accessing environment variables

## Environment Files

The template includes a `.env.example` file with common environment variables. To get started:

1. Copy `.env.example` to `.env.local` (this file will be ignored by git)
2. Customize the values in `.env.local` for your development environment

```bash
cp .env.example .env.local
```

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for API requests | `/api` |
| `VITE_ENABLE_FEATURE_X` | Toggle feature X | `false` |
| `VITE_ENABLE_FEATURE_Y` | Toggle feature Y | `true` |
| `VITE_AUTH_DOMAIN` | Authentication domain | `null` |
| `VITE_AUTH_CLIENT_ID` | Authentication client ID | `null` |
| `VITE_ANALYTICS_ID` | Analytics tracking ID | `null` |
| `VITE_APP_NAME` | Application name | `React Template` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_APP_ENVIRONMENT` | Current environment | `development` |

### Environment-Specific Files

Vite supports different environment files for different environments:

- `.env` - Loaded in all environments
- `.env.local` - Loaded in all environments, ignored by git
- `.env.development` - Development environment only
- `.env.production` - Production environment only

## Config Service

The template includes a type-safe configuration service in `src/utils/config.ts` that:

- Provides a structured interface to environment variables
- Validates required variables
- Provides default values for optional variables
- Includes helper functions for common tasks

### Config Structure

```typescript
interface EnvironmentConfig {
  // API
  apiBaseUrl: string;
  
  // Feature flags
  features: {
    featureX: boolean;
    featureY: boolean;
  };
  
  // Authentication
  auth: {
    domain: string | null;
    clientId: string | null;
  };
  
  // Analytics
  analytics: {
    id: string | null;
  };
  
  // App info
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
}
```

## Usage Examples

### Basic Usage

```typescript
import { config } from '@/utils/config';

// Access configuration values
console.log(config.apiBaseUrl);
console.log(config.app.name);
console.log(config.app.version);
```

### Feature Flags

```typescript
import { isFeatureEnabled } from '@/utils/config';

// Check if a feature is enabled
if (isFeatureEnabled('featureX')) {
  // Implement feature X
}
```

### Environment Checks

```typescript
import { isDevelopment, isProduction } from '@/utils/config';

// Add development-only code
if (isDevelopment()) {
  console.log('Debug information');
}

// Add production-only code
if (isProduction()) {
  // Initialize production analytics
}
```

## Best Practices

1. **Never commit sensitive information**: Always use environment variables for API keys, secrets, etc.

2. **Provide defaults**: Always provide sensible default values for optional environment variables.

3. **Type safety**: Use TypeScript to ensure type safety when accessing environment variables.

4. **Documentation**: Document all environment variables in your `.env.example` file.

5. **Feature flags**: Use environment variables to toggle features on and off.

6. **Environment-specific behavior**: Use environment checks to implement environment-specific behavior.

7. **Centralize configuration**: Access environment variables through the config service, not directly.

8. **Validate early**: Validate required environment variables at startup and fail fast if they're missing.
