import React from 'react'
import { Link, useAetherNav } from 'aetherspace/navigation'
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'
import { View, Pressable, Text } from 'aetherspace/primitives'
import { getBaseUrl } from 'aetherspace/utils'
import { BackIcon, HomeIcon } from '../icons'

/* --- Constants ------------------------------------------------------------------------------- */

const baseURL = getBaseUrl()
const preferredDocsURL = baseURL?.replace?.('3000', '6006')

/* --- Schemas & Types ------------------------------------------------------------------------- */

export const AuthorScreenProps = aetherSchema('AuthorScreenProps', {
  // -i- TODO: Change this to match your screen's props
  // e.g. title: z.string().optional(),
})

export type AuthorScreenProps = AetherProps<typeof AuthorScreenProps>

/* --- Screen Config --------------------------------------------------------------------------- */

export const screenConfig = {
  dynamic: 'force-static' as const,
  backgroundColor: '#FFFFFF',
}

/* --- <AuthorScreen/> ------------------------------------------------------------------------- */

export const AuthorScreen = (props: AuthorScreenProps) => {
  // Hooks
  const { goBack, openLink } = useAetherNav()

  // -- Render --

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
      <Link to={`/api/docs?preferredURL=${preferredDocsURL}`} tw="body-xs-bold py-2.5 px-5 mx-3 ">
        {'Read the Docs'}
      </Link>
    </View>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = AuthorScreenProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen
