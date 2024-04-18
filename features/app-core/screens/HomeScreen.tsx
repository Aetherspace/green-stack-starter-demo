import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from '../navigation/Link'
import { Image } from '../components/Image'
import { healthCheckFetcher } from '../resolvers/healthCheck.fetcher'
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

queryBridge['fetcherDataToProps']

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = (props: HydratedRouteProps<typeof queryBridge>) => {
  // Props
  const { serverHealth } = props

  // -- Render --

  return (
    <View style={styles.container}>
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} style={{ marginBottom: 12 }} />
      <Text style={styles.title}>Expo + Next.js app routing 🚀</Text>
      <Text style={styles.subtitle}>Open HomeScreen.tsx in features/app-core/screens to start working on your app</Text>
      <Link href="/subpages/aetherspace" style={styles.link}>Test navigation</Link>
      <Link href="/images" style={styles.link}>Test images</Link>
      {serverHealth ? (
        <Link href={`${serverHealth.apiURL}/health?echo=${serverHealth.echo}`} target="_blank" style={styles.link}>Test API</Link>
      ) : (
        <Text style={{ ...styles.link,  }}>{'Loading server health...'}</Text>
      )}
      <Link href="https://universal-base-starter-docs.vercel.app/" target="_blank" style={styles.link}>Docs</Link>
    </View>
  )
}

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
