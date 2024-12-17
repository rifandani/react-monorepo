import { loginRoute, notFoundRoute } from '@react-monorepo/rrouter/src/auth/routes'
import { homeRoute } from '@react-monorepo/rrouter/src/home/routes'
import { todosRoute } from '@react-monorepo/rrouter/src/todo/routes'
import { StrictMode } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { Devtools } from './providers/devtools'
import { AppI18nProvider } from './providers/i18n/provider'
import { AppQueryProvider } from './providers/query/provider'
import { ReloadPromptSw } from './providers/reload-prompt-sw'
import { AppToastProvider } from './providers/toast/provider'

// router singleton
const browserRouter = createBrowserRouter(
  [homeRoute, todosRoute, loginRoute, notFoundRoute],
)

export function App() {
  return (
    <StrictMode>
      <AppQueryProvider>
        <AppI18nProvider>
          <AppToastProvider>
            {/* router entry point */}
            <RouterProvider
              router={browserRouter}
            />

            {/* PWA */}
            <ReloadPromptSw />

            <Devtools />
          </AppToastProvider>
        </AppI18nProvider>
      </AppQueryProvider>
    </StrictMode>
  )
}
