import React from 'react'
import { StatusBar } from 'expo-status-bar'
// Navigation
import { AetherLink, useAetherNav } from 'aetherspace/navigation'
// Primitives
import { AetherView, AetherText, AetherImage, AetherPressable } from 'aetherspace/primitives'
// SEO
import { H1 } from 'aetherspace/html-elements'
// Hooks
import { useDocAddress, useAPICheck } from 'aetherspace/docs'
import { getEnvVar } from 'aetherspace'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  // Vars
  const appURIs = getEnvVar('APP_LINKS')?.split('|').filter((url) => url.includes('http')) || [] // prettier-ignore

  // Hooks
  const docsURI = useDocAddress()
  const { healthEndpoint, graphQLEndpoint } = useAPICheck(appURIs)
  const { openLink } = useAetherNav()

  // -- Render --

  return (
    <AetherView tw="flex-1 bg-white items-center justify-center">
      <StatusBar style="auto" />
      <AetherLink to="https://aetherspace-green-stack-starter.vercel.app/author">
        <AetherImage
          src="/img/icon.png"
          tw={['w-20 h-20 mt-0 mb-3 overflow-hidden', true && 'rounded-full']} // Assign conditional classes with an array
        />
      </AetherLink>
      <H1 tw="text-green-500 pb-5 roboto-bold font-bold text-base">Hello GREEN-stack 👋</H1>
      <AetherText tw="px-5 text-center text-sm">
        Open up <AetherText tw="text-gray-500">features/app-core/screens/HomeScreen.tsx</AetherText> to start working on
        your app
      </AetherText>
      <AetherView tw="flex-row pt-4">
        <AetherPressable
          onPress={() => openLink(healthEndpoint || '/api/health')}
          tw="flex-row py-2 px-3 mx-3 bg-gray-700 items-center"
        >
          <AetherText tw="text-white roboto-bold">REST ✅</AetherText>
        </AetherPressable>
        <AetherPressable
          onPress={() => openLink(graphQLEndpoint || '')}
          tw="flex-row py-2 px-3 mx-3 bg-gray-700 items-center"
        >
          <AetherText tw="text-white roboto-bold">GraphQL ✅</AetherText>
        </AetherPressable>
      </AetherView>
      <AetherLink href="/author" tw="roboto-bold pt-5 text-center text-sm" asText>
        Test Navigation
      </AetherLink>
      <AetherLink to={`${docsURI}?path=/story/readme-md--page`} tw="text-xs roboto-bold my-4 px-5">
        {'Read the Docs'}
      </AetherLink>
      <AetherLink to="/author" tw="m-3">
        {'{ ...💚 }'}
      </AetherLink>
    </AetherView>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
