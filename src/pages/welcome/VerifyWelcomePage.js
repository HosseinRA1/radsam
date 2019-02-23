import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "react-native";
import {Body, Card, CardItem, Icon,} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {Blue, Gold, Red} from '../../assets/style/colors'
import {Actions} from 'react-native-router-flux';
import {strings} from "../../i18n";


export default class VerifyWelcomePage extends BasePage {
    view() {
        let utcString = (new Date()).toLocaleTimeString();

        return (
            <View>
                <View style={{marginTop: 50}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('verify_welcome.title')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_welcome.desc_1')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_welcome.desc_2')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_welcome.desc_3')}
                        </TextView>
                    </CardIcon>


                </View>

                <View style={{padding: 20}}>

                    <Button onPress={() => {
                        Actions.replace('main');
                    }} color={Red}>
                        {strings('verify_welcome.btn_text')}
                    </Button>
                </View>

                <View style={{alignItems: 'flex-end'}}>

                    <TextView color={Blue} style={{bottom: -15, marginEnd: 40}}>{utcString} (EST)</TextView>
                </View>
                <View style={{marginTop: 10}}>
                    <CardIcon icon='clock'>
                        <TextView medium>
                            {strings('verify_welcome.desc_4')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_welcome.desc_5')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_welcome.desc_6')}
                        </TextView>
                    </CardIcon>
                </View>
                <View style={{marginTop: 10}}>

                    <ButtonIcon color="#000" icon='mail'>
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }
}