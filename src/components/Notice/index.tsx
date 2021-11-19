import React, { Component } from 'react';
import RootView from './RootView';
import Toast, { ToastProps } from './Toast';
import Loading, { LoadingProps } from './Loading';
import Message, { MessageProps } from './Message';
import Progress, { ProgressProps } from './Progress';

type DialogType = 'toast' | 'message';

type ObjectType<T> = T extends 'toast' ? ToastProps : T extends 'message' ? MessageProps : never;

export default class Notice {
    static loadingKey = '';
    static progressKey = '';
    static progressRef;

    static hide(key) {
        RootView.remove(key);
    }

    static toast(props: ToastProps) {
        let key;
        key = RootView.add(<Toast onHide={() => RootView.remove(key)} {...props} />);
        return key;
    }

    static message(props: MessageProps) {
        let key;
        key = RootView.add(<Message onHide={() => RootView.remove(key)} {...props} />);
        return key;
    }

    static loading(props: LoadingProps) {
        if (Notice.loadingKey) {
            RootView.remove(Notice.loadingKey);
            Notice.loadingKey = '';
        } else {
            const element = React.cloneElement(<Loading />, props);
            Notice.loadingKey = RootView.add(element);
        }
    }

    static progress({ progress, ...other }: { progress?: number } & ProgressProps = {}) {
        if (!Notice.progressKey) {
            const element = <Progress {...other} ref={(ref: any) => (Notice.progressRef = ref)} />;
            Notice.progressKey = RootView.add(element);
        } else if (progress) {
            Notice.progressRef.setProgress(progress);
        } else {
            RootView.remove(Notice.progressKey);
            Notice.progressKey = '';
        }
    }

    // deprecated
    static show<T extends DialogType>(type: T, props: ObjectType<T>) {
        if (type === 'toast') {
            Notice.toast(props);
        } else if (type === 'message') {
            Notice.message(props);
        }
    }
}
