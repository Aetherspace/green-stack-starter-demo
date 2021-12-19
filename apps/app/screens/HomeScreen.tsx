import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-next-react-navigation';
// Primitives
import { AetherView, AetherText, AetherImage } from 'aetherspace/primitives';

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <StatusBar style="auto" />
            <AetherImage src="/img/icon.png" tw="w-20 h-20 mt-0 mb-3 rounded-full overflow-hidden" />
            <AetherText tw="text-green-500 pb-5 font-bold text-base">Hello GREEN stack ✅</AetherText>
            <AetherText tw="px-5 text-center text-sm">
                Open up apps/app/screens/HomeScreen.tsx to start working on your app
            </AetherText>
            <AetherText tw="text-gray-500 pt-5 text-center text-xs">
                (Tap below to test navigation)
            </AetherText>
            <Link style={{ margin: 20 }} routeName="author">
                {'{ ...💚 }'}
            </Link>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen;
