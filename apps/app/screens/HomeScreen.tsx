import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-next-react-navigation';

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={{ color: 'green', fontSize: 16, paddingBottom: 20, fontWeight: 'bold' }}>Hello GREEN stack ✅</Text>
            <Text style={{ fontSize: 12, paddingHorizontal: 40, textAlign: 'center' }}>
                Open up apps/app/screens/HomeScreen.tsx to start working on your app
            </Text>
            <Text style={{ color: 'grey', fontSize: 10, paddingTop: 15, textAlign: 'center' }}>
                (Tap below to test navigation)
            </Text>
            <Link style={{ margin: 20 }} routeName="author">{'{ ...💚 }'}</Link>
        </View>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen;
