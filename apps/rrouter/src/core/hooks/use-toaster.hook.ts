import { ToastContext } from '@react-monorepo/rrouter/src/core/providers/toast/context'
import { useContext } from 'react'

export function useToaster() {
  const context = useContext(ToastContext)
  if (!context)
    throw new Error('useToaster: cannot find the ToastContext')

  return context
}
