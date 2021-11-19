import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavBarHeader } from '~/components';
// 注册页面
export default function Register() {
    return (
        <View style={styles.container}>
            <NavBarHeader title="注册页" />
            <Text>注册页面</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
