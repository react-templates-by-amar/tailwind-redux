import http from '@/utils/http';
import type { ApiResponse, ExampleData, PaginationMeta } from '@/types/api';

/**
 * Example API service
 * This demonstrates how to create typed API services using the http client
 */
const exampleService = {
  /**
   * Get all items with optional pagination
   */
  getItems: async (page = 1, limit = 10): Promise<ApiResponse<ExampleData[]> & { meta?: PaginationMeta }> => {
    return http.get(`/items?page=${page}&limit=${limit}`);
  },

  /**
   * Get a single item by ID
   */
  getItemById: async (id: number): Promise<ApiResponse<ExampleData>> => {
    return http.get(`/items/${id}`);
  },

  /**
   * Create a new item
   */
  createItem: async (data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ApiResponse<ExampleData>> => {
    return http.post('/items', data);
  }
};

export default exampleService;
