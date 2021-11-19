import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Find from '~/screens/find';
import Home from '~/screens/home';
import Personage from '~/screens/my';
import Notification from '~/screens/notice';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();
export default function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home" lazy={true} tabBar={(props: any) => <BottomTabBar {...props} />}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '首页',
                }}
            />
            <Tab.Screen
                name="Find"
                component={Find}
                options={{
                    tabBarLabel: '发现',
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarLabel: '消息',
                }}
            />
            <Tab.Screen
                name="Personage"
                component={Personage}
                options={{
                    tabBarLabel: '我的',
                }}
            />
        </Tab.Navigator>
    );
}
