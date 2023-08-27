import { useMemo } from 'react'
import { TailwindFn } from 'twrnc'
// Context
import { useAetherContext } from '../context'

/* --- Types ----------------------------------------------------------------------------------- */

export type ColorClassname =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-muted'
  | 'text-success'
  | 'text-warning'
  | 'text-danger'
  | 'text-info'
  | 'text-on-primary-bg'
  | 'text-on-secondary-bg'
  | 'text-on-tertiary-bg'
  | 'text-on-muted-bg'
  | 'text-on-success-bg'
  | 'text-on-warning-bg'
  | 'text-on-danger-bg'
  | 'text-on-info-bg'
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-tertiary'
  | 'bg-muted'
  | 'bg-success'
  | 'bg-warning'
  | 'bg-danger'
  | 'bg-info'
  | (string & {}) // eslint-disable-line @typescript-eslint/ban-types

/** --- getThemeColor() ------------------------------------------------------------------------ */
/** -i- Extract a color value from your tailwind twrnc theme classname. Checks for 'color', 'backgroundColor' and 'borderColor' in order. */
const getThemeColor = (colorClass: ColorClassname, tailwindFn: TailwindFn): string => {
  // Use tailwind function to transform color class into a style object with the color value
  const styleObject = tailwindFn`${colorClass}`
  const colorValue = styleObject.color || styleObject.backgroundColor || styleObject.borderColor
  return colorValue as string
}

/** --- useThemeColor() ------------------------------------------------------------------------ */
/** -i- React hook to extract a color value from your tailwind twrnc theme classname. Checks for 'color', 'backgroundColor' and 'borderColor' in order. */
export const useThemeColor = (colorClass: ColorClassname): string => {
  // Context
  const { tailwind } = useAetherContext()

  // Memoize
  const colorValue = useMemo(() => getThemeColor(colorClass, tailwind!), [colorClass, tailwind])

  // Return
  return colorValue
}
