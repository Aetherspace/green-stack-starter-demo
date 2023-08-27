import React, { useMemo, ComponentProps, forwardRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'
// Types
import { TAetherStyleProps, createStyleDocs } from 'aetherspace/schemas/ats'
// Schemas
import { z, aetherSchema } from 'aetherspace/schemas'
// Hooks
import { useAetherStyles } from '../../hooks/useAetherStyles'

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherTextInputType = ComponentProps<typeof RNTextInput> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof RNTextInput>['style']
  }

/* --- <AetherTextInput/> ---------------------------------------------------------------------- */

const AetherTextInput = forwardRef<RNTextInput, AetherTextInputType>((props, ref) => {
  // Props
  const propsWithDefaults = AetherTextInputProps.applyDefaults(props as any) as AetherTextInputType

  // -- Styles --

  const bindStyles = useAetherStyles<typeof RNTextInput>(propsWithDefaults)

  // @ts-ignore
  const inputTextColor = bindStyles?.style?.color as string

  const placeholderColor = useMemo(() => {
    // Check prop override
    if (propsWithDefaults.placeholderTextColor) return propsWithDefaults.placeholderTextColor
    // Default to inputTextColor with opacity of 50%
    if (inputTextColor) {
      const isHexColor = inputTextColor.startsWith('#')
      if (isHexColor) {
        const hex = inputTextColor.replace('#', '')
        const fullColor = hex.length === 3 ? hex + hex : hex
        const r = parseInt(fullColor.substring(0, 2), 16)
        const g = parseInt(fullColor.substring(2, 4), 16)
        const b = parseInt(fullColor.substring(4, 6), 16)
        return `rgba(${r}, ${g}, ${b}, 0.5)`
      }
      return inputTextColor
    }
  }, [inputTextColor, propsWithDefaults.placeholderTextColor])

  // -- Render --

  return (
    <RNTextInput
      ref={ref}
      accessibilityLabel="Text input field"
      accessibilityHint="Text input field"
      placeholderTextColor={placeholderColor}
      {...props}
      {...bindStyles}
    />
  )
})

AetherTextInput.displayName = 'AetherTextInput'

/* --- Docs ------------------------------------------------------------------------------------ */

const d = {
  tw: createStyleDocs('', { showOverrideWarning: true, styleOverrider: 'style' }),
  style: `https://reactnative.dev/docs/text-style-props`,
  allowFontScaling: `Whether fonts should scale to respect Text Size accessibility settings, default is true.`,
  autoCapitalize: `[Mobile only] Tells TextInput to automatically capitalize certain characters. This property is not supported by some keyboard types such as name-phone-pad.`,
  autoComplete: `[Mobile only] Specifies autocomplete hints for the system, so it can provide autofill. On Android, the system will always attempt to offer autofill by using heuristics to identify the type of content. To disable autocomplete, set autoComplete to off.`,
  autoCorrect: `[Mobile only] If false, disables auto-correct.`,
  autoFocus: `If true, focuses the input on componentDidMount or useEffect.`,
  blurOnSubmit: `If true, the text field will blur when submitted. The default value is true for single-line fields and false for multiline fields. Note that for multiline fields, setting blurOnSubmit to true means that pressing return will blur the field and trigger the onSubmitEditing event instead of inserting a newline into the field.`,
  caretHidden: `If true, caret is hidden.`,
  contextMenuHidden: `If true, context menu is hidden.`,
  defaultValue: `Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to events and updating the value prop to keep the controlled state in sync.`,
  editable: `If false, text is not editable.`,
  enterKeyHint: `[Mobile only] Determines what text should be shown to the return key. Has precedence over the returnKeyType prop.`,
  inputMode: `[Mobile only] Works like the inputmode attribute in HTML, it determines which keyboard to open, e.g. numeric and has precedence over keyboardType.`,
  keyboardType: `[Mobile only] Determines which keyboard to open, e.g.numeric. See screenshots of all the types here: http://lefkowitz.me/2018/04/30/visual-guide-to-react-native-textinput-keyboardtype-options/`,
  maxFontSizeMultiplier: `Specifies largest possible scale a font can reach when allowFontScaling is enabled. Where 0 mean no max, ignore parent/global default and 1 or more sets the maxFontSizeMultiplier of this node to this value.`,
  maxLength: `Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.`,
  multiline: `If true, the text input can be multiple lines.`,
  placeholder: `The string that will be rendered before text input has been entered.`,
  placeholderTextColor: `The text color of the placeholder string.`,
  readOnly: `If true, text is not editable.`,
  returnKeyType: `[Mobile only] Determines how the return key should look. On Android you can also use returnKeyLabel.`,
  secureTextEntry: `If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Does not work with multiline={true}.`,
  selection: `The start and end of the text input's selection. Set start and end to the same value to position the cursor.`,
  selectionColor: `The highlight and cursor color of the text input.`,
  selectTextOnFocus: `If true, all text will automatically be selected on focus.`,
  showSoftInputOnFocus: `When false, it will prevent the soft keyboard from showing when the field is focused.`,
  textAlign: `[Mobile only] Align the input text to the left, center, or right sides of the input field.`,
  value: `The value to show for the text input. TextInput is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to setting the same value, either set editable={false}, or set/update maxLength to prevent unwanted edits without flicker.`,
}

