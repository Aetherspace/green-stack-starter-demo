// -i- Based on / inspired by:
// - https://necolas.github.io/react-native-web/docs/image/
// - https://nextjs.org/docs/api-reference/next/image
import React, { useMemo, forwardRef, ComponentProps } from 'react'
import { Image as RNImage, ImageURISource } from 'react-native'
import Image from 'next/image'
// Context
import { useAetherContext } from '../../context/AetherContextManager'
// Components
import AetherView from '../AetherView' // @ts-ignore
import AetherImageExpo from './AetherImage.tsx'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherImageType extends Partial<ComponentProps<typeof RNImage>> {
  style?: ComponentProps<typeof RNImage>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  src?: string
  alt?: string
  width?: number
  height?: number
  quality?: ComponentProps<typeof Image>['quality']
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

/* --- <AetherImage/> -------------------------------------------------------------------------- */

const AetherImage = forwardRef<typeof Image, AetherImageType>((props, ref) => {
  // Props
  const { tw, style, width, height, quality, priority, loading } = props
  const bindStyles = { style, tw }
  const source = props.source as ImageURISource
  const src = props.src || source?.uri

  // Context
  const { isNextJS, isExpo } = useAetherContext()

  // -- Memoizations --

  const imgProps = useMemo(() => {
    // Responsive when width & height are passed
    type ResponsiveType = { width: number; height: number }
    if (width && height) return { width, height } as ResponsiveType
    // Fill when no width & height are passed
    return { fill: true } as const
  }, [height, width])

  // -- Render as React-Native Image --

  if (!isNextJS || isExpo) return <AetherImageExpo {...bindStyles} src={src} />

  // -- Render --

  return (
    <AetherView {...bindStyles}>
      <Image
        src={src!} // @ts-ignore
        ref={ref}
        alt={props.alt || ''}
        {...imgProps}
        quality={quality}
        priority={priority}
        loading={loading}
      />
    </AetherView>
  )
})

AetherImage.displayName = 'AetherImage'

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherImage, {
  TYPE: undefined as unknown as AetherImageType,
})
