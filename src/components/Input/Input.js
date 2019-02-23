import React from 'react';
import BaseComponent from "../BaseComponent";
import {View, Icon, Input, Item} from "native-base";
import TextView from "../TextView";
import {Red} from "../../assets/style/colors";

export default class InputCustom extends BaseComponent {
    render() {
        let {
            onChangeText = () => {
            }
        } = this.props;
        return (
           <View style = {{alignItems : 'center' , marginBottom : -20}}>
                <TextView  medium color ='#434343'>{this.props.title}</TextView>
                <Item style={{backgroundColor : '#ffffff99' , borderRadius : 20  }} >
                    <Icon name={this.props.icon} style={{marginLeft : 10, color: Red }}/>
                    <View style = {{backgroundColor : 'black' , width : .7 , height : 30}}/>
                    <Input style = {{flex : .9 , height : 65 }} onChangeText={onChangeText} placeholder={this.props.children} placeholderTextColor="#282828" />
                </Item>
                <TextView link='https://www.skype.com' small
                          style={{color: '#68B0F8' , backgroundColor : 'black', marginTop: 5 , marginBottom : 10 , borderBottomWidth: .8 , borderBottomColor: 'white'}}>{this.props.description}</TextView>
           </View>
        );
    }

    description() {
        return (
            <TextView medium>{this.props.description}</TextView>
        );
    }
}