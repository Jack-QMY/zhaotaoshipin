import { makeAutoObservable } from 'mobx';
import { RecordKeys, Storage } from './storage';

export interface UserScheme {
    id: number;
    name: string;
    avatar: string;
    token: string;
    [key: string]: any;
}
class UserStore {
    me = {} as UserScheme;
    login: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    // 注意，用户登录存在缓存里，调用userStore.signIn(xxxx),外界判断可以用login判断
    signIn(user: UserScheme) {
        TOKEN = user.token;
        this.me = user;
        this.login = true;
        Storage.setItem(RecordKeys.me, user);
        Storage.setItem(RecordKeys.notFirstInstall, true);
    }

    //退出登录
    signOut() {
        TOKEN = null;
        this.me = {} as UserScheme;
        this.login = false;
        Storage.removeItem(RecordKeys.me);
    }
}

export default new UserStore();
