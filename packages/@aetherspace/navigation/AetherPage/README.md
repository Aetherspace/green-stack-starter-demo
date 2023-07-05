# GraphQL, Data Resolvers & Fetching Route Data

As you may have guessed, the G in GREEN stack stands for GraphQL. It is an essential part of the stack, and is used to fetch data for all pages of the app you're building with Aetherspace.

---

<details>
  <summary><b>Why GraphQL?</b></summary>

---
#### Self-documenting API:

A handy contract between Server and Client.  
Enforced through a strongly-typed schema that describes data & operations available.  
Allows all teams to have clear understanding of capabilities.

#### Precise data fetching:  

Request only the data / fields you need. No more over or under-fetching.  
Reduces amount of data being transferred.

#### Single endpoint:  

All data requests are sent to the same endpoint.  
Simplifies the interaction between server & client.

#### API Flexibility:

Evolvable resolvers. Adding new fields does not break existing clients.  
This avoids causing disruptions or requiring versioning.

On top of that, the way to create a GraphQL API in Aetherspace can also be used to create a REST API, free of effort or vice versa.

</details>

---

# Creating GraphQL Resolvers

### With Schemas and just functions™️

As stated in the [Aetherspace Quickstart](/packages/@aetherspace/README.md), you can create a Data Resolver by:

1. Creating a function in the `/resolvers/` folder of your feature or package workspace
2. Describe your arguments & response structure with `aetherSchema` & Zod (also adds types)
3. Assigning your args & response schemas to your function by wrapping it with `aetherResolver()`
4. Exporting that bundled function as `graphResolver` from a `route.ts` file in the `/routes/` folder

A quick example, starting with the `/resolvers/` function:

```ts
// Schemas
import { z, aetherSchema } from 'aetherspace/schemas'
import { aetherResolver } from 'aetherspace/utils/serverUtils'

/* --- Schemas ------------- */

export const HealthCheckArgs = aetherSchema('HealthCheckArgs', {
  echo: z.string().optional().describe('Echoes back the echo argument'),
})

// (You can reuse schema definitions with pick / omit / extend commands as well)
export const HealthCheckResponse = HealthCheckArgs.pickSchema('HealthCheckResponse', {
  echo: true, // <- Pick the echo argument from the args schema, since we're echoing it back
})

/* --- Config -------------- */

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() ------- */

// Our actual business logic
export const healthCheck = aetherResolver(async ({ args }) => ({
    echo: args.echo, // <- Echo back the echo argument 🤷‍♂️
}), resolverConfig)
```

Later, in a `route.ts` file in the `/routes/` folder, you can export the following:

```ts
import { makeGraphQLResolver } from 'aetherspace/utils/serverUtils'
import { healthCheck } from '../resolvers/healthCheck'

/* --- GraphQL ------------- */

// Make resolver available to GraphQL (picked up by automation)
export const graphResolver = makeGraphQLResolver(healthCheck)
```

Optionally, you can also generate a REST api by exporting the following from that same `route.ts` file:

```ts
import { makeNextApiHandler, makeGraphQLResolver } from 'aetherspace/utils/serverUtils'

/* --- Next.js API Routes -- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)
```

On top of that, the `healthCheck` function "bundle" we made by wrapping with `aetherResolver()` is still usable as a regular Javascript promise, so feel free to use it in other data resolvers as well.

### Easy mode -- Generating GraphQL Resolvers with the CLI

If you'd rather skip some of these manual steps, we have a handy turborepo generator in place:

```shell
yarn ats add-resolver
```

This will ask you a few questions, and then generate the related files and content for you:

```shell
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this resolver?
  packages/@aetherspace-commerce  --  importable from: '@aetherspace/commerce' 
  packages/@green-stack-icons  --  importable from: '@green-stack/icons' 
❯ features/app-core  --  importable from: 'app' 
  features/cv-page  --  importable from: 'cv-page' 
  features/links-page  --  importable from: 'links-page'
```

```shell
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this resolver? # -> features/app-core
? How will you name the resolver function? # -> getTestData
? Optional description: What will the resolver do? # -> Get some test data
? What else would you like to generate? # -> GraphQL Resolver, GET & POST API Routes
? Which API path would you like to use? # -> /api/example/[slug]

>>> Changes made:
  • /features/app-core/schemas/GetTestDataResolver.ts (add)
  • /features/app-core/schemas/index.ts (append-last-line)
  • /features/app-core/resolvers/getTestData.ts (add)
  • /features/app-core/resolvers/index.ts (append-last-line)
  • /features/app-core/routes/api/example/[slug].ts (add)

>>> Success!
```

This will have generated and tied together the following files for you:
- Empty `ResolverArgs` and `ResolverResponse` zod schemas
- Tie those together in a `ResolverAPIConfig` under `{target}/schemas/`
- An empty wrapped `aetherResolver()` function using that API config
- A next.js app-dir API route for the given apiPath, with an exported `graphResolver`

### Restart the server to see your changes

```shell
yarn dev # or, manually with 'yarn ats link-routes'
```

Your updated GraphQL API will now be available at `http://localhost:3000/api/graphql`

Any fields you edit or add to your argument or response schemas will be made available in your function (typed) and automatically reflected in the GraphQL API.

# Getting data into your web & mobile routes

To actually get the data from your GraphQL resolvers into the specific screens for specific routes on both Expo & Next.js, you'll need to use a combination of the following helpers & components from `aetherspace/navigation`:

- `fetchAetherProps`, to create a fetcher to actually get the data from your GraphQL API
- `useAetherRoute`, used to get the current route's data from expo-router or Next.js router & props
- `AetherPage`, used to wrap your page component in a Next.js app-dir page under `/routes/`

We have a full working example of this in the Aetherspace demo app:
- [/features/app-core/screens/HomeScreen.tsx#L39-L76](https://github.com/Aetherspace/green-stack-starter-demo/blob/main/features/app-core/screens/HomeScreen.tsx#L39-L76)
- [/features/app-core/routes/index.tsx](https://github.com/Aetherspace/green-stack-starter-demo/blob/main/features/app-core/routes/index.tsx)

But again, you may want to save some time and skip the manual boilerplate and use a generator instead:

## Generating GraphQL powered routes

```shell
yarn ats add-route
```

The turborepo route generator will ask you some questions, like which url you’d like the route to have, and will generate the boilerplate screens and routes folders in the workspace of your choosing:

```shell
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this new route? 
  packages/@aetherspace-commerce  --  importable from: '@aetherspace/commerce' 
  packages/@green-stack-icons  --  importable from: '@green-stack/icons' 
❯ features/app-core  --  importable from: 'app' 
  features/cv-page  --  importable from: 'cv-page' 
  features/links-page  --  importable from: 'links-page'
```

```shell
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this new route? # -> features/app-core
? What should the screen component be called? # -> MyNewRouteScreen
? What url do you want this route on? # e.g. "/examples/[slug]"

>>> Changes made:
  • /features/app-core/screens/MyNewRouteScreen.tsx (add)
  • /features/app-core/screens/index.ts (append-last-line)
  • /features/app-core/routes/examples/[slug]/index.tsx (add)

>>> Success!
```

In the generated screen component file, you can then replace the boilerplate `healthCheck` graphql query with whatever data you need from the GraphQL explorer at [/api/graphql](http://localhost:3000/api/graphql)

## Learn more about Aetherspace:

- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Universal Routing in Expo & Next.js with Aetherspace](/packages/@aetherspace/navigation/README.md)
- [Automation based on Single Sources of Truth and the File System](/packages/@aetherspace/scripts/README.md)
