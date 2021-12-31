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

/* --- useAetherNav() -------------------------------------------------------------------------- */

export const useAetherNav = () => {
    // Hooks
    const { navigate, ...expoNextReactNavRoutingResources } = useRouting();

    // Vars
    const APP_LINKS: string[] = useMemo(() => getEnvVar('APP_LINKS')?.split('|') || [], []);

    // -- Handlers --

    const getDestination = (path: string) => {
        const internalDomainMatch = APP_LINKS.find(appUrl => path.includes(appUrl));
        if (internalDomainMatch) return path.replace(`${internalDomainMatch}/`, '');
        return path;
    };

    const openLink = (path: string, isBlank: boolean = false) => {
        const destination = getDestination(path);
        const isInternalLink = !destination.includes('://');
        if (isInternalLink) return navigate({ routeName: destination });
        if (isBlank) return Linking.openURL(destination); // "open in a new tab" or mobile browser
        WebBrowser.openBrowserAsync(destination); // Open external links in internal browser?
    };

    // -- Return --

    return {
        ...expoNextReactNavRoutingResources,
        navigate,
        getDestination,
        openLink,
    };
};

/* --- <AetherLink/> --------------------------------------------------------------------------- */

const AetherLink = (props: AetherLinkType) => {
    // Props
    const { children, href, to, routeName, style, tw, twID, asText, ...restProps } = props;
    const bindStyles = { style, tw, twID, ...restProps };

    // Hooks
    const { openLink, getDestination } = useAetherNav();
    const destination = getDestination((href || to || routeName)!);

    // Memos
    const TextComponent = useMemo(() => AetherText, []);
    const ViewComponent = useMemo(() => AetherView, []);

    // Vars
    const isBlank = props.target === '_blank' || props.isBlank;
    const isText = asText || props.isText || typeof children === 'string';

    // -- Handler --

    const onLinkPress = () => openLink(destination, isBlank);

    // -- Render as Text --

    if (isText) return <TextComponent {...bindStyles} onPress={onLinkPress}>{children}</TextComponent>;

    // -- Render as View --

    return (
        <Link {...props} routeName={destination} touchableOpacityProps={{ onPressIn: onLinkPress }}>
            <ViewComponent {...bindStyles}>
                {children}
            </ViewComponent>
        </Link>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherLink;
