import type { ReactNode } from 'react'

interface Props<T> {
  each: T[]
  children: (item: T, index: number) => ReactNode
  fallback?: ReactNode
}

function simpleMap<T>(
  props: Props<T>,
  wrap: (fn: Props<T>['children'], item: T, i: number) => ReactNode,
) {
  const list = props.each
  const len = list.length

  if (len) {
    const mapped = Array.from<ReactNode>({ length: len })
    for (let i = 0; i < len; i += 1)
      mapped[i] = wrap(props.children, list[i], i)

    return mapped
  }

  return props.fallback
}

export function For<T>(props: Props<T>) {
  return simpleMap<T>(props, (fn, item, i) => fn(item, i))
}
