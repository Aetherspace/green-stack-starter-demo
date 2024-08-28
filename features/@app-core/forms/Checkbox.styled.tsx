import * as React from 'react'
import { CheckboxRoot, CheckboxIndicator } from '@green-stack/forms/Checkbox.primitives'
import { cn, theme, View, Text, Pressable } from '../components/styled'
import { CheckFilled } from '../icons/CheckFilled'
import { z, schema, PropsOf } from '@green-stack/schemas'

/* --- Props ----------------------------------------------------------------------------------- */

export const CheckboxProps = schema('CheckboxProps', {
    checked: z.boolean().default(false),
    label: z.string().optional(),
    className: z.string().optional(),
    indicatorClassName: z.string().optional(),
    hitSlop: z.number().default(24),
    hasError: z.boolean().default(false),
})

export type CheckboxProps = PropsOf<typeof CheckboxRoot, typeof CheckboxProps>

/* --- <Checkbox/> ----------------------------------------------------------------------------- */

export const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxRoot>,
    CheckboxProps
>((rawProps, ref) => {
    // Props
    const props = CheckboxProps.applyDefaults(rawProps)
    const { checked, label, hasError, onCheckedChange } = props

    // -- Render --

    return (
        <View className="flex flex-row items-center">
            <CheckboxRoot
                ref={ref}
                className={cn(
                    'h-4 w-4 shrink-0 rounded-sm border border-primary',
                    'native:h-[20] native:w-[20] native:rounded',
                    'web:peer web:ring-offset-background',
                    'web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    checked && 'bg-primary',
                    checked && hasError && 'bg-error',
                    hasError && 'border border-error',
                    props.className,
                )}
                hitSlop={props.hitSlop}
                asChild
                {...rawProps}
            >
                <Pressable>
                    <CheckboxIndicator
                        className={cn(
                            'items-center justify-center h-full w-full',
                            props.indicatorClassName,
                        )}
                        hitSlop={props.hitSlop}
                        asChild
                    >
                        <Pressable>
                            {checked && (
                                <CheckFilled
                                    size={12} // @ts-ignore
                                    color={theme?.colors?.primaryLight}
                                    className={cn(
                                        checked && 'text-white',
                                        hasError && 'text-red-500',
                                    )}
                                />
                            )}
                        </Pressable>
                    </CheckboxIndicator>
                </Pressable>
            </CheckboxRoot>
            {!!label && (
                <Text
                    className="flex items-center ml-2"
                    onPress={() => onCheckedChange(!checked)}
                >
                    {label}
                </Text>
            )}
        </View>
    )
})
