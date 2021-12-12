import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

/* --- useLayoutInfo() ------------------------------------------------------------------------- */

const useLayoutInfo = () => {
    // State
    const [layoutInfo, setLayoutInfo] = useState<{ [componentKey: string]: LayoutRectangle }>({});

    // -- Handler --

    const measureView = (componentKey: string) => ({ nativeEvent }: LayoutChangeEvent) => {
        const { layout } = nativeEvent;
        const { x, y, width, height } = layout;
        setLayoutInfo({ ...layoutInfo, [componentKey]: { x, y, width, height } });
    };

    // -- Return --

    return { layoutInfo, measureView };
};

/* --- Export ---------------------------------------------------------------------------------- */

export default useLayoutInfo;
