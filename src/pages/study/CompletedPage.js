import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View , TouchableOpacity} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {Actions} from 'react-native-router-flux'
import {strings} from '../../i18n';

export default class CompletedPage extends BasePage {
    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('completed.title')}
                        </TextView>

                        <TextView medium>
                            {strings('completed.description')}
                        </TextView>
                    </CardIcon>


                </View>
                <View style={{padding: 20}}>
                    <Button color='#1f8a00'>
                        {strings('completed.status')}
                    </Button>
                </View>

                <View  style={{marginTop: 30}} >
                    <ButtonIcon onPress = {() => {Actions.push('faq')}} color='black' icon='mail' >
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }
}