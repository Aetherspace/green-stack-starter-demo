import React from 'react'
import UniversalRootLayout from '@app/screens/UniversalRootLayout'
import ServerStylesProvider from './ServerStylesProvider'
import '../global.css'

// -i- This is a react server component
// -i- Use this file to set up your Next.js app's html skeleton
// -i- It's advised to also inject server side styles here for SSR

/* --- <Document> ------------------------------------------------------------------------------ */

const Document = (props: { children: React.ReactNode }) => {
  // Props
  const { children } = props

  // -- Render --

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* - Title & Keywords - */}
        <title>Universal App Router</title>
        {/* - Styling - */}
        <ServerStylesProvider>{children}</ServerStylesProvider>
        {/* - Other - */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <UniversalRootLayout>
          {children}
        </UniversalRootLayout>
      </body>
    </html>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Document
