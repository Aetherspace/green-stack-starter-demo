import type { ReactNode, ElementRef, Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useState, useEffect, forwardRef } from 'react'
import { Platform, StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SP from '@green-stack/forms/Select.primitives'
import { cn, View, Text, Pressable } from '../components/styled'
import { ChevronDownFilled } from '../icons/ChevronDownFilled'
import { ChevronUpFilled } from '../icons/ChevronUpFilled'
import { CheckFilled } from '../icons/CheckFilled'
import { z, schema, PropsOf } from '@green-stack/schemas'

/* --- Constants ------------------------------------------------------------------------------- */

const isWeb = Platform.OS === 'web'
const isMobile = ['ios', 'android'].includes(Platform.OS)

/* --- Context --------------------------------------------------------------------------------- */

export type SelectContext = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    options: Record<string, string>,
    setOptions: Dispatch<SetStateAction<Record<string, string>>>,
}

export const SelectContext = createContext<SelectContext | undefined>(undefined)

export const useSelectContext = () => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('useSelectContext() must be used within a SelectProvider')
    return context
}

/* --- <SelectTrigger/> ------------------------------------------------------------------------ */

export const SelectTriggerProps = schema('SelectTriggerProps', {
    className: z.string().optional(),
    hasError: z.boolean().default(false),
})

export type SelectTriggerProps = PropsOf<typeof SP.SelectTrigger, typeof SelectTriggerProps>

export const SelectTrigger = forwardRef<
    ElementRef<typeof SP.SelectTrigger>,
    SelectTriggerProps
>((rawProps, ref) => {
    // Props
    const props = SelectTriggerProps.applyDefaults(rawProps)
    const { children, disabled, hasError, ...restProps } = props

    // -- Render --

    return (
        <SP.SelectTrigger
            ref={ref}
            {...restProps}
            className={cn(
                'flex flex-row h-10 items-center text-sm justify-between rounded-md border border-input bg-background px-3 py-2 text-muted-foreground',
                'native:h-12',
                'web:ring-offset-background web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 [&>span]:line-clamp-1',
                disabled && 'web:cursor-not-allowed',
                hasError && 'border-danger',
                props.className,
            )}
            disabled={disabled}
            asChild
        >
            <Pressable>
                <>{children}</>
                <ChevronDownFilled
                    size={16}
                    aria-hidden={true}
                    className="text-foreground opacity-50"
                />
            </Pressable>
        </SP.SelectTrigger>
    )
})

SelectTrigger.displayName = 'SelectTrigger'

/* --- <SelectScrollButton/> ------------------------------------------------------------------- */

export const SelectScrollButtonProps = schema('SelectScrollButtonProps', {
    direction: z.enum(['up', 'down']),
    className: z.string().optional(),
})

export type SelectScrollButtonProps = PropsOf<
    typeof SP.SelectScrollUpButton,
    typeof SelectScrollButtonProps
>

export const SelectScrollButton = (rawProps: SelectScrollButtonProps) => {
    // Props
    const props = SelectScrollButtonProps.applyDefaults(rawProps)
    const isUp = props.direction === 'up'

    // Components
    const BaseScrollButton = isUp ? SP.SelectScrollUpButton : SP.SelectScrollDownButton
    const ScrollDirIcon = isUp ? ChevronUpFilled : ChevronDownFilled

    // -- Skip if Native --

    if (!isWeb) return null

    // -- Render --

    return (
        <BaseScrollButton
            {...props}
            className={cn(
                'flex items-center justify-center py-1',
                'web:cursor-default',
                props.className,
            )}
        >
            <ScrollDirIcon size={14} className="text-foreground" />
        </BaseScrollButton>
    )
}

/* --- <SelectContent/> ------------------------------------------------------------------------ */

export const SelectContentProps = schema('SelectContentProps', {
    className: z.string().optional(),
    position: z.enum(['popper', 'item-aligned']).optional(),
    portalHost: z.string().optional(),
})

export type SelectContentProps = PropsOf<typeof SP.SelectContent, typeof SelectContentProps>

export const SelectContent = forwardRef<
    ElementRef<typeof SP.SelectContent>,
    SelectContentProps
