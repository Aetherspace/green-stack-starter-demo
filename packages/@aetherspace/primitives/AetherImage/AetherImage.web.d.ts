import React, { ComponentProps } from 'react';
import { Image as RNImage } from 'react-native';
import Image from 'next/image';
interface AetherImageType extends Partial<ComponentProps<typeof RNImage>> {
    style?: ComponentProps<typeof RNImage>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    src?: string;
    width?: number;
    height?: number;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
}
declare const _default: React.ForwardRefExoticComponent<AetherImageType & React.RefAttributes<typeof Image>> & {
    TYPE: AetherImageType;
};
export default _default;
