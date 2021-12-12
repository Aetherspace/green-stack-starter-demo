import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link, useRouting } from 'expo-next-react-navigation';
// Primitives
import { AetherView, AetherText } from 'aetherspace/primitives'; 

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        color: 'white',
        margin: 20,
    }
});

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
                <Link style={styles.button} routeName="/">🏡  Home</Link>
            </AetherView>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen;
