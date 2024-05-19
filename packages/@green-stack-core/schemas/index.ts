import { z, ZodObject, ZodType } from 'zod'

/* --- Types ----------------------------------------------------------------------------------- */

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

export type ZOD_TYPE = keyof typeof BASE_TYPE_MAP
export type BASE_TYPE = typeof BASE_TYPE_MAP[ZOD_TYPE]
export type SCHEMA_TYPE = (ZOD_TYPE | BASE_TYPE) & {}

export type Metadata<S = Record<string, any> | any[]> = {
    typeName: ZOD_TYPE,
    baseType: BASE_TYPE,
    schemaName?: string,
    isOptional?: boolean,
    isNullable?: boolean,
    defaultValue?: any,
    exampleValue?: any,
    description?: string,
    minLength?: number,
    maxLength?: number,
    exactLength?: number,
    minValue?: number,
    maxValue?: number,
    isInt?: boolean,
    literalValue?: any,
    schema?: S,
}

type StackedMeta = Metadata & {
    zodType?: z.ZodType & { _def: z.ZodTypeDef & { typeName: ZOD_TYPE } },
}

/* --- Zod extensions -------------------------------------------------------------------------- */

declare module 'zod' {
    interface ZodType {
        metadata(): Record<string, any>,
        addMeta(meta: Record<string, any>): this
        example<T extends this['_type']>(exampleValue: T): this
        eg<T extends this['_type']>(exampleValue: T): this
        ex<T extends this['_type']>(exampleValue: T): this
        introspect(): Metadata & Record<string, any>
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
        zodType: Z,
        stackedMeta = [] as StackedMeta[]
    ): StackedMeta[] => {
        // Start with actual metadata
        const meta = { ...zodType.metadata() }
        // Include the type in the stack, we'll remove it again later
        meta.zodType = zodType
        const typeName = zodType._def.typeName
        // Check optionality
        if (typeName === 'ZodOptional') meta.isOptional = true
        if (typeName === 'ZodDefault') meta.isOptional = true
        if (typeName === 'ZodNullable') meta.isNullable = true
        // Figure out the default & example values if there are any
        if (zodType._def.defaultValue) meta.defaultValue = zodType._def.defaultValue()
        if (meta.defaultValue instanceof Set) meta.defaultValue = Array.from(meta.defaultValue)
        if (meta.exampleValue instanceof Set) meta.exampleValue = Array.from(meta.exampleValue)
        if (meta.defaultValue instanceof Map) meta.defaultValue = Object.fromEntries(meta.defaultValue)
        if (meta.exampleValue instanceof Map) meta.exampleValue = Object.fromEntries(meta.exampleValue)
        // Add the description if there is one
        if (zodType._def.description) meta.description = zodType._def.description
        // Add array metadata if present
        if (zodType._def.minLength) meta.minLength = zodType._def.minLength.value
        if (zodType._def.maxLength) meta.maxLength = zodType._def.maxLength.value
        if (zodType._def.exactLength) meta.exactLength = zodType._def.exactLength.value
        // Add string metadata if present
        const stringType = zodType as unknown as z.ZodString
        if (stringType.minLength) meta.minLength = stringType.minLength
        if (stringType.maxLength) meta.maxLength = stringType.maxLength
        // Add number metadata if present
        const numberType = zodType as unknown as z.ZodNumber
        if (numberType.minValue) meta.minValue = numberType.minValue
        if (numberType.maxValue) meta.maxValue = numberType.maxValue
        if (numberType.isInt) meta.isInt = numberType.isInt
        // Literals
        if (typeName === 'ZodLiteral') {
            const _zodType = zodType as unknown as z.ZodLiteral<any>
            meta.literalValue = _zodType.value
            if (typeof meta.literalValue === 'string') meta.baseType = 'String'
            if (typeof meta.literalValue === 'number') meta.baseType = 'Number'
            if (typeof meta.literalValue === 'boolean') meta.baseType = 'Boolean'
            if (typeof meta.literalValue === 'object') meta.baseType = 'Object'
            if (meta.literalValue instanceof Date) meta.baseType = 'Date'
            if (Array.isArray(meta.literalValue)) meta.baseType = 'Array'
        }
        // Enums
        if (typeName === 'ZodEnum') {
            const _zodType = zodType as unknown as z.ZodEnum<any>
            meta.schema = _zodType.options?.reduce((acc: Record<string, unknown>, value: any) => {
                return { ...acc, [value]: value }
            }, {})
        }
        // Tuples
        if (typeName === 'ZodTuple') {
            const _zodType = zodType as unknown as z.ZodTuple<any>
            meta.schema = _zodType.items.map((item: any) => item.introspect?.()).filter(Boolean)
        }
        // Unions
        if (typeName === 'ZodUnion') {
            const _zodType = zodType as unknown as z.ZodUnion<any>
            meta.schema = _zodType.options.map((option: any) => option.introspect?.()).filter(Boolean)
        }
        // Intersections
        if (typeName === 'ZodIntersection') {
            const _zodType = zodType as unknown as z.ZodIntersection<any, any>
            meta.schema = {
                left: _zodType._def.left.introspect?.(),
                right: _zodType._def.right.introspect?.(),
            }
        }
        // Discriminated Unions
        if (typeName === 'ZodDiscriminatedUnion') {
            const _zodType = zodType as unknown as z.ZodDiscriminatedUnion<any, any>
            meta.schema = _zodType.options.reduce((acc: any, option: any) => {
                return { ...acc, types: [...acc.types, option.introspect?.()] }
            }, { discriminator: _zodType._def.discriminator, types: [] })
        }
        // Arrays
        if (typeName === 'ZodArray') {
            const _zodType = zodType as unknown as z.ZodArray<any>
            meta.schema = _zodType._def.type.introspect?.()
        }
        // Schemas & Objects
        if (typeName === 'ZodObject') {
            const _zodType = zodType as unknown as z.ZodObject<any>
            meta.schema = Object.entries(_zodType.shape).reduce((acc, [key, fieldType]) => {
                // @ts-ignore
                return { ...acc, [key]: fieldType.introspect?.() }
            }, {})
        }
        // Records
        if (typeName === 'ZodRecord') {
            const _zodType = zodType as unknown as z.ZodRecord<any>
            meta.schema = _zodType._def.valueType.introspect?.()
        }
        // Sets
        if (typeName === 'ZodSet') {
            const _zodType = zodType as unknown as z.ZodSet<any>
            meta.schema = _zodType._def.valueType.introspect?.()
        }
        // Maps
        if (typeName === 'ZodMap') {
            const _zodType = zodType as unknown as z.ZodMap<any, any>
            meta.schema = {
                key: _zodType._def.keyType.introspect?.(),
                value: _zodType._def.valueType.introspect?.(),
            }
        }
        // Functions
        if (typeName === 'ZodFunction') {
            const _zodType = zodType as unknown as z.ZodFunction<any, any>
            meta.schema = {
                input: _zodType._def.args.introspect?.(),
                output: _zodType._def.returns.introspect?.(),
            }
        }
        // Promises
        if (typeName === 'ZodPromise') {
            const _zodType = zodType as unknown as z.ZodPromise<any>
            meta.schema = _zodType._def.type.introspect?.()
        }
        // Add the metadata for the current type
        const currentMetaStack = [...stackedMeta, meta as Metadata]
        // If we've reached the innermost type, end recursion, return all metadata
        if (!zodType._def.innerType) return currentMetaStack
        // If there's another inner layer, unwrap it, add to the stack
        return getStackedMeta(zodType._def.innerType, currentMetaStack)
    }

    ZodType.prototype.introspect = function () {
        // Figure out nested metadata
        const stackedMeta = getStackedMeta(this)
        const reversedMeta = [...stackedMeta].reverse()
        const [innermostMeta] = reversedMeta
        const typeName = innermostMeta.zodType!._def.typeName as unknown as ZOD_TYPE
        const baseType = BASE_TYPE_MAP[typeName as ZOD_TYPE]
        // Flatten stacked metadata in reverse order
        const flatMeta = reversedMeta.reduce((acc, { zodType: _, ...meta }) => ({
            ...acc,
            ...meta,
        }), {})
        // Return all introspected metadata
        const meta = { ...flatMeta, typeName, baseType }
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
