import React from 'react'
import { AetherContextManager } from 'aetherspace/context'
import useLoadFonts from '../hooks/useLoadFonts'
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
      tw="h-full relative"
      isStorybook
    >
      {children}
    </AetherContextManager>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StoryContextProviders
