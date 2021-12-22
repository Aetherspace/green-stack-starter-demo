import React, { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Link, useRouting } from 'expo-next-react-navigation';
// Context
import { useAetherContext } from '../context';
// Primitives
import { AetherView, AetherText } from '../primitives';
// Utils
import { getEnvVar } from '../utils';

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherLinkBaseType {
    children?: React.ReactNode;
    tw?: string;
    twID?: string;
    style?: TextStyle;
    asText?: boolean;
    isText?: boolean;
    isBlank?: boolean;
    target?: string;
};

interface AetherLinkToType extends AetherLinkBaseType { to: string, href?: never, routeName?: never };
interface AetherLinkHrefType extends AetherLinkBaseType { href: string, to?: never, routeName?: never };
interface AetherLinkRouteType extends AetherLinkBaseType { routeName: string, to?: never, href?: never };

type AetherLinkType = AetherLinkToType | AetherLinkHrefType | AetherLinkRouteType;

/* --- <AetherLink/> --------------------------------------------------------------------------- */

const AetherLink = (props: AetherLinkType) => {
    // Props
    const { children, href, to, routeName, style, tw, twID, asText, ...restProps } = props;
    const route = (href || to || routeName)!;
    const bindStyles = { style, tw, twID, ...restProps };

    // Context
    const { isExpo, isNextJS } = useAetherContext();

    // Hooks
    const { navigate } = useRouting();

    // Memos
    const TextComponent = useMemo(() => AetherText, []);
    const ViewComponent = useMemo(() => AetherView, []);

    // Vars
    const APP_LINKS: string[] = useMemo(() => getEnvVar('APP_LINKS')?.split('|') || [], []);
    const isInternalLink = !route.includes('://') || APP_LINKS.some(appUrl => route.includes(appUrl));
    const isBlank = props.target === '_blank' || (props.isBlank ?? !isInternalLink);
    const isText = asText || props.isText || typeof children === 'string';

    // -- Handler --

    const onLinkPress = () => {
        navigate({ routeName: route });
    };

    // -- Render as Text --

    if (isText) return <TextComponent {...bindStyles} onPress={onLinkPress}>{children}</TextComponent>;

    // -- Render as View --

    return (
        <Link {...props} routeName={route}>
            <ViewComponent {...bindStyles}>
                {children}
            </ViewComponent>
        </Link>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherLink;
