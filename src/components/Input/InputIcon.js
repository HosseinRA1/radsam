import React from 'react';
import BaseComponent from "../BaseComponent";
import {Icon, Input, View} from "native-base";
import TextView from "../TextView";
import BaseInput from "./BaseInput";
import {Red} from "../../assets/style/colors";

export default class InputIcon extends BaseComponent {

    render() {
        const {
            icon = 'person', onChangeText = () => {
            }, keyboardType = 'default', disable = false
        } = this.props;
        return (
            <View style={{
                borderWidth: 1,
                borderColor: Red,
                height: 50,
                borderRadius: 10,
                width: '100%',
                justifyContent: 'center',
            }}>
                <View style={{flexDirection: 'row', alignContent: 'center', width: '100%', justifyContent: 'center'}}>
                    <Icon style={{color: Red, marginStart: 10, marginEnd: 5, marginTop: 10}} name={icon}/>
                    <Input editable={!disable} keyboardType={keyboardType} onChangeText={onChangeText}
                           style={{padding: 0, width: '100%'}} placeholder={this.props.children}/>
                </View>
            </View>
        );
    }


}