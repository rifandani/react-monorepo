import { createSearchParams, type URLSearchParamsInit } from 'react-router'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Check if we are in browser, not server
 */
export const isBrowser = () => typeof window !== 'undefined'

/**
 * This will works with below rules, otherwise it only view on new tab
 * 1. If the file source located in the same origin as the application.
 * 2. If the file source is on different location e.g s3 bucket, etc. Set the response headers `Content-Disposition: attachment`.
 */
export function doDownload(url: string) {
  if (!url)
    return
  const link = document.createElement('a')
  link.href = url
  link.download = url
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * create merge function with custom config which extends the default config.
 * Use this if you use the default Tailwind config and just extend it in some places.
 */
export const tw = extendTailwindMerge<'alert'>({
  extend: {
    classGroups: {
      // ↓ The `foo` key here is the class group ID
      //   ↓ Creates group of classes which have conflicting styles
      //     Classes here: 'alert-info', 'alert-success', 'alert-warning', 'alert-error'
      alert: ['alert-info', 'alert-success', 'alert-warning', 'alert-error'],
    },
    // ↓ Here you can define additional conflicts across different groups
    conflictingClassGroups: {
      // ↓ ID of class group which creates a conflict with…
      //     ↓ …classes from groups with these IDs
      // In this case `tw('alert-success alert-error') → 'alert-error'`
      alert: ['alert'],
    },
  },
})

/**
 * instead of using `createSearchParams`, this function will convert an object into a URLSearchParams and joins array of string value with a comma
 *
 * @example
 *
 * const searchParams = createSearchParamsWithComa({
 *   sort: 'asc',
 *   filters: [
 *     "model",
 *     "category",
 *   ]
 * });
 *
 * // returns => sort=asc&filters=model,category
 * // instead of => sort=asc&filters=model&filters=category
 */
export function createSearchParamsWithComma(init?: URLSearchParamsInit) {
  const searchParams = init ? createSearchParams(init) : new URLSearchParams()

  // replace array of string values with a comma separated value
  for (const [key, value] of Object.entries(init ?? {})) {
    if (Array.isArray(value)) {
      searchParams.delete(key)
      searchParams.set(key, value.join(','))
    }
  }

  return searchParams
}
