import React from 'react';
import * as react_query from 'react-query';
import { QueryObserverResult, UseQueryOptions, QueryKey, QueryCache, MutationCache, DefaultOptions, UseMutationResult, UseQueryResult } from 'react-query';

interface Pagination {
    current?: number;
    pageSize?: number;
}
declare type CrudOperators = "eq" | "ne" | "lt" | "gt" | "lte" | "gte" | "in" | "nin" | "contains" | "ncontains" | "containss" | "ncontainss" | "between" | "nbetween" | "null" | "nnull" | "or";
declare type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, "or">;
    value: any;
};
declare type ConditionalFilter = {
    operator: "or";
    value: LogicalFilter[];
};
declare type CrudFilter = LogicalFilter | ConditionalFilter;
declare type CrudSort = {
    field: string;
    order: "asc" | "desc";
};
declare type CrudFilters = CrudFilter[];
declare type CrudSorting = CrudSort[];
interface CustomResponse<TData = BaseRecord> {
    data: TData;
}
interface GetListResponse<TData = BaseRecord> {
    data: TData[];
    total: number;
}
interface CreateResponse<TData = BaseRecord> {
    data: TData;
}
interface CreateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface UpdateResponse<TData = BaseRecord> {
    data: TData;
}
interface UpdateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface GetOneResponse<TData = BaseRecord> {
    data: TData;
}
interface GetManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface DeleteOneResponse<TData = BaseRecord> {
    data: TData;
}
interface DeleteManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface IDataContextProvider {
    getList: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        pagination?: Pagination;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables[];
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
    custom?: <TData extends BaseRecord = BaseRecord>(params: {
        url: string;
        method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
        sort?: CrudSorting;
        filters?: CrudFilter[];
        payload?: {};
        query?: {};
        headers?: {};
        metaData?: MetaDataQuery;
    }) => Promise<CustomResponse<TData>>;
}
interface IDataMultipleContextProvider {
    default?: IDataContextProvider;
    [key: string]: IDataContextProvider | any;
}

declare type VariableOptions = {
    type?: string;
    name?: string;
    value: any;
    list?: boolean;
    required?: boolean;
} | {
    [k: string]: any;
};

declare type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};

declare type Fields = Array<string | object | NestedField>;

interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}

declare type MetaDataQuery = {
    [k: string]: any;
} & QueryBuilderOptions;

interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
}

interface UseListConfig {
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
}
declare type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};
declare const useList: <TData extends BaseRecord, TError extends HttpError = HttpError>({ resource, config, queryOptions, metaData, dataProviderName, }: UseListProps<TData, TError>) => QueryObserverResult<GetListResponse<TData>, TError>;

interface IQueryKeys {
    all: QueryKey[];
    resourceAll: QueryKey[];
    list: (config?: UseListConfig | undefined) => QueryKey[];
    many: (ids?: BaseKey[]) => QueryKey[];
    detail: (id: BaseKey) => QueryKey[];
}

declare type MutationMode = "pessimistic" | "optimistic" | "undoable";
declare type PreviousQuery<TData> = [QueryKey, TData | unknown];
declare type PrevContext<TData> = {
    previousQueries: PreviousQuery<TData>[];
    queryKey: IQueryKeys;
};

interface ISmeltContext {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
}

declare type TLogoutData = void | false | string;
declare type TLoginData = void | false | string;
interface IAuthContext {
    login: (params: any) => Promise<TLoginData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
    isProvided?: boolean;
    isAuthenticated?: boolean;
    [key: string]: any;
}

declare type BaseKey = string | number;
declare type BaseRecord = {
    id?: BaseKey;
    [key: string]: any;
};

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
interface ProviderProps {
    authProvider?: IAuthContext;
    dataProvider: IDataContextProvider | IDataMultipleContextProvider;
    reactQueryClientConfig?: QueryClientConfig;
    reactQueryDevtoolConfig?: any;
}
declare const Provider: React.FC<ProviderProps>;

declare type UseOneProps<TData, TError> = {
    resource: string;
    id: BaseKey;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};
declare const useOne: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>({ resource, id, queryOptions, metaData, dataProviderName, }: UseOneProps<TData, TError>) => QueryObserverResult<GetOneResponse<TData>, unknown>;

declare type UseManyProps<TData, TError> = {
    resource: string;
    ids: BaseKey[];
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};
declare const useMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>({ resource, ids, queryOptions, metaData, dataProviderName, }: UseManyProps<TData, TError>) => QueryObserverResult<GetManyResponse<TData>, unknown>;

