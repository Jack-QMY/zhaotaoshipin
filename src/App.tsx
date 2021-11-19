import type { Node } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppRouter from './router';

//app项目入口文件
const App: () => Node = () => {
    return (
        <View style={styles.container}>
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
