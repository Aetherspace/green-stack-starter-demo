import React, { ComponentProps } from 'react';
import { View } from 'react-native';
interface AetherViewType extends ComponentProps<typeof View> {
    style?: ComponentProps<typeof View>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
}
declare const _default: React.ForwardRefExoticComponent<AetherViewType & React.RefAttributes<View>> & {
    TYPE: AetherViewType;
};
export default _default;
