import { expect, test } from 'bun:test'
import { z, schema } from '../index'
import { createSchemaPlugin } from '../createSchemaPlugin'

const UserSchema = schema('UserSchema', {
  name: z.string(),
  email: z.string(),
  age: z.number(),
  birthdate: z.date(),
})

test("createSchemaPlugin() applies the correct builder pattern for baseTypes", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    Boolean: (schemaKey, fieldMeta) => 'BaseBool',
    String: (schemaKey, fieldMeta) => 'BaseString',
    Number: (schemaKey, fieldMeta) => 'BaseNumber',
    Date: (schemaKey, fieldMeta) => 'BaseDate',
  })
  // Check the result
  expect(testPlugin.name).toBe('BaseString')
  expect(testPlugin.email).toBe('BaseString')
  expect(testPlugin.age).toBe('BaseNumber')
  expect(testPlugin.birthdate).toBe('BaseDate')
})

test("createSchemaPlugin() overrides baseType builders for zodType builders", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    // Least specific: Should be overridden by more specific mappers
    Boolean: (schemaKey, fieldMeta) => 'BaseBool',
    String: (schemaKey, fieldMeta) => 'BaseString',
    Number: (schemaKey, fieldMeta) => 'BaseNumber',
    Date: (schemaKey, fieldMeta) => 'BaseDate',
    // More specific: Should override any generic builder
    ZodBoolean: (schemaKey, fieldMeta) => 'ZodBool',
    ZodString: (schemaKey, fieldMeta) => 'ZodString',
    ZodNumber: (schemaKey, fieldMeta) => 'ZodNumber',
    ZodDate: (schemaKey, fieldMeta) => 'ZodDate',
  })
  // Check the result
  expect(testPlugin.name).toBe('ZodString')
  expect(testPlugin.email).toBe('ZodString')
  expect(testPlugin.age).toBe('ZodNumber')
  expect(testPlugin.birthdate).toBe('ZodDate')
})

test("createSchemaPlugin() overrides zodType builder for schemaKey builders", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    // Least specific: Should be overridden by more specific mappers
    Boolean: (schemaKey, fieldMeta) => 'BaseBool',
    String: (schemaKey, fieldMeta) => 'BaseString',
    // More specific: Should override any generic builder
    ZodNumber: (schemaKey, fieldMeta) => 'ZodNumber',
    ZodDate: (schemaKey, fieldMeta) => 'ZodDate',
    // Most specific: Should override all other builders
    name: (schemaKey, fieldMeta) => 'KeyString',
    email: (schemaKey, fieldMeta) => 'KeyString',
    age: (schemaKey, fieldMeta) => 'KeyNumber',
    birthdate: (schemaKey, fieldMeta) => 'KeyDate',
  })
  // Check the result
  expect(testPlugin.name).toBe('KeyString')
  expect(testPlugin.email).toBe('KeyString')
  expect(testPlugin.age).toBe('KeyNumber')
  expect(testPlugin.birthdate).toBe('KeyDate')
})

test("createSchemaPlugin() skips fields without a builder", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    // Only provide a builder for the 'name' field
    name: (schemaKey, fieldMeta) => 'KeyString',
  })
  // Check the result
  expect(testPlugin.name).toBe('KeyString')
  // All other fields should be skipped
  expect(testPlugin.email).toBe(undefined)
  expect(testPlugin.age).toBe(undefined)
  expect(testPlugin.birthdate).toBe(undefined)
})

test("createSchemaPlugin() builder functions recieve schemaKey as the first arg", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    name: (schemaKey, fieldMeta) => schemaKey,
    email: (schemaKey, fieldMeta) => schemaKey,
    age: (schemaKey, fieldMeta) => schemaKey,
    birthdate: (schemaKey, fieldMeta) => schemaKey,
  })
  // Check the result
  expect(testPlugin.name).toBe('name')
  expect(testPlugin.email).toBe('email')
  expect(testPlugin.age).toBe('age')
  expect(testPlugin.birthdate).toBe('birthdate')
})

test("createSchemaPlugin() builder functions recieve fieldMeta as the second arg", () => {
  // Schema transformer to test
  const testPlugin = createSchemaPlugin(UserSchema, {
    name: (schemaKey, fieldMeta) => JSON.stringify(fieldMeta),
    email: (schemaKey, fieldMeta) => JSON.stringify(fieldMeta),
    age: (schemaKey, fieldMeta) => JSON.stringify(fieldMeta),
    birthdate: (schemaKey, fieldMeta) => JSON.stringify(fieldMeta),
  })
  // Check the result
  expect(testPlugin.name).toBe(JSON.stringify(UserSchema.shape.name.introspect()))
  expect(testPlugin.email).toBe(JSON.stringify(UserSchema.shape.email.introspect()))
  expect(testPlugin.age).toBe(JSON.stringify(UserSchema.shape.age.introspect()))
  expect(testPlugin.birthdate).toBe(JSON.stringify(UserSchema.shape.birthdate.introspect()))
})
