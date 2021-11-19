/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { configure } from 'mobx';
import Global from './src/utils/global';
import App from './src/App';
import { name as appName } from './app.json';

configure({
    enforceActions: 'never',
    
});

AppRegistry.registerComponent(appName, () => App);