>((rawProps, ref) => {
    // Props
    const props = SelectContentProps.applyDefaults(rawProps)
    const { children, position, portalHost } = props

    // Flags
    const isPopper = position === 'popper'

    // Context
    const selectContext = useSelectContext()
    const { open, onOpenChange } = SP.useSelectRootContext()

    // -- Render --

    return (
        <SP.SelectPortal hostName={portalHost}>
            <SelectContext.Provider value={selectContext}>
                <SP.SelectOverlay
                    style={!isWeb ? StyleSheet.absoluteFill : undefined}
                    onPress={() => onOpenChange(!open)}
                    asChild
                >
                    <Pressable>
                        <Animated.View entering={FadeIn} exiting={FadeOut}>
                            <SP.SelectContent
                                ref={ref}
                                position={position}
                                {...props}
                                className={cn(
                                    'relative z-50 max-h-96 min-w-[8rem] rounded-md border border-border bg-popover shadow-md shadow-foreground/10 py-2 px-1',
                                    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                                    isPopper && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                                    !!open && 'web:zoom-in-95 web:animate-in web:fade-in-0',
                                    !open && 'web:zoom-out-95 web:animate-out web:fade-out-0',
                                    props.className,
                                )}
                                asChild
                            >
                                <View>
                                    <SelectScrollButton direction="up" />
                                    <SP.SelectViewport
                                        className={cn(
                                            'p-1',
                                            isPopper && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                                        )}
                                    >
                                        {children}    
                                    </SP.SelectViewport>
                                    <SelectScrollButton direction="down" />
                                </View>
                            </SP.SelectContent>
                        </Animated.View>
                    </Pressable>
                </SP.SelectOverlay>
            </SelectContext.Provider>
        </SP.SelectPortal>
    )
})

SelectContent.displayName = 'SelectContent'

/* --- <SelectLabel/> -------------------------------------------------------------------------- */

export const SelectLabelProps = schema('SelectLabelProps', {
    className: z.string().optional(),
})

export type SelectLabelProps = PropsOf<typeof SP.SelectLabel, typeof SelectLabelProps>

export const SelectLabel = forwardRef<
    ElementRef<typeof SP.SelectLabel>,
    SelectLabelProps
>((rawProps, ref) => {
    // Props
    const props = SelectLabelProps.applyDefaults(rawProps)
    const { children } = props

    // -- Render --

    return (
        <SP.SelectLabel
            ref={ref}
            {...props}
            className={cn(
                'py-1.5 pl-8 pr-2 text-popover-foreground text-sm font-semibold',
                'native:pb-2 native:pl-10 native:text-base',
                props.className,
            )}
            asChild
        >
            <Text>{children}</Text>
        </SP.SelectLabel>
    )
})

SelectLabel.displayName = 'SelectLabel'

/* --- <SelectItem/> --------------------------------------------------------------------------- */

export const SelectItemProps = schema('SelectItemProps', {
    value: z.string(),
    label: z.string(),
    className: z.string().optional(),
    hasError: z.boolean().default(false),
})

export type SelectItemProps = PropsOf<typeof SP.SelectItem, typeof SelectItemProps>

export const SelectItem = forwardRef<
    ElementRef<typeof SP.SelectItem>,
    SelectItemProps
>((rawProps, ref) => {
    // Props
    const props = SelectItemProps.applyDefaults(rawProps)
    const { value, label, disabled, hasError, ...restProps } = props

    // Context
    const selectContext = useSelectContext()

    // -- Effects --

    useEffect(() => {
        const isRegisteredOption = !!selectContext.options?.[value]
        if (!isRegisteredOption) {
            selectContext.setOptions((prev) => ({ ...prev, [value]: label }))
        }
    }, [value, label])

    // -- Render --

    return (
        <SP.SelectItem
            ref={ref}
            {...restProps}
            className={cn(
                'relative flex flex-row w-full items-center rounded-sm py-1.5 pr-2',
                'web:cursor-default web:select-none web:hover:bg-accent/50 web:outline-none',
                'web:focus:bg-accent active:bg-accent',
                disabled && 'web:pointer-events-none opacity-50',
                hasError && 'border border-danger',
                props.className,
            )}
            value={value}
            disabled={disabled}
            label={label}
            asChild
        >
            <Pressable>
                <View className="flex flex-row items-center">
                    <View className="w-1.5 native:w-3" />
                    <View
                        className={cn(
                            'relative flex h-3.5 w-3.5 items-center justify-center',
                            'left-0',
                        )}
                    >
                        <SP.SelectItemIndicator asChild>
                            <View>
                                <CheckFilled size={16} className="text-popover-foreground" />
                            </View>
                        </SP.SelectItemIndicator>
                    </View>
                    <View className="w-3 native:w-3.5" />
                    <View className="relative">
                        <SP.SelectItemText
                            className={cn(
                                'relative text-sm text-popover-foreground',
                                'native:text-lg native:text-base',
                                'web:group-focus:text-accent-foreground',
                            )}
                        />
                    </View>
                </View>
            </Pressable>
        </SP.SelectItem>
    )
})

SelectItem.displayName = 'SelectItem'

