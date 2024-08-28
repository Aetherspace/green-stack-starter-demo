import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import type { KnownRoutes } from '@app/registries/routeManifest.generated'
import {
    Text as RNText,
    View as RNView,
    Pressable as RNPressable,
} from 'react-native'
import { Link as UniversalLink } from '@green-stack/navigation/Link'
import { UniversalLinkProps } from '@green-stack/navigation/Link.types'
import { Image as UniversalImage } from '@green-stack/components/Image'
import { styled, cn } from '@green-stack/core/styles'

/* --- Reexports ------------------------------------------------------------------------------- */

export { styled, cn }

/* --- Theme ----------------------------------------------------------------------------------- */

export const { theme } = resolveConfig(tailwindConfig)

/* --- Primitives ------------------------------------------------------------------------------ */

export const View = styled(RNView, '')
export const Text = styled(RNText, '')
export const Image = styled(UniversalImage, '')
export const Pressable = styled(RNPressable, '')

/* --- Typography ------------------------------------------------------------------------------ */

export const H1 = styled(RNText, 'font-bold text-2xl')
export const H2 = styled(RNText, 'font-bold text-xl')
export const H3 = styled(RNText, 'font-bold text-lg')

export const P = styled(RNText, 'text-base')

/* --- Fix for Next Link ----------------------------------------------------------------------- */

export const Link = <HREF extends KnownRoutes>(props: UniversalLinkProps<HREF>) => {
    const StyledLink = styled(UniversalLink, 'text-blue-300 underline') // @ts-ignore
    return <StyledLink {...props} />
}

export const LinkText = styled(RNText, 'text-blue-300 underline')

export const TextLink = (props: Omit<React.ComponentProps<typeof UniversalLink>, 'className'> & { className?: string }) => {
    const { className, style, children, ...universalLinkProps } = props
    return (
        <LinkText className={className} style={style}>
            <UniversalLink {...universalLinkProps}>
                {children}
            </UniversalLink>
        </LinkText>
    )
}
