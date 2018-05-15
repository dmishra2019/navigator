import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Constants from '../Constants';

export default class TextIcon extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} activeOpacity={.5} onPress={() => this.props.onClick()}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={this.props.iconSource} />
                <Text style={{ color: Constants.COLOR.PINK }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}