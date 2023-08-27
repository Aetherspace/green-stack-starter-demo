import React, { useState, useContext } from 'react'
import { Pressable, View, Text } from '../../primitives'
// Schemas
import { z, AetherProps } from '../../schemas'
// Context
import {
  CheckListContext,
  CheckListStyleContext,
  CheckListStyleContextType,
} from './CheckListContext'
// Components
import { AetherIcon } from '../../components'
// Styles
import { twStyled, useTailwindStyles } from '../../styles'

/* --- Schema ---------------------------------------------------------------------------------- */

// Descriptions
const d = {
  value: `Value for this checkbox option. Only really interesting in the context of an "AetherCheckList"`,
  checked: `Whether the checkbox is checked or not`,
  label: `Checkbox label text, can also just provide a string or Text component as a child`,
}

// Docs
export const AetherCheckboxBaseProps = CheckListStyleContext.extendSchema(
  'AetherCheckboxBaseProps',
  {
    value: z.string().describe(d.value).eg('value-1'),
    checked: z.boolean().default(false).describe(d.checked),
    label: z.string().default('Checkbox label').describe(d.label),
  }
)

// Types
export type TAetherCheckboxProps = AetherProps<typeof AetherCheckboxBaseProps> &
  CheckListStyleContextType & {
    children?: React.ReactNode
    onChange?: (checked: boolean) => void
  }

/* --- useCheckListContext() ------------------------------------------------------------------- */

const useCheckListContext = (defaultValue: string[] = []) => {
  // State
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)

  // Context
  const checkListContext = useContext(CheckListContext)

  // Return
  return {
    ...checkListContext,
    selectedValues: checkListContext?.selectedValues ?? selectedValues,
    setSelectedValues: checkListContext?.setSelectedValues ?? setSelectedValues,
  }
}

/* --- <AetherCheckbox/> ----------------------------------------------------------------------- */

const AetherCheckbox = (props: TAetherCheckboxProps) => {
  // Props
  const { checked, value, label, children, onChange, ...checkboxStyleProps } =
    AetherCheckboxBaseProps.applyDefaults(props)

  // Context
  const { selectedValues, setSelectedValues, ...checkListContext } = useCheckListContext()

  // Vars
  const isChecked = selectedValues?.includes?.(value) || checked
  const checkboxLabel = typeof children === 'string' ? children : label

  // -- Styles --

  // -i- Check prop override, then context, then fallback to defaults
  const getConfig = <K extends keyof typeof checkListContext>(key: K) => {
    return (props[key] || checkListContext[key] || checkboxStyleProps[key]) as typeof checkboxStyleProps[K] // prettier-ignore
  }

  const checkboxClasses = getConfig('checkboxClasses')
  const labelClasses = getConfig('labelClasses')

  const labelTextStyles = useTailwindStyles(labelClasses)
  const defaultBgStyles = useTailwindStyles('bg-primary')

  const checkedIconName = getConfig('checkedIconName')
  const checkedIconFill = getConfig('checkedIconFill') || (defaultBgStyles.backgroundColor as string) // prettier-ignore
  const checkColor = getConfig('checkColor') || (labelTextStyles.color as string)

  const pressableWrapperProps = getConfig('pressableWrapperProps')
  const checkboxViewProps = getConfig('checkboxViewProps')
  const checkboxIconProps = getConfig('checkboxIconProps')
  const labelTextProps = getConfig('labelTextProps')

  const currentCheckboxClasses = [
    isChecked ? `bg-[${checkColor}]` : `border-[${checkColor}]`,
    checkboxClasses,
  ].flat().filter(Boolean).join(' ') // prettier-ignore

  // -- Handlers --

  const onCheckedChange = () => {
    const checked = !isChecked
    if (value && !onChange) {
      // Toggle the value in the array of selected values
      const newValues = checked ? [...selectedValues, value] : selectedValues.filter(v => v !== value) // prettier-ignore
      setSelectedValues(newValues)
    } else {
      onChange?.(checked)
    }
  }

  // -- Render --

  return (
    <Pressable
      tw="flex-row items-center"
      role="checkbox"
      onPress={() => onCheckedChange()}
      {...pressableWrapperProps}
    >
      <StCheckboxBorder tw={currentCheckboxClasses} role="checkbox" {...checkboxViewProps}>
        {isChecked && (
          <AetherIcon
            name={checkedIconName}
            fill={checkboxIconProps?.fill || checkedIconFill}
            size={checkboxIconProps?.size || 12}
            {...checkboxIconProps}
          />
        )}
      </StCheckboxBorder>
      {checkboxLabel ? (
        <Text tw={labelClasses} role="checkbox" {...labelTextProps}>
          {checkboxLabel}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

AetherCheckbox.displayName = 'AetherCheckbox'

/* --- Styles ---------------------------------------------------------------------------------- */

const StCheckboxBorder = twStyled(View)``

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = AetherCheckboxBaseProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherCheckbox
