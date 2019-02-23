import React from 'react';
import BasePage from "../BasePage";
import {Body, Card, CardItem, Content, Form, Picker, Icon, View} from "native-base";
import BaseComponent from "../../components/BaseComponent";
import TextView from "../../components/TextView";
import Input from "../../components/Input/Input";
import BaseInput from "../../components/Input/BaseInput";
import {ImageBackground, ScrollView} from "react-native";
import {Gold, Red} from "../../assets/style/colors";
import RadioGroup from "react-native-custom-radio-group";
import DatePicker from "react-native-datepicker";
import Button from "../../components/button/Button";
import {Actions} from 'react-native-router-flux';
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import Toaster from "../../classes/toast/Toast";
import Auth from "../../classes/auth/Auth";
import CheckBoxTemporaryForm from "../../components/CheckBoxTemporaryForm";


export default class RegistrationTemporaryForm extends BasePage {

    constructor() {
        super();
        this.state = {
            loading: false,
            showSchengenBox: false,
            isMarrid: false,
            spouseName: '',
            childrenCount: 0,
            childrenName: '',
            childrenName1: '',
            childrenName2: '',
            childrenName3: '',
            childrenName4: '',
            childrenName5: '',
            familyAccompanyUser: false,
            passportExpirationDate: '2016-05-15',
            hasSchengen: false,
            countriesName: JSON.stringify({}),
            from: '2016-05-15',
            to: '2016-05-15',
            certificate: '',
            visitPurposes: '',
            visitPurposes1: '',
            visitPurposes2: '',
            visitPurposes3: '',
            visitPurposes4: '',
            visitPurposes5: '',
            homeAddress: '',
            city: '',
            country: '',
            province: '',
            postalCode: '',
            employmentStatus: 'Unemployed',
            workExperienceYears: '',
            companyName: '',
            employerName: '',
            workAddress: '',
            workPhone: '',
            hasCanadaApplies: false,
            refusalReason: '',
            familyStatus: 'Citizen',
            familyInformation: '',
            familyOnChange: false,
            fatherBirthDay: '2016-05-15',
            fatherEducation: '',
            fatherWork: '',
            fatherAddress: '',
            fatherPhone: '',
            motherBirthDay: '2016-05-15',
            motherEducation: '',
            motherWork: '',
            motherAddress: '',
            motherPhone: '',
            requestVisa: 'tourist visa',
            major: '',
            jobTitle: '',
            assets: '',
            cashAssets : '',
            lSkill : '',
        }
    }

    /*async childrenNameHandler() {
//        let name = this.state.visitPurposes1 + ' , ' + this.state.visitPurposes2 + ' , ' + this.state.visitPurposes3 + ' , ' + this.state.visitPurposes4 + ' , ' + this.state.visitPurposes5 + ' , ';
        let visitPurposes = await {
            number1: this.state.visitPurposes1,
            number2: this.state.visitPurposes2,
            number3: this.state.visitPurposes3,
            number4: this.state.visitPurposes4,
            number5: this.state.visitPurposes5,
        };
        await this.setState({
            childrenName: visitPurposes
        });
    }*/

    async visitPurposes() {
        // let visitPurposes = this.state.childrenName1 + ' , ' + this.state.childrenName2 + ' , ' + this.state.childrenName3 + ' , ' + this.state.childrenName4 + ' , ' + this.state.childrenName5 + ' , ';
        let name = await {
            number1: this.state.childrenName1,
            number2: this.state.childrenName2,
            number3: this.state.childrenName3,
            number4: this.state.childrenName4,
            number5: this.state.childrenName5,
        }
        await this.setState({visitPurposes: name});

    }

    async getFamilyInformation() {

        let familyInformation = await {
            number1: this.state.fatherBirthDay,
            number2: this.state.fatherAddress,
            number3: this.state.fatherEducation,
            number4: this.state.fatherWork,
            number5: this.state.fatherPhone,
            number6: this.state.motherBirthDay,
            number7: this.state.motherAddress,
            number8: this.state.motherEducation,
            number9: this.state.motherWork,
            number10: this.state.motherPhone,
        }
        await this.setState({familyInformation: familyInformation})
    }

    webservice() {
        let webservice = new Webservice();
        webservice.url = `${API_URL_V1}visa/store/visitor`;
        webservice.method = POST_METHOD;
        //console.log(this.state.spouseName);
        MainPage.body = {
            isMarried: this.state.isMarrid,
            spouseName: this.state.spouseName,
            childrenCount: this.state.childrenCount,
            childrenName: this.state.childrenName,
            familyAccompanyUser: this.state.familyAccompanyUser,
            passportExpirationDate: this.getTimeStamp(this.state.passportExpirationDate),
            hasSchengen: this.state.hasSchengen,
            countriesName: {
                'number1': this.state.countriesName
            },
            from: this.getTimeStamp(this.state.from),
            to: this.getTimeStamp(this.state.to),
            visitPurposes: this.state.visitPurposes,
            homeAddress: this.state.homeAddress,
            city: this.state.city,
            country: this.state.country,
            province: this.state.province,
            postalCode: this.state.postalCode,
            employmentStatus: this.state.employmentStatus,
            workExperienceYears: this.state.workExperienceYears,
            companyName: this.state.companyName,
            employerName: this.state.employerName,
            workAddress: this.state.workAddress,
            workPhone: this.state.workPhone,
            hasCanadaApplies: this.state.hasCanadaApplies,
            refusalReason: this.state.refusalReason,
            familyStatus: this.state.familyStatus,
            familyInformation: this.state.familyInformation,
        }
        webservice.call().then((response) => {
            this.setState({
                loading: false
            })
            response.json().then((responseJson) => {
                if (responseJson.status) {
                    new Toaster().success('successful');
                    Actions.replace('verify_temporary_visitor_visa');
                    this.setState({
                        loading: false
                    });


                } else {
                    new Toaster().error('Please fill out registration from');
                    this.setState({
                        loading: false
                    });

                }

            })
        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            })
        })

    }

    getTimeStamp(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');

        // NOTE:: Month: 0 = January - 11 = December.
        var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        return d.getTime() / 1000;
    }

    pageRender() {
        return (
            <ImageBackground source={require('../../assets/images/background/bg_study.png')}
                             style={{width: '100%', height: '100%'}}
                             blurRadius={3}>
                <View>
                    <TextView color='black' style={{alignSelf: 'center'}}>fill the blanks</TextView>
                    <Marital selected={this.state.isMarrid} onValueChange={(value) => {
                        this.setState({
                            isMarrid: value,
                        })
                    }}/>
                    <Input onChangeText={(value) => {
                        this.setState({
                            spouseName: value
                        })
                    }}
                           title='If you are married, please indicate full name of your spouse'>Insert the name</Input>
                    <Children selected={this.state.childrenCount} onValueChange={(value) => {
                        this.setState({
                            childrenCount: value
                        });
                    }}/>

                    {/*<ChildrenNames
                        name1={(value) => {
                            this.setState({
                                childrenName1: value
                            })
                        }}
                        name2={(value) => {
                            this.setState({
                                childrenName2: value
                            })
                        }}
                        name3={(value) => {
                            this.setState({
                                childrenName3: value
                            })
                        }}
                        name4={(value) => {
                            this.setState({
                                childrenName4: value
                            })
                        }}
                        name5={(value) => {
                            this.setState({
                                childrenName5: value
                            })
                        }}
                    />*/}

                    <Accompany onChange={(value) => {
                        this.setState({
                            familyAccompanyUser: value
                        })
                    }}/>


                    <Passport date={this.state.passportExpirationDate}
                              onDateChange={(value) => {
                                  this.setState({
                                      passportExpirationDate: value
                                  })
                              }}

                    />

                    <Schengen showSchengenBox={this.state.showSchengenBox} onChange={(value) => {
                        this.setState({
                            showSchengenBox: value,
                            hasSchengen: value
                        })

                    }}
                              country={(value) => {
                                  this.setState({
                                      countriesName: value
                                  })
                              }}
                              fromDate={this.state.from}
                              fromOnDateChange={(value) => {
                                  this.setState({
                                      from: value
                                  })
                              }}
                              toDate={this.state.to}
                              toOnDateChange={(value) => {
                                  this.setState({
                                      to: value
                                  })
                              }}
                              visitPurposes1={(value) => {
                                  this.setState({
                                      visitPurposes1: value
                                  })
                              }}
                              visitPurposes2={(value) => {
                                  this.setState({
                                      visitPurposes2: value
                                  })
                              }}
                              visitPurposes3={(value) => {
                                  this.setState({
                                      visitPurposes3: value
                                  })
                              }}
                              visitPurposes4={(value) => {
                                  this.setState({
                                      visitPurposes4: value
                                  })
                              }}
                              visitPurposes5={(value) => {
                                  this.setState({
                                      visitPurposes5: value
                                  })
                              }}
                    />

                    <Home
                        address={(value) => {
                            this.setState({
                                homeAddress: value
                            })
                        }}
                        city={(value) => {
                            this.setState({
                                city: value
                            })
                        }}
                        province={(value) => {
                            this.setState({
                                country: value
                            })
                        }}
                        country={(value) => {
                            this.setState({
                                province: value
                            })
                        }}
                        postalcode={(value) => {
                            this.setState({
                                postalCode: value
                            })
                        }}


                    />
                    <Employment onValueChange={(value) => {
                        this.setState({
                            employmentStatus: value
                        })
                    }}
                                selected={this.state.employerName}
                    />
                    <RequestVisa onValueChange={(value) => {
                        this.setState({
                            requestVisa: value
                        })
                    }}
                                 selected={this.state.requestVisa}
                    />

                    <Experience
                        onValueChange={(value) => {
                            this.setState({
                                workExperienceYears: value
                            })
                        }}
                        selected={this.state.workExperienceYears}
                    />

                    <Certificate onValueChange={(value) => {
                        this.setState({
                            certificate: value
                        })
                    }}
                                 selected={this.state.certificate}
                    />

                    <Input onChangeText={(value) => {
                        this.setState({
                            jobTitle: value
                        })
                    }}
                           title='job title'>Insert the job title</Input>

                    <Input onChangeText={(value) => {
                        this.setState({
                            major: value
                        })
                    }}
                           title='Major'>Insert the major</Input>

                    <Input onChangeText={(value) => {
                        this.setState({
                            assets: value
                        })
                    }}
                           title='Amount of assets (compulsory and fixed)'>Insert the Amount of assets</Input>


                    <Input onChangeText={(value) => {
                        this.setState({
                            cashAssets: value
                        })
                    }}
                           title='Amount of cash assets'>Insert the amount of cash assets</Input>

                    <LanguagesSkill onChange={(value) => {
                        this.setState({
                            lSkill: value
                        })
                    }}/>


                    <Applied onChange={(value) => {
                        this.setState({hasCanadaApplies: value})
                    }}


                             familyOnChange={(value) => {
                                 this.setState({
                                     familyOnChange: value
                                 });
                             }}

                             familySelected={this.state.familyOnChange}


                             refusalReason={(value) => {
                                 this.setState({
                                     refusalReason: value
                                 });
                             }}
                             familyStatus={(value) => {
                                 this.setState({
                                     familyStatus: value
                                 })
                             }}

                             familyStatusSelected={this.state.familyStatus}

                             fatherBirthDay={(value) => {
                                 this.setState({
                                     fatherBirthDay: value
                                 })
                             }}

                             fatherBirthDaySelected={
                                 this.state.fatherBirthDay
                             }


                             fatherEducation={(value) => {
                                 this.setState({
                                     fatherEducation: value
                                 })
                             }}
                             fatherWork={(value) => {
                                 this.setState({
                                     fatherWork: value
                                 })
                             }}
                             fatherAddress={(value) => {
                                 this.setState({
                                     fatherAddress: value
                                 })
                             }}
                             fatherPhone={(value) => {
                                 this.setState({
                                     fatherPhone: value
                                 })
                             }}


                             motherBirthDaySelected={
                                 this.state.motherBirthDay
                             }


                             motherBirthDay={(value) => {
                                 this.setState({
                                     motherBirthDay: value
                                 })
                             }}
                             motherEducation={(value) => {
                                 this.setState({
                                     motherEducation: value
                                 })
                             }}
                             motherWork={(value) => {
                                 this.setState({
                                     motherWork: value
                                 })
                             }}
                             motherAddress={(value) => {
                                 this.setState({
                                     motherAddress: value
                                 })
                             }}
                             motherPhone={(value) => {
                                 this.setState({
                                     motherPhone: value
                                 })
                             }}

                    />
                    <CheckBoxTemporaryForm/>

                    <Button loading={this.state.loading} color={Red} onPress={() => {
                        this.setState({
                            loading: true
                        })
                        this.childrenNameHandler().then(() => {
                            this.getFamilyInformation().then(() => {
                                this.visitPurposes().then(() => {
                                    this.webservice();
                                });
                            });
                        });


                    }}>Submit</Button>
                </View>
            </ImageBackground>
        );
    }
}

