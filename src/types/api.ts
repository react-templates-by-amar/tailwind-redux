// Basic API response types

/**
 * Generic API response wrapper
 * Use this to type your API responses
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Simple pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

/**
 * Example data type - replace with your own models
 */
export interface ExampleData {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}
