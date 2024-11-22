import React, { Fragment } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouteParams } from '@green-stack/navigation/useRouteParams'
import { View, Text, H1, P, Link, ScrollView } from '../components/styled'
import { useRouter } from '@green-stack/navigation/useRouter'
import type { UniversalRouteScreenProps } from '@green-stack/navigation/useRouteParams.types'
import BackButton from '../components/BackButton'
import { testableFeatures } from '../constants/testableFeatures'

/* --- <SlugScreen/> --------------------------------------------------------------------------- */

const SlugScreen = (props: UniversalRouteScreenProps) => {
    // Routing
    const { slug, count = 0 } = useRouteParams(props)
    const { push, navigate, replace, setParams } = useRouter()

    // -- Render --

    return (
        <>
            <StatusBar style="light" />
            <ScrollView
                className="flex flex-1 min-h-screen bg-slate-800"
                contentContainerClassName="min-h-screen"
            >
                <View className="flex flex-1 min-h-screen justify-center items-center py-16 bg-slate-800">
                    <H1 className="text-3xl text-white">
                        slug - {decodeURIComponent(slug as string)}
                    </H1>
                    <View className="h-4" />
                    <P className=" text-gray-300 text-base text-center max-w-[400px] px-6">
                        Universal URL routing built on Expo & Next.js routers, shared between Web and Native. e.g. Tap to change the <Text className="text-white font-bold">count {`(${count})`}</Text> param:
                    </P>
                    <View className="h-2" />
                    <Text className="text-center text-base text-blue-300 underline" onPress={() => setParams({ count: `${+count + 1}` })}>
                        {`router.setParams()`}
                    </Text>

                    {/* Nav & Routing Tests */}

                    <View className="h-1 w-12 my-6 bg-slate-600" />

                    <Text className="text-center text-base text-blue-300 underline" onPress={() => push('/subpages/push')}>
                        {`router.push()`}
                    </Text>
                    <View className="h-4" />
                    <Text className="text-center text-base text-blue-300 underline" onPress={() => navigate('/subpages/navigate')}>
                        {`router.navigate()`}
                    </Text>
                    <View className="h-4" />
                    <Text className="text-center text-base text-blue-300 underline" onPress={() => replace('/subpages/replace')}>
                        {`router.replace()`}
                    </Text>

                    {/* Other Tests */}

                    <View className="h-1 w-12 my-6 bg-slate-600" />

                    {testableFeatures.map((feature, index) => (
                        <Fragment key={feature.link}>
                            <Link
                                href={feature.link}
                                className="text-base text-center"
                            >
                                {feature.title}
                            </Link>
                            {index < (testableFeatures.length - 1) && (
                                <View className="h-2" />
                            )}
                        </Fragment>
                    ))}

                    {/* Try the full startkit? */}

                    <View className="h-1 w-12 my-6 bg-slate-600" />

                    <P className="mt-2 text-gray-300 text-base text-center px-6">
                        Upgrade your Universal App Setup?
                    </P>
                    <Link
                        href="https://fullproduct.dev"
                        className="mt-4 text-lg text-center font-bold no-underline"
                        target="_blank"
                    >
                        FullProduct.dev
                    </Link>

                </View>
            </ScrollView>
            <BackButton color="#FFFFFF" />
        </>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default SlugScreen
