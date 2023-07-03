/* eslint-disable @next/next/no-head-element */
import React from 'react'
// Layouts
import RootLayout from './layout'
// Styles
import ServerStylesInjector from './ssr-style-injector'
// Constants
import { getBaseUrl } from 'aetherspace/utils/envUtils'

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

/* --- Metadata -------------------------------------------------------------------------------- */

export const metadata = {
  metadataBase: getBaseUrl(),
}

/* --- <Document> ------------------------------------------------------------------------------ */

const Document = (props: { children: React.ReactNode }) => {
  // Props
  const { children } = props

  // -- Render --

  return (
    <html>
      <head>
        {/* - TODO: Icons - /}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* - Title & Keywords - */}
        <title>My GREEN stack app</title>
        {/* - Styling - */}
        <ServerStylesInjector>{children}</ServerStylesInjector>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssReset }} />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: nextReset }} />
        {/* - Other - */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Document
