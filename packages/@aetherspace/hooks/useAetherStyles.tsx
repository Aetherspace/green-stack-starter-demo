import { useMemo, ComponentClass } from 'react';
import { StyleProp } from 'react-native';
import tailwind from 'tailwind-rn';
// Context
import { BreakPointsType, useAetherContext } from '../context/AetherContextManager';
// Styles
import { addMediaQuery } from '../styles';

/* --- Types ----------------------------------------------------------------------------------- */

type StylePropsType<K, S = K> = {
    style?: StyleProp<S>;
    tw?: string;
    twID?: string;
    nativeID?: string;
    children?: any;
};

/* --- useAetherStyles() ----------------------------------------------------------------------- */

const useAetherStyles = <T extends StylePropsType<K, S>, K extends ComponentClass, S = K>(props: T) => {
    // Props
    const { style, tw: twStyles, ...nativeProps } = props;

    // Context
    const { isWeb, breakpoints = {}, twPrefixes = [], mediaPrefixes = [] } = useAetherContext();

    // -- Styles --

    const [styles, mediaIds] = useMemo(() => {
        let breakpointIds = '';
        if (!style && !twStyles) return [null, breakpointIds];
        if (!twStyles) return [style as unknown as StylePropsType<T>, breakpointIds];
        // Determine tailwind styles to be used
        const twClasses = twStyles.split(' ').sort(((a) => a.includes(':') ? 1 : -1));
        const usedClasses = twClasses.reduce((classes, twClass, i) => {
            if (!twClass.includes(':')) return `${classes}${i === 0 ? '' : ' '}${twClass}`;
            const [twPrefix, className] = twClass.split(':');
            if (isWeb && mediaPrefixes.includes(twPrefix)) {
                const breakpointStyles = tailwind(className) || {};
                const breakpointId = addMediaQuery(breakpoints[twPrefix as keyof BreakPointsType]!, breakpointStyles);
                breakpointIds = `${breakpointIds}${!breakpointIds ? '' : ' '}${breakpointId}`;
            }
            return twPrefixes.includes(twPrefix) ? `${classes}${i === 0 ? '' : ' '}${className}` : classes;
        }, '');
        // @ts-ignore
        const memoStyles = { ...tailwind(usedClasses), ...style } as unknown as StylePropsType<T>;
        return [memoStyles, breakpointIds] as [StylePropsType<T>, string];
    }, [style, twStyles, twPrefixes.join()]);

    // -- bindStyles --

    const bindStyles = { style: styles, ...nativeProps, ...(mediaIds ? { nativeID: mediaIds } : {}) };

    // -- Return --

    return bindStyles as unknown as K & { style: StyleProp<S>, nativeID?: string, children?: any; };
};

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherStyles;
