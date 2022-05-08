/// <reference types="react" />
import { ViewProps, StyleProp, ViewStyle } from 'react-native';
interface AetherViewType extends ViewProps {
    style?: StyleProp<ViewStyle>;
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    children?: any | any[];
}
declare const _default: ((props: AetherViewType) => JSX.Element) & {
    TYPE: AetherViewType;
};
export default _default;
