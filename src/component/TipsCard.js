import React from 'react';
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import call from 'react-native-phone-call'
import Constants from '../Constants';

const fake_url = "http://"
export default class TipsCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getUserName() {
        let tip = this.props.tip;
        if (!tip.user) {
            return 'Unknown';
        }
        let name = tip.user.firstName;
        if (tip.user.lastName) {
            name += ' ' + tip.user.lastName;
        }
        return name;

    }
    getUserPic() {
        let tip = this.props.tip;
        if (!tip.user.photo) {
            return fake_url;
        }
        let url = tip.user.photo.prefix + '100x100' + tip.user.photo.suffix;
        return url;
    }
    openBigImage() {
        let tip = this.props.tip;
        if (!tip.user.photo) {
            return fake_url;
        }
        let dim = Dimensions.get('window')
        let url = tip.user.photo.prefix + Math.round(dim.width) + 'x' + Math.round(dim.height) + tip.user.photo.suffix;
        this.props.navigation.navigate('Zoom', { title: this.getUserName(), image: url });
    }
    render() {
        var tip = this.props.tip;
        return (
            <View style={styles.card}>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.openBigImage()}>
                        <Image style={styles.image} source={{ uri: this.getUserPic() }}></Image>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{this.getUserName()}</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                            <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('../../res/img/like.png')} />
                            <Text>{tip.agreeCount}</Text>
                            <Image style={{ width: 20, height: 20, marginLeft: 20, marginRight: 5 }} source={require('../../res/img/dislike.png')} />
                            <Text>{tip.disagreeCount}</Text>
                        </View>
                    </View>

                </View>
                <Text style={styles.tip} >{tip.text}</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8C8C8C'
    },
    title: {
        fontSize: 15, color: Constants.COLOR.GRAY, fontWeight: 'bold'
    },
    tip: {
        fontSize: 14, color: Constants.COLOR.GRAY, marginTop: 5
    },

});