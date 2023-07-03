import React, { useEffect } from 'react'

/** --- transformLinks() ----------------------------------------------------------------------- */
/** -i- Replace certain Markdown links so they work in Storybook as well as Github */
const transformLinks = (replaceMap: Record<string, string>) => {
  const $allLinks = Array.from(document.querySelectorAll('a[href]'))
  const $allSrcs = Array.from(document.querySelectorAll('img[src]'))
  const $allLinksAndSrcs = [...$allLinks, ...$allSrcs]
  $allLinksAndSrcs.forEach(($link) => {
    // Replace hrefs
    const href = $link.getAttribute('href') || ''
    if (href && replaceMap[href]) $link.setAttribute('href', replaceMap[href])
    // Replace src attributes
    const src = $link.getAttribute('src') || ''
    if (src && replaceMap[src]) $link.setAttribute('src', replaceMap[src])
  })
}

/* --- <StorybookLinkTransformer/> ------------------------------------------------------------- */

const StorybookLinkTransformer = (props) => {
  // Props
  const { children } = props

  // -- Memoizations --

  useEffect(() => {
    transformLinks({
      // - Images -
      '/.storybook/public/TransformToolsExampleRNSVG.png': '/TransformToolsExampleRNSVG.png',
      // - Hrefs -
      '?path=/packages/@aetherspace/README.md': '?path=/docs/aetherspace-quickstart--page',
      '?path=/packages/@aetherspace/core/README.md': '?path=/docs/aetherspace-core-concepts--page',
      '?path=/packages/@aetherspace/navigation/README.md': '?path=/docs/aetherspace-universal-routing--page',
      '?path=/packages/@aetherspace/navigation/AetherPage/README.md': '?path=/docs/aetherspace-graphql-data-fetching--page',
      '?path=/packages/@aetherspace/components/AetherIcon/README.md': '?path=/docs/aetherspace-icon-management--page',
      '?path=/packages/@aetherspace/scripts/README.md': '?path=/docs/aetherspace-automation--page',
      '?path=/packages/@aetherspace/schemas/README.md': '?path=/docs/aetherspace-single-sources-of-truth--page',
      '?path=/.github/workflows/README.md': '?path=/docs/aetherspace-deployment--page',
      '?path=/LICENSE.md': '?path=/docs/aetherspace-license--page',
    })
  }, [])

  // -- Render --

  return <>{children}</>
}

/* --- Exports --------------------------------------------------------------------------------- */

export default StorybookLinkTransformer
