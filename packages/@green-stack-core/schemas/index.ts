import { z, ZodObject, ZodType } from 'zod'
import type { ComponentProps, JSX, JSXElementConstructor } from 'react'

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
    isBase64?: boolean,
    isEmail?: boolean,
    isURL?: boolean,
    isUUID?: boolean,
    isDate?: boolean,
    isDatetime?: boolean,
    isTime?: boolean,
    isIP?: boolean,
    literalValue?: any$Unknown,
    literalType?: 'string' | 'boolean' | 'number',
    literalBase?: BASE_TYPE,
    schema?: S,
    // only included when calling with .introspect(true)
    zodStruct?: z.ZodType & { _def: z.ZodTypeDef & { typeName: ZOD_TYPE } }, 
    // compatibility with other systems like databases & drivers
    isID?: boolean,
    isIndex?: boolean,
    isUnique?: boolean,
    isSparse?: boolean,
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

export type ApplyDefaultsOptions = {
    logErrors?: boolean,
    stripUnknown?: boolean,
    applyExamples?: boolean,
}

export type PropsOf<
    C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any$Unknown>,
    Z extends z.ZodObject<z.ZodRawShape>,
> = ComponentProps<C> & z.input<Z>

export type DocumentationProps<
    T extends Record<string, any$Unknown> = Record<string, any$Unknown>,
> = {
    componentName: string,
    propSchema: z.ZodObject<z.ZodRawShape>,
    propMeta: Record<string, Meta$Schema>,
    previewProps: Record<string, any$Unknown>,
    valueProp?: keyof T | HintedKeys,
    onChangeProp?: keyof T | HintedKeys,
    exampleProps?: Partial<T>,
    previewState?: {
        didMount?: boolean,
        didApplyParams?: boolean,
        didRegister?: boolean,
    }
}

/* --- Zod extensions -------------------------------------------------------------------------- */

declare module 'zod' {
    interface ZodType {
        metadata(): Record<string, any>,
        addMeta(meta: Record<string, any>): this
        index(): this
        unique(): this
        sparse(): this
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

        applyDefaults<
            D extends Partial<Output> & Record<string, any$Unknown>
        >(
            data: D,
            options?: ApplyDefaultsOptions
        ): D & Output

        documentationProps<
            P extends Input = Input,
            N extends string = string,
        >(
            componentName: N,
            config?: Partial<DocumentationProps<Partial<P>>>
        ): {
            componentName: N,
            propSchema: ZodObject<T, UnknownKeys, Catchall>,
            propMeta: Record<string, Meta$Schema>,
            previewProps: Partial<Input>,
        }

        // -- Deprecations --

        /** @deprecated Use `.extendSchema('NewName', { ...shape })` instead */
        extend<S extends z.ZodRawShape>(shape: S): ZodObject<T & S, UnknownKeys, Catchall>

        /** @deprecated Use `.pickSchema('NewName', { ...mask })` instead */
        pick<Mask extends z.util.Exactly<{ [k in keyof T]?: true; }, Mask>>(
            mask: Mask
        ): z.ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>

        /** @deprecated Use `.omitSchema('NewName', { ...mask })` instead */
        omit<Mask extends z.util.Exactly<{ [k in keyof T]?: true; }, Mask>>(
            mask: Mask
        ): z.ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>
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

    ZodType.prototype.index = function () {
        return this.addMeta({ isIndex: true })
    }

    ZodType.prototype.unique = function () {
        return this.addMeta({ isUnique: true, isIndex: true })
    }

