// https://docs.expo.dev/versions/latest/react-native/pressable/
// https://necolas.github.io/react-native-web/docs/pressable/
import React from 'react';
import { View, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
// Hooks
import { useAetherStyles } from '../hooks';

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherPressableType extends PressableProps {
    style?: StyleProp<ViewStyle>;
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    children?: any | any[];
};

/* --- <AetherPressable/> ---------------------------------------------------------------------- */

const AetherPressable = (props: AetherPressableType) => {
    // Styles
    const bindStyles = useAetherStyles<AetherPressableType, typeof View, ViewStyle>(props);
    // Render
    return <Pressable {...bindStyles} />;
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherPressable;
