import React, { useEffect } from 'react'

/* --- <StorybookFontTransformer/> ------------------------------------------------------------- */

const StorybookFontTransformer = (props) => {
  // Props
  const { children } = props

  // -- Memoizations --

  useEffect(() => {
    // Apply default Storybook docs font
    const $html = document.querySelector('html')
    if ($html) $html.style.fontFamily = `"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica` // prettier-ignore
  }, [])

  // -- Render --

  return <>{children}</>
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StorybookFontTransformer
