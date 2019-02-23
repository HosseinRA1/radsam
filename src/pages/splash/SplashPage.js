import React from 'react';
import BasePage from "../BasePage";
import I18n from "react-native-i18n";
import {AsyncStorage, StyleSheet, View, Animated, StatusBar} from "react-native";
import {Actions} from 'react-native-router-flux';
import Auth from "../../classes/auth/Auth";
import {Red} from "../../assets/style/colors";

export default class SplashPage extends BasePage {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(.5);
    }

    componentWillMount() {
        this.spring()
    }

    spring() {
        this.springValue.setValue(.7);
        Animated.spring(this.springValue, {
            toValue: 1,
            friction: 2,
            tension: 10
        }).start()
    }

    async getLang() {
        return await AsyncStorage.getItem('@lang');
    }

    render() {
        this.getLang().then((response) => {
            console.log(response);
            if (response === null) {
                response = 'en'
            }
            if (response === undefined) {
                response = 'en'
            }
            I18n.defaultLocale = response;
            I18n.locale = response;

            Auth.initial().then(() => {
                if (Auth.login) {
                    // if (Auth.registerForm)
                    // Actions.replace('main');
                    // else

                    Actions.replace('main');

                } else {
                    Actions.replace('select_language')
                }
            });
        }).catch((error) => {
            console.log(error);
        });
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Animated.Image ref="image" source={require('./../../assets/images/logo.png')}
                                style={{
                                    width: 250,
                                    height: 100,
                                    alignSelf: 'center',
                                    transform: [{scale: this.springValue}]
                                }}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Red
    },

});