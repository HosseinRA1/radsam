import React from 'react';
import BasePage from "../BasePage";
import {AsyncStorage, ImageBackground, View, Image, Dimensions} from "react-native";
import TextView from "../../components/TextView"
import pageStyle from '../../assets/style/page';
import {Actions} from 'react-native-router-flux';
import Auth from "../../classes/auth/Auth";
import {strings} from '../../i18n';
import Button from "../../components/button/Button";
import {loginBack, loginButton, loginGoldText, Red} from "../../assets/style/colors";
import ContainerLogin from "../../components/ContainerLogin";

export default class SelectLanguagePage extends BasePage {

    async setLang(value) {
        return await AsyncStorage.setItem('@lang', value);
    }

    render() {
        Auth.initial().then(() => {
            if (Auth.login) {
                // if (Auth.registerForm)
                // Actions.replace('main');
                // else
                //   Actions.replace('register');
            }
        });
        return (
            <ContainerLogin>
                {this.container()}
            </ContainerLogin>
        );
    }

    container() {
        let {width, height} = Dimensions.get('window');
        return (
            <View style={{height: height}}>
                <View style={{alignItems: 'center'}}>
                    <TextView veryLarge color='#f3d58e'>{strings('splash.welcome')}</TextView>
                    <TextView color={loginGoldText}>{strings('splash.desc_1')}</TextView>
                    <TextView color={loginGoldText}>{strings('splash.desc_2')}</TextView>
                    <TextView color={loginGoldText}>{strings('splash.desc_3')}</TextView>
                    <TextView color={loginGoldText}>{strings('splash.radsam_app')}</TextView>
                </View>
                <View style={{alignItems: 'center' }}>
                    <Button style={{alignItems: 'center', marginTop: 30, width: 350}} color={loginButton} onPress={() => {
                        Actions.replace('welcome')
                    }} textColor={Red}>Next</Button>
                </View>
                <View style = {{bottom : 0 }}>
                    <Image
                        source={require('../../assets/images/background/login-back.png')}
                        style={{width: width, height: height/3 , marginTop :5}}
                    />
                </View>
            </View>

        )
    }
}