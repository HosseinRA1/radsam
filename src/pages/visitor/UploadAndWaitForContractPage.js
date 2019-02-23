import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import Button from "../../components/button/Button";
import CardIcon from "../../components/card/CardIcon";
import ButtonIcon from "../../components/button/ButtonIcon";
import {Gold, Red} from "../../assets/style/colors";
import {Actions} from 'react-native-router-flux';
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import Toaster from "../../classes/toast/Toast";
import {strings} from "../../i18n";
import CheckBoxStudyForm from "../../components/CheckBoxStudyForm";

export default class UploadAndWaitForContractPage extends BasePage {
    state = {
        loading: false
    };

    view() {
        return (
            <View>
                <View style={{marginTop: 30}}>
                    <CardIcon icon='paper'>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.title')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_1')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_2')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_3')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_4')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_5')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_6')}
                        </TextView>
                        <TextView medium>
                            {strings('upload_and_wait_for_contract.desc_7')}
                        </TextView>
                    </CardIcon>

                </View>

                <View style={{padding: 20}}>
                    <Button loading={this.state.loading} onPress={() => {
                        this.sendAgreement();
                    }} color={Red}>
                        {strings('upload_and_wait_for_contract.btn_text')}
                    </Button>
                </View>

                <View style={{marginTop: 10}}>
                    <ButtonIcon color="black" icon='mail' onPress = {() => {Actions.push('faq')}}>
                        {strings('common.faq')}
                    </ButtonIcon>
                </View>
            </View>
        );
    }

    async sendAgreement() {
        this.setState({
            loading: true
        })
        let webservice = new Webservice();
        webservice.url = `${API_URL_V1}send/email/agreement`;
        webservice.method = POST_METHOD

        try {
            let response = await webservice.call();

            let responseJson = await response.json();

            if (responseJson.status) {
                this.setState({
                    loading: false
                })
                new Toaster().success(responseJson.data.message);
                Actions.replace('upload_contract');
            } else {
                new Toaster().success(responseJson.data.message);
                this.setState({
                    loading: false
                })
            }

            console.log(response);
        } catch (error) {
            console.log(error);
            this.setState({
                loading: false
            })

        }
    }
}