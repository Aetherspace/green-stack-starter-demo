import React from 'react';
import { TextStyle } from 'react-native';
interface AetherLinkBaseType {
    children?: React.ReactNode;
    tw?: string;
    twID?: string;
    style?: TextStyle;
    asText?: boolean;
    isText?: boolean;
    isBlank?: boolean;
    target?: string;
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
declare type AetherLinkType = AetherLinkToType | AetherLinkHrefType | AetherLinkRouteType;
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
declare const AetherLink: (props: AetherLinkType) => JSX.Element;
export default AetherLink;
