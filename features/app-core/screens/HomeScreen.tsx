import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link, useAetherNav, useAetherRouteData } from 'aetherspace/navigation'
import { z, aetherSchema, AetherProps, createDataBridge } from 'aetherspace/schemas'
import { View, Text, Image, Pressable } from 'aetherspace/primitives'
import { H1 } from 'aetherspace/html-elements'
import { useAetherContext } from 'aetherspace/context'
import { getBaseUrl } from 'aetherspace/utils'
import { GraphIcon, ReactIcon, ExpoIcon, StorybookIcon, NextIcon } from '../icons'

/* --- Constants ------------------------------------------------------------------------------- */

const BASE_URL = getBaseUrl()

/* --- Schemas & Types ------------------------------------------------------------------------- */

const HomeScreenParams = aetherSchema('HomeScreenParams', {
  echo: z.string().default('Hello GREEN stack 👋').describe('Echo argument for the GraphQL health endpoint'), // prettier-ignore
})

export type HomeScreenParams = AetherProps<typeof HomeScreenParams>

const HomePropsSchema = aetherSchema('HomeScreenProps', {
  customGreeting: z.string().default('Hello GREEN stack 👋').describe('A greeting for the user'),
  alive: z.boolean().default(true),
  kicking: z.boolean().default(true),
  baseURL: z.string().default(BASE_URL).describe('The base URL for the app'),
})

export type HomeScreenProps = AetherProps<typeof HomePropsSchema>

/* --- GraphQL & Data Fetching ----------------------------------------------------------------- */

/** -i- GraphQL query that will fetch all data we need for this screen */
const getScreenDataQuery = `
  query($healthCheckArgs: HealthCheckArgs!) {
    healthCheck(args: $healthCheckArgs) {
      alive
      kicking
      echo
      baseURL
    }
  }
`

/** -i- Bundled config for getting the screen data, including query, variables, and data fetcher */
export const screenConfig = createDataBridge({
  resolverName: 'healthCheck',
  graphqlQuery: getScreenDataQuery,
  argsSchema: HomeScreenParams,
  responseSchema: HomePropsSchema,
  // -i- Optional extra config
  refetchOnMount: false,
  backgroundColor: '#FFFFFF',
  // -i- 'auto' will let Next.js decide whether to use SSR or SSG
  // -i- use 'force-static' to always use SSG, or 'force-dynamic' to always use SSR
  // -i- https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
  dynamic: 'auto' as const,
})

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

export const HomeScreen = (props: AetherProps<typeof HomePropsSchema>) => {
  // Props & Screen Data Fetching (from screenConfig 👇)
  const [pageData] = useAetherRouteData(props, screenConfig)
  const { customGreeting, alive, kicking, baseURL = BASE_URL } = pageData

  // Environment
  const graphQLEndpoint = `${baseURL}/api/graphql`
  const healthEndpoint = `${baseURL}/api/health`
  const isLocalHost = baseURL?.includes?.('localhost') || baseURL?.includes?.(':3000')
  const preferredDocsURL = isLocalHost ? baseURL?.replace?.('3000', '6006') : undefined // local storybook (if running)
  const docsUrl = ['/api/docs', preferredDocsURL && `?preferredURL=${preferredDocsURL}`].filter(Boolean).join('') // prettier-ignore

  // Hooks
  const { isPhoneSize } = useAetherContext()
  const { openLink } = useAetherNav()

  // Vars
  const tapOrClick = isPhoneSize ? 'Tap' : 'Click'
  const ICON_COLOR = '#22c55e'
  const ICON_SIZE = 32

  // -- Render --

  return (
    <View class="relative flex w-full h-full items-center justify-center">
      <StatusBar style="auto" />
      <Link to="/author">
        <Image
          src="/img/icon.png"
          alt="App Icon"
          class={[
            'w-20 h-20 mt-0 mb-3 overflow-hidden bg-slate-100',
            true && 'rounded-full', // Assign conditional classes with an array
          ]}
        />
      </Link>
      <H1 class="text-green-500 pb-2 body-md-bold">{customGreeting || 'Hello GREEN stack 👋'}</H1>
      <View class="flex-row">
        <Link href="https://expo.dev/home" class="px-2">
          <ExpoIcon size={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://nextjs.org/" class="px-2">
          <NextIcon size={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://reactnative.dev/" class="px-2">
          <ReactIcon size={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://storybook.js.org/docs/react/why-storybook" class="px-2">
          <StorybookIcon size={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
        <Link href="https://www.apollographql.com/docs/intro/benefits" class="px-2">
          <GraphIcon size={ICON_SIZE} fill={ICON_COLOR} />
        </Link>
      </View>
      <Text class="md:w-2/3 lg:w-1/2 pt-5 pb-3 px-4 text-center text-sm">
        {`${tapOrClick} the icons to learn more about each part of the stack, or open up `}
        <Text class="text-grayscale-500">features/app-core/screens/HomeScreen.tsx</Text> to start
        working on your app.
      </Text>
      <View class="flex-row pt-3">
        <Pressable
          class="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
          onPress={() => openLink(graphQLEndpoint || '/api/graphql')}
          accessibilityRole="button"
        >
          <Text class="text-white body-sm-bold">{alive ? 'GraphQL ✅' : 'GraphQL 🔄'}</Text>
        </Pressable>
        <Pressable
          class="flex-row py-1 px-2 mx-1 bg-gray-700 items-center rounded-md"
          onPress={() => openLink(healthEndpoint || '/api/health')}
          accessibilityRole="button"
        >
          <Text class="text-white body-sm-bold">{kicking ? 'REST ✅' : 'REST 🔄'}</Text>
        </Pressable>
      </View>
      <Link href="/author" class="body-sm-bold pt-5 text-center text-primary">
        Test Navigation
      </Link>
      <Link to={docsUrl} class="body-xs-bold my-4 px-5">
        Read the Docs
      </Link>
      <Link to="/author" class="m-2 text-xs text-grayscale-500">
        {'{ ...💚 }'}
      </Link>
    </View>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = HomePropsSchema.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
