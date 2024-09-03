import type { ReactNode, ElementRef } from 'react'
import { createContext, useContext, useState, useEffect, forwardRef } from 'react'
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from '@green-stack/forms/RadioGroup.primitives'
import { cn, View, Text, Pressable } from '../components/styled'
import { z, schema, PropsOf } from '@green-stack/schemas'

/* --- Context --------------------------------------------------------------------------------- */

export type RadioGroupContext = {
    value: string,
    setValue: (value: string) => void,
}

export const RadioGroupContext = createContext<RadioGroupContext | undefined>(undefined)

export const useRadioGroupContext = () => {
    const context = useContext(RadioGroupContext)
    if (!context) throw new Error('useRadioGroupContext() must be used within a RadioGroupProvider')
    return context
}

/* --- RadioButton Props ----------------------------------------------------------------------- */

export const RadioButtonProps = schema('RadioButtonProps', {
    value: z.string(),
    label: z.string(),
    className: z.string().default('mb-4'),
    radioButtonClassName: z.string().optional(),
    indicatorClassName: z.string().optional(),
    labelClassName: z.string().optional(),
    hitSlop: z.number().default(6),
    hasError: z.boolean().default(false),
})

export type RadioButtonProps = Omit<
    PropsOf<typeof RadioGroupItem, typeof RadioButtonProps>,
    'aria-labelledby'
> & {
    ['aria-labelledby']?: string,
}

/* --- <RadioButton/> -------------------------------------------------------------------------- */

export const RadioButton = forwardRef<
    ElementRef<typeof RadioGroupItem>,
    RadioButtonProps
>((rawProps, ref) => {
    // Props
    const props = RadioButtonProps.applyDefaults(rawProps)
    const { value, label, disabled, hasError } = props

    // Vars
    const nativeID = props.nativeID || `radio-option-${value}`
    const labelledByID = `${nativeID}-label`

    // Context
    const { value: contextValue, setValue } = useRadioGroupContext()
    const checked = contextValue === value
    
    // -- Render --

    return (
        <Pressable
            className={cn('flex flex-row items-center', props.className)}
            onPress={() => setValue(value)}
            hitSlop={props.hitSlop}
        >
            <RadioGroupItem
                ref={ref}
                hitSlop={props.hitSlop}
                onPress={() => setValue(value)}
                nativeID={nativeID}
                aria-labelledby={labelledByID}
                {...rawProps}
                className={cn(
                    'aspect-square h-4 w-4 rounded-full justify-centeritems-center border border-primary text-primary ',
                    'native:h-[20] native:w-[20]',
                    'web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
                    disabled && 'web:cursor-not-allowed opacity-50',
                    hasError && 'border border-error',
                    props.radioButtonClassName,
                )}
                asChild
            >
                <Pressable>
                    {checked && (
                        <RadioGroupIndicator
                            className={cn(
                                'flex flex-col items-center justify-center w-full h-full',
                                props.indicatorClassName,
                            )}
                            asChild
                        >
                            <Pressable>
                                <View
                                    className={cn(
                                        'relative aspect-square h-[9px] w-[9px] bg-primary rounded-full',
                                        'native:h-[10] native:w-[10]',
                                        hasError && 'bg-error',
                                    )}
                                />
                            </Pressable>
                        </RadioGroupIndicator>
                    )}
                </Pressable>
            </RadioGroupItem>
            {!!label && (
                <Text
                    className={cn(
                        'flex items-center ml-2 web:select-none',
                        props.labelClassName,
                    )}
                    role="checkbox"
                    nativeID={labelledByID}
                    onPress={() => setValue(value)}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    )
})

RadioButton.displayName = 'RadioButton'

/* --- RadioGroup Props ------------------------------------------------------------------------ */

export const RadioGroupProps = RadioButtonProps
    .omit({ label: true })
    .extendSchema('RadioGroupProps', {
        options: z.record(z.string()),
        value: z.string().default(''),
        className: z.string().optional(), 
        radioButtonClassName: z.string().optional(),
    })

export type RadioGroupProps = Omit<
    PropsOf<typeof RadioGroupRoot, typeof RadioGroupProps>,
    'onValueChange'
> & {
    children?: ReactNode,
    onChange: (value: string) => void,
}

/* --- <RadioGroup/> --------------------------------------------------------------------------- */

const RadioGroupComponent = forwardRef<
    ElementRef<typeof RadioGroupRoot>,
    RadioGroupProps
>((rawProps, ref) => {
    // Props
    const props = RadioGroupProps.applyDefaults(rawProps)
    const { className, options, children, onChange, ...restProps } = props

    // State
    const [value, setValue] = useState(props.value)

    // -- Effects --

    useEffect(() => onChange(value), [value])

    // -- Render --

    return (
        <RadioGroupContext.Provider value={{ value, setValue }}>
            <RadioGroupRoot
                ref={ref}
                {...restProps}
                value={value}
                onValueChange={setValue}
                className={cn('flex flex-col', className)}
                asChild
            >
                <Pressable>
                    {Object.entries(options).map(([optionValue, label]) => (
                        <RadioButton
                            key={optionValue}
                            {...restProps}
                            className={props.radioButtonClassName}
                            value={optionValue}
                            label={label}
                        />
                    ))}
                    {children}
                </Pressable>
            </RadioGroupRoot>
        </RadioGroupContext.Provider>
    )
})

RadioGroupComponent.displayName = 'RadioGroup'

/* --- Exports --------------------------------------------------------------------------------- */

export const RadioGroup = Object.assign(RadioGroupComponent, {
    Item: RadioButton,
    Option: RadioButton,
})
