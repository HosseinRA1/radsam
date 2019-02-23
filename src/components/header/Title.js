import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform} from 'react-native'
import TextView from "../TextView";

export default class Title extends Component {
    static propTypes = {
        children: PropTypes.string,
    };

    render() {
        return (
            <TextView color={Platform.OS === 'ios' ? 'red' : 'white'}>{this.props.children}</TextView>
        )
    }
}
