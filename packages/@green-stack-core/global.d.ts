type Overwrite<T, U> = Omit<T, keyof U> & U

type FlattenIfArray<T> = T extends (infer R)[] ? R : T

type Unpromisify<T> = T extends Promise<infer R> ? R : T

type ObjectType<T = unknown> = { [key: string]: T }

type HintedKeys = string & {} // eslint-disable-line @typescript-eslint/ban-types

type Primitive = string | number | boolean | bigint | symbol | null | undefined

type NonNullableRequired<T> = T extends null | undefined ? never : T

type ExtractPrimitives<T> = {
  [K in keyof T]: NonNullableRequired<T[K]> extends Primitive ? { [P in K]: string } : ExtractPrimitives<T[K]>
}[keyof NonNullableRequired<T>]

type DeepFlattenRequired<T> = {
  [K in keyof T]-?: NonNullableRequired<T[K]> extends Primitive ? NonNullableRequired<T[K]> : DeepFlattenRequired<NonNullableRequired<T[K]>>
}

type MergeUnion<T> = (T extends any ? (x: T) => void : never) extends (x: infer R) => void ? { [K in keyof R]: R[K] } : T

type ExtractRouteParams<T> = Partial<MergeUnion<ExtractPrimitives<DeepFlattenRequired<T>>>>

type Prettify<T> = {
  [K in keyof T]: T[K] extends Object ? Prettify<T[K]> : T[K]
} & {}

type PrettifySingleKeyRecord<T> = T extends Record<infer K, infer V>
  ? K extends keyof T
    ? { [key in K]: V }
    : never
  : never

type LowercaseFirstChar<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : S

type UppercaseFirstChar<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : S

type any$Todo = any
type any$Unknown = any
type any$FixMe = any
type any$TooComplex = any
type any$Ignore = any
