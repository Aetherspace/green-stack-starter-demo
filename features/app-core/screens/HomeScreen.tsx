import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from '../navigation/Link'
import { Image } from '../components/Image'
import { healthCheckFetcher, HealthCheckQueryResult } from '../resolvers/healthCheck.query'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  // State
  const [serverHealth, setServerHealth] = React.useState<HealthCheckQueryResult['healthCheck'] | null>(null)

  // -- Effects --

  React.useEffect(() => {
    const fetchServerHealth = async () => {
      try {
        const healthCheckData = await healthCheckFetcher({ echo: 'Hello from the client!' })
        setServerHealth(healthCheckData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchServerHealth()
  }, [])

  // -- Render --

  return (
    <View style={styles.container}>
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} style={{ marginBottom: 12 }} />
      <Text style={styles.title}>Expo + Next.js app routing 🚀</Text>
      <Text style={styles.subtitle}>Open HomeScreen.tsx in features/app-core/screens to start working on your app</Text>
      <Link href="/subpages/aetherspace" style={styles.link}>Test navigation</Link>
      <Link href="/images" style={styles.link}>Test images</Link>
      {serverHealth ? (
        <Link href={serverHealth.graphURL} target="_blank" style={styles.link}>Test GraphQL</Link>
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
