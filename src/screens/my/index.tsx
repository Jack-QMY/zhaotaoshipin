import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { NavBarHeader } from '~/components';
export default function index() {
    return (
        <View style={styles.container}>
            {/* <NavBarHeader title="个人页面" /> */}
            <Text>个人页面</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
