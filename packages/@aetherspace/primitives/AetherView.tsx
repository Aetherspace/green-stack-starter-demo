import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
// Hooks
import { useAetherStyles } from '../hooks';

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherViewType extends ViewProps {
    style?: StyleProp<ViewStyle>;
    tw?: string;
    twID?: string;
    children?: any | any[];
};

/* --- <AetherView/> --------------------------------------------------------------------------- */

const AetherView = (props: AetherViewType) => {
    // Styles
    const bindStyles = useAetherStyles<AetherViewType, typeof View, ViewStyle>(props);
    // Render
    return <View {...bindStyles} />;
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherView;
