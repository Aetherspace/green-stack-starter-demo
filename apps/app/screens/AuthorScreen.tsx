import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouting } from 'expo-next-react-navigation';

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text>About the Author:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>thorr@codinsonn.dev</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.button} onPress={goBack}>👈  Go Back</Text>
                <Link style={styles.button} routeName="/">🏡  Home</Link>
            </View>
        </View>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorScreen;
