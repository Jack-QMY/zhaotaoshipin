import { name } from '!/app.json';
import { NavigationContainer, NavigationContext, useNavigation, useRoute } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import React from 'react';
import { appStore } from '~/store';
import { isReadyRef, navigationRef } from '~/utils';
import BottomTabNavigator from './BottomTabNavigator';
import SCREENS from './routers';

export { useNavigation, useRoute };

export function withNavigation(WrappedComponent: React.Component): React.Component {
    return class HP extends React.Component {
        static contextType = NavigationContext;
        render() {
            return <WrappedComponent {...this.props} navigation={this.context} />;
        }
    };
}

type StackParamList = {
    Main: undefined;
} & {
        [P in keyof typeof SCREENS]: undefined;
    };

const Stack = createStackNavigator < StackParamList > ();

export default () => {
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}
            linking={{ prefixes: [`${name}://`] }}
            onStateChange={() => {
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                appStore.currentRouteName = currentRouteName;
            }}>
            <Stack.Navigator initialRouteName="Main" headerMode="none">
                <Stack.Screen name="Main" component={BottomTabNavigator} />
                {(Object.keys(SCREENS) as (keyof typeof SCREENS)[]).map((routeName) => (
                    <Stack.Screen
                        key={routeName}
                        name={routeName}
                        component={SCREENS[routeName].component}
                        initialParams={SCREENS[routeName].params}
                        options={['Login'].includes(routeName) ? TransitionYScreen : TransitionXScreen}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const TransitionXScreen = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                    {
                        translateX: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -layouts.screen.width],
                            })
                            : 0,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
};

const TransitionYScreen = {
    gestureDirection: 'vertical',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: Device.isIOS
        ? CardStyleInterpolators.forVerticalIOS
        : CardStyleInterpolators.forRevealFromBottomAndroid,
};
