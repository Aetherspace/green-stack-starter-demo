/// <reference types="react" />
import { ImageProps, StyleProp, ImageStyle } from 'react-native';
interface AetherImageType extends Partial<ImageProps> {
    style?: StyleProp<ImageStyle>;
    src?: string;
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    width?: number;
    height?: number;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    children?: any | any[];
}
declare const _default: ((props: AetherImageType) => JSX.Element) & {
    TYPE: AetherImageType;
};
export default _default;
