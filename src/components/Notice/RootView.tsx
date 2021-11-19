import React, { Component, PureComponent } from 'react';
import { StyleSheet, AppRegistry, DeviceEventEmitter, View, Animated } from 'react-native';

let keyValue = 0;

class PureView extends PureComponent {
    render() {
        return <View style={styles.container}>{this.props.children}</View>;
    }
}

class MapItem extends PureComponent {
    render() {
        return this.props.children;
    }
}

export default class RootView extends Component {
    static add(element) {
        let key = ++keyValue;
        DeviceEventEmitter.emit('addNotice', { key, element });
        return key;
    }

    static remove(key) {
        DeviceEventEmitter.emit('removeNotice', { key });
    }

    static removeAll() {
        DeviceEventEmitter.emit('removeAllNotice', {});
    }

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('addNotice', (e) => this.add(e));
        DeviceEventEmitter.addListener('removeNotice', (e) => this.remove(e));
        DeviceEventEmitter.addListener('removeAllNotice', (e) => this.removeAll(e));
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('addNotice');
        DeviceEventEmitter.removeAllListeners('removeNotice');
        DeviceEventEmitter.removeAllListeners('removeAllNotice');
    }

    add(e) {
        const { elements } = this.state;
        elements.push(e);
        this.setState({ elements });
    }

    remove(e) {
        const { elements } = this.state;
        for (const i = elements.length - 1; i >= 0; --i) {
            if (elements[i].key === e.key) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ elements });
    }

    removeAll(e) {
        const { elements } = this.state;
        this.setState({ elements: [] });
    }

    render() {
        const { elements } = this.state;
        return (
            <View style={styles.dialog}>
                <PureView>{this.props.children}</PureView>
                {elements.map((item, index) => {
                    return <MapItem key={'RootView' + item.key}>{item.element}</MapItem>;
                })}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    dialog: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});

if (!AppRegistry.originRegisterComponent) {
    AppRegistry.originRegisterComponent = AppRegistry.registerComponent;
}

AppRegistry.registerComponent = function (appKey, componentProvider) {
    class RootElement extends Component {
        render() {
            const OriginAppComponent = componentProvider();
            return (
                <RootView>
                    <OriginAppComponent {...this.props} />
                </RootView>
            );
        }
    }

    return AppRegistry.originRegisterComponent(appKey, () => RootElement);
};
