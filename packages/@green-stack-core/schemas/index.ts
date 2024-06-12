import { z, ZodObject, ZodType } from 'zod'

/* --- Constants ------------------------------------------------------------------------------- */

export const BASE_TYPE_MAP = {
    // - Primitives -
    ZodString: 'String',
    ZodNumber: 'Number',
    ZodBoolean: 'Boolean',
    ZodDate: 'Date',
    // - Advanced & Objectlikes -
    ZodEnum: 'String',
    ZodArray: 'Array',
    ZodObject: 'Object',
    // - Mostly Supported, Experimental -
    ZodNull: 'Null', // Serialised as null
    ZodUndefined: 'Undefined', // Omitted unless combined
    ZodTuple: 'Any', // Serialised as JSON
    ZodUnion: 'Any', // Serialised as JSON
    ZodLiteral: 'Any', // We'll attempt to narrow down based on literal value, serialised as JSON as fallback
    ZodNativeEnum: 'Any', // Technically 'String' or 'Number', but we can't really know which one
    // - Might Work, Not Advised -
    ZodAny: 'Any', // Unpredictable, serialised as JSON
    ZodRecord: 'Object', // Cannot be used for GraphQL as we don't know the possible keys
    ZodUnknown: 'Any', // Serialised as JSON, can break if value is not JSON serializable
    ZodBigInt: 'Number', // Cannot be JSON serialized, use at own risk
    ZodSymbol: 'String', // Very experimental
    ZodIntersection: 'Any', // Unsure how to handle, will attempt to serialize as JSON
    ZodDiscriminatedUnion: 'Any', // Technically 'Object', unpredictable, serialised as JSON
    ZodMap: 'Any', // Technically 'Object', but JSON serialization is tricky
    ZodSet: 'Array', // Technically 'Array', but JSON serialization is tricky
    // - Unsupported, Avoid in Schemas -
    ZodVoid: 'Undefined', // Not sure when or where you'd use this outside of functions
    ZodFunction: 'Function', // Cannot be JSON serialized
    ZodPromise: 'Promise', // Cannot be JSON serialized
    ZodLazy: 'Any', // Unsure how to handle, attempted to serialize as JSON
    ZodEffects: 'Any', // Unsure how to handle, attempted to serialize as JSON
} as const

/* --- Types ----------------------------------------------------------------------------------- */

export type ZOD_TYPE = keyof typeof BASE_TYPE_MAP
export type BASE_TYPE = typeof BASE_TYPE_MAP[ZOD_TYPE]
export type SCHEMA_TYPE = (ZOD_TYPE | BASE_TYPE) & {}

export type Metadata<S = Record<string, any$Unknown> | any$Unknown[]> = {
    zodType: ZOD_TYPE,
    baseType: BASE_TYPE,
    name?: string,
    isOptional?: boolean,
    isNullable?: boolean,
    defaultValue?: any$Unknown,
    exampleValue?: any$Unknown,
    description?: string,
    minLength?: number,
    maxLength?: number,
    exactLength?: number,
    minValue?: number,
    maxValue?: number,
    isInt?: boolean,
    literalValue?: any$Unknown,
    literalType?: 'string' | 'boolean' | 'number',
    literalBase?: BASE_TYPE,
    schema?: S,
    // only included when calling with .introspect(true)
    zodStruct?: z.ZodType & { _def: z.ZodTypeDef & { typeName: ZOD_TYPE } }, 
}

export type Meta$Schema = Metadata<Record<string, Metadata>>
export type Meta$Tuple = Metadata<Metadata[]>
export type Meta$Union = Metadata<Metadata[]>
export type Meta$Intersection = Metadata<{ left: Metadata, right: Metadata }>

type StackedMeta = Metadata & {
    zodStruct?: z.ZodType & { _def: z.ZodTypeDef & { typeName: ZOD_TYPE } },
}

export type ZodSchema<S extends z.ZodRawShape = z.ZodRawShape> = z.ZodObject<S>
    | z.ZodNullable<z.ZodObject<S>>
    | z.ZodOptional<z.ZodObject<S>>
    | z.ZodDefault<z.ZodObject<S>>
    | z.ZodNullable<z.ZodOptional<z.ZodObject<S>>>
    | z.ZodNullable<z.ZodDefault<z.ZodObject<S>>>
    | z.ZodOptional<z.ZodNullable<z.ZodObject<S>>>
    | z.ZodOptional<z.ZodDefault<z.ZodObject<S>>>
    | z.ZodDefault<z.ZodNullable<z.ZodObject<S>>>
    | z.ZodDefault<z.ZodOptional<z.ZodObject<S>>>

/* --- Zod extensions -------------------------------------------------------------------------- */

declare module 'zod' {
    interface ZodType {
        metadata(): Record<string, any>,
        addMeta(meta: Record<string, any>): this
        example<T extends this['_type']>(exampleValue: T): this
        eg<T extends this['_type']>(exampleValue: T): this
        ex<T extends this['_type']>(exampleValue: T): this
        introspect(includeZodStruct?: boolean): Meta$Schema & Record<string, any>
    }

