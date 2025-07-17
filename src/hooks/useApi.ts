import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { http } from '../utils';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const useApi = <T>(
  key: string | unknown[], 
  url: string, 
  method: HttpMethod = 'get', 
  options: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) => {
  return useQuery<T, Error>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await http[method]<T>(url, method !== 'get' ? data : { params: data });
      return response.data;
    },
    ...options
  });
};

export const useApiMutation = <T, V = unknown>(
  url: string, 
  method: HttpMethod = 'post',
  options: Omit<UseMutationOptions<T, Error, V>, 'mutationFn'> = {}
) => {
  return useMutation<T, Error, V>({
    mutationFn: async (data: V) => {
      const response = await http[method]<T>(url, data);
      return response.data;
    },
    ...options
  });
};
