import React from 'react'
import { HydratedRouteProps, createQueryBridge } from '@green-stack/navigation/UniversalRouteScreen.helpers'
import { View, Link, Image, P, H3, Text } from '../components/styled'
import { healthCheckFetcher } from '../resolvers/healthCheck.query'

/* --- Data Fetching --------------------------------------------------------------------------- */

export const queryBridge = createQueryBridge({
  routeDataFetcher: healthCheckFetcher,
  routeParamsToQueryKey: (routeParams) => ['healthCheck', routeParams.echo],
  routeParamsToQueryInput: (routeParams) => ({ healthCheckArgs: { echo: routeParams.echo } }),
  fetcherDataToProps: (fetcherData) => ({ serverHealth: fetcherData?.healthCheck }),
})

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = (props: HydratedRouteProps<typeof queryBridge>) => {
  // Props
  const { serverHealth } = props

  // -- Render --

  return (
    <View className="flex flex-1 justify-center items-center px-2">
      <Image src={require('../assets/green-stack-logo.png')} width={60} height={60} className="mb-3" />
      <H3 className="text-center max-w-[240px]">Full-Product, Universal App with the GREEN-stack 🚀</H3>
      <P className="mt-2 text-center text-sm px-6 md:px-0">
        Open <Text className="font-bold">HomeScreen.tsx</Text> in <Text className="italic">features/@app-core/screens</Text> to start working on your app
      </P>
      <Link href="/subpages/[slug]" params={{ slug: 'GREEN%20stack', count: 0 }} className="mt-4 text-center text-base">
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
