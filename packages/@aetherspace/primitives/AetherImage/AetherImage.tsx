import React, { useMemo, forwardRef } from 'react'
import { Image, ImageSource } from 'expo-image'
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
    if (props.src.includes('http')) return props.src
    return assets[getAssetKey(props.src)] as unknown as ImageSource
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
      {...bindStyles} // @ts-ignore
      alt={componentProps.alt || componentProps.accessibilityLabel || ''}
      accessibilityLabel={componentProps.alt || componentProps.accessibilityLabel || ''}
      accessibilityHint={componentProps.accessibilityHint || ''}
      accessibilityIgnoresInvertColors
    />
  )
})

AetherImage.displayName = 'AetherImage'

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherImage, {
  TYPE: undefined as unknown as AetherImageType,
})
