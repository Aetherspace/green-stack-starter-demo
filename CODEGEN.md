## Codegen, registries and enabling universal routing ⚙️ <a name="codegen-universal-routing"></a>

```
⚠️ The ideas in this section are still WIP and not yet part of the starter template
```

`aetherspace` comes with codegen in the form of node scripts runnable with:

```bash
yarn workspace aetherspace run aether-script {scriptName} {options}
```

One area where this definitely helps is routing. As you likely know, next.js uses file based routing with the `/pages/` directory. However, mobile navigation, namely navigators, stacks and screens, are a whole other concept entirely.

Meaning that adding a new route for web, will also require a manual change in app navigation for Expo. Resulting in double work that could get forgotten.

Luckily, `/packages/aetherspace` has a node script that analyses the pages directory in an `/apps/...-next` app, and generates an `{app-name}/@generated/screensRegistry` file automatically based on that, linking route paths to screens. This registry can then be used in `/apps/...-expo` to automagically build a mobile stack navigator for you ⚡️

> Essentially bringing the power of directory based routing to Expo 🎉 (... *with some extra steps)

#### 🪄 Automagic JSON + GraphQL API and Type generation with Schemas and `@aetherspace/utils/aetherResolver`

When writing your own apis, there is usually a lot of boilerplate to deal with. Not to mention that you can't have the types and documentation get out of date with the implementation.

To avoid using manual labour, Aetherspace introduces a way to provide all of these things + the ability to generate a GraphQL resolver *AND* api route from a Schema (serving as single source of truth) and wrapping that resolver with `aetherResolver()`.

For example:

```ts
const SayHiResolverArgsSchema = { name: AetherString };
const SayHiResolverRespSchema = { greeting: AetherString };

export type SayHiResolverArgsType = AetherSchema<SayHiResolverArgsSchema>;
export type SayHiResolverRespType = AetherSchema<SayHiResolverRespoType>;

export const sayHiResolver = aetherResolver<SayHiResolverArgsType>(
    ({ args }) => ({ greeting: `Hello ${args.name}` }),
    SayHiResolverArgsSchema,
    SayHiResolverRespSchema,
);

export const sayHiNextJSApiHandler = sayHiResolver.buildApiHandler();
export const sayHiGQLResolver = sayHiResolver.buildGraphQLQuery();
export const sayHiDocsBlock = sayHiResolver.buildStorybookDocs();

const { greeting } = await sayHiResolver('Thorr');
console.log(greeting); // "Hello Thorr"
```

Via either `AetherSchema` or `aetherResolver` typescript types can be inferred in editor via generics. Since GraphQL has its own typesystem and codegen solutions, these types can then even be exported via gql codegen into a centralized `graphql.d.ts` for use wherever in your code.

#### 🗄 Other registries & how they help

While building the `screensRegistry` for universal routing, Aetherspace can also detect specific exported modules and/or types and centralize them in their own grouped registries under `packages/@generated` 👇

- `@generated/screensRegistry`
- `@generated/componentRegistry`
- `@generated/hooksRegistry`
- `@generated/apiRegistry`
- `@generated/typesRegistry`
- `@generated/hooksRegistry`

This can significantly help reduce the amount of imports you need to write, as well 