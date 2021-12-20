/// <reference types="react" />
import { ImageProps, StyleProp, ImageStyle } from 'react-native';
interface AetherImageType extends Partial<ImageProps> {
    style?: StyleProp<ImageStyle>;
    src?: string;
    tw?: string;
    twID?: string;
    width?: number;
    height?: number;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    children?: any | any[];
}
declare const AetherImage: (props: AetherImageType) => JSX.Element;
export default AetherImage;
