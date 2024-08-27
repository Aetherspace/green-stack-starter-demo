import React from 'react'
import { ScrollView } from 'react-native'
import { HydratedRouteProps, createQueryBridge } from '@green-stack/navigation'
import { Pressable, View, Link, Image, P, H1, H3, Text, H2, cn } from '../components/styled'
import { healthCheckFetcher } from '../resolvers/healthCheck.query'
import { ArrowRightFilled } from '../icons/ArrowRightFilled'
import { isLargeTablet } from '../appConfig'

/* --- Data Fetching --------------------------------------------------------------------------- */

// -i- Think of a `QueryBridge` as a bridge between the route component and the data-fetching logic.
// -i- It's a way to fetch data for a route, based on the route's parameters.

// -i- The closest thing you could compare it to is next.js's `getServerSideProps`...
// -i- Except it also works to fetch data on your Native App, next to just during Web SSR or CSR.

export const queryBridge = createQueryBridge({
  routeDataFetcher: healthCheckFetcher,
  routeParamsToQueryKey: (routeParams) => ['healthCheck', routeParams.echo],
  routeParamsToQueryInput: (routeParams) => ({ healthCheckArgs: { echo: routeParams.echo } }),
  fetcherDataToProps: (fetcherData) => ({ serverHealth: fetcherData?.healthCheck }),
})

/* --- Types ----------------------------------------------------------------------------------- */

type HomeScreenProps = Prettify<HydratedRouteProps<typeof queryBridge>>

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = (props: HomeScreenProps) => {
  // Props
  const { serverHealth } = props

  // -- Render --

  return (
    <>
      <ScrollView
        contentContainerStyle={{ position: 'relative', minWidth: '100%', minHeight: '100%' }}
        style={{ backgroundColor: '#1e293b' }}
      >
        <View
          className={cn(
            "flex flex-1 flex-col justify-between items-center bg-slate-800",
            "lg:p-24 lg:justify-start",
          )}
        >

          <View className="hidden invisible lg:visible lg:flex lg:w-full lg:max-w-5xl h-14" accessibilityElementsHidden>
            <GettingStarted />
          </View>

          {/* Side Icons */}

          <View
            className={cn(
              "hidden invisible flex-row top-28 w-screen max-w-5xl h-20 items-center justify-between",
              "lg:absolute lg:visible lg:flex lg:h-[90%] lg:top-0",
              "ios:lg:top-24", // -i- If you need platform specifc flags, e.g. iPad in this case
            )}
          >
            <View className="w-[57px] h-[98px] lg:w-[114px] lg:h-[197px]">
              <Image
                src={require('../assets/automagic-api-gen-icons.png')}
                alt="FullProduct.dev Starterkit Logo"
                quality={100}
                fill
              />
            </View>
            <View className="w-[81px] h-[116px] lg:w-[162px] lg:h-[233px]">
              <Image
                src={require('../assets/cross-platform-icons.png')}
                alt="FullProduct.dev Starterkit Logo"
                quality={100}
                fill
              />
            </View>
          </View>

          {/* Logo & Tagline */}

          <View
            className={cn(
              "flex flex-row absolute top-28 w-screen max-w-5xl h-20 items-center justify-center",
              "lg:h-[90%] lg:top-0 lg:max-w-[100%]",
              "ios:lg:top-24",
            )}
          >
            <Link href="https://fullproduct.dev" target="_blank" className="flex flex-row no-underline">
              <View className="w-20 h-20 lg:w-24 lg:h-24">
                <Image
                  src={require('../assets/green-stack-logo.png')}
                  alt="FullProduct.dev Starterkit Logo"
                  width="100%"
                  height="100%"
                />
              </View>
              <View className="w-5" />
              <View className="flex flex-col justify-center h-20 lg:h-24">
                <H1 className="text-left text-gray-100 text-2xl lg:text-3xl">
                  FullProduct.dev ⚡️
                </H1>
                <View className="h-0.5 lg:h-1" />
                <H3 className="text-left font-medium text-slate-200 text-base lg:text-2xl lg:text-slate-300">
                  Your Universal App Starterkit
                </H3>
              </View>
            </Link>
          </View>

          {/* Learn More */}

          <View className="h-64" />

          <View
            className={cn(
              "flex flex-col relative bottom-auto w-screen max-w-5xl items-center justify-center px-8",
              "lg:absolute lg:bottom-24 lg:flex-row lg:top-auto lg:items-start lg:px-0",
            )}
          >
            <InfoSection
              title="Docs 📚"
              summary="Documentation that grows as you build or paste app features"
              href="https://universal-base-starter-docs.vercel.app/quickstart" // TODO: Update this link
            />
            <View className="w-0 h-8 lg:w-16 lg:h-0" />
            <InfoSection
              title="Concepts"
              summary="Discover a way of working that's portable, write-once and universal"
              href="https://universal-base-starter-docs.vercel.app/core-concepts"
            />
            <View className="w-0 h-8 lg:w-16 lg:h-0" />
            <InfoSection
              title="Cross Nav"
              titleIcon={(
                <ArrowRightFilled
                  size={24}
                  fill="#FFFFFF"
                />
              )}
              summary="Test universal navigation for Web & Mobile, sharing up to 90% UI code"
              href="/subpages/Universal%20Nav"
            />
            <View className="w-0 h-8 lg:w-16 lg:h-0" />
            <InfoSection
              title="Codegen"
              summary="Build even faster with generators for Routes, APIs, GraphQL & more"
              href="https://universal-base-starter-docs.vercel.app/quickstart" // TODO: Update this link
            />
          </View>

          {/* Made by */}

          <View className="h-16 lg:h-0" />

          <View
            className={cn(
              "flex flex-row relative w-screen max-w-5xl h-14 items-center justify-center",
              "lg:bottom-auto lg:absolute lg:justify-end",
              "ios:lg:top-24",
            )}
          >
            <Link
              className="flex flex-row items-center no-underline"
              href="https://codinsonn.dev"
              target="_blank"
            >
              <View className="h-12 flex-row items-center">
                <Text className="text-lg text-gray-100">
                  By
                </Text>
              </View>
              <View className="w-2" />
              <View className="w-12 h-12 lg:w-16 lg:h-16">
                <Image
                  className="rounded-full"
                  src="https://codinsonn.dev/_next/image?url=%2Fimg%2FCodelyFansLogoPic160x160.jpeg&w=256&q=75"
                  alt="Thorr / codinsonn's Profile Picture"
                  fill
                />
              </View>
              <View className="w-2" />
              <View className="h-12 flex-row items-center">
                <Text className="text-lg text-gray-100 font-bold">
                  Thorr ⚡️ codinsonn.dev
                </Text>
              </View>
            </Link>
          </View>

          <View className="h-16 lg:h-0" />

        </View>
      </ScrollView>

      {/* Start from */}

      <View className="flex lg:hidden absolute web:fixed top-0 w-screen max-w-5xl h-14">
        <GettingStarted />
      </View>
      
    </>
  )
}

