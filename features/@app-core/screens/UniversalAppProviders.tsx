'use client'
import React from 'react'
import { CoreContext, CoreContextType } from '@green-stack/context/CoreContext'
import { UniversalQueryClientProvider } from '@green-stack/context/UniversalQueryClientProvider'

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
    const { children, contextImage, contextLink, contextRouter, useContextRouteParams } = props

    // State
    const [isDebugMode, setIsDebugMode] = React.useState(false)

    // Flags
    const isExpo = props.isExpo && !props.isNext
    const isNext = props.isNext && !props.isExpo

    // -- Render --

    return (
        <UniversalQueryClientProvider>
            <CoreContext.Provider
                value={{
                    contextImage,
                    contextLink,
                    contextRouter,
                    useContextRouteParams,
                    isExpo,
                    isNext,
                    isDebugMode,
                    setIsDebugMode,
                }}
            >
                {children}
            </CoreContext.Provider>
        </UniversalQueryClientProvider>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */
  
export default UniversalAppProviders
