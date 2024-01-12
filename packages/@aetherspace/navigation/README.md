# Universal Routing for Expo & Next.js

When combining React for Web and React-Native for Mobile, navigation has always been one of the hardest problems to solve. Luckily, with file-based routing in both Next.js, -and more recently, Expo-Router, we can provide an easy way to **manage your routes on the workspace level**:  

```shell
/some-workspace/
└── /screens/ # ➡️ Page UI components used in /routes/ 👇
└── /routes/ # ➡️ Routing linked to expo & next.js app-dir using scripts
    └── about/
        └── index.tsx # ➡️ Will be available at '/about' in Expo + Next
        └── [slug]/
            └── index.tsx # ➡️ Will be available at '/blog/[slug]' in Expo + Next
    └── api/ # ➡️ Houses all API routes, copied to next.js app dir using a script
```

## Using the Route Generator (Recommended)

By far the easiest way to add a new route (and possibly integrate with a data fetcher) is to use aetherspace's route generator:

```shell
yarn ats add-route
```

> The turborepo route generator will ask you some questions, like which url you’d like the route to have, and will generate the boilerplate screens and routes folders in the workspace of your choosing:

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

> As you can see, this 5 second generator has set us up with the boilerplate code required to create an Expo and Next.js route from when next starting up the server:

## The `/routes/` folders in workspaces explained:

> **To keep things as copy-pasteable, we believe each workspace should define their own routes.**

The easiest way to achieve this and make them available in both Expo and Next.js, is use an automation to link the `/routes/` folders in each workspace to the `/apps/expo/app/` and `/apps/next/app/` app dirs:

```shell
yarn ats link-routes # or just as part of running 'yarn dev' / your next.js app
```

> On app startup, or when running this command, aetherspace will look at what’s in your feature of package workspace’s `/routes/` folders and re-export it in both the `/apps/expo/app/` and `/apps/next/app/` app dirs.

For example:

```
│── features/
│   └── {my-feature}/
│       └── components/ ➡️ Molecules / Atoms / Common UI used in 'screens/'
│       └── screens/ ➡️ Page templates used in App.tsx and next.js 'app/' directory
│       └── ...
│       └── routes/ ➡️ Write-once routing for both web & mobile (see 'app/(generated)/' in expo & next)
│           └── blog/
│               └── [slug].tsx 👉 Will be available at '/blog/[slug]' in Expo + Next
│           └── api/
│               └── blog/
│                   └── [slug]/
│                       └── route.ts 👉 Next.js API route at '/api/blog/[slug]'
│
│── packages/
│   └── {my-package}/ 
│       └── ...
│       └── routes/
│           └── ... 👉 Each module can define their own screen or API routes
│               └── ... ➡️ BUT: Only apply fs routing filename conventions as Next.js
```

```shell
# Example 'yarn dev' or 'yarn ats link-routes' output:
-----------------------------------------------------------------
-i- Auto linking routes with 'yarn link-routes' ...
-----------------------------------------------------------------
 ✅ /bio/   -- Generated from "../../features/app-core/routes/bio/index.tsx"
      └── /apps/expo/app/(generated)/bio/index.tsx
      └── /apps/next/app/(generated)/bio/page.tsx
 ✅ /   -- Generated from "../../features/app-core/routes/index.tsx"
      └── /apps/expo/app/(generated)/index.tsx
      └── /apps/next/app/(generated)/page.tsx
 ✅ /links/   -- Generated from "../../features/app-core/routes/links/index.tsx"
      └── /apps/expo/app/(generated)/links/index.tsx
      └── /apps/next/app/(generated)/links/page.tsx
 ✅ /cv/[slug]/   -- Generated from "../../features/cv-page/routes/cv/[slug]/index.tsx"
      └── /apps/expo/app/(generated)/cv/[slug]/index.tsx
      └── /apps/next/app/(generated)/cv/[slug]/page.tsx
 ✅ /cv/   -- Generated from "../../features/cv-page/routes/cv/index.tsx"
      └── /apps/expo/app/(generated)/cv/index.tsx
      └── /apps/next/app/(generated)/cv/page.tsx
 ✅ /bio/[slug]/   -- Generated from "../../features/links-page/routes/bio/[slug].tsx"
      └── /apps/expo/app/(generated)/bio/[slug]/index.tsx
      └── /apps/next/app/(generated)/bio/[slug]/page.tsx
--- 

 ✅ /api/aetherspace/commerce/shopify/products/   -- API Route from "../../packages/@aetherspace-commerce/routes/api/aetherspace/commerce/shopify/products/route.ts"
      └── /apps/next/app/(generated)/api/aetherspace/commerce/shopify/products/route.ts
 ✅ /api/graphql/   -- API Route from "../../features/app-core/routes/api/graphql/route.ts"
      └── /apps/next/app/(generated)/api/graphql/route.ts
 ✅ /api/health/   -- API Route from "../../features/app-core/routes/api/health/route.ts"
      └── /apps/next/app/(generated)/api/health/route.ts
 ✅ /api/bio/[slug]/   -- API Route from "../../features/links-page/routes/api/bio/[slug]/route.ts"
      └── /apps/next/app/(generated)/api/bio/[slug]/route.ts
```

## Filename conventions for routes:

The filename conventions for routes are based on Next.js file conventions, but for the relevant parts, also apply to Expo-Router:
- [https://nextjs.org/docs/app/api-reference/file-conventions](https://nextjs.org/docs/app/api-reference/file-conventions)
- [https://expo.github.io/router/docs/features/routing](https://expo.github.io/router/docs/features/routing)

The main difference is that you define the routes on a workspace level in different `/routes/` folders in `/features/` or `/packages/` workspaces.

Again, we specifically chose this way of working to allow you to copy-paste the entire feature or package between projects, while still having the routes become automatically available in both the Expo and Next.js targets of the project you just pasted to.

> Read more on recommended folder structure and our "Design for Copy-Paste" methodology in the [Core Concepts](/packages/@aetherspace/core/README.md) page.

## Linking and Front-End Navigation

Use `AetherLink` from `aetherspace/navigation` to link to a route in your app:

```tsx
import { Link } from 'aetherspace/nagivation'

// e.g. for a '/bio/[slug]' route which could be defined at e.g '/{workspace}/routes/bio/[slug].tsx'

<Link to="/bio/codinsonn">
     View links in bio page
</Link>
```

## Accessing the route parameters

In Screens, you can access the route parameters via the `useRoute` hook from `aetherspace/navigation`:

```tsx
import { useAetherRouteData } from 'aetherspace/navigation'

const [/*screenData*/, { params }] = useAetherRouteData(props, screenConfig)
console.log(params.slug) // -> 'codinsonn' for e.g. '/bio/codinsonn' if route is defined as '/bio/[slug]'
```

If you're wondering what the `screenConfig` should contain, how you should feed data to your screens or are wondering how to access API route parameters, we suggest you continue by reading our docs on [GraphQL and Data-Fetching](/packages/@aetherspace/navigation/AetherPage/README.md) or the [Recommended way of working](/packages/@aetherspace/scripts/README.md).

## Learn more about Aetherspace:

- [Styling your components and screens with Tailwind](/packages/@aetherspace/styles/README.md)
- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Getting data from GraphQL into your Screens](/packages/@aetherspace/navigation/AetherPage/README.md)
- [Aetherspace Core Concepts for cross-platform success](/packages/@aetherspace/core/README.md)
- [Recommended way of working](/packages/@aetherspace/scripts/README.md)
