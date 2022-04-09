import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import {
  BaseRecord,
  BaseKey,
  GetManyResponse,
  HttpError,
  MetaDataQuery,
} from "../../interfaces";
import { useDataProvider } from "../data";
import { queryKeys } from "../../definitions/helpers/queryKeys";

export type UseManyProps<TData, TError> = {
  resource: string;
  ids: BaseKey[];
  queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;

  metaData?: MetaDataQuery;
  dataProviderName?: string;
};

export const useMany = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError
>({
  resource,
  ids,
  queryOptions,
  metaData,
  dataProviderName,
}: UseManyProps<TData, TError>): QueryObserverResult<
  GetManyResponse<TData>
> => {
  const dataProvider = useDataProvider();
  const queryKey = queryKeys(resource, dataProviderName, metaData);

  const { getMany } = dataProvider(dataProviderName);

  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const queryResponse = useQuery<GetManyResponse<TData>, TError>(
    queryKey.many(ids),
    () => getMany<TData>({ resource, ids, metaData }),
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