export class Marital extends BaseComponent {
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
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', width: '90%', alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextView color='black' medium style={{alignItems: 'center'}}>Marital status</TextView>
                    <Form>
                        <Picker
                            mode="dropdown"
                            style={{width: 200, marginStart: 10}}
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            headerBackButtonText="Baaack!"
                            selectedValue={selected}
                            onValueChange={onValueChange}
                        >

                            <Picker.Item label="Single" value={false}/>
                            <Picker.Item label="Married" value={true}/>

                        </Picker>
                    </Form>
                </View>
            </Card>
        )
    }
}

export class Children extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', width: '90%', alignSelf: 'center'}}>
                <Body>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextView medium color='black'>How many children do you have?</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >

                                <Picker.Item label="0" value="0"/>
                                <Picker.Item label="1" value="1"/>
                                <Picker.Item label="2" value="2"/>
                                <Picker.Item label="3" value="3"/>
                                <Picker.Item label="4" value="4"/>
                                <Picker.Item label="5" value="5"/>

                            </Picker>
                        </Form>
                    </Content>
                </View>
                </Body>
            </Card>

        )
    }
}

/*export class ChildrenNames extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3",
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', width: '90%', alignSelf: 'center'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <BaseInput onChangeText={this.props.name1} title='If you have children, please indicate name'
                               style={{borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 5}}>Child 1</BaseInput>
                    <BaseInput onChangeText={this.props.name2} title=''
                               style={{borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 5}}>Child
                        2</BaseInput>
                    <BaseInput onChangeText={this.props.name3} title=''
                               style={{borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 5}}>Child
                        3</BaseInput>
                    <BaseInput onChangeText={this.props.name4} title=''
                               style={{borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 5}}>Child
                        4</BaseInput>
                    <BaseInput onChangeText={this.props.name5} title=''
                               style={{borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 5}}>Child
                        5</BaseInput>
                </View>
                </Body>
            </Card>

        )
    }
}*/

