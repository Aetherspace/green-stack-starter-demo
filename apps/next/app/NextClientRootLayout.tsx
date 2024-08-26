'use client'
import React from 'react'
import UniversalAppProviders from '@app/screens/UniversalAppProviders'
import { Image as NextContextImage } from '@green-stack/core/components/Image.next'
import { Link as NextContextLink } from '@green-stack/core/navigation/Link.next'
import { useRouter as useNextContextRouter } from '@green-stack/navigation/useRouter.next'
import { useRouteParams as useNextRouteParams } from '@green-stack/navigation/useRouteParams.next'

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
            contextImage={NextContextImage}
            contextLink={NextContextLink}
            contextRouter={nextContextRouter}
            useContextRouteParams={useNextRouteParams}
            isNext
        >
            {children}
        </UniversalAppProviders>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */
  
export default NextClientRootLayout
