# Universal from the start

The dream of React development has always been “write-once, use anywhere”.

With Aetherspace, you can apply that concept to building with Expo, React-Native and Next.js, and have a Web, iOS and Android app from the get-go. Maximising your reach from the start.

> Users increasingly prefer mobile apps over the web. That is just fact. SEO however, is still the best option for organic traffic. But things like push notifications and taking up a spot on the users smartphone, allow for higher conversions overall. By choosing Aetherspace, you’re setting you get the best of both worlds and set your project up for cross-platform success.

Therefore, using the helpers and scripts from `packages/@aetherspace` enables this write-once, reuse anywhere pattern for:
- Routing
- UI (Components, Styling)
- Business logic (Front & Backend)
- Animations
- Icons, assets, ...
- and more...

...while still being optimised for each platform you're targeting.

> "Web vs. Native is dead. Web **and** Native is the future."  
> - Evan Bacon, expo-router maintainer

# Take what works, make it better

One way we achieve building universal apps from the start is by taking what works and making it better. We feel like it would be huge waste to throw away decades of open-source (and e.g. with Flutter, native) learnings by rewriting everything from the ground up. Instead, we optimize by combining existing tools, patching in cross-platform support or expanding them with supersets.

### The GREEN stack

Starting with combining, we’ve found that using the following technologies enables `Typescript` and `React` devs to work on the full-product quite flexibly:
- `GraphQL`, for a self-documenting API using `apollo-server`
- `React-Native`, for write-once UI that works on web and mobile
- `Expo`, for cross-platform iOS and Android builds, testing and deployments
- `Next.js`, for an SEO and web-vitals optimized web experience

Aside from those core technologies, Aetherspace also sets you up with and is built on:
- `Zod`, for single sources of truth to define all our datastructure shapes from
- `turborepo`, for a monorepo setup that works while getting out of your way
- `expo-router` & `react-navigation`, for mobile fs based routing and (deep)linking
- `tailwind` & `twrnc`, for industry standard cross-platform styles using utility classes
- `SWR`, for cacheable data-fetching that works on web and mobile
- `@expo/html-elements`, for semantic HTML while still using React-Native
- `Storybook`, for interactive documentation that drives adoption

These are opinionated choices, but best-in-class ones that we're convinced are here to stay.

# Single sources of truth

To further help keep things write-once and not repeat yourself, we’ve chosen Zod, a typescript-first schema validation library, as the way to define your data-structure just once for all your:
- Types and in-editor hints
- Resolver Arguments and Responses
- GraphQL types
- Documentation controls
- Component props

Anything you can define in Typescript, you can define with Zod.

Check out some examples on our [Schemas and Single Sources of Truth](/packages/%40aetherspace/schemas/README.md) docs page.

# Designed for copy-paste

We want your fork of the Aetherspace template repo to evolve into your own personalised template repo you can use for most of your projects. However, not every project is the same, which is why the monorepo setup promotes colocating UI, business logic, routing and assets by `/features/` and `/packages/` workspaces. Ideally, you want to be able to merge or copy-paste these folders into a new project and have it just work out of the box.

To facilitate this, we suggest you keep the following folder structure Aetherspace comes with:

```shell
│── features/
│   └── app-core # ➡️ Main workspace to tie all packages and features togeher
│       └── .../ # ➡️ Uses same folder structure as other features / packages ⤵
│   └── {my-feature}/
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
│   └── {my-package}/ # ➡️ Reuse same folder structure, can be used in features
│       └── components/
│       └── components/
│       └── routes/
│       └── .../
│       └── package.json # ➡️ pkg name & modules
│
│── apps/ # ➡️ Your web and mobile app. You'll rarely need to edit these manually
│   └── expo/
│       └── app/ # ➡️ Mobile fs-based routing with expo-router
│           └── (generated)/ # ➡️ Target for all /routes/ folders
│   └── next/
│       └── app/ # ➡️ Web & Server fs-based routing with next.js app dir
│           └── (generated)/ # ➡️ Target for all /routes/ & /routes/api/ folders
```

This way, thanks to the startup scripts, copying a folder into another project will:

- Bring in all data-resolvers and automatically set-up the API routes they’re used in
- Bring in all UI, and automatically set-up the screens and deeplinks they’re used in
- Bring in all related assets and automatically
- Add autogenerated docs for that feature or package’s components

…and ofcourse allow you to import any other reusables from that package or feature

### Why not NPM packages?

Another benefit of going with copy-pastable or mergeable folders for recurring features is that they are *just* copies. Downstream, you may want to slightly edit the code in these folders and that can be done without having to worry about versioning or publishing packages if you don’t want to bother with that.

Similar to adding recurring features, removing them from a freshly forked repo then also becomes as simple as removing a folder.

# Documentation drives adoption

A great quote by Storybook and the reason Aetherspace comes with it already set-up for you. Because down the road, when you’re scaling and bringing in new developers, the easier it is for new people to know what’s already available, the faster they can be onboarded. (and the less likely they are to reinvent the wheel)

Docs take time however, and it’s easy to get caught up into putting a lot of effort writing docs. When you’re a startup or scaling, it’s not necessarily the thing you’d want to put so much time into. You need to be building first and foremost. So, in essence, when scaling:

> The best docs are the ones you don’t have to write yourself.

And this is where Aetherspace, using single sources of truth and Storybook are a great match. Using Aetherspace, documentation becomes just a side-effect of you writing zod schemas to describe and type your component’s props. We essentially pick-up on that and generate storybook files with interactive controls and descriptions for you.

You can read more about all of this in the [Single sources of truth](/packages/@aetherspace/schemas/README.md) and [Automations](/packages/@aetherspace/scripts/README.md) docs.

## Getting started with Aetherspace

- [Quickstart](/packages/@aetherspace/README.md)
- [Universal Routing](/packages/@aetherspace/navigation/README.md)
- [Free and Premium Licenses](/LICENSE.md)
