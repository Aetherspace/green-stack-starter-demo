<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

# Schemas as Single Sources of Truth in Aetherspace

```ts
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'
```

A core feature of Aetherspace as a starter template is taking what works and making it better. This is why we invented `aetherSchema()` as a tiny wrapper around `zod.object()`. You can use it to define your datastructures just once for the entire monorepo.

> `zod` is a schema validation library built with Typescript in mind. By extending it with `aetherSchema()`, we can leverage its powerful features to create single sources of truth for GraphQL, API Routes, Database Models and Storybook Docs as well.

<br/>

## Actual 'Single Sources of Truth'

Think about all the code related to the datastructures of your application:

- Typescript types
- Form & data validation
- GraphQL definitions
- Storybook controls
- Database models
- ...

### The problem:

Generally speaking, you never want to define your datastructures more than once. Not only is it redundant and a pain to do, it's also a recipe for disaster.

If you need to change something, you have to remember to change it in all the places. If at any point you forget to do that, then you risk your datastructures getting out of sync. When that happens, it will likely lead to outdated hints or docs at best, and bugs or even crashes at worst.

### The solution:

By leveraging `aetherSchema()` to build out the shape of our data just once, we enable our structure definitions to create more refined definitions for (e.g.) GraphQL and others from them. Essentially meaning we can avoid ever declaring it twice or more.

This is a huge win for maintainability and developer experience, as it avoids the need to keep these sources of truth in sync for all your component props, database models or function args / responses.

## Usage

Let's have a look at how `zod` & `aetherSchema()` definitions translate to Typescript types: 👇

#### Defining Primitives

```ts
const someString = z.string() // string
const someNumber = z.number() // number
const someBoolean = z.boolean() // boolean
```

#### Defining Objects

```ts
const PropSchema = aetherSchema('ComponentProps', {
  title: z.string(),
  description: z.string(),
  isLoading: z.boolean(),
})
```

`type ComponentProps = AetherProps<typeof PropSchema>`

> 💡 Note: `AetherProps` is a type helper to extract the input type from a Zod / Aetherspace schema. It's a neat alternative to Zod's `z.infer` and essentially the same as doing `typeof PropSchema['_input']`

```ts
// {
//     title: string,
//     description: string,
//     isLoading: boolean,
// }
```

#### Advanced Types

```ts
const TopicSchema = aetherSchema('Topic', {
  status: z.enum(['draft', 'published', 'archived']),
  createdOn: z.date(),
  tags: z.array(z.id()),
})
```

`type Topic = z.infer<typeof TopicSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     createdOn: Date,
//     tags: string[],
// }
```

#### Defaults & Optionals

```ts
const ResolverArgsSchema = aetherSchema('ResolverArgs', {
  isNullable: z.boolean().nullable(),
  isNullish: z.boolean().nullish(),
  isOptional: z.boolean().optional(),
  hasDefault: z.boolean().default(true),
})
```

`type ResolverArgs = z.infer<typeof ResolverArgsSchema>`

```ts
// {
//     isNullable: boolean | null,
//     isNullish?: boolean | null | undefined,
//     isOptional?: boolean | undefined,
//     hasDefault: boolean,
// }
```

#### Nested Objects

```ts
const ResponseSchema = aetherSchema('ResolverResponse', {
  id: z.id(),
  metadata: aetherSchema('NestedMetadata', {
    name: z.string(),
    description: z.string().optional(),
  }),
  relatedTopics: z.array(TopicSchema), // See example schema above
})
```

`type ResolverResponse = z.infer<typeof ResponseSchema>`

```ts
// {
//    id: string,
//    metadata: {
//      name: string,
//      description?: string | undefined,
//    },
//    relatedTopics: Topic[],
// }
```

#### Defining Collections

```ts
const Topic = aetherSchema('Topic', {
  status: z.enum(['draft', 'published', 'archived']),
  createdOn: z.date(),
  tags: z.array(z.id()),
})

const CollectionSchema = aetherSchema('TopicsWrapper', {
  topics: z.array(Topic), // Reuse the Topic schema as a way to define the array contents
})
```

> 💡 `z.array(Topic)` means that the array will contain only the earlier defined `Topic` objects. You could also use `z.array(z.object({ ... }))` to define the array contents inline, but that won't be as maintainable / useful when it comes to avoiding double definitions for GraphQL and Storybook.

`type TopicsWrapper = z.infer<typeof CollectionSchema>`

```ts
// {
//    topics: {
//      status: 'draft' | 'published' | 'archived',
//      createdOn: Date,
//      tags: string[],
//    }[],
// }
```

## Documenting with Schemas

Any `z` schema prop can also be chained with a `.describe()` command. You can use this to provide a description for your schema props in GraphQL and Storybook:

```ts
const DocumentedPropsSchema = aetherSchema('DocumentedProps', {
  title: z.string().describe('Title to be displayed'),
  description: z.string().optional().describe(
    'The body of text for this component.',
  ),
})
```

> 💡 e.g. Export your prop schemas as `getDocumentationProps` to make that component automatically documented in Storybook. You'll generally want to assign this to the `.introspect()` method of your aetherSchema to opt into the automation script.

```ts
export const getDocumentationProps = DocumentedPropsSchema.introspect()
```

Check out the Storybook 'Controls' addon tab or the ArgTables in 'Docs' pages if you'd like to see how this translates into actual Storybook docs with interactive prop tables.

<br/>

For GraphQL, with the automation script and introspection enabled, you can see the generated schema and it's documentation in the GraphQL Playground.

> 💡 If you'd like to know more or just how this all works under the hood, definitely check out the [automation script docs](/packages/@aetherspace/scripts/README.md)

