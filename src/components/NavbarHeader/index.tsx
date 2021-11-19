import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
    Animated,
    StatusBar,
    StatusBarProps,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { SvgIcon, SvgPath } from '~/components';

interface Props {
    StatusBarProps?: StatusBarProps;
    navBarStyle?: ViewStyle;
    centerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    title?: string;
    leftComponent?: JSX.Element;
    centerComponent?: JSX.Element;
    rightComponent?: JSX.Element;
    isTransparent?: boolean;
    hasGoBackButton?: boolean;
    rightIcon?: string;
    onPressRight?: () => void;
    backHandler?: () => void;
}

export default (props: Props) => {
    const navigation = useNavigation();
    const {
        StatusBarProps = {},
        navBarStyle,
        centerStyle,
        titleStyle,
        title,
        leftComponent,
        centerComponent,
        rightComponent,
        isTransparent,
        hasGoBackButton = true,
        rightIcon,
        onPressRight,
        backHandler,
    } = props;

    const headerLeft = useMemo(() => {
        if (React.isValidElement(leftComponent)) {
            return leftComponent;
        } else if (hasGoBackButton) {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.leftButton}
                    onPress={() => {
                        if (backHandler instanceof Function) {
                            backHandler();
                        } else {
                            navigation.goBack();
                        }
                    }}>
                    <SvgIcon name={SvgPath.back} size={20} color={isTransparent ? '#fff' : '#202020'} />
                </TouchableOpacity>
            );
        }
    }, [leftComponent, hasGoBackButton, backHandler]);

    const headerRight = useMemo(() => {
        if (React.isValidElement(rightComponent)) {
            return rightComponent;
        } else if (rightIcon) {
            return (
                <TouchableOpacity
                    style={styles.rightButton}
                    activeOpacity={1}
                    onPress={() => {
                        if (onPressRight instanceof Function) {
                            onPressRight();
                        }
                    }}>
                    <SvgIcon
                        name={rightIcon || SvgPath.rightArrow}
                        size={16}
                        color={isTransparent ? '#fff' : '#202020'}
                    />
                </TouchableOpacity>
            );
        }
    }, [rightComponent, onPressRight]);

    const center = useMemo(() => {
        if (React.isValidElement(centerComponent)) {
            return centerComponent;
        } else if (title) {
            return (
                <Animated.View style={[styles.center, centerStyle]}>
                    <Text style={[styles.title, { color: isTransparent ? '#fff' : '#202020' }, titleStyle]}>
                        {title}
                    </Text>
                </Animated.View>
            );
        }
    }, [centerComponent, centerStyle, title, titleStyle]);
    const isFocused = useIsFocused();

    return (
        <View style={[styles.navBar, isTransparent && styles.transparent, navBarStyle]}>
            {isFocused ? <StatusBar {...StatusBarProps} /> : null}
            <View style={styles.header}>
                <View style={[styles.headerSide, styles.sideLeft]}>{headerLeft}</View>
                {center}
                <View style={[styles.headerSide, styles.sideRight]}>{headerRight}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        paddingTop: Device.statusBarHeight,
        backgroundColor: Theme.skinColor || '#FFF',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    transparent: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Device.navBarHeight + Device.topInset,
        // backgroundColor: '#F00',
    },
    headerSide: {
        position: 'absolute',
        bottom: 0,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        marginHorizontal: pixel(65),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Theme.primaryFontColor,
        fontSize: font(18),
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
    sideLeft: {
        left: 0,
    },
    sideRight: {
        right: 0,
    },
    leftButton: {
        width: pixel(40),
        paddingLeft: pixel(12),
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    rightButton: {
        width: pixel(40),
        paddingRight: pixel(12),
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    shadow: {
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
});
