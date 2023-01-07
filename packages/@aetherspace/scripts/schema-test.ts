import { aetherSchema } from '../schemas'
import { z } from 'zod'

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
