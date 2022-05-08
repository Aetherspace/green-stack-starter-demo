import React, { ComponentType } from 'react';
declare type AetherPropsType = {
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
};
declare const aetherify: <Style, Props extends {
    style?: Style | undefined;
}, Ref, ExtraProps>(Component: React.ComponentType<Props>) => () => React.ForwardRefExoticComponent<React.PropsWithoutRef<Props & ExtraProps & AetherPropsType & {
    children?: React.ReactNode;
}> & React.RefAttributes<Ref>>;
export default aetherify;
