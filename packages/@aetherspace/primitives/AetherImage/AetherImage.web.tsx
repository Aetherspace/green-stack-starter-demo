// -i- Based on / inspired by:
// - https://necolas.github.io/react-native-web/docs/image/
// - https://nextjs.org/docs/api-reference/next/image
import React, { useMemo, forwardRef, ComponentProps } from 'react'
import { Image as RNImage, ImageURISource } from 'react-native'
import Image, { ImageProps } from 'next/image'
// Context
import { useAetherContext } from '../../context/AetherContextManager'
// Components
import AetherView from '../AetherView' // @ts-ignore
import AetherImageExpo from './AetherImage.tsx'
import useAetherStyles from '../../hooks/useAetherStyles'
import { Overwrite } from '../../types'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherImageType extends Partial<ComponentProps<typeof RNImage>> {
  style?: ComponentProps<typeof RNImage>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  class?: string | (string | null | undefined | false | 0)[]
  className?: string | (string | null | undefined | false | 0)[]
  src?: string | ImageProps['src']
  alt?: string
  width?: number
  height?: number
  quality?: ImageProps['quality']
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

/* --- <AetherImage/> -------------------------------------------------------------------------- */

const AetherImage = forwardRef<typeof Image, AetherImageType>((props, ref) => {
  // Hooks
  const bindStyles = useAetherStyles<typeof Image>(props as ComponentProps<typeof Image>) // { style, tw }

  // Props
  const {
    width = bindStyles.style?.width,
    height = bindStyles.style?.height,
    quality,
    priority,
    loading,
  } = props

  // Vars
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

  if (!isNextJS || isExpo)
    return (
      <AetherImageExpo
        {...(bindStyles as Overwrite<
          typeof bindStyles,
          { style: ComponentProps<typeof RNImage>['style'] }
        >)}
        src={src as string}
      />
    )

  // -- Render --

  return (
    <AetherView
      style={bindStyles.style as ComponentProps<typeof RNImage>['style']}
      nativeID={bindStyles.nativeID}
    >
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