export class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <BaseInput title='Home Address' onChangeText={this.props.address}
                               style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}>Address </BaseInput>
                    <BaseInput title='' onChangeText={this.props.city}
                               style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}>City</BaseInput>
                    <BaseInput title='' onChangeText={this.props.province}
                               style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}>Province</BaseInput>
                    <BaseInput title='' onChangeText={this.props.country}
                               style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}>Country</BaseInput>
                    <BaseInput keyboardType='phone-pad' title='' onChangeText={this.props.postalcode}
                               style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}>Postalcode</BaseInput>
                </View>
                </Body>
            </Card>

        )
    }
}

export class Schengen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                    <TextView medium color = 'black'>Did you have any Schengen visa before?</TextView>
                    <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                        width: 80,
                        marginStart: 10,
                        borderWidth: 1,
                        top: 10,
                        marginBottom: 10,
                        borderColor: Red
                    }} onChange={this.props.onChange} buttonContainerActiveStyle={{backgroundColor: Red}}/>

                    <View style={{
                        flexDirection: 'column',
                        width: '100%',
                        display: this.props.showSchengenBox ? 'flex' : 'none'
                    }}>
                        <TextView medium color = 'black'>if yes, pleas indicate name of the countries that you visited them
                            Country</TextView>
                        <BaseInput onChangeText={this.props.country}
                                   style={{
                                       borderWidth: 1,
                                       borderColor: '#ccc',
                                       borderRadius: 5
                                   }}>Country</BaseInput>

                        <TextView color = 'black'>From</TextView>
                        <DatePicker
                            style={{width: '90%', margin: 10}}
                            date={this.props.fromDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2017-01-01"
                            maxDate="2023-12-31"
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
                                    borderColor: Gold,
                                    width: 100,
                                    marginStart: 10
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={this.props.fromOnDateChange}
                        />
                        <TextView color = 'black'>To</TextView>
                        <DatePicker
                            style={{width: '90%', margin: 10}}
                            date={this.props.toDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2017-01-01"
                            maxDate="2023-12-31"
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
                            onDateChange={this.props.toOnDateChange}
                        />
                        <TextView medium color = 'black'>Purpose of visit</TextView>
                        <TextView  color = 'black'>Name of hotel</TextView>
                        <BaseInput onChangeText={this.props.visitPurposes1}
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>1</BaseInput>
                        <BaseInput title='' onChangeText={this.props.visitPurposes2}
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>2</BaseInput>
                        <BaseInput title='' onChangeText={this.props.visitPurposes3}
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>
                            3</BaseInput>
                        <BaseInput title='' onChangeText={this.props.visitPurposes4}
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>
                            4</BaseInput>
                        <BaseInput title='' onChangeText={this.props.visitPurposes5}
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>
                            5</BaseInput>

                    </View>
                </View>
                </Body>
            </Card>
        )
    }
}

