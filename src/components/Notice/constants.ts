import { Easing, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const ToastDuration = {
    LONG: 3200,
    FAST: 2000,
};

const ToastFadeInDuration = 240;
const ToastFadeOutDuration = 360;
const ToastHeight = 40;

const ToastPosition = {
    top: { top: ToastHeight * 3 },
    center: { top: (height - ToastHeight) / 2 },
    bottom: { bottom: ToastHeight * 2 },
};

export { ToastDuration, ToastFadeInDuration, ToastFadeOutDuration, ToastHeight, ToastPosition };
