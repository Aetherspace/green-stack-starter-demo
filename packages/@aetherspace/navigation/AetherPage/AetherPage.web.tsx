import { use, useEffect } from 'react'
import { SWRConfig } from 'swr'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherPageProps = {
  PageScreen: React.FC<Record<string, any>>
  fetcher: (fetchKey?: string) => Promise<Record<string, any>>
  fetchKey: string
}

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = (props: AetherPageProps) => {
  // Props
  const { PageScreen, fetcher, fetchKey } = props
  const isServer = typeof window === 'undefined'

  // -- Effects --

  useEffect(() => {
    // Remove the server-side injected initial data.
    const $ssrData = document.querySelector('#ssr-data')
    if ($ssrData) $ssrData.parentElement?.removeChild($ssrData)
  }, [])

  // -- Browser --

  if (!isServer) {
    const $ssrData = document.getElementById('ssr-data')
    const ssrDataText = $ssrData?.getAttribute('data-ssr')
    const data = ssrDataText ? (JSON.parse(ssrDataText) as Record<string, any>) : null
    const fallback = data ? { [fetchKey]: data } : {}

    return (
      <SWRConfig value={{ fallback }}>
        {!!data && <div id="ssr-data" data-ssr={ssrDataText} />}
        <PageScreen {...data} />
      </SWRConfig>
    )
  }

  // -- Server --

  const data = use(fetcher(fetchKey))

  return (
    <SWRConfig value={{ fallback: { [fetchKey]: data } }}>
      {!!data && <div id="ssr-data" data-ssr={JSON.stringify(data)} />}
      <PageScreen {...data} />
    </SWRConfig>
  )
}
