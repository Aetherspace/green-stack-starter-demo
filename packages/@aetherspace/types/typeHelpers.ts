export type Overwrite<T, U> = Omit<T, keyof U> & U

export type FlattenIfArray<T> = T extends (infer R)[] ? R : T
export type Unpromisify<T> = T extends Promise<infer R> ? R : T

export type HintedKeys = string & {} // eslint-disable-line @typescript-eslint/ban-types

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

export type any$Todo = any
