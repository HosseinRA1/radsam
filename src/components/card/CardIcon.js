import React from  'react';
import BaseComponent from "../BaseComponent";
import {View} from "react-native";
import {Body, Card, CardItem, Icon} from "native-base";
import TextView from "../TextView";
import {Blue, Red} from '../../assets/style/colors';
export default class CardIcon extends BaseComponent{
    render(){
        return(
            <View>
                <Icon name={this.props.icon}
                      style={{
                          color: Red,
                          fontSize: 50,
                          top: -20,
                          position: 'absolute',
                          zIndex: 10000,
                          right: -5
                      }}/>

                <View style={{zIndex: 100}}>
                    <Card style={{padding: 10, borderRadius: 10}}>

                        <CardItem>
                            <Body>
                            {this.props.children}
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </View>
        );
    }
}