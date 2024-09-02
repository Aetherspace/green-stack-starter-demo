import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { z } from '@green-stack/schemas'
import { Checkbox, CheckboxProps } from './Checkbox.styled'

/* --- Context --------------------------------------------------------------------------------- */

export type CheckListContext = {
    values: string[],
    toggleValue: (value: string) => void,
}

export const CheckListContext = createContext<CheckListContext | undefined>(undefined)

export const useCheckListContext = () => {
    const context = useContext(CheckListContext)
    if (!context) throw new Error('useCheckListContext() must be used within a CheckListProvider')
    return context
}

/* --- <CheckList.Option/> --------------------------------------------------------------------- */

export const CheckListOptionProps = CheckboxProps
    .omit({ checked: true })
    .extendSchema('CheckListOptionProps', {
        className: z.string().default('mb-4'),
        value: z.string(),
    })

export type CheckListOptionProps = z.input<typeof CheckListOptionProps>

export const CheckListOption = (props: CheckListOptionProps) => {
    // Props
    const { value, label, ...restProps } = CheckListOptionProps.applyDefaults(props)
    const { className, checkboxClassName, indicatorClassName } = restProps

    // Context
    const { values, toggleValue } = useCheckListContext()

    // -- Render --

    return (
        <Checkbox
            checked={values.includes(value)}
            onCheckedChange={() => toggleValue(value)}
            label={label || value}
            {...restProps}
            className={className}
            checkboxClassName={checkboxClassName}
            indicatorClassName={indicatorClassName}
        />
    )
}

/* --- <CheckList/> ---------------------------------------------------------------------------- */

export const CheckListProps = CheckboxProps
    .omit({ checked: true,  })
    .extendSchema('CheckListProps', {
        options: z.record(z.string()),
        value: z.array(z.string()).default([]),
    })

export type CheckListProps = z.input<typeof CheckListProps> & {
    children?: ReactNode,
    onChange: (value: string[]) => void,
}

const CheckListComponent = (rawProps: CheckListProps) => {
    // Props
    const props = CheckListProps.applyDefaults(rawProps)
    const { value: currentItems, options, children, onChange, ...restProps } = props

    // State
    const [values, setValues] = useState(props.value)

    // -- Handlers --

    const toggleValue = (value: string) => {
        const shouldAdd = !currentItems.includes(value)
        setValues(shouldAdd ? [...currentItems, value] : values.filter((v) => v !== value))
    }

    // -- Effects --

    useEffect(() => {
        onChange(values)
    }, [values?.filter?.(Boolean).join('-')])

    // -- Render --

    return (
        <CheckListContext.Provider value={{ values, toggleValue }}>
            {Object.entries(options).map(([value, label]) => (
                <CheckListOption
                    key={value}
                    value={value}
                    label={label}
                    {...restProps}
                />
            ))}
            {children}
        </CheckListContext.Provider>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const CheckList = Object.assign(CheckListComponent, {
    Option: CheckListOption,
})
