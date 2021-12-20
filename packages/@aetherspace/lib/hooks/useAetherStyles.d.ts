import { ComponentClass } from 'react';
import { StyleProp } from 'react-native';
declare type StylePropsType<K, S = K> = {
    style?: StyleProp<S>;
    tw?: string;
    twID?: string;
    nativeID?: string;
    children?: any;
};
declare const useAetherStyles: <T extends StylePropsType<K, S>, K extends ComponentClass<{}, any>, S = K>(props: T) => K & {
    style: StyleProp<S>;
    nativeID?: string | undefined;
    children?: any;
};
export default useAetherStyles;
