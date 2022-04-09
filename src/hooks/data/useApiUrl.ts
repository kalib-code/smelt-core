import { useDataProvider } from "../data";

export const useApiUrl = (dataProviderName?: string): string => {
    const dataProvider = useDataProvider();

    const { getApiUrl } = dataProvider(dataProviderName);

    return getApiUrl();
};