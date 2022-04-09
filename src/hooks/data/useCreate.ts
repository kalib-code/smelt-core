import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import {
  CreateResponse,
  BaseRecord,
  HttpError,
  MetaDataQuery,
  IQueryKeys,
} from "../../interfaces";
import { useDataProvider, useInvalidate } from "../../hooks";

type useCreateParams<TVariables> = {
  resource: string;
  values: TVariables;
  metaData?: MetaDataQuery;
  dataProviderName?: string;
  invalidates?: Array<keyof IQueryKeys>;
};

export type UseCreateReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {}
> = UseMutationResult<
  CreateResponse<TData>,
  TError,
  useCreateParams<TVariables>,
  unknown
>;

export const useCreate = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {}
>(): UseCreateReturnType<TData, TError, TVariables> => {
  const dataProvider = useDataProvider();
  const invalidateStore = useInvalidate();

  const mutation = useMutation<
    CreateResponse<TData>,
    TError,
    useCreateParams<TVariables>,
    unknown
  >(
    ({
      resource,
      values,
      metaData,
      dataProviderName,
    }: useCreateParams<TVariables>) => {
      return dataProvider(dataProviderName).create<TData, TVariables>({
        resource,
        variables: values,
        metaData,
      });
    },
    {
      onSuccess: (
        data,
        { resource, dataProviderName, invalidates = ["list", "many"] }
      ) => {

        invalidateStore({
          resource,
          dataProviderName,
          invalidates,
        });
      },
      onError: (err: TError, { resource }) => {},
    }
  );

  return mutation;
};
