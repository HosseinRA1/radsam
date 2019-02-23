import React from 'react';
import {Actions} from 'react-native-router-flux'
import {StyleSheet, View, Text, Image, Dimensions, ImageBackground} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {strings} from "../../i18n";
import SelectLanguagePage from "../splash/SelectLanguagePage";
import {loginBack, loginButton, loginGoldText, Red} from "../../assets/style/colors";
import BasePage from "../BasePage";
import ContainerLogin from "../../components/ContainerLogin";

let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: width,
        height: '90%',
    },
    text: {
        fontSize: 18,
        //color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
        color: loginGoldText
    },
    title: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    }
});

const slides = [
    {
        key: 'somethun',
        title: '',
        image: require('../../assets/images/background/welcome1.png'),
        text: strings('welcome.text_1'),
        colors: ['#63E2FF', '#B066FE'],
    },
    {
        key: 'somethun1',
        title: '',
        text: strings('welcome.text_2'),
        image: require('../../assets/images/background/welcome2.png'),
        colors: ['#A3A1FF', '#3A3897'],
    },
    {
        key: 'somethun2',
        title: '',
        text: strings('welcome.text_3'),
        image: require('../../assets/images/background/welcome3.png'),
        colors: ['#29ABE2', '#4F00BC'],
    },
];
export default class WelcomePage extends BasePage {
    _renderItem = props => (
        <View style={{width: width}}>
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            <View>
                <Image
                    source={props.image}
                    style={styles.image}/>
            </View>
        </View>

    );
    _onDone = () => {
        Actions.replace('login');
    };

    render() {
        return (
            <ContainerLogin>
                    <AppIntroSlider
                        slides={slides}
                        renderItem={this._renderItem}
                        bottomButton
                        buttonStyle = {{bottom :15, backgroundColor : loginButton , textColor : Red}}
                        onDone={this._onDone}
                        doneLabel={strings('common.done')}
                        nextLabel={strings('common.next')}
                    />
            </ContainerLogin>


        );
    }
}