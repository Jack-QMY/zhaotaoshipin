import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavBarHeader } from '~/components';
export default function index() {
    return (
        <View style={styles.container}>
            <NavBarHeader title="登录页面" />
            <Text />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
