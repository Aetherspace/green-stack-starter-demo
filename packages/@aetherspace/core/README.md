<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

# Aetherspace Core Concepts

To help you decide if Aetherspace is the right tool for you or your project,  
I've written this page to explain the core opinions and benefits when using Aetherspace:  

<p style={{ padding: "12px" }} />  

## Full-Product Universal Apps from the start

<p>
  <a href="https://aetherspace-green-stack-starter.vercel.app/" target="_blank">
    <img alt="Supports Next.js" longdesc="Supports Next.js" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app" target="_blank">
    <img alt="Test in Expo GO" longdesc="Test in Expo GO" src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app" target="_blank">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=for-the-badge&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app" target="_blank">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=for-the-badge&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
</p>

The dream of React development has always been “write-once, use anywhere”.

With Aetherspace, you can apply that concept to building with Expo, React-Native and Next.js, and have a Web, iOS and Android app from the get-go. You'll be maximising your reach right from project kickstart by forking the Aetherspace repo.

> While SEO is still the best option for new organic traffic for your project, daily active users will increasingly prefer a mobile app for use on the fly. Things like push notifications and taking up a spot on the users smartphone, will also allow for higher conversions overall. Choosing Aetherspace, you immediately get the best of both worlds and are set up for cross-platform success.

Therefore, using the helpful resources from `packages/@aetherspace` enables this write-once, reuse anywhere pattern for:
- Routing and Universal Links - for maximum shareability & bookmarkability
- UI - with fully cross-platform Components and styling
- Business logic
- Icons, assets and more

...while still being optimised for each platform you're targeting.

> "Web vs. Native is dead. Web **and** Native is the future."  
> - Evan Bacon, expo-router maintainer  

<p style={{ padding: "12px" }} />  

## Take what works, make it better

One way we achieve building universal apps from the start is by taking what works and making it better. We feel like it would be huge waste to throw away a decade of open-source learnings by rewriting everything from the ground up. Instead, we optimize by combining existing tools, patching in cross-platform support or expanding them with supersets.

### The GREEN stack

<p>
  <a href="https://www.apollographql.com/docs/intro/benefits/" target="_blank">
    <img alt="Uses GraphQL" longdesc="Uses GraphQL" src="https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&color=FFFFFF&logoColor=32b115" />
  </a>
  <a href="https://reactnative.dev/" target="_blank">
    <img alt="Built on React & React-Native" longdesc="Built on React & React-Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&color=FFFFFF&logoColor=32b115" />
  </a>
  <a href="https://expo.dev/@thorrstevens/aetherspace-starter-app" target="_blank">
    <img alt="Test in Expo GO" longdesc="Test in Expo GO" src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&color=FFFFFF&logoColor=32b115" />
  </a>
  <a href="https://aetherspace-green-stack-starter.vercel.app/" target="_blank">
    <img alt="Supports Next.js" longdesc="Supports Next.js" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&color=FFFFFF&logoColor=32b115" />
  </a>
</p>

Starting with combining, we’ve found that using the following technologies enables `Typescript` and `React` devs to work on the full-product quite flexibly:
- `GraphQL`, for a self-documenting API using `apollo-server`
- `React-Native`, for write-once UI that works on web and mobile
- `Expo`, for cross-platform iOS and Android builds, testing and deployments
- `Next.js`, for an SEO and web-vitals optimized web experience

Aside from those core technologies, Aetherspace also sets you up with, and is built on:
- `Zod`, for single sources of truth to define, type, validate and shape your data structures from 
- `turborepo`, for a monorepo setup that just works™️ while getting out of your way
- `expo-router` & `react-navigation`, for mobile fs based routing and (deep)linking
- `tailwind` & `twrnc`, for industry standard cross-platform styles using utility classes
- `SWR`, for cacheable data-fetching that works on web and mobile
- `@expo/html-elements`, for semantic HTML while still using React-Native
- `Storybook`, for interactive documentation that drives adoption

These are opinionated choices, but best-in-class ones that I'm convinced are here to stay.

Note that all other tool decisions are completely up to you and can be installed in any workspace manually or, if available in the [licensed starterkit](/LICENSE.md), merged through handy plugin branches. That means you can bring your own preferred state management, testing methods, database, and other tools of choice and still benefit from Aetherspace's universal setup.

<p style={{ padding: "12px" }} />  

## Thinking in Single sources of truth  

<p>
  <a href="https://zod.dev" target="_blank">
    <img alt="Zod.dev" longdesc="Zod for single sources of truth" src="https://img.shields.io/static/v1?style=for-the-badge&message=Zod&color=FFFFFF&logo=Zod&logoColor=3E67B1&label=" />
  </a>
</p>

To further help keep things write-once and not repeat yourself, we’ve chosen Zod, a typescript-first schema validation library, as the way to define your data-structure just once for all your:
- ✅ Types and in-editor hints
- ✅ Resolver Arguments and Responses
- ✅ Form states and validations
- ✅ GraphQL types
- ✅ Component props
- ✅ Documentation controls

Anything you can define in Typescript, you can define with Zod.

Similarly, any structure you define with aetherspace schemas (using Zod) can be re-used in any of the above contexts.

Check out some examples on our [Schemas and Single Sources of Truth](/packages/@aetherspace/schemas/README.md) docs page.  

<p style={{ padding: "12px" }} />  

## Documentation drives adoption.  

<p>
  <a href="https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/readme-md--page"  target="_blank">
    <img alt="Docs with Storybook" longdesc="Documentated with Storybook" src="https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=fff" />
  </a>
</p>

