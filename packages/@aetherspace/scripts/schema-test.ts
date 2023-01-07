import { ats, AetherSchemaType, aetherSchema } from '../schemas'
// import { aetherSchema, makeSchemaDeepPartial, makeSchemaPartial, makeSchemaRequired } from '../schemas/zodSchemas'
import { z } from 'zod'

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.id().optional().default('some-id')
const ids = ats.array(ats.id())
const str = ats.string().nullable().docs('example', 'description')
const day = ats.date().optional().docs('01/01/2022', 'The start of the year')
const num = ats.number().docs(5)
const bln = ats.boolean().optional()
const opt = ats.enum<TEST_ENUM>(Object.values(TEST_ENUM))
const obj = ats.object('StringObject', { str })
const col = ats.array(ats.object('IDObject', { id }))
const coll = ats.collection('IDObject', { id })

// -- Build Original Schema --

const originalSchema = ats.schema('MySchema', {
    id,
    ids,
    str,
    day,
    num,
    bln,
    opt,
    obj,
    col,
    // coll,
})
type OriginalSchemaType = typeof originalSchema['TYPE'] // Hover to preview

// -- Test Utilities --

const omittedSchema = ats.omit('Minimal', originalSchema, ['obj', 'col'])
type OmittedSchemaType = typeof omittedSchema['TYPE']

const extendedSchema = ats.extend('Extended', omittedSchema, {
    extra: ats.string().nullish(),
})
type ExtendedSchemaType = typeof extendedSchema['TYPE'] // Hover to preview

const partialSchema = ats.partial('Partial', extendedSchema)
type PartialSchemaType = typeof partialSchema['TYPE'] // Hover to preview

const pickedSchema = ats.pick('Picked', partialSchema, ['id', 'str', 'day'])
type PickedSchemaType = typeof pickedSchema['TYPE'] // Hover to preview

// -- Test Results --

const finalSchema = originalSchema // pickedSchema // partialSchema // extendedSchema // omittedSchema // originalSchema
type FinalSchemaType = typeof finalSchema['TYPE'] // Hover to preview

console.log('--- ATS ---\n', JSON.stringify(finalSchema, null, 4))
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// /* --- Zod ------------------------------------------------------------------------------------- */

const Primitives = aetherSchema('Primitives', {
    bln: z.boolean().optional().describe('A boolean'),
    str: z.string().optional().nullable().default('default').describe('A string'),
    num: z.number().optional().nullable().default(0).describe('A number'),
})

const Advanced = Primitives.extendSchema('Advanced', {
    enum: z.enum(['A', 'B']).nullish().describe('An enum'),
    ids: z.array(z.string()).optional().nullable().describe('An array of IDs'),
    tuple: z.tuple([z.string(), z.number()]),
})

const Todo = aetherSchema('Todo', {
    id: z.string().default('some-todo-id').describe('The ID of the Todo'),
    status: z.enum(['active', 'completed']).default('active').describe('The status of the Todo'),
})

const ExtendedTodos = Advanced.extendSchema('ExtendedTodos', {
    mainTodo: Todo,
    todos: z.array(Todo).describe('An array of Todos'),
    amount: z.number().min(0).max(10).int().describe('Amount of todos'),
})

const PartialTodos = ExtendedTodos.partialSchema('PartialTodos')
const DeepPartialTodos = ExtendedTodos.deepPartialSchema('DeepPartialTodos')
const RequiredTodos = ExtendedTodos.requiredSchema('RequiredTodos')

const PickedTodos = ExtendedTodos.pickSchema('PickedTodos', { mainTodo: true, amount: true, todos: true })
const OmittedTodos = ExtendedTodos.omitSchema('OmittedTodos', { mainTodo: true, amount: true, todos: true })

type PrimitivesTypes = z.infer<typeof Primitives>
type AdvancedTypes = z.infer<typeof Advanced>
type TodoTypes = z.infer<typeof Todo>
type ExtendedTodosTypes = z.infer<typeof ExtendedTodos>
type PartialTodosTypes = z.infer<typeof PartialTodos>
type DeepPartialTodosTypes = z.infer<typeof DeepPartialTodos>
type RequiredTodosTypes = z.infer<typeof RequiredTodos>
type PickedTodosTypes = z.infer<typeof PickedTodos>
type OmittedTodosTypes = z.infer<typeof OmittedTodos>

const ComparedSchema = aetherSchema('ComparedSchema', {
    id: z.string().default('some-id').describe('An ID'),
    ids: z.array(z.string()).describe('A list of IDs'),
    str: z.string().nullable().describe('A string'),
    day: z.date().optional().describe('A date'),
    num: z.number().describe('A number'),
    bln: z.boolean().optional().describe('A boolean'),
    opt: z.enum(['A', 'B']).describe('An enum'),
    obj: aetherSchema('StringObject', {
        str: z.string().nullable().describe('A string'),
    }),
    col: z.array(aetherSchema('IDObject', {
        id: z.string().describe('An ID'),
    }))
})

type ComparedSchemaType = z.infer<typeof ComparedSchema>

const zodJSON = ComparedSchema.introspect()

console.log('--- ZOD ---\n', JSON.stringify(zodJSON, null, 4))

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
