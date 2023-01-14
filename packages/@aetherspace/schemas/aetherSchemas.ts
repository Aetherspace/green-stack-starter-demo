import { z } from 'zod'
import type { JSONSchema7 } from 'json-schema'
import zodToJsonSchema from 'zod-to-json-schema'

/* --- Types ----------------------------------------------------------------------------------- */

const ATS_TO_TYPE = Object.freeze({
  AetherBoolean: 'boolean',
  AetherNumber: 'number',
  AetherString: 'string',
  AetherDate: 'date',
  AetherObject: 'object',
  AetherSchema: 'object',
  AetherArray: 'array',
  AetherColor: 'string',
  AetherEnum: 'enum',
  AetherTuple: 'tuple',
  AetherUnion: 'union',
  AetherId: 'string',
})

const TYPE_TO_ATS = Object.freeze({
  boolean: 'AetherBoolean',
  number: 'AetherNumber',
  string: 'AetherString',
  date: 'AetherDate',
  object: 'AetherSchema',
  array: 'AetherArray',
  color: 'AetherColor',
  enum: 'AetherEnum',
  tuple: 'AetherTuple',
  union: 'AetherUnion',
  id: 'AetherId',
})

const ZOD_TO_ATS = Object.freeze({
  ZodBoolean: 'AetherBoolean',
  ZodNumber: 'AetherNumber',
  ZodString: 'AetherString',
  ZodDate: 'AetherDate',
  ZodObject: 'AetherSchema',
  ZodArray: 'AetherArray',
  ZodEnum: 'AetherEnum',
  ZodTuple: 'AetherTuple',
  ZodUnion: 'AetherUnion',
})

export type AetherSchemaType<T = any> = {
  type: keyof typeof TYPE_TO_ATS
  aetherType: typeof TYPE_TO_ATS[keyof typeof TYPE_TO_ATS]
  description?: string
  defaultValue?: T
  exampleValue?: T
  schemaName?: string
  extendedFrom?: string
  isOptional?: boolean
  isNullable?: boolean
  schema: AetherSchemaType | Record<string, any>
}

export type SchemaPluginMap = {
  // -- Primitives --
  AetherString: (name: string, schema: AetherSchemaType) => unknown
  AetherNumber: (name: string, schema: AetherSchemaType) => unknown
  AetherBoolean: (name: string, schema: AetherSchemaType) => unknown
  // -- Single values --
  AetherId: (name: string, schema: AetherSchemaType) => unknown
  AetherColor: (name: string, schema: AetherSchemaType) => unknown
  AetherDate: (name: string, schema: AetherSchemaType) => unknown
  AetherEnum: (name: string, schema: AetherSchemaType) => unknown
  // -- Objectlikes --
  AetherSchema: (name: string, schema: AetherSchemaType) => unknown
  AetherObject: (name: string, schema: AetherSchemaType) => unknown
  // -- Arraylikes --
  AetherArray: (name: string, schema: AetherSchemaType) => unknown
}

declare module 'zod' {
  interface ZodType<Output> {
    exampleValue?: Output
  }

  interface ZodString {
    aetherType: 'AetherString' | 'AetherId' | 'AetherColor'
    id(): z.ZodString
    color(): z.ZodString
    example(value: string): z.ZodString
    eg(value: string): z.ZodString
    ex(value: string): z.ZodString
    introspect(): AetherSchemaType<string>
  }

  interface ZodNumber {
    aetherType: 'AetherNumber'
    example(value: number): z.ZodNumber
    eg(value: number): z.ZodNumber
    ex(value: number): z.ZodNumber
    introspect(): AetherSchemaType<number>
  }

  interface ZodBoolean {
    aetherType: 'AetherBoolean'
    example(value: boolean): z.ZodBoolean
    eg(value: boolean): z.ZodBoolean
    ex(value: boolean): z.ZodBoolean
    introspect(): AetherSchemaType<boolean>
  }

  interface ZodDate {
    aetherType: 'AetherDate'
    schema?: { minDate?: Date; maxDate?: Date }
    example(value: Date): z.ZodDate
    eg(value: Date): z.ZodDate
    ex(value: Date): z.ZodDate
    introspect(): AetherSchemaType<Date>
  }

