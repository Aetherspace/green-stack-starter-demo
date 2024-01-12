import React, { ComponentProps } from 'react'
import { createStyleDocs } from '../../schemas/ats'
import { z, aetherSchema, AetherProps } from '../../schemas'
import { Link } from 'aetherspace/navigation' // Keep as is, Storybook support
import { Pressable, Text, View } from '../../primitives'
import { AetherIcon, AetherIconKeyProp } from '../../components/AetherIcon'
import { useTailwindStyles } from '../../styles/useTailwindStyles'
import { parseIfValidNumber } from '../../utils/numberUtils'

/* --- Props ----------------------------------------------------------------------------------- */

// Descriptions
const d = {
  pressableClasses: createStyleDocs(
    `Providing your own classes will still apply the 'btn-size-{size}', 'btn-size-{size}-text', 'btn-{type}-bg' and ''btn-{type}-text' from your twrnc.theme.js file unless overwritten by your custom classes, but omit all the other default tailwind classes ➡️`,
    { styleOverrider: 'pressableProps.style' }
  ),
  textWrapperClasses: createStyleDocs(
    `Providing your own classes will still apply the 'flex flex-row h-full items-center justify-center' from your twrnc.theme.js file unless overwritten by your custom classes, but omit all the other default tailwind classes ➡️`
  ),
  textClasses: createStyleDocs(
    `Providing your own classes will still apply the 'btn-{type}-text', 'btn-size-{size}-text' and 'btn-muted-text' from your twrnc.theme.js file unless overwritten by your custom classes, but omit all the other default tailwind classes ➡️`,
    { styleOverrider: 'textProps.style' }
  ),
  type: `Button type. One of: 'primary', 'secondary', 'tertiary'. Will apply the corresponding 'btn-{type}-bg' and 'btn-{type}-text' classes from your twrnc.theme.js file`,
  text: `Button CTA text, can also just provide a string or Text component as a child`,
  link: `If provided, will render the button as a Link to the url provided. If omitted, will render as a Pressable component that can trigger onPress().`,
  size: `Button size. One of: 'sm', 'md', 'lg'. Will apply the corresponding 'btn-size-{size}' & 'btn-size-{size}-text' classes from your twrnc.theme.js file`,
  fullWidth: `Whether the button should take up the full width of its container. Will apply the 'w-full' class on the pressable wrapper if true.`,
  disabled: `Whether the button should be disabled. Will apply the 'btn-muted-bg' and 'btn-muted-text' classes from your twrnc.theme.js file if true.`,
  prefixIconName: `Will render an 'AetherIcon' component before the button text. Icon name should be from the list available on the 'AetherIcon' component.`,
  suffixIconName: `Will render an 'AetherIcon' component after the button text. Icon name should be from the list available on the 'AetherIcon' component.`,
  iconSize: `Pixel size of the prefix and suffix icons as a number. If omitted, the icon size will be the same as the button text size.`,
}

// Docs
export const AetherButtonBaseProps = aetherSchema('AetherButtonProps', {
  type: z.enum(['primary', 'secondary', 'tertiary']).default('primary').describe(d.type),
  text: z.string().optional().eg('Press me').describe(d.text),
  size: z.enum(['sm', 'md', 'lg']).default('md').describe(d.size),
  link: z.string().optional().describe(d.link),
  fullWidth: z.boolean().default(false).describe(d.fullWidth),
  disabled: z.boolean().default(false).describe(d.disabled),
  prefixIconName: AetherIconKeyProp.optional().describe(d.prefixIconName),
  suffixIconName: AetherIconKeyProp.optional().describe(d.suffixIconName),
  iconSize: z.number().optional().describe(d.iconSize),
  pressableClasses: z.string().default('rounded-md').describe(d.pressableClasses),
  textWrapperClasses: z.string().default('flex flex-row h-full items-center justify-center').describe(d.textWrapperClasses), // prettier-ignore
  textClasses: z.string().default('').describe(d.textClasses),
})

