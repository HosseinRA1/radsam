import BaseComponent from "../BaseComponent";
import React from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native'
export default class BackgroundImage extends BaseComponent{
    render() {
        return (
            <BackgroundImage source={this.props.source}
                   style={styles.backgroundImage}>

                {this.props.children}

            </BackgroundImage>
        )
    }
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,

        resizeMode: 'cover'
    }
});