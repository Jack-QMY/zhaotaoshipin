import React, { Component, ReactChild } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { ToastDuration, ToastPosition } from './constants';
import { isFunction } from './helper';

type ToastPositionType = keyof typeof ToastPosition;
type ToastDurationType = keyof typeof ToastDuration;

export interface ToastProps {
    content: ReactChild | String;
    duration?: ToastDurationType;
    position?: ToastPositionType;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onShow?: () => void;
    onHide?: () => void;
}

export default class Toast extends Component<ToastProps> {
    static defaultProps: ToastProps = {
        duration: ToastDuration.FAST,
        position: 'top',
    };

    constructor(props: ToastProps) {
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
        this.animationManager = Animated.sequence([
            Animated.timing(this.state.animationValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.delay(this.props.duration),
            Animated.timing(this.state.animationValue, {
                toValue: 0,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]);
        this.animationManager.start(() => {
            if (isFunction(this.props?.onHide)) {
                this.props?.onHide();
            }
        });
    };

    render() {
        const { animationValue } = this.state;
        const { position, content, style, textStyle } = this.props;
        const positionStyle = ToastPosition[position];
        return (
            <View style={[styles.container, positionStyle]} pointerEvents="none">
                <Animated.View style={[styles.content, style, { opacity: animationValue }]}>
                    {React.isValidElement(content) ? (
                        content
                    ) : (
                        <Text style={[styles.info, textStyle]} numberOfLines={3}>
                            {content}
                        </Text>
                    )}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        maxWidth: '60%',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    info: {
        fontSize: 14,
        lineHeight: 22,
        color: '#ffffff',
        textAlign: 'center',
    },
});
