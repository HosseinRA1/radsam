import {View, Thumbnail, Container, Content, Left, Icon, Body} from "native-base";
import {strings} from "../../i18n";
import {FlatList, ImageBackground, Linking, TouchableOpacity} from "react-native";
import Webservice from "../../classes/webservice/Webservice";
import React from "react";
import EmptyComponent from "../../components/flatlist/EmptyComponent";
import TextView from "../../components/TextView";
import MainPage from "./MainPage";
import BaseComponent from "../../components/BaseComponent";
import SideBar from "../../components/SideBar";
import BasePage from "../BasePage";
import {Actions} from "react-native-router-flux";
import Title from "../../components/header/Title";
import Header from "../../components/Header";
import BackButton from "../../components/header/Back";

export default class News extends BasePage {
    state = {
        data: [],
        empty: false
    };
    componentWillMount() {
        this.news();
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../../assets/images/background/bg-mainn.jpg')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius = {2}
                >
                <Content>
                    <Header>
                        <Left style={{flexDirection : 'row' , justifyContent : 'space-around'}}>
                            <BackButton onPress={this.backPress}/>
                            <Title>News</Title>
                        </Left>
                        <Body/>
                    </Header>

                <FlatList
                    data={this.state.data}
                    ListEmptyComponent={() => <EmptyComponent empty={this.state.empty}/>}
                    renderItem={({item}) =>
                        <NewsItem item={item}/>
                    }
                    keyExtractor={(item, index) => item.id.toString()}
                />
                </Content>
                </ImageBackground>
            </Container>
        )
    }
    async news() {
        let ws = new Webservice();
        if (strings('common.news') === 'News') {
            ws.url = `https://radsamca.ir/wp-json/wp/v2/posts?per_page=100&orderby=title`
        }
        try {
            let response = await ws.call();
            let responseJson = await response.json();

            if (responseJson.length === 0) {
                this.setState({
                    empty: true,
                    data: responseJson
                });
            } else {
                this.setState({
                    data: responseJson
                })
            }

        } catch (e) {
            console.log(e);
        }
    }
}

export class NewsItem extends BaseComponent {

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.handleClick(this.props.item.link)
            }} style={{padding: 5, borderBottomWidth: .7, borderBottomColor: '#fff', margin: 10 , flexDirection : 'row' , alignItems: 'center'}}>
                <Thumbnail square style = {{borderRadius : 10 }} source ={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzLLTgm57G4RUt38Q-v9jtYfrwnB6NV1_UhX7heKkn0jt9VZ9mWw'}}/>
                <TextView  color = 'white' center style={{flex: 1 ,textAlign: 'left' , marginLeft: 10  }} >{this.props.item.title.rendered}</TextView>
            </TouchableOpacity>
        )
    }

    handleClick(url) {
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            });
    };
}