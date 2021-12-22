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
declare const AetherLink: (props: AetherLinkType) => JSX.Element;
export default AetherLink;
