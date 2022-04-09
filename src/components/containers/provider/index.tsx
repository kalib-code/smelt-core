import React from "react";
import {
    QueryClientProvider,
    QueryClient,
    QueryCache,
    MutationCache,
    DefaultOptions,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthContextProvider } from "../../../contexts/auth";
import { DataContextProvider } from "../../../contexts/data";

import {
    IDataMultipleContextProvider,
    IDataContextProvider,
    IAuthContext
} from "../../../interfaces";

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
export interface ProviderProps {
    authProvider?: IAuthContext;
    dataProvider: IDataContextProvider | IDataMultipleContextProvider;

    reactQueryClientConfig?: QueryClientConfig;
    reactQueryDevtoolConfig?: any;
}

export const Provider: React.FC<ProviderProps> = ({
    authProvider,
    children,
    reactQueryClientConfig,
    dataProvider,
}) => {
    const queryClient = new QueryClient({
        ...reactQueryClientConfig,
        defaultOptions: {
            ...reactQueryClientConfig?.defaultOptions,
            queries: {
                refetchOnWindowFocus: false,
                keepPreviousData: true,
                ...reactQueryClientConfig?.defaultOptions?.queries,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider} isProvided={!!authProvider}>
            <DataContextProvider {...dataProvider}>
                <>{children}</>
            </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
                {...reactQueryClientConfig}
            />
        </QueryClientProvider>
    );
};
