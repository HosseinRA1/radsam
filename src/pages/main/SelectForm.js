import React from 'react';
import BasePage from "../BasePage";
import {Actions} from "react-native-router-flux";
import {Card, Content} from "native-base";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import TextView from "../../components/TextView";
import ContainerLogin from "../../components/ContainerLogin";

export default class SelectForm extends BasePage {
    render() {
        return (
            <ContainerLogin style = {{backgroundColor : 'black'}}>
                <Image
                    style={{width: '100%', height: '100%', position: 'absolute'}}
                    source={require('../../assets/images/background/login.png')}
                />
                <Content padder>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        Actions.push('registration_temporary_form')
                    }}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/5.jpg')}
                                style={{width: '100%', height: 150, borderRadius: 5, position: 'absolute'}}/>
                            <TextView color='white' style={styles.categoryTitleLeft}>Visitor Visa</TextView>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {
                        Actions.push('registration_temporary_study_form')
                    }}>
                        <Card style={styles.categoryImageCard}>
                            <Image
                                source={require('../../assets/images/card/6.jpg')}
                                style={{width: '100%', height: 150, borderRadius: 5, position: 'absolute'}}/>
                            {/*<Spinner style={{display: this.state.loading ? 'flex' : 'none'}}/>*/}
                            <TextView color='white' style={styles.categoryTitleRight}>Study Visa</TextView>
                        </Card>
                    </TouchableOpacity>
                </Content>
            </ContainerLogin>
        )
    }
}
const styles = StyleSheet.create({
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
        right: 0,
        bottom: 25,
        justifyContent: 'center',
        width: 100
    },
});