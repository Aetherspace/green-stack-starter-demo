# GraphQL, Data Resolvers & Fetching Route Data

As you probably know, the G in 'GREEN stack' stands for GraphQL. It is an essential part of the stack, and is used to fetch data for all pages of the app you're building with Aetherspace.

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

### By combining zod based schemas and simple resolver functions

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

// Our resolver args, defined as a zod schema
export const HealthCheckArgs = aetherSchema('HealthCheckArgs', {
  echo: z.string().optional().describe('Echoes back the echo argument'),
})

// Same thing for our response schema, but we're picking the echo argument from the args schema
export const HealthCheckResponse = HealthCheckArgs.pickSchema('HealthCheckResponse', {
  echo: true, // <- Pick the echo argument from the args schema, since we're echoing it back
})

/* --- Config -------------- */

// Our resolver config, which will tell aetherResolver() what the args & response shape should be
const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() ------- */

// Our actual business logic, wrapped with aetherResolver() and supplied with our resolverConfig
export const healthCheck = aetherResolver(async ({ args }) => ({
    echo: args.echo, // <- Echo back the echo argument 🤷‍♂️
}), resolverConfig)

// We now have a nice bundle of our business logic function, with the args & response schemas attached
// This bundle can be used in multiple ways, as we'll see below
```

Later, in a `route.ts` file in the `/routes/` folder, you can export the following:

```ts
import { makeGraphQLResolver } from 'aetherspace/utils/serverUtils'
import { healthCheck } from '../resolvers/healthCheck'

/* --- GraphQL ------------- */

// Make resolver available to GraphQL (picked up by automation)
// GraphQL schema definitions will be generated automatically from the attached args & response shapes
export const graphResolver = makeGraphQLResolver(healthCheck)
```

Optionally, you can also generate a REST api by exporting the following from that same `route.ts` file:

```ts
import { makeNextApiHandler } from 'aetherspace/utils/serverUtils'
import { healthCheck } from '../resolvers/healthCheck'

/* --- Next.js API Routes -- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)
```

On top of that, the `healthCheck` function "bundle" we made by wrapping with `aetherResolver()` is still usable as a regular Javascript promise for use in other data resolvers as well.

### Generating GraphQL Resolvers with the CLI (Recommended)

If you'd rather skip some of these manual steps, we have a handy **turborepo generator** in place:

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
- `useAetherRouteData`, used to get the current route's data from expo-router or Next.js router & props
- `AetherPage`, used to wrap your page component in a Next.js app-dir page under `/routes/`

Check out the [Recommended Way of Working docs](/packages/@aetherspace/scripts/README.md) for more details and ways to simplify this process.

Additionally we have a full working example of this in the Aetherspace demo app:
- [/features/app-core/screens/HomeScreen.tsx#L39-L83](https://github.com/Aetherspace/green-stack-starter-demo/blob/main/features/app-core/screens/HomeScreen.tsx#L39-L83)
- [/features/app-core/routes/index.tsx](https://github.com/Aetherspace/green-stack-starter-demo/blob/main/features/app-core/routes/index.tsx)

```tsx
/* --- GraphQL & Data Fetching ----------------------------------------------------------------- */

/** -i- GraphQL query that will fetch all data we need for this screen */
const getScreenDataQuery = `
  query($healthCheckArgs: HealthCheckArgs!) {
    healthCheck(args: $healthCheckArgs) {
      alive
      kicking
      echo
      baseURL
    }
  }
`

/** -i- Function to get the GraphQL variables that will be used to fetch the data for this screen */
const getHomeScreenArgs = (params: HomeScreenParams = {}) => ({
  healthCheckArgs: HomeParamsSchema.parse(params),
})

/** -i- Function to actually fetch the data for this screen, where queryKey is likely the GraphQL query */
const getHomeScreenData = async (queryKey: string, fetcherOptions?: AetherFetcherOptions<HomeScreenParams> = {}) => {
  // -i- Recommended boilerplate for graphql data fetchers like this
  const { variables: queryVariables, headers } = fetcherOptions
  const queryData = queryKey || getScreenDataQuery // Will be used to identify & cache the data with SWR
  const queryInput = queryVariables || getHomeScreenArgs() // Use defaults if not defined
  // -i- Actual data fetching and mapping response data to screen props
  const { data } = await fetchAetherProps(queryData, { variables: queryInput, headers })
  const { alive, kicking, echo } = data?.healthCheck || {}
  return { alive, kicking, customGreeting: echo } as HomeScreenProps
}

