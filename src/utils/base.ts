import { Dimensions, Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';
const { width: ww, height: wh } = Dimensions.get('window');
const { width: sw, height: sh } = Dimensions.get('screen');

const isPad = isTablet();
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export { sw, sh, ww, wh, isPad, isAndroid, isIOS };
