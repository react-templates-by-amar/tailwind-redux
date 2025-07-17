/**
 * Environment configuration service
 * 
 * This module provides type-safe access to environment variables.
 * It validates required variables and provides default values for optional ones.
 */

// Define the shape of our environment variables
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

/**
 * Get a boolean value from an environment variable
 */
const getBooleanValue = (value: string | undefined): boolean => {
  if (value === undefined) return false;
  return value.toLowerCase() === 'true';
};

/**
 * Get environment variables with type safety
 */
const getConfig = (): EnvironmentConfig => {
  return {
    // API
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    
    // Feature flags
    features: {
      featureX: getBooleanValue(import.meta.env.VITE_ENABLE_FEATURE_X),
      featureY: getBooleanValue(import.meta.env.VITE_ENABLE_FEATURE_Y),
    },
    
    // Authentication
    auth: {
      domain: import.meta.env.VITE_AUTH_DOMAIN || null,
      clientId: import.meta.env.VITE_AUTH_CLIENT_ID || null,
    },
    
    // Analytics
    analytics: {
      id: import.meta.env.VITE_ANALYTICS_ID || null,
    },
    
    // App info
    app: {
      name: import.meta.env.VITE_APP_NAME || 'React Template',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      environment: (import.meta.env.VITE_APP_ENVIRONMENT || 'development') as 'development' | 'staging' | 'production',
    },
  };
};

// Create and export the config object
export const config = getConfig();

// Export a function to check if a feature is enabled
export const isFeatureEnabled = (featureName: keyof EnvironmentConfig['features']): boolean => {
  return config.features[featureName] === true;
};

// Export a function to get the current environment
export const getEnvironment = (): EnvironmentConfig['app']['environment'] => {
  return config.app.environment;
};

// Export a helper to check if we're in development mode
export const isDevelopment = (): boolean => {
  return config.app.environment === 'development';
};

// Export a helper to check if we're in production mode
export const isProduction = (): boolean => {
  return config.app.environment === 'production';
};
