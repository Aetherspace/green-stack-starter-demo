<img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />

# Aetherspace Plugin Branches

While you can use any package you want in your Aetherspace monorepo, we've created a few merge ready plugin branches to make the starterkit even more plug & play using git.

Some example use cases:
- Need to provide cross-platform authentication? (e.g. using Clerk) -> `git merge with/clerk-auth`
- Need to convert .svg files into cross-platform Icon components, or use known ones? -> `git merge with/green-stack-icons`
- Need utils to turn your single sources of truth into DB models? (e.g. for Mongoose? -> `git merge with/mongoose`)

Plugins are branches that you can merge (or copy) into your repo, and they'll usually add tools for aetherspace specific ways of working:
- `schemas/` - single sources of truth for the package / solution / plugin (e.g. Clerk auth, Mongoose, ...) and typescript types
- `routes/` - example pages and API routes to integrate the selected solution into your app
- `scripts/` - scripts to generate code from your schemas or assets (e.g. CRUD resolver generators for your DB models)

... as well as `components/`, `hooks/`, `screens/`, `styles/`, `utils/` and more to optimize integrations through:
- ✅ Optimizing for cross-platform (Expo + Next.js) development
- ✅ Integrating with your [Single sources of truth](/packages/@aetherspace/schemas/README.md)
- ✅ Adding code generators to skip manual boilerplate

---
> **💚 To use plugin branches, you do need [access to the official green-stack-starter](https://github.com/sponsors/codinsonn):**
---

![GithubTemplateRepo.png](/.storybook/public/GithubTemplateRepo.png)

![GithubTemplateRepoWithPlugins.png](/.storybook/public/GithubTemplateRepoWithPlugins.png)

While generating your repo from there, you can choose to "✅ include all branches".  
Or, if you've already generated your repo, you can merge in the branches manually.

Either way:

```shell
git merge with/{plugin-name}
```
