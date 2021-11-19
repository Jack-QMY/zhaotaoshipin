import * as React from 'react';
const privateRoutes = {
    Chat: true,
    CreatePost: true,
    Wallet: true,
    WithdrawHistory: true,
    Feedback: true,
    EditUserData: true,
    RetrievePassword: true,
    CommentNotification: true,
    FollowNotification: true,
    BeLikedNotification: true,
    PersonalNotification: true,
};

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name: string, params?: object) {
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export const authNavigate = (name: string, params?: object) => {
    if (privateRoutes[name] && TOKEN) {
        navigate(name, params);
    } else {
        navigate('Login');
    }
};
