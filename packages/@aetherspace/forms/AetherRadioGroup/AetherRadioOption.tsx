import React, { useContext, useState } from 'react'
import { Pressable, View, Text } from '../../primitives'
// Types
import { stylePropDescription } from '../../schemas/ats'
// Schemas
import { z, AetherProps } from '../../schemas'
// Context
import {
  RadioGroupContext,
  RadioGroupStyleContext,
  RadioGroupStyleContextType,
} from './RadioGroupContext'
// Styles
import { twStyled, useTailwindStyles } from '../../styles'

/* --- Schema ---------------------------------------------------------------------------------- */

// Descriptions
const d = {
  tw: `${stylePropDescription}\n\nProviding your own classes will omit all the default tailwind classes ➡️`,
  radioColor: `Radio fill and border color`,
  selected: `Whether the radio option is checked or not`,
  value: `Value for this radio option`,
  label: `Radio label text, can also just provide a string or Text component as a child`,
}

// Docs
export const AetherRadioOptionBaseProps = RadioGroupStyleContext.extendSchema(
  'AetherRadioOptionBaseProps',
  {
    value: z.string().describe(d.value).eg('value-1'),
    selected: z.boolean().default(false).describe(d.selected),
    label: z.string().default('Radio option label').describe(d.label),
  }
)

// Types
export type TAetherRadioOptionProps = AetherProps<typeof AetherRadioOptionBaseProps> &
  RadioGroupStyleContextType & {
    children?: React.ReactNode
    onChange?: (checked: boolean) => void
  }

/* --- useRadioGroupContext() --------------------------------------------------------------------- */

const useRadioGroupContext = (defaultValue: string | null = null) => {
  // State
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue)

  // Context
  const radioGroupContext = useContext(RadioGroupContext)

  // Return
  return {
    ...radioGroupContext,
    selectedValue: radioGroupContext?.selectedValue ?? selectedValue,
    setSelectedValue: radioGroupContext?.setSelectedValue ?? setSelectedValue,
  }
}

/* --- <AetherRadioOption/> ----------------------------------------------------------------------- */

const AetherRadioOption = (props: TAetherRadioOptionProps) => {
  // Props
  const { selected, value, label, children, onChange, ...radioStyleProps } =
    AetherRadioOptionBaseProps.applyDefaults(props)

  // Context
  const { selectedValue, setSelectedValue, ...radioStyleContext } = useRadioGroupContext()

  // Vars
  const isSelected = value === selectedValue || selected
  const checkboxLabel = typeof children === 'string' ? children : label

  // -- Styles --

  // -i- Check prop override, then context, then fallback to defaults
  const getConfig = <K extends keyof typeof radioStyleContext>(key: K) => {
    return (props[key] || radioStyleContext[key] || radioStyleProps[key]) as typeof radioStyleProps[K] // prettier-ignore
  }

  const radioBorderClasses = getConfig('radioBorderClasses')
  const radioIndicatorClasses = getConfig('radioIndicatorClasses')
  const labelClasses = getConfig('labelClasses')

  const labelStyles = useTailwindStyles(labelClasses)

  const radioColor = getConfig('radioColor') || labelStyles.color

  const pressableWrapperProps = getConfig('pressableWrapperProps')
  const radioBorderViewProps = getConfig('radioBorderViewProps')
  const radioIndicatorViewProps = getConfig('radioIndicatorViewProps')
  const labelTextProps = getConfig('labelTextProps')

  const allRadioBorderClasses = [`border-[${radioColor}]`, radioBorderClasses].flat().filter(Boolean).join(' ') // prettier-ignore
  const allRadioIndicatorClasses = [`bg-[${radioColor}]`, radioIndicatorClasses].flat().filter(Boolean).join(' ') // prettier-ignore

  // -- Handlers --

  const onSelectedChange = () => {
    const checked = !isSelected
    if (value && !onChange) {
      const newValue = checked ? value : null
      setSelectedValue(newValue)
    } else {
      onChange?.(checked)
    }
  }

  // -- Render --

  return (
    <Pressable
      tw="flex-row items-center"
      role="radio"
      onPress={() => onSelectedChange()}
      {...pressableWrapperProps}
    >
      <StRadioOptionBorder tw={allRadioBorderClasses} role="radio" {...radioBorderViewProps}>
        {isSelected && (
          <StRadioOptionIndicator tw={allRadioIndicatorClasses} {...radioIndicatorViewProps} />
        )}
      </StRadioOptionBorder>
      {checkboxLabel ? (
        <Text tw={labelClasses} role="radio" {...labelTextProps}>
          {checkboxLabel}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

AetherRadioOption.displayName = 'AetherRadioOption'

/* --- Styles ---------------------------------------------------------------------------------- */

const StRadioOptionBorder = twStyled(View)``

const StRadioOptionIndicator = twStyled(View)``

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = AetherRadioOptionBaseProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherRadioOption
