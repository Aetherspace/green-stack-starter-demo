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

## TODO: To be Continued...

...
