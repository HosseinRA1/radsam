import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, TouchableOpacity} from 'react-native'
import {Icon} from "native-base";

export default class BackButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
    };

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPress();
            }}>
                <Icon name='arrow-back' style={{color:Platform.OS === 'ios' ? 'red' : 'white'}} color={Platform.OS === 'ios' ? 'red' : 'white'}/>
            </TouchableOpacity>
        )
    }
}