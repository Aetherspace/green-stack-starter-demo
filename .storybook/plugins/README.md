# Aetherspace Plugin Branches

While you can use any package you want in your Aetherspace monorepo, we've created a few plugin branches to make your life easier.

Some example use cases of merging in these plugin branches from the starter repo:
- Scripts to generate code from your schemas or assets (like converting .svg `with/green-stack-icons`)
- Utils to turn your schemas into models for your database (like on the `with/mongoose` branch)
- Extra helpers to make your life easier

---
> 💚 To use plugin branches, you do need [access to the official green-stack-starter](https://github.com/sponsors/codinsonn).
---

While generating your repo from there, you can choose to "✅ include all branches".  
Or, if you've already generated your repo, you can merge in the branches manually.

Either way:

```shell
git merge with/{plugin-name}
```
