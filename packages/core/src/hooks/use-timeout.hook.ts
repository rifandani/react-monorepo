import { isNumber } from 'radashi'
import { useCallback, useEffect, useRef } from 'react'
import { useMemoizedFn } from './use-memoized-fn.hook'

/**
 * A hook that handles the setTimeout timer function.
 *
 * @example
 *
 * const clear = useTimeout(() => {
 *   setCount(count + 1);
 * }, delay);
 */
export function useTimeout(fn: () => void, delay?: number) {
  const timerCallback = useMemoizedFn(fn)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current)
      clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (!isNumber(delay) || delay < 0)
      return

    timerRef.current = setTimeout(timerCallback, delay)

    return clear
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  return clear
}
