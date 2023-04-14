import React from 'react'
import { StatusBar } from 'expo-status-bar'
// Navigation
import { Link, useAetherNav } from 'aetherspace/navigation'
// Schemas
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'
// Primitives
import { View, Text, Image, Pressable } from 'aetherspace/primitives'
// SEO
import { H1 } from 'aetherspace/html-elements'
// Hooks
import { useDocAddress, useAPICheck } from 'aetherspace/docs'
import { useAetherContext } from 'aetherspace/context'
// Utils
import { getEnvList } from 'aetherspace/utils'
// Icons
import { GraphIcon, ReactIcon, ExpoIcon, StorybookIcon, NextIcon } from '../icons'

/* --- Schemas --------------------------------------------------------------------------------- */

const HomeScreenProps = aetherSchema('HomeScreenProps', {
  customGreeting: z.string().default('Hello GREEN stack 👋').describe('A greeting for the user'), // prettier-ignore
})

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = (props: AetherProps<typeof HomeScreenProps>) => {
  // Props
  const { customGreeting } = HomeScreenProps.parse(props)

  // Environment
  const appURIs = getEnvList('APP_LINKS').filter((url) => url.includes('http')) || [] // prettier-ignore

  // Hooks
  const { isPhoneSize } = useAetherContext()
  const docsURI = useDocAddress()
  const { healthEndpoint, graphQLEndpoint } = useAPICheck(appURIs)
  const { openLink } = useAetherNav()

  // Vars
  const tapOrClick = isPhoneSize ? 'Tap' : 'Click'
  const ICON_COLOR = '#22c55e'
  const ICON_SIZE = 32

  // -- Render --

  return (
    <View class="relative flex w-full h-full items-center justify-center">
      <StatusBar style="auto" />
      <Link to="https://aetherspace-green-stack-starter.vercel.app/author">
        <Image
          src="/img/icon.png"
          alt="App Icon"
          class={[
            'w-20 h-20 mt-0 mb-3 overflow-hidden bg-slate-100',
            true && 'rounded-full', // Assign conditional classes with an array
          ]}
        />
      </Link>
      <H1 class="text-green-500 pb-2 roboto-bold font-bold text-base">{customGreeting}</H1>
      <View class="flex-row">
        <Link href="https://expo.dev/home" class="px-2">
          <ExpoIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://nextjs.org/" class="px-2">
          <NextIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://reactnative.dev/" class="px-2">
          <ReactIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://storybook.js.org/docs/react/why-storybook" class="px-2">
          <StorybookIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://www.apollographql.com/docs/intro/benefits" class="px-2">
          <GraphIcon width={ICON_SIZE} height={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
      </View>
      <Text class="md:w-2/3 lg:w-1/2 pt-5 pb-3 px-4 text-center text-sm">
        {`${tapOrClick} the icons to learn more about each part of the stack, or open up `}
        <Text class="text-gray-500">features/app-core/screens/HomeScreen.tsx</Text> to start working
        on your app.
      </Text>
      <View class="flex-row pt-3">
        <Pressable
          class="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
          onPress={() => openLink(healthEndpoint || '/api/health')}
          accessibilityRole="button"
        >
          <Text class="text-white roboto-bold text-sm">REST ✅</Text>
        </Pressable>
        <Pressable
          class="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
          onPress={() => openLink(graphQLEndpoint || '/api/graphql')}
          accessibilityRole="button"
        >
          <Text class="text-white roboto-bold text-sm">GraphQL ✅</Text>
        </Pressable>
      </View>
      <Link href="/author" class="roboto-bold pt-5 text-center text-sm text-black">
        Test Navigation
      </Link>
      <Link to={`${docsURI}?path=/story/readme-md--page`} class="text-xs roboto-bold my-4 px-5">
        Read the Docs
      </Link>
      <Link to="/author" class="m-2 text-xs text-gray-500">
        {'{ ...💚 }'}
      </Link>
    </View>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = HomeScreenProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
