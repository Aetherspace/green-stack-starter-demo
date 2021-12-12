import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link, useRouting } from 'expo-next-react-navigation';
// Primitives
import { AetherView } from 'aetherspace/primitives'; 

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
                <Text>About the Author:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>thorr@codinsonn.dev</Text>
            </AetherView>
            <AetherView tw="flex-row">
                <Text style={styles.button} onPress={goBack}>👈  Go Back</Text>
                <Link style={styles.button} routeName="/">🏡  Home</Link>
            </AetherView>
        </AetherView>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen;
