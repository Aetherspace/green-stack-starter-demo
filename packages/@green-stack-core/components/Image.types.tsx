import type { ImageProps as ExpoImageProps, Image as ExpoImage } from 'expo-image'
import type { ImageProps as NextImageProps } from 'next/image'

/* --- Types ----------------------------------------------------------------------------------- */

export type UniversalImageProps = {
    /**
     * Universal, will affect both Expo & Next.js - Must be one of the following:
     * - A path string like `'/assets/logo.png'`. This can be either an absolute external URL, or an internal path depending on the loader prop.
     * - A statically imported image file, like `import logo from './logo.png'` or `require('./logo.png')`.
     * 
     * When using an external URL, you must add it to `remotePatterns` in `next.config.js`.
     * @platform web, android, ios @framework expo, next.js */
    src: NextImageProps['src'] | ExpoImageProps['source']

    /** 
     * Universal, will affect both Expo & Next.js
     * - Next.js - Used to describe the image for screen readers and search engines. It is also the fallback text if images have been disabled or an error occurs while loading the image. It should contain text that could replace the image without changing the meaning of the page. It is not meant to supplement the image and should not repeat information that is already provided in the captions above or below the image. If the image is purely decorative or not intended for the user, the alt property should be an empty string (`alt=""`).
     * - Expo - The text that's read by the screen reader when the user interacts with the image. Sets the the alt tag on web which is used for web crawlers and link traversal. Is an alias for `accessibilityLabel`.
     * @alias accessibilityLabel
     */
    alt?: NextImageProps['alt'] | ExpoImageProps['alt']

    /** Universal, will affect both Expo & Next.js
     * - Expo - Priorities for completing loads. If more than one load is queued at a time, the load with the higher priority will be started first. Priorities are considered best effort, there are no guarantees about the order in which loads will start or finish. 
     * - Next.js - Lazy loading is automatically disabled for images using `'high'` priority. You should use the priority property on any image detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple priority images, as different images may be the LCP element for different viewport sizes. Should only be used when the image is visible above the fold.
     * @default 'normal'
     */
    priority?: ExpoImageProps['priority']

    /** Rendered width in pixels, will affect how large the image appears. Required, except for statically imported images or images with the `fill` property. */
    width?: NextImageProps['width'] | `${number}%`

    /** Rendered height in pixels, will affect how large the image appears. Required, except for statically imported images or images with the `fill` property. @default 'auto' */
    height?: NextImageProps['height'] | `${number}%`

    /** Universal, will affect both Expo & Next.js
     * - Remember that the required width and height props can interact with your styling. If you use styling to modify an image's width, you should also style its height to auto to preserve its intrinsic aspect ratio, or your image will be distorted. */
    style?: ExpoImageProps['style']

    /** Universal, will affect both Expo & Next.js
     * - Remember that the required width and height props can interact with your styling. If you use styling to modify an image's width, you should also style its height to auto to preserve its intrinsic aspect ratio, or your image will be distorted. */
    className?: string

    /** Universal, will affect both Expo & Next.js - Called on an image fetching error. */
    onError?: ExpoImageProps['onError']

    /** Universal, will affect both Expo & Next.js - Called when the image load either succeeds or fails. */
    onLoadEnd?: ExpoImageProps['onLoadEnd']

    // - Split -

    /**
     * Split, please use Expo or Next.js specific props instead:
     * - `nextPlaceholder` (Next.js) - A placeholder to use while the image is loading. Possible values are `blur`, `empty`, or `data:image/...`. Defaults to empty. When `blur`, the `blurDataURL` property will be used as the placeholder. If `src` is an object from a static import and the imported image is `.jpg`, `.png`, `.webp`, or `.avif`, then `blurDataURL` will be automatically populated, except when the image is detected to be animated. For dynamic images, you must provide the blurDataURL property. Solutions such as Plaiceholder can help with base64 generation. When `data:image/...`, the Data URL will be used as the placeholder while the image is loading. When empty, there will be no placeholder while the image is loading, only empty space.
     * - `expoPlaceholder` (Expo) - An image to display while loading the proper image and no image has been displayed yet or the source is unset.
     */
    placeholder?: never

    // - Next -

    /** Used to describe the image for screen readers and search engines. It is also the fallback text if images have been disabled or an error occurs while loading the image. It should contain text that could replace the image without changing the meaning of the page. It is not meant to supplement the image and should not repeat information that is already provided in the captions above or below the image. If the image is purely decorative or not intended for the user, the alt property should be an empty string (alt=""). */
    // alt?: NextImageProps['alt']

    /** Custom function used to resolve image URLs. A loader is a function returning a URL string for the image, given the following parameters: `src`, `width`, `quality` (`number` from 0 - 1) Alternatively, you can use the [loaderFile](https://nextjs.org/docs/pages/api-reference/components/image#loaderfile) configuration in next.config.js to configure every instance of next/image in your application, without passing a prop. */
    loader?: NextImageProps['loader']

    /**
     * A boolean that causes the image to fill the parent element, which is useful when the `width` and `height` are unknown.
     * 
     * The parent element must assign `position: "relative"`, `position: "fixed"`, or `position: "absolute"` style.
     * 
     * By default, the img element will automatically be assigned the `position: "absolute"` style.
     * 
     * If no styles are applied to the image, the image will stretch to fit the container.
     * 
     * You may prefer to set `object-fit: "contain"` for an image which is letterboxed to fit the container and preserve aspect ratio.
     * 
     * Alternatively, `object-fit: "cover"` will cause the image to fill the entire container and be cropped to preserve aspect ratio.
     * 
     * For this to look correct, the `overflow: "hidden"` style should be assigned to the parent element.
     */
    fill?: NextImageProps['fill']

    /**
     * A string, which, similar to a media query, provides information about how wide the image will be at different breakpoints. The value of sizes will greatly affect performance for images using fill or which are styled to have a responsive size.
     * 
     * The `sizes` property serves two important purposes related to image performance:
     * 
     * - Used by the browser to determine which size of the image to download, from next/image's automatically generated srcset. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen. If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.
     * 
     * - Changes the behavior of the automatically generated srcset value. If no sizes value is present, a small srcset is generated, suitable for a fixed-size image (1x/2x/etc). If sizes is defined, a large srcset is generated, suitable for a responsive image (640w/750w/etc). If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width, then the srcset is trimmed to not include any values which are too small to ever be necessary.
     * 
     * Learn more about srcset and sizes on [web.dev](https://web.dev/learn/design/responsive-images/#sizes) or [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#sizes)
     */
    sizes?: NextImageProps['sizes']

    /** The quality of the optimized image, an integer between `1` and `100`, where `100` is the best quality and therefore largest file size. Defaults to `75`. @default 75 */
    quality?: NextImageProps['quality']

    /** When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority. You should use the priority property on any image detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple priority images, as different images may be the LCP element for different viewport sizes. Should only be used when the image is visible above the fold. Defaults to false. @default false */
    // priority?: NextImageProps['priority']

    /** A placeholder to use while the image is loading. Possible values are `blur`, `empty`, or `data:image/...`. Defaults to empty. When `blur`, the blurDataURL property will be used as the placeholder. If `src` is an object from a static import and the imported image is `.jpg`, `.png`, `.webp`, or `.avif`, then `blurDataURL` will be automatically populated, except when the image is detected to be animated. For dynamic images, you must provide the blurDataURL property. Solutions such as Plaiceholder can help with base64 generation. When `data:image/...`, the Data URL will be used as the placeholder while the image is loading. When empty, there will be no placeholder while the image is loading, only empty space. */
    nextPlaceholder?: NextImageProps['placeholder']
    // placeholder?: NextImageProps['placeholder']

    /** Alias for `onLoadEnd` - A callback function that is invoked once the image is completely loaded and the `placeholder` has been removed. The callback function will be called with one argument, the Event which has a target that references the underlying <img> element. */
    onLoad?: ExpoImageProps['onLoad']

    /** 
     * Next.js only - The loading strategy to use.
     * Recommendation: This property is only meant for advanced use cases. Switching an image to load with eager will normally hurt performance. We recommend using the priority property instead, which will eagerly preload the image:
     * - `lazy` - defer loading the image until it reaches a calculated distance from the viewport.
     * - `eager` - load the image immediately.
     * @default 'lazy' 
     */
    loading?: NextImageProps['loading']

    /** Next.js only - A Data URL to be used as a placeholder image before the `src` image successfully loads. Only takes effect when combined with `placeholder="blur"`. Must be a base64-encoded image. It will be enlarged and blurred, so a very small image (10px or less) is recommended. Including larger images as placeholders may harm your application performance. */
    blurDataURL?: NextImageProps['blurDataURL']

    /** Next.js only - When true, the source image will be served as-is instead of changing quality, size, or format. Defaults to false. @default false */
    unoptimized?: NextImageProps['unoptimized']

    // - Expo -

    /** The text that's read by the screen reader when the user interacts with the image. Sets the the `alt` tag on web which is used for web crawlers and link traversal. @default undefined */
    accessibilityLabel?: ExpoImageProps['accessibilityLabel']

    /** When true, indicates that the view is an accessibility element. When a view is an accessibility element, it groups its children into a single selectable component. On Android, the `accessible` property will be translated into the native `isScreenReaderFocusable`, so it's only affecting the screen readers behaviour. @default false @platform android @platform ios */
    accessible?: ExpoImageProps['accessible']

    /** Whether the image should be downscaled to match the size of the view container. Turning off this functionality could negatively impact the application's performance, particularly when working with large assets. However, it would result in smoother image resizing, and end-users would always have access to the highest possible asset quality. Downscaling is never used when the `contentFit` prop is set to `none` or `fill`. @default true */
    allowDownscaling?: ExpoImageProps['allowDownscaling']

    /** The text that's read by the screen reader when the user interacts with the image. Sets the the alt tag on web which is used for web crawlers and link traversal. Is an alias for `accessibilityLabel`. @alias accessibilityLabel */
    // alt?: ExpoImageProps['alt']

    /** Determines if an image should automatically begin playing if it is an animated image. @default true @platform — ios */
    autoplay?: ExpoImageProps['autoplay']

    /** The radius of the blur in points, `0` means no blur effect. This effect is not applied to placeholders. @default 0 */
    blurRadius?: ExpoImageProps['blurRadius']

    /** Determines whether to cache the image and where: on the disk, in the memory or both.
     * 
     * - `'none'` - Image is not cached at all.
     * - `'disk'` - Image is queried from the disk cache if exists, otherwise it's downloaded and then stored on the disk.
     * - `'memory'` - Image is cached in memory. Might be useful when you render a high-resolution picture many times. Memory cache may be purged very quickly to prevent high memory usage and the risk of out of memory exceptions.
     * - `'memory-disk'` - Image is cached in memory, but with a fallback to the disk cache.
     * 
     * @default 'disk' */
    cachePolicy?: ExpoImageProps['cachePolicy']

    /** Determines how the image should be resized to fit its container. This property tells the image to fill the container in a variety of ways; such as "preserve that aspect ratio" or "stretch up and take up as much space as possible". It mirrors the CSS `object-fit` property.
     * 
     * - `'cover'` - The image is sized to maintain its aspect ratio while filling the container box. If the image's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.
     * - `'contain'` - The image is scaled down or up to maintain its aspect ratio while fitting within the container box.
     * - `'fill'` - The image is sized to entirely fill the container box. If necessary, the image will be stretched or squished to fit.
     * - `'none'` - The image is not resized and is centered by default. When specified, the exact position can be controlled with `contentPosition` prop.
     * - `'scale-down'` - The image is sized as if none or contain were specified, whichever would result in a smaller concrete image size.
     * 
     * @default 'cover' */
    contentFit?: ExpoImageProps['contentFit']

    /** It is used together with `contentFit` to specify how the image should be positioned with x/y coordinates inside its own container. An equivalent of the CSS `object-position` property. @default 'center' */
    contentPosition?: ExpoImageProps['contentPosition']

    /** Enables Live Text interaction with the image. Check official Apple documentation for more details. @default false @platform ios 16.0+ */
    enableLiveTextInteraction?: ExpoImageProps['enableLiveTextInteraction']

    /** Whether this View should be focusable with a non-touch input device and receive focus with a hardware keyboard. @default false @platform android */
    focusable?: ExpoImageProps['focusable']

    /** An image to display while loading the proper image and no image has been displayed yet or the source is unset. */
    expoPlaceholder?: ExpoImageProps['placeholder']
    // placeholder?: ExpoImageProps['placeholder']

    /** Expo only - Called when the image starts to load. */
    onLoadStart?: ExpoImageProps['onLoadStart']

    /** Expo only - Called when the image is loading. Can be called multiple times before the image has finished loading. The event object provides details on how many bytes were loaded so far and what's the expected total size. */
    onProgress?: ExpoImageProps['onProgress']

    /** Determines how the placeholder should be resized to fit its container. Available resize modes are the same as for the `contentFit` prop. @default 'scale-down' */
    placeholderContentFit?: ExpoImageProps['placeholderContentFit']

    /** Priorities for completing loads. If more than one load is queued at a time, the load with the higher priority will be started first. Priorities are considered best effort, there are no guarantees about the order in which loads will start or finish. @default 'normal' */
    // priority?: ExpoImageProps['priority']

    /** Changing this prop resets the image view content to blank or a placeholder before loading and rendering the final image. This is especially useful for any kinds of recycling views like FlashList to prevent showing the previous source before the new one fully loads. @default null @platform android @platform ios */
    recyclingKey?: ExpoImageProps['recyclingKey']

    /** Controls the selection of the image source based on the container or viewport size on the web.
     * - `'static'` - the browser selects the correct source based on user's viewport width. Works with static rendering. Make sure to set the `'webMaxViewportWidth'` property on each source for best results. For example, if an image occupies 1/3 of the screen width, set the `'webMaxViewportWidth'` to 3x the image width. The source with the largest `'webMaxViewportWidth'` is used even for larger viewports.
     * - `'initial'` - the component will select the correct source during mount based on container size. Does not work with static rendering.
     * - `'live'` - the component will select the correct source on every resize based on container size. Does not work with static rendering.
     * @default 'static'
     * @platform web */
    responsivePolicy?: ExpoImageProps['responsivePolicy']

    /** Never: Use `src` instead - The image source, either a remote URL, a local file resource or a number that is the result of the require() function. When provided as an array of sources, the source that fits best into the container size and is closest to the screen scale will be chosen. In this case it is important to provide `width`, `height` and `scale` properties. @framework none */
    source?: never
    // source?: ExpoImageProps['source']
}

