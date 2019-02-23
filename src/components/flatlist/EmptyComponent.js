import BaseComponent from "../BaseComponent";
import {View} from "react-native";
import {Spinner} from "native-base";

import React from "react";
import TextView from "../TextView";
import {Red} from "../../assets/style/colors";

export default class EmptyComponent extends BaseComponent {


    render() {
        let {empty, error} = this.props;
        let message = 'Nothing found !';
        if (error) {
            message = 'There was a problem please try again.';
        }
        return (<View>
            <Spinner color={Red} style={{
                display: empty ? 'none' : 'flex',
            }}/>
            <View style={{
                height: 50,
                top: 20,
                display: empty ? 'flex' : 'none', width: '100%',
                alignItems: 'center'
            }}>
                <TextView>Nothing found !</TextView>
            </View>
        </View>)
    }
}