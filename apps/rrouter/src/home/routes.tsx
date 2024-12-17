import type { RouteObject } from 'react-router'
import { PageWrapper } from '@react-monorepo/rrouter/src/core/components/page-wrapper'
import { RouteErrorBoundary } from '@react-monorepo/rrouter/src/core/components/route-error-boundary'

export const homeId = {
  root: 'home',
  index: 'home:index',
} as const

export const homePath = {
  root: '/',
  index: '',
} as const

const homeIndexRoute = {
  id: homeId.index,
  index: true,
  lazy: async () => {
    const home = await import('./pages/home.page')

    return {
      loader: home.loader,
      element: <home.Element />,
      errorElement: <RouteErrorBoundary />,
    }
  },
} as const satisfies RouteObject

export const homeRoute = {
  id: homeId.root,
  path: homePath.root,
  element: <PageWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject
