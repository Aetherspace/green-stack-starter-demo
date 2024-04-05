'use client'
import React from 'react'
import UniversalAppProviders from '@app/core/screens/UniversalAppProviders'
import { Link as NextContextLink } from '@app/core/navigation/Link.next'
import { useRouter as useNextContextRouter } from '@app/core/navigation/useRouter.next'
import { useRouteParams as useNextRouteParams } from '@app/core/navigation/useRouteParams.next'

// -i- This is a regular react client component
// -i- It's still rendered on the server during SSR, but it also hydrates on the client
// -i- That makes this file a good place to do "client-only" things for web:
// -i- like rendering our universal apps providers (supported during SSR in client components)

/* --- Types ----------------------------------------------------------------------------------- */

type NextClientRootLayoutProps = {
    children: React.ReactNode
}

/* --- <NextClientRootLayout/> ---------------------------------------------------------------- */

const NextClientRootLayout = ({ children }: NextClientRootLayoutProps) => {
    // Navigation
    const nextContextRouter = useNextContextRouter()

    // -- Render --
    
    return (
        <UniversalAppProviders
            contextLink={NextContextLink}
            contextRouter={nextContextRouter}
            useContextRouteParams={useNextRouteParams}
        >
            {children}
        </UniversalAppProviders>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */
  
export default NextClientRootLayout
