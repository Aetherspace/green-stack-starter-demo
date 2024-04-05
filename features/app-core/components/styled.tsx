import { styled } from 'nativewind'
import { Text as RNText, View as RNView } from 'react-native'
import { Link as UniversalLink } from './Link'

/* --- Primitives ------------------------------------------------------------------------------ */

export const View = styled(RNView, '')
export const Text = styled(RNText, '')

/* --- Typography ------------------------------------------------------------------------------ */

export const H1 = styled(RNText, 'font-bold text-2xl')
export const H2 = styled(RNText, 'font-bold text-xl')
export const H3 = styled(RNText, 'font-bold text-lg')

export const P = styled(RNText, 'text-base')

/* --- Fix for Next Link ----------------------------------------------------------------------- */

export const LinkText = styled(RNText, 'text-blue-500 underline')
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
