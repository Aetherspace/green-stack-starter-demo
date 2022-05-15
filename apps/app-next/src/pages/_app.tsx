import 'setimmediate'
import Head from 'next/head'
import { AppProps } from 'next/app'
// Context
import { AetherContextManager } from 'aetherspace/context'
// Hooks
import useLoadFonts from 'app/hooks/useLoadFonts'
// Utils
import { setPublicEnvVars } from 'aetherspace/utils'

/* --- Public Env Vars ------------------------------------------------------------------------------- */

// -i- This ensures that public env vars can be retrieved via the getEnvVar() util
// -i- @expo/next-adapter rewrites process.env to {}, but does inject statically known env vars
// -i- Meaning utils for getting env vars cross platform would not work, since they don't know the keys beforehand
// -!- Use only for public env vars (client-side any process.env.SOME_KEY without NEXT_PUBLIC_ would be undefined)
setPublicEnvVars({
  APP_LINKS: process.env.NEXT_PUBLIC_APP_LINKS,
})

/* --- <AppLayout/> ---------------------------------------------------------------------------------- */

const AppLayout = (props: AppProps) => {
  // Props
  const { Component, pageProps } = props
  const { pageTitle = 'My GREEN stack App' } = pageProps

  // -- Fonts --

  const fontsLoaded = useLoadFonts()
  console.log({ fontsLoaded })

  // -- Render --

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta key="title" name="title" content={pageTitle} />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <AetherContextManager assets={{}} icons={{}} isNextJS>
        <Component {...pageProps} />
      </AetherContextManager>
    </>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AppLayout
