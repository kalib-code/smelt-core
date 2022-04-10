import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import {
  BaseRecord,
  BaseKey,
  UpdateResponse,
  MutationMode,
  PrevContext as UpdateContext,
  HttpError,
  MetaDataQuery,
  PreviousQuery,
  GetListResponse,
  IQueryKeys
} from '../../interfaces'
import { useMutationMode, useDataProvider, useInvalidate } from '../../hooks'
import { queryKeys } from '../../definitions/helpers/queryKeys'

export type UpdateParams<TVariables> = {
  id: BaseKey
  resource: string
  mutationMode?: MutationMode
  undoableTimeout?: number
  onCancel?: (cancelMutation: () => void) => void
  values: TVariables
  metaData?: MetaDataQuery
  dataProviderName?: string
  invalidates?: Array<keyof IQueryKeys>
}

export type UseUpdateReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {}
> = UseMutationResult<
  UpdateResponse<TData>,
  TError,
  UpdateParams<TVariables>,
  UpdateContext<TData>
>


export const useUpdate = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {}
>(): UseUpdateReturnType<TData, TError, TVariables> => {
  const queryClient = useQueryClient()
  const dataProvider = useDataProvider()

  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext
  } = useMutationMode()
  const invalidateStore = useInvalidate()

  const mutation = useMutation<
    UpdateResponse<TData>,
    TError,
    UpdateParams<TVariables>,
    UpdateContext<TData>
  >(
    ({
      id,
      values,
      resource,
      mutationMode,
      undoableTimeout,
      onCancel,
      metaData,
      dataProviderName
    }) => {
      const mutationModePropOrContext = mutationMode ?? mutationModeContext

      const undoableTimeoutPropOrContext =
        undoableTimeout ?? undoableTimeoutContext

      if (!(mutationModePropOrContext === 'undoable')) {
        return dataProvider(dataProviderName).update<TData, TVariables>({
          resource,
          id,
          variables: values,
          metaData
        })
      }
      const updatePromise = new Promise<UpdateResponse<TData>>(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(dataProviderName)
              .update<TData, TVariables>({
                resource,
                id,
                variables: values,
                metaData
              })
              .then(result => resolve(result))
              .catch(err => reject(err))
          }

          const cancelMutation = () => {
            reject({ message: 'mutationCancelled' })
          }

          if (onCancel) {
            onCancel(cancelMutation)
          }
        }
      )
      return updatePromise
    },
    {
      onMutate: async ({
        resource,
        id,
        mutationMode,
        values,
        dataProviderName
      }) => {
        const queryKey = queryKeys(resource, dataProviderName)

        const previousQueries: PreviousQuery<
          TData
        >[] = queryClient.getQueriesData(queryKey.resourceAll)

        const mutationModePropOrContext = mutationMode ?? mutationModeContext

        await queryClient.cancelQueries(queryKey.resourceAll, undefined, {
          silent: true
        })

        if (!(mutationModePropOrContext === 'pessimistic')) {
          // Set the previous queries to the new ones:
          queryClient.setQueriesData(
            queryKey.list(),
            (previous?: GetListResponse<TData> | null) => {
              if (!previous) {
                return null
              }
              const data = previous.data.map((record: TData) => {
                if (record.id?.toString() === id?.toString()) {
                  return ({
                    id,
                    ...values
                  } as unknown) as TData
                }
                return record
              })

              return {
                ...previous,
                data
              }
            }
          )

          queryClient.setQueriesData(
            queryKey.many(),
            (previous?: GetListResponse<TData> | null) => {
              if (!previous) {
                return null
              }

              const data = previous.data.map((record: TData) => {
                if (record.id?.toString() === id?.toString()) {
                  record = ({
                    id,
                    ...values
                  } as unknown) as TData
                }
                return record
              })
              return {
                ...previous,
                data
              }
            }
          )

          queryClient.setQueriesData(
            queryKey.detail(id),
            (previous?: GetListResponse<TData> | null) => {
              if (!previous) {
                return null
              }

              return {
                ...previous,
                data: {
                  ...previous.data,
                  ...values
                }
              }
            }
          )
        }

        return {
          previousQueries,
          queryKey
        }
      },
      onSettled: (
        _data,
        _error,
        {
          id,
          resource,
          dataProviderName,
          invalidates = ['list', 'many', 'detail']
        }
      ) => {
        invalidateStore({
          resource,
          dataProviderName,
          invalidates,
          id
        })
      },
      onSuccess: (data, { id, resource }) => {},
      onError: (err: TError, { id, resource }, context) => {
        // set back the queries to the context:

        if (context) {
          for (const query of context.previousQueries) {
            queryClient.setQueryData(query[0], query[1])
          }
        }

        if (err.message !== 'mutationCancelled') {
        }
      }
    }
  )

  return mutation
}