declare type UpdateParams<TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
};
declare type UseUpdateReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<UpdateResponse<TData>, TError, UpdateParams<TVariables>, PrevContext<TData>>;
/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useUpdate: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseUpdateReturnType<TData, TError, TVariables>;

declare type useCreateParams<TVariables> = {
    resource: string;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
};
declare type UseCreateReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<CreateResponse<TData>, TError, useCreateParams<TVariables>, unknown>;
declare const useCreate: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseCreateReturnType<TData, TError, TVariables>;

declare type DeleteParams<TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
};
declare type UseDeleteReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<DeleteOneResponse<TData>, TError, DeleteParams<TVariables>, PrevContext<TData>>;
declare const useDelete: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseDeleteReturnType<TData, TError, TVariables>;

declare type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
};
declare type UseCreateManyReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<CreateManyResponse<TData>, TError, useCreateManyParams<TVariables>, unknown>;
declare const useCreateMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseCreateManyReturnType<TData, TError, TVariables>;

declare type UpdateManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
};
declare type UseUpdateManyReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<UpdateManyResponse<TData>, TError, UpdateManyParams<TVariables>, PrevContext<TData>>;
declare const useUpdateMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseUpdateManyReturnType<TData, TError, TVariables>;

declare type DeleteManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
};
declare type UseDeleteManyReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<DeleteManyResponse<TData>, TError, DeleteManyParams<TVariables>, unknown>;
declare const useDeleteMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseDeleteManyReturnType<TData, TError, TVariables>;

declare const useApiUrl: (dataProviderName?: string | undefined) => string;

interface UseCustomConfig<TQuery, TPayload> {
    sort?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}
declare type UseCustomProps<TData, TError, TQuery, TPayload> = {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    config?: UseCustomConfig<TQuery, TPayload>;
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};
declare const useCustom: <TData = BaseRecord, TError extends HttpError = HttpError, TQuery = unknown, TPayload = unknown>({ url, method, config, queryOptions, metaData, dataProviderName, }: UseCustomProps<TData, TError, TQuery, TPayload>) => QueryObserverResult<CustomResponse<TData>, TError>;

declare const useDataProvider: () => (dataProviderName?: string | undefined) => IDataContextProvider;

declare type UseInvalidateProp = {
    resource: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
};
declare const useInvalidate: () => (props: UseInvalidateProp) => void;

declare type UseMutationModeType = () => {
    mutationMode: ISmeltContext["mutationMode"];
    undoableTimeout: ISmeltContext["undoableTimeout"];
};
declare const useMutationMode: UseMutationModeType;

declare const usePermissions: <TData = any>(options?: UseQueryOptions<TData, unknown, TData, react_query.QueryKey> | undefined) => UseQueryResult<TData, unknown>;

declare const useGetIdentity: <TData = any>() => UseQueryResult<TData, unknown>;

declare const useLogout: <TVariables = void>() => UseMutationResult<TLogoutData, Error, TVariables, unknown>;

declare const useLogin: <TVariables = {}>() => UseMutationResult<TLoginData, Error, TVariables, unknown>;

declare const useAuthenticated: (params?: any) => UseQueryResult<any, unknown>;

declare const useIsAuthenticated: () => boolean | undefined;

/**
 * A hook that the UI uses
 * @internal
 */
declare const useIsExistAuthentication: () => boolean;

export { IAuthContext as AuthProvider, BaseKey, BaseRecord, ConditionalFilter, CreateManyResponse, CreateResponse, CrudFilter, CrudFilters, CrudOperators, CrudSort, CrudSorting, CustomResponse, IDataContextProvider as DataProvider, DeleteManyResponse, DeleteOneResponse, GetListResponse, GetManyResponse, GetOneResponse, HttpError, IQueryKeys, LogicalFilter, MetaDataQuery, MutationMode, Pagination, Provider, ProviderProps, UpdateManyResponse, UpdateResponse, UseCreateManyReturnType, UseCreateReturnType, UseInvalidateProp, useApiUrl, useAuthenticated, useCreate, useCreateMany, useCustom, useDataProvider, useDelete, useDeleteMany, useGetIdentity, useInvalidate, useIsAuthenticated, useIsExistAuthentication, useList, useLogin, useLogout, useMany, useMutationMode, useOne, usePermissions, useUpdate, useUpdateMany };
