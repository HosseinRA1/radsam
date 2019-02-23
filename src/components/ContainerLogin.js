import React from 'react';
import BaseComponent from "./BaseComponent";
import {loginBack} from "../assets/style/colors";
import {Dimensions, Image, ImageBackground, View, ScrollView} from "react-native";
import {Content, Container} from 'native-base'

export default class ContainerLogin extends BaseComponent {
    render() {
        let {width, height} = Dimensions.get('window');
        return (

            <Container
                style={{width: width, height: height, backgroundColor: loginBack}}>
                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <View style={{width: 200, height: 200, borderRadius: 100, backgroundColor: '#5f1f2a'}}/>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{width: 205, height: 80, position: 'absolute', top: 60}}
                    />
                </View>
                {this.props.children}
            </Container>

        )
    }
}