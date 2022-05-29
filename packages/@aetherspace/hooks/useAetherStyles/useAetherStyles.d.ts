import { ComponentProps, JSXElementConstructor } from 'react';
declare type StylePropsType<C extends JSXElementConstructor<any>> = {
    style?: ComponentProps<C>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
    nativeID?: string;
    children?: any;
};
declare const useAetherStyles: <C extends JSXElementConstructor<any>, P extends StylePropsType<C> = StylePropsType<C>>(props: P) => {
    nativeID?: string | undefined;
    style: ComponentProps<C>["style"] | null;
};
export default useAetherStyles;
