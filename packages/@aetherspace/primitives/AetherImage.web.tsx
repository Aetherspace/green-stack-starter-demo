import React, { useMemo } from 'react';
import { ImageProps, StyleProp, ImageStyle, ImageURISource } from 'react-native';
import Image from 'next/image';
// Context
import { useAetherContext } from '../context/AetherContextManager';
// @ts-ignore (Components)
import AetherImageExpo from './AetherImage.tsx';
import AetherView from './AetherView';

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
    // Props
    const { tw, style, width, height, quality, priority, loading } = props;
    const bindStyles = { style, tw };
    const source = props.source as ImageURISource;
    const src = props.src || source?.uri;

    // Context
    const { isNextJS, isExpo } = useAetherContext();

    // -- Memoizations --

    const imgProps = useMemo(() => {
        // Responsive when width & height are passed
        type ResponsiveType = { width: number | string; height: number | string; layout: 'responsive' };
        if (width && height) return { width, height, layout: 'responsive' } as ResponsiveType;
        // Fill when no width & height are passed
        type FillType = { layout: 'fill', width: never, height: never };
        return { layout: 'fill' } as FillType;
    }, []);

    // -- Render --

    if (!isNextJS || isExpo) return <AetherImageExpo {...bindStyles} src={src} />
    return (
        <AetherView {...bindStyles}>
            <Image src={src!} {...imgProps} quality={quality} priority={priority} loading={loading} />
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherImage;
