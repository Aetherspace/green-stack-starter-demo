import React from 'react'
import { View, Image, H3, P, Link } from '../components/styled'
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
    <View className="flex flex-1 justify-center items-center">
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} className="mb-3" />
      <H3 className="text-center">Expo + Next.js app routing 🚀</H3>
      <P className="mt-2 text-center text-sm">Open HomeScreen.tsx in features/app-core/screens to start working on your app</P>
      <Link className="mt-4 text-center text-base" href="/subpages/aetherspace">
        Test navigation
      </Link>
      <Link className="mt-4 text-center text-base" href="/images">
        Test images
      </Link>
      {serverHealth ? (
        <Link href={serverHealth.graphURL} target="_blank" className="mt-4 text-center text-base">
          Test GraphQL
        </Link>
      ) : (
        <P className="mt-4 text-center text-base">
          {'Loading server health...'}
        </P>
      )}
      <Link className="mt-4 text-center text-base" href="https://universal-base-starter-docs.vercel.app/" target="_blank">
        Docs
      </Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
