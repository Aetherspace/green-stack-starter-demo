/* eslint-disable jsx-a11y/alt-text */
// -i- Based on / inspired by:
// - https://necolas.github.io/react-native-web/docs/image/
// - https://nextjs.org/docs/api-reference/next/image
import React, { useMemo, ComponentProps, forwardRef } from 'react'
import { Image, ImageRequireSource } from 'react-native'
// Context
import { useAetherContext } from '../../context/AetherContextManager'
// Hooks
import { useAetherStyles } from '../../hooks'
// Utils
import { getAssetKey } from '../../utils'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherImageType extends Partial<ComponentProps<typeof Image>> {
  style?: ComponentProps<typeof Image>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  src?: string
  alt?: string
  width?: number
  height?: number
  quality?: number | string
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

/* --- <AetherImage/> -------------------------------------------------------------------------- */

const AetherImage = forwardRef<Image, AetherImageType>((props, ref) => {
  // Context
  const { assets } = useAetherContext()

  // Props
  const source = useMemo(() => {
    if (!props.src) return props.source
    if (props.src.includes('http')) return { uri: props.src }
    return assets[getAssetKey(props.src)] as unknown as ImageRequireSource
  }, [props.source, props.src])

  // -- Styles --

  const { src: _, ...componentProps } = props
  const bindStyles = useAetherStyles<typeof Image>(props)

  // -- Render --

  return (
    <Image
      {...componentProps}
      ref={ref}
      source={source!}
      {...bindStyles}
      accessibilityIgnoresInvertColors
    />
  )
})

AetherImage.displayName = 'AetherImage'

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherImage, {
  TYPE: undefined as unknown as AetherImageType,
})
