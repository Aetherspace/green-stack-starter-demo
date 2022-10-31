# GREEN stack quickstart ⚡

> Welcome! Set up your Web, iOS & Android app in minutes, and blow away the competition with write-once components that run on all platforms. Powered by GraphQL, React, Expo & Next.js

## Web & Mobile with Aetherspace

Generate a new repo from the [Aetherspace template](https://github.com/Aetherspace/green-stack-starter) and optionally include all branches.

Github will then generate a copy of the template repo for you to customize.
It comes out of the box with setup for:

- Next.js web app (File based routing, Serverside rendering, Static site generation, ...)
- Expo mobile app (Android & iOS with react-native)
- A REST & GraphQL API (with Apollo Server & Next.js API routes)
- Documentation for both Aetherspace and the example components
- [Automation](/packages/@registries/README.md) scripts to automatically generate API & component documentation
- Github actions for mobile deployments, linting your code & building your documentation

**When you're ready to start developing, run `yarn install` to install all dependencies, followed by:**

```bash
yarn dev:docs
```

## Up and running in minutes

#### Write & style your components just once

> 💚 Aetherspace primitives are ___built with [tailwind](), iOS, Android, web, node and ssr (+ media queries!) in mind___

```tsx
import { View, Text } from 'aetherspace/primitives'

export const MyComponent = () => (
  <View tw="px-2 max-w-[100px] items-center rounded-md">
    <Text tw="lg:text-xl roboto-bold text-green">
        Hello World 👋
    </Text>
  </View>
)
```

#### Use semantic HTML & optimised primitives where necessary

> ✨ Thanks to a tiny wrapper around `@expo/html-elements` and primitives like `Image` using either the optimized Next.js or React-Native component under the hood, __anything you build with these primitives will automatically be optimized for each platform as well__ 🎉

```tsx
import { Image } from 'aetherspace/primitives'
import { Article, Section, H2 } from 'aetherspace/html-elements'

// -i- Web: Renders article / section / h2 + next/image for better SEO & vitals
// -i- Mobile: Renders react-native View / Text / ... 👉 Gets turned into native UI
export const MyBlogPost = (props: { paragraphs: string[] }) => (
  <Article tw="relative">
    <H2 tw="text-gray roboto-black">My post title</H2>
    <Image tw="w-full" src="/img/article-header.png">
    <Section tw="px-4 mb-4">
      {props.paragraphs.map((paragraph) => <P tw="roboto-regular">{paraggraph}</P>)}
    </Section>
  </Article>
)
```

#### Test on _Web, iOS, Android & Storybook_

> ⏳ Automatically wait for your **Next.js** server to start before starting up **Expo** & **Storybook**

```bash
yarn dev:docs
```

This will run the `dev` command in each app workspace in parallell with [Turbo](https://turbo.build/repo) 👇

```bash
## Starts next.js web project + API routes on port 3000
next-app:dev: $ next
next-app:dev: ready - started server on 0.0.0.0:3000, url: http://localhost:3000
## Runs automations like docgen at next.js build time
next-app:dev: -i- Successfully created resolver registry at: 
next-app:dev: ✅ packages/@registries/resolvers.generated.ts
next-app:dev: -i- Auto documenting with 'yarn document-components' ...
next-app:dev: ✅ packages/@registries/docs/features/app-core/icons.stories.mdx
next-app:dev: ✅ packages/@registries/docs/features/app-core/screens.stories.mdx
## Checks whether next.js API is ready
aetherspace:dev-health-check: $ NODE_ENV=development node scripts/dev-health-check
aetherspace:dev-health-check: ✅ Health check 1 succeeded. Server up and running.
## Starts Expo for mobile dev in iOS / Android device or simulator
expo-app:start: $ npx expo start
expo-app:start: Your native app is running at exp://192.168.0.168:19000
## Starts up Storybook for developing & testing components in isolation
99% done plugins webpack-hot-middlewarewebpack built preview acfe5466784b8a1a2429 in 162ms
╭─────────────────────────────────────────────────────╮
│                                                     │
│   Storybook 6.5.10 for React started                │
│   3.12 s for manager and 8.9 s for preview          │
│                                                     │
│    Local:            http://localhost:6006/         │
│    On your network:  http://169.254.34.142:6006/    │
│                                                     │
╰─────────────────────────────────────────────────────╯
```

#### Define your data as _actual_ **single sources of truth**

> 📐 Our `ats` schema builder enables you to __build for Typescript first__, but enables you to optionally ___generate documentation, validation logic, GraphQL typedefs___ and ___data resolvers___ from them later

```tsx
import { ats, applySchema, Infer } from 'aetherspace/schemas'

/* --- Schematypes ------------- */

export const PropSchema = ats.schema('MyComponentProps', {
  name: ats.string().optional(), // string | undefined
  value: ats.number().default(1), // number
})

/* --- <MyComponent/> ---------- */

// Infer types from schema with 'Infer' helper, or ...
export const MyComponent = (props: Infer<typeof PropSchema>) => {
    // Prop validation (optional: apply defaults? + also infers types)
    const { name, value } = applySchema(props, PropSchema)
    // ...
}
```

#### Hook into automatic docgen

> 📚 ___Documentation drives adoption___... and Storybook is a great way to do it.  
> Just export your `ats` powered schema as a __`getDocumentationProps` export__ and our scripts will __automatically turn it into Storybook controls.__

`../../components/MyComponent.tsx`

```tsx
const PropSchema = ats.schema('MyComponentProps', {
  name: ats.string().optional().docs('Example', 'Title of the component'),
  value: ats.number().docs(1, 'Value of the component'),
})

/* --- <MyComponent/> ---------- */

// ... export your component with the same name as the file ...

/* --- Documenation ------------ */

export const getDocumentationProps = PropsSchema
```

`// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`

```bash
next-app:dev: -i- Auto documenting with 'yarn document-components' ...
next-app:dev: ✅ packages/@registries/docs/features/app-core/icons.stories.mdx
next-app:dev: ✅ packages/@registries/docs/features/app-core/screens.stories.mdx
```

[example >>> icon docs](https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/features-app-core-icons)

#### Build flexible data resolvers (API routes + GraphQL)

> 💪 Using `ats` to describe function arguments and responses opens it up to not just async / await, but Next.js API routes and GraphQL resolvers as well.

`apps/next/src/pages/api/health.ts`

```ts
// Schemas
import { ats, aetherGraphSchema } from 'aetherspace/schemas'
import { aetherResolver, makeNextApiHandler, makeGraphQLResolver } from 'aetherspace/utils/serverUtils'

/* --- Schemas ----------- */

export const HealthCheckArgs = ats.schema('HealthCheckArgs', {
  echo: ats.string().optional().docs('Hello World', 'Echoes back the echo argument'),
})

export const HealthCheckResponse = ats.schema('HealthCheckResponse', {
  echo: HealthCheckArgs.schema.echo, // <- You can reuse schema definitions 👀
})

/* --- Config ------------ */

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() ----- */

export const healthCheck = aetherResolver(async ({ args }) => ({
    echo: args.echo, // Echo back the echo argument 🤷‍♂️
}), resolverConfig)

/* --- Exports ----------- */

// Make resolver available to GraphQL (picked up by automation)
export const graphResolver = makeGraphQLResolver(healthCheck)
// Export as Next.js API route
export default makeNextApiHandler(healthCheck, { /* options */ })
```

[example >>> REST](https://aetherspace-green-stack-starter.vercel.app/api/health) (e.g. at `/api/health`)  

> ⚛️ Since we're exporting a `graphResolver` function using `makeGraphQLResolver()`, we can generate a GraphQL endpoint for our resolver function as well:

`// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`

```bash
next-app:dev: -i- Successfully created resolver registry at: 
next-app:dev: ✅ packages/@registries/resolvers.generated.ts
```

`/api/graphql` will then use the `resolvers.generated.ts` barrel file to build its graphql API from.

[example >>> GraphQL](https://aetherspace-green-stack-starter.vercel.app/api/graphql) (e.g. in `/api/graphql`)

## Powerful results 💪

Performing these 6 steps has provided us with a bunch of value in little time:

- Hybrid component that is styled with tailwind, but actually native on iOS and Android
- Hybrid component that is optimized for SEO, media queries and Web-Vitals on Web
- Storybook documentation without having to explicitly create it ourselves
---
- 🤝 A single source of truth for all our props, args, responses, docs, types & defaults
---
- A resolver function we can call from other data resolvers or API routes
- A GraphQL API powered by Apollo-Server, with automatic typedefs
- A Next.js powered REST API

## Learn more:

- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Writing flexible data resolvers with Schemas]() (TODO)
- [Automation based on Schemas: Storybook & GraphQL](/packages/@registries/README.md)
