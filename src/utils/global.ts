import { isAndroid, isPad, sh, sw, wh, ww } from './base';
import device from './device';
import * as scale from './scale';
import theme from './theme';

const Global = global || window || {};

// 适配字体
Global.font = scale.font;
// 屏幕适配
Global.pixel = scale.pixel;
// 宽度适配
Global.percent = scale.percent;
// 设备信息
Global.Device = device;
// App主题
Global.Theme = theme;

//设备辅助
Global.sw = sw;
Global.sh = sh;
Global.ww = ww;
Global.wh = wh;
Global.isPad = isPad;
Global.isAndroid = isAndroid;
