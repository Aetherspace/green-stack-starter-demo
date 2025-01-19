/* @jsxImportSource react */
import { ReactNode } from 'react'
import Document from './Document'
import NextClientRootLayout from './NextClientRootLayout'
import { headers } from 'next/headers'
import { parseIfJSON } from '@green-stack/utils/apiUtils'

// -i- This is a react server component that serves as the root (server) layout for our app
// -i- Use this file to do server-only things for web:
// -i- like rendering the document & html setup or exporting metadata
// -i- At the innermost level, we'll render our client layout with e.g. our app providers

/* --- Types ----------------------------------------------------------------------------------- */

type NextServerRootLayoutProps = {
    children: ReactNode
}

/* --- <NextServerRootLayout/> ----------------------------------------------------------------- */

const NextServerRootLayout = async ({ children }: NextServerRootLayoutProps) => {
    
    const headersContext = await headers()
    const requestContextJSON = await headersContext.get('context')
    const requestContext = parseIfJSON(requestContextJSON)

    // -- Render --

    return (
        <Document>
            <NextClientRootLayout requestContext={requestContext}>
                {children}
            </NextClientRootLayout>
        </Document>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default NextServerRootLayout
