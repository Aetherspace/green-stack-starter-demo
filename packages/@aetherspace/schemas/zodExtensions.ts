import { z } from 'zod'
import type { JSONSchema7 } from 'json-schema'
import zodToJsonSchema from 'zod-to-json-schema'

/* --- Types ----------------------------------------------------------------------------------- */

const SCHEMA_MAP = Object.freeze({
  boolean: 'AetherBoolean',
  number: 'AetherNumber',
  string: 'AetherString',
  date: 'AetherDate',
  object: 'AetherSchema',
  array: 'AetherArray',
  color: 'AetherColor',
  id: 'AetherId',
})

export type AetherZodType<T = any> = {
  type: keyof typeof SCHEMA_MAP
  aetherType: typeof SCHEMA_MAP[keyof typeof SCHEMA_MAP]
  description?: string
  defaultValue?: T
  schemaName?: string
  isOptional?: boolean
  isNullable?: boolean
  schema?: AetherZodType | Record<string, any>
}

declare module 'zod' {
  interface ZodType<Output> {
    exampleValue?: Output
  }

  interface ZodString {
    aetherType: 'AetherString'
    example(value: string): z.ZodString
    eg(value: string): z.ZodString
    ex(value: string): z.ZodString
  }

  interface ZodNumber {
    aetherType: 'AetherNumber'
    example(value: number): z.ZodNumber
    eg(value: number): z.ZodNumber
    ex(value: number): z.ZodNumber
  }

  interface ZodBoolean {
    aetherType: 'AetherBoolean'
    example(value: boolean): z.ZodBoolean
    eg(value: boolean): z.ZodBoolean
    ex(value: boolean): z.ZodBoolean
  }

  interface ZodDate {
    aetherType: 'AetherDate'
    example(value: Date): z.ZodDate
    eg(value: Date): z.ZodDate
    ex(value: Date): z.ZodDate
  }

