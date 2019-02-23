import React, {Component} from 'react';
import {Title as BaseTitle} from "native-base";
import {Platform} from 'react-native'
import {primaryTextAndroid, primaryTextIos} from "../assets/style/colors";

export default class Title extends Component {
    render() {
        return (
            <BaseTitle
                style={{backgroundColor: Platform.OS !== 'ios' ? primaryTextAndroid : primaryTextIos}}>{this.props.children}</BaseTitle>
        )
    }
}