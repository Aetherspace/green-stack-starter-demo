import { styled } from '../styles'
import { TextInput as RNTextInput } from 'react-native'
import { cssInterop } from 'nativewind'

export const TextInput = styled(cssInterop(RNTextInput, {
    className: {
        target: "style", // map className->style
        nativeStyleToProp: {
            textAlign: true, // extract `textAlign` styles and pass them to the `textAlign` prop
        },
    },
    placeholderClassName: {
        target: false, // Don't pass this as a prop
        nativeStyleToProp: {
            color: "placeholderTextColor", // extract `color` and pass it to the `placeholderTextColor` prop
        },
    },
}))
