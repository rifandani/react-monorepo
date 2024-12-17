import { isNumber } from 'radashi'
import { useCallback, useEffect, useRef } from 'react'
import { useLatest } from './use-latest.hook'

interface Handle {
  id: number
}

function setRafInterval(callback: () => void, delay = 0) {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setInterval(callback, delay),
    }
  }
  let start = new Date().getTime()
  const handle: Handle = {
    id: 0,
  }
  const loop = () => {
    const current = new Date().getTime()
    if (current - start >= delay) {
      callback()
      start = new Date().getTime()
    }
    handle.id = requestAnimationFrame(loop)
  }
  handle.id = requestAnimationFrame(loop)
  return handle
}

// biome-ignore lint/suspicious/noExplicitAny: intended
function cancelAnimationFrameIsNotDefined(_t: any): _t is number {
  return typeof cancelAnimationFrame === typeof undefined
}

function clearRafInterval(handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id))
    return clearInterval(handle.id)

  cancelAnimationFrame(handle.id)
}

/**
 * A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useInterval`,
 * the advantage is that the execution of the timer can be stopped when the page is not rendering,
 * such as page hiding or minimization.
 *
 * Please note that the following two cases are likely to be inapplicable, and `useInterval` is preferred:
 *
 * - the time interval is less than 16ms
 * - want to execute the timer when page is not rendering;
 */
export function useRafInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean
  },
) {
  const immediate = options?.immediate

  const fnRef = useLatest(fn)
  const timerRef = useRef<Handle>()

  useEffect(() => {
    if (!isNumber(delay) || delay < 0)
      return
    if (immediate)
      fnRef.current()

    timerRef.current = setRafInterval(() => {
      fnRef.current()
    }, delay) as Handle

    return () => {
      if (timerRef.current)
        clearRafInterval(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  const clear = useCallback(() => {
    if (timerRef.current)
      clearRafInterval(timerRef.current)
  }, [])

  return clear
}
