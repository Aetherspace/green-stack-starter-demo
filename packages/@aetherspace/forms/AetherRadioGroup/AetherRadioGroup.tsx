import React, { useState, useEffect } from 'react'
import { View } from '../../primitives'
// Types
import { stylePropDescription } from '../../schemas/ats'
// Schemas
import { z, aetherSchema, AetherProps } from '../../schemas'
// Context
import {
  RadioGroupComponentProps,
  RadioGroupContext,
  RadioGroupStyleContext,
} from './RadioGroupContext'
// Components
import AetherRadioOption from './AetherRadioOption'

/* --- Schema ---------------------------------------------------------------------------------- */

// Descriptions
const d = {
  tw: `${stylePropDescription}\n\nProviding your own classes will omit all the default tailwind classes ➡️`,
  options: `Array of radio options with value & label.\n\nYou can also leave this blank and use the '<AetherRadioGroup.Option>' component as children instead.`,
  value: `Selected current radio group value`,
  radioSpacing: `Amount of space between radio options in pixels`,
  label: `Radio label text, can also just provide a string or Text component as a child`,
}

// Docs
export const AetherRadioGroupBaseProps = RadioGroupStyleContext.extendSchema(
  'AetherRadioGroupBaseProps',
  {
    value: z.string().optional().eg('value-1').describe(d.value),
    options: aetherSchema('AetherRadioGroupOption', {
        value: z.string().describe(d.value),
        label: z.string().default('Option label').describe(d.label),
    }).array().optional().example([
        { value: 'value-1', label: 'Option 1' },
        { value: 'value-2', label: 'Option 2' },
        { value: 'value-3', label: 'Option 3' },
    ]).describe(d.options), // prettier-ignore
    radioSpacing: z.number().default(8).describe(d.radioSpacing),
    radioGroupClasses: z.string().default('flex flex-col').describe(d.tw),
  }
)

// Types
export type TAetherRadioGroupProps = AetherProps<typeof AetherRadioGroupBaseProps> &
  RadioGroupComponentProps & {
    children?: React.ReactNode
    onChange: (value: string) => void
  }

/* --- <AetherRadioGroup/> --------------------------------------------------------------------- */

const AetherRadioGroup = (props: TAetherRadioGroupProps) => {
  // Props
  const {
    value,
    options,
    onChange,
    radioSpacing,
    radioGroupClasses,
    children,
    ...aetherRadioOptionStyleConfig
  } = AetherRadioGroupBaseProps.applyDefaults(props)

  // State
  const [selectedValue, setSelectedValue] = useState<string | null>(value || null)

  // Vars
  const childOptions = React.Children.toArray(children)
  const hasChildOptions = childOptions.length > 0

  // -- Handlers --

  const onValueChange = (value: string) => {
    const newValue = value === selectedValue ? null : value
    setSelectedValue(newValue)
  }

  // -- Effects --

  useEffect(() => {
    if (value !== selectedValue && selectedValue != null) onChange?.(selectedValue)
  }, [selectedValue]) // eslint-disable-line react-hooks/exhaustive-deps

  // -- Render --

  return (
    <RadioGroupContext.Provider
      value={{ selectedValue, setSelectedValue, ...aetherRadioOptionStyleConfig }}
    >
      <View tw={radioGroupClasses} role="radiogroup">
        {childOptions?.map((child, i) => (
          <React.Fragment key={i}>
            {!!i && <View tw={`h-[${radioSpacing}px]`} />}
            {child}
          </React.Fragment>
        ))}
        {hasChildOptions && !!options?.length && <View tw={`h-[${radioSpacing}px]`} />}
        {options?.map((option, i) => (
          <React.Fragment key={option.value}>
            {!!i && <View tw={`h-[${radioSpacing}px]`} />}
            <AetherRadioOption
              {...aetherRadioOptionStyleConfig}
              selected={option.value === selectedValue}
              value={option.value}
              label={option.label}
              onChange={() => onValueChange(option.value)}
            />
          </React.Fragment>
        ))}
      </View>
    </RadioGroupContext.Provider>
  )
}

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = AetherRadioGroupBaseProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherRadioGroup, {
  Option: AetherRadioOption,
})
