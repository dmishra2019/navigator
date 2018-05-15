import React from 'react';
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call'
import Constants from '../Constants';

const fake_url = "http://"
export default class TipsCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getUserPic() {
        let tip = this.props.tip;
        if (!tip.photo) {
            return fake_url;
        }
        let url = tip.photo.prefix + '100x100' + tip.photo.suffix;
        return url;
    }
    openBigImage() {
        let tip = this.props.tip;
        if (!tip.photourl) {
            return;
        }
        this.props.navigation.navigate('Zoom', { title: tip.user.firstName, image: tip.photourl });
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
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{tip.user.firstName}</Text>
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
        margin: 10,
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