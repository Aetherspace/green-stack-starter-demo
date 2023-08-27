// -i- Based on / inspired by:
// - https://docs.expo.dev/versions/latest/react-native/text/
// - https://necolas.github.io/react-native-web/docs/text/
import React, { createContext, useContext, forwardRef, ComponentProps } from 'react'
import { Text } from 'react-native'
// Types
import { AccessibilityProps, createStyleDocs, TAetherStyleProps } from '../../schemas/ats'
// Schemas
import { z } from '../../schemas'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Context --------------------------------------------------------------------------------- */

const DEFAULT_TEXT_CONTEXT = { color: null } as { color: string | null }
const TextContext = createContext(DEFAULT_TEXT_CONTEXT)
export const useTextContext = () => useContext(TextContext)

/* --- Types ----------------------------------------------------------------------------------- */

type AetherTextType = ComponentProps<typeof Text> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof Text>['style']
    children?: any
  }

/* --- useAetherText --------------------------------------------------------------------------- */

const useAetherText = ({ children, ...props }: AetherTextType) => {
  // Styles
  const bindStyles = useAetherStyles<typeof Text>(props)

  // Context
  const contextColor = useTextContext() // @ts-ignore
  const textColor: string | undefined = bindStyles.style?.color || contextColor // Remember color for children

  // -- Return --

  return { ...props, textColor, textContent: children, bindStyles }
}

/* --- <AetherText/> --------------------------------------------------------------------------- */

const AetherText = forwardRef<Text, AetherTextType>((props, ref) => {
  // Hooks
  const { textColor, textContent, bindStyles } = useAetherText(props)
  // Render
  return textColor ? (
    <TextContext.Provider value={{ color: textColor }}>
      <Text {...props} {...bindStyles}>
        {textContent}
      </Text>
    </TextContext.Provider>
  ) : (
    <Text {...props} ref={ref} {...bindStyles}>
      {textContent}
    </Text>
  )
})

AetherText.displayName = 'AetherText'

/* --- Docs ------------------------------------------------------------------------------------ */

const d = {
  tw: createStyleDocs('', { styleOverrider: 'style' }),
  style: `https://reactnative.dev/docs/text-style-props`,
  adjustsFontSizeToFit: `Specifies whether fonts should be scaled down automatically to fit given style constraints.`,
  allowFontScaling: `Whether fonts should scale to respect Text Size accessibility settings, default is true.`,
  ellipsizeMode: `When numberOfLines is set, this prop defines how the text will be truncated. numberOfLines must be set in conjunction with this prop.`,
  maxFontSizeMultiplier: `Specifies largest possible scale a font can reach when allowFontScaling is enabled. Where 0 mean no max, ignore parent/global default and 1 or more sets the maxFontSizeMultiplier of this node to this value.`,
  numberOfLines: `Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number. Setting this property to 0 will result in unsetting this value, which means that no lines restriction will be applied.`,
  pressRetentionOffset: `When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.`,
  selectable: `Lets the user select text, to use the native copy and paste functionality.`,
  userSelect: `It allows the user to select text and to use the native copy and paste functionality. Has precedence over the selectable prop.`,
}

export const AetherTextProps = AccessibilityProps.extendSchema('AetherTextProps', {
  // - Aetherspace & Styling -
  tw: z.string().optional().eg('text-gray-400').describe(d.tw),
  style: z.object({}).optional().describe(d.style),
  // - Frequently Used -
  children: z.string().eg('Hello World!'),
  numberOfLines: z.number().default(0).describe(d.numberOfLines),
  selectable: z.boolean().default(false).describe(d.selectable),
  // - Optional Config -
  adjustsFontSizeToFit: z.boolean().optional().describe(d.adjustsFontSizeToFit),
  allowFontScaling: z.boolean().optional().describe(d.allowFontScaling),
  ellipsizeMode: z.enum(['head', 'middle', 'tail', 'clip']).optional().describe(d.ellipsizeMode),
  maxFontSizeMultiplier: z.number().optional().describe(d.maxFontSizeMultiplier),
  pressRetentionOffset: z.number().optional().describe(d.pressRetentionOffset),
  userSelect: z.enum(['auto', 'text', 'none', 'contain']).optional().describe(d.userSelect),
})

export const getDocumentationProps = AetherTextProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherText, {
  TYPE: undefined as unknown as AetherTextType,
})