<br/>

## Schema Utilities

Just like with Typescript, you can use existing datastructure descriptions to create new ones. Things like `pick()`, `omit()`, `partial()`, `extend()` were already available with `zod` and have been ported to also work with `aetherSchema()` for full compatibility with Storybook and GraphQL.

### `.extendSchema()` - Adding new fields to a schema to create another

> ⚠️ Note that it is always required to provide a new "key" as the first argument.

```ts
const ExtendedSchema = TopicSchema.extendSchema('FeaturedTopic', {
  isFeatured: z.boolean().default(false),
  featureText: z.string().optional(),
})
```

`type FeaturedTopic = z.infer<typeof ExtendedSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     createdOn: Date,
//     tags: string[],
//     /* -- New props -- */
//     isFeatured: boolean,
//     featureText?: string | undefined,
// }
```

### `.omitSchema()` - Removing props from a schema to create another

Let's use the omit function to remove some properties again from our ExtendedSchema for Topics:

```ts
const MinimalSchema = ExtendedSchema.omitSchema('MinimalTopic', { createdOn: true, isFeatured: true })
```

`type MinimalTopic = z.infer<typeof MinimalSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     tags: string[],
//     featureText?: string | undefined,
// }
```

### `.pickSchema()` - Pick props from a schema to create another

Actually, let's achieve the same thing by just picking and choosing some props from our ExtendedSchema for Topics instead:

```ts
const MinimalSchema = ExtendedSchema.pickSchema('MinimalTopic', { status: true, tags: true, featureText: true })
```

`type MinimalTopic = z.infer<typeof MinimalSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     tags: string[],
//     featureText?: string | undefined,
// }
```

### `.partialSchema()` - Mark all fields optional to create a new schema

You know what? Let's make everything optional:

```ts
const OptionalSchema = ExtendedSchema.partialSchema('PartialTopic')
```

`type PartialTopic = z.infer<typeof OptionalSchema>`

```ts
// {
//     status?: 'draft' | 'published' | 'archived' | undefined,
//     tags?: string[] | undefined,
//     featureText?: string | undefined,
// }
```

### `.requiredSchema()` - Mark all fields as required to create a new schema

Let's make everything required again:

```ts
const RequiredSchema = OptionalSchema.requiredSchema('RequiredTopic')
```

`type RequiredTopic = z.infer<typeof RequiredSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     tags: string[],
//     featureText: string,
// }
```

## Adding new schemas through the CLI (Recommended)

```sh
yarn ats add-schema
```

This will prompt you for a target workspace and name:

```sh
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this schema? 
❯ packages/@aetherspace-commerce  --  importable from: '@aetherspace/commerce' 
  packages/@green-stack-icons  --  importable from: '@green-stack/icons' 
  features/app-core  --  importable from: 'app' 
  features/cv-page  --  importable from: 'cv-page' 
  features/links-page  --  importable from: 'links-page' 
```

```sh
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this schema? packages/@aetherspace-commerce  --  importable from: '@aetherspace/commerce'
? What is the schema name? ShopifyCollection
? Optional description: What data structure does this schema describe? https://shopify.dev/docs/api/storefront/2023-04/objects/Collection
? Optional examples: Would you like to add any common field definitions? 
>>> Changes made:
  • /packages/@aetherspace-commerce/schemas/ShopifyCollection.ts (add)
  • /packages/@aetherspace-commerce/schemas/index.ts (append-last-line)

>>> Success! 
```

## Using Unions & Tuples

Even though zod and `aetherSchema` support tuple & union fields... Since GraphQL and Storybook controls do not support these types out of the box, we are still figuring the best way to transforming those field definitions for GraphQL or Storybook docs. For now, they might just be ignored or even error out.

If you can, try to avoid them in your component props or resolver arguments and responses by going for a more flat or object based structure instead.

e.g. instead of:

```ts
const someSchema = aetherSchema('SomeSchema', {
  someTupleField: z.tuple([z.string(), z.number()]), // TS: [string, number] -> But GraphQL & Storybook won't be optimal
  someUnionField: z.union([z.string(), z.number()]), // TS: string | number -> But GraphQL & Storybook won't be optimal
})
```

try:

```ts
const someSchema = aetherSchema('SomeSchema', {
  someTupleField: aetherSchema('SomeTupleField', {
    stringValue: z.string().optional(), // Allowed -- TS: string | undefined
    numberValue: z.number().optional(), // Allowed -- TS: number | undefined
  }),
  someUnionFieldString: z.string().optional(), // Allowed -- TS: string | undefined
  someUnionFieldNumber: z.number().optional(), // Allowed -- TS: number | undefined
})
```

> However, if you're only using tuple & union fields for validation and generating typescript types instead of documentation or GraphQL, you can still use them as usual.

## Possible Next Steps

- Read the [official zod docs at zod.dev](https://zod.dev/) (or watch an [intro video](https://www.youtube.com/watch?v=L6BE-U3oy80))
- Learn to [**write flexible data resolvers with args & response schemas**](/packages/@aetherspace/navigation/AetherPage/README.md)
- Learn to [**use your schemas for Form State Management in Aetherspace**](/packages/@aetherspace/forms/README.md)
- Learn [how schemas enable automatic Storybook & GraphQL codegen](/packages/@aetherspace/scripts/README.md)

## Previously

- [Recommended way of working](/packages/@aetherspace/scripts/README.md) (and the generators that will help with that).

## Other Topics

- [Styling your components with Tailwind for Web & Mobile](/packages/@aetherspace/styles/README.md)
- [Universal Routing with Expo and Next.js](/packages/@aetherspace/navigation/README.md)

