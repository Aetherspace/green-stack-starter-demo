import { expect, test } from 'bun:test'
import { z, schema, Metadata } from './index'

/* --- Schema Essentials ----------------------------------------------------------------------- */

const User = schema('User', {
    name: z.string(),
    age: z.number(),
})

test("Schemas can be introspected", () => {
    expect(User.introspect).toBeInstanceOf(Function)
    expect(User.introspect()).toEqual({
        name: 'User',
        typeName: 'ZodObject',
        baseType: 'Object',
        schema: {
            name: { typeName: 'ZodString', baseType: 'String' },
            age: { typeName: 'ZodNumber', baseType: 'Number' },
        },
    })
})

test("Schemas can be named and renamed", () => {
    expect(User.introspect().name).toBe('User')
    const User2 = User.nameSchema('User2')
    expect(User2.introspect().name).toBe('User2')
    expect(User.introspect().name).toBe('User')
})

const Primitives = schema('Primitives', {
    str: z.string().min(1).max(10).nullish().default('Hello').example('World').describe('somestring'),
    num: z.number().min(1).max(50).default(1).example(42).describe('Number'),
    bln: z.boolean().default(false).example(true).describe('Boolean'),
    date: z.date().default(new Date('2024-01-01')).example(new Date('2020-01-01')).describe('Date'),
})

test("Optionality, defaults & example values persist in schema introspection", () => {
    const metadata = Primitives.introspect() as Metadata<Record<string, Metadata>>
    // Optionality
    expect(metadata.schema?.str.isOptional).toEqual(true)
    expect(metadata.schema?.str.isNullable).toEqual(true)
    expect(metadata.schema?.num.isOptional).toEqual(true) // Default makes it optional
    expect(metadata.schema?.num.isNullable).toBeFalsy()
    expect(metadata.schema?.bln.isOptional).toEqual(true)
    expect(metadata.schema?.bln.isNullable).toBeFalsy()
    // Default Values
    expect(metadata.schema?.str.defaultValue).toEqual('Hello')
    expect(metadata.schema?.num.defaultValue).toEqual(1)
    expect(metadata.schema?.bln.defaultValue).toEqual(false)
    expect(metadata.schema?.date.defaultValue).toEqual(new Date('2024-01-01'))
    // Examples
    expect(metadata.schema?.str.exampleValue).toEqual('World')
    expect(metadata.schema?.num.exampleValue).toEqual(42)
    expect(metadata.schema?.bln.exampleValue).toEqual(true)
    expect(metadata.schema?.date.exampleValue).toEqual(new Date('2020-01-01'))
})

test("Descriptions persist in introspection, no matter where they're defined", () => {
    const DescriptionTest = schema('DescriptionTest', {
        str: z.coerce.string().describe('Some string').nullish(),
        num: z.coerce.number().default(1).describe('Some number'),
        bln: z.coerce.boolean().example(true).describe('Some boolean').optional(),
        date: z.coerce.date().describe('Some date').nullable(),
    })
    const metadata = DescriptionTest.introspect() as Metadata<Record<string, Metadata>>
    expect(metadata.schema?.str.description).toEqual('Some string')
    expect(metadata.schema?.num.description).toEqual('Some number')
    expect(metadata.schema?.bln.description).toEqual('Some boolean')
    expect(metadata.schema?.date.description).toEqual('Some date')
})

/* --- Primitives ------------------------------------------------------------------------------ */

test("Primitives z.string(), z.number(), z.boolean() & z.date() work as expected", () => {
    const metadata = Primitives.introspect() as Metadata<Record<string, Metadata>>
    // Base Types
    expect(metadata.schema?.str.baseType).toEqual('String')
    expect(metadata.schema?.num.baseType).toEqual('Number')
    expect(metadata.schema?.bln.baseType).toEqual('Boolean')
    expect(metadata.schema?.date.baseType).toEqual('Date')
    // Type Names
    expect(metadata.schema?.str.typeName).toEqual('ZodString')
    expect(metadata.schema?.num.typeName).toEqual('ZodNumber')
    expect(metadata.schema?.bln.typeName).toEqual('ZodBoolean')
    expect(metadata.schema?.date.typeName).toEqual('ZodDate')
    // Min / Max
    expect(metadata.schema?.str.minLength).toEqual(1)
    expect(metadata.schema?.str.maxLength).toEqual(10)
    expect(metadata.schema?.num.minValue).toEqual(1)
    expect(metadata.schema?.num.maxValue).toEqual(50)
    // Parsing Happy Paths
    expect(Primitives.shape.str.parse('Hello')).toEqual('Hello')
    expect(Primitives.shape.num.parse(42)).toEqual(42)
    expect(Primitives.shape.bln.parse(true)).toEqual(true)
    expect(Primitives.shape.date.parse(new Date('2020-01-01'))).toEqual(new Date('2020-01-01'))
    // Parsing Unhappy Paths
    expect(() => Primitives.shape.str.parse('')).toThrow() // Too short
    expect(() => Primitives.shape.str.parse('Hello World!')).toThrow() // Too long
    expect(() => Primitives.shape.num.parse("0")).toThrow() // Too low, wrong type
    expect(() => Primitives.shape.num.parse(51)).toThrow() // Too high
})

/* --- Advanced Types -------------------------------------------------------------------------- */