A great quote by Storybook and the reason Aetherspace comes with it and docgen already set-up for you. Because down the road, when you’re scaling and bringing in new developers, the easier it is for new people to know what’s already available, the faster they can be onboarded. (and the less likely they are to reinvent the wheel)

Docs take time however, and it’s easy to get caught up putting a lot of effort into writing docs. When you’re a startup or scaling, it’s not necessarily the thing you’d want to "lose" time on early on. You need to be building first and foremost.

So, in essence, when you haven't shipped anything yet:
> The best docs are the ones you don’t have to write yourself.

This is where Aetherspace, using single sources of truth and Storybook are a great match. Using Aetherspace, documentation becomes just a side-effect of you writing zod schemas to describe and type your component’s props. Our scripts will pick-up on that and generate storybook files with interactive controls and descriptions for your UI. Automatically. Without needing to fiddle with it yourself.

You can read more about all of this in the [Single sources of truth](/packages/@aetherspace/schemas/README.md) and [Automations](/packages/@aetherspace/scripts/README.md) docs pages.  

<p style={{ padding: "12px" }} />  

## Designing features for copy-paste:

We want your fork of the Aetherspace template repo to evolve into your own personalised template repo you can use for most of your projects. However, not every project is the same, which is why the monorepo setup promotes colocating UI, business logic, routing and assets into `/features/` and `/packages/` workspaces. Ideally, you want to be able to merge or copy-paste these folders into a new project and have it just work out of the box.

To enable this, we suggest you keep the following folder structure Aetherspace comes with:

```shell
│── features/
│   └── app-core # ➡️ Main workspace to tie all packages and features togeher
│       └── .../ # ➡️ Uses same folder structure as other features / packages ⤵
│   └── {my-feature-workspaces}/
│       └── assets/ # ➡️ e.g. Images, etc to be auto-copied to the public dirs
│       └── icons/ # ➡️ Used for registering icons for use in <AetherIcon/>
│       └── schemas/ # ➡️ Zod based single sources of truth for components and APIs
│       └── utils/ # ➡️ Reusable helpers for front or back-end business logic
│       └── resolvers/ # ➡️ Reusable back-end business logic (e.g. in '/routes/api/')
│       └── hooks/ # ➡️ Reusable front-end business logic (e.g. in '/components/')
│       └── components/ # ➡️ e.g. Molecules / Atoms / Common UI used in '/screens/'
│       └── screens/ # ➡️ Pages used in /routes/ (and later, '/app/' directories)
│       └── routes/ # ➡️ Routing linked to expo & next.js app-dir using scripts
│           └── api/ # ➡️ Houses all REST API's, copied to app dirs using a script
│       └── package.json # ➡️ feature name, and all related scripts and node modules
│
│── packages/
│   └── @aetherspace # ➡️ Main monorepo & template tooling + UI primitives
│   └── {my-package-workspaces}/ # ➡️ Reuse same folder structure, can be used in features
│       └── components/
│       └── schemas/
│       └── routes/
│       └── .../
│       └── package.json # ➡️ pkg name & modules
│
│── apps/ # ➡️ Your web and mobile app. You'll rarely need to edit these manually
│   └── expo/
│       └── app/ # ➡️ Mobile fs-based routing with expo-router
│           └── (generated)/ # ➡️ Target for all workspace /routes/ folders
│   └── next/
│       └── app/ # ➡️ Web & Server fs-based routing with next.js app dir
│           └── (generated)/ # ➡️ Target for all workspace /routes/ & /routes/api/ folders
```

This way, thanks to the startup scripts, copying a folder into another project will:

- Bring in all data-resolvers and automatically set-up the API routes they’re used in
- Bring in all UI, and automatically set-up the screens and deeplinks they’re used in
- Bring in all related assets and automatically copy them to the public dir(s)
- Add autogenerated docs for that feature or package’s components

… and ofcourse allow you to import any other reusables from that package or feature.

### Why not NPM packages?

A major benefit of going with copy-pastable or mergeable folders for recurring features is that they are *just* copies. Downstream, you may want to slightly edit the code in these folders to match the project, and that can be done without having to worry about versioning or publishing packages.

> (Unless ofcourse you do want to bother with that: Then you can just publish your workspace as an NPM package for the world or the team to use, even outside of Aetherspace projects)

Similar to adding recurring features, removing features or packages from a freshly forked repo then also becomes as simple as removing a folder.  

<p style={{ padding: "12px" }} />  

## Getting started with Aetherspace

- [Quickstart](/packages/@aetherspace/README.md)
- [Recommended way of working](/packages/@aetherspace/scripts/README.md)
- [Universal Routing](/packages/@aetherspace/navigation/README.md)

<p style={{ padding: "12px" }} />  
...

---

<details>
  <summary><b>So, what's optional?</b></summary>

---

I firmly believe the opinionated toolbelt and core-concepts will bring major benefits in terms of speed and efficiency.

However, **if you wish, you can actually ignore most of these core-concepts**, and still benefit from (only) the universal setup.

For example:
- You can avoid using `SWR`, `@expo/html-elements` or even `Zod` schemas yourself, even when keeping automations
- Ignoring file and folder conventions is fine, automations will just ignore those files, but you'll need to link routes on your own
- You can ignore the primitives and `tailwind` styling and bring your own preferred styling solution instead
- Ignoring the `graphResolver` or other named exports is fine, but you'll need to bring your own GraphQL setup
- If you don't care for docs at all, you can remove the `.storybook/` folder and disable all automations in `next.config.js`

Though, if you do, you might be better served with a [Tamagui or Solito starter instead](https://dev.to/codinsonn/why-use-react-native-over-flutter-a-recap-57b0#:~:text=When%20to%20use%20an%20Expo%20%2B%20Next.js%20starter%3F).

</details>

---
