import { createContext, ComponentProps } from 'react'
// Types
import { createStyleDocs } from '../../schemas/ats'
// Schemas
import { z, aetherSchema, AetherProps } from '../../schemas'
// Primitives
import { Pressable, View, Text } from '../../primitives'

/* --- Schemas --------------------------------------------------------------------------------- */

const d = {
  radioColor: `Radio fill and border color. Defaults to the label text color if not provided.`,
  radioBorderClasses: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'radioBorderViewProps.style' }), // prettier-ignore
  radioIndicatorClasses: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'radioIndicatorViewProps.style' }), // prettier-ignore
  labelClasses: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'labelTextProps.style' }), // prettier-ignore
}

export const RadioGroupStyleContext = aetherSchema('RadioGroupStyleContext', {
  radioColor: z.string().color().optional().eg('#333333').describe(d.radioColor),
  radioBorderClasses: z
    .string()
    .default('w-[16px] h-[16px] border-[1px] border-solid rounded-full mr-2 items-center justify-center')
    .describe(d.radioBorderClasses), // prettier-ignore
  radioIndicatorClasses: z
    .string()
    .default('w-[8px] h-[8px] rounded-full')
    .describe(d.radioIndicatorClasses),
  labelClasses: z
    .string()
    .default('text-primary text-[14px] leading-[18px]')
    .eg('text-grey-900 text-[14px] leading-[18px]')
    .describe(d.labelClasses),
})

/* --- Types ----------------------------------------------------------------------------------- */

export type RadioGroupComponentProps = {
  pressableWrapperProps?: ComponentProps<typeof Pressable>
  radioBorderViewProps?: ComponentProps<typeof View>
  radioIndicatorViewProps?: ComponentProps<typeof View>
  labelTextProps?: ComponentProps<typeof Text>
}

export type RadioGroupStyleContextType = AetherProps<typeof RadioGroupStyleContext> &
  RadioGroupComponentProps

export type RadioGroupContextType = AetherProps<typeof RadioGroupStyleContext> &
  RadioGroupComponentProps & {
    selectedValue?: string | null
    setSelectedValue?: (value: string | null) => void
  }

/* --- Context --------------------------------------------------------------------------------- */

export const RadioGroupContext = createContext<RadioGroupContextType>({
  selectedValue: null,
  setSelectedValue: undefined,
  radioColor: undefined,
  radioBorderClasses: undefined,
  radioIndicatorClasses: undefined,
  labelClasses: undefined,
  pressableWrapperProps: undefined,
  radioBorderViewProps: undefined,
  radioIndicatorViewProps: undefined,
  labelTextProps: undefined,
})
