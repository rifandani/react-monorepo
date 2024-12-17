import type * as React from 'react'
import { Icon } from '@iconify/react'
import {
  Header,
  Keyboard,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  Popover,
  type PopoverProps,
  Section,
  Separator,
  type SeparatorProps,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

const _MenuTrigger = MenuTrigger

const MenuSection = Section

function MenuPopover({ className, offset = 4, ...props }: PopoverProps) {
  return (
    <Popover
      offset={offset}
      className={values =>
        twMerge(
          'bg-popover text-popover-foreground data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-md shadow-md',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function _Menu<T extends object>({ className, ...props }: MenuProps<T>) {
  return (
    <Menu
      className={twMerge(
        'max-h-[inherit] overflow-auto rounded-md border p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]',
        className,
      )}
      {...props}
    />
  )
}

interface _MenuItemProps extends MenuItemProps {
  inset?: boolean
  onClick?: () => void
}

function _MenuItem({ className, inset, ...props }: _MenuItemProps) {
  return (
    <MenuItem
      className={values =>
        twMerge(
          'data-[focused]:bg-accent data-[focused]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          inset && 'pl-8',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

export interface MenuHeaderProps
  extends React.ComponentPropsWithoutRef<typeof Header> {
  inset?: boolean
  separator?: boolean
}

function MenuHeader({
  className,
  inset,
  separator = false,
  ...props
}: MenuHeaderProps) {
  return (
    <Header
      className={twMerge(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        separator && 'border-b-border -mx-1 mb-1 border-b px-3 pb-2.5',
        className,
      )}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      className={twMerge('bg-muted -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function MenuKeyboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <Keyboard
      className={twMerge(
        'ml-auto text-xs tracking-widest opacity-60',
        className,
      )}
      {...props}
    />
  )
}

function MenuCheckboxItem({ className, children, ...props }: MenuItemProps) {
  return (
    <MenuItem
      className={values =>
        twMerge(
          'data-[focused]:bg-accent data-[focused]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    >
      {values => (
        <>
          <span className="absolute left-2 flex size-4 items-center justify-center">
            {values.isSelected && (
              <Icon icon="lucide:check" className="size-4" />
            )}
          </span>

          {typeof children === 'function' ? children(values) : children}
        </>
      )}
    </MenuItem>
  )
}

function MenuRadioItem({ className, children, ...props }: MenuItemProps) {
  return (
    <MenuItem
      className={values =>
        twMerge(
          'data-[focused]:bg-accent data-[focused]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    >
      {values => (
        <>
          <span
            className="absolute left-2 flex size-3.5 items-center justify-center"
            data-is-selected={values.isSelected}
          >
            {values.isSelected && (
              <Icon icon="lucide:circle" className="size-2 fill-current" />
            )}
          </span>
          {typeof children === 'function' ? children(values) : children}
        </>
      )}
    </MenuItem>
  )
}

export {
  _Menu as Menu,
  MenuCheckboxItem,
  MenuHeader,
  _MenuItem as MenuItem,
  MenuKeyboard,
  MenuPopover,
  MenuRadioItem,
  MenuSection,
  MenuSeparator,
  _MenuTrigger as MenuTrigger,
}
export type { _MenuItemProps as MenuItemProps }
