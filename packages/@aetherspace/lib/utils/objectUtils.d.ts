declare type ObjectType = {
    [key: string]: any;
};
export declare const objectifier: (contextTree: ObjectType, parts: string[], create?: boolean) => ObjectType | undefined;
export declare const setProp: (obj: ObjectType, key: string, val: unknown) => ObjectType;
export declare const getProp: <T extends ObjectType>(obj: ObjectType | null, key: string) => T | undefined;
export declare const getFromSources: (key: string, sources: {
    [key: string]: any;
}[]) => any;
export declare const normalizeObjectProps: (objToValidate?: ObjectType, ignoredKeys?: string[]) => ObjectType;
export {};
