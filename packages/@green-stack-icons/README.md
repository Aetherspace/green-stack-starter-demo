<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

<p>
  <a href="/?path=/docs/aetherspace-icon-management--page">
    <img alt="Icon Management Docs" longdesc="Read the Icon Management Docs" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  </a>
  <a href="/?path=/docs/aetherspace-icon-management--page">
    <img alt="Icon Management Docs" longdesc="Read the Icon Management Docs" src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" />
  </a>
  <a href="/?path=/docs/packages-aetherspace-components-aethericon--aether-icon">
    <img alt="AetherIcon example" longdesc="Docs for AetherIcon" src="https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=fff" />
  </a>
</p>

# `@green-stack/icons` - Aetherspace Plugin

Prerequisites:
- Fork or generate a new repository from the official or free [aetherspace/green-stack-starter](https://github.com/Aetherspace/green-stack-starter-demo#readme) github repo
- Choose the "✅ Include all branches" option during the fork / generation process

```shell
git merge with/green-stack-icons
```

```shell
│── packages/
│   └── @aetherspace-mongoose/ # ➡️ importable from '@green-stack/icons'
│       └── assets/ # ➡️ Input folder for .svg files
│       └── icons/ # ➡️ Output folder for SVG components
│       └── scripts/ # ➡️ Script to generate SVG components from .svg files at /assets/
│       └── package.json # ➡️ pkg name & dependencies, like '@nandorojo/heroicons'
```

## Usage -- SVG icon libraries with `@green-stack/icons`

With this package, you can use any of the following icon libraries in web or mobile, without any downsides:
- `@nandorojo/iconic` ([NPM](https://github.com/nandorojo/react-native-iconic))
- `@nandorojo/heroicons` ([NPM](https://github.com/nandorojo/react-native-heroicons))

[Solito Docs: Expo + Next.js Icon recipes](https://solito.dev/recipes/icons)

We'll be gathering more similar SVG icon libraries with react-native support under `/packages/@green-stack-icons`. Which functions mostly as a collection of these cross-platform enabled iconsets gathered in one place... But it also has a handy script for turning your own folder of `.svg` icons into your own custom set of React-Native SVG components:

## Generating your own icon set from .svg files

```bash
yarn workspace @green-stack/icons regenerate
```

1. Merge the `with/green-stack-icons` plugin branch, or [copy-paste](/packages/@aetherspace/core/README.md#designed-for-copy-paste) in `/packages/@green-stack-icons/`
2. Drop your `.svg` files in `/packages/@green-stack-icons/assets/{your-icon-set-name}/`
3. Run `yarn workspace @green-stack/icons regenerate` to create icon components from your `.svg` files
4. Import your icon components from `@green-stack/icons/{your-icon-set-name}/{your-icon-name}`

OR, register them for use with `<AetherIcon/>`:

- [Managing Icons in GREEN stack Expo + Next.js monorepos](/packages/@aetherspace/components/AetherIcon/README.md)

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
  // - OR, if you don't need to change the color through props -
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

## Roadmap - More to come

`@green-stack/icons` is an Aetherspace plugin branch that's already usable, but will be expanded on in the future. Follow the maintainer on Github, Twitter or Bluesky to stay up to date on the latest developments.
