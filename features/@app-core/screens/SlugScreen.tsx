import React from 'react'
import { useRouteParams } from '@green-stack/core/navigation/useRouteParams'
import { View, Text, H3, P, Link } from '../components/styled'
import { useRouter } from '@green-stack/core/navigation/useRouter'
import type { UniversalRouteScreenProps } from '@green-stack/core/navigation/useRouteParams.types'

/* --- <SlugScreen/> --------------------------------------------------------------------------- */

const SlugScreen = (props: UniversalRouteScreenProps) => {
  // Routing
  const { slug, count = '' } = useRouteParams(props)
  const { canGoBack, back, push, navigate, replace, setParams } = useRouter()

  // Vars
  const showBackButton = canGoBack()

  // -- Render --

  return (
    <View className="flex flex-1 justify-center items-center">
      {showBackButton && (
        <Text
          className="text-blue-500 absolute top-8 web:top-0 left-0 p-4"
          onPress={back}
        >
          {`< Back`}
        </Text>
      )}
      <H3>
        Page slug: {decodeURIComponent(slug as string)}
        {!!count && ` | count: ${count}`}
      </H3>
      <P className="mt-2 text-base text-center">
        Need a more robust, Fully-Stacked, Full-Product, Universal App Setup?
      </P>
      <Link
        href="https://github.com/Aetherspace/green-stack-starter-demo#readme"
        className="mt-4 text-base text-center"
        target="_blank"
      >
        Check out the GREEN Stack Starter
      </Link>
      <Text className="mt-4 text-center text-base text-blue-500 underline" onPress={() => push('/subpages/push')}>
        {`router.push()`}
      </Text>
      <Text className="mt-4 text-center text-base text-blue-500 underline" onPress={() => navigate('/subpages/navigate')}>
        {`router.navigate()`}
      </Text>
      <Text className="mt-4 text-center text-base text-blue-500 underline" onPress={() => replace('/subpages/replace')}>
        {`router.replace()`}
      </Text>
      <Text className="mt-4 text-center text-base text-blue-500 underline" onPress={() => setParams({ count: `${+count + 1}` })}>
        {`router.setParams()`}
      </Text>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default SlugScreen
