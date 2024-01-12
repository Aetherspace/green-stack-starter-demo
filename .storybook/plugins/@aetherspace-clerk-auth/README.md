<a href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank">
  <img src="/packages/@aetherspace/assets/AetherspaceLogo.svg" width="50" height="50" />
</a>

<p>
    <a href="https://clerk.com/" target="_blank">
        <img alt="Clerk Auth Logo" longdesc="Cross Platform Auth with Clerk" src="https://camo.githubusercontent.com/02b3799f98edbed5bafa868dbd884287f249d3153e53c34b3c05855adf2478a2/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d436c65726b26636f6c6f723d364334374646266c6f676f3d436c65726b266c6f676f436f6c6f723d464646464646266c6162656c3d" />
    </a>
</p>

# `@aetherspace/clerk-auth` - Aetherspace Plugin

Prerequisites:
- [Sponsor Aetherspace on Github](https://github.com/Aetherspace/green-stack-starter-demo#readme) or get access to it some other way
- Fork or generate a new repository from the official or free [aetherspace/green-stack-starter](https://github.com/Aetherspace/green-stack-starter#readme) github repo
- Choose the "✅ Include all branches" option during the fork / generation process
- [Set up an account on clerk.com](https://clerk.com/)
- Add your `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `apps/next/.env`

```shell
git merge with/clerk-auth
```

<p style={{ padding: "12px" }} />  

## Cross platform authentication with Clerk and Aetherspace:

After a yarn install, you'll be able to use `@aetherspace/clerk-auth` to import a bunch of handy clerk auth  helpers:

```shell
│── apps/
│   └── nextjs/
│       └── middleware.ts/ # ➡️ Clerk auth middleware already set up for you
│
│── packages/
│   └── @aetherspace-clerk-auth/
│       └── schemas/ # ➡️ Zod schemas for clerk datastructures to re-use for types, resolvers & docs
│       └── context/ # ➡️ Universal context for clerk on web & native
│       └── hooks/ # ➡️ Universal hooks for clerk on web & native
│       └── middleware/ # ➡️ SWR middleware to ensure clerk auth headers are included on mobile
│       └── utils/ # ➡️ Utils to create auth related request context in Next.js middleware
│       └── components/ # ➡️ Handy universal components like a SignOutButton you can make your own
```

We'll also set you up with a `features/user-managment` workspace for some example integration code:

```shell
│── features/
│   └── user-managment/ # ➡️ importable from 'user-management'
│       └── schemas/ # ➡️ Zod schemas for state management & auth request context
│       └── hooks/ # ➡️ Typed form states for the clerk based auth forms
│       └── screens/ # ➡️ Example SignIn, SignUp, UserInfo screens
│       └── routes/ # ➡️ Example routes for '/sign-in', '/sign-up', '/me'
│       └── resolvers/ # ➡️ Retrieve user data from the request context
```

<p style={{ padding: "12px" }} />  

## Checking the authenticated user context on the server

After signing in through our example `/sign-in` or `/sign-up` routes, you can check the user context on the data resolver context in our example `/api/context` route.

We've also provided an example `UserInfoScreen.tsx` that integrates with this `getRequestContext()` resolver and prints it out in the browser or the mobile app on the `/me` route.

This auth context will be available on all resolvers when logged in, and will be `null` or `undefined` when not authenticated. Feel free to use this context to to integrate with user data in DB queries, check for permissions or roles in your resolvers, or do stuff with e.g. the users name / email / etc.

> Do note that this is just the recommended way to get the user context **on the server**, but Clerk provides better ways to **retrieve this data on the client**:

- [Clerk Docs - useAuth()](https://clerk.com/docs/references/react/use-auth) -- importable as `useAuth` from `@aetherspace/clerk-auth/hooks`
- [Clerk Docs - useUser()](https://clerk.com/docs/references/react/use-user) -- importable as `useUser` from `@aetherspace/clerk-auth/hooks`

In general, you should **use the Clerk hooks on the client**, and the **request context in your resolvers on the server**.

<p style={{ padding: "12px" }} />  

### Next.js `middleware.ts` and `createRequestContext()`

Merging this plugin will edit the `middleware.ts` file in your `apps/nextjs` workspace to include a `createRequestContext()` function. This is what will actually create the request context for you on all requests under the hood. Feel free to edit this helper function, but know that due to limitations in Next.js middleware, you can only have it include JSON serializable data. (and not e.g. Classes or functions)

You can find it at `packages/@aetherspace-clerk-auth/utils/createRequestContext.ts`

> For further reading on integrating Clerk auth with next.js middleware:

- [Clerk Docs - authMiddleware()](https://clerk.com/docs/references/nextjs/auth-middleware) -- importable as `authMiddleware` from `@clerk/nextjs`
- [Next.js Docs - Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) -- defined at `apps/nextjs/middleware.ts`