  interface ZodEnum<T extends [string, ...string[]]> {
    aetherType: 'AetherEnum'
    schema?: Record<T[number], T[number]>
    example(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
    eg(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
    ex(value: z.infer<z.ZodEnum<T>>): z.ZodEnum<T>
    introspect(): AetherSchemaType<z.infer<z.ZodEnum<T>>>
  }

  interface ZodTuple<T extends [] | [z.ZodTypeAny, ...z.ZodTypeAny[]]> {
    aetherType: 'AetherTuple'
    schema?: AetherSchemaType[]
    example(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
    eg(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
    ex(value: z.infer<z.ZodTuple<T>>): z.ZodTuple<T>
    introspect(): AetherSchemaType<z.infer<z.ZodTuple<T>>>
  }

  interface ZodUnion<T extends readonly [z.ZodTypeAny, ...z.ZodTypeAny[]]> {
    aetherType: 'AetherUnion'
    example(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
    eg(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
    ex(value: z.infer<z.ZodUnion<T>>): z.ZodUnion<T>
    introspect(): AetherSchemaType<z.infer<z.ZodUnion<T>>>
  }

  interface ZodArray<T extends z.ZodTypeAny> {
    aetherType: 'AetherArray'
    schema?: AetherSchemaType
    example(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
    eg(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
    ex(value: z.infer<z.ZodArray<T>>): z.ZodArray<T>
    introspect(): AetherSchemaType<z.infer<z.ZodArray<T>>>
  }

  interface ZodNullable<T extends z.ZodTypeAny> {
    aetherType?: string
    schema?: unknown
    example(value: z.infer<z.ZodNullable<T>>): z.ZodNullable<T>
    eg(value: z.infer<z.ZodNullable<T>>): z.ZodNullable<T>
    ex(value: z.infer<z.ZodNullable<T>>): z.ZodNullable<T>
    introspect(): AetherSchemaType<z.infer<z.ZodNullable<T>>>
  }

  interface ZodOptional<T extends z.ZodTypeAny> {
    aetherType?: string
    schema?: unknown
    example(value: z.infer<z.ZodOptional<T>>): z.ZodOptional<T>
    eg(value: z.infer<z.ZodOptional<T>>): z.ZodOptional<T>
    ex(value: z.infer<z.ZodOptional<T>>): z.ZodOptional<T>
    introspect(): AetherSchemaType<z.infer<z.ZodOptional<T>>>
  }

  interface ZodDefault<T extends z.ZodTypeAny> {
    aetherType?: string
    schema?: unknown
    example(value: z.infer<z.ZodDefault<T>>): z.ZodDefault<T>
    eg(value: z.infer<z.ZodDefault<T>>): z.ZodDefault<T>
    ex(value: z.infer<z.ZodDefault<T>>): z.ZodDefault<T>
    introspect(): AetherSchemaType<z.infer<z.ZodDefault<T>>>
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
    partialSchema(
      schemaName: string
    ): ReturnType<z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['partial']>
    deepPartialSchema(
      schemaName: string
    ): ReturnType<z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['deepPartial']>
    requiredSchema(
      schemaName: string
    ): ReturnType<z.ZodObject<T, UnknownKeys, Catchall, Output, Input>['required']>
    jsonSchema(): JSONSchema7
    introspect(): AetherSchemaType
    example(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    eg(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    ex(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
  }
}

/** --- introspectField() ---------------------------------------------------------------------- */
/** -i- parse field info into AetherSchemaType format */
const introspectField = <T extends z.ZodTypeAny>(field: T): AetherSchemaType => {
  const schema = {} as AetherSchemaType
  schema.type = field._def.t // @ts-ignore
  if (field.aetherType) schema.aetherType = field.aetherType
  if (schema.aetherType) schema.type = ATS_TO_TYPE[schema.aetherType]
  if (field.description) schema.description = field.description
  if (field.exampleValue) schema.exampleValue = field.exampleValue // @ts-ignore
  if (field.safeParse(undefined).success) schema.defaultValue = field.safeParse(undefined).data // @ts-ignore
  if (field.schema) schema.schema = field.schema // @ts-ignore
  // Check for optionality
  schema.isNullable = field.isNullable()
  schema.isOptional = field.isOptional()
  return schema
}

/** --- getInnerMostType ---------------------------------------------------------------------------- */
/** -i- Get inner zod type definition from .default(), .nullable() or .optional() wrapped values */
const getInnerMostType = <T extends z.ZodTypeAny>(schema: T) => {
  if (!schema._def.innerType) return schema
  return getInnerMostType(schema._def.innerType)
}

/** --- assignAetherContext() ------------------------------------------------------------------------ */
/** -i- Adds aetherspace context back onto zod wrapper classes from the inner type (e.g. ZodNullable, ZodDefault, ...) */
const assignAetherContext = <
  T extends z.ZodTypeAny,
  W extends z.ZodDefault<T> | z.ZodNullable<T> | z.ZodOptional<T>
>(
  schema: W,
  innerType: T
) => {
  const innerMostType = getInnerMostType(innerType) // @ts-ignore
  if (innerMostType.aetherType) schema.aetherType = innerMostType.aetherType // @ts-ignore
  if (innerMostType.exampleValue) schema.exampleValue = innerMostType.exampleValue // @ts-ignore
  if (innerMostType.schemaName) schema.schemaName = innerMostType.schemaName // @ts-ignore
  if (innerMostType.extendedFrom) schema.extendedFrom = innerMostType.extendedFrom
  if (innerMostType._def.description) schema.describe(innerMostType._def.description) // @ts-ignore
  if (innerMostType._def.schema) schema.schema = innerMostType._def.schema
  if (innerMostType.description) schema.describe(innerMostType.description) // @ts-ignore
  return schema
}

/* --- Wrappers -------------------------------------------------------------------------------- */

if (!z.ZodOptional.prototype?.aetherType) {
  const originalCreate = z.ZodOptional.create
  z.ZodOptional.create = function <T extends z.ZodTypeAny>(innerType: T) {
    return assignAetherContext(originalCreate(innerType), innerType)
  }
  z.ZodOptional.prototype.aetherType = 'AetherOptional'
  z.ZodOptional.prototype.example = function (value: any) {
    if (this._def.innerType.aetherType) this.aetherType = this._def.innerType.aetherType
    this.exampleValue = value
    return this
  }
  z.ZodOptional.prototype.eg = z.ZodOptional.prototype.example
  z.ZodOptional.prototype.ex = z.ZodOptional.prototype.example
  z.ZodOptional.prototype.introspect = function () {
    const innerMostSchema = getInnerMostType(this).introspect?.().schema
    if (innerMostSchema) this.schema = innerMostSchema
    return introspectField(this)
  }
}

if (!z.ZodNullable.prototype?.aetherType) {
  const originalCreate = z.ZodNullable.create
  z.ZodNullable.create = function <T extends z.ZodTypeAny>(innerType: T) {
    return assignAetherContext(originalCreate(innerType), innerType)
  }
  z.ZodNullable.prototype.aetherType = 'AetherNullable'
  z.ZodNullable.prototype.example = function (value: any) {
    if (this._def.innerType.aetherType) this.aetherType = this._def.innerType.aetherType
    this.exampleValue = value
    return this
  }
  z.ZodNullable.prototype.eg = z.ZodNullable.prototype.example
  z.ZodNullable.prototype.ex = z.ZodNullable.prototype.example
  z.ZodNullable.prototype.introspect = function () {
    const innerMostSchema = getInnerMostType(this).introspect?.().schema
    if (innerMostSchema) this.schema = innerMostSchema
    return introspectField(this)
  }
}

if (!z.ZodDefault.prototype?.aetherType) {
  const originalCreate = z.ZodDefault.create
  z.ZodDefault.create = function <T extends z.ZodTypeAny>(innerType: T, defaultValue: any) {
    return assignAetherContext(originalCreate(innerType, defaultValue), innerType)
  }
  z.ZodDefault.prototype.aetherType = 'AetherDefault'
  z.ZodDefault.prototype.example = function (value: any) {
    if (this._def.innerType.aetherType) this.aetherType = this._def.innerType.aetherType
    this.exampleValue = value
    return this
  }
  z.ZodDefault.prototype.eg = z.ZodDefault.prototype.example
  z.ZodDefault.prototype.ex = z.ZodDefault.prototype.example
  z.ZodDefault.prototype.introspect = function () {
    const innerMostSchema = getInnerMostType(this).introspect?.().schema
    if (innerMostSchema) this.schema = innerMostSchema
    return introspectField(this)
  }
}

/* --- Primitives ------------------------------------------------------------------------------ */

if (!z.ZodString.prototype?.aetherType) {
  z.ZodString.prototype.aetherType = 'AetherString'
  z.ZodString.prototype.id = function () {
    this.aetherType = 'AetherId'
    return this
  }
  z.ZodString.prototype.color = function () {
    this.aetherType = 'AetherColor'
    return this.min(4).max(9).regex(/^#/)
  }
  z.ZodString.prototype.example = function (value: string) {
    this.exampleValue = value
    return this
  }
  z.ZodString.prototype.eg = z.ZodString.prototype.example
  z.ZodString.prototype.ex = z.ZodString.prototype.example
  z.ZodString.prototype.introspect = function () {
    return introspectField(this)
  }
}

const str = z.string().optional().default('hello').describe('a string').eg('hello world')
type str = z.infer<typeof str>
console.log({ strDef: str.introspect() })

if (!z.ZodNumber.prototype.aetherType) {
  z.ZodNumber.prototype.aetherType = 'AetherNumber'
  z.ZodNumber.prototype.example = function (value: number) {
    this.exampleValue = value
    return this
  }
  z.ZodNumber.prototype.eg = z.ZodNumber.prototype.example
  z.ZodNumber.prototype.ex = z.ZodNumber.prototype.example
  z.ZodNumber.prototype.introspect = function () {
    return introspectField(this)
  }
}

const num = z.number().optional().default(1).describe('a number').eg(1)
type num = z.infer<typeof num>
console.log({ numDef: num.introspect() })

if (!z.ZodBoolean.prototype.aetherType) {
  z.ZodBoolean.prototype.aetherType = 'AetherBoolean'
  z.ZodBoolean.prototype.example = function (value: boolean) {
    this.exampleValue = value
    return this
  }
  z.ZodBoolean.prototype.eg = z.ZodBoolean.prototype.example
  z.ZodBoolean.prototype.ex = z.ZodBoolean.prototype.example
  z.ZodBoolean.prototype.introspect = function () {
    return introspectField(this)
  }
}

const bln = z.boolean().optional().default(true).describe('a boolean').eg(true)
type bln = z.infer<typeof bln>
console.log({ blnDef: bln.introspect() })

/* --- Advanced -------------------------------------------------------------------------------- */

if (!z.ZodDate.prototype.aetherType) {
  z.ZodDate.prototype.aetherType = 'AetherDate'
  z.ZodDate.prototype.example = function (value: Date) {
    this.exampleValue = value
    return this
  }
  z.ZodDate.prototype.eg = z.ZodDate.prototype.example
  z.ZodDate.prototype.ex = z.ZodDate.prototype.example
  z.ZodDate.prototype.introspect = function () {
    this.schema = {}
    if (this.minDate) this.schema.minDate = this.minDate
    if (this.maxDate) this.schema.maxDate = this.maxDate
    return introspectField(this)
  }
}

const date = z.date().optional().default(new Date()).describe('a date').eg(new Date())
type date = z.infer<typeof date>
console.log({ dateDef: date.introspect() })

if (!z.ZodEnum.prototype.aetherType) {
  z.ZodEnum.prototype.aetherType = 'AetherEnum'
  z.ZodEnum.prototype.example = function (value: string) {
    this.exampleValue = value
    return this
  }
  z.ZodEnum.prototype.eg = z.ZodEnum.prototype.example
  z.ZodEnum.prototype.ex = z.ZodEnum.prototype.example
  z.ZodEnum.prototype.introspect = function () {
    this.schema = this._def.values.reduce(
      (acc, value) => ({ ...acc, [value]: value }),
      {} as Record<string, string>
    )
    return introspectField(this)
  }
}

const enumDef = z.enum(['a', 'b', 'c']).optional().default('a').describe('an enum').eg('b')
type enumDef = z.infer<typeof enumDef>
console.log({ enumDef: enumDef.introspect() })

if (!z.ZodTuple.prototype.aetherType) {
  z.ZodTuple.prototype.aetherType = 'AetherTuple'
  z.ZodTuple.prototype.example = function (value: any[]) {
    this.exampleValue = value
    return this
  }
  z.ZodTuple.prototype.eg = z.ZodTuple.prototype.example
  z.ZodTuple.prototype.ex = z.ZodTuple.prototype.example
  z.ZodTuple.prototype.introspect = function () {
    const innerItems = this.items.map((item) => item?.introspect())
    this.schema = innerItems
    return introspectField(this)
  }
}

const tuple = z.tuple([z.string(), z.number()]).optional().default(['a', 1]).describe('a tuple').eg(['b', 2]) // prettier-ignore
type tuple = z.infer<typeof tuple>
console.log({ tupleDef: tuple.introspect() })

if (!z.ZodUnion.prototype.aetherType) {
  z.ZodUnion.prototype.aetherType = 'AetherUnion'
  z.ZodUnion.prototype.example = function (value: any) {
    this.exampleValue = value
    return this
  }
  z.ZodUnion.prototype.eg = z.ZodUnion.prototype.example
  z.ZodUnion.prototype.ex = z.ZodUnion.prototype.example
  z.ZodUnion.prototype.introspect = function () {
    return introspectField(this)
  }
}

const union = z.union([z.string(), z.number()]).optional().default('a').describe('a union').eg(1)
type union = z.infer<typeof union>
console.log({ unionDef: union.introspect() })

if (!z.ZodArray.prototype.aetherType) {
  z.ZodArray.prototype.aetherType = 'AetherArray'
  z.ZodArray.prototype.example = function (value: any[]) {
    this.exampleValue = value
    return this
  }
  z.ZodArray.prototype.eg = z.ZodArray.prototype.example
  z.ZodArray.prototype.ex = z.ZodArray.prototype.example
  z.ZodArray.prototype.introspect = function () {
    const innerSchema = getInnerMostType(this)?.element?.introspect?.()
    if (innerSchema) this.schema = innerSchema
    return introspectField(this)
  }
}

const array = z.array(z.string()).optional().default(['a', 'b']).describe('an array').eg(['c', 'd'])
type array = z.infer<typeof array>
console.log({ arrayDef: array.introspect() })

// TODO: Replace this
/** --- parseType() ---------------------------------------------------------------------------- */
/** -i- Add correct fields like type & aetherType while converting a JSON schema prop definition to aetherspace prop definition. */
const parseType = (propDef: JSONSchema7, propSchema: Record<string, unknown> = {}) => {
  // @ts-ignore
  const { type: propType, enum: propEnum, description, anyOf } = propDef
  if (Array.isArray(propType)) {
    propSchema.isNullable = propType.includes('null')
    const leftoverType = propType.filter((type: string) => type !== 'null')[0]
    propSchema.aetherType = TYPE_TO_ATS[leftoverType]
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
    propSchema.aetherType = TYPE_TO_ATS[propType!]
    propSchema.type = propType
  }
  // Return
  return propSchema
}

// TODO: Replace this
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

// TODO: Replace this
/** --- parseSchema() -------------------------------------------------------------------------- */
/** -i- Convert a JSON schema object to an aetherspace compatible schema */
const parseSchema = (schema: JSONSchema7) => {
  // @ts-ignore
  const { type, description, properties, required = [] } = schema
  // Do nothing when not an object
  if (type !== 'object') return {} as Partial<AetherSchemaType>
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
  return resultSchema as AetherSchemaType
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
  // Allow examples
  z.ZodObject.prototype.example = function (value: any) {
    this.exampleValue = value
    return this
  }
  z.ZodObject.prototype.eg = z.ZodObject.prototype.example
  z.ZodObject.prototype.ex = z.ZodObject.prototype.example
  // Documentation
  z.ZodObject.prototype.jsonSchema = function () {
    return zodToJsonSchema(this) as JSONSchema7
  }
  z.ZodObject.prototype.introspect = function () {
    return parseSchema(this.jsonSchema()) as AetherSchemaType
  }
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

/* --- Tests ----------------------------------------------------------------------------------- */

const testSchema = aetherSchema('TestSchema', {
  union: z.tuple([z.string(), z.number()]),
})
type testSchema = z.infer<typeof testSchema>
console.log('testSchema', JSON.stringify(testSchema.introspect(), null, 2))
console.log('testProp', JSON.stringify(testSchema.shape.union.introspect(), null, 2))
