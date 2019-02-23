import React from 'react'
import BasePage from "../BasePage";
import pageStyle from "../../assets/style/page";
import TextView from "../../components/TextView";
import {Dimensions, Image, NetInfo, View} from "react-native";
import {Body, Card, CardItem, Container, Content, Text} from "native-base";
import Button from "../../components/button/Button";
import InputIcon from "../../components/Input/InputIcon";
import {Gold, loginButton, Red} from "../../assets/style/colors";
import RegisterPage from "./RegisterPage";
import {Actions} from 'react-native-router-flux';
import {API_URL_V1} from "../../classes/system";

import Toaster from "../../classes/toast/Toast";
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import Auth from "../../classes/auth/Auth";
import {strings} from "../../i18n";
import ContainerLogin from "../../components/ContainerLogin";

export default class LoginPage extends BasePage {

    constructor() {
        super();
        this.state = {
            mobile: '',
            loading: false,
            loginLoading: false,
            verifyCodeState: false,
            code: ''
        }
    }

    render() {
        let {width, height} = Dimensions.get('window');
        return (


            <ContainerLogin>
                <Image
                    style={{width: '100%', height: '100%', position: 'absolute'}}
                    source={require('../../assets/images/background/login.png')}
                />
                <Image
                    style={{width: width, height: height / 5, position: 'absolute', bottom: 0, right: 0}}
                    source={require('../../assets/images/background/loginBottom.png')}
                />
                <Content style={{marginTop: 10, width: '80%', alignSelf: 'center'}}>
                    <View style={{marginTop: 50}}>
                        <Card style={{padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF99'}}>
                            <CardItem style={{backgroundColor: 'transparent'}}>
                                <Body>
                                <InputIcon disable={this.state.verifyCodeState} keyboardType='phone-pad'
                                           onChangeText={(value) => {
                                               this.setState({
                                                   mobile: value
                                               })
                                           }}>
                                    {strings('login.telephone')}
                                </InputIcon>
                                </Body>
                            </CardItem>
                            <View style={{display: this.state.verifyCodeState ? 'flex' : 'none', width: '100%'}}>
                                <CardItem style={{backgroundColor: 'transparent'}}>
                                    <Body>
                                    <InputIcon keyboardType='phone-pad' icon='lock' onChangeText={(value) => {
                                        this.setState({
                                            code: value
                                        })
                                    }}>
                                        {strings('login.active-code')}
                                    </InputIcon>
                                    </Body>
                                </CardItem>
                            </View>
                            <CardItem style={{backgroundColor: 'transparent'}}>
                                <Body>
                                <View
                                    style={{display: this.state.verifyCodeState ? 'none' : 'flex', width: '100%'}}>
                                    <Button textColor={Red} loading={this.state.loading} onPress={() => {
                                        this.sendVerifyCode()
                                    }} style={{marginTop: 5}} color={loginButton}>
                                        {strings('login.send-active-code')}
                                    </Button>
                                </View>
                                <View
                                    style={{display: this.state.verifyCodeState ? 'flex' : 'none', width: '100%'}}>
                                    <Button textColor={Red} loading={this.state.verifyLoading} onPress={() => {
                                        this.verifyMobile();
                                    }} style={{marginTop: 5}} color={loginButton}>
                                        {strings('login.submit')}
                                    </Button>
                                </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </ContainerLogin>
        );
    }

    async sendVerifyCode() {
        let mobile = this.state.mobile;

        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                if (mobile.length < 10 || mobile.length > 14) {

                    new Toaster().error('invalid phone number');
                    return;
                }

                this.setState({loading: true});
                try {
                    let webservice = new Webservice();
                    webservice.url = `${API_URL_V1}mobile/register?mobile=${mobile}`;
                    webservice.method = POST_METHOD;
                    let response = await webservice.call();
                    console.log(response);
                    let responseJson = await response.json();

                    this.setState({loading: false});

                    if (responseJson.status) {
                        this.setState({
                            verifyCodeState: true
                        })
                    } else {
                        new Toaster().error(responseJson.data.message);
                    }
                } catch (error) {
                    // alert(error);
                    new Toaster().error('There was a problem. Try again');
                    console.log(error);
                    this.setState({loading: false});
                }
            }
            else {
                new Toaster().error('Please check internet connection');
            }
        })
        /*setTimeout(()=>{
            this.setState({loading:false});
        },3000)*/

    }

    async verifyMobile() {
        let code = this.state.code;
        let mobile = this.state.mobile;
        if (code.length < 6 || code.length > 6) {
            new Toaster().error('invalid verify code');
            return;
        }
        if (mobile.length < 10 || mobile.length > 14) {

            new Toaster().error('invalid phone number');
            return;
        }
        this.setState({verifyLoading: true});
        let webservice = new Webservice();
        webservice.method = POST_METHOD;
        webservice.url = `${API_URL_V1}mobile/validate?mobile=${mobile}&code=${code}`;
        try {

            let response = await webservice.call();
            console.log(response);


            let responseJson = await response.json();

            this.setState({verifyLoading: false});

            if (responseJson.status) {

                await Auth.setToken(responseJson.data.token);
                await Auth.setLogin(true);
                await Auth.setMobile(mobile);
                Actions.replace('register');
            } else {
                if (responseJson.data.message !== undefined)
                    new Toaster().error(responseJson.data.message);
                else
                    new Toaster().error('unknown error');
            }

        } catch (error) {
            new Toaster().error('There was a problem. Try again');
            console.log(error);
            this.setState({verifyLoading: false});
        }

    }
}