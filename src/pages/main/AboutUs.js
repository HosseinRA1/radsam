import React from 'react';
import BasePage from "../BasePage";
import Header from "../../components/Header";
import Title from "../../components/header/Title";
import BackButton from "../../components/header/Back";
import {Body, Container, Content, Left , Card , CardItem } from 'native-base'
import {Image, ImageBackground, StyleSheet} from "react-native";
import TextView from "../../components/TextView";
import {Red} from "../../assets/style/colors";
import {strings} from "../../i18n";
import CardIcon from "../../components/card/CardIcon";

export default class AboutUs extends BasePage{
    render() {
        return(
            <Container>
                <ImageBackground source={require('../../assets/images/background/bg-mainn.jpg')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius = {2}
                >
                    <Header>
                        <Left style={{flexDirection : 'row' , justifyContent : 'space-around'}}>
                            <BackButton onPress={this.backPress}/>
                            <Title>About Us</Title>
                        </Left>
                        <Body/>
                    </Header>
                <Content padder>
                    <Card transparent>
                        <CardItem header bordered style ={styles.itemBackground }>
                            <TextView color ='#000'>Welcome to RADSAM official app, provider of education, immigration and employment specialized services.</TextView>
                        </CardItem>
                        <CardItem bordered style ={styles.itemBackground}>
                            <Body>
                            <TextView color = '#000'>'Knowledge, experience, expertise and commitment of our professional team, are important factors of our success.
                                RADSAM Trade Inc. is have offered following comprehensive and integrated services to students, newcomers and job seekers in three departments:</TextView>
                            <TextView color ='#000'>
                                1. Education Services
                            </TextView>
                            <TextView color ='#000'>
                                2. Visa  and  Immigration Services
                            </TextView>
                            <TextView color ='#000'>
                                3. Employment Services' . . .
                            </TextView>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered style ={[styles.itemBackground , {flexDirection : 'column' , alignItems : 'flex-start'}]}>
                            <TextView color ='#000' >“RADSAM Trade Inc.” is the Canadian Federal Corporation (Registration # 9812148)
                                In addition, “RADSAM” is the Canadian qualified education consulting agency (Licence # CCG00388 SSG00389).

                            </TextView>
                            <TextView color ='#000'>
                                If you have questions, call our hotline
                            </TextView>
                            <TextView color ='#000'>
                                +1 (647) 686-0102
                            </TextView>
                            <TextView color ='#000'>
                                {strings('verify_welcome.desc_4')}
                            </TextView>
                            <TextView color ='#000'>
                                {strings('verify_welcome.desc_5')}
                            </TextView>
                            <TextView color ='#000'>
                                {strings('verify_welcome.desc_6')}
                            </TextView>
                            <Image style={{width: 250, height: 100,margin : 10 ,  alignSelf: 'center' , backgroundColor : Red} }
                                   source={require('./../../assets/images/logo.png')}/>
                        </CardItem>
                    </Card>
                </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
   itemBackground : {
       backgroundColor : '#ffffff99',
       borderColor : 'black'
   }
});