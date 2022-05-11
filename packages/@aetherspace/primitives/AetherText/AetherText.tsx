// https://docs.expo.dev/versions/latest/react-native/text/
// https://necolas.github.io/react-native-web/docs/text/
import React, { createContext, useContext } from 'react'
import { Text, TextProps, StyleProp, TextStyle } from 'react-native'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherTextType extends TextProps {
    style?: StyleProp<TextStyle>,
    tw?: string | (string | null | undefined | false | 0)[]
    twID?: string
    children?: string | string[] | React.ReactNode | React.ReactNode[]
}

/* --- Context --------------------------------------------------------------------------------- */

const DEFAULT_TEXT_CONTEXT = { color: null } as { color: string | null }
const TextContext = createContext(DEFAULT_TEXT_CONTEXT)
export const useTextContext = () => useContext(TextContext)

/* --- useAetherText --------------------------------------------------------------------------- */

const useAetherText = (props: AetherTextType) => {
    // Styles
    const { children, ...bindStyles } = useAetherStyles<AetherTextType, typeof Text, TextStyle>(props)

    // Context
    const contextColor = useTextContext(); // @ts-ignore
    const textColor: string | undefined = bindStyles.style?.color || contextColor

    // -- Return --

    return { textColor, textContent: children, bindStyles }
}

/* --- <AetherText/> --------------------------------------------------------------------------- */

const AetherText = (props: AetherTextType) => {
    // Hooks
    const { textColor, textContent, bindStyles } = useAetherText(props)
    // Render
    return textColor ? (
        <TextContext.Provider value={{ color: textColor }}>
            <Text {...bindStyles}>{textContent}</Text>
        </TextContext.Provider>
    ) : (
        <Text {...bindStyles}>{textContent}</Text>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherText, {
    TYPE: undefined as unknown as AetherTextType,
})
