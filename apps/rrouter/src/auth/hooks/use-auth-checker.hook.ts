import { useMount } from '@react-monorepo/core/src/hooks/use-mount.hook'
import { useAuthUserStore } from '@react-monorepo/rrouter/src/auth/hooks/use-auth-user-store.hook'
import { authPath } from '@react-monorepo/rrouter/src/auth/routes'
import { useI18n } from '@react-monorepo/rrouter/src/core/hooks/use-i18n.hook'
import { homePath } from '@react-monorepo/rrouter/src/home/routes'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { match, P } from 'ts-pattern'

/**
 * Hooks to check the authentication of your user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useAuthChecker()
 * ```
 */
export function useAuthChecker() {
  const [t] = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthUserStore()

  useMount(() => {
    match([!!user, location.pathname.includes('login')])
      .with([false, true], () => {})
      .with([false, P.any], () => {
        navigate(authPath.login, { replace: true })
        toast.error(t('unauthorized'))
      })
      .with([true, true], () => {
        navigate(homePath.root)
        toast.info(t('authorized'))
      })
      .otherwise(() => {})
  })
}
