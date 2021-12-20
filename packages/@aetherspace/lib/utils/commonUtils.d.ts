declare type ObjectType<T extends unknown = any> = {
    [key: string]: T;
};
export declare const isEmpty: (val: string | any[] | ObjectType | null, failOnEmptyStrings?: boolean) => boolean;
export {};
