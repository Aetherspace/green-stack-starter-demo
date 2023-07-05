# Managing Icons

There’s many different ways to use icons and icon sets in Aetherspace. Here’s the full list:

- Third party SVG component icon libraries, like `@nandorojo/iconic` or `@nandorojo/heroicons`  
→ SSR support, fast & easy, no layout shift on web, limited options
- Custom SVG components using `react-native-svg`  
→ SSR support, can [convert from .svg file](https://transform.tools/svg-to-react-native), but could be more time-consuming
- Third party iconfont libraries, such as `@expo/vector-icons`  
→ Fast & easy, needs icon font preloaded, layout shift on web, locked out of SWC
- Image icons through src urls  
→ Straight forward, easy to implement, not super optimised, layout shift on web  

### Best practices

With each of these solutions, [be careful to not accidentally bloat your bundle size](https://twitter.com/Baconbrix/status/1676329985064435712). Especially with iconfont libraries or adding SVG components to barrel files, which can easily add a few MB to your bundle size.

In essence, you'll want to avoid:
- combining multiple icon-fonts or icon-libraries, stick to one for consistency and bundle size
- importing the entire icon library, especially from a single import path
- converting all your SVG files to React components and importing them all in a barrel file

Instead, you'll want to:
- Only import / convert / register the icons you need, ideally from an import path for that specific icon
- Consider using `AetherImage` + the `/assets/` folder src path for .svg icons that don't need dynamic colors

## SVG icon libraries with `@green-stack/icons`

[Solito Docs: Expo + Next.js Icon recipes](https://solito.dev/recipes/icons)

With the mergeable or copy-pastable `@green-stack/icons` package, you can use any of the following icon libraries in web or mobile, without any downsides:
- `@nandorojo/iconic` ([NPM](https://github.com/nandorojo/react-native-iconic))
- `@nandorojo/heroicons` ([NPM](https://github.com/nandorojo/react-native-heroicons))

We'll be gathering more similar SVG icon libraries with react-native support under `/packages/@green-stack-icons`. Which functions mostly as a collection of these cross-platform enabled iconsets gathered in one place... But it also has a handy script for turning your own folder of `.svg` icons into your own custom set of React-Native SVG components:

```bash
yarn workspace @green-stack/icons regenerate
```

1. Drop your `.svg` files in `/packages/@green-stack-icons/assets/{your-icon-set-name}/`
2. Run `yarn workspace @green-stack/icons regenerate` to create icon components from your `.svg` files
3. Import your icon components from `@green-stack/icons/{your-icon-set-name}/{your-icon-name}`

OR, register them for use with `<AetherIcon/>`:

## Better DX with `AetherIcon`

> Whichever of the 4 strategies you choose, or even when choosing multiple methods, you can improve your DX or apply the icons dynamicly using Aetherspace’s icon registry pattern and `AetherIcon` component.

This will enable:

- Type hints in your editor for the `name` prop on the AetherIcon component
- Each workspace to define their own icons, optimising the feature or package for copy-paste
- An importable list of all registered icons for e.g. building an IconPicker component

Example registration (in e.g. `feature/{workspace}/icons/registry.tsx`)

```tsx
import { AetherImage } from 'aetherspace/primitives'
import { registerIconRenderer } from 'aetherspace/utils'

export const iconRegistry = {
  // Make sure components have 'size' & 'fill' props
  'some-icon-key': MySvgComponent,
  // - OR -
  'some-img-icon': ({ size, ...restIconProps }) => (
    <AetherImage
      src="/img/icon.svg"
      width={size}
      height={size}
      {...restIconProps}
    />
  )
  // - OR -
  ...registerIconRenderer(
    ['caret-up', 'caret-down', ...] as const,
    ({ name, size, fill, ...restIconProps }) => (
      <ThirdPartyIconLib name={name} size={size}, color={fill} {...restIconProps} />
    ),
  ),
}
```

Example codegen

```bash
yarn ats collect-icons 
# or just "yarn dev" as it's part of the next.config.js automations
```

```tsx
-----------------------------------------------------------------
-i- Successfully created icon registry at:
-----------------------------------------------------------------
✅ packages/@registries/icons.generated.ts
```

```tsx
// icons.generated.ts

// -i- Auto generated with 'yarn ats collect-icons' & reused in AetherIcon
import { iconRegistry as someFeatureIcons } from '../../features/some-feature/icons/registry'
import { iconRegistry as somePackageIcons } from '../../packages/some-package/icons/registry'

/* --- Exports --------------------------------------------------------------------------------- */

export const REGISTERED_ICONS = {
  ...someFeatureIcons,
  ...somePackageIcons,
} as const // prettier-ignore
```

Example usage of `AetherIcon` (which uses the generated icon registry under the hood)

```tsx
<AetherIcon name="some-icon-key" size={24} />
//           ?^ 'some-icon-key' | 'some-img-icon' | 'caret-up' | 'caret-down' | ...
```

The AetherIcon way of working is fully optional and only exists to keep your feature and packages workspaces copy-pastable between Aetherspace projects by applying some minimal codegen on top.

If you prefer skipping this and work with the icons directly, we have more simple examples below:

## Creating your own custom Icon Components

[SVG to React Native](https://transform.tools/svg-to-react-native)

> Adjacent to using third party SVG icon libraries, use tools like [https://transform.tools](https://transform.tools) or [SVGR](https://react-svgr.com/playground/?native=true&typescript=true) to drop in your .svg files and generate a usable React-Native component from that upload.

![TransformToolsExampleRNSVG.png](/.storybook/public/TransformToolsExampleRNSVG.png)

→ Save to e.g. `/features/{workspace}/icons/MySvgComponent.tsx` and edit it to your liking

> Using your Icon Component:

```tsx
import MySvgComponent from '../icons/SvgCompont'

// ...later, in JSX return...

<MySvgComponent width={24} height={24} fill={#333333} />
```

Benefits of this strategy:

- Since it’s using SVG jsx under the hood, this works and shows immediately during SSR.
- It’s just another react component, use it in JSX and add props to it.
- e.g. You can make the colors and sizes dynamic using props
- Can be used for more than just icons, can be entire illustrations.

Downsides of this strategy:

- Time consuming: Requires some copy-pasting between transform tools and your code
- Therefore, even if it’s most reliable and configurable, also not very fast or scalable

## Using `@expo/vector-icons`

[Expo Docs: @expo/vector-icons](https://docs.expo.dev/guides/icons/)

> Check which iconset you want to use and how to use them on [https://icons.expo.fyi/](https://icons.expo.fyi/)

Benefits of using this strategy:

- Fast, choose icons from existing third party icon providers
- Most @expo/vector-icons are also compatible with the web

Downsides of using icon fonts under the hood:

- You’ll need to preload your icon font somehow, easy on mobile but harder on web
- Loading flicker, meaning you might not see the icon immediately if the icon font isn’t loaded yet
- Cannot use Next.js’s SWC compiler when using any of the @expo/vector-icons (no loader for importing .ttf files)

Example usage:

```tsx
import { AntDesign } from '@expo/vector-icons'

<AntDesign
  name="caretup"
  size={24}
  color="#333333"
/>
```

Example preloading of icon font on mobile:

`/features/app-core/hooks/useLoadFonts.ts`

```tsx
'use client'
import { useFonts } from 'expo-font'
import { /* Google Fonts */ } from '@expo-google-fonts/roboto'

/* --- useLoadFonts() -------------------------------------------------------------------------- */

const useLoadFonts = () => {
  const fontsToLoad = {
    // - Google Fonts -
    /* ... */
    // - Icon Fonts -
    AntDesign: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
    // -!- important: always double check this path (^) for your icon fonts
  }

  const [fontsLoaded, fontsError] = useFonts(fontsToLoad)

  if (fontsError) console.error('fontErrors:', fontsLoaded)

  // -- Return --

  return fontsLoaded // <- Keep splash screen open until this is true
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useLoadFonts
```

Example usage with `<AetherIcon/>`

`/packages/{workspace-folder}/icons/registry.tsx`

```tsx
import React from 'react'
import { registerIconRenderer } from 'aetherspace/utils'
import { AntDesign } from '@expo/vector-icons'
import { ComponentProps } from 'react'

/** --- iconRegistry --------------------------------------------------------------------------- */
/** -i- Register any icons by preferred AetherIcon "name" key */
export const iconRegistry = {
  // Register any icons from e.g. AntDesign you want by
  // registering them by strings 👇 array (readonly) + render function
  ...registerIconRenderer(['caretup'] as const, ({ name, size, fill, ...restIconProps }) => (
    <AntDesign
      name={name as ComponentProps<typeof AntDesign>['name']}
      size={size}
      color={fill}
      {...restIconProps}
    />
  )),
} as const // <-- Readonly is important here for accurate type hints
```

```tsx
<AetherIcon name="caretup" size={24} fill="#333333" />
```

## Using `AetherImage` with `.svg` files

> Using `AetherImage` with `.svg` files might be the most bundle size friendly way of using SVGs in your app. Since it will always result in only using the SVGs that you actually use in your app.

```tsx
<AetherImage src="/icons/my-icon.svg" width={24} height={24} />
```

The one major downside of using this approach though, is that colors won't be editable through props and like with icon fonts, it might introduce some loading flickering.

## Continue learning:

- [Automations based on Schemas and the Filesystem](/packages/@aetherspace/scripts/README.md)
- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
