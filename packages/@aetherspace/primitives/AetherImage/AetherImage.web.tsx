// -i- Based on / inspired by:
// - https://necolas.github.io/react-native-web/docs/image/
// - https://nextjs.org/docs/api-reference/next/image
import React, { useMemo, forwardRef, ComponentProps } from 'react'
import { Image as RNImage, ImageURISource } from 'react-native'
import Image from 'next/image'
// Types
import { AetherImageType } from './AetherImage.types'
// Types
import { Overwrite } from '../../types'
// Context
import { useAetherContext } from '../../context/AetherContextManager'
// Components
import AetherView from '../AetherView' // @ts-ignore
import AetherImageExpo from './AetherImage.tsx'
// Hooks
import useAetherStyles from '../../hooks/useAetherStyles'
// Utils
import { getEnvList, getEnvVar } from '../../utils/envUtils'

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
  const { isServer, isNextJS, isExpo, isStorybook } = useAetherContext()

  // -- Memoizations --

  const imgProps = useMemo(() => {
    // Responsive when width & height are passed
    type ResponsiveType = { width: number; height: number }
    if (width && height) return { width, height } as ResponsiveType
    // Fill when no width & height are passed
    return { fill: true } as const
  }, [height, width])

  const srcString = useMemo(() => {
    // Keep empty or as is?
    if (typeof src !== 'string') return ''
    if (!isStorybook || src.includes('http')) return src as string
    // Determine back-end URL
    const APP_URLS = getEnvList('APP_LINKS').filter((url) => url.includes('http')) || []
    const BACKEND_URL = getEnvVar('BACKEND_URL') || getEnvVar('STORYBOOK_BACKEND_URL') || APP_URLS[0] // prettier-ignore
    if (!isServer && window?.location?.href?.includes('localhost')) return `http://localhost:3000${src}` // prettier-ignore
    if (BACKEND_URL) return `${BACKEND_URL}${src}`
  }, [src, isServer, isStorybook])

  // -- Render as React-Native Image --

  if (!isNextJS || isExpo || isStorybook) {
    return (
      <AetherImageExpo
        {...(bindStyles as Overwrite<
          typeof bindStyles,
          { style: ComponentProps<typeof RNImage>['style'] }
        >)}
        src={srcString}
      />
    )
  }

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
