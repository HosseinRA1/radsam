import React from 'react';
import BasePage from "../BasePage";
import {FlatList, ImageBackground, View} from 'react-native'
import {Body, Container, Content, Left} from 'native-base'
import TextView from "../../components/TextView";
import {strings} from "../../i18n";
import BaseComponent from "../../components/BaseComponent";
import Webservice from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import EmptyComponent from "../../components/flatlist/EmptyComponent";
import Header from "../../components/Header";
import BackButton from "../../components/header/Back";
import Title from "../../components/header/Title";


export default class MessagePage extends BasePage {
    state = {
        data: [],
        empty: false
    }

    componentWillMount() {
        this.message()
    }

    pageRender() {

        return (
            <Container>
                <ImageBackground source={require('../../assets/images/background/bg-mainn.jpg')}
                                 style={{width: '100%', height: '100%'}}
                                 blurRadius={2}
                >
                    <Content>
                        <Header>
                            <Left style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <BackButton onPress={this.backPress}/>
                                <Title>Inbox</Title>
                            </Left>
                            <Body/>
                        </Header>
                        <FlatList
                            data={this.state.data}
                            ListEmptyComponent={() => <EmptyComponent empty={this.state.empty}/>}
                            renderItem={({item}) =>
                                <MessageItem item={item}/>
                            }
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </Content>
                </ImageBackground>
            </Container>
        )
    }

    async message() {
        let ws = new Webservice();
        ws.url = `${API_URL_V1}user/messages`;
        try {
            let response = await ws.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                if (responseJson.data.length === 0) {
                    this.setState({
                        empty: true,
                        data: responseJson.data
                    });
                } else {
                    this.setState({

                        data: responseJson.data
                    })
                }
            } else {

            }
        } catch (e) {
            console.log(e);
        }
    }
}

export class MessageItem extends BaseComponent {

    render() {
        return (
            <View style={{borderBottomColor: '#ccc', borderBottomWidth: .7, padding: 5, margin: 5}}>
                <TextView>{this.props.item.subject}</TextView>
                <TextView small>{this.props.item.description}</TextView>
            </View>
        )
    }

}