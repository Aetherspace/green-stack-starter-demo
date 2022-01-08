export declare type Overwrite<T, U> = Omit<T, keyof U> & U;
export declare type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
export declare type Unpromisify<T> = T extends Promise<infer R> ? R : T;
