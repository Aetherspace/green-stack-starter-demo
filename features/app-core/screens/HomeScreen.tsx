import React from 'react'
import { StatusBar } from 'expo-status-bar'
// Navigation
import { Link, fetchAetherProps, useAetherNav, useAetherRoute } from 'aetherspace/navigation'
// Schemas
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'
// Primitives
import { View, Text, Image, Pressable } from 'aetherspace/primitives'
// SEO
import { H1 } from 'aetherspace/html-elements'
// Hooks
import { useAetherContext } from 'aetherspace/context'
// Utils
import { getBaseUrl } from 'aetherspace/utils'
// Icons
import { GraphIcon, ReactIcon, ExpoIcon, StorybookIcon, NextIcon } from '../icons'

/* --- Constants ------------------------------------------------------------------------------- */

const BASE_URL = getBaseUrl()

/* --- Schemas & Types ------------------------------------------------------------------------- */

const HomeParamsSchema = aetherSchema('HomeScreenParams', {
  echo: z.string().default('Hello GREEN stack 👋').describe('Echo argument for the GraphQL health endpoint'), // prettier-ignore
})

export type HomeScreenParams = AetherProps<typeof HomeParamsSchema>

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

/** -i- Function to get the GraphQL variables that will be used to fetch the data for this screen */
const getHomeScreenArgs = (params: HomeScreenParams = {}) => ({
  healthCheckArgs: HomeParamsSchema.parse(params),
})

/** -i- Function to actually fetch the data for this screen, where queryKey is likely the GQL query */
const getHomeScreenData = async (queryKey: string, queryVariables?: HomeScreenParams) => {
  const queryData = queryKey || getScreenDataQuery
  const queryInput = queryVariables || getHomeScreenArgs() // Use defaults if not defined
  const { data } = await fetchAetherProps(queryData, queryInput)
  const { alive, kicking, echo } = data?.healthCheck || {}
  return { alive, kicking, customGreeting: echo } as HomeScreenProps
}

/** -i- Bundled config for getting the screen data, including query, variables, and data fetcher */
export const screenConfig = {
  query: getScreenDataQuery,
  getGraphqlVars: getHomeScreenArgs,
  getGraphqlData: getHomeScreenData,
  paramSchema: HomeParamsSchema,
  propSchema: HomePropsSchema,
  refetchOnMount: false,
  backgroundColor: '#FFFFFF',
}

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

export const HomeScreen = (props: AetherProps<typeof HomePropsSchema>) => {
  // Props & Screen Data Fetching (from screenConfig 👇)
  const [pageData] = useAetherRoute(props, screenConfig)
  const { customGreeting, alive, kicking, baseURL = BASE_URL } = pageData

  // Environment
  const graphQLEndpoint = `${baseURL}/api/graphql`
  const healthEndpoint = `${baseURL}/api/health`
  const preferredDocsURL = baseURL?.replace?.('3000', '6006') // local storybook (if running)

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
      <Link to={`/api/docs?preferredURL=${preferredDocsURL}`} class="body-xs-bold my-4 px-5">
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
