/* @jsxImportSource react */
import type { ReactNode } from 'react'
import Document from './Document'
import NextClientRootLayout from './NextClientRootLayout'

// -i- This is a react server component that serves as the root (server) layout for our app
// -i- Use this file to do server-only things for web:
// -i- like rendering the document & html setup or exporting metadata
// -i- At the innermost level, we'll render our client layout with e.g. our app providers

/* --- Types ----------------------------------------------------------------------------------- */

type NextServerRootLayoutProps = {
    children: ReactNode
}

/* --- <NextServerRootLayout/> ----------------------------------------------------------------- */

const NextServerRootLayout = ({ children }: NextServerRootLayoutProps) => (
    <Document>
        <NextClientRootLayout>
            {children}
        </NextClientRootLayout>
    </Document>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default NextServerRootLayout
