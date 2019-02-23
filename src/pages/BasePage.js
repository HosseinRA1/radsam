import React from 'react';
import BaseComponent from "../components/BaseComponent";

import {ScrollView, View} from 'react-native';
import pageStyle from '../assets/style/page';
import {Actions} from "react-native-router-flux";

export default class BasePage extends BaseComponent {

    backPress = () => {
        Actions.pop();
    };

    render() {
        return (
            <ScrollView>
                <View>
                    {this.pageRender()}
                </View>
            </ScrollView>
        );
    }

    pageRender() {
        return (
            <View style={pageStyle.page}>
                {this.view()}
            </View>
        );
    }

    view() {

    }

}

