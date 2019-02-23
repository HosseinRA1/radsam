import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import Button from "../../components/button/Button";
import {Gold, Red} from "../../assets/style/colors";
import {View , Animated , Easing} from "react-native";
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import Toaster from "../../classes/toast/Toast";
import {Actions} from 'react-native-router-flux';
import FilePickerManager from 'react-native-file-picker';
import {strings} from "../../i18n";
import {Icon} from "native-base";

export default class UploadContract extends BasePage {
    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
    }
    componentWillMount(){
        this.animate()
    }

    animate(){
        this.animatedValue.setValue(0);
        Animated.parallel([
            Animated.timing(this.animatedValue , {
                toValue : 1,
                duration : 1000,
                easing : Easing.ease,
                delay : 0
            }).start()
        ])
    }

    state = {
        loading: false,
        file: '',
    };

    view() {
        const textAnimation = this.animatedValue.interpolate({
            inputRange : [0,1],
            outputRange : ['0deg' ,'720deg' ]
        });
        return (
            <View style = {{marginTop : 50 , padding : 30}}>
                <Animated.View style = {{transform: [{rotate : textAnimation}]}}>
                    <Icon type="FontAwesome" name="upload" style={{fontSize: 50, alignSelf: 'center',}}/>
                </Animated.View>
                <TextView style={{marginTop: 40, marginBottom: 40}}>
                    {strings('upload_contract.title')}
                </TextView>
                <Button
                    loading={this.state.loading}
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
                                if (response.fileName !== null)
                                    this.setState({
                                        file: response,
                                    });
                                this.upload()
                            }
                        });
                    }}
                    color={Red}>{strings('upload_contract.upload')}</Button>
            </View>
        );
    }

    async upload() {

        this.setState({
            loading: true
        })
        const data = new FormData();
        //data.append('name', 'testName'); // you can append anyone.
        data.append('file', {
            uri: this.state.file.uri,
            type: this.state.file.type, // or photo.type
            name: this.state.file.fileName
        });
        let webservice = new Webservice();
        webservice.method = POST_METHOD;
        webservice.isFile = true;
        MainPage.body = data;
        webservice.url = `${API_URL_V1}upload/store/formalAgreement`

        try {

            let response = await webservice.call();
            console.log(response);
            let responseJson = await response.json();
            if (responseJson.status) {
                new Toaster().success(responseJson.data.message)
                Actions.replace('payment');
            } else {
                new Toaster().error(responseJson.data.message)
            }

            this.setState({
                loading: false
            })
        } catch (error) {
            this.setState({
                loading: false
            })
            console.log(error);
        }

    }
}