export const AetherTextInputProps = aetherSchema('AetherTextInputProps', {
  // - Aetherspace & Styling -
  tw: z
    .string()
    .default('max-w-[380px] w-full h-[40px] border-[1px] border-secondary text-primary rounded-md p-2')
    .example('max-w-[380px] w-full h-[40px] border-[1px] border-secondary text-gray-900 rounded-md p-2')
    .describe(d.tw), // prettier-ignore
  style: z.object({}).optional().describe(d.style),
  // - Frequently Used -
  value: z.string().optional().describe(d.value),
  defaultValue: z.string().optional().describe(d.defaultValue),
  editable: z.boolean().default(true).describe(d.editable),
  readonly: z.boolean().default(false).describe(d.readOnly),
  placeholder: z.string().optional().describe(d.placeholder),
  placeholderTextColor: z.string().color().optional().describe(d.placeholderTextColor),
  maxLength: z.number().optional().describe(d.maxLength),
  multiline: z.boolean().default(false).describe(d.multiline),
  textAlign: z.enum(['left', 'center', 'right']).optional().describe(d.textAlign), // prettier-ignore
  inputMode: z.enum(['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']).optional().describe(d.inputMode), // prettier-ignore
  keyboardType: z.enum(['default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad', 'url']).optional().describe(d.keyboardType), // prettier-ignore
  secureTextEntry: z.boolean().default(false).describe(d.secureTextEntry),
  // - Optional Config -
  allowFontScaling: z.boolean().default(true).describe(d.allowFontScaling),
  autoCapitalize: z.enum(['none', 'sentences', 'words', 'characters']).optional().describe(d.autoCapitalize), // prettier-ignore
  autoComplete: z.enum(['off', 'additional-name', 'address-line1', 'address-line2', 'cc-number', 'country', 'current-password', 'email', 'family-name', 'given-name', 'honorific-prefix', 'honorific-suffix', 'name', 'new-password', 'off', 'one-time-code', 'postal-code', 'street-address', 'tel', 'username']).eg('off').optional().describe(d.autoComplete), // prettier-ignore
  autoCorrect: z.boolean().default(true).describe(d.autoCorrect),
  autoFocus: z.boolean().default(false).describe(d.autoFocus),
  blurOnSubmit: z.boolean().optional().describe(d.blurOnSubmit),
  caretHidden: z.boolean().default(false).describe(d.caretHidden),
  contextMenuHidden: z.boolean().default(false).describe(d.contextMenuHidden),
  enterKeyHint: z.enum(['enter', 'done', 'next', 'search', 'send']).optional().describe(d.enterKeyHint), // prettier-ignore
  maxFontSizeMultiplier: z.number().optional().describe(d.maxFontSizeMultiplier),
  returnKeyType: z.enum(['done', 'go', 'next', 'search', 'send']).optional().describe(d.returnKeyType), // prettier-ignore
  selection: aetherSchema('AetherTextInputSelection', {
    start: z.number(),
    end: z.number(),
  }).optional().describe(d.selection), // prettier-ignore
  selectionColor: z.string().color().optional().describe(d.selectionColor),
  selectTextOnFocus: z.boolean().default(false).describe(d.selectTextOnFocus),
  showSoftInputOnFocus: z.boolean().default(true).describe(d.showSoftInputOnFocus),
})

export const getDocumentationProps = AetherTextInputProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherTextInput, {
  TYPE: undefined as unknown as AetherTextInputType,
})
