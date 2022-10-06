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
import GraphIcon from '../icons/GraphIcon'
import ReactIcon from '../icons/ReactIcon'
import ExpoIcon from '../icons/ExpoIcon'
import StorybookIcon from '../icons/StorybookIcon'
import NextIcon from '../icons/NextIcon'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  // Vars
  const appURIs = getEnvVar('APP_LINKS')?.split('|').filter((url) => url.includes('http')) || [] // prettier-ignore
  const ICON_SIZE = 32
  const ICON_COLOR = '#22c55e'

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
      <H1 tw="text-green-500 pb-2 roboto-bold font-bold text-base">Hello 'GREEN-stack' 👋</H1>
      <AetherView tw="flex-row">
        <AetherLink href="https://expo.dev/home" tw="px-2">
          <ExpoIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </AetherLink>
        <AetherLink href="https://nextjs.org/" tw="px-2">
          <NextIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </AetherLink>
        <AetherLink href="https://reactnative.dev/" tw="px-2">
          <ReactIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </AetherLink>
        <AetherLink href="https://storybook.js.org/" tw="px-2">
          <StorybookIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </AetherLink>
        <AetherLink href="https://www.apollographql.com/" tw="px-2">
          <GraphIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </AetherLink>
      </AetherView>
      <AetherText tw="pt-5 pb-3 px-4 text-center text-sm">
        Open up <AetherText tw="text-gray-500">features/app-core/screens/HomeScreen.tsx</AetherText> to start working on
        your app
      </AetherText>
      <AetherView tw="flex-row pt-3">
        <AetherPressable
          onPress={() => openLink(healthEndpoint || '/api/health')}
          tw="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
        >
          <AetherText tw="text-white roboto-bold text-sm">REST ✅</AetherText>
        </AetherPressable>
        <AetherPressable
          onPress={() => openLink(graphQLEndpoint || '/api/graphql')}
          tw="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
        >
          <AetherText tw="text-white roboto-bold text-sm">GraphQL ✅</AetherText>
        </AetherPressable>
      </AetherView>
      <AetherLink href="/author" tw="roboto-bold pt-5 text-center text-sm" asText>
        Test Navigation
      </AetherLink>
      <AetherLink to={`${docsURI}?path=/story/readme-md--page`} tw="text-xs roboto-bold my-4 px-5">
        {'Read the Docs'}
      </AetherLink>
      <AetherLink to="/author" tw="m-2">
        {'{ ...💚 }'}
      </AetherLink>
    </AetherView>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
