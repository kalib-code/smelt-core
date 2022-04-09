import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import pluralize from "pluralize";

import {
    DeleteManyResponse,
    HttpError,
    BaseRecord,
    BaseKey,
    MutationMode,
    PreviousQuery,
    GetListResponse,
    PrevContext as DeleteContext,
    MetaDataQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useMutationMode,
    useDataProvider,
    useInvalidate,
} from "../../hooks";
import { queryKeys } from "../../definitions/helpers/queryKeys";

export type DeleteManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
} ;

export type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TVariables>,
    unknown
>;


export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseDeleteManyReturnType<TData, TError, TVariables> => {

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const dataProvider = useDataProvider();
    const invalidateStore = useInvalidate();

    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteManyParams<TVariables>,
        DeleteContext<TData>
    >(
        ({
            resource,
            ids,
            mutationMode,
            undoableTimeout,
            onCancel,
            metaData,
            dataProviderName,
            values,
        }: DeleteManyParams<TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;
            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(dataProviderName).deleteMany<TData>({
                    resource,
                    ids,
                    metaData,
                   // variables: values,
                });
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(dataProviderName)
                            .deleteMany<TData>({
                                resource,
                                ids,
                                metaData,
                               // variables: values,
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
                ids,
                resource,
                mutationMode,
                dataProviderName,
            }) => {
                const queryKey = queryKeys(resource, dataProviderName);

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                await queryClient.cancelQueries(
                    queryKey.resourceAll,
                    undefined,
                    {
                        silent: true,
                    },
                );

                const previousQueries: PreviousQuery<TData>[] =
                    queryClient.getQueriesData(queryKey.resourceAll);

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.filter(
                                (item) =>
                                    item.id &&
                                    !ids
                                        .map(String)
                                        .includes(item.id.toString()),
                            );

                            return {
                                data,
                                total: previous.total - 1,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.many(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.filter(
                                (record: TData) => {
                                    if (record.id) {
                                        return !ids
                                            .map(String)
                                            .includes(record.id.toString());
                                    }
                                    return false;
                                },
                            );

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    for (const id of ids) {
                        queryClient.setQueriesData(
                            queryKey.detail(id),
                            (previous?: any | null) => {
                                if (!previous || previous.data.id == id) {
                                    return null;
                                }
                                return {
                                    ...previous,
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
            // Always refetch after error or success:
            onSettled: (
                _data,
                _error,
                {
                    resource,
                    ids,
                    dataProviderName,
                    invalidates = ["list", "many"],
                },
            ) => {
                // invalidate the cache for the list and many queries:
                invalidateStore({
                    resource,
                    dataProviderName,
                    invalidates,
                });

                
            },
            onSuccess: (
                _data,
                { ids, resource },
                context,
            ) => {
                // Remove the queries from the cache:
                ids.forEach((id) =>
                    queryClient.removeQueries(context.queryKey.detail(id)),
                );

            },
            onError: (err, { ids, resource }, context) => {
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