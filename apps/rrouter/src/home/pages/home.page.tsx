import { useAutoAnimate } from '@formkit/auto-animate/react'
import { authPath } from '@react-monorepo/rrouter/src/auth/routes'
import { useI18n } from '@react-monorepo/rrouter/src/core/hooks/use-i18n.hook'
import { checkAuthUser } from '@react-monorepo/rrouter/src/core/utils/checker.util'
import { HomeClock } from '@react-monorepo/rrouter/src/home/components/home-clock'
import { type LoaderFunction, redirect } from 'react-router'
import { toast } from 'sonner'

export const loader: LoaderFunction = () => {
  const authed = checkAuthUser()

  // redirect NOT authed user to login
  if (!authed) {
    toast.error('Unauthorized')
    return redirect(authPath.login)
  }

  return null
}

export function Element() {
  const [t] = useI18n()
  const [parentRef] = useAutoAnimate()

  return (
    <div
      ref={parentRef}
      className="container mx-auto flex flex-col items-center py-24 duration-300"
    >
      <h1 className="text-3xl sm:text-4xl">{t('title')}</h1>

      <HomeClock />
    </div>
  )
}
