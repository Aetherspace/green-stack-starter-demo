import { LayoutChangeEvent, LayoutRectangle } from 'react-native';
declare type LayoutInfo = LayoutRectangle & {
    pageX?: number;
    pageY?: number;
};
declare const useLayoutInfo: () => {
    layoutInfo: {
        [componentKey: string]: LayoutInfo;
    };
    measureOnLayout: (componentKey: string, callback?: ((measurements: LayoutInfo) => void) | undefined) => ({ nativeEvent }: LayoutChangeEvent) => void;
    measureRef: (componentKey: string, callback?: ((measurements: LayoutInfo) => void) | undefined) => (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => void;
};
export default useLayoutInfo;
