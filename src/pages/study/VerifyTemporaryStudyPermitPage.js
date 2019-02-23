import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {strings} from "../../i18n";

export default class VerifyTemporaryStudyPermitPage extends BasePage {
    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.title')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_1')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_2')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_3')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_4')}
                        </TextView>
                    </CardIcon>


                </View>
                <View style={{padding: 20}}>

                    <Button color='#1f8a00'>
                        {strings('verify_temporary_study_permit.btn_text')}
                    </Button>
                </View>
                <View style={{marginTop: 10}}>
                    <CardIcon icon='clock'>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_5')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_6')}
                        </TextView>
                        <TextView medium>
                            {strings('verify_temporary_study_permit.desc_7')}
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