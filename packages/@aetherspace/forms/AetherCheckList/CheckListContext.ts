import { createContext, ComponentProps } from 'react'
// Types
import { createStyleDocs } from '../../schemas/ats'
// Schemas
import { z, aetherSchema, AetherProps } from '../../schemas'
// Primitives
import { Pressable, View, Text } from '../../primitives'
// Components
import { AetherIcon, AetherIconKeyProp } from '../../components'

/* --- Schemas --------------------------------------------------------------------------------- */

const d = {
  labelClasses: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'labelTextProps.style' }), // prettier-ignore
  checkboxClasses: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'checkboxViewProps.style' }), // prettier-ignore
  checkedIconName: `Icon name, from the list available on the 'AetherIcon' component`,
  checkedIconFill: `Icon fill color when checked. Default to the 'bg-primary' color from your twrnc.theme.js file is not provided.`,
  checkColor: `Checkbox fill or border color. Defaults to the label text color if not provided.`,
}

export const CheckListStyleContext = aetherSchema('CheckListStyleContext', {
  labelClasses: z
    .string()
    .default('text-primary text-[14px] leading-[18px]')
    .eg('text-grey-900 text-[14px] leading-[18px]')
    .describe(d.labelClasses),
  checkboxClasses: z
    .string()
    .default('w-[16px] h-[16px] border-[1px] border-solid border-primary rounded-[3px] mr-2 items-center justify-center')
    .describe(d.checkboxClasses), // prettier-ignore
  checkedIconName: AetherIconKeyProp.default('check-filled').describe(d.checkedIconName),
  checkedIconFill: z.string().color().optional().eg('#FFFFFF').describe(d.checkedIconFill),
  checkColor: z.string().color().optional().eg('#333333').describe(d.checkColor),
})

/* --- Types ----------------------------------------------------------------------------------- */

export type CheckListComponentProps = {
  pressableWrapperProps?: ComponentProps<typeof Pressable>
  checkboxViewProps?: ComponentProps<typeof View>
  checkboxIconProps?: ComponentProps<typeof AetherIcon>
  labelTextProps?: ComponentProps<typeof Text>
}

export type CheckListStyleContextType = AetherProps<typeof CheckListStyleContext> &
  CheckListComponentProps

export type CheckListContextType = AetherProps<typeof CheckListStyleContext> &
  CheckListComponentProps & {
    selectedValues?: string[]
    setSelectedValues?: (values: string[]) => void
  }

/* --- Context --------------------------------------------------------------------------------- */

export const CheckListContext = createContext<CheckListContextType>({
  selectedValues: undefined,
  setSelectedValues: undefined,
  labelClasses: undefined,
  checkboxClasses: undefined,
  checkedIconName: undefined,
  checkedIconFill: undefined,
  checkColor: undefined,
  pressableWrapperProps: undefined,
  checkboxViewProps: undefined,
  checkboxIconProps: undefined,
  labelTextProps: undefined,
})