/** -i- Bundled config for getting the screen data, including query, variables, and data fetcher */
export const screenConfig = {
  query: getScreenDataQuery,
  getGraphqlVars: getHomeScreenArgs,
  getGraphqlData: getHomeScreenData,
  paramSchema: HomeParamsSchema,
  propSchema: HomePropsSchema,
  refetchOnMount: false,
  backgroundColor: '#FFFFFF',
}

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

export const HomeScreen = (props: AetherProps<typeof HomePropsSchema>) => {
  // Props & Screen Data Fetching (from screenConfig 👇)
  const [pageData, { error, isLoading, ...swrUtils }] = useAetherRouteData(props, screenConfig)
  const { customGreeting, alive, kicking, baseURL = BASE_URL } = pageData

  // ...
}
```

But again, you may want to save some time by skipping the manual boilerplate entirely and use a generator instead:

## Generating GraphQL powered routes (Recommended)

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

## Creating a "DataBridge" for Linking Routes to GraphQL Query Resolvers

Like you saw in the example above, we use a `screenConfig` object to bundle the GraphQL query, variables, and data fetcher together. This is then used by the `useAetherRouteData` hook to fetch the data for the screen.

Ideally, these are extendable and composable, so that you can create a "DataBridge" between your GraphQL API and your routes. This is what the `createDataBridge()` function is for:

> Note: **Any resolver generated with the CLI will already have a DataBridge in place.**

```tsx
const screenConfig = createDataBridge({
  ...SomeResolverDataBridge, // <- Resolver DataBridge we're extending for our route
  paramsSchema: SomeScreenParams, // <- Params schema for the route (must be built using aetherschema & zod)
  propsSchema: SomeScreenProps, // <- Props schema for the route (must be built using aetherschema & zod)
  graphqlQuery: someCustomQueryWithLessFields, // <- Override GraphQL query? (optional, only if you want some of the fields)
  backgroundColor: '#111827',
})
```

> Further notes: **In the route generator, you can actually already select a resolver to use as a DataBridge for your route**. This will automatically generate the `createDataBridge()` call for you, and will also generate the `SomeScreenParams` and `SomeScreenProps` schemas for you.

## Using Unions & Tuples

Since **GraphQL does not support Union and Tuple types out of the box**, we have only added support for transforming your zod tuples and union fields into GraphQL JSON types. These will act as a sort of catch-all for types we don't yet know how to handle in a Graphql type-safe way. However, since zod is the extra barrier of validation, this should not really be a problem. 

If you really want a type-safe GraphQL schema as well, you can try to avoid them in your resolver arguments and responses by going for a more flat or object based structure instead.

e.g. instead of:

```ts
const someSchema = aetherSchema('SomeSchema', {
  someTupleField: z.tuple([z.string(), z.number()]), // Ignored -- TS: [string, number]
  someUnionField: z.union([z.string(), z.number()]), // Ignored -- TS: string | number
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

which would result in:

`schema.graphql`
```graphql
type SomeTupleField {
  stringValue: String
  numberValue: Float
}

type SomeSchema {
  someTupleField: SomeTupleField
  someUnionFieldString: String
  someUnionFieldNumber: Float
}
```  

## Possible next steps:

- [**Style your screens and UI for all platforms with Tailwind**](/packages/@aetherspace/styles/README.md)
- Refine the data structure for Args, Responses and Component Props through [Single Sources of Truth](/packages/@aetherspace/schemas/README.md)
- Simplify GraphQL and Data Fetching by applying our [Recommended Way of Working](/packages/@aetherspace/scripts/README.md)
- Reuse "Data Bridges" for [Form State Management](/packages/@aetherspace/forms/README.md)

## Previously:

- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Universal Routing in Expo & Next.js with Aetherspace](/packages/@aetherspace/navigation/README.md)
