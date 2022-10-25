# Schemas 📐

```ts
import { ats, Infer } from 'aetherspace/schemas'
```

A core feature of Aetherspace as a starter template is taking what works and making it better. `ats` is a tiny wrapper around `superstruct`. You can use it to define your datastructures just once for the entire monorepo.

> `superstruct` is a validation lib like `zod`, built with Typescript and GraphQL in mind. This made it the ideal choice to extend for Aetherspace.

<br/>

## Actual 'Single Sources of Truth'

Think about all the datastructures related code of your application:

- Typescript types
- Form & data validation
- GraphQL definitions
- Storybook controls
- ...

### The problem:

Generally speaking, you never want to define your datastructures more than once. Not only is it redundant and a pain to do, it's also a recipe for disaster.

If you need to change something, you have to remember to change it in all the places. If at any point you forget to do that, then you risk your datastructures getting out of sync, likely with bugs as result.

### The solution:

By leveraging `ats` to build our schemas, we enable our datastructure definitions to create the other data definitions from them. Essentially meaning we can avoid declaring it twice or more.

This is a huge win for maintainability and developer experience, as it avoids the need to keep these datastructure sources of truth in sync.

## Usage

Let's have a look at how aetherspace schemas translate to Typescript types: 👇

#### Defining Primitives

```ts
const someString = ats.string() // string
const someNumber = ats.number() // number
const someBoolean = ats.boolean() // boolean
```

#### Defining Objects

```ts
const PropSchema = ats.schema('ComponentProps', {
  title: ats.string(),
  description: ats.string(),
  isLoading: ats.boolean(),
})
```

`type ComponentProps = Infer<typeof PropSchema>`

> 💡 Note: `Infer` is a type helper type that extracts the type from a schema. It's the same as doing `typeof PropSchema['TYPE']`

```ts
// {
//     title: string,
//     description: string,
//     isLoading: boolean,
// }
```

#### Advanced Types

```ts
const TopicSchema = ats.schema('Topic', {
  status: ats.enum(['draft', 'published', 'archived']),
  createdOn: ats.date(),
  tags: ats.array(ats.id()),
})
```

`type Topic = typeof TopicSchema['TYPE']`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     createdOn: Date,
//     tags: string[],
// }
```

#### Defaults & Optionals

```ts
const ResolverArgsSchema = ats.schema('ResolverArgs', {
  isNullable: ats.boolean().nullable(),
  isNullish: ats.boolean().nullish(),
  isOptional: ats.boolean().optional(),
  hasDefault: ats.boolean().default(true),
})
```

`type ResolverArgs = Infer<typeof ResolverArgsSchema>`

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
const ResponseSchema = ats.schema('ResolverResponse', {
  id: ats.id(),
  metadata: ats.schema('NestedMetadata', {
    name: ats.string(),
    description: ats.string().optional(),
  }),
  relatedTopics: ats.array(TopicSchema), // See example schema above
})
```

`type ResolverResponse = Infer<typeof ResponseSchema>`

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
const CollectionSchema = ats.schema('TopicsWrapper', {
  topics: ats.collection('Topic', {
    status: ats.enum(['draft', 'published', 'archived']),
    createdOn: ats.date(),
    tags: ats.array(ats.id()),
  }), // Same as example TopicSchema above
})
```

> 💡 This is essentially the same as `ats.array(TopicSchema)`, except you can define it directly.

`type TopicsWrapper = Infer<typeof CollectionSchema>`

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

Any `ats` schema prop can also be chained with a `.docs()` command. You can use this to provide an example value and a description for your schema props in GraphQL and Storybook:

```ts
const DocumentedPropsSchema = ats.schema('DocumentedProps', {
  title: ats.string().docs(
    'Hello World', // Example value
    'Title to be displayed', // Optional prop description
  ),
  description: ats.string().optional().docs(
    'Lorem Ipsum Dolor Sit Amet...', // example
    'The body of text for this component.', // description
  ),
})
```

> 💡 e.g. Export your prop schemas as `getDocumentationProps` to make that component automatically documented in Storybook.

Check out the Storybook 'Controls' addon tab or the ArgTables in 'Docs' pages for components if you'd like to see how this translates into actual Storybook documentation.

<br/>

For GraphQL, with the automation script and introspection enabled, you can see the generated schema and it's documentation in the GraphQL Playground.

> 💡 If you'd like to know more or just how this all works under the hood, definitely check out the [automation script docs](/packages/@registries/README.md)

<br/>

## Schema Utilities

Just like with Typescript, you can use existing datastructure descriptions to create new ones. Things like `pick()`, `omit()`, `partial()`, `extend()` were already available with `superstruct` and have been ported to `ats` to also work for full compatibility with Storybook and GraphQL.

### `ats.extend()` - Extending a schema

> 🤷‍♂️ Alternatively, you can use `ats.assign()` to achieve the same effect.

```ts
const ExtendedSchema = ats.extend('FeaturedTopic', TopicSchema, {
  isFeatured: ats.boolean().default(false),
  featureText: ats.string().optional(),
})
```

`type FeaturedTopic = Infer<typeof ExtendedSchema>`

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

### `ats.omit()` - Omitting props from a schema

Let's use the omit function to remove some properties again from our ExtendedSchema for Topics:

```ts
const MinimalSchema = ats.omit('MinimalTopic', ExtendedSchema, ['createdOn', 'isFeatured'])
```

`type MinimalTopic = Infer<typeof MinimalSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     tags: string[],
//     featureText?: string | undefined,
// }
```

### `ats.pick()` - Picking props from a schema

Actually, let's achieve the same thing by just picking and choosing some props from our ExtendedSchema for Topics instead:

```ts
const MinimalSchema = ats.pick('MinimalTopic', ExtendedSchema, ['status', 'tags', 'featureText'])
```

`type MinimalTopic = Infer<typeof MinimalSchema>`

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     tags: string[],
//     featureText?: string | undefined,
// }
```

### `ats.partial()` - Making all schema props optional

You know what? Let's make everything optional:

```ts
const OptionalSchema = ats.partial('PartialTopic', ExtendedSchema)
```

`type PartialTopic = Infer<typeof OptionalSchema>`

```ts
// {
//     status?: 'draft' | 'published' | 'archived' | undefined,
//     tags?: string[] | undefined,
//     featureText?: string | undefined,
// }
```

## Next Steps

- [Writing flexible data resolvers with Schemas]() (TODO)
- [Automation based on Schemas: Storybook & GraphQL](/packages/@registries/README.md)
