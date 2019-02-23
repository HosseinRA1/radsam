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

export default class VerifyTemporaryVisitorVisaPage extends BasePage {
    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.title')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_1')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_2')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_3')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_4')}
                        </TextView>
                    </CardIcon>


                </View>
                <View style={{padding: 20}}>

                    <Button color={Red}>
                        {strings('verify_temporary_visitor_visa.btn_text')}
                    </Button>
                </View>
                <View style={{marginTop: 10}}>
                    <CardIcon icon='clock'>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_5')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_6')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_visitor_visa.desc_7')}
                        </TextView>
                    </CardIcon>
                </View>
                <View style={{marginTop: 10}}>

                    <ButtonIcon color="black" icon='mail'>
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }
}