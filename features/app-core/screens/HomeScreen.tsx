import React from 'react'
import { View, Link, Image, P, H3 } from '../components/styled'
import { healthCheckFetcher } from '../resolvers/healthCheck.query'
import { HydratedRouteProps, createQueryBridge } from '../navigation/UniversalRouteScreen.helpers'

/* --- Data Fetching --------------------------------------------------------------------------- */

export const queryBridge = createQueryBridge({
  routeParamsToQueryKey: (routeParams: { echo: string }) => ['healthCheck', routeParams.echo],
  routeParamsToQueryInput: (routeParams: { echo: string }) => ({ echo: routeParams.echo }),
  routeDataFetcher: healthCheckFetcher,
  fetcherDataToProps: (fetcherData: Awaited<ReturnType<typeof healthCheckFetcher>>) => ({
    serverHealth: fetcherData
  }),
})

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = (props: HydratedRouteProps<typeof queryBridge>) => {
  // Props
  const { serverHealth } = props

  // -- Render --

  return (
    <View className="flex flex-1 justify-center items-center">
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} className="mb-3" />
      <H3 className="text-center">Expo + Next.js app routing 🚀</H3>
      <P className="mt-2 text-center text-sm">Open HomeScreen.tsx in features/app-core/screens to start working on your app</P>
      <Link href="/subpages/aetherspace" className="mt-4 text-center text-base">
        Test navigation
      </Link>
      <Link href="/images" className="mt-4 text-center text-base">
        Test images
      </Link>
      {serverHealth?.graphURL ? (
        <Link href={serverHealth.graphURL} target="_blank" className="mt-4 text-center text-base">
          Test GraphQL
        </Link>
      ) : (
        <P className="mt-4 text-center text-base">
          {'Loading server health...'}
        </P>
      )}
      <Link href="https://universal-base-starter-docs.vercel.app/" target="_blank" className="mt-4 text-center text-base">
        Docs
      </Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
