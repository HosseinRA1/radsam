import React, {Component} from 'react';
import BasePage from "../BasePage";
import {Body, Card, CardItem, Content, Form, Picker, Icon, View, Text, Image} from "native-base";
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
import CheckBoxStudyForm from "../../components/CheckBoxStudyForm";
import MultiSelect from 'react-native-multiple-select';

export default class RegistrationTemporaryStudyForm extends BasePage {

    constructor() {
        super();
        this.state = {
            loading: false,
            showSchengenBox: false,
            isMarrid: false,
            spouseName: '',
            childrenCount: 0,
            familyAccompanyUser: false,
            passportExpirationDate: '2016-05-15',
            hasSchengen: false,
            countriesName: JSON.stringify({}),
            from: '2016-05-15',
            to: '2016-05-15',

            homeAddress: '',
            city: '',
            country: '',
            province: '',
            postalCode: '',
            workExperienceYears: '',
            companyName: '',
            employerName: '',
            military: '',
            certificate: '',
            workAddress: '',
            workPhone: '',
            hasCanadaApplies: false,
            refusalReason: '',
        }

    }

    webservice() {
        let webservice = new Webservice();
        webservice.url = `${API_URL_V1}visa/store/study`;
        webservice.method = POST_METHOD;
        //console.log(this.state.spouseName);
        MainPage.body = {
            isMarried: this.state.isMarrid,
            spouseName: this.state.spouseName,
            childrenCount: this.state.childrenCount,
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
            certificate: this.state.certificate,
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
                console.log(responseJson)
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

                    <Certificate onValueChange={(value) => {
                        this.setState({
                            certificateStatus: value
                        })
                    }}
                                 selected={this.state.employerName}
                    />

                    <Input onChangeText={(value) => {
                        this.setState({
                            spouseName: value
                        })
                    }}
                           title='University name'>Insert the name</Input>

                    <Input onChangeText={(value) => {
                        this.setState({
                            spouseName: value
                        })
                    }}
                           title='Major'>Insert the major</Input>

                    <Input onChangeText={(value) => {
                        this.setState({
                            spouseName: value
                        })
                    }}
                           title='GPA'>Insert the GPA</Input>

                    <LanguagesSkill onChange={(value) => {
                        this.setState({
                            familyAccompanyUser: value
                        })
                    }}/>

                    <FrenchSkill onChange={(value) => {
                        this.setState({
                            familyAccompanyUser: value
                        })
                    }}/>

                    <ContinueEducation onValueChange={(value) => {
                        this.setState({
                            certificateStatus: value
                        })
                    }}
                                       selected={this.state.employerName}
                    />

                    <City onValueChange={(value) => {
                        this.setState({
                            certificateStatus: value
                        })
                    }}
                          selected={this.state.employerName}
                    />

                    <RejectedVisa onChange={(value) => {
                        this.setState({
                            familyAccompanyUser: value
                        })
                    }}/>

                    <Experience
                        onValueChange={(value) => {
                            this.setState({
                                workExperienceYears: value
                            })
                        }}
                        selected={this.state.workExperienceYears}
                    />
                    <Input onChangeText={(value) => {
                        this.setState({
                            spouseName: value
                        })
                    }}
                           title='name of reagent'>Name reagent</Input>
                    <CheckBoxStudyForm />
                    <Button loading={this.state.loading} color={Red} onPress={() => {
                        this.setState({
                            loading: true
                        });
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
                               style={{borderWidth: 1, borderColor: '#272727', borderRadius: 5}}>Address </BaseInput>
                    <BaseInput title='' onChangeText={this.props.city}
                               style={{borderWidth: 1, borderColor: '#272727', borderRadius: 5}}>City</BaseInput>
                    <BaseInput title='' onChangeText={this.props.province}
                               style={{borderWidth: 1, borderColor: '#272727', borderRadius: 5}}>Province</BaseInput>
                    <BaseInput title='' onChangeText={this.props.country}
                               style={{borderWidth: 1, borderColor: '#272727', borderRadius: 5}}>Country</BaseInput>
                    <BaseInput keyboardType='phone-pad' title='' onChangeText={this.props.postalcode}
                               style={{borderWidth: 1, borderColor: '#272727', borderRadius: 5}}>Postalcode</BaseInput>
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
                    <TextView color='black' medium>Did you have any Schengen visa before?</TextView>
                    <RadioGroup radioGroupList={accompanyGroupList} buttonContainerStyle={{
                        width: 80,
                        marginStart: 10,
                        borderWidth: 1,
                        top: 10,
                        marginBottom: 10,
                        borderColor: Red
                    }}/>
                </View>
                </Body>
            </Card>
        )
    }
}

/*export class Accompany extends BaseComponent {
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
}*/

export const accompanyGroupList = [{
    label: 'Yes',
    value: "true"
}, {
    label: 'No',
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

                    <TextView color = 'black'>Military status (for mans)</TextView>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                headerBackButtonText="Baaack!"
                                selectedValue={this.props.selected}
                                onValueChange={this.props.onValueChange}
                            >
                                <Picker.Item label="medical Exemption" value="Unemployed"/>
                                <Picker.Item label="I have a bounty" value="Bounty"/>
                                <Picker.Item label="I've finished serving" value=" Finish-serving"/>
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

export class FrenchSkill extends BaseComponent {
    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TextView medium color='black'>Do you have French language skills?</TextView>
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

export class ContinueEducation extends BaseComponent {
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
                                <Picker.Item label="School" value="School"/>
                                <Picker.Item label="Collage" value="Collage"/>
                                <Picker.Item label="Bachelor" value="Bachelor"/>
                                <Picker.Item label="MA" value="MA"/>
                                <Picker.Item label="PHD" value="PHD"/>
                            </Picker>
                        </Form>
                    </Content>
                </View>
                </Body>
            </Card>

        )
    }
}

export class City extends BaseComponent {
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
                                <Picker.Item label="Toronto" value="Toronto"/>
                                <Picker.Item label="Montreal" value="Montreal"/>
                                <Picker.Item label="Vancouver" value="Vancouver"/>
                                <Picker.Item label="Otava" value="Otava"/>
                                <Picker.Item label="Alberta" value="Alberta"/>
                                <Picker.Item label="Manitoba" value="Manitoba"/>
                                <Picker.Item label="Newbrunzoic" value="Newbrunzoic"/>
                                <Picker.Item label="Nevascoshia" value="Nevascoshia"/>
                                <Picker.Item label="Newfoundland" value="Newfoundland"/>
                                <Picker.Item label="Others" value="Others"/>
                            </Picker>
                        </Form>
                    </Content>
                </View>
                </Body>
            </Card>

        )
    }
}

export class RejectedVisa extends BaseComponent {
    render() {

        return (
            <Card
                style={{padding: 4, borderRadius: 15, backgroundColor: '#ffffff99', alignSelf: 'center', width: '90%'}}>
                <Body>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TextView medium color='black'>Has your visa application already been submitted to Canada or the
                        United States?</TextView>
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

                    <TextView color = 'black'>Years of work experience</TextView>
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

