// -i- You can check which icon you can register for use here: https://icons.expo.fyi/
// -i- Register any icon by name and renderer in a '/{workspace}/icons/registry.tsx' file
// -i- Also keep the React import around, as it breaks Storybook if removed
import React, { useMemo } from 'react'
import { z, aetherSchema } from '../../schemas'
import { REGISTERED_ICONS } from 'registries/icons.generated'
// Primitives
import { AetherImage, AetherView } from '../../primitives'

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherIconKey = keyof typeof REGISTERED_ICONS

export type AetherIconRenderer = (props: {
  name: AetherIconKey
  size: number
  fill: string
  [key: string]: any
}) => JSX.Element

/* --- Constants ------------------------------------------------------------------------------- */

const AETHER_ICON_KEYS = Object.keys(REGISTERED_ICONS) as [AetherIconKey, ...AetherIconKey[]]

/* --- Descriptions ---------------------------------------------------------------------------- */

const d = {
  name: `Icon name, as registered through an exported 'iconRegistry' in a '{workspace}/icons/register.tsx' file`,
  size: `Icon size, in pixels (Encapsulates both width & height of icon)`,
  fill: `Icon fill color, in hex or rgba`,
  url: `Icon URL, for remote .svg or image icons, using this ignores the 'name' prop`,
}

/** --- AetherIconProps ------------------------------------------------------------------------ */
/** -i- Single source of truth for <AetherIcon/> props */
export const AetherIconProps = aetherSchema('AetherIconProps', {
  name: z.enum(AETHER_ICON_KEYS).optional().describe(d.name),
  size: z.number().default(24).describe(d.size),
  fill: z.string().color().default('#333333').describe(d.fill),
  url: z.string().optional().describe(d.url),
})

/** -i- Single source of truth for <AetherIcon/> props */
export type TAetherIconProps = z.infer<typeof AetherIconProps> & Record<string, unknown>

/** --- <AetherIcon/> -------------------------------------------------------------------------- */
/** -i- Render an icon on web or mobile environments. */
export const AetherIcon = (props: TAetherIconProps) => {
  // Props
  const { name, size, fill, url, ...restIconProps } = AetherIconProps.applyDefaults(props)

  // Vars
  const iconStyles = useMemo(
    () => ({
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: size * 1.2,
      ...(restIconProps?.style ?? {}),
    }),
    [size]
  )

  // -- SVG Url Icons --

  if (url) {
    return (
      <AetherImage
        src={url}
        width={size}
        height={size} // @ts-ignore
        style={iconStyles}
        {...restIconProps}
      />
    )
  }

  // -- No Icon? --

  if (!name) return null

  // -- Icon Renderer --

  const IconRenderer = REGISTERED_ICONS[name!] as AetherIconRenderer

  return (
    <AetherView // @ts-ignore
      style={iconStyles}
    >
      <IconRenderer name={name!} size={size} fill={fill} style={iconStyles} {...restIconProps} />
    </AetherView>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = AetherIconProps.introspect()
