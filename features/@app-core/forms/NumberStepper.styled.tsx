import { forwardRef, ElementRef, useState, useEffect } from 'react'
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import { TextInput } from './TextInput.styled'
import { z, schema } from '@green-stack/schemas'
import { cn, View, Pressable } from '../components/styled'
import { Icon } from '@green-stack/components/Icon'

/* --- Schema ---------------------------------------------------------------------------------- */

export const NumberStepperProps = schema('NumberStepperProps', {
    value: z.number().default(0),
    min: z.number().default(0),
    max: z.number().optional(),
    step: z.number().default(1),
    placeholder: z.string().optional().example('Enter number...'),
    className: z.string().optional(),
    placeholderClassName: z.string().optional(),
    placeholderTextColor: z.string().optional(),
    hasError: z.boolean().default(false),
    readOnly: z.boolean().default(false),
    disabled: z.boolean().default(false),
})

type NumberStepperProps = z.input<typeof NumberStepperProps> & {
    onChange: (value: number) => void
}

/* --- <NumberStepper/> ------------------------------------------------------------------------ */

export const NumberStepper = forwardRef<
    ElementRef<typeof TextInput>,
    NumberStepperProps
>((rawProps, ref) => {
    // Props
    const props = NumberStepperProps.applyDefaults(rawProps)
    const { min, max, step, onChange, ...restProps } = props

    // State
    const [value, setValue] = useState(props.value)

    // Helpers
    const constrainValue = (value: number) => Math.min(Math.max(value, min), max || Infinity)

    // Vars
    const numberValue = constrainValue(value)

    // Flags
    const hasMinValue = typeof rawProps.min !== undefined
    const hasMaxValue = typeof rawProps.max !== undefined
    const hasReachedMin = hasMinValue && numberValue === min
    const hasReachedMax = hasMaxValue && numberValue === max
 
    // -- Handlers --

    const onIncrement = () => setValue(constrainValue(numberValue + step))

    const onDecrement = () => setValue(constrainValue(numberValue - step))

    const onKeyPress = ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const isUpKey = nativeEvent.key === 'ArrowUp'
        const isDownKey = nativeEvent.key === 'ArrowDown'
        if (isUpKey) return onIncrement()
        if (isDownKey) return onDecrement()
    }

    // -- Effects --

    useEffect(() => {
        if (value) onChange(value)
    }, [value])

    // -- Render --

    return (
        <View
            className={cn(
                'h-10 native:h-12',
                'web:flex web:w-full',
                'web:max-w-[200px]',
            )}
        >
            <Pressable
                className={cn(
                    "absolute top-0 left-0 items-center justify-center select-none z-10",
                    "w-10 h-10 native:w-12 native:h-12",
                    "border-r border-r-input",
                    hasReachedMin && 'opacity-50',
                    props.hasError && 'border-r-error',
                )}
                onPress={onDecrement}
                disabled={hasReachedMin}
                hitSlop={10}
            >
                <Icon name="RemoveFilled" size={20} />
            </Pressable>
            <TextInput
                ref={ref}
                inputMode="numeric"
                {...restProps}
                className={cn(
                    'text-center',
                    'px-10 native:px-12',
                    'web:max-w-[200px]',
                    props.className,
                )}
                onKeyPress={onKeyPress}
                value={value ? `${value}` : ''}
                onChangeText={(newValue = '') => {
                    // Strip non-numeric characters
                    const strippedValue = newValue.replace(/[^0-9]/g, '')
                    // If empty, show placeholder
                    if (!strippedValue) setValue(undefined as unknown as number)
                    // Convert to number
                    const newNumberValue = +strippedValue 
                    // @ts-ignore
                    setValue(newNumberValue)
                }}
            />
            <Pressable
                className={cn(
                    "absolute top-0 right-0 items-center justify-center select-none z-10",
                    "w-10 h-10 native:w-12 native:h-12",
                    "border-l border-l-input",
                    hasReachedMax && 'opacity-50',
                    props.hasError && 'border-l-error',
                )}
                onPress={onIncrement}
                disabled={hasReachedMax}
                hitSlop={10}
            >
                <Icon name="AddFilled" size={20} />
            </Pressable>
        </View>
    )
})


