import { Switch, type SwitchProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

function _Switch({ children, className, ...props }: SwitchProps) {
  return (
    <Switch
      className={values =>
        twMerge(
          'group inline-flex items-center gap-2 text-sm font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    >
      {values => (
        <>
          <div className="bg-input group-data-[selected]:bg-primary group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-background h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors group-data-[disabled]:opacity-50 group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-2">
            <div className="bg-background pointer-events-none block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition-transform group-data-[selected]:translate-x-5" />
          </div>
          {typeof children === 'function' ? children(values) : children}
        </>
      )}
    </Switch>
  )
}

export { _Switch as Switch }
