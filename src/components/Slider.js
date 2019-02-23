import React from 'react';
import BaseComponent from "./BaseComponent";
import Slideshow from 'react-native-image-slider-show';

export default class Slider extends BaseComponent{
    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    url : 'http://uupload.ir/files/ukaj_1.jpeg'
                }, {

                    url: 'http://uupload.ir/files/ckjc_2.jpeg',
                }, {
                    url: 'http://uupload.ir/files/bvjs_3.jpeg',
                },
            ],
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 3000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render (){
        return(
            <Slideshow
                indicatorColor='red'
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />
        )
    }
}