export type UniversalImageMethods = {
    // - Expo -

    /** Asynchronously clears all images from the disk cache. @platform android @platform ios @return A promise resolving to true when the operation succeeds. It may resolve to false on Android when the activity is no longer available. Resolves to `false` on Web. */
    clearDiskCache: typeof ExpoImage.clearDiskCache

    /** Asynchronously clears all images stored in memory. @platform android @platform ios @return A promise resolving to true when the operation succeeds. It may resolve to false on Android when the activity is no longer available. Resolves to `false` on Web. */
    clearMemoryCache: typeof ExpoImage.clearMemoryCache

    /** Asynchronously checks if an image exists in the disk cache and resolves to the path of the cached image if it does. @param cacheKey The cache key for the requested image. Unless you have set a custom cache key, this will be the source URL of the image. @platform android @platform ios @return A promise resolving to the path of the cached image. It will resolve to `null` if the image does not exist in the cache. */
    getCachePathAsync: typeof ExpoImage.getCachePathAsync

    /** Preloads images at the given URLs that can be later used in the image view. Preloaded images are cached to the memory and disk by default, so make sure to use disk (default) or memory-disk cache policy. @param urls A URL string or an array of URLs of images to prefetch. @param cachePolicy The cache policy for prefetched images. @return A promise resolving to true as soon as all images have been successfully prefetched. If an image fails to be prefetched, the promise will immediately resolve to false regardless of whether other images have finished prefetching. */
    prefetch: typeof ExpoImage.prefetch
}
