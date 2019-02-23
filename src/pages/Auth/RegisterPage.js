import React from 'react'
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {Image, Dimensions} from "react-native";
import {Body, View, CardItem, Content, Form, Icon, Picker, Item} from "native-base";
import RadioGroup from 'react-native-custom-radio-group';
import BaseComponent from "../../components/BaseComponent";
import Input from "../../components/Input/Input";
import DatePicker from 'react-native-datepicker'
import {loginButton, loginGoldText, Red} from '../../assets/style/colors';
import Button from "../../components/button/Button";
import {Actions} from 'react-native-router-flux';
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import Toaster from "../../classes/toast/Toast";
import Auth from "../../classes/auth/Auth";
import {strings} from "../../i18n";
import ContainerLogin from "../../components/ContainerLogin";


export default class RegisterPage extends BasePage {

    constructor() {
        super();
        this.state = {
            loading: false,
            firstName: '',
            lastName: '',
            gender: 0,
            birthDate: "2016-05-15",
            country: '',
            city: '',
            mail: '',
            skypeId: '',
            education: '',
            howToLearnAboutYou: '',
        }
    }

    render() {
        let {width , height} = Dimensions.get('window')
        return (
            <ContainerLogin>
                <Image
                    style={{width : '100%' , height : '100%' , position:'absolute'}}
                    source = {require('../../assets/images/background/login.png')}
                />
                <Image
                    style={{width : width , height : height/5 , position:'absolute' , bottom : 0 , right : 0}}
                    source = {require('../../assets/images/background/loginBottom.png')}
                />
                    <Content padder style = {{marginTop : 5}}>
                        <TextView color={loginGoldText}
                                  style={{padding: 10, textAlign: 'center'}}>{strings('register.desc-1')}</TextView>
                        <Input onChangeText={(value) => {
                                this.setState({
                                    firstName: value
                                })
                            }} icon='person'>{strings('register.desc-2')}</Input>
                        <Input onChangeText={(value) => {
                            this.setState({
                                lastName: value
                            })
                        }} icon='person'>{strings('register.desc-3')}</Input>
                        <Gender onChange={(value) => {
                            this.setState({
                                gender: value
                            });
                        }}/>
                        <BirthDate date={this.state.birthDate} onDateChange={(value) => {
                            this.setState({
                                birthDate: value
                            })
                        }}/>
                        <Input onChangeText={(value) => {
                            this.setState({
                                country: value
                            })
                        }} icon='flag'>{strings('register.desc-4')}</Input>
                        <Input onChangeText={(value) => {
                            this.setState({
                                city: value
                            })
                        }} icon='compass'>{strings('register.desc-5')}</Input>
                        <Input onChangeText={(value) => {
                            this.setState({
                                mail: value
                            })
                        }} icon='mail'>{strings('register.desc-6')}</Input>
                        <Input onChangeText={(value) => {
                            this.setState({
                                skypeId: value
                            })
                        }} icon='logo-skype'
                               description={strings('register.desc-7')}>{strings('register.desc-8')}</Input>

                        <Education selected={this.state.education} onValueChange={(value) => {
                            this.setState({
                                education: value
                            });
                        }}/>
                        <HowToLearnAboutYou selected={this.state.howToLearnAboutYou} onValueChange={(value) => {
                            this.setState({
                                howToLearnAboutYou: value
                            });
                        }}/>
                        <Button loading={this.state.loading} onPress={() => {
                            // alert(this.state.education);
                            this.register();
                            //Actions.replace('verify_welcome');
                        }} color={loginButton} textColor = {Red} style={{marginTop: 5  }}>{strings('register.desc-9')}</Button>
                    </Content>
            </ContainerLogin>
        );
    }

     getTimeStamp(input) {
        let parts = input.trim().split(' ');
        let date = parts[0].split('-');
        let time = (parts[1] ? parts[1] : '00:00:00').split(':');

        // NOTE:: Month: 0 = January - 11 = December.
        let d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        return d.getTime() / 1000;
    }

    async register() {
        this.setState({
            loading: true
        });
        let webservice = new Webservice();
        webservice.method = POST_METHOD;
        webservice.url = `${API_URL_V1}user/store`;


        webservice.body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            birthday: this.getTimeStamp(this.state.birthDate),
            country: this.state.country,
            city: this.state.city,
            email: this.state.mail,
            skypeId: this.state.skypeId,
            education: this.state.education,
            howKnowUs: this.state.howToLearnAboutYou,


        };

        try {
            let response = await webservice.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                new Toaster().success('successful');
                Auth.setRegisterForm(true).then(() => {
                    Actions.replace('main');
                    Auth.setRegisterForm(true).then()
                });
                this.setState({
                    loading: false
                });
            } else {
                new Toaster().error('Please fill out registration from');
                this.setState({
                    loading: false
                });

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            console.log(error);
        }


    }
}

export class Education extends BaseComponent {
    constructor(props) {
        super(props);
            this.state = {
            selected: "key3"
        };
    }

