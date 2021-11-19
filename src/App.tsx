import type { Node } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppRouter from './router';

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppRouter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;