/* --- <SelectSeparator/> ---------------------------------------------------------------------- */

export const SelectSeparatorProps = schema('SelectSeparatorProps', {
    className: z.string().optional(),
})

export type SelectSeparatorProps = PropsOf<typeof SP.SelectSeparator, typeof SelectSeparatorProps>

export const SelectSeparator = forwardRef<
    ElementRef<typeof SP.SelectSeparator>,
    SelectSeparatorProps
>((rawProps, ref) => {
    // Props
    const props = SelectSeparatorProps.applyDefaults(rawProps)

    // -- Render --

    return (
        <SP.SelectSeparator
            ref={ref}
            {...props}
            className={cn('-mx-1 my-1 h-px bg-muted', props.className)}
        />
    )
})

SelectSeparator.displayName = 'SelectSeparator'

/* --- <Select/> ------------------------------------------------------------------------------- */

export const SelectProps = schema('SelectProps', {
    options: z.record(z.string()).default({}),
    value: z.string().default(''),
    placeholder: z.string().default('Select an option'),
    hasError: z.boolean().default(false),
    className: z.string().optional(),
    triggerClassName: z.string().optional(),
    valueClassName: z.string().optional(),
    contentClassName: z.string().default('w-full bg-white'),
})

export type SelectProps<T extends string = string> = Omit<
    PropsOf<typeof SP.SelectRoot, typeof SelectProps>,
    'onValueChange' | 'value' | 'defaultValue'
> & {
    value: T,
    children?: ReactNode,
    onChange: (value: T) => void,
}

/** --- createSelect() ------------------------------------------------------------------------- */
/** -i- Create a Universal Select where you can pass a Generic type to narrow the string `value` & `onChange()` params */
export const createSelectComponent = <T extends string = string>() => Object.assign(forwardRef<
    ElementRef<typeof SP.SelectRoot>,
    SelectProps<T>
>((rawProps, ref) => {
    // Props
    const props = SelectProps.applyDefaults(rawProps)
    const { placeholder, hasError, children, onChange, ...restProps } = props

    // State
    const [value, setValue] = useState<string>(props.value)
    const [options, setOptions] = useState(props.options)

    // Hooks
    const insets = useSafeAreaInsets()
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    }

    // Vars
    const optionsKey = Object.keys(options).join('-')
    const hasPropOptions = Object.keys(props.options || {}).length > 0

    // -- Effects --

    useEffect(() => {
        const isValid = value && Object.keys(options || {})?.includes?.(value)
        if (isValid) onChange(value as T)
    }, [value])

    // -- Render --

    return (
        <SelectContext.Provider value={{ value, setValue, options, setOptions }}>
            <SP.SelectRoot
                ref={ref}
                key={`select-${optionsKey}-${!!options?.[value]}`}
                {...restProps}
                value={{ value, label: options?.[value] }}
                className={cn('w-full relative', props.className)}
                onValueChange={(option) => setValue(option!.value!)}
                asChild
            >
                <View>
                    <SelectTrigger
                        key={`select-trigger-${optionsKey}-${!!options?.[value]}`}
                        className={cn('w-full', props.triggerClassName)}
                    >
                        <SP.SelectValue
                            key={`select-value-${optionsKey}-${!!options?.[value]}`}
                            className={cn(
                                'text-foreground text-sm',
                                'native:text-lg',
                                !value && !!placeholder && 'text-muted',
                                props.valueClassName,
                            )}
                            placeholder={placeholder}
                        />
                    </SelectTrigger>
                    <SelectContent
                        insets={contentInsets}
                        className={cn(props.contentClassName)}
                    >
                        {hasPropOptions && (
                            <SP.SelectGroup asChild>
                                <View>
                                    {!!placeholder && <SelectLabel>{placeholder}</SelectLabel>}
                                    {Object.entries(props.options).map(([value, label]) => (
                                        <SelectItem key={value} value={value} label={label}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </View>
                            </SP.SelectGroup>
                        )}
                        {children}
                    </SelectContent>
                    
                    {isMobile && (
                        <View className="w-0 h-0 invisible hidden">
                            {children}
                        </View>
                    )}
                
                </View>
            </SP.SelectRoot>

        </SelectContext.Provider>
    )
}), {
    displayName: 'Select',
    Option: SelectItem,
    Item: SelectItem,
    Separator: SelectSeparator,
    Group: SP.SelectGroup,
    Label: SelectLabel,
    Content: SelectContent,
    /** -i- Create a Universal Select where you can pass a Generic type to narrow the string `value` & `onChange()` params */
    create: createSelectComponent,
})

/* --- Exports --------------------------------------------------------------------------------- */

export const Select = createSelectComponent()