export class Accompany extends BaseComponent {
    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TextView medium color='black'>Do they accompany you in this travel?</TextView>
                    <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                        width: 80,
                        marginStart: 10,
                        borderWidth: 1,
                        top: 10,
                        marginBottom: 10,
                        borderColor: Red
                    }} buttonContainerActiveStyle={{backgroundColor: Red}}
                                onChange={this.props.onChange}
                    />

                </View>
                </Body>
            </Card>
        )
    }
}

export const accompanyGroupList = [{
    label: "Yes",
    value: "true"
}, {
    label: "No",
    value: "false"
}];

export class Passport extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {date: "2016-05-15"}
    }

    render() {
        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'flex-start',}}>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <TextView color = 'black'>Passport expiration date</TextView>
                    </View>
                    <DatePicker
                        style={{width: 300, margin: 10, alignSelf: 'center'}}
                        date={this.props.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2017-01-01"
                        maxDate="2023-12-31"
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
                                width: 400,
                                marginStart: 10
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={this.props.onDateChange}
                    />
                    <TextView medium color={Red}>If your passport will be expired within 6 months, we cannot accept
                        your request. Please renew your passport and try again</TextView>
                </View>
                </Body>
            </Card>


        )
    }
}

export class Employment extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>

                <Body>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TextView color='black' medium>Employment status</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >
                                <Picker.Item label="Unemployed" value="Unemployed"/>
                                <Picker.Item label="Employed" value="Employed"/>
                                <Picker.Item label="Self-employed" value=" Self-employed"/>


                            </Picker>
                        </Form>
                    </Content>


                </View>
                </Body>
            </Card>

        )
    }
}

export class RequestVisa extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TextView color='black' medium>Request information evaluation to:</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >
                                <Picker.Item label="tourist visa" value="tourist visa"/>
                                <Picker.Item label="Educational visa" value="Educational visa"/>
                                <Picker.Item label="investment" value="investment"/>
                                <Picker.Item label="Self-employed artists" value="Self-employed artists"/>
                                <Picker.Item label="Self-igniting athletes" value="Self-igniting athletes"/>
                                <Picker.Item label="Provincial Options" value="Provincial Options"/>
                                <Picker.Item label="Skilled labor force" value="Skilled labor force"/>
                                <Picker.Item label="Parental sponsorship" value="Parental sponsorship"/>
                                <Picker.Item label="Spouse sponsor spouse" value="Spouse sponsor spouse"/>
                                <Picker.Item label="Other" value="Other"/>

                            </Picker>
                        </Form>
                    </Content>


                </View>
                </Body>
            </Card>

        )
    }
}

