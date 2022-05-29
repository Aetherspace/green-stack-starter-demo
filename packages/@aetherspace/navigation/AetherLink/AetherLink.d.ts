import React, { ComponentProps } from 'react';
import { Link } from 'expo-next-react-navigation';
interface AetherLinkBaseType extends Partial<ComponentProps<typeof Link>> {
    style?: ComponentProps<typeof Link>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    asText?: boolean;
    isText?: boolean;
    isBlank?: boolean;
    target?: string;
    children?: any | any[];
}
interface AetherLinkToType extends AetherLinkBaseType {
    to: string;
    href?: never;
    routeName?: never;
}
interface AetherLinkHrefType extends AetherLinkBaseType {
    href: string;
    to?: never;
    routeName?: never;
}
interface AetherLinkRouteType extends AetherLinkBaseType {
    routeName: string;
    to?: never;
    href?: never;
}
export declare const useAetherNav: () => {
    navigate: <To extends {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    } = {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    }>(route: To) => void;
    webDomain: string;
    getDestination: (path: string) => string;
    openLink: (path: string, isBlank?: boolean) => void | Window | Promise<true> | null;
    getParam: <Param>(param: string, fallback?: unknown) => Param;
    push: <To_1 extends {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    } = {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    }>(route: To_1) => void;
    goBack: () => void;
    params: Readonly<object | undefined>;
    prefetch: (routeName: string) => void;
    popToTop: any;
    replace: <To_2 extends {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    } = {
        routeName: string;
        key?: string | undefined;
        params?: object | undefined;
        web?: {
            path?: string | undefined;
            as?: string | undefined;
            shallow?: boolean | undefined;
        } | undefined;
        native?: {
            screen?: string | undefined;
        } | undefined;
    }>({ routeName, params }: To_2) => void;
    setParams: (params: Partial<object | undefined>) => void;
    canGoBack: () => boolean;
    pathname: string;
};
declare const AetherLink: React.ForwardRefExoticComponent<(Pick<AetherLinkToType, "style" | "tw" | "children" | "twID" | "key" | "touchableOpacityProps" | "routeName" | "params" | "web" | "isText" | "native" | "nextLinkProps" | "to" | "href" | "asText" | "isBlank" | "target"> | Pick<AetherLinkHrefType, "style" | "tw" | "children" | "twID" | "key" | "touchableOpacityProps" | "routeName" | "params" | "web" | "isText" | "native" | "nextLinkProps" | "to" | "href" | "asText" | "isBlank" | "target"> | Pick<AetherLinkRouteType, "style" | "tw" | "children" | "twID" | "key" | "touchableOpacityProps" | "routeName" | "params" | "web" | "isText" | "native" | "nextLinkProps" | "to" | "href" | "asText" | "isBlank" | "target">) & React.RefAttributes<React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    touchableOpacityProps?: import("react-native").TouchableOpacityProps | undefined;
    style?: import("react-native").TextStyle | undefined;
    routeName: string;
    params?: {} | undefined;
    web?: import("expo-next-react-navigation/build/components/Link/types").Web | undefined;
    isText?: boolean | undefined;
    native?: {
        screen?: string | undefined;
    } | undefined;
} & import("expo-next-react-navigation/build/components/Link/types").NextProps & React.RefAttributes<import("react-native").Text>> | {
    new (data?: string | undefined): Text;
    prototype: Text;
}>>;
export default AetherLink;
