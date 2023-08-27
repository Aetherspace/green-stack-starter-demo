<img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />

# GREEN stack quickstart ⚡

> Welcome to Aetherspace! Set up your Web, iOS & Android app in minutes, and blow away the competition with write-once components that run on all platforms. Powered by GraphQL, React, Expo & Next.js

## Kickstart for Web & Mobile with Aetherspace

Generate a new repo from the [Aetherspace template](https://github.com/Aetherspace/green-stack-starter-demo) and (optionally) include all branches.

Github will then generate a copy of the template repo for you to customize.
It comes out of the box with setup for:

- Next.js web app (File based routing, Serverside rendering, Static site generation, ...)
- Expo mobile app (Android & iOS with Expo and react-native)
- A REST & GraphQL API (with Apollo Server & Next.js API routes)
- Documentation for both Aetherspace and the example components
- [Automation](/packages/@aetherspace/scripts/README.md) scripts to automatically generate API & component documentation
- Github actions for mobile deployments, linting your code & building your documentation

**When you're ready to start developing, run `yarn install` to install all dependencies, followed by:**

```shell-script
yarn dev:docs
```

## Up and running in minutes

`packages/@aetherspace` houses a bunch of helpers that can be imported under the `aetherspace` namespace. These aim to make your cross-platform journey a breeze. All of it has been written in Typescript and is in the process of being documented in Storybook. Feel free to edit these to your liking, but here's what it you can do with it out of the box:

#### Write & style your components just once

> 💚 Aetherspace primitives are ___built with [tailwind](), iOS, Android, web, node and ssr (+ media queries) in mind___.  
> We mention media queries specifically because react-native-web does not support them out of the box. But we've got you covered.

```tsx
import { View, Text } from 'aetherspace/primitives'

export const MyComponent = () => (
  <View tw="px-2 max-w-[100px] items-center rounded-md">
    <Text tw="lg:text-xl font-primary-bold text-green">
        Hello World 👋
    </Text>
  </View>
)
```

#### Use semantic HTML & optimised primitives where necessary

> ✨ Thanks to a tiny wrapper around `@expo/html-elements` and primitives like `Image` using either the optimized Next.js or React-Native component under the hood, __anything you build with these primitives will automatically be optimized for each platform as well__ 🎉

```tsx
import { Image } from 'aetherspace/primitives'
import { Article, Section, H2, P } from 'aetherspace/html-elements'

// -i- Web: Renders article / section / h2 + next/image for better SEO & web vitals
// -i- Mobile: Renders react-native View / Text / ... 👉 Gets turned into actual native UI
export const MyBlogPost = (props: { paragraphs: string[] }) => (
  <Article tw="relative">
    <H2 tw="text-gray font-primary-black">My post title</H2>
    <Image tw="w-full" src="/img/article-header.png">
    <Section tw="px-4 mb-4">
      {/* render each paragraph as a <p> tag on web, or <Text> on mobile */}
      {props.paragraphs.map((paragraph) => <P tw="font-primary-regular">{paragraph}</P>)}
    </Section>
  </Article>
)
```

#### Test on _Web, iOS, Android & Storybook_

> ⏳ Automatically wait for your **Next.js** server to start before starting up **Expo** & **Storybook**

```shell-script
yarn dev:docs
```

This will run the `dev` command in each app workspace in parallell with [Turborepo](https://turbo.build/repo) 👇

```shell-script
## Starts next.js web project + API routes on port 3000
next-app:dev: $ next
next-app:dev: ready - started server on 0.0.0.0:3000, url: http://localhost:3000
## Runs automations like docgen at next.js build time
next-app:dev: -i- Successfully created resolver registry at: 
next-app:dev: ✅ packages/@registries/resolvers.generated.ts
next-app:dev: -i- Auto documenting with 'yarn document-components' ...
next-app:dev: ✅ packages/@registries/docs/features/app-core/icons.stories.mdx
next-app:dev: ✅ packages/@registries/docs/features/app-core/screens.stories.mdx
## Checks whether backend is ready
aetherspace:dev-health-check: $ NODE_ENV=development node scripts/dev-health-check
aetherspace:dev-health-check: ✅ Health check 1 succeeded: Server, API routes & GraphQL up and running.
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

> 📐 Our `aetherSchema()` structure builder enables you to __build for Typescript first (with [Zod](https://zod.dev))__, but enables you to optionally ___generate documentation, validation logic, GraphQL typedefs___ and ___data resolvers___ from them as well.

```tsx
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'

/* --- Schematypes ------------- */

export const PropSchema = aetherSchema('MyComponentProps', {
  name: z.string().optional(), // string | undefined
  value: z.number().default(1), // number
})

/* --- <MyComponent/> ---------- */

// Infer types from props schema with 'AetherProps' type helper, or ...
export const MyComponent = (props: AetherProps<typeof PropSchema>) => {
    // Prop validation + apply defaults
    const { name, value } = PropSchema.parse(props)
    // ...
}
```

#### Hook into automatic docgen

> 📚 ___Documentation drives adoption___... and Storybook is a great way to do it.  
> Just assign your `aetherSchema()` & `zod` powered prop definition as a __`getDocumentationProps` export__ and our scripts will __automatically turn it into Storybook controls.__

`../../components/MyComponent.tsx`

```tsx
const PropSchema = aetherSchema('MyComponentProps', {
  name: z.string().optional().describe('Title of the component'),
  value: z.number().default(1).describe('Initial value of the component'),
})

/* --- <MyComponent/> ---------- */

// ... export your component with the same name as the file ...

/* --- Documenation ------------ */

export const getDocumentationProps = PropSchema.introspect()
```

`// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`

```shell-script
next-app:dev: -i- Auto documenting with 'yarn document-components' ...
next-app:dev: ✅ packages/@registries/docs/features/app-core/icons.stories.mdx
next-app:dev: ✅ packages/@registries/docs/features/app-core/screens.stories.mdx
```

[example >>> icon docs](https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/features-app-core-icons)

#### Build flexible data resolvers (API routes + GraphQL)

> 💪 Using `aetherSchema()` & `zod` to describe function arguments and responses opens it up to not just easier regular function use with async / await, but Next.js API routes and GraphQL resolvers as well.

`features/app-core/routes/api/health/route.ts`

```ts
// Schemas
import { z, aetherSchema } from 'aetherspace/schemas'
import { aetherResolver, makeNextApiHandler, makeGraphQLResolver } from 'aetherspace/utils/serverUtils'

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

/* --- Next.js API Routes -- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)

/* --- GraphQL ------------- */

// Make resolver available to GraphQL (picked up by automation)
export const graphResolver = makeGraphQLResolver(healthCheck)
```

[example >>> REST](https://aetherspace-green-stack-starter.vercel.app/api/health) (e.g. at `/api/health`)  

> ⚛️ Since we're exporting a `graphResolver` function using `makeGraphQLResolver()`, we can generate a GraphQL endpoint for our resolver function as well:

`// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`

```shell-script
next-app:dev: -i- Successfully created resolver registry at: 
next-app:dev: ✅ packages/@registries/resolvers.generated.ts
```

`/api/graphql` will then use the `resolvers.generated.ts` barrel file to build its graphql API from.

[example >>> GraphQL](https://aetherspace-green-stack-starter.vercel.app/api/graphql) (e.g. in `/api/graphql`)

## Powerful results 💪

Performing these 6 steps has provided us with a bunch of value in little time:

- Hybrid UI component that is styled with tailwind, but actually native on iOS and Android
- Hybrid UI component that is optimized for SEO, media queries and Web-Vitals on Web
- Storybook documentation without having to explicitly create it ourselves
---
- 🤝 A single source of truth for all our props, args, responses, docs, types & defaults
---
- A Back-end resolver function we can call from other data resolvers or API routes
- A GraphQL API powered by Apollo-Server, with automatically inferred type definitions
- A Next.js powered REST API

## Learn more:

<p>
  <a href="https://dev.to/codinsonn/how-to-compete-with-elons-twitter-a-dev-perspective-4j64#:~:text=%27Move%20fast%20%26%20build%20things%27%20with%20Zod%2C%20Expo%20%26%20Next.js" target="_blank">
    <img alt="Intro Article on DEV" longdesc="Read the Intro Artical on DEV.to" src="https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" />
  </a>
</p>

- [Aetherspace Core Concepts](/packages/@aetherspace/core/README.md)
- [Single Sources of Truth for Front & Back-End with Zod](/packages/@aetherspace/schemas/README.md)
- [Styling your components with Tailwind for Web & Mobile](/packages/@aetherspace/styles/README.md)
- [Universal Routing with Expo and Next.js](/packages/@aetherspace/navigation/README.md)
- [Writing flexible data resolvers with Schemas](/packages/@aetherspace/navigation/AetherPage/README.md)
- [Automation based on Schemas: Storybook, GraphQL & More](/packages/@aetherspace/scripts/README.md)
