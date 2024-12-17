import type { UserStoreLocalStorage } from '@react-monorepo/rrouter/src/auth/hooks/use-auth-user-store.hook'
import {
  userStoreLocalStorageSchema,
  userStoreName,
} from '@react-monorepo/rrouter/src/auth/hooks/use-auth-user-store.hook'

/**
 * check if user is authenticated or not by checking localStorage and parse the schema
 *
 * @env browser
 */
export function checkAuthUser() {
  const appUser = localStorage.getItem(userStoreName) ?? '{}'
  const parsedAppUser = JSON.parse(appUser) as UserStoreLocalStorage
  const parsed = userStoreLocalStorageSchema.safeParse(parsedAppUser)

  return parsed.success && !!parsed.data.state.user
}
