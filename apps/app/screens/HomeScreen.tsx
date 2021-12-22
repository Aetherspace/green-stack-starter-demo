import React from 'react';
import { StatusBar } from 'expo-status-bar';
// Navigation
import { AetherLink } from 'aetherspace/navigation';
// Primitives
import { AetherView, AetherText, AetherImage } from 'aetherspace/primitives';

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <StatusBar style="auto" />
            <AetherLink to="author">
                <AetherImage src="/img/icon.png" tw="w-20 h-20 mt-0 mb-3 rounded-full overflow-hidden" />
            </AetherLink>
            <AetherText tw="text-green-500 pb-5 font-bold text-base">Hello GREEN stack ✅</AetherText>
            <AetherText tw="px-5 text-center text-sm">
                Open up apps/app/screens/HomeScreen.tsx to start working on your app
            </AetherText>
            <AetherLink to="author" tw="text-gray-500 pt-5 text-center text-xs" asText>
                (Tap here or below to test navigation)
            </AetherLink>
            <AetherLink to="author" tw="m-8">
                {'{ ...💚 }'}
            </AetherLink>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen;
