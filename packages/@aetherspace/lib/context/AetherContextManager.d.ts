/// <reference types="node" />
import React, { FC } from 'react';
import { TextProps } from 'react-native';
export interface NamedIconType extends TextProps {
    /**
     * Size of the icon, can also be passed as fontSize in the style object.
     *
     * @default 12
     */
    size?: number;
    /**
     * Color of the icon
     *
     */
    color?: string;
}
export interface IconProps<GLYPHS extends string> extends NamedIconType {
    /**
     * Name of the icon to show
     *
     * See Icon Explorer app
     * {@link https://expo.github.io/vector-icons/}
     */
    name: GLYPHS;
}
export interface LinkContextType {
    [pagePath: string]: string;
}
export interface AssetsType {
    [assetKey: string]: NodeRequire;
}
export interface IconsType {
    [iconKey: string]: FC<NamedIconType> | FC<IconProps<string>>;
}
export declare type BreakPointsType = {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
};
export interface AetherContextType {
    assets: AssetsType;
    icons: IconsType;
    linkContext?: LinkContextType;
    tw?: string;
    style?: any;
    isWeb?: boolean;
    isExpo?: boolean;
    isNextJS?: boolean;
    isServer?: boolean;
    isDesktop?: boolean;
    isMobile?: boolean;
    isAndroid?: boolean;
    isIOS?: boolean;
    isMobileWeb?: boolean;
    isTabletWeb?: boolean;
    isPhoneSize?: boolean;
    isTabletSize?: boolean;
    isLaptopSize?: boolean;
    breakpoints?: BreakPointsType;
    twPrefixes?: string[];
    mediaPrefixes?: string[];
    children?: any | any[];
}
export declare const DEFAULT_AETHER_CONTEXT: {
    assets: {};
    icons: {};
    linkContext: {};
};
export declare const AetherContext: React.Context<AetherContextType>;
declare const AetherContextManager: (props: AetherContextType) => JSX.Element;
export declare const useAetherContext: () => AetherContextType;
export default AetherContextManager;
