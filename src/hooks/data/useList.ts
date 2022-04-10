import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import {
    GetListResponse,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
} from "../../interfaces";
import { useDataProvider } from ".";
import { queryKeys } from "../../definitions/helpers/queryKeys";

export interface UseListConfig {
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};

export const useList = <
    TData extends BaseRecord,
    TError extends HttpError = HttpError
>({
    resource,
    config,
    queryOptions,
    metaData,
    dataProviderName,
}: UseListProps<TData, TError>): QueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const dataProvider = useDataProvider();
    const queryKey = queryKeys(resource, dataProviderName, metaData);
    const { getList } = dataProvider(dataProviderName);

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        queryKey.list(config),
        () => getList<TData>({ resource, ...config, metaData }),
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);
            },
            onError: (err: TError) => {
                queryOptions?.onError?.(err);
            },
        }
    );

    return queryResponse;
};
