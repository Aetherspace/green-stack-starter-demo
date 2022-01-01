/// <reference types="react" />
import { PressableProps, StyleProp, ViewStyle } from 'react-native';
interface AetherPressableType extends PressableProps {
    style?: StyleProp<ViewStyle>;
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    children?: any | any[];
}
declare const AetherPressable: (props: AetherPressableType) => JSX.Element;
export default AetherPressable;
