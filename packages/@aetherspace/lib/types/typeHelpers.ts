export type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
export type Unpromisify<T> = T extends Promise<infer R> ? R : T;
