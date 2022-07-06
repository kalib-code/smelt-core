import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import pluralize from "pluralize";

import {
    useMutationMode,
    useDataProvider,
    useInvalidate,
} from "../../hooks";
import {
    DeleteOneResponse,
    MutationMode,
    PrevContext as DeleteContext,
    BaseRecord,
    BaseKey,
    HttpError,
    GetListResponse,
    MetaDataQuery,
    PreviousQuery,
    IQueryKeys,
} from "../../interfaces";
import { queryKeys } from "../../definitions/helpers/queryKeys";
export type DeleteParams<TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
} ;

export type UseDeleteReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TVariables>,
    DeleteContext<TData>
>;


export const useDelete = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseDeleteReturnType<TData, TError, TVariables> => {
    const dataProvider = useDataProvider();

    const queryClient = useQueryClient();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const invalidateStore = useInvalidate();

    const mutation = useMutation<
        DeleteOneResponse<TData>,
        TError,
        DeleteParams<TVariables>,
        DeleteContext<TData>
    >(
        ({
            id,
            mutationMode,
            undoableTimeout,
            resource,
            onCancel,
            metaData,
            dataProviderName,
            values,
        }) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(dataProviderName).deleteOne<TData>({
                    resource,
                    id,
                    metaData,
                    //variables: values,
                });
            }

            const deletePromise = new Promise<DeleteOneResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(dataProviderName)
                            .deleteOne<TData>({
                                resource,
                                id,
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
            return deletePromise;
        },
        {
            onMutate: async ({
                id,
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
                                (record: TData) =>
                                    record.id?.toString() !== id.toString(),
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
                                    return (
                                        record.id?.toString() !== id?.toString()
                                    );
                                },
                            );

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );
                }

                return {
                    previousQueries,
                    queryKey,
                };
            },
            onSettled: (
                _data,
                _error,
                {
                    id,
                    resource,
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
                { id, resource },
                context,
            ) => {

                // Remove the queries from the cache:
                queryClient.removeQueries(context.queryKey.detail(id));
            },
            onError: (
                err: TError,
                { id, resource },
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