import React from 'react';
import { useRouting } from 'expo-next-react-navigation';
// Navigation
import { AetherLink } from 'aetherspace/navigation';
// Primitives
import { AetherView, AetherText } from 'aetherspace/primitives';

/* --- <AuthorScreen/> --------------------------------------------------------------------------- */

const AuthorScreen = () => {
    const { goBack } = useRouting();
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <AetherView tw="items-center">
                <AetherText>About the Author:</AetherText>
                <AetherText tw="font-bold text-lg">thorr@codinsonn.dev</AetherText>
            </AetherView>
            <AetherView tw="flex-row">
                <AetherText tw="py-2.5 px-5 bg-black text-white m-5" onPress={goBack}>👈  Go Back</AetherText>
                <AetherLink tw="py-2.5 px-5 bg-black text-white m-5" routeName="/">🏡  Home</AetherLink>
            </AetherView>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen;
