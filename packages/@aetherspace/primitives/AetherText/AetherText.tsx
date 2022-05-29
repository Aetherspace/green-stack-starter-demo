// https://docs.expo.dev/versions/latest/react-native/text/
// https://necolas.github.io/react-native-web/docs/text/
import React, { createContext, useContext, forwardRef, ComponentProps } from 'react'
import { Text } from 'react-native'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherTextType extends ComponentProps<typeof Text> {
  style?: ComponentProps<typeof Text>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
}

/* --- Context --------------------------------------------------------------------------------- */

const DEFAULT_TEXT_CONTEXT = { color: null } as { color: string | null }
const TextContext = createContext(DEFAULT_TEXT_CONTEXT)
export const useTextContext = () => useContext(TextContext)

/* --- useAetherText --------------------------------------------------------------------------- */

const useAetherText = ({ children, ...props }: AetherTextType) => {
  // Styles
  const bindStyles = useAetherStyles<typeof Text>(props)

  // Context
  const contextColor = useTextContext() // @ts-ignore
  const textColor: string | undefined = bindStyles.style?.color || contextColor // remember color for children

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

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherText, {
  TYPE: undefined as unknown as AetherTextType,
})
