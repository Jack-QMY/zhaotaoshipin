import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    Animated,
    Easing,
    Pressable,
    StatusBar,
    NativeModules,
} from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { isFunction } from './helper';

const { StatusBarManager } = NativeModules;
let statusBarHeight = 15;
if (Platform.OS == 'android') {
    statusBarHeight += StatusBar.currentHeight || 20;
} else {
    StatusBarManager.getHeight(({ height }) => {
        statusBarHeight += height;
    });
}

const MESSAGE_WIDTH = Device.width - pixel(40);
const MESSAGE_HEIGHT = MESSAGE_WIDTH * 0.22;
const PADDING_H = pixel(16);
const PADDING_V = pixel(12);
const CONTENT_HEIGHT = MESSAGE_HEIGHT - PADDING_V * 2;

const H_FADE_VALUE = MESSAGE_WIDTH * 1.5;
const V_FADE_VALUE = MESSAGE_HEIGHT * 1.5;

export interface MessageProps {
    title: string;
    content?: string;
    url?: string;
    onShow?: () => void;
    onHide?: () => void;
    handler?: (p?: any) => void;
}

export default function Message(props: MessageProps) {
    const timer = useRef();
    const animation = useRef(new Animated.Value(0));
    const animationStyle = {
        transform: [
            {
                translateY: animation.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-(statusBarHeight + MESSAGE_HEIGHT), 0],
                }),
            },
        ],
    };

    const slideIn = useCallback(() => {
        Animated.timing(animation.current, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start((e) => {
            timer.current = setTimeout(() => {
                slideOut();
            }, 3000);
        });
    }, [slideOut]);

    const slideOut = useCallback(() => {
        Animated.timing(animation.current, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start((e) => {
            if (isFunction(props?.onHide)) {
                props?.onHide();
            }
        });
    }, [props?.onHide]);

    useEffect(() => {
        slideIn();
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <Animated.View style={[styles.container, { top: statusBarHeight }, animationStyle]}>
            <BoxShadow setting={messageWrap}>
                <Pressable
                    style={styles.messageBox}
                    onPress={() => {
                        if (props?.handler instanceof Function) {
                            props?.handler();
                            clearTimeout(timer.current);
                            slideOut();
                        }
                    }}>
                    <View style={styles.messageBody}>
                        <Image
                            style={styles.avatar}
                            source={props?.url || { uri: cdnUri('icon-' + Config.AppName + '.png') }}
                        />
                        <View style={styles.info}>
                            <Text style={styles.title} numberOfLines={1}>
                                {props?.title || Config.DisplayName}
                            </Text>
                            <Text style={styles.content} numberOfLines={2}>
                                {props?.content}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>查 看</Text>
                    </View>
                </Pressable>
            </BoxShadow>
        </Animated.View>
    );
}

const messageWrap = {
    width: MESSAGE_WIDTH,
    height: MESSAGE_HEIGHT,
    color: '#FFEBEE',
    border: pixel(5),
    radius: pixel(10),
    opacity: 0.5,
    x: 0,
    y: 0,
    style: {},
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    messageBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PADDING_H,
        paddingVertical: PADDING_V,
        borderRadius: pixel(10),
        backgroundColor: '#ffffff',
    },
    messageBody: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: pixel(14),
    },
    avatar: {
        width: CONTENT_HEIGHT,
        height: CONTENT_HEIGHT,
        borderRadius: CONTENT_HEIGHT / 2,
        backgroundColor: '#f0f0f0',
    },
    title: {
        color: '#202020',
        fontSize: font(15),
        lineHeight: font(20),
        fontWeight: 'bold',
    },
    content: {
        marginTop: pixel(2),
        color: '#909090',
        fontSize: font(13),
        lineHeight: font(20),
    },
    button: {
        marginLeft: pixel(20),
        width: CONTENT_HEIGHT * 1.3,
        height: CONTENT_HEIGHT * 0.6,
        borderRadius: CONTENT_HEIGHT * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE1966',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: font(15),
        lineHeight: font(20),
    },
});
