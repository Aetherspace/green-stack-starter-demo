# Universal Routing for Expo & Next.js

When combining React for Web and React-Native for Mobile, navigation has always been one of the hardest problems to solve. Luckily, with file-based routing in both Next.js, -and more recently, Expo-Router, we can provide an easy way of managing your routes:  

## Easy Mode — Using the Route Generator

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

```shell
yarn ats link-routes # or just as part of 'yarn dev'
```

> Either way, our (startup) script will essentially link what’s in your feature of package workspace’s `/routes/` folder and re-export it in both the `/apps/expo/app/` and `/apps/next/app/` app dirs.

> **This allows each workspace to define their own routes, yet still make them available in both Expo and Next.js**

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

 ✅ /   -- Head from "../../features/app-core/routes/head.tsx"
      └── /apps/next/app/(generated)/head.tsx
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

## Learn more about Aetherspace:

- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Getting data from GraphQL into your Screens](/packages/@aetherspace/navigation/AetherPage/README.md)
- [Automation based on Single Sources of Truth and the File System](/packages/@aetherspace/scripts/README.md)
