import React, { useMemo } from 'react';
import { Image, ImageProps, StyleProp, ImageStyle, ImageRequireSource } from 'react-native';
// Context
import { useAetherContext } from '../context/AetherContextManager';
// Hooks
import { useAetherStyles } from '../hooks';
// Utils
import { getAssetKey } from '../utils';

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherImageType extends Partial<ImageProps> {
    style?: StyleProp<ImageStyle>,
    src?: string;
    tw?: string;
    twID?: string;
    width?: number;
    height?: number;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    children?: any | any[];
};

/* --- <AetherImage/> -------------------------------------------------------------------------- */

const AetherImage = (props: AetherImageType) => {
    // Context
    const { assets } = useAetherContext();

    // Props
    const source = useMemo(() => {
        if (!props.src) return props.source;
        if (props.src.includes('http')) return { uri: props.src };
        return assets[getAssetKey(props.src)] as unknown as ImageRequireSource;
    }, [props.source, props.src]);

    // -- Styles --

    // @ts-ignore
    const bindStyles = useAetherStyles<AetherImageType, typeof Image, ImageStyle>(props);
    const { src: _, ...componentProps } = bindStyles as typeof bindStyles & { src?: string };

    // -- Render --

    return <Image {...componentProps} source={source!} />;
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherImage;