    render() {
        let {
            onValueChange = () => {
            }
            , selected = strings('common.not_selected')
        } = this.props;
        return (
             <CardItem style={{
                backgroundColor: '#ffffff99',
                borderRadius: 20,
                height : 65,
                width: '90%',
                alignItems: 'center',
                alignSelf : 'center',
                marginBottom: 30,
                 marginTop : 20
            }}>
                <Body>
                <View style={{flexDirection: 'row',}}>
                    <Item style={{borderBottomWidth: 0 , marginLeft: -5}}>
                        <Icon name='briefcase' style={{color: Red}}/>
                        <TextView medium color='black'>{strings('common.education')}</TextView>
                    </Item>
                    <Content>
                        <Form style={{alignItems : 'space-around'}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={selected}
                                onValueChange={onValueChange}
                                style={{width:180 , marginTop : -5, marginRight : -20}}
                            >
                                <Picker.Item label={strings('common.not_selected')} value="Not Selected"/>

                                <Picker.Item label={strings('education.high_school_student')}
                                             value="High school student"/>
                                <Picker.Item label={strings('education.high_school_Diploma')}
                                             value="High school Diploma"/>
                                <Picker.Item label={strings('education.college_Diploma')} value="College Diploma"/>
                                <Picker.Item label={strings('education.associate_degree')}
                                             value="Associate Degree"/>
                                <Picker.Item label={strings('education.bachelor_degree')} value="Bachelor Degree"/>
                                <Picker.Item label={strings('education.master_degree')} value="Master Degree"/>
                                <Picker.Item label={strings('education.phd_degree')} value="PhD Degree"/>

                            </Picker>
                        </Form>
                    </Content>
                </View>
                </Body>
            </CardItem>
        )
    }
}

export class HowToLearnAboutYou extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    render() {
        let {
            onValueChange = () => {
            }, selected = () => {
            }
        } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: '#ffffff99',
                borderRadius: 20,
                width: '90%',
                height : 65,
                marginBottom: 20
            }}>
                <Item style={{borderBottomWidth: 0}}>
                    <Icon name='briefcase' style={{marginLeft: 10, color: Red}}/>
                    <TextView medium color='black'>{strings('common.how_to_learn_about_you')}</TextView>
                </Item>
                <Content>
                    <Form style={{alignItems: 'space-around'}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            headerBackButtonText="Back"
                            selectedValue={selected}
                            onValueChange={onValueChange}
                            style={{width: 180}}
                        >
                            <Picker.Item label={strings('common.not_selected')} value="Not Selected"/>
                            <Picker.Item label="Internet search" value="Internet search"/>
                            <Picker.Item label="Facebook" value="Facebook"/>
                            <Picker.Item label="Instagram" value="Instagram"/>
                            <Picker.Item label="Telegram" value="Telegram"/>
                            <Picker.Item label="Twitter" value="Twitter"/>
                            <Picker.Item label="Other social media" value="Other social media"/>
                            <Picker.Item label="Agents" value="Agents"/>
                            <Picker.Item label="Friends" value="Friends"/>
                            <Picker.Item label="Newspaper" value="Newspaper"/>
                            <Picker.Item label="Email marketing" value="Email marketing"/>
                            <Picker.Item label="Events" value="Events"/>
                            <Picker.Item label="Other" value="Other"/>

                        </Picker>
                    </Form>
                </Content>
            </View>
        )
    }
}

export class Gender extends BaseComponent {
    render() {
        let {
            onChange = () => {
            }
        } = this.props;
        return (
            <CardItem style={{backgroundColor: '#ffffff99', borderRadius: 20, width: '90%',height : 65, alignSelf: 'center', marginTop : 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='person' style={{paddingRight :10, color: Red}}/>
                    <TextView color = 'black'>{strings('common.gender')}</TextView>
                </View>
                <RadioGroup
                    containerStyle={{right : 20 , position : 'absolute'}}
                    radioGroupList={radioGroupList} buttonContainerStyle={{
                    width: 80,
                    left: 0,
                    marginStart: 10,
                    borderWidth: 1,
                    borderColor: Red
                }} buttonContainerActiveStyle={{backgroundColor: Red}}
                            onChange={onChange}/>
            </CardItem>
        )
    }
}

export class BirthDate extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {date: "2016-05-15"}
    }

    render() {
        let {
            onDateChange = () => {
            }
            , date = "2016-05-15"
        } = this.props;
        return (
            <CardItem style={{
                backgroundColor: '#ffffff99',
                borderRadius: 20,
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom : 15
            }}>
                <View style={{flexDirection: 'row'}}>
                    <Item style={{borderBottomWidth: 0}}>
                        <Icon name='person' style={{marginEnd: 5, color: Red}}/>
                        <TextView color='black'>{strings('common.date_of_birth')}</TextView>
                    </Item>
                    <DatePicker
                        style={{width: '40%' }}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1900-05-01"
                        maxDate="2019-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                width: 0,
                                height: 0
                            },
                            dateInput: {
                                borderRadius: 5,
                                borderColor: Red,
                                width: 100,
                                marginStart: 10
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={onDateChange}
                    />
                </View>
            </CardItem>
        )
    }
}

export const radioGroupList = [{
    label: strings('common.male'),
    value: 'male'
}, {
    label: strings('common.female'),
    value: 'female'
}];