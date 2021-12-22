import React, { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Link, useRouting } from 'expo-next-react-navigation';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
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
    const bindStyles = { style, tw, twID, ...restProps };
    let route = (href || to || routeName)!;

    // Hooks
    const { navigate } = useRouting();

    // Memos
    const TextComponent = useMemo(() => AetherText, []);
    const ViewComponent = useMemo(() => AetherView, []);

    // Vars
    const APP_LINKS: string[] = useMemo(() => getEnvVar('APP_LINKS')?.split('|') || [], []);
    const internalDomainMatch = APP_LINKS.find(appUrl => route.includes(appUrl));
    if (internalDomainMatch) route = route.replace(`${internalDomainMatch}/`, '');
    const isRelativePath = !route.includes('://');
    const isInternalLink = isRelativePath || !!internalDomainMatch;
    const isBlank = props.target === '_blank' || props.isBlank;
    const isText = asText || props.isText || typeof children === 'string';

    // -- Handler --

    const onLinkPress = () => {
        if (isInternalLink) return navigate({ routeName: route });
        if (isBlank) return Linking.openURL(route); // "open in a new tab" or mobile browser
        WebBrowser.openBrowserAsync(route); // Open external links in internal browser?
    };

    // -- Render as Text --

    if (isText) return <TextComponent {...bindStyles} onPress={onLinkPress}>{children}</TextComponent>;

    // -- Render as View --

    return (
        <Link {...props} routeName={route} touchableOpacityProps={{ onPressIn: onLinkPress }}>
            <ViewComponent {...bindStyles}>
                {children}
            </ViewComponent>
        </Link>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherLink;
