import { z } from 'zod'

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
    schema?: AetherSchemaType[]
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
    schema?: Record<string, AetherSchemaType>
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
    example(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    eg(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    ex(value: z.infer<z.ZodObject<T>>): z.ZodObject<T>
    introspect(): AetherSchemaType
  }
}

/** --- introspectField() ---------------------------------------------------------------------- */
/** -i- parse field info into AetherSchemaType format */
const introspectField = <T extends z.ZodTypeAny>(field: T): AetherSchemaType => {
  const schema = {} as AetherSchemaType
  schema.aetherType = getInnerMostType(field)?.aetherType
  schema.type = field._def.t || ATS_TO_TYPE[schema.aetherType]
  // Check for descriptions
  const description = getInnerProp(field, (zodType) => zodType.description)
  if (description) schema.description = description
  // Check for default value
  const defaultValue = getInnerProp(field, (zodType) => {
    // @ts-ignore
    if (zodType.defaultValue) return zodType.defaultValue
    const parsed = zodType.safeParse(undefined)
    return parsed.success ? parsed.data : undefined
  })
  if (typeof defaultValue !== 'undefined') schema.defaultValue = defaultValue
  // Check for example values
  const exampleValue = getInnerProp(field, (zodType) => zodType.exampleValue)
  if (typeof exampleValue !== 'undefined') schema.exampleValue = exampleValue
  else if (defaultValue) schema.exampleValue = defaultValue
  // @ts-ignore
  const schemaDef = getInnerProp(field, (zodType) => zodType.schema)
  if (schemaDef) schema.schema = schemaDef
  // @ts-ignore
  const schemaName = getInnerProp(field, (zodType) => zodType.schemaName)
  if (schemaName) schema.schemaName = schemaName
  // @ts-ignore
  const extendedFrom = getInnerProp(field, (zodType) => zodType.extendedFrom)
  if (extendedFrom) schema.extendedFrom = extendedFrom
  else if (description && ['AetherSchema', 'AetherObject'].includes(schema.aetherType)) schema.schemaName = description // prettier-ignore
  // Check for optionality
  schema.isNullable = field.isNullable()
  schema.isOptional = field.isOptional()
  // Return full schema definition
  return schema
}

/** --- getInnerMostType() --------------------------------------------------------------------- */
/** -i- Get inner zod type definition from .default(), .nullable() or .optional() wrapped values */
const getInnerMostType = <T extends z.ZodTypeAny>(schema: T) => {
  if (!schema._def.innerType) return schema
  return getInnerMostType(schema._def.innerType)
}

/** --- getInnerProp() ------------------------------------------------------------------------- **/
/** -i- Get first matching property from any of the wrapped or original zod definitions */
const getInnerProp = <T extends z.ZodTypeAny>(schema: T, getPropFn: (schema: T) => unknown) => {
  const result = getPropFn(schema)
  if (result || !schema._def.innerType) return result
  return getInnerProp(schema._def.innerType, getPropFn)
}

/** --- assignAetherContext() ------------------------------------------------------------------ */
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
  if (innerMostType.defaultValue) schema.defaultValue = innerMostType.defaultValue // @ts-ignore
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
    const innerMostType = getInnerMostType(this)
    const innerMostSchema = innerMostType.introspect?.().schema
    assignAetherContext(this, innerMostType)
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
    const innerMostType = getInnerMostType(this)
    const innerMostSchema = innerMostType.introspect?.().schema
    assignAetherContext(this, innerMostType)
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
    const innerMostType = getInnerMostType(this)
    const innerMostSchema = innerMostType.introspect?.().schema
    assignAetherContext(this, innerMostType)
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
    const colorDef = this.min(4).max(9).regex(/^#/)
    colorDef.aetherType = 'AetherColor'
    return colorDef
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

if (!z.ZodUnion.prototype.aetherType) {
  z.ZodUnion.prototype.aetherType = 'AetherUnion'
  z.ZodUnion.prototype.example = function (value: any) {
    this.exampleValue = value
    return this
  }
  z.ZodUnion.prototype.eg = z.ZodUnion.prototype.example
  z.ZodUnion.prototype.ex = z.ZodUnion.prototype.example
  z.ZodUnion.prototype.introspect = function () {
    const innerOptions = this.options.map((option) => option?.introspect())
    this.schema = innerOptions
    return introspectField(this)
  }
}

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
  z.ZodObject.prototype.introspect = function () {
    // Determine the schema for each property
    this.schema = Object.entries(this.shape).reduce((propSchema, [propKey, propDef]) => {
      // @ts-ignore
      if (!propDef.introspect) return propSchema // @ts-ignore
      const schema = propDef.introspect() // @ts-ignore
      if (schema.aetherType === 'AetherSchema') schema.schema = getInnerMostType(propDef).introspect() // prettier-ignore
      return { ...propSchema, [propKey]: schema }
    }, {})
    // Return the full introspected schema
    return introspectField(this)
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
