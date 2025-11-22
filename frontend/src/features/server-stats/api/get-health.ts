import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const getServerHealth = (): Promise<{ status: string }> => {
    return api.get('/api/health');
};

export const useServerHealth = () => {
    return useQuery({
        queryKey: ['health'],
        queryFn: getServerHealth,
    });
};
