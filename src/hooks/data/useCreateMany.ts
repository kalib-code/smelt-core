import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import {
    BaseRecord,
    CreateManyResponse,
    HttpError,
    MetaDataQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useDataProvider,
    useInvalidate,
} from "../../hooks";
import pluralize from "pluralize";

type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} ;

export type UseCreateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateManyResponse<TData>,
    TError,
    useCreateManyParams<TVariables>,
    unknown
>;


export const useCreateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateManyReturnType<TData, TError, TVariables> => {
    const dataProvider = useDataProvider();

    
    const invalidateStore = useInvalidate();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        useCreateManyParams<TVariables>
    >(
        ({
            resource,
            values,
            metaData,
            dataProviderName,
        }: useCreateManyParams<TVariables>) =>
            dataProvider(dataProviderName).createMany<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            }),
        {
            onSuccess: (
                response,
                {
                    resource,
                    dataProviderName,
                    invalidates = ["list", "many"],
                },
            ) => {
                const resourcePlural = pluralize.plural(resource);

               

                invalidateStore({
                    resource,
                    dataProviderName,
                    invalidates,
                });

               
            },
            onError: (err: TError, { resource }) => {
               
            },
        },
    );

    return mutation;
};