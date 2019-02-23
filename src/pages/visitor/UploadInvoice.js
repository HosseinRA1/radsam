import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import Button from "../../components/button/Button";
import {Red} from "../../assets/style/colors";
import {View, Animated, ImageBackground} from "react-native";
import Webservice, {POST_METHOD} from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import Toaster from "../../classes/toast/Toast";
import {Actions} from 'react-native-router-flux';
import FilePickerManager from 'react-native-file-picker';
import {strings} from "../../i18n";
import {Container, Icon} from 'native-base';

export default class UploadInvoice extends BasePage {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(.1);

    }
    componentWillMount() {
        this.spring()
    }
    spring() {
        this.springValue.setValue(.7);
        Animated.spring(this.springValue, {
            toValue: 1,
            friction: 2,
            tension: 10
        }).start()
    }

    state = {
        loading: false,
        file: '',
    };

    pageRender() {
        return (
            <View style = {{marginTop : 50 , padding : 30}}>
                <Animated.View style={{transform: [{scale: this.springValue}]}}>
                    <Icon type="FontAwesome" name="upload" style={{fontSize: 50, alignSelf: 'center',}}/>
                </Animated.View>
                <TextView color='black' style={{marginTop: 40, marginBottom: 40}}>
                    {strings('payment.desc-1')}
                </TextView>
                <Button
                    loading={this.state.loading}
                    onPress={() => {
                        FilePickerManager.showFilePicker(null, (response) => {
                            console.warn('Response = ', response);

                            if (response.didCancel) {
                                console.warn('User cancelled file picker');
                            }
                            else if (response.error) {
                                console.warn('FilePickerManager Error: ', response.error);
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
                    color={Red}>{strings('payment.upload')}</Button>
            </View>
        );
    }

    async upload() {
        this.setState({
            loading: true
        });
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
        webservice.body = data;
        webservice.url = `${API_URL_V1}upload/store/invoice`;

        try {
            let response = await webservice.call();
            console.log(response);
            let responseJson = await response.json();
            if (responseJson.status) {
                new Toaster().success(responseJson.data.message);
                Actions.replace('completed');

            } else {
                new Toaster().error(responseJson.data.message)
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