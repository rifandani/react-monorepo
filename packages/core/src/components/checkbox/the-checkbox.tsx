import type { AriaCheckboxProps } from 'react-aria'
import { useRef } from 'react'
import {
  mergeProps,
  useCheckbox,
  useFocusRing,
  VisuallyHidden,
} from 'react-aria'
import { useToggleState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

export function TheCheckbox(props: AriaCheckboxProps) {
  const { children, isDisabled } = props
  const state = useToggleState(props)
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useCheckbox(props, state, ref)
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <label
      className="group flex items-center gap-3"
      aria-label="label-checkbox"
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>

      {children && (
        <span
          className={twMerge(
            'select-none',
            isDisabled
              ? 'text-gray-400'
              : 'text-gray-700 group-active:text-gray-800',
          )}
        >
          {children}
        </span>
      )}

      <div
        aria-hidden="true"
        className={twMerge(
          'flex size-5 shrink-0 items-center justify-center rounded border-2 text-white transition duration-150 ease-in-out',
          state.isSelected
            ? 'bg-indigo-500 group-active:bg-indigo-600'
            : 'bg-white',
          isDisabled
            ? 'border-gray-300'
            : isFocusVisible || state.isSelected
              ? 'border-indigo-500 group-active:border-indigo-600'
              : 'border-gray-500 group-active:border-gray-600',
          isFocusVisible && 'shadow-outline',
        )}
      >
        <svg className="size-3 stroke-current" viewBox="0 0 18 18">
          <title>Check</title>
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: 'all 400ms',
            }}
          />
        </svg>
      </div>
    </label>
  )
}
