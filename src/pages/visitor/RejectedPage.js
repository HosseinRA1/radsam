import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {Gold, Red} from "../../assets/style/colors";
import {strings} from "../../i18n";
import {Actions} from "react-native-router-flux";

export default class RejectedPage extends BasePage {
    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('rejected.title')}
                        </TextView>

                        <TextView medium>
                            {strings('rejected.description')}
                        </TextView>
                    </CardIcon>


                </View>
                <View style={{padding: 20}}>

                    <Button color={Red}>
                        {strings('rejected.status')}
                    </Button>


                </View>

                <View style={{marginTop: 30}}>

                    <ButtonIcon color='black' icon='mail' onPress = {() => {Actions.push('faq')}}>
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }
}