export class Experience extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TextView color='black' medium>Years of work experience</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >
                                <Picker.Item label="Less than 1 year" value="0"/>
                                <Picker.Item label="1 year" value="1"/>
                                <Picker.Item label="2 years" value="2"/>
                                <Picker.Item label="3 years" value="3"/>
                                <Picker.Item label="4 years" value="4"/>
                                <Picker.Item label="5 years" value="5"/>
                                <Picker.Item label="more than 5 years" value="6"/>


                            </Picker>
                        </Form>
                    </Content>


                </View>
                </Body>
            </Card>

        )
    }
}

export class Certificate extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TextView color = 'black'>Last educational certificate</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >
                                <Picker.Item label="High school" value="High-school"/>
                                <Picker.Item label="Diploma" value="Diploma"/>
                                <Picker.Item label="Associate Degree" value=" Associate-degree"/>
                                <Picker.Item label="College" value="College"/>
                                <Picker.Item label="Bachelor" value="Bachelor"/>
                                <Picker.Item label="MA" value="MA"/>
                                <Picker.Item label="PHD" value="PHD"/>
                                <Picker.Item label="Graduate or Professional degree" value="GP"/>
                            </Picker>
                        </Form>
                    </Content>
                </View>
                </Body>
            </Card>

        )
    }
}

export class LanguagesSkill extends BaseComponent {
    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TextView medium color='black'>Do you have English language skills like IELTS, TOEFL, GRE or GMAT?
                        (Please note: Certificates must be valid and received within the past two years)</TextView>
                    <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                        width: 80,
                        marginStart: 10,
                        borderWidth: 1,
                        top: 10,
                        marginBottom: 10,
                        borderColor: Red
                    }} buttonContainerActiveStyle={{backgroundColor: Red}}
                                onChange={this.props.onChange}
                    />

                </View>
                </Body>
            </Card>
        )
    }
}

/*export class Organization extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key3"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {

        return (
            <Card style={{padding: 4, borderRadius: 15}}>
                <CardItem>
                    <Body>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>

                        <BaseInput onChangeText={this.props.companyName}
                                   title='Current organization/company name that you are working there'
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

                        <BaseInput onChangeText={this.props.employerName}
                                   title='Current employer name (First and last name)'
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

                        <BaseInput onChangeText={this.props.workAddress}
                                   title='Work address (Unit, Street, City, Province, Country, Postal code)'
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

                        <BaseInput keyboardType='phone-pad' onChangeText={this.props.workPhone} title='Work phone'
                                   style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

                    </View>


                    </Body>
                </CardItem>

            </Card>

        )
    }
}*/

export class FatherBox extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {

        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>FatherBox</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}
                    date={this.props.fatherBirthDaySelected}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={this.props.fatherBirthDay}
                />

                <BaseInput onChangeText={this.props.fatherEducation} title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput onChangeText={this.props.fatherWork} title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput onChangeText={this.props.fatherAddress} title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput keyboardType='phone-pad' onChangeText={this.props.fatherPhone} title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

            </View>
        );
    }

}

export class MotherBox extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {

        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>MotherBox</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.props.motherBirthDaySelected}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={this.props.motherBirthDay}
                />

                <BaseInput onChangeText={this.props.motherEducation} title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput onChangeText={this.props.motherWork} title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput onChangeText={this.props.motherAddress} title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput keyboardType='phone-pad' onChangeText={this.props.motherPhone} title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

            </View>
        );
    }

}

export class Cibiln1Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {

        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>Cibiln1</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />
                <BaseInput title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>

            </View>
        );
    }

}

export class Cibiln2Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {


        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>Cibiln2</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />

                <BaseInput title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput keyboardType='phone-pad' title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

            </View>
        );
    }

}

export class Cibiln3Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {


        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>Cibiln3</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />

                <BaseInput title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput keyboardType='phone-pad' title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

            </View>
        );
    }

}

export class Cibiln4Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {


        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>Cibiln4</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />

                <BaseInput title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>
                <BaseInput keyboardType='phone-pad' title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}></BaseInput>

            </View>
        );
    }

}

