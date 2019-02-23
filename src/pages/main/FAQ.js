import React, { Component } from "react";
import {Container, Content, Icon, Accordion, Text, View, Left, Body} from "native-base";
import TextView from "../../components/TextView";
import {Red} from "../../assets/style/colors";
import BasePage from "../BasePage";
import BackButton from "../../components/header/Back";
import Title from "../../components/header/Title";
import {ImageBackground} from "react-native";
import Header from "../../components/Header";
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" }
];

export default class FAQ extends BasePage {
    _renderHeader(item, expanded) {
        return (
            <View style={{
                backgroundColor :Red,
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center" ,
                borderRadius :10,
                margin :3,
                }}>
                <TextView color = '#fff' style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </TextView>
                {expanded
                    ? <Icon  style={{ fontSize: 18 ,color:'white'}} name="remove-circle" />
                    : <Icon  style={{ fontSize: 18 ,color:'white'}} name="md-add" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <TextView
                color = '#fff'
                style={{
                    backgroundColor : '#ffffff77',
                    padding: 10,
                    fontStyle: "italic",
                    borderRadius: 10
                }}
            >
                {item.content}
            </TextView>
        );
    }
    render() {
        return (
            <Container style={{backgroundColor : 'transparent' , borderWidth:0}}>
                <ImageBackground source={require('../../assets/images/background/bg-mainn.jpg')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius = {2}
                >
                    <Header>
                        <Left style={{flexDirection : 'row' , justifyContent : 'space-around'}}>
                            <BackButton onPress={this.backPress}/>
                            <Title>FAQ</Title>
                        </Left>
                        <Body/>
                    </Header>
                <Content padder style={{ borderWidth:0}}>
                    <Accordion
                        style={{borderWidth : 0}}
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                </Content>
                </ImageBackground>
            </Container>
        );
    }
}