    ZodType.prototype.sparse = function () {
        return this.addMeta({ isSparse: true, isIndex: true })
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
        if (stringType.isBase64) meta.isBase64 = true
        if (stringType.isEmail) meta.isEmail = true
        if (stringType.isURL) meta.isURL = true
        if (stringType.isUUID) meta.isUUID = true
        if (stringType.isDate) meta.isDate = true
        if (stringType.isDatetime) meta.isDatetime = true
        if (stringType.isTime) meta.isTime = true
        if (stringType.isIP) meta.isIP = true
        if (meta.isUUID) meta.isID = true
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
            const _inputOptions = zodStruct as unknown as z.ZodEnum<any>
            meta.schema = _inputOptions.options?.reduce((acc: Record<string, unknown>, value: any) => {
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

    ZodObject.prototype.applyDefaults = function <
        D extends Partial<(typeof thisSchema)['_type']> & Record<string, any$Unknown>
    >(
        data: D,
        options: ApplyDefaultsOptions = {},
    ) {
        const { logErrors = false, stripUnknown = false, applyExamples = false } = options
        const thisSchema = this.extend({})
        const result = thisSchema.safeParse(data)
        const introSpectionResult = thisSchema.introspect()
        const defaultValues = Object.keys(introSpectionResult.schema!).reduce((acc, key) => {
            const fieldMeta = introSpectionResult.schema![key] as Metadata
            const defaultValue = applyExamples ? fieldMeta.exampleValue : fieldMeta.defaultValue
            const hasDefault = defaultValue !== undefined
            return hasDefault ? { ...acc, [key]: defaultValue } : acc
        }, {})
        const values = { ...defaultValues, ...data, ...result.data } as (typeof thisSchema)['_type']
        // Log errors if requested
        if (!result.success && logErrors) console.warn(JSON.stringify(result.error, null, 2))
        // Strip unknown keys if requested
        if (stripUnknown) {
            const validKeys = Object.keys(thisSchema.shape)
            const validData = Object.fromEntries(Object.entries(values).filter(([key]) => validKeys.includes(key)))
            return { ...validData } as D & (typeof thisSchema)['_type']
        }
        // @ts-ignore
        return values as D & (typeof thisSchema)['_type']
    }

    ZodObject.prototype.documentationProps = function (
        componentName,
        config = {},
    ) {
        return {
            ...config,
            componentName,
            propSchema: this,
            propMeta: this.introspect().schema as Record<string, Meta$Schema>,
            previewProps: this.applyDefaults(config.exampleProps || {}, { applyExamples: true }),
        }
    }
}

/** --- schema() ------------------------------------------------------------------------------- */
/** -i- Similar to z.object(), but requires a name so it may serve as a single source of truth */
export const schema = <S extends z.ZodRawShape>(name: string, shape: S) => {
    return z.object(shape).nameSchema(name)
}

/** --- inputOptions() --------------------------------------------------------------------------- */
/** -i- Builds a zod enum from a read-only object keys, but ensures you can still use it as an actual enum
 * @example const MyEnum = inputOptions({ key1: 'Some label', key2: '...' })
 * 
 * // 💡 Use .entries to get the original object with keys + labels
 * MyEnum.entries // { key1: 'Some label', key2: '...' }
 * 
 * // 💡 Get auto-completion for the enum values / option keys
 * MyEnum.key1 // => 'key1'
 * MyEnum.enum.key1 // => 'key1' (alternatively)
 * 
 * // 💡 Retrieve list of options as a tuple with the .options property
 * MyEnum.options // => ['key1', 'key2'] */
export const inputOptions = <T extends Readonly<Record<string, string>>>(obj: T) => {
    // Extract the keys from the object
    type K = Exclude<keyof T, number | symbol>
    // Create the enum from the keys only
    const zEnum = z.enum(Object.keys(obj) as [K, ...K[]])
    // Assign the entries to the enum so it can still be used as such
    const reassigned = Object.keys(obj).reduce((acc, key) => {
        return Object.assign(acc, { [key]: obj[key] })
    }, zEnum)
    // Return the enum with the entries
    return Object.assign(reassigned, { entries: obj }) as typeof zEnum & { entries: T } & {
        [K in keyof T]: T[K]
    }
}

/* --- Reexports ------------------------------------------------------------------------------- */

export { z } from 'zod'
