'use client'
import React from 'react'
import { CoreContext, CoreContextType } from '../context/CoreContext'

// -i- This is a regular react client component
// -i- Use this file for adding universal app providers that work in both Expo and Next.js
// -i- It will be rendered by 'apps/expo' on mobile from the 'ExpoRootLayout' component
// -i- It will also be rendered by 'apps/next' on web from the 'NextClientRootLayout' component

/* --- Types ----------------------------------------------------------------------------------- */

type UniversalAppProvidersProps = CoreContextType & {
    children: React.ReactNode
}

/* --- <UniversalAppProviders/> ---------------------------------------------------------------- */

const UniversalAppProviders = (props: UniversalAppProvidersProps) => {
    // Props
    const { children, contextLink, contextRouter, useContextRouteParams } = props

    // -- Render --

    return (
        <>
            <CoreContext.Provider value={{ contextLink, contextRouter, useContextRouteParams }}>
                {children}
            </CoreContext.Provider>
        </>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */
  
export default UniversalAppProviders
