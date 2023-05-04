import { use } from 'react'
import { SWRConfig, unstable_serialize } from 'swr'
// Types
import { AetherPageProps, AetherScreenConfig } from './AetherPage.types'

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = <SC extends AetherScreenConfig>(props: AetherPageProps<SC>) => {
  // Props
  const { params: routeParams, searchParams, screen, screenConfig, ...restProps } = props
  const { query, getGraphqlVars, getGraphqlData } = screenConfig

  // Screen
  const PageScreen = screen

  // Vars
  const variables = getGraphqlVars({ ...searchParams, ...routeParams })
  const fallbackKey = unstable_serialize([query, variables])
  const isServer = typeof window === 'undefined'

  // -- Browser --

  if (!isServer) {
    const $ssrData = document.getElementById('ssr-data')
    const ssrDataText = $ssrData?.getAttribute('data-ssr')
    const hydrationData = ssrDataText ? (JSON.parse(ssrDataText) as Record<string, any>) : null
    const fallback = hydrationData ? { [fallbackKey]: hydrationData } : {}

    return (
      <SWRConfig value={{ fallback }}>
        {!!hydrationData && <div id="ssr-data" data-ssr={ssrDataText} />}
        <PageScreen {...restProps} {...hydrationData} />
      </SWRConfig>
    )
  }

  // -- Server --

  const ssrData = use(getGraphqlData(query, variables))

  return (
    <SWRConfig value={{ fallback: { [fallbackKey]: ssrData } }}>
      {!!ssrData && <div id="ssr-data" data-ssr={JSON.stringify(ssrData)} />}
      <PageScreen {...restProps} {...ssrData} />
    </SWRConfig>
  )
}
