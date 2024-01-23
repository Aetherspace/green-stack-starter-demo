<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

# Aetherspace's Recommended Way of Working

> To get the best out of Aetherspace, we recommend a few conventions and workflows to follow.  
> These are not enforced, but will make your life as a full-product / universal app developer easier if you do.

These conventions **build upon, hook into, or even simplify** some of the **already existing conventions in the Next.js app dir and Expo Router.**  

The easiest way to opt in to these conventions is by using our [turborepo generators](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation), explained in further detail on this page:

- [1. Colocating code in `/features/` and `/packages/`](#1-colocating-code-in-features-and-packages)
- [2. Start with Single Sources of Truth](#2-start-with-single-sources-of-truth)
- [3. Use your schemas to create Resolvers and API's](#3-use-your-schemas-to-create-resolvers-and-apis)
- [4. Integrate resolvers with Universal Routes](#4-integrate-resolvers-with-universal-routes)

<p style={{ padding: "12px" }} />  

## 1. Colocating code in `/features/` and `/packages/` <a name="1-colocating-code-in-features-and-packages"></a>

Our **ultimate goal** is to **help you create a way of working that is as copy-pasteable as possible**, so that you can easily transfer full reusable (yet fully customisable) 'features' across codebases or between projects:

✅ Schemas, types and data models  
✅ Components, hooks, utils and styles  
✅ Universal routes and navigation  
✅ Data resolvers, REST and GraphQL API's  

> All at the ease of copy-pasting a workspace folder from one project to another.

### Workspace benefits?

💡 The added _benefit of using copy-paste over npm packages_ is that you can **easily make changes to the reusable code** in your project, **without having to publish a new version** of some package, possibly breaking usage in other / older projects when they update versions.

💡 The added _benefit of using a monorepo with copy pastable workspaces_, is that a workspace essentially works as a local package, **allowing you to easily import from other workspaces** in the same monorepo the same way you would with a published NPM package, yet edit it without ever impacting other projects.

Needless to say, if you still want to publish your workspaces as NPM packages, you can do that too. But we recommend you start with a monorepo workspace first, and only publish your workspaces when you're ready to share them with the world. 

💡 The added _benefit of using a monorepo with [turborepo](https://turbo.build/repo)_, is that it will help you optimise build steps and dependency management before publishing your workspaces as NPM packages, if you chose to go that route.

### Recommended workspace conventions

- Add workspaces under `features/` or `packages/` folders in your monorepo root
- Ensure they have a `package.json` file with a `name` and `version` field
- Use `packages/` for workspaces that are more generally reusable in other projects as well
- Use `features/` for workspaces that are likely a bit more specific to the type of project or industry you're building for
- Keep the `app-core/` workspace for your core features and _"glue" or "entrypoint" code that will never be reused_ elsewhere
- Organise workspace code in `components/`, `screens/`, `routes/`, `resolvers/`, `schemas/`, `hooks/` & `utils/` folders

> ▶ So, what's the easiest way to add a new workspace to your aetherspace monorepo? ▼▼

### `yarn ats add-workspace` - Create a new workspace

![add-workspace.png](/.storybook/public/add-workspace.png)

```shell-script
yarn workspace aetherspace run add-workspace # run in repo root to add a new workspace
```

```shell
>>> Modify "your-monorepo-name" using custom generators

? what type of workspace would you like to generate? # feature
? What foldername do you want to give this workspace? # some-feature
? What package name would you like to import from? (used for package.json) # @app/some-feature
? Optional: What will this workspace contain? (optional extra folder setup) # schemas, resolvers, components, screens, routes
? Optional: How would you shortly describe the package? (used for package.json) # An example generated feature workspace

Opening files in VSCode...
Running 'install' on workspace root

>>> Changes made:
  • /features/some-feature/package.json (add)
  • /features/some-feature/schemas/.gitkeep (add)
  • /features/some-feature/resolvers/.gitkeep (add)
  • /features/some-feature/components/.gitkeep (add)
  • /features/some-feature/screens/.gitkeep (add)
  • /features/some-feature/routes/.gitkeep (add)
  • Opened 1 files in VSCode (open-files-in-vscode)
  • Ran 'install' on workspace root (install)
```

<p style={{ padding: "12px" }} />  

## 2. Start with Single Sources of Truth <a name="2-start-with-single-sources-of-truth"></a>

As explained in [the Aetherschema documentation](/packages/@aetherspace/schemas/README.md), we recommend you use [Zod](https://zod.dev/) to define your data structures.  
Ideally, at an early stage of building a new feature.

### Why?

> Think about all the places you'd have to (__re__)define your **data structures** if you want certain things for your project:

✅ **Static type checks** and **in-editor hints**  
✅ **GraphQL** input and response **definitions**  
✅ **Resolver** input and response **validation**  
✅ **State hooks** and **form validation**  
✅ **Data models** and **database schemas**  
✅ **Defining defaults** for fields that are missing  
✅ **Documentation** and **field descriptions** for components / APIs  

_The more places you need to define data structure in, the more likely you'll eventually make a mistake or forget to update one of them._  

Even _if_ you don't run into issues immediately, it _is_ a lot of boring work to maintain and have to think about.

### The benefits of using 'Single Sources of Truth'

> Now imagine you could define the shape of all of these **in one place, one time.** Instead of 5 or more.

💡 The added _benefit of using [Single Sources of Truth in Aetherspace](/packages/@aetherspace/schemas/README.md)_, is that our way of working facilitates **easy derivation of all other shape definitions** from your schema validator, **without having to maintain them separately**.

💡 The added _benefit of using Zod as a basis and validator_, is that it is **built with Typescript in mind**. Anything you can do in typescript, you can do in Zod (and by extension Aetherspace schemas) as well.

💡 The added _benefit of using `aetherSchema`, as a superset of `ZodObject`_, is that it **allows us to deeply introspect the schema**. Through this introspection, we can generate all other definitions from it, **and build time-saving automations & utils on top of them**.

> **All it takes is importing `z` and `aetherSchema` from `'aetherspace/schemas'` instead of `'zod'`.**

### Recommended schema conventions

- Add schemas under `schemas/` folder in your feature or package workspace
- Import `z` and `aetherSchema` from `'aetherspace/schemas'`
- Use `aetherSchema()` instead of `z.object()` to define your schema and provide it with a name as the first argument

> ▶ _So, what's the easiest way to add a new schema to a workspace?_ ▼▼

### `yarn ats add-schema` - Create a new 'Single Source of Truth'

![add-schema.png](/.storybook/public/add-schema.png)

```shell-script
yarn workspace aetherspace run add-schema # run in repo root to add a new schema
```

```shell
>>> Modify "your-monorepo-name" using custom generators

? Where would you like to add this schema? # features/some-feature  --  importable from: '@app/some-feature'
? What is the schema name? # SomeData
? Optional description: What data structure does this schema describe? # Some essential data in 'some-feature'
? Optional examples: Would you like to add any common field definitions? # id, slug

Opening files in VSCode...

>>> Changes made:
  • /features/some-feature/schemas/SomeData.ts (add)
  • Opened 1 files in VSCode (open-files-in-vscode)
```

<p style={{ padding: "12px" }} />  

## 3. Use your schemas to create Resolvers and API's <a name="3-use-your-schemas-to-create-resolvers-and-apis"></a>

> Once you've defined your single sources of truth for data structures, you can use them to generate resolvers and APIs:

✅ A reusable function that **validates and parses** args & responses  
✅ A **REST API** that **maps to a URL path**  
✅ A **GraphQL API** that **maps to a query or mutation**  

If you think about it, **a resolver is essentially a function that takes in some input, and returns some output.**

> So, if you have a schema that defines the input and output of a resolver, you can **generate the skeleton of that resolver and API from the schemas**.

### The benefits of using `aetherResolver()`?

Any sort of mapping of `context`, `query` params, POST request `body` or headers to a set of expected arguments (from our schema), are extra steps that can be abstracted away.

💡 The added _benefit of using the `aetherResolver()` helper_, is that it ties together a schema for the args & response with the function that executes the business logic. This way we automatically have types and validation for the resolver args/response, and can generate the API from it.

💡 The added _benefit of tying your args and response to a sort of `DataBridge` description object_, is that even if the resolver that uses it contains server-only logic, if the object itself is exported from another file, that file can be used in the client and in other automations as well.

💡 The added _benefit of having a reusable resolver "bundle" like that_, is that we can easily generate an executable GraphQL schema from it. Fully avoiding the need to define a GraphQL SDL schema or query string for the resolver manually.

### Recommended resolver conventions

- Export a descriptive `{SomeName}DataBridge` object from the `{workspace}/schemas/` folder, so it can be used in the resolver (and elsewhere)
- Ensure the `{SomeName}DataBridge` object contains `argsSchema` and `responseSchema`, as well as the `resolverName`
- Add resolvers under `resolvers/` folder in your feature or package workspace
- Import `aetherResolver` from `'aetherspace/utils/serverUtils'` and use it to wrap your resolver function
- Provide your `DataBridge` as the second argument to `aetherResolver()`
- Use utils like `parseArgs()`, `withDefaults()`, ... provided by `aetherResolver()` to help with common resolver logic
- Import your resolver in your desired path under `{workspace}/routes/api/...` 
- Export `graphResolver` and wrap your resolver with `makeGraphQLResolver()` to add it to the GraphQL API
- Export `GET`, `POST`, `PUT`, `DELETE` or `PATCH` with `makeNextRouteHandler()` to add it to the REST API

> ▶ _So, what's the easiest way to add a new resolver to a workspace?_ ▼▼

### `yarn ats add-resolver` - Create a new resolver from args & response schemas

![add-resolver.png](/.storybook/public/add-resolver.png)

> Note: Because the generator notices that the `SomeData` schema already exists according to our conventions, it will be a selectable option in the generator. The schema picker in this generator prompt also functions as an 'autocomplete', so you can type to filter the list of known schemas in your monorepo to find the specific one you're looking for.

```shell-script
yarn workspace aetherspace run add-resolver # run in repo root to add a new resolver
```

```shell
>>> Modify "your-monorepo-name" using custom generators

? Where would you like to add this resolver? # features/some-feature  --  importable from: '@app/some-feature'
? What will you name the resolver function? (e.g. "doSomething") # updateSomeData
? Optional description: What will this data resolver do? # Update some data
? Will this resolver query or mutate data? # Mutation >>> for adding / updating / deleting data
? What would you like to generate linked to this resolver? # GraphQL mutation, POST & PUT route, Typed formState hook
? Which schema should we use for the resolver arguments? # @app/some-feature - SomeData
? Which schema should we use for the resolver response? # @app/some-feature - SomeData
? What API path would you like to use for REST? # /api/some/data/[id]
? What should the form hook be called? # useSomeDataFormState

Running 'collect-resolvers' script from '@aetherspace' workspace...
Running 'link-routes' script from '@aetherspace' workspace...
Opening files in VSCode...

>>> Changes made:
  • /features/some-feature/schemas/UpdateSomethingDataBridge.ts (add)
  • /features/some-feature/resolvers/updateSomeData.ts (add)
  • /features/some-feature/routes/api/some/data/[id]/route.ts (add)
  • /features/some-feature/forms/useSomeDataFormState.ts (add)
  • Ran 'collect-resolvers' script from '@aetherspace' workspace (collect-resolvers)
  • Ran 'link-routes' script from '@aetherspace' workspace (link-routes)
  • Opened 3 files in VSCode (open-files-in-vscode)
```

<p style={{ padding: "12px" }} />  

## 4. Integrate resolvers with Universal Routes <a name="4-integrate-resolvers-with-universal-routes"></a>

> With your workspace, schemas and resolvers in place, we can now hook them up to our UI for data-fetching:

✅ Automate away the need to manually (**re**)define routes for **Expo Router** and **Next.js**  
✅ Set up your screen to fetch data from **from your GraphQL API**  
✅ Integrate with typed form state management hooks for **your data resolver args schemas**  

### Recommended universal route conventions

- Add screens under `screens/` folders in your feature or package workspaces
- Configure screens to hook into a GraphQL query by using `createDataBridge` to extend the resolver `DataBridge`
- Call `useAetherRouteData(props, screenConfig)` to merge component props with data fetching for typed component data
- Add routes just once under `routes/` folders in your feature or package workspaces
- Make sure your `route.ts` file uses the `<AetherPage>` component to wrap your screen component, and pass it the `screenConfig` to it

> ▶ _So, what's the easiest way to add a new universal route to a workspace?_ ▼▼

### `yarn ats add-route` - Create a new universal route

![add-route.png](/.storybook/public/add-route.png)

> Note: If your query resolvers apply our conventions, it will allow you to pick them to automatically integrate in your route. If you don't have any resolvers yet, or don't need to do data fetching at all, you can still create a route and add a resolver, or just integrate with a query later.

```shell-script
yarn workspace aetherspace run add-route # run in repo root to add a new route
```

```shell
>>> Modify "your-monorepo-name" using custom generators

? Where would you like to add this new route? # features/some-feature  --  importable from: '@app/some-feature'
? What should the screen component be called? # SomeScreen
? What url do you want this route on? # /some-screen/[id]
? Would you like to fetch initial data for this route from a resolver? # @app/some-feature >>> getSomeData()

Running 'link-routes' script from '@aetherspace' workspace...
Opening files in VSCode...

>>> Changes made:
  • /features/some-feature/screens/SomeScreen.tsx (add)
  • /features/some-feature/routes/some-screen/[id]/index.tsx (add)
  • Ran 'link-routes' script from '@aetherspace' workspace (link-routes)
  • Opened 2 files in VSCode (open-files-in-vscode)
```

<p style={{ padding: "12px" }} />  

---

# Automations, designed for copy-paste ⚙️  

---

> Codegen in Aetherspace is focused on keeping your internal features and packages folders as transferrable between projects as possible. Therefore, it is limited to do only a few things:  

- [Turborepo generators](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation) for easy creation of new schemas, resolvers and routes per workspace (as described above this section)
- Deduplicating file-based conventions (linking from modules to next.js & expo-router app dirs)
- Creating barrel files to act as "registries" (abstracting imports and module linking)

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

Most of these scripts contain 2 simple steps to create their results:
1. Collect all relevant filePaths with `glob`
2. Analyse, filter & generate template code from their file contents

Some examples of what these scripts enable:
- File based routing for Next.js & Expo right from your feature / package modules -- with `yarn link-routes`
- Automatic Storybook docgen for all components in the monorepo -- with `yarn document-components`
- GraphQL from your resolvers & schema files -- with `yarn collect-resolvers`
- Asset and Icon management through registries -- with `yarn collect-assets` and `yarn collect-icons`

## Deduplicated Routing between Expo & Next.js

> To facilitate routing in both Expo and Next.js's app dir, each workspace can define it's own navigation structure in a /workspace/routes/ folder. For example:  

```shell
│── features/
│   └── {my-feature}/
│       └── components/ # ➡️ Molecules / Atoms / Common UI used in 'screens/'
│       └── screens/ # ➡️ Page templates used in App.tsx and next.js 'app/' directory
│       └── ...
│       └── routes/ # ➡️ Write-once routing for both web & mobile (see 'app/(generated)/' in expo & next)
│           └── blog/
│               └── [slug].tsx # 👉 Will be available at '/blog/[slug]' in Expo + Next
│           └── api/
│               └── blog/
│                   └── [slug]/
│                       └── route.ts # 👉 Next.js API route at '/api/blog/[slug]'
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

## Workspace helpers

To check for missing env vars and automate which workspaces need transpilation in Next.js, we designed the `check-workspaces` script:

```shell-script
yarn check-workspaces
```

It will:
- Warn you of missing env vars per workspace
- Warn you of missing related dependencies per workspace
- Created a `transpiledWorkspaces.generated.js` file at `/packages/@registries/` for use in Next.js config

If run manually, it'll also update the env vars and related workspaces it checks for in package.json files per workspace

## Turborepo Generators

To skip the boilerplate and get straight to the fun stuff, we've created a few interactive generators to help you get started:

```shell
yarn ats add-route # add a new route to your expo and next.js apps
yarn ats add-workspace # add a new feature or package to your monorepo
yarn ats add-schema # add a new schema to a workspace of your choosing
yarn ats add-resolver # add a new data resolver to your REST & graphql API
```

> And more to come soon 👀

### Autocomplete Quick Tip:

If you plan on running any of the scripts or generators manually, especially if you're using autocomplete in your terminal (e.g. using [fig](https://fig.io/)) you may want to add the following to your `~/.bashrc` or `~/.zshrc`:

```shell-script
# Aetherspace
alias ats="yarn workspace aetherspace"
alias aether-cli="yarn workspace aetherspace"
```

Simply typing `ats ` will then autocomplete all the available scripts and generators for you. No more need to remember the exact script name or even specify yarn or the workspace manually.

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

## Other Recommendations

### Terminal autocomplete with Fig

If you're using a terminal autocomplete tool like [fig](https://fig.io/), you may want to add the following to your `~/.bashrc` or `~/.zshrc`:

```shell-script
# Aetherspace
alias ats="yarn workspace aetherspace" # Will autocomplete available scripts and generators from 'packages/aetherspace'
```

### Doppler for managing secrets

> We recommend [doppler](doppler.com) for managing and syncing secrets or env vars between services. You can find more information on how to set this up at [the doppler docs](https://docs.doppler.com/docs/github-actions).  

<p style={{ padding: "12px" }} />  

# Recommended plugins

While the template itself already covers a lot of ground, we absolutely recommend you check out our mergeable plugin branches as well.

You can include them when forking the repo from the official template:

![GithubTemplateRepoWithPlugins.png](/.storybook/public/GithubTemplateRepoWithPlugins.png)

> [Learn more](/.storybook/plugins/README.md) about the [available plugins](/.storybook/plugins/README.md) and how to apply them using git.

<p style={{ padding: "12px" }} />  

## Next steps:

- **[Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)**

## Previously:

- [Aetherspace Core Concepts](/packages/@aetherspace/core/README.md)

## Learn more:

- [Managing Universal Routes in Aetherspace](/packages/@aetherspace/navigation/README.md)
- [Managing Icons in GREEN stack Expo + Next.js monorepos](/packages/@aetherspace/components/AetherIcon/README.md)
- [Deploy your web & mobile apps + documentation with Github Actions](/.github/workflows/README.md)
