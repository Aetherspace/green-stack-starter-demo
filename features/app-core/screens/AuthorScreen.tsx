import React from 'react'
// Navigation
import { Link, useAetherNav } from 'aetherspace/navigation'
// Schemas
import { ats } from 'aetherspace/schemas'
// Primitives
import { View, Pressable, Text } from 'aetherspace/primitives'
// Hooks
import { useDocAddress } from 'aetherspace/docs'
// Icons
import { BackIcon, HomeIcon } from '../icons'

/* --- <AuthorScreen/> ------------------------------------------------------------------------- */

const AuthorScreen = () => {
  // Hooks
  const docsURI = useDocAddress()
  const { goBack, openLink } = useAetherNav()
  // Render
  return (
    <View tw="flex-1 bg-white items-center justify-center">
      <Pressable
        accessibilityRole="button"
        tw="items-center"
        onPress={() => openLink('https://codinsonn.dev')}
      >
        <Text>{`Made with { ...💚 } by:`}</Text>
        <Text tw="font-bold text-lg">thorr@codinsonn.dev</Text>
      </Pressable>
      <View tw="flex-row items-center content-center justify-center my-5">
        <Pressable
          accessibilityRole="button"
          tw="flex-row py-2.5 px-5 mx-3 bg-black items-center"
          onPress={goBack}
        >
          <BackIcon width={16} height={16} fill="#FFFFFF" />
          <Text tw="text-white"> Go Back</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          tw="flex-row py-2.5 px-5 mx-3 bg-black items-center"
          onPress={() => openLink('/')}
        >
          <HomeIcon width={15} height={15} fill="#FFFFFF" />
          <Text tw="text-white"> Home</Text>
        </Pressable>
      </View>
      <Link
        to={`${docsURI}?path=/story/readme-md--page`}
        tw="text-xs roboto-bold py-2.5 px-5 mx-3 "
      >
        {'Read the Docs'}
      </Link>
    </View>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = ats.schema('AuthorScreenProps', {})

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen
