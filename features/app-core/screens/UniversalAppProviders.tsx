'use client'
import React from 'react'

// -i- This is a regular react client component
// -i- Use this file for adding universal app providers
// -i- It will be rendered by 'apps/expo' on mobile from the 'ExpoRootLayout' component
// -i- It will also be rendered by 'apps/next' on web from the 'NextClientRootLayout' component

/* --- Types ----------------------------------------------------------------------------------- */

type UniversalAppProvidersProps = {
    children: React.ReactNode
}

/* --- <UniversalAppProviders/> ---------------------------------------------------------------- */

const UniversalAppProviders = ({ children }: UniversalAppProvidersProps) => (
    <>
        {children}
    </>
)

/* --- Exports --------------------------------------------------------------------------------- */
  
export default UniversalAppProviders