/* --- <GettingStarted/> ----------------------------------------------------------------------- */

const GettingStarted = () => (
  <View
    className={cn(
      "flex flex-1 flex-row absolute lg:max-w-5xl h-14 items-center justify-start",
      "left-0 right-0",
    )}
  >
    <P
      className={cn(
        "flex flex-1 absolute left-0 top-0 justify-center bg-slate-700 border-b border-solid border-gray-700 pb-4 pt-10 text-center text-sm text-gray-100",
        "lg:relative lg:rounded-xl lg:border lg:bg-gray-800 lg:p-4 lg:text-lg",
        "left-0 right-0 lg:flex-grow-0 lg:flex-row lg:flex-initial",
      )}
      style={isLargeTablet ? {
        borderWidth: 1,
        borderColor: '#374151',
        borderRadius: 12
      } : null}
    >
      <Text>
        <Text>Start from </Text>
        <Text className="font-bold">@app-core/screens/HomeScreen.tsx</Text>
      </Text>
    </P>
  </View>
)

/* --- <InfoSection/> -------------------------------------------------------------------------- */

const InfoSection = (props: { title: string, titleIcon?: any, summary: string, href: string }) => (
  <View className="flex flex-col flex-1 w-full max-w-[420px]">
    <Link
      className="flex flex-row w-full items-center justify-center lg:justify-start text-center lg:text-left no-underline mb-2 lg:mb-4"
      href={props.href}
      target={props.href.includes('http') ? "_blank" : undefined}
      asChild
    >
      <Pressable className="flex flex-row items-center justify-center">
        <H2 className="text-gray-100 text-2xl lg:text-3xl">
          {props.title}
        </H2>
        {!!props.titleIcon && (
          <>
            <View className="w-2" />
            {props.titleIcon}
          </>
        )}
      </Pressable>
    </Link>
    <P className="text-center lg:text-left text-lg text-gray-500">
      {props.summary}
    </P>
  </View>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
