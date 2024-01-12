'use client'
import { useEffect } from 'react'
import tailwindConfig from 'app/tailwind.config'
import { AetherContextManager } from 'aetherspace/context'
import useLoadFonts from 'app/hooks/useLoadFonts'
import { setPublicEnvVars, setGlobal } from 'aetherspace/utils'

/* --- Public Env Vars ------------------------------------------------------------------------- */

// -i- This ensures that public env vars can be retrieved via the getEnvVar() util
// -i- @expo/next-adapter rewrites process.env to {}, but does inject statically known env vars
// -i- Meaning utils for getting env vars cross platform would not work, since they don't know the keys beforehand
// -!- Use only for public env vars (client-side any process.env.SOME_KEY without NEXT_PUBLIC_ would be undefined)
setPublicEnvVars({
  APP_LINKS: process.env.NEXT_PUBLIC_APP_LINKS,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
})

/* --- <NextRootLayout/> ----------------------------------------------------------------------- */

const NextClientRootLayout = (props: { children: React.ReactNode }) => {
  // Props
  const { children } = props

  // -- Fonts --

  useLoadFonts()

  // -- Effects --

  useEffect(() => {
    setGlobal('getAuthToken', undefined) // TODO: Add an auth solution like Clerk
  }, [])

  // -- Render --

  return (
    <>
      <AetherContextManager
        assets={{}}
        icons={{}}
        twConfig={tailwindConfig}
        // getAuthToken={}
        isAppDir
        isNextJS
      >
        {children}
      </AetherContextManager>
    </>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default NextClientRootLayout
