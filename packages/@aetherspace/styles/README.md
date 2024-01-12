# Cross-Platform Styling

For cross-platform styling, you can use the `tw`, `className` or even `class` props on:

- `aetherspace/primitives`, like `AetherView`, `AetherText`
- `aetherspace/html-elements`, like `H1` and `P`
- any component wrapped with `aetherify(...)()` that takes a `style` prop

```tsx
import { Image } from 'aetherspace/primitives'
import { H1, Section } from 'aetherspace/html-elements'
import { aetherify } from 'aetherspace/core'

/* --- <MyUI/> --------------------------------------------------- */
// ...

<Section tw="px-4 mb-4">
  <H1 tw="text-gray-800 font-primary-black">Some Title</H1>
  <Image tw="w-full" src="/img/article-header.png" />
  <MyAetherifiedComponent tw="some-more-tw-classes">
    {/* ... */}
  </MyAetherifiedComponent>
</Section>

/* --- Components ------------------------------------------------ */

const MyAetherifiedComponent = aetherify(MyComponent)()
//                               ^ Add cross-platform tailwind support 
```

## Built on `tailwind` and `twrnc`

Under the hood we are adding tailwind support to react-native with the twrnc library, e.g.:

```tsx
// You can use utility classes for things like paddings and margins
<View tw="px-4" /> // => style={{ paddingLeft: '16px', paddingRight: '16px' }}
<View tw="my-2" /> // => style={{ marginTop: '8px', marginBottom: '8px' }}
<Text tw="text-black" /> // => style={{ textColor: '#000000' }}

// You can also pass specific values using bracket syntax
<View tw="w-[200px]" /> // => style={{ width: '200px' }}

// You can target specific platforms as well (extra in Aetherspace)
<View tw="web:flex-col" /> // => Will only apply in Browsers or during SSR
<View tw="mobile:p-4" /> // => Will only apply on Android or iOS
<View tw="ios:bg-blue android:bg-blue" /> // => Can also target specific platforms
```

In development, `twrnc` will warn you when using an unsupported classname. A full list of available utility classes can be found in the tailwind docs:

