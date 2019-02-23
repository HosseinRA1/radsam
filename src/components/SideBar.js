import React from 'react';
import BaseComponent from "./BaseComponent";
import {View, Icon, Button} from 'native-base'
import {Image, Modal, NetInfo, StyleSheet, TouchableOpacity} from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import TextView from "./TextView";
import Auth from "../classes/auth/Auth";
import {Red} from "../assets/style/colors";
import {Actions} from 'react-native-router-flux'
import Webservice from "../classes/webservice/Webservice";
import {WEATHER_URL} from "../classes/system";
import Toaster from "../classes/toast/Toast";

export default class SideBar extends BaseComponent {
    state = {
        modalVisible: false,
        main: '',
        desc: '',
        icon: '',
        temp: '',
        error: false,
        errorMessage: '',
        loading: ''
    };

    showModal(visible) {
        this.setState({modalVisible: visible});
    } ;

    hideModal() {
        this.showModal(!this.state.modalVisible)
    }

    componentWillMount() {
        this._getWeather();
    }

    _getWeather = async () => {
        this._loading();
        let ws = new Webservice();
        ws.url = WEATHER_URL;



        try {
            let response = await ws.call();
            let responseJson = await response.json();
            this._loading(false);
            if (responseJson.cod === 200) {
                this.setState({
                    main: responseJson.weather[0].main,
                    desc: responseJson.weather[0].description,
                    icon: responseJson.weather[0].icon,
                    temp: responseJson.main.temp,
                })
            }
            else {

            }

        }
        catch (e) {
            console.log(e)
        }
    };

    _loading = (state = true, message = '') => {
        this.setState({
            loading: this.state
        })
    };

    render() {
        const name = Auth.firstName + ' ' + Auth.family;
        const mobile = Auth.mobile;
        return (
            <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
                <Image source={require('./../assets/images/background/drawer.png')}
                       style={{width: '100%', height: 170}}/>
                {/*profile info*/}
                <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 10, top: 50}}>
                    <View>
                        <UserAvatar name={name} size={80}/>
                    </View>
                    <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
                        <TextView color='white'>{name}</TextView>
                        <TextView color='white'>{mobile}</TextView>
                    </View>
                </View>

                <View style={{padding: 10, justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.items} onPress={() => Actions.push('message')}>
                        <Icon style={{color: Red, fontSize: 35}} type="MaterialIcons" name="move-to-inbox"/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>Inbox</TextView>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.items} onPress={() => Actions.push('faq')}>
                        <Icon style={{color: Red, fontSize: 35}} type="MaterialIcons" name="help-outline"/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>FAQ</TextView>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.items} onPress = {() => Actions.push('message')}>
                        <Icon style={{color: Red, fontSize: 35}} type="AntDesign" name="filetext1"/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>Documents</TextView>
                    </TouchableOpacity>*/}
                    <TouchableOpacity style={styles.items} onPress={() => this.showModal(true)}>
                        <Modal
                            transparent={true}
                            animationType={"slide"}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.hideModal()
                            }}>
                            <View style={styles.mainModalView}>
                                <View style={styles.modalInsideView}>
                                    <Image
                                        source={{uri: "https://openweathermap.org/img/w/" + this.state.icon + ".png"}}
                                        style={{width: 70, height: 70}}
                                    />
                                    <TextView color='black' large>Toronto</TextView>
                                    <TextView color = 'white'>{this.state.main}</TextView>
                                    <TextView color = 'white'>{this.state.desc}</TextView>
                                    <TextView large color = 'white'>{this.state.temp} ° F</TextView>
                                    <Button transparent style={styles.closeBtn} onPress={() => this.hideModal()}>
                                        <Icon name='close'/>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                        <Icon type="AntDesign" name="cloud" style={{color: Red, fontSize: 35}}/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>Weather</TextView>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.items} onPress={() => Actions.push('about')}>
                        <Icon style={{color: Red, fontSize: 35}} type="MaterialIcons" name="person-outline"/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>About Us</TextView>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.items} onPress={() => {
                        Auth.logout().then(() => {
                            Actions.replace('login')
                        });
                    }}>
                        <Icon type="AntDesign" name="logout" style={{color: Red, fontSize: 35}}/>
                        <TextView style={{alignItems: 'flex-end', marginLeft: 15}} color={Red}>Logout</TextView>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    items: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalInsideView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '70%',
        borderRadius: 10,
        backgroundColor: '#2b9fff',
        elevation: 5
    },
    mainModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0
    },
});
