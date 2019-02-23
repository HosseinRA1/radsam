import React from 'react'
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {Image, Dimensions, NetInfo} from "react-native";
import {Body, Card, CardItem, View, Content} from "native-base";
import Button from "../../components/button/Button";
import InputIcon from "../../components/Input/InputIcon";
import {loginButton, Red} from "../../assets/style/colors";
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
            code: '',
            connected: null
        }
    }

    render() {
        let {width, height} = Dimensions.get('window');
        if (this.state.connected !== null && this.state.connected) {
            return (
                <View style={{width: 100, height: 100, backgroundColor: 'white'}}>
                    <TextView> Hiiiiiiiiiiii</TextView>
                </View>
            )
        }

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
                <Content style={{marginTop: 50, width: '80%', alignSelf: 'center'}}>
                    <Card style={{padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF99'}}>
                        <CardItem style={{backgroundColor: 'transparent'}}>
                            <Body>
                            <InputIcon
                                icon="call"
                                placeholder='+10000000'
                                keyboardType='phone-pad'
                                onChangeText={(value) => {
                                    this.setState({
                                        mobile: value
                                    })
                                }}>
                                {strings('login.telephone')}
                            </InputIcon>
                            </Body>
                        </CardItem>

                        <CardItem style={{backgroundColor: 'transparent'}}>
                            <Body>
                            <View style={{width: '100%'}}>
                                <Button textColor={Red} loading={this.state.loginLoading} onPress={() => {
                                    this.login();
                                }}
                                        color={loginButton}>
                                    {strings('login.login')}
                                </Button>
                            </View>

                            <View style={{
                                flex: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: '6%'
                            }}>
                                <TextView smaller color='black'>{strings('login.create-account')}
                                    <TextView color='black' medium onPress={() => {
                                        Actions.push('verify')
                                    }} style={{
                                        textDecorationLine: 'underline',
                                        fontStyle: 'italic'
                                    }}>{strings('login.register')}</TextView>
                                </TextView>

                            </View>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </ContainerLogin>

        );
    }


    async login() {
        let mobile = this.state.mobile;
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                if (mobile.length < 10 || mobile.length > 14) {

                    new Toaster().error('invalid phone number');
                    return;
                }

                this.setState({loginLoading: true});

                try {

                    let webservice = new Webservice();
                    webservice.url = `${API_URL_V1}user/login?mobile=${mobile}`;
                    let response = await webservice.call();


                    let responseJson = await response.json();

                    this.setState({loginLoading: false});

                    if (responseJson.status) {

                        await Auth.setToken(responseJson.data.token);
                        await Auth.setFirstName(responseJson.data.name);
                        await Auth.setFamily(responseJson.data.family);
                        await Auth.setLogin(true);
                        await Auth.setMobile(mobile);
                        Actions.replace('main');

                    } else {
                        new Toaster().error(responseJson.data.message);
                    }
                } catch (error) {
                    // alert(error);
                    new Toaster().error('There was a problem. Try again');
                    console.log(error);
                    this.setState({loginLoading: false});
                }
            }
            else {
                new Toaster().error('Please check internet connection');
            }
        });



        /*setTimeout(()=>{
            this.setState({loading:false});
        },3000)*/

    }

}