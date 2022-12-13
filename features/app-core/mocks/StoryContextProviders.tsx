import React from 'react'
// Providers
import { AetherContextManager } from 'aetherspace/context'
// Hooks
import useLoadFonts from '../hooks/useLoadFonts'
// Styles
import tailwindConfig from '../tailwind.config'

/* --- <StoryContextProviders/> ---------------------------------------------------------------- */

const StoryContextProviders = ({ children }) => {
  // Hooks
  useLoadFonts()

  // -- Render --

  return (
    <AetherContextManager
      assets={{}}
      icons={{}}
      twConfig={tailwindConfig}
      tw="relative flex flex-col min-h-full min-w-full bg-white"
    >
      {children}
    </AetherContextManager>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StoryContextProviders