    interface ZodObject<
        T extends z.ZodRawShape,
        UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam,
        Catchall extends z.ZodTypeAny = z.ZodTypeAny,
        Output = z.objectOutputType<T, Catchall, UnknownKeys>,
        Input = z.objectInputType<T, Catchall, UnknownKeys>
    > {
        nameSchema(name: string): this
        extendSchema<S extends z.ZodRawShape>(name: string, shape: S): ZodObject<T & S, UnknownKeys, Catchall>
        pickSchema<Mask extends z.util.Exactly<{ [k in keyof T]?: true; }, Mask>>(
            schemaName: string,
            mask: Mask
        ): z.ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>
        omitSchema<Mask extends z.util.Exactly<{ [k in keyof T]?: true; }, Mask>>(
            schemaName: string,
            mask: Mask
        ): z.ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>
        applyDefaults<D extends Record<string, unknown> = Record<string, unknown>>(
            data: D,
            logErrors?: boolean
        ): D & Output
    }
}

// -i- Apply extensions if not added yet

if (!ZodType.prototype.metadata) {

    ZodType.prototype.metadata = function () {
        return this._def.metadata || {}
    }

    ZodType.prototype.addMeta = function (meta: Record<string, any>) {
        const This = (this as any).constructor
        return new This({
            ...this._def,
            metadata: { ...this._def.metadata, ...meta }
        })
    }

    ZodType.prototype.example = function (exampleValue) {
        return this.addMeta({ exampleValue })
    }
    ZodType.prototype.eg = ZodType.prototype.example
    ZodType.prototype.ex = ZodType.prototype.example

    const getStackedMeta = <Z extends z.ZodTypeAny>(
        zodStruct: Z,
        stackedMeta = [] as StackedMeta[],
        includeZodStruct = false
    ): StackedMeta[] => {
        // Start with actual metadata
        const meta = { ...zodStruct.metadata() }
        // Include the type in the stack, we'll remove it again later
        meta.zodStruct = zodStruct
        const zodType = zodStruct._def.typeName
        // Check optionality
        if (zodType === 'ZodOptional') meta.isOptional = true
        if (zodType === 'ZodDefault') meta.isOptional = true
        if (zodType === 'ZodNullable') meta.isNullable = true
        // Figure out the default & example values if there are any
        if (zodStruct._def.defaultValue) meta.defaultValue = zodStruct._def.defaultValue()
        if (meta.defaultValue instanceof Set) meta.defaultValue = Array.from(meta.defaultValue)
        if (meta.exampleValue instanceof Set) meta.exampleValue = Array.from(meta.exampleValue)
        if (meta.defaultValue instanceof Map) meta.defaultValue = Object.fromEntries(meta.defaultValue)
        if (meta.exampleValue instanceof Map) meta.exampleValue = Object.fromEntries(meta.exampleValue)
        // Add the description if there is one
        if (zodStruct._def.description) meta.description = zodStruct._def.description
        // Add array metadata if present
        if (zodStruct._def.minLength) meta.minLength = zodStruct._def.minLength.value
        if (zodStruct._def.maxLength) meta.maxLength = zodStruct._def.maxLength.value
        if (zodStruct._def.exactLength) meta.exactLength = zodStruct._def.exactLength.value
        // Add string metadata if present
        const stringType = zodStruct as unknown as z.ZodString
        if (stringType.minLength) meta.minLength = stringType.minLength
        if (stringType.maxLength) meta.maxLength = stringType.maxLength
        // Add number metadata if present
        const numberType = zodStruct as unknown as z.ZodNumber
        if (numberType.minValue) meta.minValue = numberType.minValue
        if (numberType.maxValue) meta.maxValue = numberType.maxValue
        if (numberType.isInt) meta.isInt = numberType.isInt
        // Literals
        if (zodType === 'ZodLiteral') {
            const _zodLiteral = zodStruct as unknown as z.ZodLiteral<any>
            meta.literalValue = _zodLiteral.value
            meta.literalType = typeof meta.literalValue
            if (typeof meta.literalValue === 'string') meta.baseType = 'String'
            if (typeof meta.literalValue === 'number') meta.baseType = 'Number'
            if (typeof meta.literalValue === 'boolean') meta.baseType = 'Boolean'
            meta.literalBase = meta.baseType
        }
        // Enums
        if (zodType === 'ZodEnum') {
            const _zodEnum = zodStruct as unknown as z.ZodEnum<any>
            meta.schema = _zodEnum.options?.reduce((acc: Record<string, unknown>, value: any) => {
                return { ...acc, [value]: value }
            }, {})
        }
        // Tuples
        if (zodType === 'ZodTuple') {
            const _zodTuple = zodStruct as unknown as z.ZodTuple<any>
            meta.schema = _zodTuple.items.map((item: any) => item.introspect?.(includeZodStruct)).filter(Boolean)
        }
        // Unions
        if (zodType === 'ZodUnion') {
            const _zodUnion = zodStruct as unknown as z.ZodUnion<any>
            meta.schema = _zodUnion.options.map((option: any) => option.introspect?.(includeZodStruct)).filter(Boolean)
        }
        // Intersections
        if (zodType === 'ZodIntersection') {
            const _zodIntersection = zodStruct as unknown as z.ZodIntersection<any, any>
            meta.schema = {
                left: _zodIntersection._def.left.introspect?.(includeZodStruct),
                right: _zodIntersection._def.right.introspect?.(includeZodStruct),
            }
        }
        // Discriminated Unions
        if (zodType === 'ZodDiscriminatedUnion') {
            const _zodUnion = zodStruct as unknown as z.ZodDiscriminatedUnion<any, any>
            meta.schema = _zodUnion.options.reduce((acc: any, option: any) => {
                return { ...acc, types: [...acc.types, option.introspect?.(includeZodStruct)] }
            }, { discriminator: _zodUnion._def.discriminator, types: [] })
        }
        // Arrays
        if (zodType === 'ZodArray') {
            const _zodArray = zodStruct as unknown as z.ZodArray<any>
            meta.schema = _zodArray._def.type.introspect?.(includeZodStruct)
        }
        // Schemas & Objects
        if (zodType === 'ZodObject') {
            const _zodObject = zodStruct as unknown as z.ZodObject<any>
            meta.schema = Object.entries(_zodObject.shape).reduce((acc, [key, fieldType]) => {
                // @ts-ignore
                return { ...acc, [key]: fieldType.introspect?.(includeZodStruct) }
            }, {})
        }
        // Records
        if (zodType === 'ZodRecord') {
            const _zodRecord = zodStruct as unknown as z.ZodRecord<any>
            meta.schema = _zodRecord._def.valueType.introspect?.(includeZodStruct)
        }
        // Sets
        if (zodType === 'ZodSet') {
            const _zodSet = zodStruct as unknown as z.ZodSet<any>
            meta.schema = _zodSet._def.valueType.introspect?.(includeZodStruct)
        }
        // Maps
        if (zodType === 'ZodMap') {
            const _zodMap = zodStruct as unknown as z.ZodMap<any, any>
            meta.schema = {
                key: _zodMap._def.keyType.introspect?.(includeZodStruct),
                value: _zodMap._def.valueType.introspect?.(includeZodStruct),
            }
        }
        // Functions
        if (zodType === 'ZodFunction') {
            const _zodFunction = zodStruct as unknown as z.ZodFunction<any, any>
            meta.schema = {
                input: _zodFunction._def.args.introspect?.(includeZodStruct),
                output: _zodFunction._def.returns.introspect?.(includeZodStruct),
            }
        }
        // Promises
        if (zodType === 'ZodPromise') {
            const _zodPromise = zodStruct as unknown as z.ZodPromise<any>
            meta.schema = _zodPromise._def.type.introspect?.(includeZodStruct)
        }
        // Add the metadata for the current type
        const currentMetaStack = [...stackedMeta, meta as Metadata]
        // If we've reached the innermost type, end recursion, return all metadata
        if (!zodStruct._def.innerType) return currentMetaStack
        // If there's another inner layer, unwrap it, add to the stack
        return getStackedMeta(zodStruct._def.innerType, currentMetaStack, includeZodStruct)
    }

    ZodType.prototype.introspect = function (includeZodStruct = false) {
        // Figure out nested metadata
        const stackedMeta = getStackedMeta(this, [], includeZodStruct)
        const reversedMeta = [...stackedMeta].reverse()
        const [innermostMeta] = reversedMeta
        const zodType = innermostMeta.zodStruct!._def.typeName as unknown as ZOD_TYPE
        const baseType = BASE_TYPE_MAP[zodType as ZOD_TYPE]
        // Flatten stacked metadata in reverse order
        const flatMeta = reversedMeta.reduce((acc, { zodStruct, ...meta }) => ({
            ...acc,
            ...meta,
            ...(includeZodStruct ? { zodStruct } : {})
        }), {})
        const meta = { ...flatMeta, zodType, baseType }
        // @ts-ignore
        if (meta.literalBase) meta.baseType = meta.literalBase
        // Return all introspected metadata
        return meta
    }

    ZodObject.prototype.nameSchema = function (name: string) {
        return this.addMeta({ name })
    }

    ZodObject.prototype.extendSchema = function (name: string, shape) {
        return this.extend(shape).nameSchema(name)
    }

    ZodObject.prototype.pickSchema = function (schemaName, picks) {
        return this.pick(picks).nameSchema(schemaName)
    }

    ZodObject.prototype.omitSchema = function (schemaName, picks) {
        return this.omit(picks).nameSchema(schemaName)
    }

    ZodObject.prototype.applyDefaults = function (data, logErrors = false) {
        const thisSchema = this.extend({})
        const result = thisSchema.safeParse(data)
        if (!result.success && logErrors) console.warn(JSON.stringify(result.error, null, 2)) // @ts-ignore
        return { ...data, ...result.data } as D & (typeof thisSchema)['_type']
    }
}

/* --- Schema Definitions ---------------------------------------------------------------------- */

export const schema = <S extends z.ZodRawShape>(name: string, shape: S) => {
    return z.object(shape).nameSchema(name)
}

/* --- Reexports ------------------------------------------------------------------------------- */

export { z } from 'zod'
