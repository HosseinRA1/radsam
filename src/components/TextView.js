import React from 'react';
import BaseComponent from "./BaseComponent";
import {Text, TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';

export default class TextView extends BaseComponent {

    render() {
        let {veryLarge,textAlign='left', white, large, center,smaller, medium, color = '#7b7b7b', small, style = {}, link = false,size=18} = this.props;


        if (veryLarge)
            size = 35;
        if (medium)
            size = 14;
        if (large)
            size = 30;
        if (white)
            color = '#fff';
        if (center)
            textAlign = 'center';
        if (small)
            size = 10;
        if (smaller)
            size = 12;


        if (link) {
            return (<TouchableOpacity activeOpacity={0.2} onPress={() => {
                    Linking.canOpenURL(link).then(supported => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            return Linking.openURL(link);
                        }
                    }).catch(err => console.error('An error occurred', err));
                }}>
                    <Text {...this.props} style={[{fontSize: size, color: color,}, style]}>
                        {this.props.children}
                    </Text>
                </TouchableOpacity>
            );

        } else
            return (
                <Text {...this.props} style={[{fontSize: size, color: color}, style]}>
                    {this.props.children}
                </Text>
            );
    }
}