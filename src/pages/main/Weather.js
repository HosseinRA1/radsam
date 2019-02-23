import React from 'react';
import {View} from 'native-base';
import {Image, Modal ,StyleSheet} from 'react-native';
import TextView from "../../components/TextView";

export default class Weather extends React.Component {
    state = {
        modalVisible: false
    };

    showModal(visible) {
        this.setState({modalVisible: visible});
    } ;

    hideModal() {
        this.showModal(!this.state.modalVisible)
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType={"slide"}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal()
                }}>
                <View style={style.mainModalView}>
                    <View style={style.modalInsideView}>
                        <Image
                            source={{uri: 'data:image/png;base64,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'}}
                            style={{width: 100, height: 100}}
                        />
                        <TextView color='black' large>Toronto</TextView>
                        <TextView>tomorrow</TextView>
                        <TextView>clear</TextView>
                        <TextView large>{30} ° C</TextView>
                    </View>
                </View>
            </Modal>
        )
    }
}
const style = StyleSheet.create({
    modalInsideView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '60%',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    mainModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});