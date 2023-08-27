import { z, aetherSchema } from '../schemas'

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
    // - Primitives -
    string: z.string().default('some-string').describe('A string'),
    number: z.number().default(0).describe('A number'),
    boolean: z.boolean().default(false).describe('A boolean'),
    date: z.date().default(new Date()).describe('A date'),
    // - String Variants -
    id: z.string().id().default('some-id').describe('An ID'),
    color: z.string().color().default('#000000').describe('A color'),
    // - Advanced Single Values -
    enum: z.enum(['A', 'B']).default('A').describe('An enum'),
    union: z.union([z.string(), z.number()]).default('some-string').describe('A union'),
    // - Arraylikes -
    array: z.array(z.string()).default(['some-string']).describe('An array'),
    tuple: z.tuple([z.string(), z.number()]).default(['some-string', 0]).describe('A tuple'),
    // - Objectlikes -
    object: z.object({ str: z.string() }).default({ str: 'some-string' }).describe('An object'),
    // - Collections -
    collection: z.array(z.object({ str: z.string() })).default([{ str: 'some-string' }]).describe('A collection'), // prettier-ignore
})

type ComparedSchemaType = z.infer<typeof ComparedSchema>

const zodJSON = ComparedSchema.introspect()

console.log('--- ZOD ---\n', JSON.stringify(zodJSON, null, 4))

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