- [Tailwind Docs](https://tailwindcss.com/docs)
- [twrnc docs -- adding custom classnames](https://github.com/jaredh159/tailwind-react-native-classnames#adding-custom-classes)

This also means the allowed classes are limited to what both RN and the library can support.

Meaning (for now):

- No CSS grid
- No pseudo elements like `hover:` or `last-child:`
- No special CSS syntax like `@keyframes`
- No blend modes, or filters or other fancy image stuff
- No `@media`, **but we have added an SSR-supported alternative** (see next section)

A lot of these are getting worked on in a [React-DOM for Native RFC](https://github.com/react-native-community/discussions-and-proposals/pull/496) though, and may be added in the near future.

## Responsive Design + Media Query Support for SSR

The main reason you might want to use Aetherspace’s way of styling is that it adds media query support when server-rendering your `react-native` components. So far, this was not possible due to `react-native-web` not supporting media queries out of the box.

Luckily, aetherspace has your back:

```tsx
// Responsive utility classes are mobile first, e.g.
<View tw="w-[200px] lg:w-[400px]" /> // => width = 200px, larger screens = 400px
```

The available list of default responsive breakpoints in Aetherspace is:

- `xs` — for screens larger than `320px`
- `sm` — for screens larger than `576px`
- `md` — for screens larger than `768px`
- `lg` — for screens larger than `1024px`
- `xl` — for screens larger than `1280px`
- `xxl` — for screens larger than `1536px`
- `phones` — always applied, just a mobile-first alias
- `tablets` — same as `md`, larger than `768px`
- `laptops` — same as `lg`, larger than `1024px`

You can edit these breakpoints by passing your own custom remapping of these to the `AetherContextManager` in your root layout.tsx file:

```tsx
<AetherContextManager
  breakpoints={{
    xs: 300,
    sm: 400,
    // ...
  }}
>
  {/* ... Custom root layout that renders children ... */}
</AetherContextManager>
```

## More verbosity with styled syntax

If you’re coming from `styled-components` or `emotion`, or if you simply enjoy the verbosity it brings, you may prefer working with “styled” syntax components for  your styles. e.g.

```tsx
import { twStyled } from 'aetherspace/styles'

/* --- Styles --------------------------------------------------- */

const StSomeLink = twStyled.Pressable`
  h-[100px] docs:max-w-[600px] flex-row rounded-md overflow-hidden bg-slate-800
`

const StSomeView = twStyled.View`
  relative w-[90px] xs:w-[100px] sm:w-[120px] h-[100px]
`
```

> Do note that this syntax only supports tailwind style classes and not actual CSS-like syntax

`twStyled` comes with all aetherspace primitives but also wraps `@expo/html-elements`:

```tsx
// If you want semantic HTML:
const H1 = twStyled.H1`some tailwind classes` // <h1> on web, <Text> on mobile
const P = twStyled.P`some more tailwind classes` // <p> or <Text>
const StSection = twStyled.Section`wrapper classes` // <section> or <View>
```

You can also pass custom components as long as they can take a `style` prop:

```tsx
const StMyWrappedComponent = twStyled(MyComponent)`some tailwind classes`
```

There’s very little magic under the hood, as using `twStyled` only prefills the tw prop, e.g. like:

```tsx
const TwStyledComponent = (props) => (
  <UnwrappedComponent {...props} tw={prefilledTailwindClasses} />
)
```

> Dynamic styles where you pass a function in the template literal are also not supported

Instead, for dynamic styles, please use the `tw` prop directly:

```tsx
<MyAetherPrimitive
  tw={[
    'always applied tw classes',
    isSomeBooleanTruthy && 'optional tw classes', // <- only applied if truthy
  ]}
>
```

## Hints and Helpers with VSCode plugins

For hover previews of what tailwind classes do, or hints for which are available, we recommend you install the following VSCode plugins:

- [Inline Fold](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold) — For collapsing your tailwind props when not working on styling
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) — For hints and hover previews of what it translates to

These might not work out of the box, if that’s the case, apply these in `.vscode/settings.json`

```json
"tailwindCSS.classAttributes": [
  "class",
  "className",
  "tw",
  "tailwind",
  "style"
],
"tailwindCSS.experimental.classRegex": [
  "tw`([^`]*)", // tw`...`
  "tw=\"([^\"]*)", // <div tw="..." />
  "tw={\"([^\"}]*)", // <div tw={"..."} />
  "tw\\.\\w+`([^`]*)", // tw.xxx`...`
  "tw\\(.*?\\)`([^`]*)", // tw(Component)`...`
  "twStyled\\.\\w+`([^`]*)", // twStyled.xxx`...`
  "twStyled\\(.*?\\)`([^`]*)", // twStyled(Component)`...`
  "tw.*?z\\.string\\(\\).*?\\.default\\('([^']*)'", // tailwind class property description in zod schemas
  "tw.*?z\\.string\\(\\).*?\\.eg\\('([^']*)'", // tailwind class property description in zod schemas
  "Classes.*?z\\.string\\(\\).*?\\.default\\('([^']*)'", // tailwind class property description in zod schemas
  "Classes.*?z\\.string\\(\\).*?\\.eg\\('([^']*)'", // tailwind class property description in zod schemas
],
"tailwindCSS.includeLanguages": {
  "typescript": "javascript",
  "typescriptreact": "javascript"
},
"inlineFold.regex": "(tw|class|className)=[`'{\"]([^`'\"}]{20,})[`'\"}]",
"inlineFold.regexFlags": "g",
"inlineFold.regexGroup": 2,
"inlineFold.unfoldedOpacity": 0.5,
"inlineFold.maskChar": "...",
"inlineFold.maskColor": "#FFF",
"inlineFold.supportedLanguages": ["javascriptreact", "typescriptreact"],
"inlineFold.unfoldOnLineSelect": true,
"inlineFold.autoFold": true,
"tailwindCSS.lint.invalidTailwindDirective": "warning",
"tailwindCSS.lint.invalidApply": "warning",
"tailwindCSS.lint.invalidConfigPath": "ignore",
"tailwindCSS.lint.invalidScreen": "warning",
"tailwindCSS.lint.invalidVariant": "warning",
"tailwindCSS.experimental.configFile": null,
```

## Customizing Tailwind with Theming & Custom Utility Classes

Your actual tailwind config with twrnc should live at the `/features/app-core/tailwind.config.js` file, whereas the tailwind.config.js at the root is a decoy for the Tailwind CSS IntelliSense VSCode plugin only.

Extending with custom utility classes can be done as described in:
[https://www.npmjs.com/package/twrnc#adding-custom-classes](https://www.npmjs.com/package/twrnc#adding-custom-classes)

But if you also want to enable in-editor hinting, you might want to do that in the `/features/app-core/twrnc.theme.js` file instead.

So extend the `/features/app-core/twrnc.theme.js` file being referenced in both the config at the root (for IDE IntelliSense) and in `/features/app-core/tailwind.config.js` (for actual tailwind config in your app)

Import & pass the final config to AetherContextManager in ClientRootLayout.tsx (next) or _layout.tsx (expo). This should already be done for you when generating a new Aetherspace project.

The final `twConfig` is usually passed in `/apps/expo/app/_layout.tsx` and `/apps/next/app/ClientRootLayout.tsx` respectively:

```tsx
import twConfig from 'app/tailwind.config' // <- your tailwind config, using the theme from twrnc.theme.js

<AetherContextManager twConfig={twConfig} {/* ... other config */}>
  {/* ... */}
</AetherContextManager>
```

## Why Tailwind instead of some other styling library?

> Like most of the tools we build upon, this is an informed opinionated choice.

Tailwind has become an industry standard and we believe that the added learning curve of tailwind’s utility classes is worth the hassle of working with custom CSS-like classes at scale.

Here’s [what tends to happen](https://twitter.com/ryanflorence/status/1673847474941997056) with other CSS class solutions in larger teams:

- Some common shared class like `btn__previous` will change and break some UI elsewhere
- Breakages like that will likely not be discovered until they’re in production
- Naming will be inconsistent and you’ll lose hours arguing about names
- These elements shouldn’t even have been named, you should have been shipping instead
- People will be afraid to change any existing CSS like `btn__previous` and will write new CSS
- Can’t find all instances to remove unused CSS and you’ll eventually ignore it
- This will result in unused dead styles and needless KBs of CSS shipped to the browser
- In editor support is minimal, can’t hover classes and know what they do
- You might eventually refactor to a crappy, undocumented utility class system to fix it
- Congrats, you’ve reinvented tailwind without the open-source learnings and tooling

Aside from CSS class based approaches, if the style library you’re used to works cross-platforms, it might also just work in Aetherspace. Then all that’s left to do is to ignore everything on this page or only use the responsive design aspects of Aetherspace’s tailwind style solution.

For example, if you’d rather use [Tamagui](https://tamagui.dev/) or `styled-components` as your main styling solution, this is entirely possible. For cross-platform UI libraries like Tamagui, we even recommended it.

## Learn more:

- [Universal Routing with Expo and Next.js](/packages/@aetherspace/navigation/README.md)
- [Storybook docgen and other automations](/packages/@aetherspace/scripts/README.md)
