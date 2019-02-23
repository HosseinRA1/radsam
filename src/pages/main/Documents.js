import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {View, TouchableOpacity, FlatList, Linking} from 'react-native';
import {Icon} from 'native-base';
import TextView from "../../components/TextView";
import Webservice from "../../classes/webservice/Webservice";
import {API_URL_V1} from "../../classes/system";
import EmptyComponent from "../../components/flatlist/EmptyComponent";
import {strings} from "../../i18n";

export default class Documents extends BaseComponent {

    state = {
        data: [],
        empty: false
    }

    componentWillMount() {
        this.documents()
    }

    render() {
        return (
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%',}}>
                    <TextView large>{strings('common.documents')}</TextView>
                </View>
                <FlatList
                    data={this.state.data}
                    ListEmptyComponent={() => <EmptyComponent empty={this.state.empty}/>}
                    renderItem={({item}) =>
                        <RenderItem item={item}/>
                    }
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        )
    }

    async documents() {
        let ws = new Webservice();
        ws.url = `${API_URL_V1}documents`
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

export class RenderItem extends BaseComponent {
    render() {
        return (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                this.handleClick(API_URL_V1 + 'download/' + this.props.item.id)
            }}>
                <Icon name='md-document' style={{color: '#fff', fontSize: 50, margin: 10}}/>
                <View >
                    <TextView center>{this.props.item.type}</TextView>
                    <TextView center>{this.props.item.created_at}</TextView>
                </View>

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