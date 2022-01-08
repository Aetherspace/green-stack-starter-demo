import { LayoutChangeEvent, LayoutRectangle } from 'react-native';
declare const useLayoutInfo: () => {
    layoutInfo: {
        [componentKey: string]: LayoutRectangle;
    };
    measureView: (componentKey: string) => ({ nativeEvent }: LayoutChangeEvent) => void;
};
export default useLayoutInfo;
