'use client'
/* eslint-disable @next/next/no-head-element */
import React from 'react'
import { AppRegistry } from 'react-native'
import { useServerInsertedHTML } from 'next/navigation'
import RootLayout from './layout'
import { getInjectableMediaQueries } from 'aetherspace/styles'

/* --- <ServerStylesInjector> ------------------------------------------------------------------------------ */

const ServerStylesInjector = (props: { children: React.ReactNode }) => {
  // Props
  const { children } = props

  // -- Serverside Styles --

  useServerInsertedHTML(() => {
    // Get react-native-web styles
    const Main = () => <RootLayout>{children}</RootLayout>
    AppRegistry.registerComponent('Main', () => Main) // @ts-ignore
    const mainApp = AppRegistry.getApplication('Main')
    const reactNativeStyleElement = mainApp.getStyleElement()
    // Get aetherspace styles
    const aetherQueries = getInjectableMediaQueries()
    // Inject styles
    return (
      <>
        {reactNativeStyleElement}
        <style type="text/css" dangerouslySetInnerHTML={{ __html: aetherQueries.css }} />
      </>
    )
  })

  // -- Render --

  return null
}

/* --- Exports --------------------------------------------------------------------------------- */

export default ServerStylesInjector
