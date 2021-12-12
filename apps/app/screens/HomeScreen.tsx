import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Link } from 'expo-next-react-navigation';
// Primitives
import { AetherView } from 'aetherspace/primitives';

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
    return (
        <AetherView tw="flex-1 bg-white items-center justify-center">
            <StatusBar style="auto" />
            <Text style={{ color: 'green', fontSize: 16, paddingBottom: 20, fontWeight: 'bold' }}>Hello GREEN stack ✅</Text>
            <Text style={{ fontSize: 12, paddingHorizontal: 40, textAlign: 'center' }}>
                Open up apps/app/screens/HomeScreen.tsx to start working on your app
            </Text>
            <Text style={{ color: 'grey', fontSize: 10, paddingTop: 15, textAlign: 'center' }}>
                (Tap below to test navigation)
            </Text>
            <Link style={{ margin: 20 }} routeName="author">{'{ ...💚 }'}</Link>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen;
