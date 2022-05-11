import React from 'react'
import { useRouting } from 'expo-next-react-navigation'
// Navigation
import { AetherLink, useAetherNav } from 'aetherspace/navigation'
// Primitives
import { AetherView, AetherPressable, AetherText } from 'aetherspace/primitives'
// Icons
import { BackIcon, HomeIcon } from '../icons'

/* --- <AuthorScreen/> --------------------------------------------------------------------------- */

const AuthorScreen = () => {
    // Hooks
    const { goBack, openLink } = useAetherNav()
    // Render
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <AetherPressable tw="items-center" onPress={() => openLink('https://codinsonn.dev')}>
                <AetherText>About the Author:</AetherText>
                <AetherText tw="font-bold text-lg">thorr@codinsonn.dev</AetherText>
            </AetherPressable>
            <AetherView tw="flex-row items-center content-center justify-center mt-5">
                <AetherPressable tw="flex-row py-2.5 px-5 mx-3 bg-black items-center" onPress={goBack}>
                    <BackIcon width={16} height={16} />
                    <AetherText tw="text-white"> Go Back</AetherText>
                </AetherPressable>
                <AetherLink tw="flex-row py-2.5 px-5 mx-3 bg-black items-center" routeName="/">
                    <HomeIcon width={15} height={15} />
                    <AetherText tw="text-white"> Home</AetherText>
                </AetherLink>
            </AetherView>
        </AetherView>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen
