import { makeAutoObservable } from 'mobx';

class App {
    currentRouteName: string = '';

    constructor() {
        makeAutoObservable(this);
    }
}
export default new App();
