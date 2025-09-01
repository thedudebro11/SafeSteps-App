import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10_000, gcTime: 60_000, retry: 1 },
    mutations: { retry: 0 },
  },
});
