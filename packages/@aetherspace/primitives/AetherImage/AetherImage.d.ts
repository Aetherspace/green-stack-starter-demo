import React, { ComponentProps } from 'react';
import { Image } from 'react-native';
interface AetherImageType extends Partial<ComponentProps<typeof Image>> {
    style?: ComponentProps<typeof Image>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    src?: string;
    width?: number;
    height?: number;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
}
declare const _default: React.ForwardRefExoticComponent<AetherImageType & React.RefAttributes<Image>> & {
    TYPE: AetherImageType;
};
export default _default;
