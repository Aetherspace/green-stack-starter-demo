# Automatic deployments with Github Actions

We generally advise that you take full use of [Vercel](vercel.com) and [Expo](expo.dev) for automatic deployments. These are quite good and easy to set-up and link to your repo in their UI.

On top of this though, you can also enable automatic deployments through Github Actions to:
- Deploy your storybook docs with [Chromatic](https://www.chromatic.com/)
- Deploy your feature branches for testing with [Expo](https://github.com/expo/expo-github-action) (runs `eas update` whenever a branch updates)

Heads up though, as this will require setting up some secrets in your repository.

> We recommend [doppler](doppler.com) for managing and syncing secrets or env vars between services. You can find more information on how to set this up at [the doppler docs](https://docs.doppler.com/docs/github-actions).

## Publishing with EAS update

A basic workflow for publishing with EAS update is already added to your project when forking the repo. You can find it in `.github/workflows/eas.yml`.

However, it will only run when you add an `EXPO_ACCESS_TOKEN` secret to your repository. You can do this in the repository settings, but before you do that, you'll need to generate this token in their UI.

### Creating an Expo project and generating an access token

In the UI on expo.dev, create a new project. You can do this by clicking the `+` button in the top right corner and selecting `New Project`. You will then recieve instructions on how to link an existing codebase to your new project. You can run their own suggested command from `/apps/expo/` or tweak it to run from the project root with:

```bash
yarn eas-cli init --id {expo-project-id}
```

Since we're using a dynamic `app.config.js` file, it's likely you'll instead get instructions to add it manually:

`apps/expo/app.config.js`

```js
const config = ({ config }) => {
    // EAS updates config (only applied when not using expo publish)
    const easConfig = {
        updates: {
            // ...
            url: 'https://u.expo.dev/{expo-project-id}',
        },
        extra: {
            eas: {
                projectId: '{expo-project-id}',
            },
        },
        // ...
    },
    // ...
}
// ...
```

Once you've linked your project, you can generate an access token in the expo UI:
https://expo.dev/accounts/%5Baccount%5D/settings/access-tokens

Copy this token as `EXPO_ACCESS_TOKEN` and add it to your Github repository secrets. (Ideally through a sync with a tool like doppler)

## Publishing Storybook docs with Chromatic

Chromatic is a tool for publishing and reviewing your storybook docs. It's a great way to share your work with others and get feedback on your components.

You can find more information on how to set this up at [the Chromatic docs](https://www.chromatic.com/docs/setup).

Once you've set up your project, you can add the `CHROMATIC_PROJECT_TOKEN` to your repository secrets. (Ideally through a sync with a tool like doppler)

---

# Other deployments

## Deploying to web with Vercel

Vercel is a great tool for deploying your web apps. It's easy to set up and has a great UI for managing your deployments.
All you need to do is create a new project by importing your repository in their UI from Github.

- [https://vercel.com/new](https://vercel.com/new)

## Submit your mobile apps to the stores using EAS

- [Expo Docs: Expo Application Services](https://docs.expo.dev/eas/)
- [Expo Docs: EAS Submit](https://docs.expo.dev/submit/introduction/)

## Learn more about Aetherspace:

- [Single Sources of Truth for your Web & Mobile apps](/packages/@aetherspace/schemas/README.md)
- [Automation based on Single Sources of Truth and the File System](/packages/@aetherspace/scripts/README.md)
