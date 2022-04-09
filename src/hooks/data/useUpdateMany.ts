import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import {

    useMutationMode,
 
    useDataProvider,
    useInvalidate,
} from "../../hooks";
import {
    BaseRecord,
    BaseKey,
    UpdateManyResponse,
    HttpError,
    MutationMode,
    QueryResponse,
    PrevContext as UpdateContext,
    MetaDataQuery,
    GetListResponse,
    IQueryKeys,
} from "../../interfaces";
import { queryKeys } from "../../definitions/helpers/queryKeys";

type UpdateManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} ;

type UseUpdateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    UpdateManyResponse<TData>,
    TError,
    UpdateManyParams<TVariables>,
    UpdateContext<TData>
>;


export const useUpdateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseUpdateManyReturnType<TData, TError, TVariables> => {
    const queryClient = useQueryClient();
    const dataProvider = useDataProvider();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
   
    const invalidateStore = useInvalidate();

    const mutation = useMutation<
        UpdateManyResponse<TData>,
        TError,
        UpdateManyParams<TVariables>,
        UpdateContext<TData>
    >(
        ({
            ids,
            values,
            resource,
            onCancel,
            mutationMode,
            undoableTimeout,
            metaData,
            dataProviderName,
        }: UpdateManyParams<TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(dataProviderName).updateMany<
                    TData,
                    TVariables
                >({
                    resource,
                    ids,
                    variables: values,
                    metaData,
                });
            }

            const updatePromise = new Promise<UpdateManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(dataProviderName)
                            .updateMany<TData, TVariables>({
                                resource,
                                ids,
                                variables: values,
                                metaData,
                            })
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    };

                    const cancelMutation = () => {
                        reject({ message: "mutationCancelled" });
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    }

                },
            );
            return updatePromise;
        },

        {
            onMutate: async ({
                resource,
                ids,
                values,
                mutationMode,
                dataProviderName,
                metaData,
            }) => {
                const queryKey = queryKeys(
                    resource,
                    dataProviderName,
                    metaData,
                );

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                await queryClient.cancelQueries(
                    queryKey.resourceAll,
                    undefined,
                    {
                        silent: true,
                    },
                );

                const previousQueries = queryClient.getQueriesData<
                    QueryResponse<TData>
                >(queryKey.resourceAll);

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record: TData) => {
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        ...record,
                                        ...values,
                                    };
                                }

                                return record;
                            });

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.many(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record: TData) => {
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        ...record,
                                        ...values,
                                    };
                                }
                                return record;
                            });
                            return {
                                ...previous,
                                data,
                            };
                        },
                    );
                    for (const id of ids) {
                        queryClient.setQueriesData(
                            queryKey.detail(id),
                            (previous?: GetListResponse<TData> | null) => {
                                if (!previous) {
                                    return null;
                                }

                                const data = {
                                    ...previous.data,
                                    ...values,
                                };
                                return {
                                    ...previous,
                                    data,
                                };
                            },
                        );
                    }
                }

                return {
                    previousQueries,
                    queryKey,
                };
            },
            onSettled: (_data, _error, { ids, resource, dataProviderName }) => {
                // invalidate the cache for the list and many queries:

                invalidateStore({
                    resource,
                    invalidates: ["list", "many"],
                    dataProviderName,
                });

                ids.forEach((id) =>
                    invalidateStore({
                        resource,
                        invalidates: ["detail"],
                        dataProviderName,
                        id,
                    }),
                );

             
            },
            onSuccess: (_data, { ids, resource }) => {
                
            },
            onError: (
                err: TError,
                { ids, resource },
                context,
            ) => {
                // set back the queries to the context:

                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
      
                }
            },
        },
    );

    return mutation;
};