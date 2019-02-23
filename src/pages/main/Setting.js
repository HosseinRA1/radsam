import BaseComponent from "../../components/BaseComponent";
import Auth from "../../classes/auth/Auth";
import {View} from "native-base";
import UserAvatar from "./MainPage";
import {Actions} from "react-native-router-flux";
import {strings} from "../../i18n";
import {Red} from "../../assets/style/colors";
import React from "react";
import TextView from "../../components/TextView";
import Button from "../../components/button/Button";

export class Setting extends BaseComponent {
    render() {
        const name = Auth.name + ' ' + Auth.family;
        const mobile = Auth.mobile;
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <UserAvatar size="90" name={name}/>
                    <View style={{marginStart: 10}}>
                        <TextView white size={23}>{name}</TextView>
                        <TextView white size={23}>{mobile}</TextView>
                    </View>

                </View>
                <View style={{width: '80%', height: 1, backgroundColor: '#fff', margin: 20}}/>
                <View style={{width: '80%',}}>
                    <Button onPress={() => {
                        Actions.push('message');
                    }} style={{marginTop: 5}} color='#fff' textColor='#000'>
                        {strings('common.inbox')}
                    </Button>
                    <Button onPress={() => {
                        Auth.logout().then(() => {
                            Actions.replace('login')
                        });


                    }} style={{marginTop: 5}} color={Red}>
                        {strings('common.logout')}
                    </Button>
                </View>
            </View>
        )
    }
}