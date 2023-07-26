# `@aetherspace/mongoose` - Aetherspace Plugin

Prerequisites:
- [Sponsor Aetherspace on Github]() or get access to it some other way
- Fork or generate a new repository from the official or free [aetherspace/green-stack-starter](https://github.com/Aetherspace/green-stack-starter#readme) github repo
- Choose the "✅ Include all branches" option during the fork / generation process

```shell
git merge with/mongoose
```

```shell
│── packages/
│   └── @aetherspace-mongoose/ # ➡️ importable from '@aetherspace/mongoose'
│       └── schemas/ # ➡️ Schemas + utils for turning aetherSchamas to mongoose models
│       └── utils/ # ➡️ Extra utils for mongoose models created by this package
│       └── package.json # ➡️ pkg name & dependencies, like 'mongoose'
```

## Usage -- Mongoose Model from Zod Schemas with `@green-stack/icons`

```tsx
import { z, aetherSchema } from 'aetherspace/schemas'
import { aetherSchemaToMongoose } from '@aetherspace/mongoose/schemas'

/* --- Schemas ---- */

const MyCollectionSchema = aetherSchema('MyCollection', {
  name: z.string(),
  age: z.number(),
})

/* --- Models ----- */

export const MyCollectionModel = aetherSchemaToMongoose(MyCollectionSchema)

```

> However, it's recommended to define your schemas and models in separate files. Otherwise, importing the schema from the same file as the model might cause front-end issues.

`/features/{workspace}/schemas/models.ts`
```tsx
import { aetherSchemaToMongoose } from '@aetherspace/mongoose/schemas'
import { MyCollectionSchema } from './MyCollectionSchema.ts' // <- Much safer

/* --- Models ----- */

export const MyCollectionModel = aetherSchemaToMongoose(MyCollectionSchema)
```

## Roadmap - More to come

`@aetherspace/mongoose` is an Aetherspace plugin branch that's already usable, but will be expanded on in the future. Follow the maintainer on Github, Twitter or Bluesky to stay up to date on the latest developments.
