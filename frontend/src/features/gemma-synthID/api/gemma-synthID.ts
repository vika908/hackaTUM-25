import { api } from '@/lib/axios';

export type WatermarkRequest = {
    prompt: string;
};

export type WatermarkResponse = {
    watermarked: string;
    clean: string;
};

export const getWatermarkComparison = (data: WatermarkRequest): Promise<WatermarkResponse> => {
    return api.post('/api/v1/watermark/compare', data);
};