// Types
export type AetherButtonProps = AetherProps<typeof AetherButtonBaseProps> & {
  children?: React.ReactNode
  pressableProps?: ComponentProps<typeof Pressable>
  textProps?: ComponentProps<typeof Text>
} & (
    | {
        onPress: () => void
        link?: never
      }
    | {
        onPress?: never
        link: string
      }
  )

/* --- <AetherButton/> ------------------------------------------------------------------------- */

const AetherButton = (props: AetherButtonProps) => {
  // Props
  const {
    type,
    text,
    children,
    size,
    disabled,
    fullWidth,
    onPress,
    link,
    prefixIconName,
    suffixIconName,
    iconSize,
    pressableClasses,
    textWrapperClasses,
    textClasses,
    pressableProps,
    textProps,
  } = AetherButtonBaseProps.applyDefaults(props)

  // Vars
  const buttonText = typeof children === 'string' ? children : text
  const hasLabel = !!buttonText || !!children
  const hasIcons = !!prefixIconName || !!suffixIconName

  // -- Styles --

  const allPressableClasses = [
    `btn-${type}-bg`,
    `btn-size-${size}`,
    disabled && 'btn-muted-bg',
    hasIcons && 'flex-row justify-center',
    fullWidth && 'w-full',
    pressableClasses,
  ].flat().filter(Boolean).join(' ') // prettier-ignore

  const allTextClasses = [
    `btn-${type}-text`,
    `btn-size-${size}-text`,
    disabled && 'btn-muted-text',
    textClasses,
  ].flat().filter(Boolean).join(' ') // prettier-ignore

  const btnStyles = useTailwindStyles(allPressableClasses)
  const textStyles = useTailwindStyles(allTextClasses)

  const finalIconSize = iconSize ?? parseIfValidNumber(textStyles.fontSize) ?? 16
  const iconColor = (textStyles.color as string) ?? 'white'
  const btnPaddingLeft = parseIfValidNumber(btnStyles.paddingLeft) ?? 0
  const btnPaddingRight = parseIfValidNumber(btnStyles.paddingRight) ?? 0
  const textPaddingLeft = parseIfValidNumber(textStyles.paddingLeft) ?? 0
  const textPaddingRight = parseIfValidNumber(textStyles.paddingRight) ?? 0
  const maxPaddingX = Math.max(btnPaddingLeft, textPaddingLeft, btnPaddingRight, textPaddingRight) // prettier-ignore
  const iconWrapperOffset = hasLabel ? maxPaddingX : 0
  const iconWrapperWidth = parseIfValidNumber(btnStyles.height) ?? 40
  const iconWrapperClasses = `h-full w-[${iconWrapperWidth}px] items-center justify-center`
  const iconWrapperLeftClasses = `${iconWrapperClasses} mr-[-${iconWrapperOffset}px]`
  const iconWrapperRightClasses = `${iconWrapperClasses} ml-[-${iconWrapperOffset}px]`

  // -- Content --

  const buttonContent = (
    <>
      {prefixIconName && (
        <View tw={iconWrapperLeftClasses}>
          <AetherIcon name={prefixIconName} fill={iconColor} size={finalIconSize} />
        </View>
      )}
      {hasLabel && (
        <View tw={textWrapperClasses}>
          {buttonText ? (
            <Text tw={allTextClasses} {...textProps}>
              {buttonText}
            </Text>
          ) : (
            children
          )}
        </View>
      )}
      {suffixIconName && (
        <View tw={iconWrapperRightClasses}>
          <AetherIcon name={suffixIconName} fill={iconColor} size={finalIconSize} />
        </View>
      )}
    </>
  )

  // -- Render as Link --

  if (link && !disabled) {
    return (
      <Link tw={allPressableClasses} to={link}>
        {buttonContent}
      </Link>
    )
  }

  // -- Render as Button --

  return (
    <Pressable tw={allPressableClasses} onPress={onPress} {...pressableProps} disabled={disabled}>
      {buttonContent}
    </Pressable>
  )
}

AetherButton.displayName = 'AetherButton'

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = AetherButtonBaseProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherButton
