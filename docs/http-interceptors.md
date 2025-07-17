# HTTP Interceptors with Axios and React Query

This documentation explains how to use the HTTP interceptors with Axios and React Query in your application.

## Table of Contents

1. [Setup](#setup)
2. [Basic Usage](#basic-usage)
3. [Query Hook](#query-hook)
4. [Mutation Hook](#mutation-hook)
5. [Customizing Interceptors](#customizing-interceptors)

## Setup

First, ensure you have the required dependencies installed:

```bash
npm install @tanstack/react-query axios
```

## Basic Usage

### Making API Requests

```typescript
import http from '@/utils/http';

// GET request
const fetchUsers = async () => {
  return http.get('/users');
};

// POST request
const createUser = async (userData) => {
  return http.post('/users', userData);
};
```

## Query Hook

Use the `useApi` hook for data fetching:

```typescript
import { useApi } from '@/hooks/useApi';

function UsersList() {
  const { data: users, isLoading, error } = useApi('users', '/users', 'get');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Mutation Hook

Use the `useApiMutation` hook for creating, updating, or deleting data:

```typescript
import { useApiMutation } from '@/hooks/useApi';

function CreateUser() {
  const mutation = useApiMutation('/users', 'post');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    mutation.mutate(userData, {
      onSuccess: () => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

## Customizing Interceptors

You can modify the interceptors in `src/utils/http.ts`:

### Request Interceptor

```typescript
// Add auth token to requests
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor

```typescript
// Handle common errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### React Query Configuration

You can customize the React Query client in `src/utils/queryClient.ts`:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Add more default options here
    },
  },
});
```

// Add a response interceptor
httpInterceptor.addResponseInterceptor((response) => {
  console.log('Response interceptor:', response);
  return response;
});

// Add an error interceptor
httpInterceptor.addErrorInterceptor((error) => {
  console.error('Error interceptor:', error);
  return Promise.reject(error);
});
```

## Example: Authentication Flow

Here's how to handle authentication with interceptors:

```typescript
// In your login function
const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  const { token } = response.data;
  localStorage.setItem('token', token);
  return response.data.user;
};

// The interceptor will automatically add the token to subsequent requests
// and handle 401 errors by redirecting to login
```

## Best Practices

1. **Centralize API Calls**: Use the API service layer for all HTTP requests
2. **Use React Query Hooks**: Leverage `useApiQuery` and `useApiMutation` for data fetching
3. **Handle Errors Gracefully**: Use error boundaries and proper error states
4. **Test Interceptors**: Write tests for your interceptors to ensure they work as expected

## Type Safety

All the utilities are fully typed with TypeScript. You can extend the types as needed in the respective files.
