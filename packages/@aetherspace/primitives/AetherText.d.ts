import React from 'react';
import { TextProps, StyleProp, TextStyle } from 'react-native';
interface AetherTextType extends TextProps {
    style?: StyleProp<TextStyle>;
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    children?: string | string[] | React.ReactNode | React.ReactNode[];
}
export declare const useTextContext: () => {
    color: string | null;
};
declare const _default: ((props: AetherTextType) => JSX.Element) & {
    TYPE: AetherTextType;
};
export default _default;
