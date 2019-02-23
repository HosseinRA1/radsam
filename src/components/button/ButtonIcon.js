import React from 'react';

import BaseComponent from "../BaseComponent";
import {Icon, View} from "native-base";
import TextView from "../TextView";
import {TouchableOpacity} from 'react-native';

export default class ButtonIcon extends BaseComponent {
    render() {
//        let color = '#ccc';
        let {color = '#ccc'} = this.props;
        return (
            <TouchableOpacity {...this.props} activeOpacity={0.5} style={{
                width: '100%',
                height: 50,
                borderColor: color,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 10
            }} >
                <View style={{flexDirection: 'row', marginStart:20}}>
                    <Icon name={this.props.icon} style={{color: color,marginEnd:10}}/>
                    <TextView color={color}>{this.props.children}</TextView>
                </View>
            </TouchableOpacity>
        );
    }
}