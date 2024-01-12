<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

<p>
  <a href="https://mongoosejs.com/docs/" target="_blank">
    <img alt="Enables MongoDB" longdesc="Aetherspace with MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  </a>
</p>

# `@aetherspace/mongoose` - Aetherspace Plugin

Prerequisites:
- [Sponsor Aetherspace on Github](https://github.com/Aetherspace/green-stack-starter-demo#readme) or get access to it some other way
- Fork or generate a new repository from the official or free [aetherspace/green-stack-starter](https://github.com/Aetherspace/green-stack-starter#readme) github repo
- Choose the "✅ Include all branches" option during the fork / generation process
- Add `MONGODB_URI` to `apps/next/.env`

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

## Usage -- Mongoose Model from Zod Schemas with `@aetherspace/mongoose`

```tsx
import { z, aetherSchema } from 'aetherspace/schemas'
import { createMongooseDataModel } from '@aetherspace/mongoose/schemas'

/* --- Schemas ---- */

const MyCollectionSchema = aetherSchema('MyCollection', {
  name: z.string(),
  age: z.number(),
})

/* --- Models ----- */

export const MyCollectionModel = createMongooseDataModel(MyCollectionSchema)

```

> However, it's recommended to define your schemas and models in separate files. Otherwise, importing the schema from the same file as the model might cause front-end issues.

`/features/{workspace}/schemas/models.ts`
```tsx
import { createMongooseDataModel } from '@aetherspace/mongoose/schemas'
import { MyCollectionSchema } from './MyCollectionSchema.ts' // <- Much safer

/* --- Models ----- */

export const MyCollectionModel = createMongooseDataModel(MyCollectionSchema)
```

## Roadmap - More to come

`@aetherspace/mongoose` is an Aetherspace plugin branch that's already usable, but will be expanded on in the future. Follow the maintainer on Github, Twitter or Bluesky to stay up to date on the latest developments.
