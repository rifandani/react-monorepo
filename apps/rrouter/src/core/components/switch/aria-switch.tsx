import type { SwitchProps } from 'react-aria-components'
import { Switch } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

interface MySwitchProps extends Omit<SwitchProps, 'children'> {
  children: React.ReactNode
}

export function AriaSwitch({ children, className, ...props }: MySwitchProps) {
  return (
    <Switch
      className={classProps =>
        twMerge(
          'group flex items-center',
          typeof className === 'string' ? className : className?.(classProps),
        )}
      {...props}
    >
      <div className="h-5.5 border-primary group-rac-focus-visible:ring group-rac-focus-visible:ring-offset-1 group-rac-pressed:bg-primary-content group-rac-selected:bg-primary box-border flex w-10 shrink-0 cursor-default rounded-full border border-solid bg-white bg-clip-padding px-1 py-1.5 shadow-inner outline-none ring-black transition duration-200 ease-in-out">
        <span className="bg-primary group-rac-selected:translate-x-full group-rac-selected:bg-white size-3 translate-x-0 rounded-full shadow transition duration-200 ease-in-out" />
      </div>

      {children}
    </Switch>
  )
}
