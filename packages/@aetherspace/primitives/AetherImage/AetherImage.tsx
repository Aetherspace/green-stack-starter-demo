/* eslint-disable jsx-a11y/alt-text */
// -i- Based on / inspired by:
// - https://necolas.github.io/react-native-web/docs/image/
// - https://nextjs.org/docs/api-reference/next/image
import React, { useMemo, forwardRef } from 'react'
import { Image, ImageRequireSource } from 'react-native'
// Types
import { AetherImageType } from './AetherImage.types'
// Context
import { useAetherContext } from '../../context/AetherContextManager'
// Hooks
import { useAetherStyles } from '../../hooks'
// Utils
import { getAssetKey } from '../../utils'

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
