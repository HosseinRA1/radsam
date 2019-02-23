import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import RadioGroup from 'react-native-radio-buttons-group';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {Default, Gold, Green, Red} from "../../assets/style/colors";
import Button from "../../components/button/Button";
import {Actions} from 'react-native-router-flux';
import FilePickerManager from 'react-native-file-picker';
import {Body, Card, CardItem, Container, Content, Left} from "native-base";
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import BaseComponent from "../../components/BaseComponent";
import Toaster from "../../classes/toast/Toast";
import {strings} from "../../i18n";
import Header from "../../components/Header";
import BackButton from "../../components/header/Back";
import Title from "../../components/header/Title";

export default class CheckListPage extends BasePage {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../../assets/images/background/bg_study.png')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius={3}>
                    <Header>
                        <Left style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <BackButton onPress={this.backPress}/>
                            <Title>Check List</Title>
                        </Left>
                        <Body/>
                    </Header>
                    <Content padder>
                        <View style={styles.container}>
                            {/*<TextView color = 'white'>{strings('check_list_page.title')}</TextView>*/}
                            <UploadCard
                                title={strings('check_list_page.photo')}
                                url={`${API_URL_V1}upload/store/photo`}
                            />

                            <UploadCard
                                title={strings('check_list_page.applicant')}
                                url={`${API_URL_V1}upload/store/applicantPassport`}
                            />

                            <UploadCard
                                title={strings('check_list_page.spouse')}
                                url={`${API_URL_V1}upload/store/spousePassport`}
                            />


                            <UploadCard
                                title={strings('check_list_page.children')}
                                url={`${API_URL_V1}upload/store/childrenPassport`}
                            />

                            <UploadCard
                                title={strings('check_list_page.bankFinancial')}
                                url={`${API_URL_V1}upload/store/bankFinancial`}
                            />

                            <Button onPress={() => {

                                this.checkStatus()
                            }} color={Red}>{strings('check_list_page.Submit')}</Button>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }

    async checkStatus() {
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

                if (responseJson.data.visa_status === 'uploaded certificates') {
                    Actions.push('upload_and_wait_for_contract');
                } else {
                    new Toaster().error('Please upload your document');
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
}

export class UploadCard extends BaseComponent {
    state = {
        isFileSelected: false,
        fileName: 'File not selected!',
        file: '',
        uploadLoading: false,
        browserBtnText: 'Browser',
        browserBtnColor: Default,
    };

    render() {
        return (
            <Card style={{flexDirection: 'column', borderRadius: 10, backgroundColor: '#ffffff99'}}>
                <CardItem style={{flexDirection: 'column', backgroundColor: 'transparent'}}>
                    <TextView color='black'>{this.props.title}</TextView>
                    <TextView color='black'>{this.state.fileName}</TextView>
                </CardItem>
                <CardItem style={{backgroundColor: 'transparent'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Button
                            color={this.state.browserBtnColor}
                            style={{
                                width: '99%',
                                margin: 5,
                                display: this.state.isFileSelected ? 'none' : 'flex',
                            }}
                            onPress={() => {
                                FilePickerManager.showFilePicker(null, (response) => {
                                    console.log('Response = ', response);

                                    if (response.didCancel) {
                                        console.log('User cancelled file picker');
                                    }
                                    else if (response.error) {
                                        console.log('FilePickerManager Error: ', response.error);
                                    }
                                    else {

                                        if (response.fileName !== undefined)
                                            this.setState({
                                                file: response,
                                                fileName: response.fileName,
                                                isFileSelected: true
                                            });
                                    }
                                });
                            }}
                        >{this.state.browserBtnText}</Button>
                        <Button loading={this.state.uploadLoading} color={Red} style={{
                            width: '99%',
                            margin: 5,
                            display: this.state.isFileSelected ? 'flex' : 'none'
                        }}
                                onPress={() => {
                                    this.upload()
                                }}
                        >Upload</Button>
                    </View>
                </CardItem>
            </Card>
        );
    }

    async upload() {
        this.setState({
            uploadLoading: true,
        });
        const data = new FormData();
        //data.append('name', 'testName'); // you can append anyone.
        data.append('file', {
            uri: this.state.file.uri,
            type: this.state.file.type, // or photo.type
            name: this.state.fileName
        });
        let webservice = new Webservice();
        webservice.url = this.props.url;
        webservice.method = POST_METHOD;
        webservice.isFile = true;
        CheckListPage.body = data;
        try {

            let response = await webservice.call();
            console.log(response);

            this.setState({
                uploadLoading: false,
                fileName: 'Success!',
                isFileSelected: false,
                browserBtnColor: Green,
                browserBtnText: 'Change'
            })
        } catch (error) {
            this.setState({
                uploadLoading: false,

            });
            console.log(error);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18,
        marginBottom: 50,
    },
});