import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {Dimensions, FlatList, Image, NetInfo, StyleSheet, TouchableOpacity} from "react-native";
import {Body, Card, Container, Content, View, Left, Icon, Right, Text} from "native-base";
import {Actions} from 'react-native-router-flux';
import Webservice from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import {strings} from "../../i18n";
import BaseComponent from "../../components/BaseComponent";
import Slider from "../../components/Slider";
import Header from "../../components/Header";
import Title from "../../components/header/Title";
import moment from "moment";
import Toaster from "../../classes/toast/Toast";

export default class MainPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
        };
    }

    componentWillMount() {
        setInterval(() => {
            let date = moment()
                .utcOffset('-05:00')
                .format(' hh:mm:ss');
            this.setState({time: date});
        }, 1000)
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Icon onPress={() => {
                            Actions.drawerOpen()
                        }} name="md-menu" style={{color: 'white'}}/>
                    </Left>
                    <Body>
                    <Title>Radsam</Title>
                    </Body>
                    <Right>
                        <TextView color='white' small style={{alignSelf: 'center'}}>Toronto :</TextView>
                        <Title>{this.state.time}</Title>
                    </Right>
                </Header>
                {this.body()}
            </Container>
        )
    }

    async checkStatus() {
        this.setState({
            loading: true
        });
        let webservice = new Webservice();
        webservice.url = `${API_URL_V1}visa/status`;
        try {
            let response = await webservice.call();
            let responseJson = await response.json();

            if (responseJson.status) {
                if (responseJson.data.visa_status === 'verified mobile') {
                    Actions.push('register');
                } else if (responseJson.data.visa_status === 'stored information') {
                    Actions.push('visitor_visa');
                } else if (responseJson.data.visa_status === 'stored visa') {
                    Actions.push('verify_temporary_visitor_visa');
                } else if (responseJson.data.visa_status === 'accepted visa details') {
                    Actions.push('check_list_page');
                } else if (responseJson.data.visa_status === 'rejected visa details') {
                    Actions.push('rejected');
                } else if (responseJson.data.visa_status === 'uploaded certificates') {
                    Actions.push('upload_and_wait_for_contract');
                } else if (responseJson.data.visa_status === 'contract sent back') {
                    Actions.push('payment');
                } else if (responseJson.data.visa_status === 'payment done') {
                    Actions.push('completed');
                } else {

                }

            } else {

            }

            this.setState({
                loading: false
            })
        } catch (error) {
            this.setState({
                loading: false
            });
            console.log(error);
        }
    }

    async checkStatusStudy() {
        this.setState({
            loading: true
        });
        let webservice = new Webservice();
        webservice.url = `${API_URL_V1}visa/status`;
        try {
            let response = await webservice.call();
            console.log(response);
            let responseJson = await response.json();

            if (responseJson.status) {
                if (responseJson.data.visa_status === 'verified mobile') {
                    Actions.push('register');
                } else if (responseJson.data.visa_status === 'stored information') {
                    Actions.push('study_visa');
                } else if (responseJson.data.visa_status === 'stored visa') {
                    Actions.push('verify_temporary_visitor_visa');
                } else if (responseJson.data.visa_status === 'accepted visa details') {
                    Actions.push('check_list_page');
                } else if (responseJson.data.visa_status === 'rejected visa details') {
                    Actions.push('rejected');
                } else if (responseJson.data.visa_status === 'uploaded certificates') {
                    Actions.push('upload_and_wait_for_contract');
                } else if (responseJson.data.visa_status === 'contract sent back') {
                    Actions.push('payment');
                } else if (responseJson.data.visa_status === 'payment done') {
                    Actions.push('completed');
                } else {

                }

            } else {

            }

            this.setState({
                loading: false
            })
        } catch (error) {
            this.setState({
                loading: false
            });
            console.log(error);
        }
    }

    state = {
        loading: false
    };

    body() {
        let {width, height} = Dimensions.get('window');
        return (
            <Container style={{backgroundColor: 'transparent', height: '100%'}}>
                <Slider/>

                <Content padder>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        this.checkStatusStudy();
                        Actions.push('select_form')
                    }}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/11.png')}
                                style={{width: '100%', height: 150, borderRadius: 5, position: 'absolute'}}/>
                            {/*<Spinner style={{display: this.state.loading ? 'flex' : 'none'}}/>*/}
                            <TextView color='white' style={styles.categoryTitleLeft}>Form Free Consultation to file your
                                application</TextView>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        this.checkStatus();
                    }}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/22.png')}
                                style={{width: '100%', height: 150, borderRadius: 5}}/>

                            <TextView color='white' style={styles.categoryTitleRight}>From Biometric to enter to
                                Canada</TextView>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/33.png')}

                                style={{width: '100%', height: 150, borderRadius: 5}}/>
                            <TextView color='white' style={styles.categoryTitleLeft}>Post landing services</TextView>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        Actions.push('news')
                    }}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/44.png')}
                                style={{width: '100%', height: 150, borderRadius: 5}}/>
                            <TextView color='white'
                                      style={[styles.categoryTitleRight, {paddingLeft: 50}]}>News</TextView>
                        </Card>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export class Main extends BaseComponent {

    render() {
        const width = Dimensions.get('window').width;
        return (
            <FlatList
                horizontal
                data={[{
                    id: 1,
                    key: strings('main.key_1'),
                    'text': strings('main.text_1'),
                    'image': require('../../assets/images/background/bg_welcome.png')

                }, {
                    id: 2,
                    key: strings('main.key_2'),
                    'text': strings('main.text_2'),
                    'image': require('../../assets/images/background/bg_study.png')
                }]}
                renderItem={({item}) => {
                    let image = item.image;
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            if (item.id === 1) {
                                this.checkStatus();
                            } else {
                                this.checkStatusStudy();
                            }
                        }}>
                            <View style={{height: '80%'}}>
                                <Image
                                    source={image}
                                    style={{
                                        margin: 20,
                                        width: width * .9,
                                        padding: 5,
                                        borderRadius: 15,
                                        height: '100%'
                                    }}>
                                </Image>


                                <TextView white style={{position: 'absolute', bottom: 20, start: 30}}
                                          large>{item.key}</TextView>
                                <TextView white style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    start: 30
                                }}>{item.text}</TextView>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    catBoxView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#EFEFEF',
    },
    categoryImageCard: {
        height: 150,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },
    categoryTitleLeft: {
        position: 'absolute',
        left: 12,
        bottom: 20,
        justifyContent: 'center',
        width: 200

    },
    categoryTitleRight: {
        position: 'absolute',
        right: 20,
        bottom: 25,
        justifyContent: 'center',
        width: 150
    },
});