const AdvancedTypes = schema('AdvancedTypes', {
    enum: z.enum(['A', 'B', 'C']).default('A').example('B'),
    tuple: z.tuple([z.string(), z.number()]).default(['hello', 42]).example(['world', 24]),
    union: z.union([z.string(), z.number()]).default('hello').example(42),
    array: z.array(z.string()).min(0).max(5).length(1).default([]).example(['world']),
})

test("Advanced types z.enum(), z.tuple(), z.union() & z.array() work as expected", () => {
    const metadata = AdvancedTypes.introspect() as Metadata<Record<string, Metadata>>
    // Base Types
    expect(metadata.schema?.enum.baseType).toEqual('String')
    expect(metadata.schema?.tuple.baseType).toEqual('Any') // Experimental support, serialized as JSON
    expect(metadata.schema?.union.baseType).toEqual('Any') // String | Number, serialized as JSON
    expect(metadata.schema?.array.baseType).toEqual('Array')
    // Type Names
    expect(metadata.schema?.enum.typeName).toEqual('ZodEnum')
    expect(metadata.schema?.tuple.typeName).toEqual('ZodTuple')
    expect(metadata.schema?.union.typeName).toEqual('ZodUnion')
    expect(metadata.schema?.array.typeName).toEqual('ZodArray')
    // Enums
    expect(metadata.schema?.enum.schema).toEqual({
        A: 'A',
        B: 'B',
        C: 'C',
    })
    // Tuples
    expect(metadata.schema?.tuple.schema).toEqual([
        { typeName: 'ZodString', baseType: 'String' },
        { typeName: 'ZodNumber', baseType: 'Number' },
    ])
    // Unions
    expect(metadata.schema?.union.schema).toEqual([
        { typeName: 'ZodString', baseType: 'String' },
        { typeName: 'ZodNumber', baseType: 'Number' },
    ])
    // Array
    expect(metadata.schema?.array.schema).toEqual({ typeName: 'ZodString', baseType: 'String' })
    expect(metadata.schema?.array.minLength).toEqual(0)
    expect(metadata.schema?.array.maxLength).toEqual(5)
    // Parsing Happy Paths
    expect(AdvancedTypes.shape.enum.parse('B')).toEqual('B')
    expect(AdvancedTypes.shape.tuple.parse(['world', 24])).toEqual(['world', 24])
    expect(AdvancedTypes.shape.union.parse(42)).toEqual(42)
    expect(AdvancedTypes.shape.array.parse(['world'])).toEqual(['world'])
    // Parsing Unhappy Paths
    expect(() => AdvancedTypes.shape.enum.parse('D')).toThrow() // Not in enum
    expect(() => AdvancedTypes.shape.tuple.parse(['world', '24'])).toThrow() // Wrong type
    expect(() => AdvancedTypes.shape.union.parse(false)).toThrow() // Wrong type
    expect(() => AdvancedTypes.shape.array.parse(['world', '24'])).toThrow() // Too long
})

/* --- Derived Schemas ------------------------------------------------------------------------- */

test("Deriving schemas with .extendSchema(), .omitSchema(), .pickSchema() work as expected", () => {
    // Extend 
    const Extended = Primitives.extendSchema('Extended', {
        newField: z.string().default('Hello'),
    })
    expect(Extended.introspect().name).toBe('Extended')
    expect(Extended.introspect().schema).toHaveProperty('newField')
    expect(Extended.parse({ newField: 'World' })).toEqual({
        newField: 'World',
        str: 'Hello',
        num: 1,
        bln: false,
        date: new Date('2024-01-01'),
    })
    // Omit
    const Omitted = Primitives.omitSchema('Omitted', { str: true })
    expect(Omitted.introspect().name).toBe('Omitted')
    expect(Omitted.introspect().schema).not.toHaveProperty('str')
    expect(Omitted.parse({ num: 42 })).toEqual({
        num: 42,
        bln: false,
        date: new Date('2024-01-01'),
    })
    // Pick
    const Picked = Primitives.pickSchema('Picked', { str: true })
    expect(Picked.introspect().name).toBe('Picked')
    expect(Picked.introspect().schema).toHaveProperty('str')
    expect(Picked.introspect().schema).not.toHaveProperty('num')
    expect(Picked.parse({ str: 'World' })).toEqual({
        str: 'World',
    })
})

/* --- Nested Schemas -------------------------------------------------------------------------- */

const Nested = schema('Nested', {
    user: User,
    primitives: Primitives,
    advanced: AdvancedTypes,
})

test("Nested schemas work as expected", () => {
    const metadata = Nested.introspect() as Metadata<Record<string, Metadata>>
    // Nested Schemas
    expect(metadata.schema?.user.typeName).toEqual('ZodObject')
    expect(metadata.schema?.primitives.typeName).toEqual('ZodObject')
    expect(metadata.schema?.advanced.typeName).toEqual('ZodObject')
    // Parsing Happy Paths
    expect(Nested.shape.user.parse({ name: 'John', age: 42 })).toEqual({ name: 'John', age: 42 })
    expect(Nested.shape.primitives.parse({ str: 'Hello', num: 42, bln: true, date: new Date('2020-01-01') })).toEqual({
        str: 'Hello',
        num: 42,
        bln: true,
        date: new Date('2020-01-01'),
    })
    expect(Nested.shape.advanced.parse({ enum: 'B', tuple: ['world', 24], union: 42, array: ['world'] })).toEqual({
        enum: 'B',
        tuple: ['world', 24],
        union: 42,
        array: ['world'],
    })
})

