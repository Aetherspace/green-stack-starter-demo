# Automations, designed for copy-paste ⚙️

> Codegen in Aetherspace is focused on keeping your internal features and packages folders as transferrable between projects as possible. Therefore, it is limited to do only a few things:  

- Creating barrel files, as registries (abstracting imports and module linking)
- Deduplicating file-based conventions (from modules to next.js app dir & expo-router app dir)
- Turborepo generators for easy creation of new routes, schemas and data-resolvers

The `packages/@registries` folder contains the results of all the automation scripts defined at `packages/@aetherspace/scripts`. These scripts are automatically run in development mode from the `withAutomation()` plugin in `apps/next/next.config.js`.

Alternatively, you can run the automation scripts manually from the root of the project:

```shell-script
yarn ats {automation-script-name}

# OR, if you need to rebuild scripts after an edit to the @aetherspace package:

yarn link-routes # runs `packages/@aetherspace/scripts/link-routes.js`
yarn collect-icons # runs `packages/@aetherspace/scripts/collect-icons.js`
yarn collect-assets # runs `packages/@aetherspace/scripts/collect-assets.js`
yarn collect-resolvers # runs `packages/@aetherspace/scripts/collect-resolvers.js`
yarn document-components # runs `packages/@aetherspace/scripts/document-components.js`
```

## Explaining the magic

Most of these scripts contain of 2 steps to create their results:
1. Collect all relevant filePaths with `glob`
2. Analyse, filter & generate template code from their file contents

Some examples of what these scripts enable:
- File based routing for Next.js & Expo right from your feature / package modules
- Automatic Storybook docgen for all components in the monorepo
- GraphQL from your resolvers & schema files
- Asset and Icon management through registries

## Deduplicated Routing between Expo & Next.js

> To facilitate routing in both Expo and Next.js's app dir, each workspace can define it's own navigation structure in a /workspace/routes/ folder. For example:  

```shell
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

To run the automation that generates the routes from your /routes/ folders in packages or feature workspaces:

```shell
yarn link-routes # = run it manually

# - OR -

yarn dev # as part of next.js config automation scripts
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

Enable automatic route generation from modules by adding this to `next.config.js`

```js
const withAutomation = () => {
  // -i- Rebuild routing from '/routes/' folders in '/features/' & '/packages/'
  require('aetherspace/scripts/link-routes')
}
```

## Automagic Storybook docgen ✨

The `packages/@registries/docs` folder contains automatically generated `.stories.mdx` files for all the components hooking into the automation.

```shell-script
yarn document-components
```

**Enable automatic documentation for your component by:**

1. Making sure your component filename ends in `.tsx`
2. Providing a named or default export matching the filename
3. Component defines its prop structure or types with `aetherspace/schema`
4. File exports a `getDocumentationProps` schema object

`next.config.js`

```js
const withAutomation = () => {
    // -i- Clear out previously autogenerated docs folder so it can be rebuilt from scratch
    require('aetherspace/scripts/documentation-reset')
    // -i- Autogenerate documentation for all components hooking into the automation script
    // -i- Enable by exporting a 'getDocumentationProps' object or function from a component
    require('aetherspace/scripts/document-components')
}
```


## GraphQL from the filesystem 📁

The `resolvers.generated.ts` file contains a modularised list of all API resolvers hooking into this automation.

The `collect-resolvers` script builds this barrel module by analysing all api handlers matching `/apps/next/**/api/**/*.ts`.

```shell-script
yarn collect-resolvers
```

The generated barrel file is then used in our graphql API route to hook up the resolvers to the Apollo GraphQL server, essentially _generating a GraphQL schema and API from the filesystem_.

**The script only picks up resolvers that:**
- use `aetherspace/schema`
- are located in `apps/next/**/api/**/*.ts`
- wrap their resolver function with `aetherResolver()`

`next.config.js`

```js
const withAutomation = () => {
    // -i- Build 'packages/@registries/resolvers.generated.ts':
    // -i- Turns all REST api paths built with aetherResolver into GraphQL resolvers as well
    require('aetherspace/scripts/collect-resolvers')
}
```

## Turborepo Generators

To skip the boilerplate and get straight to the fun stuff, we've created a few interactive generators to help you get started:

```shell
yarn ats add-route # add a new route to your expo and next.js apps
yarn ats add-workspace # add a new feature or package to your monorepo
yarn ats add-schema # add a new schema to a workspace of your choosing
yarn ats add-resolver # add a new data resolver to your REST & graphql API
```

> And more to come soon 👀

## Relative 'src' strings for Expo images 📸

The `assets.generated.ts` file contains a modularised list of all assets located under `apps/next/public/` folder. The `collect-assets` script turns the img file paths into export keys for those resources.

```shell-script
yarn collect-assets
```

Our expo app then supplies this barrel module of assets to the `AetherContextManager` so that the `AetherImage` primitive can use it to resolve the assets. This enables `AetherImage` to use the `src` prop with relative paths the same way an `img` tag would.

**To hook into this automation:**

1. Add any assets to `apps/next/public/**/*`
2. Ensure the following is uncommented or present in your next.js config

`next.config.js`

```js
const withAutomation = () => {
    // -i- Build 'packages/@registries/assets.generated.ts':
    // -i- Makes regular img src paths like on the web work for AetherImage in Expo
    require('aetherspace/scripts/collect-assets')
}
```

## Learn more:

- [Managing Routes in Aetherspace](/packages/@aetherspace/navigation/README.md)
- [Managing Icons in GREEN stack Expo + Next.js monorepos](/packages/@aetherspace/components/AetherIcon/README.md)
- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Deploy your web & mobile apps + documentation with Github Actions](/.github/workflows/README.md)
