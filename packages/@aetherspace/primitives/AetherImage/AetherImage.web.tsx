/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
// https://necolas.github.io/react-native-web/docs/image/
// https://nextjs.org/docs/api-reference/next/image
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
  width?: number
  height?: number
  quality?: number | string
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
    type ResponsiveType = { width: number | string; height: number | string; layout: 'responsive' }
    if (width && height) return { width, height, layout: 'responsive' } as ResponsiveType
    // Fill when no width & height are passed
    type FillType = { layout: 'fill'; width: never; height: never }
    return { layout: 'fill' } as FillType
  }, [])

  // -- Render --

  if (!isNextJS || isExpo) return <AetherImageExpo {...bindStyles} src={src} />
  return (
    <AetherView {...bindStyles}>
      {/* @ts-ignore */}
      <Image src={src!} ref={ref} {...imgProps} quality={quality} priority={priority} loading={loading} />
    </AetherView>
  )
})

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherImage, {
  TYPE: undefined as unknown as AetherImageType,
})
