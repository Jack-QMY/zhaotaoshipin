import React from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { Props, Colors } from './constants';

const dw = Dimensions.get('window').width;

export interface ProgressProps {
    width?: number;
    color?: string;
    showsText?: boolean;
}

export default class ProgressCircle extends React.Component<ProgressProps> {
    constructor(props: ProgressProps) {
        super(props);
    }

    state = {
        progress: 0,
    };

    setProgress = (val: number) => {
        this.setState({ progress: val });
    };

    render() {
        const { width = dw / 5, color = '#FE1966', showsText = true } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrap}>
                    <Progress.Circle
                        progress={this.state.progress}
                        size={width}
                        showsText={showsText}
                        color={color}
                        textStyle={{ color: '#ffffff' }}
                        unfilledColor={'#ffffff'}
                        borderColor="rgba(255,255,255,0)"
                        thickness={3}
                        strokeCap="round"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrap: {
        minWidth: dw / 3,
        minHeight: dw / 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
});
