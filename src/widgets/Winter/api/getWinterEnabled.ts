import { baseApi, getServerFetchOptions } from '@/shared/api';

export const getWinterEnabled = async (): Promise<boolean> => {
    try {
        const settings = await baseApi.get<{ winter_effects?: boolean }>('/site-settings/', undefined, getServerFetchOptions(60));
        return settings.winter_effects === true;
    } catch {
        return false;
    }
};