  interface ZodEnum<T extends [string, ...string[]]> {
    aetherType: 'AetherEnum'
    example(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
    eg(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
    ex(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
  }

  interface ZodTuple<T extends [] | [z.ZodTypeAny, ...z.ZodTypeAny[]]> {
    aetherType: 'AetherTuple'
    example(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
    eg(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
    ex(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
  }

  interface ZodUnion<T extends readonly [z.ZodTypeAny, ...z.ZodTypeAny[]]> {
    aetherType: 'AetherUnion'
    example(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
    eg(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
    ex(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
  }

  interface ZodArray<T extends z.ZodTypeAny> {
    aetherType: 'AetherArray'
    example(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
    eg(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
    ex(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
  }

  interface ZodObject<
    T extends z.ZodRawShape,
    UnknownKeys extends 'passthrough' | 'strict' | 'strip' = 'strip',
    Catchall extends z.ZodTypeAny = z.ZodTypeAny,
    Output = z.objectOutputType<T, Catchall>,
    Input = z.objectInputType<T, Catchall>
  > {
    aetherType: 'AetherObject' | 'AetherSchema'
    schemaName?: string
    extendedFrom?: string
    nameSchema(schemaName: string): z.ZodObject<T, UnknownKeys, Catchall, Output, Input>
    extendSchema<E extends z.ZodRawShape>(
      schemaName: string,
      extraFields: E
    ): z.ZodObject<
      T & E,
      UnknownKeys,
      Catchall,
      z.objectOutputType<T & E, Catchall>,
      z.objectInputType<T & E, Catchall>
    >
    pickSchema<
      P extends Parameters<z.ZodObject<T>['pick']>[0],
      K extends Exclude<Exclude<keyof P, undefined>, symbol>
    >(
      schemaName: string,
      picks: P
    ): z.ZodObject<
      Pick<T, K>,
      UnknownKeys,
      Catchall,
      z.objectOutputType<Pick<T, K>, Catchall>,
      z.objectInputType<Pick<T, K>, Catchall>
    >
    omitSchema<
      P extends Parameters<z.ZodObject<T>['omit']>[0],
      K extends Exclude<Exclude<keyof P, undefined>, symbol>
    >(
      schemaName: string,
      picks: P
    ): z.ZodObject<
      Omit<T, K>,
      UnknownKeys,
      Catchall,
      z.objectOutputType<Omit<T, K>, Catchall>,
      z.objectInputType<Omit<T, K>, Catchall>
    >
    partialSchema(schemaName: string): ReturnType<
      z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['partial']
    > & {
      partial: never
      deepPartial: never
      required: never
      partialSchema: never
      deepPartialSchema: never
      requiredSchema: never
    }
    deepPartialSchema(schemaName: string): ReturnType<
      z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['deepPartial']
    > & {
      partial: never
      deepPartial: never
      required: never
      partialSchema: never
      deepPartialSchema: never
      requiredSchema: never
    }
    requiredSchema(schemaName: string): ReturnType<
      z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['required']
    > & {
      partial: never
      deepPartial: never
      required: never
      partialSchema: never
      deepPartialSchema: never
      requiredSchema: never
    }
    jsonSchema(): JSONSchema7
    introspect(): Record<string, any>
    example(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    eg(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    ex(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
  }
}

/* --- Primitives ------------------------------------------------------------------------------ */

if (!z.ZodString.prototype?.aetherType) {
  z.ZodString.prototype.aetherType = 'AetherString'
  z.ZodString.prototype.example = function (value: string) {
    this.exampleValue = value
    return this
  }
  z.ZodString.prototype.eg = z.ZodString.prototype.example
  z.ZodString.prototype.ex = z.ZodString.prototype.example
}

// const str = z.string().eg('hello')
// type str = z.infer<typeof str>
// const strEx = str.exampleValue
// console.log({ strEx, aetherType: str.aetherType })

if (!z.ZodNumber.prototype.aetherType) {
  z.ZodNumber.prototype.aetherType = 'AetherNumber'
  z.ZodNumber.prototype.example = function (value: number) {
    this.exampleValue = value
    return this
  }
  z.ZodNumber.prototype.eg = z.ZodNumber.prototype.example
  z.ZodNumber.prototype.ex = z.ZodNumber.prototype.example
}

// const num = z.number().eg(123)
// type num = z.infer<typeof num>
// const numEx = num.exampleValue
// console.log({ numEx, aetherType: num.aetherType })

if (!z.ZodBoolean.prototype.aetherType) {
  z.ZodBoolean.prototype.aetherType = 'AetherBoolean'
  z.ZodBoolean.prototype.example = function (value: boolean) {
    this.exampleValue = value
    return this
  }
  z.ZodBoolean.prototype.eg = z.ZodBoolean.prototype.example
  z.ZodBoolean.prototype.ex = z.ZodBoolean.prototype.example
}

// const bool = z.boolean().eg(true)
// type bool = z.infer<typeof bool>
// const boolEx = bool.exampleValue
// console.log({ boolEx, aetherType: bool.aetherType })

/* --- Advanced -------------------------------------------------------------------------------- */

if (!z.ZodDate.prototype.aetherType) {
  z.ZodDate.prototype.aetherType = 'AetherDate'
  z.ZodDate.prototype.example = function (value: Date) {
    this.exampleValue = value
    return this
  }
  z.ZodDate.prototype.eg = z.ZodDate.prototype.example
  z.ZodDate.prototype.ex = z.ZodDate.prototype.example
}

// const date = z.date().eg(new Date())
// type date = z.infer<typeof date>
// const dateEx = date.exampleValue
// console.log({ dateEx, aetherType: date.aetherType })

if (!z.ZodEnum.prototype.aetherType) {
  z.ZodEnum.prototype.aetherType = 'AetherEnum'
  z.ZodEnum.prototype.example = function (value: string) {
    this.exampleValue = value
    return this
  }
  z.ZodEnum.prototype.eg = z.ZodEnum.prototype.example
  z.ZodEnum.prototype.ex = z.ZodEnum.prototype.example
}

// const enum1 = z.enum(['a', 'b', 'c']).eg('a')
// type enum1 = z.infer<typeof enum1>
// const enum1Ex = enum1.exampleValue
// console.log({ enum1Ex, aetherType: enum1.aetherType })

if (!z.ZodTuple.prototype.aetherType) {
  z.ZodTuple.prototype.aetherType = 'AetherTuple'
  z.ZodTuple.prototype.example = function (value: any[]) {
    this.exampleValue = value
    return this
  }
  z.ZodTuple.prototype.eg = z.ZodTuple.prototype.example
  z.ZodTuple.prototype.ex = z.ZodTuple.prototype.example
}

// const tuple = z.tuple([z.string(), z.number()]).eg(['hello', 123])
// type tuple = z.infer<typeof tuple>
// const tupleEx = tuple.exampleValue
// console.log({ tupleEx, aetherType: tuple.aetherType })

if (!z.ZodUnion.prototype.aetherType) {
  z.ZodUnion.prototype.aetherType = 'AetherUnion'
  z.ZodUnion.prototype.example = function (value: any) {
    this.exampleValue = value
    return this
  }
  z.ZodUnion.prototype.eg = z.ZodUnion.prototype.example
  z.ZodUnion.prototype.ex = z.ZodUnion.prototype.example
}

// const union = z.union([z.string(), z.number()]).eg('hello')
// type union = z.infer<typeof union>
// const unionEx = union.exampleValue
// console.log({ unionEx, aetherType: union.aetherType })

if (!z.ZodArray.prototype.aetherType) {
  z.ZodArray.prototype.aetherType = 'AetherArray'
  z.ZodArray.prototype.example = function (value: any[]) {
    this.exampleValue = value
    return this
  }
  z.ZodArray.prototype.eg = z.ZodArray.prototype.example
  z.ZodArray.prototype.ex = z.ZodArray.prototype.example
}

// const arr = z.array(z.string()).eg(['hello', 'world'])
// type arr = z.infer<typeof arr>
// const arrEx = arr.exampleValue
// console.log({ arrEx, aetherType: arr.aetherType })

/** --- parseType() ---------------------------------------------------------------------------- */
/** -i- Add correct fields like type & aetherType while converting a JSON schema prop definition to aetherspace prop definition. */
const parseType = (propDef: JSONSchema7, propSchema: Record<string, unknown> = {}) => {
  // @ts-ignore
  const { type: propType, enum: propEnum, description, anyOf } = propDef
  if (Array.isArray(propType)) {
    propSchema.isNullable = propType.includes('null')
    const leftoverType = propType.filter((type: string) => type !== 'null')[0]
    propSchema.aetherType = SCHEMA_MAP[leftoverType]
    propSchema.type = leftoverType
  } else if (propDef.format === 'date-time') {
    propSchema.aetherType = 'AetherDate'
    propSchema.type = 'date'
  } else if (propEnum) {
    propSchema.aetherType = 'AetherEnum'
    propSchema.type = 'enums'
    propSchema.schema = propEnum.reduce(
      (acc, enumVal) => ({
        ...(acc as Record<string, string | number>),
        [enumVal as string]: enumVal,
      }),
      {}
    )
  } else if (propType === 'string' && description?.toLowerCase().includes('color')) {
    // TODO: Figure out a better way to detect color fields
    propSchema.aetherType = 'AetherColor'
    propSchema.type = 'string'
  } else {
    propSchema.aetherType = SCHEMA_MAP[propType!]
    propSchema.type = propType
  }
  // Return
  return propSchema
}

/** --- parseProp() ---------------------------------------------------------------------------- */
/** -i- Convert a JSON schema prop definition to an aetherspace prop definition */
const parseProp = (propKey: string, propDef: JSONSchema7, parseContext: { required: string[] }) => {
  // @ts-ignore
  const { type: propType, default: propDefault, description } = propDef
  const required = parseContext?.required
  let propSchema = {} as Record<string, unknown>
  // Determine if optional
  propSchema.isOptional = required ? !required.includes(propKey) : true
  // Determine types
  propSchema = parseType(propDef, propSchema)
  // Handle descriptions
  if (description && propSchema.type !== 'object') propSchema.description = description
  // Handle defaults
  if (propDefault) propSchema.defaultValue = propDefault
  // Handle objects
  if (propType === 'object') {
    propSchema = { ...propSchema, ...parseSchema(propDef as JSONSchema7) }
  }
  // Handle arrays
  if (propSchema.aetherType === 'AetherArray') {
    propSchema.schema = parseProp(propKey, propDef.items as Record<string, unknown>, parseContext)
  }
  // Return parsed schema
  return propSchema
}

/** --- parseSchema() -------------------------------------------------------------------------- */
/** -i- Convert a JSON schema object to an aetherspace compatible schema */
const parseSchema = (schema: JSONSchema7) => {
  // @ts-ignore
  const { type, description, properties, required = [] } = schema
  // Do nothing when not an object
  if (type !== 'object') return {}
  // Build aether schema
  const resultSchema = {} as Record<string, any>
  resultSchema.aetherType = 'AetherSchema'
  resultSchema.type = type
  resultSchema.schemaName = description
  // Parse properties
  resultSchema.schema = Object.entries(properties!).reduce((atSchema, [propKey, propDef]) => {
    const propSchema = parseProp(propKey, propDef as Record<string, unknown>, { required })
    // Abort if unknown
    if (!propSchema.aetherType) {
      console.warn(`Unknown prop type: ${propKey} (${propSchema.type})`, propSchema)
      return atSchema
    }
    // Return prop definition
    return { ...atSchema, [propKey]: propSchema }
  }, {})
  // Return parsed schema
  return resultSchema
}

/* --- Object Schemas -------------------------------------------------------------------------- */

if (!z.ZodObject.prototype.aetherType) {
  z.ZodObject.prototype.aetherType = 'AetherObject'
  z.ZodObject.prototype.nameSchema = function (schemaName: string) {
    this.aetherType = 'AetherSchema'
    this.schemaName = schemaName
    return this.describe(schemaName)
  }
  // Allow named extensions
  z.ZodObject.prototype.extendSchema = function (
    schemaName: string,
    extraProperties: z.ZodRawShape
  ) {
    const extendedSchema = this.extend(extraProperties).nameSchema(schemaName)
    if (this.exampleValue) extendedSchema.example(this.exampleValue)
    if (this.schemaName) extendedSchema.extendedFrom = this.schemaName
    return extendedSchema
  }
  // @ts-ignore
  z.ZodObject.prototype.pickSchema = function (schemaName: string, picks: any) {
    const pickedSchema = this.pick(picks).nameSchema(schemaName)
    if (this.exampleValue) pickedSchema.example(this.exampleValue)
    if (this.schemaName) pickedSchema.extendedFrom = this.schemaName
    return pickedSchema
  }
  // @ts-ignore
  z.ZodObject.prototype.omitSchema = function (schemaName: string, omits: any) {
    const omittedSchema = this.omit(omits).nameSchema(schemaName)
    if (this.exampleValue) omittedSchema.example(this.exampleValue)
    if (this.schemaName) omittedSchema.extendedFrom = this.schemaName
    return omittedSchema
  }
  // @ts-ignore
  z.ZodObject.prototype.partialSchema = function (schemaName: string) {
    const partialSchema = this.partial().nameSchema(schemaName)
    if (this.exampleValue) partialSchema.example(this.exampleValue)
    if (this.schemaName) partialSchema.extendedFrom = this.schemaName
    return partialSchema
  }
  // @ts-ignore
  z.ZodObject.prototype.deepPartialSchema = function (schemaName: string) {
    const partialSchema = this.deepPartial().nameSchema(schemaName)
    if (this.exampleValue) partialSchema.example(this.exampleValue)
    if (this.schemaName) partialSchema.extendedFrom = this.schemaName
    return partialSchema
  }
  // @ts-ignore
  z.ZodObject.prototype.requiredSchema = function (schemaName: string) {
    const requiredSchema = this.required().nameSchema(schemaName)
    if (this.exampleValue) requiredSchema.example(this.exampleValue)
    if (this.schemaName) requiredSchema.extendedFrom = this.schemaName
    return requiredSchema
  }
  // Documentation
  z.ZodObject.prototype.jsonSchema = function () {
    return zodToJsonSchema(this) as JSONSchema7
  }
  z.ZodObject.prototype.introspect = function () {
    return parseSchema(this.jsonSchema())
  }
  // Allow examples
  z.ZodObject.prototype.example = function (value: any) {
    this.exampleValue = value
    return this
  }
  z.ZodObject.prototype.eg = z.ZodObject.prototype.example
  z.ZodObject.prototype.ex = z.ZodObject.prototype.example
}

/** --- aetherSchema() ------------------------------------------------------------------------- */
/** -i- Define your datastructure (Props, Args, Models) as a zod powered single source of truth */
export const aetherSchema = <T extends z.ZodRawShape>(schemaName: string, shape: T) => {
  return z.object(shape).nameSchema(schemaName)
}

/** --- buildSchema() -------------------------------------------------------------------------- */
/** -i- Define your datastructure (Props, Args, Models) as a zod object and turn it into an aetherSchema */
export const buildSchema = <T extends z.ZodRawShape>(
  schemaName: string,
  zodSchema: z.ZodObject<T>
) => {
  return aetherSchema(schemaName, zodSchema.shape)
}

// const obj = z.object({ a: z.string().optional(), b: z.number() }).eg({ a: 'hello', b: 123 })
// type obj = z.infer<typeof obj>
// const objEx = obj.exampleValue
// console.log({ objEx, aetherType: obj.aetherType })

// const schm = buildSchema('MySchema', obj) // obj.nameSchema('MySchema')
// type schm = z.infer<typeof schm>
// const schmEx = schm.exampleValue
// console.log({ schmEx, aetherType: schm.aetherType, schemaName: schm.schemaName })

// const extended = schm.extendSchema('ExtendedSchema', { c: z.boolean() }).eg({ a: 'hello', b: 123, c: true }) // prettier-ignore
// type extended = z.infer<typeof extended>
// const extendedEx = extended.exampleValue
// console.log({ extendedEx, aetherType: extended.aetherType, schemaName: extended.schemaName, extendedFrom: extended.extendedFrom }) // prettier-ignore

// const picked = extended.pickSchema('PickedSchema', { a: true, c: true }).eg({ a: 'hello', c: true })
// type picked = z.infer<typeof picked>
// const pickedEx = picked.exampleValue
// console.log({ pickedEx, aetherType: picked.aetherType, schemaName: picked.schemaName, extendedFrom: picked.extendedFrom }) // prettier-ignore

// const omitted = extended.omitSchema('OmittedSchema', { a: true, c: true }).eg({ b: 123 })
// type omitted = z.infer<typeof omitted>
// const omittedEx = omitted.exampleValue
// console.log({ omittedEx, aetherType: omitted.aetherType, schemaName: omitted.schemaName, extendedFrom: omitted.extendedFrom }) // prettier-ignore

// const partial = extended.partialSchema('PartialSchema').eg({ a: 'hello' })
// type partial = z.infer<typeof partial>
// const partialEx = partial.exampleValue
// console.log({ partialEx, aetherType: partial.aetherType, schemaName: partial.schemaName, extendedFrom: partial.extendedFrom }) // prettier-ignore

// const deepPartial = extended.deepPartialSchema('DeepPartialSchema').eg({ a: 'hello' })
// type deepPartial = z.infer<typeof deepPartial>
// const deepPartialEx = deepPartial.exampleValue
// console.log({ deepPartialEx, aetherType: deepPartial.aetherType, schemaName: deepPartial.schemaName, extendedFrom: deepPartial.extendedFrom }) // prettier-ignore

// const required = extended.requiredSchema('RequiredSchema').eg({ a: 'hello', b: 123, c: true })
// type required = z.infer<typeof required>
// const requiredEx = required.exampleValue
// console.log({ requiredEx, aetherType: required.aetherType, schemaName: required.schemaName, extendedFrom: required.extendedFrom }) // prettier-ignore
