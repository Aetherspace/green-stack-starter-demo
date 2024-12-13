/* @jsxImportSource react */
import type { ReactNode } from 'react'
import UniversalRootLayout from '@app/screens/UniversalRootLayout'
import ServerStylesProvider from './ServerStylesProvider'
import '../global.css'

// -i- This is a react server component
// -i- Use this file to set up your Next.js app's html skeleton
// -i- It's advised to also inject server side styles here for SSR

/* --- <Document> ------------------------------------------------------------------------------ */

const Document = (props: { children: ReactNode }) => {
  // Props
  const { children } = props

  // -- Render --

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* - Title & Keywords - */}
        <title>Universal App Router</title>
        {/* - Other - */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://github.com/user-attachments/assets/a2eecfd2-7889-4079-944b-1b5af6cf5ddf" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="A screenshot of the fullproduct.dev universal app starterkit demo" />
        <meta property="og:image:width" content="2866" />
        <meta property="og:image:height" content="1562" />
      </head>
      <body suppressHydrationWarning>
        <ServerStylesProvider>
          <UniversalRootLayout>
            <main className="flex min-w-screen min-h-screen">{children}</main>
          </UniversalRootLayout>
        </ServerStylesProvider>
      </body>
    </html>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Document
