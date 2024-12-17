import type { ErrorResponseSchema } from '@react-monorepo/core/src/schemas/api.schema'
import type { Except } from 'type-fest'
import type { ZodError } from 'zod'
import {
  authKeys,
  type AuthLoginRequestSchema,
  authRepositories,
} from '@react-monorepo/rrouter/src/auth/apis/auth.api'
import {
  type MutationState,
  useMutation,
  type UseMutationOptions,
  useMutationState,
} from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { toast } from 'sonner'

type Params = Parameters<typeof authKeys.login>[0]
type Success = Awaited<ReturnType<typeof authRepositories.login>>
type Error = ErrorResponseSchema | HTTPError | ZodError

/**
 * @url POST ${env.apiBaseUrl}/auth/login
 * @note includes error handling for convenience
 */
export function useAuthLogin(
  params: Params,
  mutationOptions?: Except<
    UseMutationOptions<Success, Error, Exclude<Params, undefined>>,
    'mutationKey' | 'mutationFn'
  >,
) {
  const { onError, ..._mutationOptions } = mutationOptions ?? {}

  return useMutation<Success, Error, Exclude<Params, undefined>>({
    mutationKey: authKeys.login(params),
    mutationFn: json => authRepositories.login({ json }),
    onError: async (error, variables, context) => {
      if (error instanceof HTTPError) {
        const json = (await error.response.json()) as ErrorResponseSchema
        toast.error(json.message)
      }
      else {
        toast.error(error.message)
      }

      onError?.(error, variables, context)
    },
    ..._mutationOptions,
  })
}

/**
 * Get mutation state based on the mutation key.
 */
export function useAuthLoginMutationState(params: AuthLoginRequestSchema) {
  return useMutationState<
    MutationState<Success, Error, Exclude<Params, undefined>>
  >({
    filters: {
      mutationKey: authKeys.login(params),
    },
  })
}
