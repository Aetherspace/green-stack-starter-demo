import React, { ComponentProps } from 'react';
import { Text } from 'react-native';
interface AetherTextType extends ComponentProps<typeof Text> {
    style?: ComponentProps<typeof Text>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
}
export declare const useTextContext: () => {
    color: string | null;
};
declare const _default: React.ForwardRefExoticComponent<AetherTextType & React.RefAttributes<Text>> & {
    TYPE: AetherTextType;
};
export default _default;
