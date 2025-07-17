# API Services Pattern

This documentation explains the API services pattern implemented in this template, which provides a clean, type-safe way to interact with backend APIs.

## Table of Contents

1. [Overview](#overview)
2. [API Types](#api-types)
3. [Example Service](#example-service)
4. [Using API Services](#using-api-services)
5. [Extending the Pattern](#extending-the-pattern)

## Overview

The API services pattern organizes API calls into service modules, each responsible for a specific resource or domain. This approach:

- Centralizes API endpoints
- Provides consistent typing for requests and responses
- Makes it easier to reuse API calls across components
- Works seamlessly with the HTTP client and interceptors

## API Types

Basic types for API responses are defined in `src/types/api.ts`:

```typescript
// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Simple pagination metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

// Example data type
export interface ExampleData {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}
```

## Example Service

The template includes an example API service in `src/api/exampleService.ts`:

```typescript
import http from '@/utils/http';
import type { ApiResponse, ExampleData, PaginationMeta } from '@/types/api';

const exampleService = {
  // Get all items with optional pagination
  getItems: async (page = 1, limit = 10): Promise<ApiResponse<ExampleData[]> & { meta?: PaginationMeta }> => {
    return http.get(`/items?page=${page}&limit=${limit}`);
  },

  // Get a single item by ID
  getItemById: async (id: number): Promise<ApiResponse<ExampleData>> => {
    return http.get(`/items/${id}`);
  },

  // Create a new item
  createItem: async (data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ApiResponse<ExampleData>> => {
    return http.post('/items', data);
  }
};

export default exampleService;
```

## Using API Services

Here's how to use the API services in your components:

### With React Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { exampleService } from '@/api';

function ItemsList() {
  // Fetch items
  const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: () => exampleService.getItems()
  });

  // Create a new item
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newItem) => exampleService.createItem(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {data?.data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => mutation.mutate({ name: 'New Item' })}>
        Add Item
      </button>
    </div>
  );
}
```

### Without React Query

```typescript
import { useState, useEffect } from 'react';
import { exampleService } from '@/api';

function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await exampleService.getItems();
        setItems(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Rest of component...
}
```

## Extending the Pattern

### Creating New Services

To create a new API service:

1. Define your data types in `src/types/api.ts` or a new type file
2. Create a new service file in the `src/api` directory
3. Export your service from `src/api/index.ts`

Example for a new user service:

```typescript
// src/types/api.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// src/api/userService.ts
import http from '@/utils/http';
import type { ApiResponse, User } from '@/types/api';

const userService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    return http.get('/users');
  },
  
  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    return http.get(`/users/${id}`);
  }
};

export default userService;

// src/api/index.ts
export { default as userService } from './userService';
```

### Best Practices

1. **Keep services focused**: Each service should handle one resource or domain
2. **Use proper typing**: Always define and use TypeScript interfaces for request and response data
3. **Use consistent naming**: Follow a consistent naming pattern for service methods
4. **Document your services**: Add JSDoc comments to describe what each method does
5. **Handle errors consistently**: Let the HTTP interceptors handle common errors
