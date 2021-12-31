/// <reference types="react" />
import { PressableProps, StyleProp, ViewStyle } from 'react-native';
interface AetherPressableType extends PressableProps {
    style?: StyleProp<ViewStyle>;
    tw?: string;
    twID?: string;
    children?: any | any[];
}
declare const AetherPressable: (props: AetherPressableType) => JSX.Element;
export default AetherPressable;
