import React from 'react';
import BasePage from "../BasePage";
import TextView from "../../components/TextView";
import {View} from "native-base";
import {FlatList, Image, ImageBackground, TouchableOpacity} from "react-native";
import Button from "../../components/button/Button";
import {Gold, Red} from "../../assets/style/colors";
import {Actions} from 'react-native-router-flux';
import {strings} from "../../i18n";


export default class VisitorVisaPage extends BasePage {
    render() {
        return (
                <ImageBackground source={require('../../assets/images/background/bg_splash.png')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius={2}
                >
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image style={{width: '100%'}}
                               source={require('../../assets/images/background/bg_temporary.png')}/>
                        <TextView white style={{position: 'absolute', bottom: 10}}
                                  large>{strings('visitor_visa.title')}</TextView>
                    </View>
                    <View style={{margin: 20}}>
                        <TextView color = 'black'>
                            {strings('visitor_visa.desc_1')}
                        </TextView>
                        <View style={{margin: 20}}>
                            <Button onPress={() => {
                                Actions.replace('registration_temporary_form');
                            }} color={Red}>{strings('visitor_visa.btn_text')}</Button>
                        </View>
                        <View>
                            <TextView color = 'black'>
                                {strings('visitor_visa.photos')}
                            </TextView>
                            <FlatList
                                horizontal
                                data={[
                                    {
                                        key: "1",
                                    },
                                    {
                                        key: "2",
                                    },
                                    {
                                        key: "3",
                                    },
                                    {
                                        key: "4",
                                    },
                                    {
                                        key: "5",
                                    },
                                    {
                                        key: "6",
                                    },
                                    {
                                        key: "7",
                                    },

                                ]}
                                renderItem={({item} ) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                        }}>
                                            <View style={{height: '80%'}}>
                                                <Image
                                                    source={require('../../assets/images/background/bg_study.png')}
                                                    style={{
                                                        margin: 10,
                                                        padding: 5,
                                                        borderRadius: 15,
                                                        width: 200,
                                                        height: 200
                                                    }}>
                                                </Image>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                }
                             disableVirtualization/>
                        </View>
                    </View>
                </ImageBackground>

        );
    }
}