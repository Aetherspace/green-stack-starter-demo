import { use, useEffect, useState } from 'react'
import { SWRConfig, unstable_serialize, useSWRConfig } from 'swr'
import { AetherPageProps, AetherScreenConfig } from './AetherPage.types'
import { swrMiddlewareRegistry } from 'registries/swrMiddleware'

/* --- Helpers --------------------------------------------------------------------------------- */

const getSSRData = () => {
  const $ssrData = document.getElementById('ssr-data')
  const ssrDataText = $ssrData?.getAttribute('data-ssr')
  const ssrData = ssrDataText ? (JSON.parse(ssrDataText) as Record<string, any>) : null
  return ssrData
}

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = <SC extends AetherScreenConfig>(props: AetherPageProps<SC>) => {
  // Props
  const { params: routeParams, searchParams, screen, screenConfig, skipFetching, ...restProps } = props // prettier-ignore
  const { graphqlQuery, getGraphqlVars, getGraphqlData } = screenConfig

  // State
  const [hydratedData, setHydratedData] = useState<Record<string, any> | null>(null)

  // Hooks
  const { mutate } = useSWRConfig()

  // Screen
  const PageScreen = screen

  // Vars
  const variables = getGraphqlVars ? getGraphqlVars({ ...searchParams, ...routeParams }) : {}
  const fallbackKey = unstable_serialize([graphqlQuery, variables])
  const isServer = typeof window === 'undefined'

  // -- Effects --

  useEffect(() => {
    const ssrData = getSSRData()
    if (ssrData && !skipFetching) {
      mutate(fallbackKey, ssrData, false) // Save the SSR data to the SWR cache
      setHydratedData(ssrData) // Save the SSR data to state, removing the SSR data from the DOM
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // -- Skip Fetching? --

  if (skipFetching) {
    return <PageScreen params={routeParams} {...restProps} />
  }

  // -- Browser --

  if (!isServer) {
    const hydrationData = hydratedData || getSSRData()
    const fallback = hydrationData ? { [fallbackKey]: hydrationData } : {}
    const renderHydrationData = !!hydrationData && !hydratedData // Only render the hydration data if it's not already in state

    return (
      <SWRConfig value={{ use: swrMiddlewareRegistry, fallback }}>
        {renderHydrationData && <div id="ssr-data" data-ssr={JSON.stringify(hydrationData)} />}
        <PageScreen params={routeParams} {...restProps} {...hydrationData} />
      </SWRConfig>
    )
  }

  // -- Server --

  const ssrData = use(getGraphqlData!(graphqlQuery!, { variables }))

  return (
    <SWRConfig value={{ use: swrMiddlewareRegistry, fallback: { [fallbackKey]: ssrData } }}>
      {!!ssrData && <div id="ssr-data" data-ssr={JSON.stringify(ssrData)} />}
      <PageScreen params={routeParams} {...restProps} {...ssrData} />
    </SWRConfig>
  )
}
