# AetherSchemas

```ts
import { ats } from 'aetherspace/schemas'
```

A core feature of Aetherspace as a boilerplate is taking what works and making it better. `ats` is a tiny wrapper around `superstruct` (a validation lib like `zod`). You can use it to define your datastructures just once for the entire monorepo.

## Actual 'Single Sources of Truth'

Think about all the datastructures related code of your application:

- Typescript types
- Form & data validation
- GraphQL definitions
- Storybook controls
- ...

### The problem:

Generally speaking, you never want to define your datastructures more than once. Not only is it redundant and a pain to do, it's also a recipe for disaster.

If you need to change something, you have to remember to change it in all the places. If at any point you forget to do that, then you risk your datastructures getting out of sync, usually with bugs as result.

### The solution:

By leveraging `ats` to build our schemas, we open up our datastructure definitions to create all of the above from them. Essentially meaning can avoid writing this stuff twice.

This is a huge win for maintainability and developer experience as this avoids the need to keep multiple sources of truth in sync.

## Usage

#### Defining Primitives

```ts
const someString = ats.string() // string
const someNumber = ats.number() // number
const someBoolean = ats.boolean() // boolean
```

#### Defining Objects

```ts
const ComponentProps = ats.schema('ComponentProps', {
  title: ats.string(),
  description: ats.string(),
  isLoading: ats.boolean(),
})
```

```ts
// {
//     title: string,
//     description: string,
//     isLoading: boolean,
// }
```

#### Advanced Types

```ts
const Topic = ats.schema('Topic', {
  status: ats.enum(['draft', 'published', 'archived']),
  createdOn: ats.date(),
  tags: ats.array(ats.id()),
})
```

```ts
// {
//     status: 'draft' | 'published' | 'archived',
//     createdOn: Date,
//     tags: string[],
// }
```

#### Defaults & Optionals

```ts
const ResolverArgs = ats.schema('ResolverArgs', {
  isNullable: ats.boolean().nullable(),
  isNullish: ats.boolean().nullish(),
  isOptional: ats.boolean().optional(),
  hasDefault: ats.boolean().default(true),
})
```

```ts
// {
//     isNullable: boolean | null,
//     isNullish?: boolean | null | undefined,
//     isOptional?: boolean | undefined,
//     hasDefault: boolean,
// }
```
