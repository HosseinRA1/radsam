import React from 'react';

import BaseComponent from "../BaseComponent";
import {Spinner, View} from "native-base";
import TextView from "../TextView";
import {TouchableOpacity} from 'react-native';

export default class Button extends BaseComponent {
    render() {
//        let color = '#ccc';
        let {color = '#ccc', style = {}, loading = false, textColor = '#fff'} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} style={[{
                width: '100%',
                height: 50,
                backgroundColor: color,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
            }, style]} onPress={this.props.onPress}>
                <View>
                    <Spinner color='white' style={{display: loading ? 'flex' : 'none'}}/>
                    <TextView color={textColor} style={{display: loading ? 'none' : 'flex'}}>{this.props.children}</TextView>
                </View>
            </TouchableOpacity>
        );
    }
}