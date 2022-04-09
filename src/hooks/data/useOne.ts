import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import {
  GetOneResponse,
  HttpError,
  BaseRecord,
  BaseKey,
  MetaDataQuery,
} from "../../interfaces";
import { useDataProvider } from "../data";
import { queryKeys } from "../../definitions/helpers/queryKeys";

export type UseOneProps<TData, TError> = {
  resource: string;
  id: BaseKey;
  queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;

  metaData?: MetaDataQuery;
  dataProviderName?: string;
};

export const useOne = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError
>({
  resource,
  id,
  queryOptions,
  metaData,
  dataProviderName,
}: UseOneProps<TData, TError>): QueryObserverResult<GetOneResponse<TData>> => {
  const dataProvider = useDataProvider();
  const queryKey = queryKeys(resource, dataProviderName, metaData);

  const { getOne } = dataProvider(dataProviderName);

  const queryResponse = useQuery<GetOneResponse<TData>, TError>(
    queryKey.detail(id),
    () => getOne<TData>({ resource, id, metaData }),
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