export class Cibiln5Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {date: "2016-05-15"}
    }

    render() {


        return (
            <View style={[{flexDirection: 'column', alignItems: 'flex-start', width: '100%'}]}>
                <TextView color = 'black'>Cibiln4</TextView>
                <TextView medium color = 'black'>Date of brith</TextView>
                <DatePicker
                    style={{width: '90%', margin: 10}}

                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2023-12-31"
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
                            borderColor: Gold,
                            width: 100,
                            marginStart: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date})
                    }}
                />

                <BaseInput title='Education'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Work'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput title='Full address'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>
                <BaseInput keyboardType='phone-pad' title='Work phone'
                           style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}> </BaseInput>

            </View>
        );
    }

}

export class Applied extends BaseComponent {


    constructor() {
        super();
        this.state = {
            isFamilyMember: false
        }

    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                    <Body>
                    <View style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                        <TextView color = 'black' medium>Have you ever applied for Canada visa before?</TextView>
                        <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                            width: 80,
                            marginStart: 10,
                            borderWidth: 1,
                            top: 10,
                            marginBottom: 10,
                            borderColor: Red
                        }} buttonContainerActiveStyle={{backgroundColor: Red}}
                                    onChange={this.props.onChange}
                        />

                        <TextView medium color = 'black' style={{marginTop: 5}}>If you applied for Canada visa and your request has been
                            refused, please
                            indicate refusal reason</TextView>
                        <BaseInput onChangeText={this.props.refusalReason}
                                   style={{borderWidth: 1, borderColor: '#636363', borderRadius: 5}}/>

                        <TextView medium color = 'black' style={{marginTop: 5}}>
                            Do you have any family members in Canada? (Parents, Children, Sister or brother)
                        </TextView>

                        <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                            width: 80,
                            marginStart: 10,
                            borderWidth: 1,
                            top: 10,
                            marginBottom: 10,
                            borderColor: Red
                        }} buttonContainerActiveStyle={{backgroundColor: Red}}
                                    onChange={this.props.familyOnChange}
                        />
                    </View>
                    </Body>
                <View style={{display: this.props.familySelected ? 'flex' : 'none', margin: 20}}>

                    <View style={{

                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        margin: 10
                    }}>


                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            headerBackButtonText="Baaack!"
                            selectedValue={this.props.familyStatusSelected}
                            onValueChange={this.props.familyStatus}
                        >
                            <Picker.Item label="Citizen" value="Citizen"/>
                            <Picker.Item label="Permanent resident" value="Permanent resident"/>
                            <Picker.Item label="Temporary Visa holder" value="Temporary Visa holder"/>
                        </Picker>
                    </View>
                    <TextView medium color = 'black'>Family information</TextView>
                    {/* <View style={{

                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        margin: 10
                    }}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            headerBackButtonText="Baaack!"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Father" value="father"/>
                            <Picker.Item label="Mother" value="mother"/>
                            <Picker.Item label="Ciblin1" value="ciblin1"/>
                            <Picker.Item label="Ciblin2" value="ciblin2"/>
                            <Picker.Item label="Ciblin3" value="ciblin3"/>
                            <Picker.Item label="Ciblin4" value="ciblin4"/>
                            <Picker.Item label="Ciblin5" value="ciblin5"/>
                        </Picker>
                    </View>*/}
                    {this.familyBox()}
                </View>
            </Card>
        )
    }

    familyBox() {

        let father = this.state.selected === 'father' ? 'flex' : 'none';
        let mother = this.state.selected === 'mother' ? 'flex' : 'none';

        return (
            <View>
                <FatherBox
                    fatherBirthDay={this.props.fatherBirthDay}
                    fatherBirthDaySelected={this.props.fatherBirthDaySelected}
                    fatherEducation={this.props.fatherEducation}
                    fatherWork={this.props.fatherWork}
                    fatherAddress={this.props.fatherAddress}
                    fatherPhone={this.props.fatherPhone}

                />
                <MotherBox

                    motherBirthDay={this.props.motherBirthDay}
                    motherBirthDaySelected={this.props.motherBirthDaySelected}
                    motherEducation={this.props.motherEducation}
                    motherWork={this.props.motherWork}
                    motherAddress={this.props.motherAddress}
                    motherPhone={this.props.motherPhone}

                />
                <Cibiln1Box/>
                <Cibiln2Box/>
                <Cibiln3Box/>
                <Cibiln4Box/>
                <Cibiln5Box/>


            </View>
        )
    }


}
