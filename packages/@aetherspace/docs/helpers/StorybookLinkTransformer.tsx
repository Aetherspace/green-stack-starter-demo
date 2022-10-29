import React, { useEffect } from 'react'

/* --- Transform links ------------------------------------------------------------------------- */

const transformLinks = (replaceMap: Record<string, string>) => {
  const $allLinks = document.querySelectorAll('a[href]')
  $allLinks.forEach(($link) => {
    const href = $link.getAttribute('href') || ''
    if (replaceMap[href]) $link.setAttribute('href', replaceMap[href])
  })
}

/* --- <StorybookLinkTransformer/> ------------------------------------------------------------- */

const StorybookLinkTransformer = (props) => {
  // Props
  const { children } = props

  // -- Memoizations --

  useEffect(() => {
    transformLinks({
      '?path=/packages/@registries/README.md': '?path=/docs/aetherspace-automation--page',
      '?path=/packages/@aetherspace/schemas/README.md': '?path=/docs/aetherspace-single-sources-of-truth--page', // prettier-ignore
    })
  }, [])

  // -- Render --

  return <>{children}</>
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StorybookLinkTransformer
