import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {strings} from "../../i18n";
import {Green} from "../../assets/style/colors";
import {Actions} from "react-native-router-flux";

export default class UploadAndWaitForContractStudyPermitPage extends BasePage {
    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract_study_permit.title')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract_study_permit.desc_1')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract_study_permit.desc_2')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract_study_permit.desc_3')}
                        </TextView>
                    </CardIcon>


                </View>
                <View style={{padding: 20}}>

                    <Button color='#1f8a00'>
                        {strings('upload_and_wait_for_contract_study_permit.status')}
                    </Button>
                </View>

                <View style={{marginTop: 10 }}>

                    <ButtonIcon color='black' icon='mail' onPress = {() => {Actions.push('faq')}}>
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }
}