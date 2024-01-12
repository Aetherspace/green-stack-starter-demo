# Managing Icons

There’s many different ways to use icons and icon sets in Aetherspace. Here’s the full list:

- Third party SVG component icon libraries (like `@nandorojo/iconic` or `@nandorojo/heroicons`)  
→ SSR support, fast & easy, no layout shift on web, limited options
- Custom SVG components using `react-native-svg`  
→ SSR support, can [convert from .svg file](https://transform.tools/svg-to-react-native), but could be more time-consuming
- Image icons through src urls  
→ Straight forward, easy, not super optimised, fixed colors, layout shift on web  

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

[Expo + Next.js Icon recipes (from the 'Solito' docs)](https://solito.dev/recipes/icons)

With the mergeable or copy-pastable `@green-stack/icons` package, you can use any of the following icon libraries in web or mobile, without any downsides:
- `@nandorojo/iconic` ([NPM](https://github.com/nandorojo/react-native-iconic))
- `@nandorojo/heroicons` ([NPM](https://github.com/nandorojo/react-native-heroicons))

We'll be gathering more similar SVG icon libraries with react-native support under `/packages/@green-stack-icons`. Which functions mostly as a collection of these cross-platform enabled iconsets gathered in one place... But it also has a handy script for turning your own folder of `.svg` icons into your own custom set of React-Native SVG components, which might be the ideal happy path:

```bash
yarn workspace @green-stack/icons regenerate
```

1. Merge the `with/green-stack-icons` plugin branch, or [copy-paste](/packages/@aetherspace/core/README.md#designed-for-copy-paste) in `/packages/@green-stack-icons/`
2. Drop your `.svg` files in `/packages/@green-stack-icons/assets/{your-icon-set-name}/`
3. Run `yarn workspace @green-stack/icons regenerate` to create icon components from your `.svg` files
4. Import your icon components from `@green-stack/icons/{your-icon-set-name}/{your-icon-name}`

OR, register them for use with `<AetherIcon/>`:

## Better DX with `AetherIcon`

> Whichever of the 4 strategies you choose, or even when choosing multiple methods, you can improve your DX or apply the icons dynamicly using Aetherspace’s icon registry pattern and `AetherIcon` component.

This will enable:

- Type hints in your editor for the `name` prop on the AetherIcon component
- Each workspace to define their own icons, optimising the feature or package for copy-paste
- An importable list of all registered icons for e.g. building an IconPicker component

Example icon registration in a workspace (e.g. `feature/{workspace}/icons/registry.tsx`)

```tsx
import { AetherImage } from 'aetherspace/primitives'
import { registerIconRenderer } from 'aetherspace/utils'

// -i- Export an 'iconRegistry' object with all your icons
export const iconRegistry = {

  // - Using regular components... (recommended) -
  // -!- Make sure components have 'size' & 'fill' props
  'some-icon-key': MySvgComponent,

  // - OR, if you don't need to change the color through props -
  'some-img-icon': ({ size, ...restIconProps }) => (
    <AetherImage
      src="/img/icon.svg"
      width={size}
      height={size}
      {...restIconProps}
    />
  )

  // - OR, using an icon library -
  ...registerIconRenderer(
    ['caret-up', 'caret-down', ...] as const,
    ({ name, size, fill, ...restIconProps }) => (
      <ThirdPartyIconLib name={name} size={size} color={fill} {...restIconProps} />
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

## Using `AetherImage` with `.svg` files

> Using `AetherImage` with `.svg` files might be the most bundle size friendly way of using SVGs in your app. Since it will always result in only using the SVGs that you actually use in your app.

```tsx
<AetherImage src="/icons/my-icon.svg" width={24} height={24} />
```

The one major downside of using this approach though, is that colors won't be editable through props and like with icon fonts, it might introduce some loading flickering.

## Why we don't recommend using Icon Fonts

> Icon fonts are a popular way of using icons in web apps. But they have some downsides that we don't want to introduce in Aetherspace. One such downside is that they can easily introduce flickering during loading, which is a bad user experience.

Icon fonts typically require the entire font file to be loaded. This can affect the app's performance, particularly during initial load when these fonts are larger than necessary. This makes even less sense when only a few icons are used.

Therefore, we generally don't recommed using icon fonts like `@expo/vector-icons` or `react-native-vector-icons` in Aetherspace.  
**Our recommended way to do icons remains using SVGs**, either as React components or as images, **but don't import them from barrel files.**

## Continue learning:

- [Recommended ways of working](/packages/@aetherspace/scripts/README.md)
- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
