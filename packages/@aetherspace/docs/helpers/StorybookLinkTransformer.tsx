import React, { useEffect } from 'react'

/* --- <StorybookLinkTransformer/> ------------------------------------------------------------- */

const StorybookLinkTransformer = (props) => {
  // Props
  const { children } = props

  // -- Memoizations --

  useEffect(() => {
    console.log('[StorybookLinkTransformer]', props)
  }, [])

  // -- Render --

  return <>{children}</>
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StorybookLinkTransformer
