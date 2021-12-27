import React from 'react';
import { useRouting } from 'expo-next-react-navigation';
// Navigation
import { AetherLink } from 'aetherspace/navigation';
// Primitives
import { AetherView, AetherText } from 'aetherspace/primitives';
// Icons
import { BackIcon, HomeIcon } from '../icons';

/* --- <AuthorScreen/> --------------------------------------------------------------------------- */

const AuthorScreen = () => {
    const { goBack } = useRouting();
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <AetherView tw="items-center">
                <AetherText>About the Author:</AetherText>
                <AetherText tw="font-bold text-lg">thorr@codinsonn.dev</AetherText>
            </AetherView>
            <AetherView tw="flex-row items-center content-center justify-items-center mt-5">
                <AetherView tw="flex-row py-2.5 px-5 mx-3 bg-black items-center">
                    <BackIcon width={16} height={16} />
                    <AetherText tw="text-white" onPress={goBack}> Go Back</AetherText>
                </AetherView>
                <AetherLink tw="flex-row py-2.5 px-5 mx-3 bg-black items-center" routeName="/">
                    <HomeIcon width={15} height={15} />
                    <AetherText tw="text-white"> Home</AetherText>
                </AetherLink>
            </AetherView>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen;
