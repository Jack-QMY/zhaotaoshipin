import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const windowWidth = ExtraDimensions.getRealWindowWidth();
const windowHeight = ExtraDimensions.getRealWindowHeight();
const { width, height } = Dimensions.get('window');
const dw = Platform.OS === 'ios' ? width : windowWidth;
const dh = Platform.OS === 'ios' ? height : windowHeight;
const topInset = initialWindowMetrics?.insets.top;
const bottomInset = initialWindowMetrics?.insets.bottom;
const leftInset = initialWindowMetrics?.insets.left;
const rightInset = initialWindowMetrics?.insets.right;
export default {
    width: dw,
    height: dh,
    topInset,
    bottomInset,
    leftInset,
    rightInset,
    navBarHeight: 44,
    tabBarHeight: 56,
    OS: Platform.OS,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isFullScreenDevice: dh / dw >= 2,
    minimumPixel: 1 / PixelRatio.get(),
    UUID: DeviceInfo.getUniqueId(),

    get isLandscape(): boolean {
        return Dimensions.get('window').width > Dimensions.get('window').height;
    },

    get statusBarHeight(): number {
        if (Platform.OS === 'ios') {
            return this.isLandscape ? 0 : DeviceInfo.hasNotch() ? 34 : 20;
        } else if (Platform.OS === 'android') {
            return StatusBar.currentHeight ?? 0;
        }
        return this.isLandscape ? 0 : 20;
    },
};
