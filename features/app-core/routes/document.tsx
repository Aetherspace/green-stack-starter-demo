/* eslint-disable @next/next/no-head-element */
import React from 'react'
import { AppRegistry } from 'react-native'
import { useServerInsertedHTML } from 'next/navigation'
// Layouts
import RootLayout from './layout'
// Styles
import { getInjectableMediaQueries } from 'aetherspace/styles'

/* --- Styles ---------------------------------------------------------------------------------- */

export const cssReset = `
/**
 * Building on the RNWeb reset:
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
 */
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}
#__next {
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
html {
  scroll-behavior: smooth;
  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
  -webkit-text-size-adjust: 100%;
  height: 100%;
}
body {
  display: flex;
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  font-family: -apple-system, system, Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`

export const nextReset = `
div[data-nextjs-scroll-focus-boundary] {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
}
`

/* --- <Document> ------------------------------------------------------------------------------ */

const Document = (props: { children: React.ReactNode }) => {
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

  return (
    <html>
      <head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssReset }} />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: nextReset }} />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Document
