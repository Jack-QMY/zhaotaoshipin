import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function index() {
    const navigation = useNavigation();
    const onPress = useCallback(() => {
        navigation.navigate('Register');
    }, []);
    return (
        <View style={styles.container}>
            <Text>首页</Text>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>跳转注册页面</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.secondaryColor,
        width: Device.width / 2 - Theme.edgeDistance * 2,
        alignSelf: 'center',
        marginTop: pixel(50),
        height: pixel(60),
    },
    buttonText: {
        fontSize: font(16),
        color: '#fff',
    },
});
