import React from 'react';
import BaseComponent from "../BaseComponent";
import {Body, Card, CardItem, Icon, Input} from "native-base";
import {View} from "react-native";
import TextView from "../TextView";

export default class BaseInput extends BaseComponent {
    render() {
        let {
            style = {}, onChangeText = () => {
            },keyboardType = 'default',
        } = this.props;
        return (
            <View>
                <TextView color = 'black' style={{padding: 5}} medium>{this.props.title}</TextView>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <Input keyboardType={keyboardType} onChangeText={onChangeText} placeholder={this.props.children}
                           style={[{ height: 40, padding :0}, style]}/>
                </View>
            </View>
        );
    }

    description() {
        return (
            <TextView medium>{this.props.description}</TextView>
        );
    }
}