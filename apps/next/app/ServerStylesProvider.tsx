'use client'
/* eslint-disable @next/next/no-head-element */
import React from 'react'
import { AppRegistry } from 'react-native'
import { useServerInsertedHTML } from 'next/navigation'
import UniversalRootLayout from '@app/core/screens/UniversalRootLayout'

// -i- This is a regular react client component
// -i- However, it is rendered on the server during SSR
// -i- Use this file to generate your SSR style elements to apply before hydration on web

/* --- <ServerStylesProvider> ------------------------------------------------------------------ */

const ServerStylesProvider = (props: { children: React.ReactNode }) => {
    // Props
    const { children } = props
  
    // -- Serverside Styles --
  
    useServerInsertedHTML(() => {
      // Get react-native-web styles
      const Main = () => <UniversalRootLayout>{children}</UniversalRootLayout>
      AppRegistry.registerComponent('Main', () => Main) // @ts-ignore
      const mainApp = AppRegistry.getApplication('Main')
      const reactNativeStyleElement = mainApp.getStyleElement()
      // Inject styles
      return (
        <>
          {reactNativeStyleElement}
          {/* TODO: Insert other SSR'd styles here */}
        </>
      )
    })
  
    // -- Render --
  
    return null
  }
  
  /* --- Exports --------------------------------------------------------------------------------- */
  
  export default ServerStylesProvider

