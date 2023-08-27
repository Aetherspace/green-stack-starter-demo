import React, { useState, useEffect } from 'react'
import { View } from '../../primitives'
// Types
import { stylePropDescription } from '../../schemas/ats'
// Schemas
import { z, aetherSchema, AetherProps } from '../../schemas'
// Context
import {
  CheckListComponentProps,
  CheckListContext,
  CheckListStyleContext,
} from './CheckListContext'
// Components
import AetherCheckbox from './AetherCheckbox'

/* --- Schema ---------------------------------------------------------------------------------- */

// Descriptions
const d = {
  tw: `${stylePropDescription}\n\nProviding your own classes will omit all the default tailwind classes ➡️`,
  options: `Array of checkbox options with value & label.\n\nYou can also leave this blank and use the '<AetherCheckList.Option>' component as children instead.`,
  value: `Selected current checkbox group value`,
  checkboxSpacing: `Amount of space between checkbox options in pixels`,
  label: `Checkbox label text, can also just provide a string or Text component as a child`,
}

// Docs
export const AetherCheckListBaseProps = CheckListStyleContext.extendSchema(
  'AetherCheckListBaseProps',
  {
    value: z.string().array().optional().eg(['value-1']).describe(d.value),
    options: aetherSchema('AetherCheckListOption', {
            value: z.string().describe(d.value),
            label: z.string().default('Option label').describe(d.label),
        }).array().optional().example([
            { value: 'value-1', label: 'Option 1' },
            { value: 'value-2', label: 'Option 2' },
            { value: 'value-3', label: 'Option 3' },
        ]).describe(d.options), // prettier-ignore
    checkboxSpacing: z.number().default(8).describe(d.checkboxSpacing),
    checkListClasses: z.string().default('flex flex-col').describe(d.tw),
  }
)

// Types
export type TAetherCheckListProps = AetherProps<typeof AetherCheckListBaseProps> &
  CheckListComponentProps & {
    children?: React.ReactNode
    onChange: (value: string[]) => void
  }

/* --- <AetherCheckList/> --------------------------------------------------------------------- */

const AetherCheckList = (props: TAetherCheckListProps) => {
  // Props
  const {
    value,
    options,
    onChange,
    checkboxSpacing,
    checkListClasses,
    children,
    ...aetherCheckboxStyleConfig
  } = AetherCheckListBaseProps.applyDefaults(props)

  // State
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  // Vars
  const childOptions = React.Children.toArray(children)
  const hasChildOptions = childOptions.length > 0

  // -- Handlers --

  const handleOnChange = (checked: boolean, value: string) => {
    const newValues = checked ? [...selectedValues, value] : selectedValues.filter((v) => v !== value) // prettier-ignore
    setSelectedValues(newValues)
  }

  // -- Effects --

  useEffect(() => {
    if (value?.join?.('-') !== selectedValues?.join('-')) onChange?.(selectedValues!)
  }, [selectedValues]) // eslint-disable-line react-hooks/exhaustive-deps

  // -- Render --

  return (
    <CheckListContext.Provider
      value={{
        selectedValues,
        setSelectedValues,
        ...aetherCheckboxStyleConfig,
      }}
    >
      <View className={checkListClasses}>
        {childOptions?.map((child, i) => (
          <React.Fragment key={i}>
            {!!i && <View tw={`h-[${checkboxSpacing}px]`} />}
            {child}
          </React.Fragment>
        ))}
        {hasChildOptions && !!options?.length && <View tw={`h-[${checkboxSpacing}px]`} />}
        {options?.map((option, i) => (
          <React.Fragment key={option.value}>
            {!!i && <View tw={`h-[${checkboxSpacing}px]`} />}
            <AetherCheckbox
              {...aetherCheckboxStyleConfig}
              checked={selectedValues.includes(option.value)}
              value={option.value}
              label={option.label}
              onChange={(checked) => handleOnChange(checked, option.value)}
            />
          </React.Fragment>
        ))}
      </View>
    </CheckListContext.Provider>
  )
}

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = AetherCheckListBaseProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherCheckList, {
  Option: AetherCheckbox,
})
