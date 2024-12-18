import {
  ColorArea as _ColorArea,
  ColorField as _ColorField,
  ColorPicker as _ColorPicker,
  ColorSlider as _ColorSlider,
  ColorSwatch as _ColorSwatch,
  ColorSwatchPicker as _ColorSwatchPicker,
  ColorSwatchPickerItem as _ColorSwatchPickerItem,
  ColorThumb as _ColorThumb,
  ColorWheel as _ColorWheel,
  ColorWheelTrack as _ColorWheelTrack,
  SliderOutput as _SliderOutput,
  SliderTrack as _SliderTrack,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

const ColorSlider = _ColorSlider

const ColorField = _ColorField

const ColorWheelTrack = _ColorWheelTrack

const ColorPicker = _ColorPicker

const SliderOutput = _SliderOutput

interface ColorWheelProps
  extends Omit<
    React.ComponentProps<typeof _ColorWheel>,
    'outerRadius' | 'innerRadius'
  > {
  outerRadius?: number
  innerRadius?: number
}

function ColorWheel({
  outerRadius = 100,
  innerRadius = 74,
  ...props
}: ColorWheelProps) {
  return (
    <_ColorWheel
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      {...props}
    />
  )
}

function ColorArea({
  className,
  ...props
}: React.ComponentProps<typeof _ColorArea>) {
  return (
    <_ColorArea
      className={values =>
        twMerge(
          'border-border size-[192px] shrink-0 rounded-md border shadow-md',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function SliderTrack({
  className,
  ...props
}: React.ComponentProps<typeof _SliderTrack>) {
  return (
    <_SliderTrack
      className={values =>
        twMerge(
          'border-border h-7 w-[192px] rounded-md border ',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function ColorThumb({
  className,
  ...props
}: React.ComponentProps<typeof _ColorThumb>) {
  return (
    <_ColorThumb
      className={values =>
        twMerge(
          'z-10 box-border size-5 rounded-[50%] border-2 border-white shadow-md data-[focus-visible]:size-6',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function ColorSwatchPicker({
  className,
  ...props
}: React.ComponentProps<typeof _ColorSwatchPicker>) {
  return (
    <_ColorSwatchPicker
      className={values =>
        twMerge(
          'flex flex-wrap gap-2',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function ColorSwatchPickerItem({
  className,
  ...props
}: React.ComponentProps<typeof _ColorSwatchPickerItem>) {
  return (
    <_ColorSwatchPickerItem
      className={values =>
        twMerge(
          'ring-offset-background focus-visible:ring-ring size-8 overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2  data-[disabled]:pointer-events-none data-[selected]:border-white data-[disabled]:opacity-50',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

function ColorSwatch({
  className,
  ...props
}: React.ComponentProps<typeof _ColorSwatch>) {
  return (
    <_ColorSwatch
      className={values =>
        twMerge(
          'size-8',
          typeof className === 'function' ? className(values) : className,
        )}
      {...props}
    />
  )
}

export {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  ColorWheel,
  ColorWheelTrack,
  SliderOutput,
  SliderTrack,
}
export type { ColorWheelProps }
