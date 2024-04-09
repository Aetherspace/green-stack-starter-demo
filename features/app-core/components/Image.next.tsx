import NextImage from 'next/image'
import { UniversalImageProps, UniversalImageMethods } from './Image.types'

/* --- <Image/> -------------------------------------------------------------------------------- */

const Image = (props: UniversalImageProps): JSX.Element => {
    // Props
    const {
        /* - Universal - */
        src,
        alt,
        width,
        height,
        style = {},
        priority = 'normal',
        onError,
        onLoadEnd,
        /* - Split - */
        nextPlaceholder,
        /* - Next.js - */
        loader,
        fill,
        sizes,
        quality,
        onLoad,
        loading,
        blurDataURL,
        unoptimized,
        /* - Expo - */
        accessibilityLabel,
        contentFit,
    } = props

    // -- Overrides --

    // @ts-ignore
    const finalStyle = { width, height, ...style }
    if (fill) finalStyle.height = '100%'
    if (fill) finalStyle.width = '100%'
    if (fill) finalStyle.objectFit = contentFit || 'cover'

    // -- Render --

    return (
        <NextImage
            /* - Universal - */
            src={src as any}
            alt={alt || accessibilityLabel}
            width={width}
            height={height} // @ts-ignore
            style={finalStyle}
            priority={priority === 'high'}
            onError={onError as any}
            onLoad={(onLoad || onLoadEnd) as any}
            /* - Split - */
            placeholder={nextPlaceholder}
            /* - Next.js - */      
            loader={loader}
            fill={fill}
            sizes={sizes}
            quality={quality}
            loading={loading}
            blurDataURL={blurDataURL}
            unoptimized={unoptimized}
        />
    )
}

/* --- Static Methods -------------------------------------------------------------------------- */

Image.clearDiskCache = (() => {}) as UniversalImageMethods['clearDiskCache']
Image.clearMemoryCache = (() => {}) as UniversalImageMethods['clearMemoryCache']
Image.getCachePathAsync = ((cacheKey: string) => {}) as UniversalImageMethods['getCachePathAsync'] // prettier-ignore
Image.prefetch = ((urls: string | string[], cachePolicy?: "memory" | "memory-disk") => {}) as UniversalImageMethods['prefetch'] // prettier-ignore

/* --- Exports --------------------------------------------------------------------------------- */

export { Image }
