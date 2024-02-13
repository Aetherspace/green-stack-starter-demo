<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

# GREEN stack starter for Full-Product Universal Apps

<p>
  <a href="https://aetherspace-green-stack-starter.vercel.app/">
    <img alt="Supports Next.js" longdesc="Supports Next.js" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  </a>
  <a href="https://aetherspace-green-stack-starter.vercel.app/">
    <img alt="Supports Vercel Deployments" longdesc="Supports Vercel Deployments" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://aetherspace-green-stack-starter.netlify.app/">
    <img alt="Supports Netlify Deployments" longdesc="Supports Netlify Deployments" src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app">
    <img alt="Test in Expo GO" longdesc="Test in Expo GO" src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=for-the-badge&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=for-the-badge&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <a href="https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/readme-md--page">
    <img alt="Docs with Storybook" longdesc="Documented with Storybook" src="https://img.shields.io/badge/-Read_the_Docs-FF4785?style=for-the-badge&logo=storybook&logoColor=fff" />
  </a>
</p>

> This project was bootstrapped with the demo version of [Aetherspace](https://github.com/sponsors/codinsonn), the Evergreen repo setup for all your **full-product, universal app** development needs \{...💚\} Enabling the project to be built for Web, iOS, Android, PWA, Static, SSR, API routes and GraphQL at write-once efficiency, while also documenting your code automatically with Zod & Storybook.

<p style={{ padding: "4px" }} />  

---

<details>
  <summary><b>✅ Aetherspace, GREEN stack & template benefits? 🚀</b></summary>

---

# Aetherspace - GREEN stack starter template for cross platform React app development

> 🐦 [Anouncement post](https://dev.to/codinsonn/how-to-compete-with-elons-twitter-a-dev-perspective-4j64)  
> ⚡️ [Quickstart example](https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/aetherspace-quickstart--page)  
> 📚 [Core Concepts](/packages/@aetherspace/core/README.md)

### Table of contents

💚 - [What is the GREEN stack?](#what-is-the-green-stack)  
🚀 - [What is Aetherspace?](#what-is-aetherspace)  
🤖 - [Why start with a turbo/monorepo?](#why-turborepo)  
📁 - [File structure and installing new packages.](#package-management)  
👾 - [Benefits and next steps.](#benefits-next-steps)  
🤷‍♂️ - [When _not_ to use the GREEN stack.](#when-not-to-use-green-stack)  
📚 - [Relevant Docs.](#relevant-docs)

## What the hell is the GREEN stack? 💚 <a name="what-is-the-green-stack"></a>

In short GREEN stands for these 5 core technologies:

- **G**raphQL for typed and self documenting APIs
- **R**eact & React-Native for write-once UI
- **E**vergreen components (extendable, themable, with docs & types)
- **E**xpo for easy mobile development, deployment and testing
- **N**ext.js for web, SEO, Static & Server rendering, API & Web-Vitals

The core idea is writing your app code or features just once with Typescript and React-Native, yet make it available on any platform or device without double implementations or the need for different development teams.

## How does 'Aetherspace' help, exactly? 🚀 <a name="what-is-aetherspace"></a>

> Think of it as Unity for React Apps. Just like Unity aims to make cross console game development a lot easier for (indie) game devs, Aetherspace's setup for the GREEN stack aims to do the same for cross-platform app development.

### Core concepts

- Cross-platform from the start
- Take what works, make it better
- Single sources of truth
- Write once, use anywhere
- Documentation drives adoption

#### It helps you move fast, save time and deliver more

Aetherspace is an opinionated framework that fills in the gaps of working and building with the GREEN stack:

- How should I handle responsive design?
- How do I avoid web layout shift when react-native styling does not support media queries or classnames?
- How can I expose / read public env vars across multiple platforms?
- How do I take advantage of optimisations like `next/image` on web when that's not available in React-Native?
- What's the best way to style and animate my UI elements for both web and mobile?

Just to name a few.

While the stack itself is very powerful, figuring out how to get set up and do certain things in a write-once way can be frustrating and time consuming. To save you time figuring it all out on your own, _Aetherspace_ contains a bunch of packages, utils and best-practices to set you up for a quick and easy ride to cross-platform success.

## But why start with a turbo/monorepo? 🤖 <a name="why-turborepo"></a>

One annoying thing about figuring this stack out on your own is when packages you're using require custom configs for babel, webpack or otherwise. With Expo and Next.js, it often happens that updating e.g. a single `babel.config.js` used for both Expo and Next.js will fix usage on either, but then break the other.

Using a monorepo with different entry points for Next.js and Expo allows us to keep configs more separate, and therefore allow more confident updating of packages and configs without accidentally breaking other platforms.

In this starter template, we've opted to use turborepo with yarn workspaces. We'll list some basics in the next section, but for a deeper understanding please refer to their documentation for more info.

## 📁 File structure and package management 📦 <a name="package-management"></a>

This starter monorepo has three types of workspaces:

- `/apps/*` for all expo & next.js versions of your apps (consumes `'features'` 👇)
- `/features/*` features of your app, grouped together by feature name (consumes `'packages'` 👇)
- `/packages/*` for all shared dependencies / library code used in multiple apps or features

```
├── apps/
│   └── expo/ 👉 Where all Expo & mobile specific config for {app-name} lives
│       └── app.json ➡️ Expo app config (e.g. App name, icon, landscape / tablet support)
│       └── app/ ➡️ File-based Routing & Navigation Setup for mobile (using 'app-core/screens/')
│           └── (generated)/ ➡️ File based routing generated from `routes/` in features or packages
│               └── _layout.tsx ➡️ Root layout for all app screens (e.g. tab bar, drawer, etc.)
│               └── index.tsx ➡️ Home & starting screen for the app
│       └── babel.config.js ➡️ Babel transpilation config for Expo
│       └── index.js ➡️ Mobile entrypoint loader for App.tsx
│       └── metro.config.js ➡️ Metro bundler config for react-native
│       └── package.json ➡️ yarn-workspace config, lists core expo & react-native dependencies
│       └── tsconfig.json ➡️ Typescript config for Expo
│       └── webpack.config.js ➡️ Enables PWA browser testing with Expo (no SSR)
│
│   └── next/ 👉 Where all Next.js, Server & API config for {app-name} lives
│       └── public/ ➡️ favicon, app icons & other static assets (e.g. images & fonts)
│       └── app/ ➡️ File-based Routing & Navigation Setup for Web (using 'app-core/screens/')
│           └── (generated)/ ➡️ File based routing generated from `routes/` in features or packages
│               └── head.tsx ➡️ HTML wrapper for head & meta tags (+ SSR styles)
│               └── layout.tsx ➡️ Root layout for all web pages (e.g. headers / footers / nav)
│               └── page.tsx ➡️ Web Homepage (e.g. using 'app-core/screens/HomeScreen.tsx')
│               └── api/ ➡️ directory based api routes (using 'app-core/resolvers/')
│                   └── graphql.ts ➡️ GraphQL client from 'app-core/graphql/'
│       └── babel.config.js ➡️ Babel transpilation config for Next.js
│       └── next.config.js ➡️ Next.js config, modules to transpile & plugins to support
│       └── package.json ➡️ yarn-workspaces config, lists core next.js dependencies
│       └── tsconfig.json ➡️ Typescript config for Next.js
|
|── features/
│   └── app-core/ 👉 Where all core cross-platform code for {app-name} lives
│       └── components/ ➡️ Molecules / Atoms / Common UI used in 'screens/'
│       └── graphql/ ➡️ Shared code for the GraphQL API client (optional)
│       └── resolvers/ ➡️ Shared resolvers used in both in API routes or GraphQL API
│       └── screens/ ➡️ Page templates used in App.tsx and next.js's 'app/' directory
│       └── routes/ ➡️ Write-once routing for both web & mobile (see 'app/(generated)/' in expo & next)
│       └── package.json ➡️ config required by yarn-workspaces, lists dependencies that don't fit anywhere else
│   └── {app-feature}/ 👉 Code shared across apps, ideally same structure as 'features/app-core'
│       └── package.json ➡️ config required by yarn-workspaces, list dependencies specific to this feature
│
├── packages/
│   └── @aetherspace/ ➡️ Primitives, utils & helpers for working with the GREEN stack
│       └── schemas/ ➡️ A set of Zod powered schema utils for building single sources of truth
│   └── @config/ ➡️ list of ts & other configs to use / extend from in next or expo apps
│   └── {comp-lib}/ 👉 Code shared across apps, ideally same structure as 'features/app-core'
│       └── package.json ➡️ yarn-workspace config, list dependencies specific to this package
│
├── node_modules/ ➡️ Contains all modules for the entire monorepo
├── package.json  ➡️ Root yarn-workspaces configuration + helper scripts, core developer only dependencies
└── turbo.json  ➡️ Monorepo config, manages dependencies in build scripts + caching of tasks
```

> 💡 `{app-feature}`, `{app-name}` & `{comp-lib}` are just placeholders and you **can** have multiple of these

#### 📦 Keep your apps seperate with `/apps/*` & `/features/*` workspaces:

For every app you're building in this monorepo, you'll need a few folders:

- `/apps/next` - Entry for web where only next.js related config/setup for an app should live.
  Should list only core next.js related deps & polyfills.
- `/apps/expo` - Entry for mobile where only expo related config/setup for an app should live.
  Should list only core react-native and expo related deps.
- `/features/{app}-core` - Where most of your core app specific UI, logic and screens will live.
  Should list app dependencies not listed elsewhere.

In each of these folders there's a `package.json` file, where a `name` property should be specified to identify that workspace. This name can then be referenced during installs via e.g.

```shell-script
yarn workspace app add {package-name}
```

#### To install Expo modules for the specific Expo SDK you're using:

```shell-script
yarn expo-cli install {package-name}
````
Which will run `yarn workspace expo-app expo-cli install {package-name}` under the hood.

## 👾 Stack and Template benefits + Next steps 👾 <a name="benefits-next-steps"></a>

If you've read the sections above, It's likely the **ease** of use, **time saving** capabilities and **scalability** of this stack & template are clear.

The starter repo comes with some opinionated extra packages and abilities.  
Here's a list of what you can start doing out of the box:

- Link pages and screens cross platform with the `<Link>` component from `aetherspace/navigation`
- Use tailwind to style UI responsively on web / mobile with `<AetherView tw="sm:px-2">` / `tailwind-rn`
- Add illustrations or [icons with `react-native-svg`](/packages/@aetherspace/components/AetherIcon/README.md)
- Bring the power of GraphQL to JSON or REST apis with `aetherResolver()` and schemas as single sources of truth.
- Document your components and APIs with Storybook.
- Deploy to vercel by importing your repo in their UI ([view live example](https://aetherspace-green-stack-starter.vercel.app/))
- Deploy to netlify [via this guide](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/) ([view live](https://aetherspace-green-stack-starter.netlify.app/))

Possible next steps:
- Animate UI elements with `react-native-reanimated` or `moti`
- Add auth with [AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/) ([Expo Examples](https://docs.expo.dev/guides/authentication/))

## 💼 Why this makes sense from a user, dev & business perspective <a name="why-this-makes-sense-from-a-business-perspective"></a>

**For users:**
- Solutions built for how they prefer to use software, whether that's on a phone, tablet or desktop.
- Can share any page or feature with a link, which will open in the correct app or browser.
- Full feature parity across all platforms.

**For developers:**
- Write-once UI, logic, routing, data fetching & resolvers
- Easily onboard new devs to the project with auto-generated Storybook docs
- Save time & reduce risk by defining data structure once, instead of 4 times for types, graphql, docs & validation

**For businesses:**
- Speed and flexibility to build/update features and pages for any platform.
- Reach more users by being available on more devices.
- Free organic leads from web SEO, which you can easily guide to mobile where higher conversions happen.

> Whether you're a startup or established company, having both web and mobile apps is a great competitive advantage. There are many stories of market leaders suddenly being overtaken because the competition were able to move faster or had more devices their solution was available on for their customers.

This stack makes it near effortless to enable extra platforms. It helps keep teams small and enables them to move fast when building new pages or features for phones, tablets and/or the web.

**More deliverables for less time invested in turn means flexibility in one or more of these areas:**

- ... negotiation room about budget or deadlines (in case of client work)
- ... 💰 to be distributed among the entire team
- ... 🕗 available for experimentation
- ... budget available to market the product

<details>
<summary>Show full 🕗🕗 to 💰💰💰 Comparison</summary>

---

Let's talk Return on Investment:

> 🕗 = time required = devs / teams / resources invested  
> 💰 = deliverable sale value = costs to build + profit margin  
> ROI = 🕗 -> _sold for_ -> 💰

Web only project ROI = 🕗🕗 -> 💰💰

- 🕗 Web Front-End 💰
- 🕗 General Back-End (REST / GraphQL + Templates / SSR) 💰

Native iOS + Android project ROI = 🕗🕗🕗 -> 💰💰💰

- 🕗 iOS App with Swift 💰
- 🕗 Android app with Java 💰
- 🕗 API Back-End (REST / GraphQL) 💰

React-Native Mobile App ROI = 🕗🕗 -> 💰💰 to 💰💰💰

- 🕗 iOS + Android App with RN 💰(💰)
- 🕗 API Back-End (REST / GraphQL) 💰

Expo Mobile + PWA ROI = 🕗🕗 ->💰💰 to 💰💰💰💰

- 🕗 iOS + Android + PWA with Expo & RN (Web without SSR) 💰(💰💰)
- 🕗 API Back-End (REST / GraphQL) 💰

> Now, things get _really_ interesting when you try to compare full cross-platform apps

Full Cross Platform with Separate Dev Teams ROI = 🕗🕗🕗🕗🕗🕗🕗 -> 💰💰💰💰💰💰💰

- 🕗 Web Front-End 💰
- 🕗 iOS App with Swift 💰
- 🕗 Android app with Java 💰
- 🕗 Windows App Dev Team 💰
- 🕗 MacOS App Dev Team 💰
- 🕗 Linux App Dev Team 💰
- 🕗 API Back-End (REST / GraphQL) 💰

Full Cross Platform with GREEN stack ROI = 🕗🕗 -> 💰💰 to 💰💰💰💰💰💰💰

- 🕗 Web (PWA & SSR & Web Vitals) + iOS + Android + Windows + MacOS + Linux 💰(💰💰💰💰💰)
- 🕗 Back-End (REST + GraphQL + SSR + Static Exports + ISSG + universal JS utils thanks to Next.js) 💰

**Key takeaway: Always build or upsell more platforms / devices the app could run on**

</details>

## When not to use the GREEN stack? 🤷‍♂️ <a name="when-not-to-use-green-stack"></a>

The GREEN stack is unlikely to be the best fit when your project...

- ... will always be web only 👉 Use `next.js`
- ... will always be mobile only 👉 Use `Expo`
- ... will always be desktop only 👉 Use `Electron` + `React` / `Vue` / `Svelte`
- ... is very Bluetooth / AR / VR / XR heavy 👉 Go native with `Swift` / `Java`
- ... is not using React 👉 Use `Svelte` / `Vue` + `Ionic`
- ... has no real need for Server Rendering, SEO or Web-Vitals 👉 Use `Expo` (+ Web Support)
- ... is using React, but the project is too far along and has no budget, time or people to refactor 🤷‍♂️

If your project has required dependencies / SDKs / libraries that are either not available in JS, are not extractable to API calls or cannot function cross-platform, this may also not be a good solution for your use-case\*.

```
🛠 * However, for JS libs, you could always try adding cross platform support yourself with `patch-package`
```

## 📚 Further reading / Relevant docs: <a name="relevant-docs"></a>

- [Expo](https://docs.expo.dev/), [React Native](https://reactnative.dev/docs/getting-started), [Expo-Router docs](https://expo.github.io/router/docs/)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), [Turborepo docs](https://turborepo.org/docs)
- [Next.js](https://nextjs.org/docs/getting-started), [app-directory](https://beta.nextjs.org/docs/getting-started), [React-Native-Web docs](https://necolas.github.io/react-native-web/docs/)
- [Apollo Server docs](https://www.apollographql.com/docs/apollo-server/)

## Frequently Asked Questions 🤔

#### What's the benefit of using this over X-solution?

See the [Core Concepts](/packages/@aetherspace/core/README.md) section

#### How can I apply the same navigation and deeplinks between web and mobile?

Deeplinks on mobile come out of the box with Expo-Router, which Aetherspace's [Universal Routing](/packages/@aetherspace/navigation/README.md) uses under the hood.

#### How does automatic docgen work?

See the README on [Automation](/packages/@aetherspace/scripts/README.md) or the [Anouncement post](https://dev.to/codinsonn/how-to-compete-with-elons-twitter-a-dev-perspective-4j64) 

#### How should I manage my icons?

See the [Icon Management](/packages/@aetherspace/components/AetherIcon/README.md) README

#### I have a question about the license.

Check out the [License](/LICENSE.md) and its FAQ section.

---

<p>
    <a aria-label="sponsor @codinsonn on Github for full access" href="https://github.com/sponsors/codinsonn">
        <img src="https://img.shields.io/static/v1?label=Sponsor&style=for-the-badge&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" target="_blank" />
    </a>
    <a aria-label="the aetherspace green stack starter is free to use for some, but paid for professional use." href="/LICENSE.md" target="_blank">
        <img align="right" alt="License: MIT" src="https://img.shields.io/badge/Licence-Custom-green?style=for-the-badge" target="_blank" />
    </a>
</p>

</details>

---

<p style={{ padding: "4px" }} />  

### Getting started ⚡️

Generate a new repo from the [Aetherspace template](https://github.com/Aetherspace/green-stack-starter-demo) and (optionally) include all branches.

![GithubTemplateRepo.png](/.storybook/public/GithubTemplateRepo.png)

![GithubTemplateRepoWithPlugins.png](/.storybook/public/GithubTemplateRepoWithPlugins.png)

Set this repo as the upstream if you want to include the git commit history:

```
git remote add upstream git@github.com:Aetherspace/green-stack-starter.git
git fetch upstream
git pull --rebase upstream main
```

Install packages: `yarn install`

Run on web & mobile: `yarn dev`

Run with Storybook docs: `yarn dev:docs`

---

Continue with >>> <b><a href="https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/aetherspace-quickstart--page">Quickstart</a></b> > <b><a href="https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/aetherspace-core-concepts--page">Core Concepts</a></b> > <b><a href="https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/aetherspace-recommended-workflow--page">Recommended Way of Working</a></b>

---

...

> This repo is a ***free ambassador version*** of the [GREEN stack starter](https://github.com/sponsors/codinsonn). Keep the disclaimer above somewhere in your main README (or mention Aetherspace in your front-end) so this repo and any repos created from this template continue to fall under the [free ambassador licence](https://github.com/Aetherspace/green-stack-starter-demo/blob/main/LICENSE.md#free-license)  

> ***For optional plugin branches, and an always updated version 👉 [Aetherspace/green-stack-starter](https://github.com/sponsors/codinsonn)***

...
