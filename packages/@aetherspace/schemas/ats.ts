import { z, aetherSchema } from './aetherSchemas'

/* --- Documentation --------------------------------------------------------------------------- */

const d = {
  tw: `Tailwind CSS class name(s) or array of class names. Supports all styles available in React-Native.\n\nUses twrnc under the hood (https://www.npmjs.com/package/twrnc) to transform styles into a style object.`,
  role: `role communicates the purpose of a component to the user of an assistive technology. Has precedence over the accessibilityRole prop.`,
  accessible: `When true, indicates that the view is an accessibility element. By default, all the touchable elements are accessible.`,
  accessibilityActions: `Accessibility actions allow an assistive technology to programmatically invoke the actions of a component. The accessibilityActions property should contain a list of action objects. Each action object should contain the field name and label.`,
  accessibilityHint: `An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not clear from the accessibility label.`,
  accessibilityLabel: `Overrides the text that's read by the screen reader when the user interacts with the element. By default, the label is constructed by traversing all the children and accumulating all the Text nodes separated by space.`,
  accessibilityRole: `accessibilityRole communicates the purpose of a component to the user of an assistive technology.`,
  accessibilityState: `Describes the current state of a component to the user of an assistive technology.`,
  hitSlop: `This defines how far a touch event can start away from the view. Typical interface guidelines recommend touch targets that are at least 30 - 40 points/density-independent pixels.`,
}

/* --- Common Schemadefs ----------------------------------------------------------------------- */

export const stylePropDescription = d.tw

export const createStyleDocs = (
  extra = '',
  options?: { showOverrideWarning?: boolean; styleOverrider?: string }
) => {
  const { showOverrideWarning, styleOverrider } = options || {}
  const showAliases = styleOverrider === 'style'
  return [
    stylePropDescription,
    styleOverrider && `Styles from ${styleOverrider} prop take priority.`,
    showAliases && `Aliases for this prop: "class", "className".`,
    extra,
    showOverrideWarning && `Providing your own classes will omit all the default tailwind classes ➡️`, // prettier-ignore
  ].filter(Boolean).join('\n\n') // prettier-ignore
}

export const AccessibilityRole = z.enum(['none', 'button', 'link', 'search', 'image', 'keyboardkey', 'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert', 'checkbox', 'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tablist', 'timer', 'toolbar', 'grid']).optional().describe(d.accessibilityRole) // prettier-ignore

export const HitSlopProp = aetherSchema('HitSlop', {
  top: z.number().optional(),
  bottom: z.number().optional(),
  left: z.number().optional(),
  right: z.number().optional(),
}).optional().describe(d.hitSlop) // prettier-ignore

/** --- AccessibilityProps --------------------------------------------------------------------- */
/** -i- Schema for all recurring accessibility related props */
export const AccessibilityProps = aetherSchema('AccessibilityProps', {
  role: AccessibilityRole.optional().describe(d.accessibilityRole),
  accessible: z.boolean().default(false).describe(d.accessible),
  accessibilityRole: AccessibilityRole.optional().describe(d.accessibilityRole), // prettier-ignore
  accessibilityHint: z.string().optional().describe(d.accessibilityHint),
  accessibilityLabel: z.string().optional().describe(d.accessibilityLabel),
  accessibilityActions: aetherSchema('AccessibilityActionsEntry', {
    name: z.string(),
    label: z.string().optional(),
  }).array().optional().describe(d.accessibilityActions), // prettier-ignore
  accessibilityState: aetherSchema('AccessibilityState', {
    disabled: z.boolean().optional(),
    expanded: z.boolean().optional(),
    checked: z.enum(['checked', 'unchecked', 'mixed']).optional(),
    busy: z.boolean().optional(),
  }).optional().describe(d.accessibilityState), // prettier-ignore
})

/** --- AetherTailwindProp --------------------------------------------------------------------- */
/** -i- A common prop type for Aetherspace Primitives used for styling through the 'tw', 'class' or 'className' props */
export const AetherTailwindProp = z
  .union([z.string(), z.array(z.union([z.string(), z.literal(0)]).nullish())])
  .describe(d.tw)

/** -i- A common prop type for Aetherspace Primitives used for styling through the 'tw', 'class' or 'className' props */
export type TAetherTailwindProp = z.infer<typeof AetherTailwindProp>

/** --- AetherStyleProps ----------------------------------------------------------------------- */
/** -i- All common extra props used in Aetherspace Primitives for styling */
export const AetherStyleProps = aetherSchema('AetherStyleProps', {
  tw: AetherTailwindProp.optional(),
  class: AetherTailwindProp.optional(),
  className: AetherTailwindProp.optional(),
  twID: z.string().optional(),
})

/** -i- All common extra props used in Aetherspace Primitives for styling */
export type TAetherStyleProps = z.infer<typeof AetherStyleProps>
