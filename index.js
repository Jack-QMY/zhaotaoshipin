/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Global from './src/utils/global';
import App from './src/App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);
