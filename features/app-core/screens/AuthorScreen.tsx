import React from 'react'
// Navigation
import { Link, useAetherNav } from 'aetherspace/navigation'
// Schemas
import { aetherSchema } from 'aetherspace/schemas'
// Primitives
import { View, Pressable, Text } from 'aetherspace/primitives'
// Utils
import { getBaseUrl } from 'aetherspace/utils'
// Icons
import { BackIcon, HomeIcon } from '../icons'

/* --- Constants ------------------------------------------------------------------------------- */

const baseURL = getBaseUrl()
const preferredDocsURL = baseURL?.replace?.('3000', '6006')

/* --- <AuthorScreen/> ------------------------------------------------------------------------- */

const AuthorScreen = () => {
  // Hooks
  const { goBack, openLink } = useAetherNav()
  // Render
  return (
    <View tw="relative flex w-full h-full items-center justify-center">
      <Pressable
        accessibilityRole="button"
        tw="items-center"
        onPress={() => openLink('https://codinsonn.dev')}
      >
        <Text>{`Made with { ...💚 } by:`}</Text>
        <Text tw="font-bold text-lg">thorr@codinsonn.dev</Text>
      </Pressable>
      <View tw="flex-row items-center content-center justify-center my-5">
        <Link tw="flex-row px-4 py-2 bg-black items-center" to="/" onPress={goBack}>
          <BackIcon size={16} fill="#FFFFFF" />
          <Text tw="text-white"> Go Back</Text>
        </Link>
        <View tw="w-4" />
        <Link tw="flex-row px-4 py-2 bg-black items-center" href="/" onPress={() => openLink('/')}>
          <HomeIcon size={15} fill="#FFFFFF" />
          <Text tw="text-white"> Home</Text>
        </Link>
      </View>
      <Link
        to={`/api/docs?preferredURL=${preferredDocsURL}`}
        tw="text-xs roboto-bold py-2.5 px-5 mx-3 "
      >
        {'Read the Docs'}
      </Link>
    </View>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = aetherSchema('AuthorScreenProps', {}).introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen
