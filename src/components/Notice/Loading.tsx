import React, { Component, ReactChild } from 'react';
import { StyleSheet, View, Text, Animated, Easing, ActivityIndicator } from 'react-native';
import { isFunction } from './helper';

export interface LoadingProps {
    content: ReactChild | String;
    theme?: 'dark' | 'light';
    onShow?: () => void;
    onHide?: () => void;
}

export default class Loading extends Component<LoadingProps> {
    constructor(props: LoadingProps) {
        super(props);
        this.state = {
            animationValue: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.fadeInAnimation();
    }

    componentWillUnmount() {
        if (this.animationManager) {
            this.animationManager.stop();
            this.animationManager = undefined;
        }
    }

    fadeInAnimation = () => {
        if (this.animationManager) {
            this.animationManager.stop();
            this.animationManager = undefined;
        }
        if (isFunction(this.props?.onShow)) {
            this.props.onShow();
        }
        this.animationManager = Animated.timing(this.state.animationValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const { animationValue } = this.state;
        const { content, theme } = this.props;
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.fadeView,
                        theme === 'light' && { backgroundColor: 'rgba(255,255,255,0.6)' },
                        { opacity: animationValue },
                    ]}>
                    <View style={styles.content}>
                        <ActivityIndicator color="#FE1966" size="large" />
                        {React.isValidElement(content) ? (
                            content
                        ) : (
                            <Text
                                style={[styles.info, theme === 'light' && { color: 'rgba(254,25,102,0.8)' }]}
                                numberOfLines={2}>
                                {content || ''}
                            </Text>
                        )}
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    fadeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: {
        maxWidth: '50%',
    },
    info: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.9)',
    },
});
